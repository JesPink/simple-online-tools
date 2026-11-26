/**
 * Guard SEO metadata and Cloudflare Pages not-found routing.
 */
import fs from 'node:fs';
import path from 'node:path';
import { getCategorySEO } from '../src/category-content.js';

const root = process.cwd();
const errors = [];
const isValidIsoDate = value => typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value));
const htmlFiles = [
  'src/index.html',
  'src/about.html',
  'src/contact.html',
  'src/privacy.html',
  'src/terms.html'
];
for (const file of htmlFiles) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) { errors.push(`Missing HTML source: ${file}`); continue; }
  const html = fs.readFileSync(fullPath, 'utf8');
  if (/<meta\b[^>]*(?:property=["']og:image["']|name=["']twitter:image["'])[^>]*>/i.test(html)) {
    errors.push(`${file}: social image metadata points to an asset that is not present in public/images/`);
  }
  if (/summary_large_image/i.test(html)) errors.push(`${file}: large-image Twitter card has no image asset`);
}
const robotsSourcePath = path.join(root, 'public/robots.txt');
if (!fs.existsSync(robotsSourcePath)) errors.push('Missing public/robots.txt source');
else if (!/^Disallow: \/cdn-cgi\/$/m.test(fs.readFileSync(robotsSourcePath, 'utf8'))) {
  errors.push('public/robots.txt must disallow Cloudflare-managed /cdn-cgi/ endpoints');
}
const registryPath = path.join(root, 'src/tool-registry.json');
if (!fs.existsSync(registryPath)) errors.push('Missing src/tool-registry.json');
else {
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  const categories = [...new Set(registry.map(tool => tool.primaryCategory))];
  const categoryHeadingFields = ['decisionHeading'];
  for (const field of categoryHeadingFields) {
    const values = categories.map(category => getCategorySEO(category)[field]);
    if (values.some(value => !value) || new Set(values).size !== values.length) {
      errors.push(`Category H2 field ${field} must be present and unique across all category pages`);
    }
  }

  for (const category of categories) {
    try {
      const content = getCategorySEO(category);
      if (!isValidIsoDate(content.lastModified)) errors.push(`Category ${category} must have a valid, explicit lastModified date`);
      if (content.seoTitle.length > 60) errors.push(`Category ${category} SEO title exceeds 60 characters (${content.seoTitle.length})`);
      if (content.metaDescription.length > 155) errors.push(`Category ${category} meta description exceeds 155 characters (${content.metaDescription.length})`);
      const categoryTools = registry.filter(tool => tool.primaryCategory === category);
      for (const tool of categoryTools) {
        if (!content.tools[tool.slug]) errors.push(`Category ${category} is missing a unique description for ${tool.slug}`);
        if (!isValidIsoDate(tool.seo?.lastModified)) errors.push(`Tool ${tool.slug} must have a valid, explicit SEO lastModified date`);
      }
      if (category === 'productivity-and-business' && content.seoTitle !== 'Free Business Tools for Invoices, Meetings & Messaging') {
        errors.push('Productivity & Business title must retain its primary topic and core tool intents in a concise title');
      }
      const requiredShortDescriptions = {
        'case-converter': 'Convert text to uppercase, lowercase, sentence case, or title case. Format writing, headings, and code snippets online for free.',
        'pdf-metadata-editor': 'View and edit common PDF document-information fields, or clear supported fields before sharing. This is not a full PDF sanitization tool.',
        'recipe-scaler': 'Scale recipe ingredients for more or fewer servings. Adjust quantities and fractions online, then review seasonings and cooking times.',
        'meta-description-generator': 'Draft meta description ideas from a page title and summary. Compare template-based variations, check character counts, and edit before publishing.',
        'meeting-cost-calculator': 'Track a meeting\'s live cost from participant hourly rates and elapsed time. Add attendees, pause or reset the timer, and view cost projections.'
      };
      for (const tool of categoryTools) {
        if (requiredShortDescriptions[tool.slug] && tool.seo?.metaDescription !== requiredShortDescriptions[tool.slug]) {
          errors.push(`Tool ${tool.slug} meta description does not match the reviewed concise copy`);
        }
      }
      if (content.related.includes(category)) errors.push(`Category ${category} links to itself`);
    } catch (error) {
      errors.push(error.message);
    }
  }
}
const build = fs.readFileSync(path.join(root, 'esbuild.config.js'), 'utf8');
if (!/Disallow: \/cdn-cgi\//.test(build)) {
  errors.push('Generated robots.txt must disallow Cloudflare-managed /cdn-cgi/ endpoints');
}
if (/OG_IMAGE|TWITTER_IMAGE|homepage-preview\.jpg|-preview\.jpg/.test(build)) {
  errors.push('esbuild.config.js still generates URLs for nonexistent social preview images');
}
const imagesDir = path.join(root, 'public/images');
const imageFiles = fs.existsSync(imagesDir) ? fs.readdirSync(imagesDir).filter(name => /\.(?:jpe?g|png|webp|gif)$/i.test(name)) : [];
if (imageFiles.length) console.log(`ℹ️ Found ${imageFiles.length} real public image asset(s).`);
const redirectPath = path.join(root, 'public/_redirects');
if (!fs.existsSync(redirectPath)) errors.push('Missing public/_redirects');
else {
  const redirects = fs.readFileSync(redirectPath, 'utf8').split(/\r?\n/).map(line => line.trim());
  for (const route of ['/tools/text-formatter/', '/tools/character-counter/']) {
    if (redirects.some(line => line === `${route} / 301`)) errors.push(`${route} must not redirect to the homepage (soft 404)`);
  }
}
const headersPath = path.join(root, 'public/_headers');
if (fs.existsSync(headersPath) && /^\/images\/\*/m.test(fs.readFileSync(headersPath, 'utf8'))) {
  errors.push('Remove the immutable /images/* cache rule while the directory contains no images');
}
const notFound = path.join(root, 'public/404.html');
if (!fs.existsSync(notFound)) errors.push('Missing public/404.html required for Cloudflare Pages 404 behavior');
else if (!/<meta\s+name=["']robots["']\s+content=["'][^"']*noindex/i.test(fs.readFileSync(notFound, 'utf8'))) {
  errors.push('public/404.html must contain robots noindex');
}
if (errors.length) {
  console.error('❌ SEO/routing validation failed:');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log('✅ SEO/routing validation passed (no broken social-image references, proper 404 page, no homepage soft-404 redirects).');
