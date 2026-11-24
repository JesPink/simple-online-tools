/**
 * Prevent regressions in canonical internal URLs and stale route destinations.
 * Runs as part of npm run validate and npm run build.
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
const routeWithoutSlash = /^\/(?:category\/[^/]+|tools\/[^/]+|about|privacy|terms|contact)$/;
const registryPath = path.join(root, 'src/tool-registry.json');
const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const toolSlugs = new Set(registry.map(tool => tool.slug));
const categorySlugs = new Set(categories);
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
    const href = match[1];
    // Template-literal routes are validated separately below; they are not
    // concrete slugs and must not be compared against the route registry.
    if (href.includes('${')) continue;
    if (routeWithoutSlash.test(href)) {
      errors.push(`${relativePath}: internal route "${href}" is missing its trailing slash`);
      continue;
    }
    const categoryMatch = href.match(/^\/category\/([^/]+)\/$/);
    if (categoryMatch && !categorySlugs.has(categoryMatch[1])) {
      errors.push(`${relativePath}: unknown category route "${href}"`);
    }
    const toolMatch = href.match(/^\/tools\/([^/]+)\/$/);
    if (toolMatch && !toolMatch[1].includes('${') && !toolSlugs.has(toolMatch[1])) {
      errors.push(`${relativePath}: unknown tool route "${href}"`);
    }
    const pageMatch = href.match(/^\/(about|privacy|terms|contact)\/$/);
    if (href.startsWith('/') && /^(?:\/about|\/privacy|\/terms|\/contact)\/?$/.test(href) && !pageMatch) {
      errors.push(`${relativePath}: invalid static page route "${href}"`);
    }
  }
}

// Static pages must have one descriptive page H1; the site logo is branding, not a heading.
const staticPageHeadings = {
  about: 'About Simple Online Tools',
  contact: 'Contact Us',
  privacy: 'Privacy Policy',
  terms: 'Terms of Service'
};
for (const [page, expectedHeading] of Object.entries(staticPageHeadings)) {
  const pagePath = path.join(root, 'src', `${page}.html`);
  const html = fs.readFileSync(pagePath, 'utf8');
  const headings = [...html.matchAll(/<h1\\b[^>]*>([\\s\\S]*?)<\\/h1>/gi)];
  const headingText = headings[0]?.[1].replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').trim();
  if (headings.length !== 1 || headingText !== expectedHeading) {
    errors.push(`src/${page}.html: expected exactly one H1 ("${expectedHeading}"), found ${headings.length} (${headingText || 'none'})`);
  }
  if (!html.includes('<div class="brand-logo">Simple Online Tools</div>')) {
    errors.push(`src/${page}.html: site logo must use the non-heading brand-logo element`);
  }
  for (const linkedPage of staticPages) {
    if (!html.includes(`href="/${linkedPage}/"`)) {
      errors.push(`src/${page}.html: missing direct canonical footer link to /${linkedPage}/`);
    }
  }
}
const homepage = fs.readFileSync(path.join(root, 'src/index.html'), 'utf8');
for (const page of staticPages) {
  if (!homepage.includes(`href="/${page}/"`)) {
    errors.push(`src/index.html: missing direct canonical internal link to /${page}/`);
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
for (const [name, source] of [['header', header], ['footer', footer]]) {
  if (!source.includes('href="/category/${slug}/"')) {
    errors.push(`${name} component is missing the canonical dynamic category-link template`);
  }
  for (const slug of categories) {
    if (!source.includes(`['${slug}',`)) {
      errors.push(`${name} component is missing category definition: ${slug}`);
    }
  }
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
console.log(`✅ Canonical internal-link validation passed (${files.length} source files, ${categories.length} categories, ${registry.length} registered tools, ${staticPages.length} static routes, legacy 301s intact).`);
