const NAMED_ENTITIES = Object.freeze({
  amp: '&',
  apos: "'",
  gt: '>',
  lt: '<',
  nbsp: '\u00a0',
  quot: '"'
});

export function decodeHtmlCharacterReferences(value) {
  return String(value).replace(/&(#(?:x[\da-f]+|\d+)|[a-z][a-z\d]+);/gi, (entity, reference) => {
    if (reference[0] !== '#') {
      return Object.prototype.hasOwnProperty.call(NAMED_ENTITIES, reference.toLowerCase())
        ? NAMED_ENTITIES[reference.toLowerCase()]
        : entity;
    }

    const isHex = reference[1]?.toLowerCase() === 'x';
    const codePoint = Number.parseInt(reference.slice(isHex ? 2 : 1), isHex ? 16 : 10);
    if (!Number.isInteger(codePoint) || codePoint < 0 || codePoint > 0x10ffff ||
        (codePoint >= 0xd800 && codePoint <= 0xdfff)) return '\uFFFD';
    return String.fromCodePoint(codePoint);
  });
}

function getAttribute(tag, name) {
  for (const match of tag.matchAll(/([^\s=/>]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g)) {
    if (match[1].toLowerCase() === name) return match[2] ?? match[3] ?? match[4] ?? '';
  }
  return null;
}

export function extractMetaDescriptions(html) {
  const descriptions = [];
  for (const match of String(html).matchAll(/<meta\b[^>]*>/gi)) {
    const tag = match[0];
    if ((getAttribute(tag, 'name') || '').toLowerCase() !== 'description') continue;
    const content = getAttribute(tag, 'content');
    if (content !== null) descriptions.push(decodeHtmlCharacterReferences(content));
  }
  return descriptions;
}
