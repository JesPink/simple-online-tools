#!/usr/bin/env python3
"""Evaluate the browser-local passive detector against UD English-EWT test data.

Downloads a pinned corpus split into memory, sends sentence text to the existing
Node.js detector, and prints aggregate metrics only. No corpus text is written
to disk or included in output.
"""
from __future__ import annotations

import json
import sys
import urllib.request
import subprocess
from collections import Counter
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
CORPUS_COMMIT = "b7711cce01cdd4f5fcc0a8199b8a50d951b16c0c"
CORPUS_URL = (
    "https://raw.githubusercontent.com/UniversalDependencies/UD_English-EWT/"
    + CORPUS_COMMIT + "/en_ewt-ud-test.conllu"
)
CORPUS_VERSION = "UD English-EWT r2.18 (test split)"
USER_AGENT = "SimpleOnlineTool-PassiveVoiceResearch/1.0 (reproducible evaluation)"


def parse_conllu(source: str) -> list[dict]:
    """Return sentence text and a sentence-level passive gold label."""
    samples: list[dict] = []
    comments: list[str] = []
    rows: list[list[str]] = []

    def flush() -> None:
        if not rows:
            comments.clear()
            return
        text = next(
            (line[len("# text = "):] for line in comments if line.startswith("# text = ")),
            "",
        ).strip()
        if not text:
            text = " ".join(row[1] for row in rows if row[0].isdigit())
        evidence = set()
        has_passive_subject = False
        has_passive_auxiliary = False
        has_agent_oblique = False
        has_voice_feature = False
        has_participle = False
        has_reduced_participial_clause = False
        for row in rows:
            xpos, feats, deprel = row[4], row[5], row[7]
            if "Voice=Pass" in feats.split("|"):
                evidence.add("Voice=Pass")
                has_voice_feature = True
            if deprel in {"nsubj:pass", "csubj:pass"} or deprel.startswith(("nsubj:pass:", "csubj:pass:")):
                evidence.add(deprel.split(":")[0] + ":pass")
                has_passive_subject = True
            if deprel == "aux:pass" or deprel.startswith("aux:pass:"):
                evidence.add("aux:pass")
                has_passive_auxiliary = True
            if deprel == "obl:agent" or deprel.startswith("obl:agent:"):
                evidence.add("obl:agent")
                has_agent_oblique = True
            if xpos == "VBN" or "VerbForm=Part" in feats.split("|"):
                has_participle = True
                if deprel in {"acl", "advcl"}:
                    has_reduced_participial_clause = True

        if has_passive_subject and has_passive_auxiliary:
            structure = "passive_subject_and_auxiliary"
        elif has_passive_subject:
            structure = "passive_subject_without_passive_auxiliary"
        elif has_passive_auxiliary:
            structure = "passive_auxiliary_without_passive_subject"
        elif has_agent_oblique:
            structure = "agent_oblique_without_subject_or_auxiliary"
        elif has_voice_feature:
            structure = "voice_feature_without_passive_dependencies"
        else:
            structure = "other_or_unmapped"

        token_shape = "+".join(name for name, present in (
            ("participle", has_participle),
            ("reduced_acl_or_advcl", has_reduced_participial_clause),
            ("agent_oblique", has_agent_oblique),
        ) if present) or "no_secondary_shape_signal"

        if text:
            samples.append({
                "text": text,
                "passive": bool(evidence),
                "evidence": sorted(evidence),
                "structure": structure,
                "token_shape": token_shape,
            })
        comments.clear()
        rows.clear()

    for line in source.splitlines():
        if not line.strip():
            flush()
        elif line.startswith("#"):
            comments.append(line)
        else:
            columns = line.split("\t")
            if len(columns) == 10:
                # Ignore multiword-token and empty-node rows; they are not syntactic tokens.
                if columns[0].isdigit():
                    rows.append(columns)
    flush()
    return samples


def fetch_corpus() -> str:
    request = urllib.request.Request(CORPUS_URL, headers={"User-Agent": USER_AGENT})
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read().decode("utf-8")


def run_detector(samples: list[dict]) -> list[bool]:
    payload = json.dumps([sample["text"] for sample in samples], ensure_ascii=False)
    runner = REPO_ROOT / "scripts" / "evaluate-passive-voice-ud.mjs"
    completed = subprocess.run(
        ["node", str(runner)],
        input=payload,
        text=True,
        capture_output=True,
        cwd=REPO_ROOT,
        check=True,
    )
    predictions = json.loads(completed.stdout)
    if len(predictions) != len(samples) or not all(
        isinstance(value, dict)
        and isinstance(value.get("detected"), bool)
        and isinstance(value.get("primaryTypes"), list)
        and isinstance(value.get("additionalCount"), int)
        for value in predictions
    ):
        raise RuntimeError("Detector runner returned invalid privacy-safe diagnostics.")
    return predictions


