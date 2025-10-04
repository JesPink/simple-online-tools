/**
 * Invoice Generator Tool
 * 
 * A comprehensive invoice generation tool that al            <div class="form-section">
              <div class="section-title">Items</div>
              <div class="items-container">s users to create
 * professional invoices with real-time preview and PDF download capability.
 */

import { jsPDF } from 'jspdf';

export function render() {
  return `
    <div class="invoice-generator-tool">
      <div class="tool-container">
        <div class="tool-interface">
          <div class="tool-main">
            <div class="form-section">
              <div class="section-title">From (Your Details)</div>
              <div class="form-group">
                <label for="from-company">Company/Name <span aria-label="required" class="required">*</span></label>
                <input type="text" id="from-company" placeholder="Your Company Name" aria-required="true" />
              </div>
              <div class="form-group">
                <label for="from-address">Address</label>
                <textarea id="from-address" placeholder="123 Main Street&#10;City, State 12345&#10;Country" rows="3"></textarea>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="from-email">Email</label>
                  <input type="email" id="from-email" placeholder="your@email.com" />
                </div>
                <div class="form-group">
                  <label for="from-phone">Phone</label>
                  <input type="tel" id="from-phone" placeholder="+1 (555) 123-4567" />
                </div>
              </div>
            </div>

            <div class="form-section">
              <div class="section-title">To (Client Details)</div>
              <div class="form-group">
                <label for="to-company">Company/Name <span aria-label="required" class="required">*</span></label>
                <input type="text" id="to-company" placeholder="Client Company Name" aria-required="true" />
              </div>
              <div class="form-group">
                <label for="to-address">Address</label>
                <textarea id="to-address" placeholder="456 Business Ave&#10;City, State 67890&#10;Country" rows="3"></textarea>
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="to-email">Email</label>
                  <input type="email" id="to-email" placeholder="client@email.com" />
                </div>
                <div class="form-group">
                  <label for="to-phone">Phone</label>
                  <input type="tel" id="to-phone" placeholder="+1 (555) 987-6543" />
                </div>
              </div>
            </div>

            <div class="form-section">
              <div class="section-title">Invoice Details</div>
              <div class="form-row">
                <div class="form-group">
                  <label for="invoice-number">Invoice Number</label>
                  <input type="text" id="invoice-number" placeholder="INV-001" />
                </div>
                <div class="form-group">
                  <label for="invoice-date">Invoice Date</label>
                  <input type="date" id="invoice-date" />
                </div>
                <div class="form-group">
                  <label for="due-date">Due Date</label>
                  <input type="date" id="due-date" />
                </div>
              </div>
              <div class="form-group">
                <label for="currency">Currency</label>
                <select id="currency">
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD ($)</option>
                  <option value="AUD">AUD ($)</option>
                </select>
              </div>
            </div>

            <div class="form-section">
              <div class="section-title">Items</div>
              <div id="items-container">
                <!-- Items will be dynamically added here -->
              </div>
              <button id="add-item-btn" class="btn btn-secondary">+ Add Item</button>
            </div>

            <div class="form-section">
              <div class="section-title">Additional Settings</div>
              <div class="form-row">
                <div class="form-group">
                  <label for="tax-rate">Tax Rate (%)</label>
                  <input type="number" id="tax-rate" placeholder="0" min="0" max="100" step="0.01" />
                </div>
                <div class="form-group">
                  <label for="discount-rate">Discount (%)</label>
                  <input type="number" id="discount-rate" placeholder="0" min="0" max="100" step="0.01" />
                </div>
              </div>
              <div class="form-group">
                <label for="notes">Notes</label>
                <textarea id="notes" placeholder="Payment terms, additional information..." rows="3"></textarea>
              </div>
            </div>

            <div class="form-actions">
              <button id="generate-pdf-btn" class="btn btn-primary" aria-describedby="pdf-help">
                <span class="btn-icon" aria-hidden="true">📄</span>
                Download PDF
              </button>
              <small id="pdf-help" class="sr-only">Generate and download your invoice as a PDF file</small>
              <button id="clear-form-btn" class="btn btn-secondary" aria-describedby="clear-help">
                Clear Form
              </button>
              <small id="clear-help" class="sr-only">Reset all form fields to start fresh</small>
            </div>
          </div>
        </div>

        <!-- Invoice Preview Section -->
        <div class="tool-results">
          <div class="preview-header">
            <div class="section-title">Invoice Preview</div>
            <div class="preview-actions">
              <button id="zoom-out-btn" class="zoom-btn">-</button>
              <span id="zoom-level">100%</span>
              <button id="zoom-in-btn" class="zoom-btn">+</button>
            </div>
          </div>
          <div class="invoice-preview-container">
            <div id="invoice-preview" class="invoice-preview">
              <!-- Invoice preview will be generated here -->
            </div>
          </div>
        </div>
        
        <!-- SEO Content Section -->
        <div class="seo-content">
        <h2>Understanding the Invoice Generator</h2>
        <p>
          Our free <strong>invoice generator</strong> is a comprehensive online tool designed to help freelancers, small businesses, and entrepreneurs create professional invoices quickly and efficiently. This powerful invoice maker eliminates the need for expensive software or complex templates, providing everything you need to generate polished, payment-ready invoices in minutes.
        </p>
        <p>
          With real-time preview functionality and instant PDF download capabilities, our invoice generator streamlines your billing process while maintaining the professional appearance that builds trust with clients. The tool operates entirely in your browser, ensuring your sensitive business information remains secure and private throughout the invoice creation process.
        </p>

        <h2>How to Use Our Invoice Generator</h2>
        <p>Creating professional invoices with our <strong>invoice generator</strong> is straightforward and intuitive:</p>
        <ol class="instruction-list">
          <li><strong>Enter Your Business Details:</strong> Fill in your company name, address, email, and phone number in the "From" section to establish your professional identity.</li>
          <li><strong>Add Client Information:</strong> Input your client's company details, contact information, and billing address in the "To" section for accurate delivery.</li>
          <li><strong>Set Invoice Parameters:</strong> Specify your invoice number, date, due date, and preferred currency to maintain proper record-keeping standards.</li>
          <li><strong>Add Invoice Items:</strong> Use the dynamic item system to add products or services, including descriptions, quantities, and unit prices for transparent billing.</li>
          <li><strong>Apply Taxes and Discounts:</strong> Configure tax rates and discount percentages as needed to comply with local regulations and client agreements.</li>
          <li><strong>Review and Download:</strong> Use the real-time preview to verify all details, then click "Download PDF" to generate your professional invoice instantly.</li>
        </ol>
        <p>
          The invoice generator automatically calculates totals, applies taxes and discounts, and formats everything according to professional invoicing standards, saving you time while ensuring accuracy and compliance.
        </p>

        <h2>Online Invoice Generator for Modern Businesses</h2>
        <p>
          Our <strong>online invoice generator</strong> represents the modern solution to traditional invoicing challenges. Unlike desktop software that requires installation and updates, this web-based tool provides instant access from any device with an internet connection, making it perfect for remote work, client meetings, and on-the-go business operations.
        </p>
        <p>
          The online nature of our invoice generator means you can create invoices from your office computer, update them on your tablet during client meetings, or generate urgent invoices from your smartphone while traveling. This flexibility ensures that your billing process never becomes a bottleneck in your business operations.
        </p>
        <p>
          Security and privacy are paramount in our <strong>online invoice generator</strong>. All processing happens locally in your browser, meaning your sensitive business and client information never leaves your device. This approach provides the convenience of online access while maintaining the security of offline processing, giving you the best of both worlds for your invoicing needs.
        </p>

        <h2>Best Free Invoice Generator Features</h2>
        <p>
          What makes our tool the <strong>best free invoice generator</strong> available online? Our comprehensive feature set rivals expensive paid alternatives while remaining completely free to use. The tool includes professional invoice templates, automatic calculations, real-time preview, PDF generation, and customizable fields for various business types.
        </p>
        <p>
          Unlike many free invoice generators that impose limitations or watermarks, our tool provides full functionality without restrictions. You can generate unlimited invoices, include multiple line items, apply complex tax calculations, and download professional PDFs without any branding or usage limits. This makes it an ideal solution for businesses of any size, from solo freelancers to growing companies.
        </p>
        <p>
          The <strong>best free invoice generator</strong> should also be user-friendly and efficient. Our intuitive interface reduces the learning curve, while smart features like automatic date filling, currency selection, and dynamic item management streamline the invoice creation process. Performance optimizations ensure smooth operation even with complex invoices containing numerous line items and detailed calculations.
        </p>

        <h2>Professional Invoice Templates and Customization</h2>
        <p>
          Our invoice generator utilizes professionally designed <strong>invoice templates</strong> that create polished, business-ready documents every time. These templates follow industry best practices for layout, typography, and information hierarchy, ensuring your invoices look professional and are easy to read and process.
        </p>
        <p>
          The template system automatically adapts to your content, expanding sections as needed while maintaining proper spacing and alignment. Whether you're billing for a single service or multiple complex line items, the template ensures consistent, professional presentation that reflects well on your business and builds client confidence.
        </p>
        <p>
          Customization options within our <strong>professional invoice</strong> templates include currency selection, tax rate configuration, discount application, and flexible note sections. These features allow you to adapt the invoice format to your specific business needs, industry requirements, and client preferences while maintaining the professional appearance that facilitates prompt payment.
        </p>

        <h2>Frequently Asked Questions</h2>
        
        <div class="faq-item">
          <h4>Is this invoice generator completely free to use?</h4>
          <p>
            Yes, our <strong>invoice generator</strong> is completely free with no hidden costs, usage limits, or watermarks. You can create unlimited invoices, download PDFs, and access all features without any payment or subscription requirements.
          </p>
        </div>
        
        <div class="faq-item">
          <h4>Can I customize the invoice template and add my logo?</h4>
          <p>
            Currently, our invoice generator focuses on clean, professional text-based invoices. While logo upload isn't available in this version, the professional formatting and comprehensive customization options ensure your invoices maintain a polished, business-ready appearance.
          </p>
        </div>
        
        <div class="faq-item">
          <h4>Is my business and client information secure?</h4>
          <p>
            Absolutely. All invoice generation happens entirely in your browser - no data is sent to our servers. Your business information, client details, and invoice content remain completely private and secure throughout the entire process.
          </p>
        </div>

        <div class="faq-item">
          <h4>Can I save my invoice data for future use?</h4>
          <p>
            The tool saves your form data locally in your browser, so your information will be retained when you return to create new invoices. However, we recommend downloading and saving your completed invoices as PDFs for your records.
          </p>
        </div>

        <div class="faq-item">
          <h4>What file format does the invoice generator export?</h4>
          <p>
            The invoice generator exports professional PDF files that are compatible with all devices and can be easily emailed to clients, printed for records, or stored in your accounting system.
          </p>
        </div>

        <div class="faq-item">
          <h4>Can I handle multiple currencies and tax rates?</h4>
          <p>
            Yes, the tool supports multiple major currencies (USD, EUR, GBP, CAD, AUD) and allows you to set custom tax rates as percentages. This makes it suitable for international businesses and various tax jurisdictions.
          </p>
        </div>

        <h2>Invoice Generator and Your Business Workflow</h2>
        <p>
          Our <strong>invoice generator</strong> integrates seamlessly into any business workflow, from freelance services to product sales. The tool's efficiency and professional output help maintain consistent billing practices that improve cash flow and client relationships.
        </p>
        <p>
          Combine this invoice generator with our other business tools like the <strong>word counter</strong> for crafting precise service descriptions, or use text formatting tools to ensure your invoice notes and terms are clear and professional. The streamlined invoice creation process lets you focus on growing your business rather than managing administrative tasks.
        </p>
      </div>
    </div>
  `;
}

