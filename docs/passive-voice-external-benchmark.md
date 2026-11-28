# External passive-voice benchmark

This research-only evaluator compares the current browser-local heuristic detector with the **held-out test split** of Universal Dependencies English Web Treebank (UD English-EWT) v2.18.

## Run

Requirements: Python 3.9+ and Node.js (the website's existing JavaScript runtime; no new npm dependency).

```bash
python3 scripts/evaluate-passive-voice-ud.py --self-test
python3 scripts/evaluate-passive-voice-ud.py
```

The full run downloads the pinned test split into memory, parses the gold labels, invokes the existing detector through Node.js, and prints aggregate precision, recall, F1, accuracy, and confusion-matrix counts. Sentence-level predictions include both the primary sentence result and any additional clause-level passive detections, so a passive construction in a later clause is not incorrectly treated as active merely because the opening clause is active. It does not save or print corpus sentences. Network access to GitHub is required.

## Corpus and reproducibility

- Source: [UD_English-EWT](https://github.com/UniversalDependencies/UD_English-EWT)
- Version: r2.18
- Pinned commit: `b7711cce01cdd4f5fcc0a8199b8a50d951b16c0c`
- Split: `en_ewt-ud-test.conllu` only; do not use this split to tune the detector and then call it an untouched evaluation.
- Annotation/database license: [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/)
- Corpus paper: Silveira et al. (2014), “A Gold Standard Dependency Corpus for English,” LREC 2014.

The treebank README describes 16,622 sentences across weblogs, newsgroups, emails, reviews, and Yahoo! answers. It says basic dependency annotations were converted and hand-corrected; other annotations/features have varying degrees of automatic derivation and correction. The README also warns that underlying source texts may have separate copyright restrictions. This script therefore downloads source text transiently and publishes aggregate metrics only. Do not commit corpus files, sentence excerpts, or a redistributed copy of the dataset.

## Sentence-level gold-label mapping

A sentence is labelled passive if at least one token has any of:

- `Voice=Pass` in FEATS
- `nsubj:pass`
- `csubj:pass`
- `aux:pass`
- `obl:agent`

This is an explicit operational mapping from UD annotations to a sentence-level task; it is not a claim that the labels capture every possible passive construction. The report includes how many sentences were supported by each annotation-evidence combination.

## Interpretation

- Precision: of sentences flagged by the detector, the share labelled passive by this mapping.
- Recall: of sentences labelled passive by this mapping, the share flagged by the detector.
- F1: harmonic mean of precision and recall.
- Accuracy: overall sentence-level agreement; interpret alongside class balance and precision/recall.

The result is an external benchmark against one corpus and one annotation convention—not a universal accuracy score. Disagreements need manual linguistic review before any public claim. The internal 175-example regression fixture remains a separate measure and must not be combined with this test-set score.

## Licensing and attribution

The UD English-EWT annotations/database are licensed CC BY-SA 4.0. The underlying sentence texts may have separate rights. No corpus text is redistributed by this evaluator. If the corpus or annotation data is later shared, follow the license's attribution and ShareAlike requirements and obtain appropriate review of underlying text rights.

## Diagnostic breakdown and reference baseline

The evaluator emits aggregate-only diagnostics for false positives and false negatives:
- Outcome counts grouped by the UD passive-annotation evidence combinations.
- False negatives and true positives grouped by broad dependency-structure buckets (passive subject, passive auxiliary, agent oblique, and related signals).
- Broad POS/feature shape buckets such as participial and reduced-clause evidence.
- False positives grouped by generic detector family identifiers only.

These are diagnostic slices, not proven linguistic root causes. The evaluator does not output or save corpus sentences, token forms, lemmas, matched spans, or lexicalized pattern strings.

A second research-only benchmark, `scripts/evaluate-passive-voice-passivepy.py`, adapts the five generalized matcher patterns in [PassivePy](https://github.com/mitramir55/PassivePy) under its MIT license. It uses spaCy's `en_core_web_sm` parser, also MIT-licensed, and evaluates against the same pinned UD EWT test split. This is a reference-system comparison only; it does not change the website runtime or add Python, spaCy, or model assets to production.

The reference is based on POS tags, dependency relations, and lemmas rather than sentence-specific templates. Its small English parser model is published at 12 MB, but spaCy itself is a Python NLP runtime and the model is not a drop-in browser JavaScript module. Its pipeline is useful for establishing whether syntactic parsing materially improves this detector before investigating an on-device runtime port. Do not copy PassivePy's published agreement percentages into this project's claims: its validation used different datasets and coding protocols.

## Architecture decision guardrails

1. Keep the production path browser-local unless a separately approved architecture changes the privacy model.
2. Do not add a heavy parser/model to the initial page load. Any model-backed enhancement must be optional, lazy-loaded, cacheable, and benchmarked on mid-range mobile hardware.
3. Use permissively licensed model weights and code; do not bundle UDPipe's commonly distributed non-commercial English models into a monetized product.
4. Prefer dependency-aware analysis to a longer participle list. Keep lexical exceptions small, documented, and evidence-driven.
5. Keep voice detection separate from active-voice rewriting. A parser-based detector does not by itself make a rewrite safe; actor recovery, tense, aspect, modality, negation, coordination, and meaning preservation require separate validation.
6. Do not promote a reference model to production based on one corpus. Validate by genre and use a separate development set for tuning plus a new untouched final evaluation set.
7. Treat confidence as a calibrated probability only after calibration on held-out human-labelled data. Until then, use qualitative labels or raw scores explicitly described as uncalibrated.

## Dependency audit handling

CI prints a compact, non-blocking `npm audit --json` report with package names, severity, affected range, advisory identifiers/titles, and available remediation status. Do not use `npm audit fix --force` or accept major dependency updates without checking compatibility and rerunning the full build/browser suite.

## Measured results on the pinned UD EWT test split

The following values were produced by the research CI run using 2,077 identical sentences and the same sentence-level gold mapping. They are not universal accuracy claims.

| Method | TP | FP | TN | FN | Precision | Recall | F1 |
|---|---:|---:|---:|---:|---:|---:|---:|
| Current browser-local JS detector | 113 | 41 | 1,804 | 119 | 73.38% | 48.71% | 58.55% |
| PassivePy-style matcher + spaCy small parser | 106 | 9 | 1,836 | 126 | 92.17% | 45.69% | 61.10% |
| Union: either detector flags | 123 | 45 | 1,800 | 109 | 73.21% | 53.02% | 61.50% |
| Intersection: both detectors flag | 96 | 5 | 1,840 | 136 | 95.05% | 41.38% | 57.66% |

The dependency-aware reference is more selective than the current detector but has lower recall. The union improves recall by 4.31 percentage points and F1 by 2.95 points, while adding four false positives; intersection sharply raises precision but loses too many passive cases. This supports investigating a parser as a complementary signal, not replacing the current detector.

These ensemble values are retrospective comparisons on the same held-out split, not a newly validated hybrid model. Do not present them as a final product accuracy figure. The parser benchmark used spaCy's OntoNotes-derived dependency parser, not a parser trained on this UD EWT test set; parser/gold annotation scheme differences may explain some disagreement.

## What the disagreement buckets suggest

On the same UD test split, the current JS detector's 119 false negatives include:
- 87 sentences whose mapped gold evidence is Voice=Pass without a corresponding passive dependency relation in the annotation.
- 16 with an obl:agent relation but no passive-subject or passive-auxiliary relation.
- 12 with passive subject plus passive auxiliary annotation.
- 3 with passive subject but no passive auxiliary.
- 1 with passive auxiliary but no passive subject.

These are mutually exclusive summary buckets based on the mapping's priority, not a linguistic diagnosis. A separate token-shape view also shows reduced acl/advcl participial forms among missed cases; those groups overlap and must not be added together. Of 41 false positives, 38 came from the current engine's broad be_passive family. A rights-safe manual review should inspect examples from these strata before proposing code changes.

## Decision after the comparison

Do not replace the production detector with PassivePy/spaCy. The measured F1 lift is small, and the reference loses recall. Do not ship a two-parser union either: the reference runtime is Python, the benchmark's ensemble is retrospective, and a production browser implementation has not been validated.

The recommended next research track is:
1. Build a rights-cleared, manually adjudicated development set stratified by finite be/get passives, adjectival/stative participles, reduced participial clauses, agent phrases, coordination, and multi-clause sentences.
2. Use a parser-assisted reference to identify useful syntactic features and train/calibrate a compact task-specific detector or evaluate an exportable small parser.
3. Keep a separate untouched test set from another genre/source for final validation; report precision, recall, F1, per-class errors, confidence calibration, and mobile runtime/memory/transfer costs.
4. Only then prototype an optional lazy-loaded on-device inference module. Keep the current fast browser-local baseline and all active rewrites unchanged until the candidate demonstrates a meaningful improvement without unacceptable regressions.

No corpus sentences, tokens, lemmas, or matched spans are included in this document or the evaluator logs.
