/**
 * Shared footer component. All destinations exist in the current tool registry.
 */
const CATEGORIES = [
  ['text-and-writing', 'Text & Writing'],
  ['productivity-and-business', 'Productivity & Business'],
  ['files-and-docs', 'Files & Docs'],
  ['seo-and-marketing', 'SEO & Marketing'],
  ['utilities-and-conversion', 'Utilities & Conversion']
];
const POPULAR_TOOLS = [
  ['word-counter', 'Word Counter'],
  ['case-converter', 'Case Converter'],
  ['invoice-generator', 'Invoice Generator'],
  ['pdf-metadata-editor', 'PDF Metadata Editor'],
  ['email-extractor', 'Email Extractor']
];

export function createFooter() {
  const categoryLinks = CATEGORIES.map(([slug, label]) =>
    `<li><a href="/category/${slug}/">${label}</a></li>`
  ).join('');
  const toolLinks = POPULAR_TOOLS.map(([slug, label]) =>
    `<li><a href="/tools/${slug}/">${label}</a></li>`
  ).join('');

  return `
    <footer id="main-footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Simple Online Tools</h3>
            <p>High-performance, no-sign-up online tools for everyone. Fast, secure, and completely free to use.</p>
          </div>
          <div class="footer-section">
            <h4>Categories</h4>
            <ul class="footer-links">${categoryLinks}</ul>
          </div>
          <div class="footer-section">
            <h4>Popular Tools</h4>
            <ul class="footer-links">${toolLinks}</ul>
          </div>
          <div class="footer-section">
            <h4>About</h4>
            <ul class="footer-links">
              <li><a href="/about/">About Us</a></li>
              <li><a href="/privacy/">Privacy Policy</a></li>
              <li><a href="/terms/">Terms of Service</a></li>
              <li><a href="/contact/">Contact Us</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Simple Online Tools. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

export function initFooter() {
  document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', () => console.log(`Footer navigation: ${link.getAttribute('href')}`));
  });
}

export default { createFooter, initFooter };
