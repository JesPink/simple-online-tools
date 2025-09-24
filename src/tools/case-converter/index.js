export function render() {
  return `
    <div class="case-converter-container">      
      <div class="case-converter-tool">
        <div class="input-section">
          <label for="case-input">Enter your text to convert:</label>
          <textarea 
            id="case-input" 
            placeholder="Type or paste your text here..."
            rows="8"
          ></textarea>
          <div class="char-count">
            <span id="char-count">0</span> characters
          </div>
        </div>

        <div class="conversion-options">
          <div class="option-buttons">
            <button class="case-btn active" data-case="sentence">Sentence case</button>
            <button class="case-btn" data-case="lower">lowercase</button>
            <button class="case-btn" data-case="upper">UPPERCASE</button>
            <button class="case-btn" data-case="title">Title Case</button>
            <button class="case-btn" data-case="inverted">iNVERTED cASE</button>
          </div>
        </div>

        <div class="output-section">
          <label for="case-output">Converted text:</label>
          <textarea 
            id="case-output" 
            readonly
            placeholder="Your converted text will appear here..."
            rows="8"
          ></textarea>
          <div class="output-actions">
            <button id="copy-btn" class="copy-btn">
              <span class="copy-text">Copy to Clipboard</span>
              <span class="copy-success" style="display: none;">Copied!</span>
            </button>
            <button id="clear-btn" class="clear-btn">Clear All</button>
          </div>
        </div>
      </div>

      <div class="seo-content">
        <h2>Understanding the Case Converter</h2>
        <p>Our <strong>case converter</strong> is a powerful, free online tool designed to instantly transform text between different case formats. Whether you're a developer cleaning up code, a writer formatting content, or a student working on assignments, this case converter streamlines your workflow by providing five essential text transformation options in one convenient interface.</p>
        
        <p>The tool operates entirely in your browser, ensuring your text remains private and secure. With real-time conversion capabilities and support for large text inputs, our case converter handles everything from single words to entire documents with remarkable speed and accuracy.</p>

        <h2>How to Use Our Case Converter</h2>
        <p>Using our case converter is straightforward and intuitive:</p>
        <ul>
          <li><strong>Step 1:</strong> Paste or type your text into the input area above</li>
          <li><strong>Step 2:</strong> Select your desired case format using the conversion buttons</li>
          <li><strong>Step 3:</strong> View the instantly converted text in the output area</li>
          <li><strong>Step 4:</strong> Click "Copy to Clipboard" to use your converted text elsewhere</li>
          <li><strong>Step 5:</strong> Use "Clear All" to start fresh with new text</li>
        </ul>
        
        <p>The tool automatically updates as you type, making it perfect for real-time text formatting. For optimal performance with large documents, the converter includes smart debouncing to ensure smooth operation even with extensive text inputs.</p>

        <h2>Convert Capital Letters to Lowercase Made Simple</h2>
        <p>One of the most common text formatting needs is to <strong>convert capital letters to lowercase</strong>. This functionality proves invaluable when dealing with text that's been accidentally typed in all caps, imported data with inconsistent formatting, or legacy content that needs standardization.</p>
        
        <p>Our lowercase conversion feature intelligently processes your text, transforming every uppercase letter to its lowercase equivalent while preserving numbers, punctuation, and special characters. This is particularly useful for developers working with case-sensitive programming languages, content creators preparing social media posts, or anyone needing to ensure consistent text formatting across documents.</p>
        
        <p>The <strong>all caps to lowercase</strong> transformation is instant and handles Unicode characters properly, making it suitable for international content and multilingual text processing. Whether you're converting a single sentence or an entire document, the tool maintains formatting integrity while delivering accurate results.</p>

        <h2>Upper Case Converter for Professional Formatting</h2>
        <p>The <strong>upper case converter</strong> functionality transforms all alphabetic characters in your text to their capitalized equivalents. This feature is essential for creating headings, emphasis text, or meeting specific formatting requirements in professional documents.</p>
        
        <p>Converting text to uppercase is commonly needed for acronyms, titles, headers, and emphasis in various contexts. Our tool ensures consistent capitalization across your entire text input, making it perfect for creating standardized documentation, formatting legal documents, or preparing content that requires specific capitalization conventions.</p>
        
        <p>The uppercase conversion maintains the integrity of numbers, punctuation marks, and special symbols while transforming only the alphabetic characters. This precision makes it ideal for technical documentation, business communications, and any scenario where professional text formatting is crucial.</p>

        <h2>Lower Case Converter for Streamlined Text</h2>
        <p>Our <strong>lower case converter</strong> provides a clean, efficient way to transform any text into uniform lowercase formatting. This conversion type is particularly valuable for developers working with URLs, file names, or database entries where consistent lowercase formatting is required.</p>
        
        <p>The lowercase conversion feature handles complex text inputs gracefully, preserving the original spacing and punctuation while transforming only the alphabetic characters. This makes it perfect for preparing text for case-sensitive systems, creating SEO-friendly URLs, or standardizing data entries across different platforms.</p>
        
        <p>Beyond technical applications, the <strong>caps to lowercase converter</strong> helps with everyday text formatting needs, such as correcting accidentally capitalized text, preparing content for specific style guides, or ensuring consistency in written communications.</p>

        <h2>Sentence Case Converter for Natural Reading</h2>
        <p>The <strong>sentence case converter</strong> intelligently capitalizes the first letter of each sentence while converting the remaining text to lowercase. This creates natural, readable text that follows standard grammatical conventions for most written content.</p>
        
        <p>Our sentence case algorithm recognizes common sentence endings (periods, exclamation marks, question marks) and properly capitalizes the subsequent word, creating properly formatted text that's ideal for articles, emails, and general writing. This feature is particularly useful when working with text that has inconsistent capitalization or when converting all-caps content to a more readable format.</p>
        
        <p>The sentence case conversion respects abbreviations and handles edge cases intelligently, ensuring that your converted text maintains professional quality and readability standards expected in formal and informal writing contexts.</p>

        <h2>Change Text to Uppercase for Maximum Impact</h2>
        <p>When you need to <strong>change text to uppercase</strong> for emphasis, headers, or specific formatting requirements, our converter delivers instant results with precision. The uppercase transformation is perfect for creating attention-grabbing headlines, formatting legal documents, or meeting specific style guide requirements.</p>
        
        <p>The tool's uppercase conversion handles international characters, accented letters, and special Unicode symbols correctly, ensuring that your text maintains its meaning and readability across different languages and character sets. This comprehensive approach makes it suitable for global content creation and multilingual text processing.</p>
        
        <p>Whether you're preparing marketing materials, formatting technical documentation, or creating content that requires specific capitalization standards, the <strong>upper to lower case converter</strong> and its reverse functionality provide the flexibility needed for professional text formatting.</p>

        <h2>Frequently Asked Questions</h2>
        
        <h3>What types of case conversion does this case converter support?</h3>
        <p>Our case converter supports five essential conversion types: sentence case (first letter capitalized), lowercase (all letters small), uppercase (all letters capitalized), title case (first letter of each word capitalized), and inverted case (alternates between upper and lowercase).</p>
        
        <h3>Can I convert large amounts of text at once?</h3>
        <p>Yes, our tool handles large text inputs efficiently. For documents over 5,000 characters, we implement smart debouncing to ensure optimal performance while maintaining real-time conversion capabilities.</p>
        
        <h3>Is my text data secure when using this case converter?</h3>
        <p>Absolutely. All text processing happens entirely in your browser - no data is sent to our servers. Your text remains completely private and secure throughout the conversion process.</p>
        
        <h3>Does the tool work with special characters and international text?</h3>
        <p>Yes, our case converter properly handles Unicode characters, accented letters, and international alphabets, making it suitable for multilingual content and special character formatting.</p>
        
        <h3>Can I use this tool offline?</h3>
        <p>Once the page loads, the case converter works completely offline since all processing happens in your browser. No internet connection is required for text conversion operations.</p>

        <h2>Case Converter and Your Workflow</h2>
        <p>Our case converter integrates seamlessly into any text processing workflow, providing instant formatting solutions for writers, developers, students, and professionals. The tool's versatility makes it an essential utility for anyone working with text formatting requirements.</p>
        
        <p>Combine this case converter with other text tools like our <strong>word counter</strong> for comprehensive text analysis, or use it alongside formatting tools to create perfectly structured content. The case converter's efficiency and accuracy make it a valuable addition to any digital toolkit focused on text transformation and content creation.</p>
      </div>
    </div>
  `;
}

