#!/usr/bin/env python3
"""Evaluate a PassivePy-style dependency matcher against UD English-EWT.

Research-only reference implementation based on the MIT-licensed PassivePy
project by Mitra Mirshafiee (2021). Matcher patterns are adapted from its
MIT-licensed source; the required notice is in
docs/third-party-notices/passivepy-mit-license.txt:
https://github.com/mitramir55/PassivePy

The matcher patterns below are adapted from PassivePy's
PassivePyCode/PassivePySrc/rules_for_all_passives.py. This is not the
PassivePy package and does not include its dataframe/reporting code. The
reference detector uses spaCy's English small parser (MIT model license).
Only aggregate counts are printed; no corpus sentence or token text is
logged, saved, or redistributed.
"""
from __future__ import annotations

import importlib.util
import json
from collections import Counter
from pathlib import Path

import spacy
from spacy.matcher import Matcher

ROOT = Path(__file__).resolve().parents[1]
UD_EVALUATOR = ROOT / "scripts" / "evaluate-passive-voice-ud.py"
MODEL_NAME = "en_core_web_sm"
PASSIVEPY_SOURCE = "https://github.com/mitramir55/PassivePy"
PASSIVEPY_LICENSE = "MIT"
SPACY_MODEL_LICENSE = "MIT"

# A small exception list from the published PassivePy matcher, not a
# sentence-specific dictionary. Dependency/POS/lemma features do the work.
ADJECTIVAL_OR_AMBIGUOUS_LEMMAS = [
    "associate", "involve", "exhaust", "base", "lead", "stun",
    "overrate", "fill", "bear", "complicate", "reserve", "heat", "screw",
]


def build_matcher(nlp):
    matcher = Matcher(nlp.vocab)

    # Passive auxiliaries and participle. These match syntactic roles rather
    # than a fixed sequence of specific sentences.
    full_passive = [
        {"POS": "AUX", "DEP": "aux", "OP": "*"},
        {"POS": "AUX", "DEP": "auxpass", "OP": "+"},
        {"DEP": "neg", "TAG": "RB", "OP": "*"},
        {"DEP": "HYPH", "OP": "*"},
        {"DEP": "advmod", "TAG": "RB", "OP": "*"},
        {"POS": "VERB", "TAG": "VBN",
         "LEMMA": {"NOT_IN": ADJECTIVAL_OR_AMBIGUOUS_LEMMAS + ["be"]}},
    ]

    # Reduced passive participle, e.g. "there was no change detected".
    reduced_passive = [
        {"DEP": {"IN": ["attr", "nsubjpass", "appos"]}},
        {"TAG": "RB", "DEP": "advmod", "OP": "*"},
        {"DEP": "PUNCT", "OP": "*"},
        {"TAG": "VBN", "DEP": "acl",
         "LEMMA": {"NOT_IN": ADJECTIVAL_OR_AMBIGUOUS_LEMMAS}},
    ]

    # Coordinated passive predicates, e.g. "it was determined and formed".
    coordinated_passive = [
        {"POS": "AUX", "DEP": "aux", "OP": "*"},
        {"POS": "AUX", "DEP": "auxpass", "OP": "+"},
        {"DEP": "neg", "TAG": "RB", "OP": "*"},
        {"DEP": "HYPH", "OP": "*"},
        {"DEP": "advmod", "TAG": "RB", "OP": "*"},
        {"POS": "VERB", "DEP": "ROOT",
         "LEMMA": {"NOT_IN": ADJECTIVAL_OR_AMBIGUOUS_LEMMAS}},
        {"DEP": "cc"},
        {"DEP": "advmod", "TAG": "VBN", "OP": "*",
         "LEMMA": {"NOT_IN": ["pre"]}},
        {"DEP": "conj", "LEMMA": {"NOT_IN": ADJECTIVAL_OR_AMBIGUOUS_LEMMAS}},
        {"DEP": "pobj", "OP": "!"},
    ]

    # Reduced passive adverbial clause with an explicit agent phrase.
    agentive_adverbial = [
        {"DEP": "advcl", "TAG": "VBN"},
        {"DEP": "agent", "TAG": "IN"},
        {"OP": "*"},
        {"DEP": "pobj"},
    ]

    # Ambiguous participle lemmas are accepted when directly followed by "by".
    ambiguous_agent = [
        {"LEMMA": {"IN": ADJECTIVAL_OR_AMBIGUOUS_LEMMAS}},
        {"LOWER": "by"},
    ]

    matcher.add("passive_rule_1", [full_passive], greedy="LONGEST")
    matcher.add("passive_rule_2", [reduced_passive], greedy="LONGEST")
    matcher.add("passive_rule_3", [coordinated_passive], greedy="LONGEST")
    matcher.add("passive_rule_4", [agentive_adverbial], greedy="LONGEST")
    matcher.add("passive_rule_5", [ambiguous_agent], greedy="LONGEST")
    return matcher


