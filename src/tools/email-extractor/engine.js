  let scannedTo = 0;
  let lineNumber = 1;
const EMAIL_PATTERN = /(?<![A-Z0-9.!#$%&'*+/=?^_\x60{|}~-])([A-Z0-9.!#$%&'*+/=?^_\x60{|}~-]+)@((?:[\p{L}\p{N}](?:[\p{L}\p{N}-]*[\p{L}\p{N}])?\.)+[\p{L}]{2,63})(?![A-Z0-9-]|\.[A-Z0-9])/giu;
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
  const tokenPattern = /\[\s*at\s*\]|\(\s*at\s*\)|\{\s*at\s*\}|\[\s*dot\s*\]|\(\s*dot\s*\)|\{\s*dot\s*\}/gi;
  const output = [];
  const positions = [];
  let cursor = 0;
  let match;
  while ((match = tokenPattern.exec(text)) !== null) {
    for (let index = cursor; index < match.index; index += 1) {
      output.push(text[index]);
      positions.push(index);
    }
    output.push(/at/i.test(match[0]) ? '@' : '.');
    positions.push(match.index);
    cursor = match.index + match[0].length;
  }
  for (let index = cursor; index < text.length; index += 1) {
    output.push(text[index]);
    positions.push(index);
  }
  return { text: output.join(''), positions };
}

function validateCandidate(email) {
  if (email.length > 254) return false;
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const [local, domain] = parts;
  if (!local || local.length > 64 || local.startsWith('.') || local.endsWith('.') || local.includes('..')) return false;
  if (!domain || domain.length > 253 || domain.startsWith('.') || domain.endsWith('.')) return false;
  const labels = domain.split('.');
  if (labels.length < 2 || labels.some(label => !label || label.length > 63 || label.startsWith('-') || label.endsWith('-'))) return false;
  if (FILE_LIKE_TLDS.has(labels[labels.length - 1].toLowerCase())) return false;
  return true;
}

function getLineContext(text, start, end, lineNumber) {
  const lineStart = text.lastIndexOf('\n', Math.max(0, start - 1)) + 1;
  const nextBreak = text.indexOf('\n', end);
  const lineEnd = nextBreak === -1 ? text.length : nextBreak;
  const line = text.slice(lineStart, lineEnd);
  const column = start - lineStart + 1;
  let context = line.trim();
  if (context.length > 180) {
    const relative = Math.max(0, start - lineStart);
    const from = Math.max(0, relative - 65);
    context = (from > 0 ? '…' : '') + line.slice(from, Math.min(line.length, from + 150)).trim() + (from + 150 < line.length ? '…' : '');
  }
  return { lineNumber, column, context };
}

export function extractEmails(value, options = {}) {
  const sourceText = String(value ?? '').replace(/\r\n?/g, '\n');
  const includeObfuscated = options.includeObfuscated !== false;
  const normalized = includeObfuscated ? normalizeObfuscation(sourceText) : {
    text: sourceText,
    positions: Array.from({ length: sourceText.length }, (_, index) => index)
  };
  const matches = [];
  EMAIL_PATTERN.lastIndex = 0;
  let match;
  while ((match = EMAIL_PATTERN.exec(normalized.text)) !== null) {
    const email = match[0];
    const transformedStart = match.index;
    const transformedEnd = transformedStart + email.length - 1;
    const start = normalized.positions[transformedStart] ?? transformedStart;
    const end = (normalized.positions[transformedEnd] ?? transformedEnd) + 1;
    lineNumber += (sourceText.slice(scannedTo, start).match(/\n/g) || []).length;
    scannedTo = end;
    if (!validateCandidate(email)) continue;
    const original = sourceText.slice(start, end);
    const context = getLineContext(sourceText, start, end);
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
  let output = String(text ?? '');
  const ordered = [...matches].sort((a, b) => b.start - a.start);
  for (const match of ordered) {
    output = output.slice(0, match.start) + replacement + output.slice(match.end);
  }
  return output;
}

export function getEmailStats(matches) {
  const groups = groupEmailMatches(matches);
  return {
    unique: groups.length,
    occurrences: matches.length,
    domains: new Set(groups.map(item => item.domain)).size
  };
}
