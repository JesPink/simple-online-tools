/**
 * Shared header component. Keep destinations aligned with canonical routes.
 */
const CATEGORIES = [
  ['text-and-writing', 'Text & Writing'],
  ['productivity-and-business', 'Productivity & Business'],
  ['files-and-docs', 'Files & Docs'],
  ['seo-and-marketing', 'SEO & Marketing'],
  ['utilities-and-conversion', 'Utilities & Conversion']
];

export function createHeader() {
  const categoryLinks = CATEGORIES.map(([slug, label]) =>
    `<a href="/category/${slug}/" class="nav-link">${label}</a>`
  ).join('');

  return `
    <header id="main-header">
      <nav class="nav-container">
        <div class="nav-brand">
          <a href="/" class="brand-link">
            <div class="brand-logo">Simple Online Tools</div>
          </a>
        </div>
        <div class="nav-menu">
          <a href="/" class="nav-link">Home</a>
          ${categoryLinks}
        </div>
      </nav>
    </header>
  `;
}

export function initHeader() {
  const brandLink = document.querySelector('.brand-link');
  if (brandLink) {
    brandLink.addEventListener('click', () => console.log('Navigating to homepage'));
  }
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => console.log(`Navigating to: ${link.getAttribute('href')}`));
  });
}

export default { createHeader, initHeader };