export async function init() {
  // jsPDF is now bundled with esbuild - no dynamic loading needed

  // Initialize form elements
  const fromCompany = document.getElementById('from-company');
  const fromAddress = document.getElementById('from-address');
  const fromEmail = document.getElementById('from-email');
  const fromPhone = document.getElementById('from-phone');
  
  const toCompany = document.getElementById('to-company');
  const toAddress = document.getElementById('to-address');
  const toEmail = document.getElementById('to-email');
  const toPhone = document.getElementById('to-phone');
  
  const invoiceNumber = document.getElementById('invoice-number');
  const invoiceDate = document.getElementById('invoice-date');
  const dueDate = document.getElementById('due-date');
  const currency = document.getElementById('currency');
  
  const taxRate = document.getElementById('tax-rate');
  const discountRate = document.getElementById('discount-rate');
  const notes = document.getElementById('notes');
  
  const itemsContainer = document.getElementById('items-container');
  const addItemBtn = document.getElementById('add-item-btn');
  const generatePdfBtn = document.getElementById('generate-pdf-btn');
  const clearFormBtn = document.getElementById('clear-form-btn');
  
  const invoicePreview = document.getElementById('invoice-preview');
  const zoomInBtn = document.getElementById('zoom-in-btn');
  const zoomOutBtn = document.getElementById('zoom-out-btn');
  const zoomLevel = document.getElementById('zoom-level');

  let items = [];
  let currentZoom = 100;
  let updateTimeout = null;

  // Currency symbols mapping
  const currencySymbols = {
    'USD': '$',
    'EUR': '€',
    'GBP': '£',
    'CAD': 'C$',
    'AUD': 'A$'
  };

  // Initialize with current date
  const today = new Date().toISOString().split('T')[0];
  invoiceDate.value = today;
  
  // Set due date to 30 days from now
  const dueDateTime = new Date();
  dueDateTime.setDate(dueDateTime.getDate() + 30);
  dueDate.value = dueDateTime.toISOString().split('T')[0];

  // Generate unique invoice number
  invoiceNumber.value = `INV-${Date.now().toString().slice(-6)}`;

  // Load saved data from localStorage
  loadFormData();

  // Add initial item
  addItem();

  // Event listeners with smart debouncing for performance
  function debounceUpdate() {
    // Use window-scoped timeout for proper cleanup
    clearTimeout(window.invoiceGeneratorTimeout);
    
    // Smart debouncing: longer delay for complex operations
    const delay = items.length > 10 ? 300 : 100;
    
    window.invoiceGeneratorTimeout = setTimeout(() => {
      updatePreview();
      saveFormData();
    }, delay);
  }

  // Form field event listeners
  [fromCompany, fromAddress, fromEmail, fromPhone, toCompany, toAddress, 
   toEmail, toPhone, invoiceNumber, invoiceDate, dueDate, currency, 
   taxRate, discountRate, notes].forEach(field => {
    field.addEventListener('input', debounceUpdate);
    field.addEventListener('change', debounceUpdate);
  });

  // Add item functionality
  addItemBtn.addEventListener('click', () => {
    addItem();
    updatePreview();
  });

  // PDF generation
  generatePdfBtn.addEventListener('click', generatePDF);

  // Clear form
  clearFormBtn.addEventListener('click', clearForm);

  // Zoom controls
  zoomInBtn.addEventListener('click', () => {
    if (currentZoom < 150) {
      currentZoom += 10;
      updateZoom();
    }
  });

  zoomOutBtn.addEventListener('click', () => {
    if (currentZoom > 50) {
      currentZoom -= 10;
      updateZoom();
    }
  });

  function addItem() {
    const itemIndex = items.length;
    const itemHtml = `
      <div class="item-row" data-index="${itemIndex}">
        <div class="item-controls">
          <div class="form-group">
            <label>Description</label>
            <input type="text" class="item-description" placeholder="Service or product description" />
          </div>
          <div class="form-group">
            <label>Qty</label>
            <input type="number" class="item-quantity" placeholder="1" min="0" step="0.01" />
          </div>
          <div class="form-group">
            <label>Rate</label>
            <input type="number" class="item-rate" placeholder="0.00" min="0" step="0.01" />
          </div>
          <div class="form-group">
            <label>Amount</label>
            <input type="text" class="item-amount" readonly />
          </div>
          <button type="button" class="remove-item-btn" title="Remove item">×</button>
        </div>
      </div>
    `;
    
    itemsContainer.insertAdjacentHTML('beforeend', itemHtml);
    
    const itemRow = itemsContainer.lastElementChild;
    const descriptionEl = itemRow.querySelector('.item-description');
    const quantityEl = itemRow.querySelector('.item-quantity');
    const rateEl = itemRow.querySelector('.item-rate');
    const amountEl = itemRow.querySelector('.item-amount');
    const removeBtn = itemRow.querySelector('.remove-item-btn');

    // Default values
    quantityEl.value = '1';
    rateEl.value = '0.00';

    const item = {
      description: '',
      quantity: 1,
      rate: 0,
      amount: 0,
      elements: { descriptionEl, quantityEl, rateEl, amountEl }
    };

    items.push(item);

    // Event listeners for item fields
    descriptionEl.addEventListener('input', (e) => {
      item.description = e.target.value;
      debounceUpdate();
    });

    quantityEl.addEventListener('input', (e) => {
      item.quantity = parseFloat(e.target.value) || 0;
      updateItemAmount(item);
      debounceUpdate();
    });

    rateEl.addEventListener('input', (e) => {
      item.rate = parseFloat(e.target.value) || 0;
      updateItemAmount(item);
      debounceUpdate();
    });

    // Remove item functionality  
    removeBtn.addEventListener('click', () => {
      const index = parseInt(itemRow.dataset.index);
      items.splice(index, 1);
      itemRow.remove();
      updateItemIndexes();
      debounceUpdate();
    });

    updateItemAmount(item);
  }

  function updateItemAmount(item) {
    item.amount = item.quantity * item.rate;
    item.elements.amountEl.value = formatCurrency(item.amount);
  }

  function updateItemIndexes() {
    const itemRows = itemsContainer.querySelectorAll('.item-row');
    itemRows.forEach((row, index) => {
      row.dataset.index = index;
    });
  }

  function formatCurrency(amount) {
    const symbol = currencySymbols[currency.value] || '$';
    // Ensure consistent rounding and handle edge cases
    const numAmount = parseFloat(amount) || 0;
    const rounded = Math.round(numAmount * 100) / 100; // Proper rounding to 2 decimals
    return `${symbol}${rounded.toFixed(2)}`;
  }

  function calculateTotals() {
    // Calculate subtotal with proper rounding
    const subtotal = Math.round(items.reduce((sum, item) => sum + item.amount, 0) * 100) / 100;
    
    // Calculate discount with proper rounding
    const discountAmount = Math.round(subtotal * (parseFloat(discountRate.value) || 0) / 100 * 100) / 100;
    const discountedSubtotal = Math.round((subtotal - discountAmount) * 100) / 100;
    
    // Calculate tax with proper rounding
    const taxAmount = Math.round(discountedSubtotal * (parseFloat(taxRate.value) || 0) / 100 * 100) / 100;
    const total = Math.round((discountedSubtotal + taxAmount) * 100) / 100;

    return {
      subtotal,
      discountAmount,
      discountedSubtotal,
      taxAmount,
      total
    };
  }

  function updatePreview() {
    const totals = calculateTotals();
    const symbol = currencySymbols[currency.value] || '$';

    const itemsHtml = items.map(item => `
      <tr>
        <td class="item-desc">${item.description || 'Service/Product'}</td>
        <td class="item-qty">${item.quantity}</td>
        <td class="item-rate">${formatCurrency(item.rate)}</td>
        <td class="item-amount">${formatCurrency(item.amount)}</td>
      </tr>
    `).join('');

    const previewHtml = `
      <div class="invoice-preview">
        <div class="invoice-document">
          <div class="invoice-header">
            <div class="invoice-title">INVOICE</div>
            <div class="invoice-meta">
              <div class="invoice-number">Invoice #${invoiceNumber.value || 'INV-001'}</div>
              <div class="invoice-dates">
                <div>Date: ${invoiceDate.value || today}</div>
                <div>Due: ${dueDate.value || today}</div>
              </div>
            </div>
          </div>

        <div class="invoice-parties">
          <div class="invoice-from">
            <div class="party-label">From:</div>
            <div class="party-details">
              <div class="company-name">${fromCompany.value || 'Your Company'}</div>
              <div class="address">${fromAddress.value.replace(/\n/g, '<br>') || 'Your Address'}</div>
              ${fromEmail.value ? `<div class="contact">Email: ${fromEmail.value}</div>` : ''}
              ${fromPhone.value ? `<div class="contact">Phone: ${fromPhone.value}</div>` : ''}
            </div>
          </div>
          
          <div class="invoice-to">
            <div class="party-label">To:</div>
            <div class="party-details">
              <div class="company-name">${toCompany.value || 'Client Company'}</div>
              <div class="address">${toAddress.value.replace(/\n/g, '<br>') || 'Client Address'}</div>
              ${toEmail.value ? `<div class="contact">Email: ${toEmail.value}</div>` : ''}
              ${toPhone.value ? `<div class="contact">Phone: ${toPhone.value}</div>` : ''}
            </div>
          </div>
        </div>

        <div class="invoice-items">
          <div class="table-container">
            <table class="items-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </div>
        </div>

        <div class="invoice-totals">
          <div class="totals-section">
            <div class="total-row">
              <span class="total-label">Subtotal:</span>
              <span class="total-value">${formatCurrency(totals.subtotal)}</span>
            </div>
            ${totals.discountAmount > 0 ? `
              <div class="total-row">
                <span class="total-label">Discount (${discountRate.value}%):</span>
                <span class="total-value">-${formatCurrency(totals.discountAmount)}</span>
              </div>
            ` : ''}
            ${totals.taxAmount > 0 ? `
              <div class="total-row">
                <span class="total-label">Tax (${taxRate.value}%):</span>
                <span class="total-value">${formatCurrency(totals.taxAmount)}</span>
              </div>
            ` : ''}
            <div class="total-row total-final">
              <span class="total-label">Total:</span>
              <span class="total-value">${formatCurrency(totals.total)}</span>
            </div>
          </div>
        </div>

          ${notes.value ? `
            <div class="invoice-notes">
              <div class="notes-label">Notes:</div>
              <div class="notes-content">${notes.value.replace(/\n/g, '<br>')}</div>
            </div>
          ` : ''}
        </div>
      </div>
    `;

    invoicePreview.innerHTML = previewHtml;
    
    // Apply current zoom level to the new preview
    setTimeout(() => updateZoom(), 10);
  }

  function updateZoom() {
    const previewElement = document.querySelector('.invoice-preview');
    if (previewElement) {
      previewElement.style.transform = `scale(${currentZoom / 100})`;
      previewElement.style.transformOrigin = 'top left';
      zoomLevel.textContent = `${currentZoom}%`;
    }
  }

  function saveFormData() {
    const formData = {
      fromCompany: fromCompany.value,
      fromAddress: fromAddress.value,
      fromEmail: fromEmail.value,
      fromPhone: fromPhone.value,
      currency: currency.value,
      taxRate: taxRate.value,
      discountRate: discountRate.value
    };
    
    localStorage.setItem('invoiceGeneratorData', JSON.stringify(formData));
  }

  function loadFormData() {
    const savedData = localStorage.getItem('invoiceGeneratorData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        fromCompany.value = data.fromCompany || '';
        fromAddress.value = data.fromAddress || '';
        fromEmail.value = data.fromEmail || '';
        fromPhone.value = data.fromPhone || '';
        currency.value = data.currency || 'USD';
        taxRate.value = data.taxRate || '';
        discountRate.value = data.discountRate || '';
      } catch (e) {
        console.warn('Could not load saved form data');
      }
    }
  }

  function clearForm() {
    // Clear all form fields
    [fromCompany, fromAddress, fromEmail, fromPhone, toCompany, toAddress, 
     toEmail, toPhone, taxRate, discountRate, notes].forEach(field => {
      field.value = '';
    });

    // Reset dates and invoice number
    invoiceDate.value = today;
    dueDate.value = dueDateTime.toISOString().split('T')[0];
    invoiceNumber.value = `INV-${Date.now().toString().slice(-6)}`;
    currency.value = 'USD';

    // Clear items
    items = [];
    itemsContainer.innerHTML = '';
    addItem();

    updatePreview();
    localStorage.removeItem('invoiceGeneratorData');
  }

  async function generatePDF() {
    // Show loading state
    generatePdfBtn.disabled = true;
    const originalText = generatePdfBtn.innerHTML;
    generatePdfBtn.innerHTML = '<span class="btn-icon">⏳</span>Generating PDF...';
    
    try {
      // jsPDF is now directly imported - no loading check needed
      const doc = new jsPDF();
    const totals = calculateTotals();
    
    // Set font
    doc.setFont('helvetica');
    
    // Title
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', 20, 30);
    
    // Invoice details
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(`Invoice #: ${invoiceNumber.value}`, 120, 30);
    doc.text(`Date: ${invoiceDate.value}`, 120, 40);
    doc.text(`Due Date: ${dueDate.value}`, 120, 50);
    
    // From section
    doc.setFont('helvetica', 'bold');
    doc.text('From:', 20, 70);
    doc.setFont('helvetica', 'normal');
    let yPos = 80;
    if (fromCompany.value) {
      doc.text(fromCompany.value, 20, yPos);
      yPos += 10;
    }
    if (fromAddress.value) {
      const addressLines = fromAddress.value.split('\n');
      addressLines.forEach(line => {
        doc.text(line, 20, yPos);
        yPos += 10;
      });
    }
    if (fromEmail.value) {
      doc.text(`Email: ${fromEmail.value}`, 20, yPos);
      yPos += 10;
    }
    if (fromPhone.value) {
      doc.text(`Phone: ${fromPhone.value}`, 20, yPos);
      yPos += 10;
    }
    
    // To section
    doc.setFont('helvetica', 'bold');
    doc.text('To:', 120, 70);
    doc.setFont('helvetica', 'normal');
    yPos = 80;
    if (toCompany.value) {
      doc.text(toCompany.value, 120, yPos);
      yPos += 10;
    }
    if (toAddress.value) {
      const addressLines = toAddress.value.split('\n');
      addressLines.forEach(line => {
        doc.text(line, 120, yPos);
        yPos += 10;
      });
    }
    if (toEmail.value) {
      doc.text(`Email: ${toEmail.value}`, 120, yPos);
      yPos += 10;
    }
    if (toPhone.value) {
      doc.text(`Phone: ${toPhone.value}`, 120, yPos);
      yPos += 10;
    }
    
    // Items table
    yPos = Math.max(yPos, 130);
    doc.setFont('helvetica', 'bold');
    doc.text('Description', 20, yPos);
    doc.text('Qty', 120, yPos);
    doc.text('Rate', 140, yPos);
    doc.text('Amount', 170, yPos);
    
    // Draw line under headers
    doc.line(20, yPos + 2, 190, yPos + 2);
    yPos += 15;
    
    // Add items
    doc.setFont('helvetica', 'normal');
    items.forEach(item => {
      doc.text(item.description || 'Service/Product', 20, yPos);
      doc.text(item.quantity.toString(), 120, yPos);
      doc.text(formatCurrency(item.rate), 140, yPos);
      doc.text(formatCurrency(item.amount), 170, yPos);
      yPos += 12;
    });
    
    // Totals
    yPos += 10;
    doc.line(120, yPos, 190, yPos);
    yPos += 10;
    
    doc.text('Subtotal:', 120, yPos);
    doc.text(formatCurrency(totals.subtotal), 170, yPos);
    yPos += 12;
    
    if (totals.discountAmount > 0) {
      doc.text(`Discount (${discountRate.value}%):`, 120, yPos);
      doc.text(`-${formatCurrency(totals.discountAmount)}`, 170, yPos);
      yPos += 12;
    }
    
    if (totals.taxAmount > 0) {
      doc.text(`Tax (${taxRate.value}%):`, 120, yPos);
      doc.text(formatCurrency(totals.taxAmount), 170, yPos);
      yPos += 12;
    }
    
    doc.setFont('helvetica', 'bold');
    doc.text('Total:', 120, yPos);
    doc.text(formatCurrency(totals.total), 170, yPos);
    
    // Notes
    if (notes.value) {
      yPos += 20;
      doc.setFont('helvetica', 'bold');
      doc.text('Notes:', 20, yPos);
      doc.setFont('helvetica', 'normal');
      yPos += 10;
      const noteLines = notes.value.split('\n');
      noteLines.forEach(line => {
        doc.text(line, 20, yPos);
        yPos += 10;
      });
    }
    
      // Save PDF
      const filename = `invoice-${invoiceNumber.value || 'draft'}.pdf`;
      doc.save(filename);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      // Restore button state
      generatePdfBtn.disabled = false;
      generatePdfBtn.innerHTML = originalText;
    }
  }

  // Initialize with mobile-optimized zoom
  if (window.innerWidth <= 767) {
    currentZoom = 80; // Default to 80% on mobile as user requested
  }
  
  // Initialize preview
  updatePreview();
  updateZoom();

  console.log('Invoice Generator tool initialized successfully');
}

// Cleanup function for tool hot-swapping
export function cleanup() {
  // Clear any active timeouts
  if (window.invoiceGeneratorTimeout) {
    clearTimeout(window.invoiceGeneratorTimeout);
    window.invoiceGeneratorTimeout = null;
  }
  
  // Remove global references
  delete window.invoiceGeneratorData;
  
  console.log('Invoice Generator tool cleaned up successfully');
}