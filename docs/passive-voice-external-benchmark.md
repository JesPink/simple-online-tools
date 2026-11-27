# External passive-voice benchmark

This research-only evaluator compares the current browser-local heuristic detector with the **held-out test split** of Universal Dependencies English Web Treebank (UD English-EWT) v2.18.

## Run

Requirements: Python 3.9+ and Node.js (the website's existing JavaScript runtime; no new npm dependency).

```bash
python3 scripts/evaluate-passive-voice-ud.py --self-test
python3 scripts/evaluate-passive-voice-ud.py
```

The full run downloads the pinned test split into memory, parses the gold labels, invokes the existing detector through Node.js, and prints aggregate precision, recall, F1, accuracy, and confusion-matrix counts. It does not save or print corpus sentences. Network access to GitHub is required.

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
