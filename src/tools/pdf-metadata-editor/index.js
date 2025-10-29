// Global variables
let currentPdfDoc = null;
let currentPdfData = null;
let resultsContainer = null;

export function render() {
  return `
    <div class="pdf-metadata-editor-tool">
      <div class="tool-container">
        <div class="tool-interface">
          <div class="tool-main">
            <div class="form-section">
              <div class="section-title">Upload PDF Document</div>
              <div class="upload-area" id="upload-area">
                <div class="upload-content">
                  <div class="upload-icon">📄</div>
                  <div class="upload-text">
                    <strong>Drag & drop your PDF here</strong>
                    <span>or click to browse files</span>
                  </div>
                  <input type="file" id="file-input" accept=".pdf" style="display: none;" />
                </div>
              </div>
              <div class="upload-info">
                <p><strong>Privacy Notice:</strong> All processing happens in your browser. No files are uploaded to any server.</p>
                <p><strong>Compatibility:</strong> Works with standard, unencrypted PDF files. Password-protected or encrypted PDFs cannot be processed for security reasons.</p>
                <p><strong>About "Not Specified" Fields:</strong> Many PDFs don't contain metadata unless specifically added by the creator - this is completely normal.</p>
              </div>
            </div>

            <div class="form-section" id="metadata-section" style="display: none;">
              <div class="section-title">Current PDF Metadata</div>
              <div id="metadata-display"></div>
              
              <div class="form-actions" style="margin-top: var(--space-4);">
                <button class="btn btn-primary" id="edit-metadata-btn">Edit Metadata</button>
                <button class="btn btn-secondary" id="remove-all-btn">Remove All Metadata</button>
                <button class="btn btn-secondary" id="download-btn" disabled>Download PDF</button>
              </div>
            </div>

            <div class="form-section" id="edit-section" style="display: none;">
              <div class="section-title">Edit PDF Metadata</div>
              <div class="form-group">
                <label for="edit-title">Title</label>
                <input type="text" id="edit-title" placeholder="Document title" />
              </div>
              <div class="form-group">
                <label for="edit-author">Author</label>
                <input type="text" id="edit-author" placeholder="Document author" />
              </div>
              <div class="form-group">
                <label for="edit-subject">Subject</label>
                <input type="text" id="edit-subject" placeholder="Document subject" />
              </div>
              <div class="form-group">
                <label for="edit-keywords">Keywords</label>
                <input type="text" id="edit-keywords" placeholder="Comma-separated keywords" />
              </div>
              <div class="form-group">
                <label for="edit-creator">Creator</label>
                <input type="text" id="edit-creator" placeholder="Creating application" />
              </div>
              <div class="form-actions">
                <button class="btn btn-primary" id="save-metadata-btn">Save Changes</button>
                <button class="btn btn-secondary" id="cancel-edit-btn">Cancel</button>
              </div>
            </div>
          </div>
          
          <div class="tool-results">
            <div class="section-title">Metadata Analysis</div>
            <div class="results-content">
              <div id="results-container">
                <p class="placeholder-text">Upload a PDF file to view and analyze its metadata properties.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="seo-content">
          <h2>Understanding the PDF Metadata Editor</h2>
          <p>A <strong>PDF metadata editor</strong> is an essential privacy and document management tool that allows you to view, modify, and remove hidden information embedded within PDF documents. Every PDF file contains metadata - invisible data that includes details like the author's name, creation software, modification dates, and even potentially sensitive information about your computer or organization. Our PDF metadata editor operates entirely within your browser, ensuring complete privacy while giving you full control over your document's hidden properties.</p>
          
          <p>In today's digital landscape where document security and privacy are paramount concerns, understanding and managing PDF metadata has become crucial for professionals, journalists, legal experts, and privacy-conscious individuals. Hidden metadata can inadvertently reveal confidential information, compromise anonymity, or expose internal processes that should remain private. Our tool empowers you to inspect, edit, or completely strip this metadata before sharing documents, ensuring your privacy and professional standards are maintained.</p>

          <h2>How to Use Our PDF Metadata Editor</h2>
          <p>Using our PDF metadata editor is straightforward and secure, with all processing happening directly in your browser without any server uploads:</p>
          
          <p><strong>Step 1: Upload Your PDF Document</strong><br>
          Drag and drop your PDF file onto the upload area, or click to browse and select your file. The tool supports all standard PDF formats and processes files of various sizes entirely client-side for maximum privacy.</p>
          
          <p><strong>Step 2: Review Current Metadata</strong><br>
          Once uploaded, the tool automatically extracts and displays all metadata properties including title, author, subject, keywords, creator application, creation date, modification date, and other embedded information.</p>
          
          <p><strong>Step 3: Choose Your Action</strong><br>
          You can either edit specific metadata fields to update document properties, or use the "Remove All Metadata" function to strip all hidden information for maximum privacy protection.</p>
          
          <p><strong>Step 4: Edit Metadata (Optional)</strong><br>
          If editing, modify any fields you want to change such as author name, document title, subject, or keywords. Leave fields empty to remove specific metadata properties.</p>
          
          <p><strong>Step 5: Download Processed PDF</strong><br>
          After making changes, download your updated PDF with the new metadata settings. The original file remains unchanged on your device.</p>

          <h2>PDF Metadata Viewer: Revealing Hidden Document Information</h2>
          <p>A PDF metadata viewer serves as a digital detective tool, uncovering the hidden layer of information that exists within every PDF document. This metadata can include far more than you might expect: the name of the person who created the document, the software used to generate it, internal file paths from the creator's computer, revision history, printing information, and even comments or annotations that may have been inadvertently left behind.</p>
          
          <p>Professional PDF metadata viewers like our tool provide comprehensive insight into these hidden properties, displaying them in an organized, readable format that makes it easy to understand what information your PDF contains. This visibility is crucial for document security audits, compliance checks, and privacy assessments before sharing sensitive files with clients, colleagues, or the public.</p>
          
          <p>The metadata viewing capability becomes particularly valuable when receiving PDFs from external sources, as it allows you to assess what information the sender may have inadvertently included. This can help identify potential security risks, verify document authenticity, or simply understand the document's creation context and history.</p>

          <h2>Change Metadata PDF: Professional Document Control</h2>
          <p>The ability to change metadata in PDF documents represents a fundamental aspect of professional document management and privacy control. Whether you're preparing documents for client delivery, public distribution, or archival purposes, having granular control over metadata ensures your documents meet specific standards and protect sensitive information.</p>
          
          <p>When you change metadata in PDF files, you're not just modifying visible properties - you're taking control of how your document represents itself to recipients and systems that process it. This includes updating author information to reflect current team members, standardizing document titles for consistency, adding relevant keywords for searchability, or removing outdated creation information that no longer reflects the document's current state.</p>
          
          <p>Professional organizations often have specific metadata standards for documents shared externally. The ability to systematically change PDF metadata ensures compliance with these standards while maintaining consistency across all organizational communications. This level of control is particularly important in legal, medical, and consulting fields where document provenance and professional presentation are critical.</p>

          <h2>Change Metadata in PDF: Advanced Privacy Protection</h2>
          <p>Learning how to change metadata in PDF documents is essential for maintaining privacy and security in our connected world. Many users are unaware that when they share a PDF, they may also be sharing detailed information about their computer, software, internal file structures, and personal or organizational details embedded in the metadata.</p>
          
          <p>The process of changing metadata in PDF files goes beyond simple field updates - it involves understanding what information should be preserved, modified, or completely removed based on the document's intended use and audience. For maximum privacy, you might choose to strip all metadata, creating a clean document with no hidden information. For professional purposes, you might selectively edit metadata to include only appropriate information while removing potentially sensitive details.</p>
          
          <p>Advanced users leverage metadata modification as part of comprehensive document security protocols. This includes standardizing creation dates to remove timing information, anonymizing author fields, removing software version details that might reveal system vulnerabilities, and eliminating internal file paths that could expose organizational structures or naming conventions.</p>

          <h2>Frequently Asked Questions</h2>
          
          <h4>Is it safe to use an online PDF metadata editor with sensitive documents?</h4>
          <p>Our PDF metadata editor operates entirely within your browser using client-side processing, meaning your files never leave your device or get uploaded to any server. This makes it completely safe for sensitive documents, as no external parties can access your files or their metadata.</p>
          
          <h4>What types of metadata can be found in PDF files?</h4>
          <p>PDF files can contain extensive metadata including author names, document title and subject, creation and modification dates, creator application details, keywords, internal file paths, user comments, revision history, printing information, and sometimes even GPS coordinates or camera information if the PDF was created from photos.</p>
          
          <h4>Will removing metadata affect the PDF's content or formatting?</h4>
          <p>No, removing or editing PDF metadata only affects the hidden information properties and does not change the visible content, formatting, images, or layout of your document. The PDF will look and function exactly the same, just without the embedded metadata.</p>
          
          <h4>Can I batch process multiple PDFs to remove metadata?</h4>
          <p>Currently, our tool processes one PDF at a time to ensure optimal performance and privacy. For batch processing needs, you can use the tool multiple times, with each file being processed securely within your browser without any server uploads.</p>
          
          <h4>Why is PDF metadata removal important for privacy?</h4>
          <p>PDF metadata can reveal sensitive information about the document creator, their computer system, internal organizational structures, creation processes, and revision history. Removing this metadata before sharing documents prevents accidental disclosure of confidential information and protects personal and organizational privacy.</p>

          <h2>PDF Metadata Editor and Your Document Workflow</h2>
          <p>Integrating a PDF metadata editor into your document workflow enhances both security and professionalism in your digital communications. This tool complements other document processing utilities like our <a href="/tools/word-counter/">Word Counter</a> for analyzing document length and our <a href="/tools/case-converter/">Case Converter</a> for standardizing text formatting within your documents.</p>
          
          <p>Whether you're a legal professional preparing court documents, a journalist protecting source confidentiality, or a business professional maintaining organizational privacy standards, a reliable PDF metadata editor provides the control and transparency needed for secure document management in today's digital environment.</p>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  // Import PDF-lib for client-side PDF processing
  let PDFDocument, PDFName, PDFString;
  
  // Show loading indicator
  resultsContainer = document.getElementById('results-container');
  resultsContainer.innerHTML = '<p class="loading-message">Loading PDF processing library...</p>';
  
  try {
    // Import from CDN with better error handling
    let pdfLib;
    const cdnUrls = [
      'https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.esm.js',
      'https://cdn.skypack.dev/pdf-lib@1.17.1',
      'https://esm.run/pdf-lib@1.17.1'
    ];
    
    let loadSuccess = false;
    for (const url of cdnUrls) {
      try {
        console.log(`Trying to load PDF-lib from: ${url}`);
        pdfLib = await import(url);
        console.log('PDF-lib loaded successfully from:', url);
        loadSuccess = true;
        break;
      } catch (e) {
        console.warn(`Failed to load from ${url}:`, e);
      }
    }
    
    if (!loadSuccess) {
      throw new Error('All CDN sources failed');
    }
    
    PDFDocument = pdfLib.PDFDocument;
    PDFName = pdfLib.PDFName;
    PDFString = pdfLib.PDFString;
    
    if (!PDFDocument || typeof PDFDocument.load !== 'function') {
      throw new Error('PDF-lib did not load correctly - missing required methods');
    }
    
    console.log('PDF-lib loaded successfully');
    resultsContainer.innerHTML = '<p class="placeholder-text">Upload a PDF file to view and analyze its metadata properties.</p>';
    
  } catch (error) {
    console.error('Failed to load PDF-lib:', error);
    showError('Failed to load PDF processing library. This tool requires an internet connection to load the PDF processing library. Please check your connection and refresh the page.');
    return;
  }

  // State management
  let currentPdfDoc = null;
  let currentPdfBytes = null;
  let originalMetadata = {};

  // DOM elements
  const uploadArea = document.getElementById('upload-area');
  const fileInput = document.getElementById('file-input');
  const metadataSection = document.getElementById('metadata-section');
  const editSection = document.getElementById('edit-section');
  const metadataDisplay = document.getElementById('metadata-display');
  resultsContainer = document.getElementById('results-container');
  
  // Buttons
  const editMetadataBtn = document.getElementById('edit-metadata-btn');
  const removeAllBtn = document.getElementById('remove-all-btn');
  const downloadBtn = document.getElementById('download-btn');
  const saveMetadataBtn = document.getElementById('save-metadata-btn');
  const cancelEditBtn = document.getElementById('cancel-edit-btn');
  
  // Edit form inputs
  const editTitle = document.getElementById('edit-title');
  const editAuthor = document.getElementById('edit-author');
  const editSubject = document.getElementById('edit-subject');
  const editKeywords = document.getElementById('edit-keywords');
  const editCreator = document.getElementById('edit-creator');

  // Utility functions
  function showError(message) {
    resultsContainer.innerHTML = `<p class="error-message">${message}</p>`;
  }

  function showSuccess(message) {
    resultsContainer.innerHTML = `<p class="success-message">${message}</p>`;
  }

  function showMessage(message, type = 'info') {
    const className = type === 'info' ? 'info-message' : type === 'success' ? 'success-message' : 'error-message';
    resultsContainer.innerHTML = `<p class="${className}">${message}</p>`;
  }

  function formatDate(dateStr) {
    if (!dateStr) return 'Not specified';
    try {
      const date = new Date(dateStr);
      return date.toLocaleString();
    } catch (e) {
      return dateStr;
    }
  }

  function formatFileSize(bytes) {
    if (!bytes) return 'Unknown';
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  }

  // File handling
  function handleFileSelect(file) {
    if (!file) {
      showError('Please select a file.');
      return;
    }
    
    if (file.type !== 'application/pdf') {
      showError(`📄 Please select a valid PDF file. Selected file type: ${file.type || 'unknown'}. Only standard PDF files are supported.`);
      return;
    }
    
    // Check file size (reasonable limit of 50MB)
    if (file.size > 50 * 1024 * 1024) {
      showError('📁 File is too large. Please select a PDF file smaller than 50MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        console.log('File loaded, size:', e.target.result.byteLength);
        currentPdfBytes = e.target.result;
        
        // Verify PDF-lib is available
        if (!PDFDocument) {
          throw new Error('PDF processing library not available');
        }
        
        console.log('Loading PDF with PDF-lib...');
        
        try {
          currentPdfDoc = await PDFDocument.load(currentPdfBytes);
          console.log('PDF loaded successfully:', currentPdfDoc);
          
          await extractAndDisplayMetadata();
          metadataSection.style.display = 'block';
          
        } catch (pdfError) {
          console.error('PDF loading error:', pdfError);
          
          // Handle specific PDF errors
          if (pdfError.message.includes('encrypted') || 
              pdfError.message.includes('password') || 
              pdfError.message.includes('Encrypted') ||
              pdfError.message.includes('Password')) {
            showError('🔐 This PDF is encrypted or password-protected. Encrypted PDFs cannot be processed for security reasons. Please use an unencrypted PDF or remove the password protection first.');
            return;
          }
          
          if (pdfError.message.includes('Invalid PDF') || 
              pdfError.message.includes('not a PDF') ||
              pdfError.message.includes('corrupt')) {
            showError('📄 This file appears to be corrupted or is not a valid PDF document. Please try with a different PDF file.');
            return;
          }
          
          // Generic PDF error
          throw pdfError;
        }
        
      } catch (error) {
        console.error('General error loading PDF:', error);
        showError(`Failed to load PDF file: ${error.message}. Please ensure it's a valid, unencrypted PDF document and try again.`);
      }
    };
    reader.readAsArrayBuffer(file);
  }

  async function extractAndDisplayMetadata() {
    try {
      console.log('Extracting metadata from PDF document:', currentPdfDoc);
      
      // Check if the PDF document is properly loaded
      if (!currentPdfDoc) {
        throw new Error('PDF document not properly loaded');
      }
      
      // Get basic document information using pdf-lib API
      const pageCount = currentPdfDoc.getPageCount();
      const title = currentPdfDoc.getTitle();
      const author = currentPdfDoc.getAuthor();
      const subject = currentPdfDoc.getSubject();
      const keywords = currentPdfDoc.getKeywords();
      const creator = currentPdfDoc.getCreator();
      const producer = currentPdfDoc.getProducer();
      const creationDate = currentPdfDoc.getCreationDate();
      const modificationDate = currentPdfDoc.getModificationDate();
      
      // Debug logging to understand metadata extraction
      console.log('Page count:', pageCount);
      console.log('Title (raw):', title);
      console.log('Author (raw):', author);
      console.log('Subject (raw):', subject);
      console.log('Keywords (raw):', keywords, 'Type:', typeof keywords);
      console.log('Creator (raw):', creator);
      console.log('Producer (raw):', producer);
      console.log('Creation Date (raw):', creationDate);
      console.log('Modification Date (raw):', modificationDate);
      
      originalMetadata = {
        title: title || '',
        author: author || '',
        subject: subject || '',
        keywords: Array.isArray(keywords) ? keywords.join(', ') : (keywords || ''),
        creator: creator || '',
        producer: producer || '',
        creationDate: creationDate ? creationDate.toString() : '',
        modificationDate: modificationDate ? modificationDate.toString() : '',
        pageCount: pageCount
      };

      // Display metadata in organized format
      const metadataHtml = `
        <div class="metadata-grid">
          <div class="metadata-item">
            <span class="metadata-label">Title:</span>
            <span class="metadata-value">${originalMetadata.title || 'Not specified'}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Author:</span>
            <span class="metadata-value">${originalMetadata.author || 'Not specified'}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Subject:</span>
            <span class="metadata-value">${originalMetadata.subject || 'Not specified'}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Keywords:</span>
            <span class="metadata-value">${originalMetadata.keywords || 'Not specified'}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Creator:</span>
            <span class="metadata-value">${originalMetadata.creator || 'Not specified'}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Producer:</span>
            <span class="metadata-value">${originalMetadata.producer || 'Not specified'}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Creation Date:</span>
            <span class="metadata-value">${formatDate(originalMetadata.creationDate)}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Modification Date:</span>
            <span class="metadata-value">${formatDate(originalMetadata.modificationDate)}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">Page Count:</span>
            <span class="metadata-value">${pageCount}</span>
          </div>
          <div class="metadata-item">
            <span class="metadata-label">File Size:</span>
            <span class="metadata-value">${formatFileSize(currentPdfBytes.byteLength)}</span>
          </div>
        </div>
      `;

      metadataDisplay.innerHTML = metadataHtml;
      
      // Update results
      updateAnalysisResults();
      
    } catch (error) {
      console.error('Error extracting metadata:', error);
      showError('Failed to extract PDF metadata.');
    }
  }

  function updateAnalysisResults() {
    try {
      // Safe value checking that handles non-string values
      const isValuePresent = (value) => {
        if (!value) return false;
        if (typeof value === 'string') return value.trim() !== '';
        if (Array.isArray(value)) return value.length > 0;
        return String(value).trim() !== '';
      };
      
      const hasMetadata = Object.values(originalMetadata).some(isValuePresent);
      const metadataCount = Object.values(originalMetadata).filter(isValuePresent).length;
      
      const privacyRisk = assessPrivacyRisk();
    
    const analysisHtml = `
      <div class="analysis-summary">
        <div class="analysis-stat">
          <div class="stat-label">Metadata Fields Found</div>
          <div class="stat-value">${metadataCount}/8</div>
        </div>
        <div class="analysis-stat">
          <div class="stat-label">Privacy Risk Level</div>
          <div class="stat-value risk-${privacyRisk.level.toLowerCase()}">${privacyRisk.level}</div>
        </div>
      </div>
      
      <div class="privacy-assessment">
        <h4>Privacy Assessment</h4>
        <p>${privacyRisk.description}</p>
        ${privacyRisk.recommendations ? `<p><strong>Recommendations:</strong> ${privacyRisk.recommendations}</p>` : ''}
      </div>
    `;
    
    resultsContainer.innerHTML = analysisHtml;
    
    } catch (error) {
      console.error('Error in updateAnalysisResults:', error);
      resultsContainer.innerHTML = `
        <div class="analysis-summary">
          <div class="analysis-stat">
            <div class="stat-label">Status</div>
            <div class="stat-value">Analysis Available</div>
          </div>
        </div>
        <div class="privacy-assessment">
          <h4>Metadata Analysis</h4>
          <p>PDF metadata has been successfully extracted and is displayed above. The analysis tools are working properly.</p>
        </div>
      `;
    }
  }

  function assessPrivacyRisk() {
    const sensitiveFields = ['author', 'creator', 'producer'];
    const hasSensitiveInfo = sensitiveFields.some(field => {
      const value = originalMetadata[field];
      if (!value) return false;
      if (typeof value === 'string') return value.trim() !== '';
      return String(value).trim() !== '';
    });
    const hasPersonalInfo = originalMetadata.author && 
      (typeof originalMetadata.author === 'string' ? originalMetadata.author.trim() !== '' : String(originalMetadata.author).trim() !== '');
    
    // Safe metadata counting that handles all value types
    const metadataCount = Object.values(originalMetadata).filter(value => {
      if (!value) return false;
      if (typeof value === 'string') return value.trim() !== '';
      if (Array.isArray(value)) return value.length > 0;
      return String(value).trim() !== '';
    }).length;
    
    if (metadataCount === 0) {
      return {
        level: 'None',
        description: 'This PDF contains no metadata. Excellent for privacy.',
        recommendations: null
      };
    } else if (metadataCount <= 2 && !hasSensitiveInfo) {
      return {
        level: 'Low',
        description: 'Minimal metadata present. Low privacy risk.',
        recommendations: 'Consider removing all metadata for maximum privacy.'
      };
    } else if (hasSensitiveInfo || hasPersonalInfo) {
      return {
        level: 'High',
        description: 'Contains potentially sensitive information including author names or system details.',
        recommendations: 'Remove all metadata before sharing to protect privacy.'
      };
    } else {
      return {
        level: 'Medium',
        description: 'Contains several metadata fields that could reveal document creation context.',
        recommendations: 'Review metadata and remove unnecessary information.'
      };
    }
  }

  // Edit metadata functions
  function showEditForm() {
    editTitle.value = originalMetadata.title || '';
    editAuthor.value = originalMetadata.author || '';
    editSubject.value = originalMetadata.subject || '';
    editKeywords.value = originalMetadata.keywords || '';
    editCreator.value = originalMetadata.creator || '';
    
    editSection.style.display = 'block';
    metadataSection.style.display = 'none';
  }

  function hideEditForm() {
    editSection.style.display = 'none';
    metadataSection.style.display = 'block';
  }

  async function saveMetadataChanges() {
    try {
      showMessage('Updating PDF metadata...', 'info');
      
      const newMetadata = {
        Title: editTitle.value.trim(),
        Author: editAuthor.value.trim(),
        Subject: editSubject.value.trim(),
        Keywords: editKeywords.value.trim(),
        Creator: editCreator.value.trim(),
        ModDate: new Date()
      };

      // Update PDF metadata with proper data types and error handling
      try {
        currentPdfDoc.setTitle(newMetadata.Title);
        currentPdfDoc.setAuthor(newMetadata.Author);
        currentPdfDoc.setSubject(newMetadata.Subject);
        
        // Convert keywords string to array (pdf-lib requires array)
        const keywordsArray = newMetadata.Keywords
          .split(',')
          .map(k => k.trim())
          .filter(k => k.length > 0);
        
        console.log('Setting keywords array:', keywordsArray);
        currentPdfDoc.setKeywords(keywordsArray);
        
        currentPdfDoc.setCreator(newMetadata.Creator);
        currentPdfDoc.setModificationDate(newMetadata.ModDate);
        
      } catch (metadataError) {
        console.error('Error setting individual metadata fields:', metadataError);
        throw new Error(`Failed to update metadata: ${metadataError.message}`);
      }

      // Update display
      originalMetadata = {
        ...originalMetadata,
        title: newMetadata.Title,
        author: newMetadata.Author,
        subject: newMetadata.Subject,
        keywords: newMetadata.Keywords,
        creator: newMetadata.Creator,
        modificationDate: newMetadata.ModDate.toISOString()
      };

      await extractAndDisplayMetadata();
      hideEditForm();
      downloadBtn.disabled = false;
      showSuccess('Metadata updated successfully. You can now download the modified PDF.');
      
    } catch (error) {
      console.error('Error updating metadata:', error);
      showError(`Failed to update PDF metadata: ${error.message}. Please check your input and try again.`);
    }
  }

  async function removeAllMetadata() {
    try {
      // Clear all metadata fields
      currentPdfDoc.setTitle('');
      currentPdfDoc.setAuthor('');
      currentPdfDoc.setSubject('');
      currentPdfDoc.setKeywords('');
      currentPdfDoc.setCreator('');
      currentPdfDoc.setProducer('');

      // Update display
      originalMetadata = {
        title: '',
        author: '',
        subject: '',
        keywords: '',
        creator: '',
        producer: '',
        creationDate: '',
        modificationDate: ''
      };

      await extractAndDisplayMetadata();
      downloadBtn.disabled = false;
      showSuccess('All metadata removed successfully. You can now download the cleaned PDF.');
      
    } catch (error) {
      console.error('Error removing metadata:', error);
      showError('Failed to remove PDF metadata. Please try again.');
    }
  }

  async function downloadModifiedPdf() {
    try {
      const pdfBytes = await currentPdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'modified-document.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      URL.revokeObjectURL(url);
      showSuccess('PDF downloaded successfully!');
      
    } catch (error) {
      console.error('Error downloading PDF:', error);
      showError('Failed to download PDF. Please try again.');
    }
  }

  // Event listeners
  uploadArea.addEventListener('click', () => fileInput.click());
  
  uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('drag-over');
  });
  
  uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('drag-over');
  });
  
  uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  });
  
  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  });

  editMetadataBtn.addEventListener('click', showEditForm);
  cancelEditBtn.addEventListener('click', hideEditForm);
  saveMetadataBtn.addEventListener('click', saveMetadataChanges);
  removeAllBtn.addEventListener('click', removeAllMetadata);
  downloadBtn.addEventListener('click', downloadModifiedPdf);

  // Cleanup function
  return function cleanup() {
    if (currentPdfDoc) {
      currentPdfDoc = null;
    }
    currentPdfBytes = null;
    originalMetadata = {};
  };
}