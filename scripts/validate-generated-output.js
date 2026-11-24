/**
 * Validate generated HTML, 404 document, and sitemap destinations.
 */
import fs from 'node:fs';
import path from 'node:path';
import { getCategorySEO } from '../src/category-content.js';

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
  const renderedCategoryHeadings = new Set();

  for (const category of categories) {
    const relative = `category/${category}/index.html`;
    if (!exists(relative)) {
      errors.push(`Missing generated category page: ${relative}`);
      continue;
    }
    const html = fs.readFileSync(path.join(root, relative), 'utf8');
    const categoryContent = getCategorySEO(category);
    for (const field of ['decisionHeading', 'workflowHeading', 'notesHeading', 'relatedHeading']) {
      const expectedHeading = categoryContent[field];
      if (!expectedHeading || !html.includes(`<h2>${expectedHeading}</h2>`)) {
        errors.push(`${relative}: generated HTML is missing the category-specific ${field}`);
      } else if (renderedCategoryHeadings.has(expectedHeading)) {
        errors.push(`${relative}: duplicate category H2 across generated pages: ${expectedHeading}`);
      } else {
        renderedCategoryHeadings.add(expectedHeading);
      }
    }
    const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
    const descriptionMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    const h2Texts = [...html.matchAll(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi)]
      .map(match => match[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim());
    if (category === 'productivity-and-business' && (!titleMatch || titleMatch[1].length > 60)) {
      errors.push(`${relative}: category title is missing or exceeds 60 characters`);
    }
    if (category === 'productivity-and-business' && (!descriptionMatch || descriptionMatch[1].length > 155)) {
      errors.push(`${relative}: category meta description is missing or exceeds 155 characters`);
    }
    if (new Set(h2Texts).size !== h2Texts.length) {
      errors.push(`${relative}: repeated H2 text found within category page`);
    }
    const contentMatch = html.match(/<section\b[^>]*class="[^"]*\bcategory-decision-content\b[^"]*"[^>]*>([\s\S]*?)<\/section>/i);
    if (!contentMatch) {
      errors.push(`${relative}: missing category decision content section`);
      continue;
    }
    const visibleText = contentMatch[1].replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&(?:nbsp|amp|lt|gt|quot|#39);/g, " ")
      .replace(/\s+/g, " ").trim();
    const wordCount = visibleText.split(" ").filter(Boolean).length;
    if (wordCount < 300 || wordCount > 600) {
      errors.push(`${relative}: category editorial section has ${wordCount} visible words (expected 300–600; review the actual category content)`);
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
// Guard the three tool-page descriptions shortened after the Screaming Frog audit.
if (fs.existsSync(registryPath)) {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  for (const slug of ['case-converter', 'pdf-metadata-editor', 'recipe-scaler']) {
    const relative = `tools/${slug}/index.html`;
    if (!exists(relative)) {
      errors.push(`Missing generated tool page: ${relative}`);
      continue;
    }
    const html = fs.readFileSync(path.join(root, relative), 'utf8');
    const descriptionMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
    if (!descriptionMatch || descriptionMatch[1].length > 155) {
      errors.push(`${relative}: meta description is missing or exceeds 155 characters`);
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
// Validate static-page heading hierarchy and direct internal discovery links.
const staticPageHeadings = {
  about: 'About Simple Online Tools',
  contact: 'Contact Us',
  privacy: 'Privacy Policy',
  terms: 'Terms of Service'
};
const staticRoutes = Object.keys(staticPageHeadings);
const homepagePath = path.join(root, 'index.html');
if (!fs.existsSync(homepagePath)) {
  errors.push('dist/index.html is missing; static-page discovery links cannot be checked');
} else {
  const homepage = fs.readFileSync(homepagePath, 'utf8');
  for (const page of staticRoutes) {
    if (!homepage.includes(`href="/${page}/"`)) {
      errors.push(`dist/index.html: missing direct canonical internal link to /${page}/`);
    }
  }
}
for (const [page, expectedHeading] of Object.entries(staticPageHeadings)) {
  const relative = `${page}/index.html`;
  if (!exists(relative)) {
    errors.push(`Missing generated static page: dist/${relative}`);
    continue;
  }
  const html = fs.readFileSync(path.join(root, relative), 'utf8');
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
  const headingText = headings[0]?.[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
  if (headings.length !== 1 || headingText !== expectedHeading) {
    errors.push(`dist/${relative}: expected exactly one H1 ("${expectedHeading}"), found ${headings.length} (${headingText || 'none'})`);
  }
  for (const linkedPage of staticRoutes) {
    if (!html.includes(`href="/${linkedPage}/"`)) {
      errors.push(`dist/${relative}: missing direct canonical footer link to /${linkedPage}/`);
    }
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