def metrics(samples: list[dict], predictions: list[dict]) -> dict:
    counts = Counter()
    outcomes_by_evidence = {}
    misses_by_structure = Counter()
    hits_by_structure = Counter()
    misses_by_token_shape = Counter()
    hits_by_token_shape = Counter()
    false_positive_patterns = Counter()

    for sample, prediction in zip(samples, predictions):
        gold = sample["passive"]
        detected = prediction["detected"]
        evidence_key = "+".join(sample["evidence"]) if sample["evidence"] else "no_passive_annotation"
        bucket = outcomes_by_evidence.setdefault(evidence_key, Counter())
        bucket["sentences"] += 1

        if gold and detected:
            counts["true_positive"] += 1
            bucket["true_positive"] += 1
            hits_by_structure[sample["structure"]] += 1
            hits_by_token_shape[sample["token_shape"]] += 1
        elif not gold and detected:
            counts["false_positive"] += 1
            bucket["false_positive"] += 1
            types = prediction["primaryTypes"]
            pattern_key = "+".join(sorted(set(types))) if types else "additional_clause_only"
            false_positive_patterns[pattern_key] += 1
        elif not gold and not detected:
            counts["true_negative"] += 1
            bucket["true_negative"] += 1
        else:
            counts["false_negative"] += 1
            bucket["false_negative"] += 1
            misses_by_structure[sample["structure"]] += 1
            misses_by_token_shape[sample["token_shape"]] += 1
            bucket["misses_by_structure:" + sample["structure"]] += 1

    tp, fp, tn, fn = (counts[key] for key in (
        "true_positive", "false_positive", "true_negative", "false_negative"
    ))
    precision = tp / (tp + fp) if tp + fp else 0.0
    recall = tp / (tp + fn) if tp + fn else 0.0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    total = len(samples)

    # Diagnostic groups are descriptive annotation/feature buckets, not
    # causal explanations. A parser label or feature can itself be imperfect.
    return {
        "sentences": total,
        "gold_passive_sentences": tp + fn,
        "gold_non_passive_sentences": tn + fp,
        "true_positive": tp,
        "false_positive": fp,
        "true_negative": tn,
        "false_negative": fn,
        "precision": round(precision, 4),
        "recall": round(recall, 4),
        "f1": round(f1, 4),
        "accuracy": round((tp + tn) / total, 4) if total else None,
        "diagnostics": {
            "gold_annotation_evidence_outcomes": {
                key: dict(sorted(value.items()))
                for key, value in sorted(outcomes_by_evidence.items())
            },
            "false_negatives_by_ud_structure_bucket": dict(sorted(misses_by_structure.items())),
            "true_positives_by_ud_structure_bucket": dict(sorted(hits_by_structure.items())),
            "false_negatives_by_ud_token_shape_bucket": dict(sorted(misses_by_token_shape.items())),
            "true_positives_by_ud_token_shape_bucket": dict(sorted(hits_by_token_shape.items())),
            "false_positives_by_engine_pattern_family": dict(sorted(false_positive_patterns.items())),
        },
    }

