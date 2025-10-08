/**
 * Free Tools Platform - Header Component
 * 
 * Shared header component that can be dynamically loaded
 * if needed for future enhancements.
 */

export function createHeader() {
  return `
    <header id="main-header">
      <nav class="nav-container">
        <div class="nav-brand">
          <a href="/" class="brand-link">
            <h1>Simple Online Tool</h1>
          </a>
        </div>
        <div class="nav-menu">
          <a href="/" class="nav-link">Home</a>
          <a href="/category/text-tools" class="nav-link">Text Tools</a>
          <a href="/category/productivity-tools" class="nav-link">Productivity Tools</a>
        </div>
      </nav>
    </header>
  `;
}

export function initHeader() {
  // Add any interactive functionality for the header here
  // For example, mobile menu toggle, search functionality, etc.
  
  const brandLink = document.querySelector('.brand-link');
  if (brandLink) {
    brandLink.addEventListener('click', (e) => {
      // Handle brand link click if needed
      console.log('Navigating to homepage');
    });
  }

  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Handle navigation link clicks if needed
      console.log(`Navigating to: ${link.getAttribute('href')}`);
    });
  });
}

export default {
  createHeader,
  initHeader
};