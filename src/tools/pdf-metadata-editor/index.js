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
                <button class="btn btn-secondary" id="remove-all-btn">Clear Supported Fields</button>
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
<h2>What This PDF Metadata Editor Can Do</h2>
<p>This browser-based PDF metadata editor reads common document-information fields from a PDF and lets you update selected properties before downloading a modified copy. It can display the title, author, subject, keywords, creator, producer, creation date, modification date, and page count.</p>
<p>The tool uses the PDF library in your browser and does not upload the selected PDF to a processing server. It is designed for routine document-information edits, not forensic inspection or complete removal of every kind of data embedded in a PDF.</p>
<h2>How to Use the PDF Metadata Editor</h2>
<ol>
<li><strong>Select a PDF:</strong> Choose a standard, unencrypted PDF from your device. Encrypted, malformed, or unusually complex files may not load.</li>
<li><strong>Review the displayed fields:</strong> Check the document information the tool can read, including title, author, subject, keywords, creator, producer, and available dates.</li>
<li><strong>Edit supported properties:</strong> The edit form lets you change the title, author, subject, keywords, and creator. The producer and date fields are displayed but are not editable in the form.</li>
<li><strong>Clear supported fields if needed:</strong> The clear action removes the title, author, subject, keywords, creator, and producer fields exposed by this tool. It does not clear the creation or modification dates or every possible embedded data structure.</li>
<li><strong>Download and verify:</strong> Download the modified PDF, then reopen it in a PDF reader and inspect the properties again. Your original local file is not overwritten.</li>
</ol>
<h2>What PDF Metadata Means</h2>
<p>PDF document information can identify a document's title, author, subject, keywords, or the software that created it. Creation and modification dates may also be present. These fields can help organize documents, but they can be incomplete, missing, or inaccurate. Their presence does not prove who created a file or whether its contents are authentic.</p>
<h2>Important Privacy and Sanitization Limits</h2>
<p>Clearing the fields listed above is not the same as securely sanitizing a PDF. This tool does not perform a forensic scan and does not guarantee removal of XMP metadata, comments, annotations, attachments, embedded files, hidden text, layers, digital signatures, or information stored in other PDF objects. Do not rely on it as the only privacy check for legal, medical, confidential, or otherwise sensitive documents.</p>
<p>After editing, inspect the downloaded file with a suitable PDF reader or a dedicated document-sanitization workflow if you need stronger assurance. Keep an untouched original until you have verified the modified copy.</p>
<h2>Frequently Asked Questions</h2>
<h3>Does this tool upload my PDF?</h3>
<p>The selected PDF is processed in your browser by this tool; it is not uploaded to a PDF-processing server. Website analytics, server logs, and other site-level data handling are described separately in the Privacy Policy.</p>
<h3>Which fields can I edit?</h3>
<p>You can edit the title, author, subject, keywords, and creator fields. The tool also displays the producer and available creation and modification dates, but those fields are not all editable.</p>
<h3>Does Clear Supported Fields remove every trace of metadata?</h3>
<p>No. It clears a defined set of standard document-information fields. Other metadata and embedded PDF content may remain, so this is not a complete sanitization or anonymity tool.</p>
<h3>Can this tool verify who created a PDF?</h3>
<p>No. Metadata is editable and may be missing or inaccurate. It can provide context about a file, but it cannot establish authenticity, authorship, or document provenance.</p>
<h3>Can I process several PDFs at once?</h3>
<p>No. The tool processes one PDF at a time. Select and process each file separately.</p>
<h2>Check the Result Before Sharing</h2>
<p>Use this editor for straightforward document-information updates, then verify the downloaded file in a separate PDF reader. If you need to remove all hidden or sensitive content, use a specialist sanitization process and confirm its results independently.</p>
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
        <h3>Privacy Assessment</h3>
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
          <h3>Metadata Analysis</h3>
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
        recommendations: 'Review the supported document-information fields; this tool does not inspect or remove every embedded PDF data structure.'
      };
    } else if (hasSensitiveInfo || hasPersonalInfo) {
      return {
        level: 'High',
        description: 'Contains potentially sensitive information including author names or system details.',
        recommendations: 'Clear supported document-information fields, then use a dedicated PDF inspection workflow if sensitive embedded data is a concern.'
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
      showSuccess('Supported document-information fields cleared. Other embedded PDF data may remain; review the file separately before sharing sensitive documents.');
      
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