def main() -> int:
    if "--self-test" in sys.argv:
        fixture = """# sent_id = test-1
# text = The report was written by Maya.
1\tThe\tthe\tDET\tDT\tDefinite=Def|PronType=Art\t2\tdet\t_\t_
2\treport\treport\tNOUN\tNN\tNumber=Sing\t4\tnsubj:pass\t_\t_
3\twas\tbe\tAUX\tVBD\tMood=Ind|Tense=Past|VerbForm=Fin\t4\taux:pass\t_\t_
4\twritten\twrite\tVERB\tVBN\tTense=Past|VerbForm=Part|Voice=Pass\t0\troot\t_\t_
5\tby\tby\tADP\tIN\t_\t6\tcase\t_\t_
6\tMaya\tMaya\tPROPN\tNNP\tNumber=Sing\t4\tobl:agent\t_\t_

# sent_id = test-2
# text = Maya wrote the report.
1\tMaya\tMaya\tPROPN\tNNP\tNumber=Sing\t2\tnsubj\t_\t_
2\twrote\twrite\tVERB\tVBD\tMood=Ind|Tense=Past|VerbForm=Fin\t0\troot\t_\t_
3\tthe\tthe\tDET\tDT\tDefinite=Def|PronType=Art\t4\tdet\t_\t_
4\treport\treport\tNOUN\tNN\tNumber=Sing\t2\tobj\t_\t_
"""
        parsed = parse_conllu(fixture)
        assert len(parsed) == 2, parsed
        assert parsed[0]["passive"] is True, parsed[0]
        assert set(parsed[0]["evidence"]) == {"Voice=Pass", "nsubj:pass", "aux:pass", "obl:agent"}
        assert parsed[1]["passive"] is False, parsed[1]

        # Exercise each supported annotation signal independently, including
        # files without a trailing blank line and ignored multiword/empty rows.
        parser_cases = [
            ("# text = A was seen.\n1\tA\t_\tPRON\t_\t_\t2\tnsubj:pass\t_\t_\n2\twas\t_\tAUX\t_\t_\t0\troot\t_\t_", True, {"nsubj:pass"}),
            ("# text = It is done.\n1\tIt\t_\tPRON\t_\t_\t2\tnsubj\t_\t_\n2\tis\t_\tAUX\t_\tVoice=Pass\t0\troot\t_\t_", True, {"Voice=Pass"}),
            ("# text = She seems ready.\n1\tShe\t_\tPRON\t_\t_\t2\tnsubj\t_\t_\n2\tseems\t_\tVERB\t_\t_\t0\troot\t_\t_", False, set()),
            ("# text = The work, which was reviewed, passed.\n1-2\tThe_work\t_\t_\t_\t_\t_\t_\t_\t_\n1\tThe\t_\tDET\t_\t_\t2\tdet\t_\t_\n2\twork\t_\tNOUN\t_\t_\t4\tnsubj\t_\t_\n3\twas\t_\tAUX\t_\t_\t4\taux:pass\t_\t_\n3.1\tghost\t_\tX\t_\t_\t_\t_\t_\t_\n4\treviewed\t_\tVERB\t_\t_\t2\tacl\t_\t_", True, {"aux:pass"}),
        ]
        for source, expected_passive, expected_evidence in parser_cases:
            result = parse_conllu(source)
            assert len(result) == 1, result
            assert result[0]["passive"] is expected_passive, result[0]
            assert set(result[0]["evidence"]) == expected_evidence, result[0]

        fallback = parse_conllu("1\tMaya\t_\tPROPN\t_\t_\t2\tnsubj\t_\t_\n2\twrote\t_\tVERB\t_\t_\t0\troot\t_\t_")
        assert len(fallback) == 1 and fallback[0]["text"] == "Maya wrote", fallback
        assert fallback[0]["passive"] is False and fallback[0]["evidence"] == [], fallback
        assert fallback[0]["structure"] == "other_or_unmapped", fallback
        test_predictions = [
            {"detected": True, "primaryTypes": ["be_passive"], "additionalCount": 0},
            {"detected": False, "primaryTypes": [], "additionalCount": 0},
        ]
        test_metrics = metrics(parsed, test_predictions)
        assert test_metrics["true_positive"] == 1
        assert test_metrics["true_negative"] == 1
        assert test_metrics["diagnostics"]["false_negatives_by_ud_structure_bucket"] == {}
        assert test_metrics["diagnostics"]["false_positives_by_engine_pattern_family"] == {}
        # Include an active opening clause followed by a passive coordinated clause.
        # Sentence-level evaluation must count the later passive as positive too.
        integration_samples = parsed + [{
            "text": "Maya wrote the report, but it was reviewed by the editor.",
            "passive": True,
            "evidence": ["integration-fixture"],
        }]
        predictions = run_detector(integration_samples)
        assert [prediction["detected"] for prediction in predictions] == [True, False, True], predictions
        print("Parser + Node detector integration self-test passed (passive, active, later-clause passive).")
        return 0

    print(f"Fetching pinned {CORPUS_VERSION} from {CORPUS_URL}", file=sys.stderr)
    samples = parse_conllu(fetch_corpus())
    if not samples:
        raise RuntimeError("No annotated sentences were parsed from the corpus.")
    predictions = run_detector(samples)
    report = {
        "corpus": CORPUS_VERSION,
        "corpus_commit": CORPUS_COMMIT,
        "split": "test",
        "source": "https://github.com/UniversalDependencies/UD_English-EWT",
        "annotation_license": "CC BY-SA 4.0",
        "detector": "src/tools/passive-voice-detector/engine.js",
        "gold_label_rule": (
            "Sentence is passive if any token has Voice=Pass or a passive dependency "
            "relation: nsubj:pass, csubj:pass, aux:pass, or obl:agent."
        ),
        "text_handling": "Downloaded into memory only; no source sentences are written or printed.",
        "metrics": metrics(samples, predictions),
        "limitations": [
            "This is an external treebank evaluation, not a universal measure of grammatical accuracy.",
            "The corpus covers five web genres and its passive labels reflect UD annotation conventions.",
            "The treebank README says basic dependency annotations were hand-corrected, while many other features were automatically derived with limited hand correction.",
            "The detector and gold annotations may define edge cases differently; disagreements require linguistic review.",
            "Diagnostic groups describe annotation and feature patterns; they are not proven causal explanations.",
            "Do not tune on this test split and then report it as an untouched evaluation set.",
        ],
    }
    print(json.dumps(report, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except Exception as error:
        print(f"External benchmark failed: {error}", file=sys.stderr)
        raise
