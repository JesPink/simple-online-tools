/**
 * Guard SEO metadata and Cloudflare Pages not-found routing.
 */
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
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
  if (/<meta\\b[^>]*(?:property=["']og:image["']|name=["']twitter:image["'])[^>]*>/i.test(html)) {
    errors.push(`${file}: social image metadata points to an asset that is not present in public/images/`);
  }
  if (/summary_large_image/i.test(html)) errors.push(`${file}: large-image Twitter card has no image asset`);
}
const build = fs.readFileSync(path.join(root, 'esbuild.config.js'), 'utf8');
if (/OG_IMAGE|TWITTER_IMAGE|homepage-preview\\.jpg|-preview\\.jpg/.test(build)) {
  errors.push('esbuild.config.js still generates URLs for nonexistent social preview images');
}
const imagesDir = path.join(root, 'public/images');
const imageFiles = fs.existsSync(imagesDir) ? fs.readdirSync(imagesDir).filter(name => /\\.(?:jpe?g|png|webp|gif)$/i.test(name)) : [];
if (imageFiles.length) console.log(`ℹ️ Found ${imageFiles.length} real public image asset(s).`);
const redirectPath = path.join(root, 'public/_redirects');
if (!fs.existsSync(redirectPath)) errors.push('Missing public/_redirects');
else {
  const redirects = fs.readFileSync(redirectPath, 'utf8').split(/\\r?\\n/).map(line => line.trim());
  for (const route of ['/tools/text-formatter/', '/tools/character-counter/']) {
    if (redirects.some(line => line === `${route} / 301`)) errors.push(`${route} must not redirect to the homepage (soft 404)`);
  }
}
const headersPath = path.join(root, 'public/_headers');
if (fs.existsSync(headersPath) && /^\\/images\\/\\*/m.test(fs.readFileSync(headersPath, 'utf8'))) {
  errors.push('Remove the immutable /images/* cache rule while the directory contains no images');
}
const notFound = path.join(root, 'public/404.html');
if (!fs.existsSync(notFound)) errors.push('Missing public/404.html required for Cloudflare Pages 404 behavior');
else if (!/<meta\\s+name=["']robots["']\\s+content=["'][^"']*noindex/i.test(fs.readFileSync(notFound, 'utf8'))) {
  errors.push('public/404.html must contain robots noindex');
}
if (errors.length) {
  console.error('❌ SEO/routing validation failed:');
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}
console.log('✅ SEO/routing validation passed (no broken social-image references, proper 404 page, no homepage soft-404 redirects).');
