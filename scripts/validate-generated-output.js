/**
 * Validate generated HTML, 404 document, and sitemap destinations.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('dist');
const errors = [];
const exists = relative => fs.existsSync(path.join(root, relative));
function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap(entry => {
    const absolute = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(absolute) : [absolute];
  });
}
if (!exists('404.html')) errors.push('dist/404.html is missing');
else if (!/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(fs.readFileSync(path.join(root, '404.html'), 'utf8'))) {
  errors.push('dist/404.html must be noindex');
}
const htmlFiles = walk(root).filter(file => file.endsWith('.html'));
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const relative = path.relative(root, file).replace(/\\/g, '/');
  if (/<meta\b[^>]*(?:property=["']og:image["']|name=["']twitter:image["'])[^>]*>/i.test(html) ||
      /https?:\/\/simpleonlinetool\.com\/images\/[^"'\s>]+/i.test(html) ||
      /summary_large_image/i.test(html)) {
    errors.push(`${relative}: generated HTML contains an unresolved social-image reference`);
  }
}
const sitemapPath = path.join(root, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) errors.push('dist/sitemap.xml is missing');
else {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const locations = [...sitemap.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map(match => match[1]);
  if (!locations.length) errors.push('Sitemap has no URLs');
  for (const location of locations) {
    const url = new URL(location);
    const pathname = decodeURIComponent(url.pathname);
    if (pathname !== '/' && !pathname.endsWith('/')) { errors.push(`Noncanonical sitemap URL: ${location}`); continue; }
    const relative = pathname === '/' ? 'index.html' : `${pathname.slice(1)}index.html`;
    if (!exists(relative)) errors.push(`Sitemap URL has no generated page: ${location}`);
  }
}
if (errors.length) {
  console.error('❌ Generated-output validation failed:');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log(`✅ Generated-output validation passed (${htmlFiles.length} HTML pages, 404 page present, sitemap destinations exist).`);
