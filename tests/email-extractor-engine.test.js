import test from 'node:test';
import assert from 'node:assert/strict';
import {
  extractEmails,
  getEmailStats,
  groupEmailMatches,
  prepareSourceText,
  removeEmailMatches
} from '../src/tools/email-extractor/engine.js';

test('extracts ordinary addresses and keeps punctuation out of the match', () => {
  const matches = extractEmails('Contact jane.doe+news@example.com, then email support@example.org.');
  assert.deepEqual(matches.map(match => match.email), ['jane.doe+news@example.com', 'support@example.org']);
});

test('groups duplicate addresses without losing occurrence locations', () => {
  const text = 'hello@sample.com\nHello@Sample.com\nother@sample.com';
  const matches = extractEmails(text).map(match => ({ ...match, sourceName: 'notes.txt' }));
  const groups = groupEmailMatches(matches);
  assert.equal(groups.length, 2);
  assert.equal(groups[0].count, 2);
  assert.equal(groups[0].occurrences[1].line, 2);
  assert.deepEqual(getEmailStats(matches), { unique: 2, occurrences: 3, domains: 1 });
});

test('recognizes common bracketed obfuscation only when enabled', () => {
  const text = 'Contact name [at] example [dot] com or admin(at)example(dot)org.';
  const matches = extractEmails(text);
  assert.deepEqual(matches.map(match => match.email), ['name@example.com', 'admin@example.org']);
  assert.equal(matches[0].matchType, 'Obfuscated');
  assert.equal(extractEmails(text, { includeObfuscated: false }).length, 0);
});

test('does not reinterpret ordinary prose containing the word at as an address', () => {
  assert.equal(extractEmails('Please contact me at jane@example.com for help.').length, 1);
  assert.equal(extractEmails('I was at the office today.').length, 0);
});

test('rejects malformed addresses and common asset filename false positives', () => {
  const matches = extractEmails('bad..dots@example.com .bad@example.com logo@2x.png good@example.co');
  assert.deepEqual(matches.map(match => match.email), ['good@example.co']);
});

test('extracts internationalized domain labels', () => {
  const matches = extractEmails('hello@пример.рф');
  assert.equal(matches.length, 1);
  assert.equal(matches[0].email, 'hello@пример.рф');
});

test('converts HTML to readable text and preserves mailto targets', () => {
  const html = '<html><body><script>fake@script.com</script><p>Contact us</p><a href="mailto:help@example.com">Support</a></body></html>';
  const text = prepareSourceText(html, 'contacts.html');
  const matches = extractEmails(text);
  assert.deepEqual(matches.map(match => match.email), ['help@example.com']);
  assert.match(text, /Contact us/);
});

test('removes matched addresses from a copy without mutating the original', () => {
  const original = 'Email jane@example.com or help@example.org today.';
  const matches = extractEmails(original);
  assert.equal(removeEmailMatches(original, matches, '[removed]'), 'Email [removed] or [removed] today.');
  assert.equal(original, 'Email jane@example.com or help@example.org today.');
});

test('reports the correct source line and column', () => {
  const matches = extractEmails('first line\nEmail: jane@example.com');
  assert.equal(matches[0].line, 2);
  assert.equal(matches[0].column, 8);
});
