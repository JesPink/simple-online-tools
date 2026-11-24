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
const robotsPath = path.join(root, 'robots.txt');
if (!fs.existsSync(robotsPath)) errors.push('dist/robots.txt is missing');
else if (!/^Disallow: \/cdn-cgi\/$/m.test(fs.readFileSync(robotsPath, 'utf8'))) {
  errors.push('Generated dist/robots.txt must disallow Cloudflare-managed /cdn-cgi/ endpoints');
}
const registryPath = path.resolve('src/tool-registry.json');
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const categories = [...new Set(registry.map(tool => tool.primaryCategory))];
  for (const category of categories) {
    const relative = `category/${category}/index.html`;
    if (!exists(relative)) {
      errors.push(`Missing generated category page: ${relative}`);
      continue;
    }
    const html = fs.readFileSync(path.join(root, relative), 'utf8');
    const visibleText = html.replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/&(?:nbsp|amp|lt|gt|quot|#39);/g, ' ')
      .replace(/\\s+/g, ' ').trim();
    const wordCount = visibleText.split(' ').filter(Boolean).length;
    if (wordCount < 250 || wordCount > 700) {
      errors.push(`${relative}: category decision page has ${wordCount} visible words (expected 250–700; review for thin or padded content)`);
    }
    if (!html.includes(`href="/category/`) || !html.includes('category-related-links')) {
      errors.push(`${relative}: missing crawlable related-category links`);
    }
    for (const tool of registry.filter(item => item.primaryCategory === category)) {
      if (!html.includes(`href="/tools/${tool.slug}/"`)) {
        errors.push(`${relative}: missing crawlable link to ${tool.slug}`);
      }
    }
  }
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