export async function init() {
  const inputEl = document.getElementById('case-input');
  const outputEl = document.getElementById('case-output');
  const charCountEl = document.getElementById('char-count');
  const caseButtons = document.querySelectorAll('.case-btn');
  const copyBtn = document.getElementById('copy-btn');
  const clearBtn = document.getElementById('clear-btn');
  
  let currentCaseType = 'sentence';
  let debounceTimer = null;
  
  // Case conversion functions
  const caseConverters = {
    upper: (text) => text.toUpperCase(),
    lower: (text) => text.toLowerCase(),
    sentence: (text) => {
      return text.toLowerCase().replace(/(^|\. |\! |\? )([a-z])/g, (match, punct, letter) => {
        return punct + letter.toUpperCase();
      });
    },
    title: (text) => {
      return text.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
    },
    inverted: (text) => {
      return text.split('').map(char => {
        if (char === char.toUpperCase()) {
          return char.toLowerCase();
        } else {
          return char.toUpperCase();
        }
      }).join('');
    }
  };
  
  // Update character count
  function updateCharCount(text) {
    const count = text.length;
    charCountEl.textContent = count.toLocaleString();
  }
  
  // Convert text based on selected case type
  function convertText(text, animate = true) {
    if (!text) {
      outputEl.value = '';
      return;
    }
    
    const convertedText = caseConverters[currentCaseType](text);
    
    // Smart animations: only animate for small inputs
    if (animate && text.length < 1000) {
      outputEl.style.opacity = '0.5';
      setTimeout(() => {
        outputEl.value = convertedText;
        outputEl.style.opacity = '1';
      }, 100);
    } else {
      outputEl.value = convertedText;
    }
  }
  
  // Handle case button clicks
  caseButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      caseButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update current case type
      currentCaseType = button.dataset.case;
      
      // Convert current text
      convertText(inputEl.value);
    });
  });
  
  // Handle input changes with performance optimization
  function handleInput() {
    const text = inputEl.value;
    updateCharCount(text);
    
    // Clear existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    
    // Use debouncing for large inputs (>5000 characters)
    if (text.length > 5000) {
      debounceTimer = setTimeout(() => {
        convertText(text, false); // No animation for large inputs
      }, 300);
    } else {
      convertText(text);
    }
  }
  
  inputEl.addEventListener('input', handleInput);
  inputEl.addEventListener('paste', () => {
    // Handle paste with slight delay to ensure text is in the textarea
    setTimeout(handleInput, 10);
  });
  
  // Copy to clipboard functionality
  copyBtn.addEventListener('click', async () => {
    if (!outputEl.value) return;
    
    try {
      await navigator.clipboard.writeText(outputEl.value);
      
      // Show success feedback
      const copyText = copyBtn.querySelector('.copy-text');
      const copySuccess = copyBtn.querySelector('.copy-success');
      
      copyText.style.display = 'none';
      copySuccess.style.display = 'inline';
      
      setTimeout(() => {
        copyText.style.display = 'inline';
        copySuccess.style.display = 'none';
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // Fallback for older browsers
      outputEl.select();
      document.execCommand('copy');
    }
  });
  
  // Clear all functionality
  clearBtn.addEventListener('click', () => {
    inputEl.value = '';
    outputEl.value = '';
    updateCharCount('');
    inputEl.focus();
  });
  
  // Initialize with empty state
  updateCharCount('');
  
  // Cleanup function for event listeners
  return () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
  };
}