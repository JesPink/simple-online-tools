import { test, expect } from '@playwright/test';
import { decodeHtmlCharacterReferences, extractMetaDescriptions } from '../scripts/meta-description-utils.js';

test.describe('Meta description extraction', () => {
  test('reads content regardless of meta attribute order and quote style', () => {
    const html = [
      '<meta name="description" content="First description">',
      "<meta content='Second description' name='description'>",
      '<meta property="og:description" content="Not a meta description">'
    ].join('');
    expect(extractMetaDescriptions(html)).toEqual(['First description', 'Second description']);
  });

  test('extracts every description tag in a document', () => {
    const html = '<meta name="description" content="One"><meta name="description" content="Two">';
    expect(extractMetaDescriptions(html)).toEqual(['One', 'Two']);
  });

  test('decodes named, decimal, and hexadecimal character references before comparison', () => {
    const variants = ['A &amp; B', 'A &#38; B', 'A &#x26; B'];
    expect(variants.map(decodeHtmlCharacterReferences)).toEqual(['A & B', 'A & B', 'A & B']);
  });

  test('does not treat unrelated or malformed entities as decoded text', () => {
    expect(decodeHtmlCharacterReferences('A &unknown; B &#xZZ;')).toBe('A &unknown; B &#xZZ;');
  });
});
