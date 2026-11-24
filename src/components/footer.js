/**
 * Free Tools Platform - Footer Component
 * 
 * Shared footer component that can be dynamically loaded
 * if needed for future enhancements.
 */

export function createFooter() {
  return `
    <footer id="main-footer">
      <div class="footer-container">
        <div class="footer-content">
          <div class="footer-section">
            <h3>Simple Online Tool</h3>
            <p>High-performance, no-sign-up online tools for everyone. Fast, secure, and completely free to use.</p>
          </div>
          <div class="footer-section">
            <h4>Categories</h4>
            <ul class="footer-links">
              <li><a href="/category/text-tools">Text Tools</a></li>
              <li><a href="/category/calculators">Calculators</a></li>
              <li><a href="/category/converters">Converters</a></li>
              <li><a href="/category/generators">Generators</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>Popular Tools</h4>
            <ul class="footer-links">
              <li><a href="/tools/word-counter.html">Word Counter</a></li>
              <li><a href="/tools/password-generator.html">Password Generator</a></li>
              <li><a href="/tools/qr-code-generator.html">QR Code Generator</a></li>
              <li><a href="/tools/color-picker.html">Color Picker</a></li>
            </ul>
          </div>
          <div class="footer-section">
            <h4>About</h4>
            <ul class="footer-links">
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/about">About Us</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>&copy; ${new Date().getFullYear()} Simple Online Tool. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `;
}

export function initFooter() {
  // Add any interactive functionality for the footer here
  // For example, newsletter signup, social media links, etc.
  
  const footerLinks = document.querySelectorAll('.footer-links a');
  footerLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      // Handle footer link clicks if needed
      console.log(`Footer navigation: ${link.getAttribute('href')}`);
    });
  });

  // Copyright year is static in template to prevent CLS
  // Dynamic updates removed to improve Lighthouse CLS score
}

export default {
  createFooter,
  initFooter
};