export function render() {
  return `
    <div class="meta-description-generator-tool">
      <div class="tool-container">
        <div class="tool-interface">
          <div class="tool-main">
            <div class="form-section">
              <div class="section-title">Generate Your Meta Description</div>
              <div class="form-group">
                <label for="page-title">Page Title</label>
                <input type="text" id="page-title" placeholder="Enter your page title..." aria-describedby="page-title-help" />
                <small id="page-title-help" class="form-help">The main title of your web page</small>
              </div>
              <div class="form-group">
                <label for="content-summary">Content Summary</label>
                <textarea id="content-summary" rows="3" placeholder="Brief description of your page content..." aria-describedby="content-summary-help"></textarea>
                <small id="content-summary-help" class="form-help">Briefly describe what your page is about</small>
              </div>
              <div class="form-group">
                <label for="target-keyword">Target Keyword (Optional)</label>
                <input type="text" id="target-keyword" placeholder="Primary keyword to include..." aria-describedby="target-keyword-help" />
                <small id="target-keyword-help" class="form-help">Use a relevant phrase only if it accurately describes this page</small>
              </div>
              <div class="form-group">
                <label for="tone-select">Tone</label>
                <select id="tone-select" aria-describedby="tone-select-help">
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="urgent">Urgent</option>
                  <option value="informative">Informative</option>
                  <option value="creative">Creative</option>
                </select>
                <small id="tone-select-help" class="form-help">Choose the style that matches your brand voice</small>
              </div>
              <div class="form-actions">
                <button class="btn btn-primary" id="generate-btn">Generate Meta Description</button>
                <button class="btn btn-secondary" id="clear-btn">Clear All</button>
              </div>
            </div>
          </div>
          <div class="tool-results">
            <div class="section-title">Generated Meta Description</div>
            <div class="results-content">
              <div id="meta-preview" class="meta-preview">
                <div class="preview-placeholder">
                  Your generated meta description will appear here...
                </div>
              </div>
              <div id="character-info" class="character-info">
                <span id="char-count">0</span> characters
                <span id="length-status" class="length-status"></span>
              </div>
              <div class="result-actions">
                <button class="btn btn-primary" id="copy-btn" disabled>Copy to Clipboard</button>
                <button class="btn btn-secondary" id="regenerate-btn" disabled>Regenerate</button>
              </div>
            </div>
          </div>
        </div>
        <div class="seo-content">
<h2>What a Meta Description Does</h2>
<p>A meta description is a short summary in a page's HTML that may be used as the description beneath its title in search results. Google primarily creates snippets from page content and may use the meta description when it gives searchers a more accurate summary. Google can show different snippets for different searches, and it may rewrite the description.</p>
<p>Meta descriptions are not a direct Google ranking factor. A clear, accurate description can help people understand what a page offers, but no wording or character count guarantees a ranking, a particular snippet, or more clicks.</p>
<h2>How to Use the Generator</h2>
<ol>
<li><strong>Enter the page title:</strong> Use the title or main heading that identifies the page.</li>
<li><strong>Summarize the page:</strong> Include the actual content, feature, audience, or task a visitor will find.</li>
<li><strong>Add a target phrase only when relevant:</strong> It should describe the page naturally, not be included just to repeat a keyword.</li>
<li><strong>Choose a tone:</strong> Select a style that fits the page and its audience.</li>
<li><strong>Review the drafts:</strong> Compare the three template-based options, correct anything inaccurate, and copy the version that best represents the page.</li>
</ol>
<h2>How This Generator Works</h2>
<p>This tool runs in your browser. It combines the title, summary, optional target phrase, and selected tone into three variations using built-in writing templates. It does not use an AI model, visit or analyze your page, check search rankings, verify factual claims, or predict click-through rates.</p>
<p>The drafts are starting points, not validated SEO recommendations. They can still sound generic or awkward, especially when the supplied summary is vague. Edit the result so it describes the page precisely and does not promise features, outcomes, prices, or credentials that the page cannot support.</p>
<h2>Writing a Useful Meta Description</h2>
<ul>
<li><strong>Describe the page specifically:</strong> Explain what a visitor can do, learn, compare, or access.</li>
<li><strong>Make each important page distinct:</strong> Avoid reusing one generic description across unrelated pages.</li>
<li><strong>Use natural language:</strong> Include a relevant search phrase only when it fits the sentence and page.</li>
<li><strong>Prefer evidence over persuasion tricks:</strong> Avoid invented statistics, unsupported superlatives, fake scarcity, and claims such as “trusted by thousands” unless they are verified.</li>
<li><strong>Keep the searcher in mind:</strong> The description should set an accurate expectation for the page, not simply repeat keywords.</li>
</ul>
<p>There is no fixed character limit for a meta description. Search snippets are shortened as needed to fit the device and query. A length around 120–160 characters can be a useful drafting reference, but it is not a Google requirement or a guarantee that the full text will appear.</p>
<h2>Frequently Asked Questions</h2>
<h3>Do meta descriptions directly improve Google rankings?</h3>
<p>No. Google does not use the meta description as a direct ranking factor. A useful description can help searchers understand a result, but it does not guarantee a higher position or a click.</p>
<h3>Will Google always show the description I write?</h3>
<p>No. Google primarily generates snippets from page content and may use your meta description when it better summarizes the page for a particular query.</p>
<h3>Is there an ideal character limit?</h3>
<p>No fixed limit applies. Search snippets are truncated to fit the available display. Use the character count as an editing aid, not a pass-or-fail SEO rule.</p>
<h3>Does this tool use AI or analyze my website?</h3>
<p>No. It uses built-in templates in your browser and the information you enter. It does not fetch your page, connect to Google, or evaluate keyword difficulty or rankings.</p>
<h3>Should every page have a unique meta description?</h3>
<p>Where practical, write a distinct summary for each important page. Make sure it reflects that page's actual content and value rather than changing only a keyword.</p>
<h2>Review Before Publishing</h2>
<p>Read the draft beside the page it describes. Remove any detail that is not visible or supported on the page, check that the wording matches the searcher's likely task, and remember that Google may choose a different snippet. Use this generator to speed up drafting, not to replace editorial review.</p>
</div>
      </div>
    </div>
  `;
}

