const EMAIL_PATTERN = /(?<![\p{L}\p{N}.!#$%&'*+/=?^_\x60{|}~-])([\p{L}\p{N}.!#$%&'*+/=?^_\x60{|}~-]+)@((?:[\p{L}\p{N}](?:[\p{L}\p{N}-]*[\p{L}\p{N}])?\.)+[\p{L}]{2,63})(?![\p{L}\p{N}-]|\.[\p{L}\p{N}])/giu;
const utf8Encoder = new TextEncoder();
const FILE_LIKE_TLDS = new Set(['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg', 'ico', 'css', 'js', 'map', 'woff', 'woff2', 'ttf', 'eot']);

function decodeEntities(value) {
  return value
    .replace(/&commat;/gi, '@')
    .replace(/&period;/gi, '.')
    .replace(/&amp;/gi, '&')
    .replace(/&#(\d+);/g, (_, code) => {
      const point = Number(code);
      return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : _;
    })
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => {
      const point = parseInt(code, 16);
      return point > 0 && point <= 0x10ffff ? String.fromCodePoint(point) : _;
    })
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'");
}

export function prepareSourceText(value, fileName = '') {
  let text = String(value ?? '').replace(/\r\n?/g, '\n');
  const extension = String(fileName).split('.').pop().toLowerCase();
  if (['html', 'htm'].includes(extension)) {
    text = text
      .replace(/<!--[\s\S]*?-->/g, '\n')
      .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, '\n')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, '\n')
      .replace(/<a\b[^>]*href\s*=\s*["']mailto:([^"']+)["'][^>]*>/gi, (_, target) => ' mailto:' + target.split('?')[0] + ' ')
      .replace(/<(?:br|\/p|\/div|\/li|\/tr|\/h[1-6]|\/section|\/article|\/td|\/th)\b[^>]*>/gi, '\n')
      .replace(/<[^>]*>/g, ' ');
    text = decodeEntities(text);
  }
  return text;
}

function normalizeObfuscation(text) {
  const tokenPattern = /\s*\[\s*at\s*\]\s*|\s*\(\s*at\s*\)\s*|\s*\{\s*at\s*\}\s*|\s*\[\s*dot\s*\]\s*|\s*\(\s*dot\s*\)\s*|\s*\{\s*dot\s*\}\s*/gi;
  const parts = [];
  const replacements = [];
  let cursor = 0;
  let normalizedLength = 0;
  let cumulativeDelta = 0;
  let match;
  while ((match = tokenPattern.exec(text)) !== null) {
    const prefix = text.slice(cursor, match.index);
    parts.push(prefix);
    normalizedLength += prefix.length;
    cumulativeDelta += match[0].length - 1;
    replacements.push({
      normalizedIndex: normalizedLength,
      sourceStart: match.index,
      cumulativeDeltaAfter: cumulativeDelta
    });
    parts.push(/at/i.test(match[0]) ? '@' : '.');
    normalizedLength += 1;
    cursor = match.index + match[0].length;
  }
  parts.push(text.slice(cursor));
  return { text: parts.join(''), replacements };
}

function mapNormalizedOffset(offset, replacements) {
  let low = 0;
  let high = replacements.length - 1;
  let previous = -1;
  while (low <= high) {
    const middle = (low + high) >> 1;
    const replacement = replacements[middle];
    if (replacement.normalizedIndex < offset) {
      previous = middle;
      low = middle + 1;
    } else if (replacement.normalizedIndex === offset) {
      return replacement.sourceStart;
    } else {
      high = middle - 1;
    }
  }
  return offset + (previous >= 0 ? replacements[previous].cumulativeDeltaAfter : 0);
}

