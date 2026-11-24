/**
 * Prevent regressions in canonical internal URLs.
 * Checks static HTML, navigation components, dynamic category templates,
 * and preservation of Cloudflare's legacy 301 redirects.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = [
  'src/index.html',
  'src/about.html',
  'src/contact.html',
  'src/privacy.html',
  'src/terms.html',
  'src/app.js',
  'src/components/header.js',
  'src/components/footer.js'
];
const categories = [
  'text-and-writing',
  'productivity-and-business',
  'files-and-docs',
  'seo-and-marketing',
  'utilities-and-conversion'
];
const staticPages = ['about', 'privacy', 'terms', 'contact'];
const canonicalRoute = /^\/(?:category\/[^/]+|tools\/[^/]+|about|privacy|terms|contact)$/;
const errors = [];

for (const relativePath of files) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    errors.push(`Missing file: ${relativePath}`);
    continue;
  }
  const source = fs.readFileSync(absolutePath, 'utf8');
  const hrefs = /href=["'](\/[^"'?#]*)["']/g;
  for (const match of source.matchAll(hrefs)) {
    if (canonicalRoute.test(match[1])) {
      errors.push(`${relativePath}: internal route "${match[1]}" is missing its trailing slash`);
    }
  }
}

const app = fs.readFileSync(path.join(root, 'src/app.js'), 'utf8');
for (const expression of [
  'href="/category/${category}/"',
  'href="/category/${toolConfig.primaryCategory}/"'
]) {
  if (!app.includes(expression)) {
    errors.push(`src/app.js: expected canonical dynamic link template not found: ${expression}`);
  }
}

const header = fs.readFileSync(path.join(root, 'src/components/header.js'), 'utf8');
const footer = fs.readFileSync(path.join(root, 'src/components/footer.js'), 'utf8');
for (const slug of categories) {
  if (!header.includes(`/category/${slug}/`)) errors.push(`header component missing category route: ${slug}`);
  if (!footer.includes(`/category/${slug}/`)) errors.push(`footer component missing category route: ${slug}`);
}
for (const page of staticPages) {
  if (!footer.includes(`href="/${page}/"`)) errors.push(`footer component missing canonical page route: ${page}`);
}

const redirectPath = path.join(root, 'public/_redirects');
if (!fs.existsSync(redirectPath)) {
  errors.push('Missing public/_redirects; legacy redirects must remain available');
} else {
  const lines = fs.readFileSync(redirectPath, 'utf8').split(/\r?\n/).map(line => line.trim());
  for (const route of [...categories.map(slug => `/category/${slug}`), ...staticPages.map(page => `/${page}`)]) {
    if (!lines.includes(`${route} ${route}/ 301`)) {
      errors.push(`public/_redirects: missing legacy 301 redirect for ${route}`);
    }
  }
}

if (errors.length) {
  console.error('❌ Canonical internal-link validation failed:');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log(`✅ Canonical internal-link validation passed (${files.length} source files, ${categories.length} categories, ${staticPages.length} static routes, legacy 301s intact).`);