def load_ud_evaluator():
    spec = importlib.util.spec_from_file_location("passive_ud_evaluator", UD_EVALUATOR)
    if spec is None or spec.loader is None:
        raise RuntimeError("Could not load the pinned UD evaluator.")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def predict(nlp, matcher, texts: list[str]) -> list[bool]:
    # Stream docs in bounded batches; never write sentence/token data to disk.
    output: list[bool] = []
    for doc in nlp.pipe(texts, batch_size=128):
        output.append(bool(matcher(doc)))
    return output


def summarize(gold: list[bool], predicted: list[bool]) -> dict:
    counts = Counter()
    for expected, actual in zip(gold, predicted):
        if expected and actual:
            counts["true_positive"] += 1
        elif expected and not actual:
            counts["false_negative"] += 1
        elif not expected and actual:
            counts["false_positive"] += 1
        else:
            counts["true_negative"] += 1

    tp, fp, tn, fn = (counts[key] for key in (
        "true_positive", "false_positive", "true_negative", "false_negative"
    ))
    precision = tp / (tp + fp) if tp + fp else 0.0
    recall = tp / (tp + fn) if tp + fn else 0.0
    f1 = 2 * precision * recall / (precision + recall) if precision + recall else 0.0
    total = len(gold)
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
    }


def main() -> int:
    evaluator = load_ud_evaluator()
    samples = evaluator.parse_conllu(evaluator.fetch_corpus())
    if not samples:
        raise RuntimeError("The pinned UD test split produced no samples.")

    nlp = spacy.load(MODEL_NAME, disable=["ner"])
    matcher = build_matcher(nlp)
    predictions = predict(nlp, matcher, [sample["text"] for sample in samples])
    gold = [sample["passive"] for sample in samples]

    report = {
        "reference": "PassivePy-style dependency matcher",
        "source": PASSIVEPY_SOURCE,
        "source_license": PASSIVEPY_LICENSE,
        "adaptation": "Five generalized POS/dependency/lemma matcher patterns from PassivePy's all-passives matcher.",
        "parser": f"spaCy {spacy.__version__} / {MODEL_NAME}",
        "model_license": SPACY_MODEL_LICENSE,
        "corpus": evaluator.CORPUS_VERSION,
        "corpus_commit": evaluator.CORPUS_COMMIT,
        "split": "test",
        "metrics": summarize(gold, predictions),
        "text_handling": "Corpus text processed in memory only; aggregate metrics only.",
        "limitations": [
            "Reference implementation for evaluation; not a production integration.",
            "spaCy's parser was trained on OntoNotes-derived dependencies, not this UD EWT split.",
            "PassivePy's published human-agreement figures are from different datasets and are not transferable to this benchmark.",
            "A UD annotation match is an operational reference label, not a complete theory of English voice.",
        ],
    }
    print(json.dumps(report, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
