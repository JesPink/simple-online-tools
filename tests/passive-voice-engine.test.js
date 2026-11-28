import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzePassiveText } from '../src/tools/passive-voice-detector/engine.js';
import { passiveVoiceBenchmark, passiveRewriteBenchmark } from './fixtures/passive-voice-benchmark.js';

test('labeled benchmark: sentence detection and passive construction counts', () => {
  const failures = [];
  const metrics = { truePositive: 0, falsePositive: 0, trueNegative: 0, falseNegative: 0 };

  for (const sample of passiveVoiceBenchmark) {
    const results = analyzePassiveText(sample.text);
    const actualPassive = results.some(result => result.isPassive);
    const actualConstructions = results.reduce((count, result) =>
      count + (result.isPassive ? 1 : 0) + (result.additionalPatterns || []).length, 0);

    if (sample.passive && actualPassive) metrics.truePositive++;
    else if (!sample.passive && !actualPassive) metrics.trueNegative++;
    else if (actualPassive) metrics.falsePositive++;
    else metrics.falseNegative++;

    if (actualPassive !== sample.passive) {
      failures.push(`${sample.id}: expected passive=${sample.passive}, got ${actualPassive}`);
    }
    if (actualConstructions !== sample.clauses) {
      failures.push(`${sample.id}: expected ${sample.clauses} construction(s), got ${actualConstructions}`);
    }
  }

  const precision = metrics.truePositive + metrics.falsePositive
    ? metrics.truePositive / (metrics.truePositive + metrics.falsePositive) : 1;
  const recall = metrics.truePositive + metrics.falseNegative
    ? metrics.truePositive / (metrics.truePositive + metrics.falseNegative) : 1;
  console.log('[Passive engine benchmark]', JSON.stringify({
    examples: passiveVoiceBenchmark.length,
    ...metrics,
    precision: Number(precision.toFixed(4)),
    recall: Number(recall.toFixed(4))
  }));

  assert.deepEqual(failures, [], failures.join('\n'));
});

test('labeled rewrite benchmark: generated active versions match reviewed outputs', () => {
  const failures = [];
  for (const sample of passiveRewriteBenchmark) {
    const results = analyzePassiveText(sample.text);
    const actual = results.find(result => result.isPassive)?.activeRewrite ?? null;
    if (actual !== sample.rewrite) {
      failures.push(`${sample.id}: expected "${sample.rewrite}", got "${actual}"`);
    }
  }
  assert.deepEqual(failures, [], failures.join('\n'));
});

test('passive auxiliaries allow bounded adverb and negation gaps', () => {
  const passiveExamples = [
    'The report has recently been fully reviewed.',
    'The documents have not yet been signed.',
    'The application had already been carefully checked.',
    'The files are being quickly copied.'
  ];

  for (const text of passiveExamples) {
    const results = analyzePassiveText(text);
    assert.equal(results.length, 1, text);
    assert.equal(results[0].isPassive, true, text);
  }

  const activeExamples = [
    'The team has already completed the migration.',
    'The editors have recently reviewed the report.',
    'The staff are quickly copying the files.'
  ];

  for (const text of activeExamples) {
    const results = analyzePassiveText(text);
    assert.equal(results.some(result => result.isPassive), false, text);
  }
});

test('reported modal-perfect sentence contains exactly two passive constructions in one sentence', () => {
  const text = 'His life could have been saved if the right medicine had been given to him immediately after the accident.';
  const results = analyzePassiveText(text);
  assert.equal(results.length, 1);
  assert.equal(results[0].isPassive, true);
  assert.equal(results[0].additionalPatterns.length, 1);
  assert.equal((results[0].isPassive ? 1 : 0) + results[0].additionalPatterns.length, 2);
});

test('unsafe and ambiguous structures never receive an automatic rewrite', () => {
  const examples = [
    'The report was written yesterday.',
    'Was the report written by Maya?',
    'The report was written and published by Maya.',
    'The report was drafted and the editor approved it.',
    'The report was written by John in 2020.'
  ];
  for (const text of examples) {
    const results = analyzePassiveText(text);
    assert.ok(results.some(result => result.isPassive), `Expected passive pattern: ${text}`);
    assert.equal(results.some(result => result.activeRewrite), false, `Unexpected rewrite: ${text}`);
    assert.equal(results.some(result => (result.additionalPatterns || []).some(pattern => pattern.activeRewrite)), false);
  }
});

test('sentence offsets remain aligned with original whitespace', () => {
  const text = '  \n  The report was written by John. The editor reviewed it.  ';
  const results = analyzePassiveText(text);
  assert.equal(results.length, 2);
  assert.equal(text.slice(results[0].start, results[0].start + results[0].sentence.length), results[0].sentence);
  assert.equal(results[0].activeRewrite, 'John wrote the report.');
});

test('large multi-sentence input is processed and counted consistently', () => {
  const text = Array.from({ length: 250 }, (_, index) =>
    `The report ${index + 1} was written by Maya.`).join(' ');
  const results = analyzePassiveText(text);
  assert.equal(results.length, 250);
  assert.equal(results.filter(result => result.isPassive).length, 250);
  assert.equal(results.reduce((count, result) =>
    count + (result.isPassive ? 1 : 0) + (result.additionalPatterns || []).length, 0), 250);
});