export async function init() {
  const pageTitleInput = document.getElementById('page-title');
  const contentSummaryInput = document.getElementById('content-summary');
  const targetKeywordInput = document.getElementById('target-keyword');
  const toneSelect = document.getElementById('tone-select');
  const generateBtn = document.getElementById('generate-btn');
  const clearBtn = document.getElementById('clear-btn');
  const copyBtn = document.getElementById('copy-btn');
  const regenerateBtn = document.getElementById('regenerate-btn');
  const metaPreview = document.getElementById('meta-preview');
  const charCount = document.getElementById('char-count');
  const lengthStatus = document.getElementById('length-status');

  let debounceTimer;
  let currentMetaDescription = '';
  let generatedVariants = [];
  let isExpandedView = false; // Track if user is in expanded view

  // Utility functions for enhanced meta description generation
  function pick(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function ensureKeyword(meta, keyword) {
    if (!keyword) return meta;
    const idx = meta.toLowerCase().indexOf(keyword.toLowerCase());
    if (idx >= 0) return meta;
    // Insert keyword at the beginning for better SEO
    return `${keyword} — ${meta}`;
  }

  function safeTruncate(s, max = 155) {
    if (s.length <= max) return s;
    let cut = s.substring(0, max);
    // Drop partial word to avoid mid-word cuts
    cut = cut.replace(/\s+\S*$/, '');
    return cut + '...';
  }

  function tidy(s) {
    // Clean up spacing and punctuation
    s = s.replace(/\s+/g, ' ').trim();
    s = s.replace(/\s+([.,!?:;])/g, '$1');
    s = s.replace(/\s{2,}/g, ' ');
    
    // Generic redundancy removal patterns
    s = s.replace(/\b(\w+)\s+\1\b/gi, '$1'); // Remove duplicate words
    s = s.replace(/(\w+)\s+(\w+)\s+\1\s+\2/gi, '$1 $2'); // Remove duplicate phrases
    
    // Generic pattern fixes that work for any content
    // Fix awkward repetitive structures: "X with Y X" -> "Professional X with Y"
    s = s.replace(/(\w+)\s+with\s+[^.!?]*\1/gi, (match, word) => {
      return `Professional ${word.toLowerCase()} with comprehensive features`;
    });
    
    // Fix awkward preposition chains: "X for Y for Z" -> "X designed for Y and Z"
    s = s.replace(/(\w+)\s+for\s+([^.!?]*)\s+for\s+([^.!?]*)/gi, '$1 designed for $2 and $3');
    
    // Fix timing contradictions generically
    s = s.replace(/before.*time.*out.*(today|now)/gi, 'today only');
    s = s.replace(/until.*time.*out.*(today|now)/gi, 'available now');
    s = s.replace(/time runs out (today|now)/gi, 'limited time');
    
    // Generic grammar improvements
    s = s.replace(/with\s+([^.!?]*)\s+explained/gi, 'with detailed $1');
    s = s.replace(/featuring\s+([^.!?]*)\s+information/gi, 'with comprehensive $1');
    s = s.replace(/\s+(and|to)\s+(and|to)\s+/gi, ' and '); // Remove duplicate connectors
    
    // Improve common awkward endings
    s = s.replace(/\bhere\./gi, 'available.');
    s = s.replace(/\bnow\.\s*$/gi, 'today.');
    
    // Remove duplicate connectors generically
    s = s.replace(/\b(and|with|for|to)\s+\1\b/gi, '$1');
    s = s.replace(/\b(now|today)\s+(now|today)\b/gi, '$1');
    
    // Capitalize properly and fix common proper nouns
    s = s.charAt(0).toUpperCase() + s.slice(1);
    s = s.replace(/\.\s+([a-z])/g, (match, p1) => '. ' + p1.toUpperCase());
    
    // Common proper noun capitalizations
    s = s.replace(/\b(german|french|italian|japanese|american)\b/gi, (match) => 
      match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()
    );
    
    return s;
  }

  function generateMetaDescription() {
    const title = pageTitleInput.value.trim();
    const summary = contentSummaryInput.value.trim();
    const keyword = targetKeywordInput.value.trim();
    const tone = toneSelect.value;

    if (!title && !summary) {
      showError('Please enter at least a page title or content summary.');
      return;
    }

    try {
      const cleanTitle = tidy(title).replace(/\\s+/g, ' ').trim();
      const cleanSummary = tidy(summary).replace(/\\s+/g, ' ').trim();
      const focus = keyword || cleanTitle || cleanSummary;
      const base = cleanSummary || cleanTitle;
      const action = tone === 'friendly' ? 'Explore' :
        tone === 'urgent' ? 'Find' :
        tone === 'creative' ? 'Discover' :
        tone === 'informative' ? 'Learn about' : 'See';

      const candidates = [
        base,
        cleanTitle && cleanSummary ? cleanTitle + ': ' + cleanSummary : focus + ': ' + base,
        action + ' ' + focus + '. ' + base
      ];
      const variants = [];
      candidates.forEach((candidate) => {
        const text = polishGrammar(candidate);
        if (text && !variants.some((variant) => variant.text.toLowerCase() === text.toLowerCase())) {
          variants.push({ text });
        }
      });

      generatedVariants = variants.slice(0, 3);
      currentMetaDescription = generatedVariants[0].text;
      displayResult(currentMetaDescription, generatedVariants, isExpandedView);
      regenerateBtn.textContent = isExpandedView ? 'Regenerate All' : 'Regenerate';
    } catch (error) {
      console.error('Generation failed:', error);
      showError('Failed to generate meta description. Please try again.');
    }
  }

  function polishGrammar(meta) {
    // Simple grammar polish without over-processing
    meta = meta.replace(/\s+/g, ' ').trim();
    meta = meta.replace(/\s+([.,!?:;])/g, '$1');
    meta = meta.charAt(0).toUpperCase() + meta.slice(1);
    
    // Fix common issues
    meta = meta.replace(/\b(a|an)\s+(a|an)\b/gi, '$1');
    meta = meta.replace(/\.\s*\./g, '.');
    
    return meta;
  }



  function displayResult(bestMeta, variants = [], showAll = false) {
    // Update view state tracking
    isExpandedView = showAll;
    
    let resultHtml = `
      <div class="serp-preview">
        <div class="serp-title">${pageTitleInput.value || 'Your Page Title'}</div>
        <div class="serp-url">https://yoursite.com/page-url</div>
        <div class="serp-description">${bestMeta}</div>
      </div>
      <div class="meta-result-primary">
        <strong>Generated Description:</strong>
        <div class="meta-text">${bestMeta}</div>
      </div>
    `;
    
    // Smart display logic
    if (!showAll && variants.length > 1) {
      // Show "Generate More Options" button
      resultHtml += `
        <div class="more-options-section">
          <button class="btn btn-secondary" id="show-more-btn">Generate More Options</button>
        </div>
      `;
    } else if (showAll && variants.length > 1) {
      // Show all variants + "Regenerate All" button
      resultHtml += `<div class="variants-section">
        <h3>Alternative Options:</h3>`;
      
      variants.slice(1).forEach((variant, index) => {
        resultHtml += `
          <div class="variant-option" data-variant="${index + 1}">
            <div class="variant-text">${variant.text}</div>
            <div class="variant-label">Alternative ${index + 1}</div>
            <button class="btn btn-secondary btn-sm use-variant-btn" data-text="${variant.text.replace(/"/g, '&quot;')}">Use This</button>
          </div>
        `;
      });
      
      resultHtml += `</div>`;
      
      // Update regenerate button text
      regenerateBtn.textContent = 'Regenerate All';
    }
    
    metaPreview.innerHTML = resultHtml;
    updateCharacterCount(bestMeta);
    copyBtn.disabled = false;
    regenerateBtn.disabled = false;
    
    // Add event listeners for "Use This" buttons
    const useVariantBtns = metaPreview.querySelectorAll('.use-variant-btn');
    useVariantBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const variantText = e.target.getAttribute('data-text').replace(/&quot;/g, '"');
        currentMetaDescription = variantText;
        isExpandedView = false; // Reset to minimal view when selecting a variant
        displayResult(variantText, [{ text: variantText }], false);
        regenerateBtn.textContent = 'Regenerate'; // Reset button text
      });
    });
    
    // Add event listener for "Generate More Options" button
    const showMoreBtn = document.getElementById('show-more-btn');
    if (showMoreBtn) {
      showMoreBtn.addEventListener('click', () => {
        displayResult(bestMeta, variants, true);
      });
    }
  }

  function updateCharacterCount(text) {
    const length = text.length;
    charCount.textContent = length;

    if (length <= 160) {
      lengthStatus.textContent = '(Common drafting range, not a Google limit)';
      lengthStatus.className = 'length-status';
    } else {
      lengthStatus.textContent = '(Google may shorten snippets to fit the query and device)';
      lengthStatus.className = 'length-status';
    }
  }

  function showError(message) {
    metaPreview.innerHTML = `<div class="error-message">${message}</div>`;
    charCount.textContent = '0';
    lengthStatus.textContent = '';
    copyBtn.disabled = true;
    regenerateBtn.disabled = true;
  }

  function clearAll() {
    pageTitleInput.value = '';
    contentSummaryInput.value = '';
    targetKeywordInput.value = '';
    toneSelect.value = 'professional';
    metaPreview.innerHTML = '<div class="preview-placeholder">Your generated meta description will appear here...</div>';
    charCount.textContent = '0';
    lengthStatus.textContent = '';
    copyBtn.disabled = true;
    regenerateBtn.disabled = true;
    currentMetaDescription = '';
    generatedVariants = [];
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(currentMetaDescription);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy to Clipboard';
      }, 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentMetaDescription;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy to Clipboard';
      }, 2000);
    }
  }

  // Debounced real-time preview for title/summary changes
  function debouncedPreview() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (pageTitleInput.value.trim() || contentSummaryInput.value.trim()) {
        generateMetaDescription();
      }
    }, 800);
  }

  // Event listeners
  generateBtn.addEventListener('click', generateMetaDescription);
  clearBtn.addEventListener('click', clearAll);
  copyBtn.addEventListener('click', copyToClipboard);
  regenerateBtn.addEventListener('click', () => {
    // Force regeneration with different random selections
    generateMetaDescription();
  });
  
  // Real-time preview with debouncing
  pageTitleInput.addEventListener('input', debouncedPreview);
  contentSummaryInput.addEventListener('input', debouncedPreview);
  targetKeywordInput.addEventListener('input', debouncedPreview);
  toneSelect.addEventListener('change', debouncedPreview);
}

export function cleanup() {
  // Clear any pending timers
  const debounceTimer = null;
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
}