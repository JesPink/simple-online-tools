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
        for row in rows:
            feats = row[5]
            deprel = row[7]
            if "Voice=Pass" in feats.split("|"):
                evidence.add("Voice=Pass")
            if deprel == "nsubj:pass" or deprel.startswith("nsubj:pass:"):
                evidence.add("nsubj:pass")
            if deprel == "csubj:pass" or deprel.startswith("csubj:pass:"):
                evidence.add("csubj:pass")
            if deprel == "aux:pass" or deprel.startswith("aux:pass:"):
                evidence.add("aux:pass")
            if deprel == "obl:agent" or deprel.startswith("obl:agent:"):
                evidence.add("obl:agent")
        if text:
            samples.append({
                "text": text,
                "passive": bool(evidence),
                "evidence": sorted(evidence),
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
    if len(predictions) != len(samples) or not all(isinstance(value, bool) for value in predictions):
        raise RuntimeError("Detector runner returned an invalid prediction list.")
    return predictions


def metrics(samples: list[dict], predictions: list[bool]) -> dict:
    counts = Counter()
    evidence_counts = Counter()
    for sample, predicted in zip(samples, predictions):
        gold = sample["passive"]
        if gold and predicted:
            counts["true_positive"] += 1
        elif not gold and predicted:
            counts["false_positive"] += 1
        elif not gold and not predicted:
            counts["true_negative"] += 1
        else:
            counts["false_negative"] += 1
        evidence_key = "+".join(sample["evidence"]) if sample["evidence"] else "no_passive_annotation"
        evidence_counts[evidence_key] += 1

    tp, fp, tn, fn = (counts[key] for key in (
        "true_positive", "false_positive", "true_negative", "false_negative"
    ))
    precision = tp / (tp + fp) if tp + fp else 0.0
    recall = tp / (tp + fn) if tp + fn else 0.0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    total = len(samples)
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
        "gold_annotation_evidence": dict(sorted(evidence_counts.items())),
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
        predictions = run_detector(parsed)
        assert predictions == [True, False], predictions
        print("Parser + Node detector integration self-test passed (one passive, one active).")
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