function validateCandidate(email) {
  const [local, domain] = email.split('@');
  const byteLength = value => utf8Encoder.encode(value).length;
  if (byteLength(email) > 254) return false;
  if (!local || byteLength(local) > 64 || local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
  if (!domain || byteLength(domain) > 253 || domain.startsWith('.') || domain.endsWith('.')) return false;
  const labels = domain.split('.');
  if (labels.length < 2 || labels.some(label => !label || byteLength(label) > 63 || label.startsWith('-') || label.endsWith('-'))) return false;
  if (FILE_LIKE_TLDS.has(labels[labels.length - 1].toLowerCase())) return false;
  return true;
}

function getLineContext(text, start, end, lineNumber) {
  const lineStart = text.lastIndexOf('\n', Math.max(0, start - 1)) + 1;
  const nextBreak = text.indexOf('\n', end);
  const lineEnd = nextBreak === -1 ? text.length : nextBreak;
  const line = text.slice(lineStart, lineEnd);
  const column = start - lineStart + 1;
  let context;
  if (line.length > 180) {
    const relative = Math.max(0, start - lineStart);
    const from = Math.max(0, relative - 65);
    context = (from > 0 ? '…' : '') + line.slice(from, Math.min(line.length, from + 150)).trim() + (from + 150 < line.length ? '…' : '');
  } else {
    context = line.trim();
  }
  return { lineNumber, column, context };
}

export function extractEmails(value, options = {}) {
  const sourceText = String(value ?? '').replace(/\r\n?/g, '\n');
  const normalized = options.includeObfuscated === false
    ? { text: sourceText, replacements: [] }
    : normalizeObfuscation(sourceText);
  const matches = [];
  EMAIL_PATTERN.lastIndex = 0;
  let match;
  let scannedTo = 0;
  let lineNumber = 1;
  while ((match = EMAIL_PATTERN.exec(normalized.text)) !== null) {
    const email = match[0];
    const transformedStart = match.index;
    const transformedEnd = transformedStart + email.length - 1;
    const start = mapNormalizedOffset(transformedStart, normalized.replacements);
    const end = mapNormalizedOffset(transformedEnd, normalized.replacements) + 1;
    lineNumber += (sourceText.slice(scannedTo, start).match(/\n/g) || []).length;
    scannedTo = end;
    if (!validateCandidate(email)) continue;
    const original = sourceText.slice(start, end);
    const context = getLineContext(sourceText, start, end, lineNumber);
    const before = sourceText.slice(Math.max(0, start - 9), start);
    const matchType = !original.includes('@') ? 'Obfuscated' : (/mailto:\s*$/i.test(before) ? 'mailto link' : 'Text match');
    matches.push({
      email,
      normalizedEmail: email.toLowerCase(),
      original,
      start,
      end,
      line: context.lineNumber,
      column: context.column,
      context: context.context,
      matchType
    });
  }
  return matches;
}

export function groupEmailMatches(matches) {
  const grouped = new Map();
  for (const match of matches) {
    const key = match.normalizedEmail || match.email.toLowerCase();
    if (!grouped.has(key)) {
      grouped.set(key, {
        email: match.email,
        normalizedEmail: key,
        domain: match.email.slice(match.email.lastIndexOf('@') + 1).toLowerCase(),
        count: 0,
        occurrences: []
      });
    }
    const group = grouped.get(key);
    group.count += 1;
    group.occurrences.push(match);
  }
  return [...grouped.values()];
}

export function removeEmailMatches(text, matches, replacement = '') {
  const source = String(text ?? '');
  const ordered = [...matches].sort((a, b) => a.start - b.start);
  const parts = [];
  let cursor = 0;
  for (const match of ordered) {
    if (match.start < cursor) continue;
    parts.push(source.slice(cursor, match.start), replacement);
    cursor = match.end;
  }
  parts.push(source.slice(cursor));
  return parts.join('');
}

export function getEmailStats(matches) {
  const groups = groupEmailMatches(matches);
  return {
    unique: groups.length,
    occurrences: matches.length,
    domains: new Set(groups.map(item => item.domain)).size
  };
}
