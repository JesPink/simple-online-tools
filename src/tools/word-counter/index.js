/**
 * Word Counter Tool
 * 
 * A comprehensive word and character counting tool that provides
 * real-time statistics about text input.
 */

export function render() {
  return `
    <div class="word-counter-tool">
      <div class="tool-container">
        <div class="tool-interface">
          <div class="tool-main">
            <div class="form-section">
              <h3>Enter Your Text</h3>
              <div class="form-group">
                <label for="text-input">Text to analyze:</label>
                <textarea 
                  id="text-input" 
                  placeholder="Type or paste your text here to get instant word and character counts..."
                  rows="12"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="tool-results">
            <h3>Text Statistics</h3>
            <div class="results-content">
              <div class="stats-grid">
                <div class="stat-card">
                  <div class="stat-number" id="word-count">0</div>
                  <div class="stat-label">Words</div>
                </div>
                
                <div class="stat-card">
                  <div class="stat-number" id="char-count">0</div>
                  <div class="stat-label">Characters</div>
                </div>
                
                <div class="stat-card">
                  <div class="stat-number" id="char-count-no-spaces">0</div>
                  <div class="stat-label">Characters (no spaces)</div>
                </div>
                
                <div class="stat-card">
                  <div class="stat-number" id="sentence-count">0</div>
                  <div class="stat-label">Sentences</div>
                </div>
                
                <div class="stat-card">
                  <div class="stat-number" id="paragraph-count">0</div>
                  <div class="stat-label">Paragraphs</div>
                </div>
                
                <div class="stat-card">
                  <div class="stat-number" id="unique-words">0</div>
                  <div class="stat-label">Unique Words</div>
        </div>
        
        <div class="stat-card">
          <div class="stat-number" id="reading-time">0</div>
          <div class="stat-label">Reading Time (min) <small>(est. at 225 wpm)</small></div>
        </div>
      </div>
      
      <div class="action-buttons">
        <button id="clear-btn" class="btn btn-secondary">
          Clear Text
        </button>
        <button id="copy-stats-btn" class="btn btn-primary">
          Copy Statistics
        </button>
      </div>
      
      <div class="seo-content">
        <section class="content-section">
          <h2>What is the Word Counter Tool?</h2>
          <p>
            Our free online word counter is a comprehensive text analysis tool that instantly calculates 
            the number of words, characters (with and without spaces), sentences, paragraphs, and <strong>unique words</strong> in any text. Whether you're a 
            student working on an essay, a professional writer crafting articles, or a social media 
            manager creating posts, this tool provides accurate, real-time statistics to help you meet 
            specific length requirements and optimize your content.
          </p>
          <p>
            Unlike basic word counting tools, our advanced counter offers detailed metrics including 
            character counts with and without spaces, reading time estimates, and sentence analysis. 
            The tool works entirely in your browser, ensuring your content remains private and secure 
            while providing instant results as you type or paste text.
          </p>
        </section>

        <section class="content-section">
          <h2>How to Use the Word Counter</h2>
          <p>Using our word counter tool is simple and straightforward:</p>
          <ol class="instruction-list">
            <li><strong>Paste or Type Text:</strong> Simply paste your content into the text area above, or start typing directly. The tool begins analyzing your text immediately.</li>
            <li><strong>View Real-Time Statistics:</strong> Watch as the word count, character count, sentences, and paragraphs update instantly as you edit your text.</li>
            <li><strong>Monitor Reading Time:</strong> See the estimated reading time based on average reading speeds, perfect for content planning.</li>
            <li><strong>Copy Statistics:</strong> Use the "Copy Statistics" button to quickly share your text metrics with others or save them for reference.</li>
            <li><strong>Clear and Restart:</strong> Click "Clear Text" to start fresh with new content analysis.</li>
          </ol>
          <p>
            Pro tip: Use keyboard shortcuts like Ctrl+A to select all text quickly, or Ctrl+L to clear 
            the text area and start over. The tool handles large documents efficiently and works offline, 
            so you can count words even without an internet connection.
          </p>
        </section>

        <section class="content-section">
          <h2>What is a Unique Words Counter?</h2>
          <p>
            A <strong>unique words counter</strong> goes beyond basic word count by calculating the number of distinct words in your text. This metric, also known as "lexical density," is vital for writers, students, and SEO specialists. It helps you:
          </p>
          <ul>
            <li><strong>Avoid Repetition:</strong> Identify overused words and improve the quality of your writing.</li>
            <li><strong>SEO Optimization:</strong> Search engines favor content with a rich and varied vocabulary.</li>
            <li><strong>Academic Analysis:</strong> Measure the complexity and originality of a text.</li>
          </ul>
          <p>
            Our tool functions as an advanced <strong>unique word counter</strong> by providing this crucial metric alongside all other text statistics, giving you a complete picture of your writing. Alongside tracking unique vocabulary, our tool's <strong>paragraph counter</strong> helps you structure your writing effectively, ensuring your ideas are organized and easy to follow.
          </p>
        </section>

        <section class="content-section">
          <h2>Why is Word Count Important?</h2>
          <p>
            Word count plays a crucial role in various forms of writing and communication. Understanding 
            and managing word count helps ensure your message is delivered effectively while meeting 
            specific requirements and constraints.
          </p>
          
          <h3>Academic and Professional Writing</h3>
          <p>
            In academic settings, essays, research papers, and dissertations often have strict word 
            count requirements. Staying within these limits demonstrates your ability to communicate 
            ideas concisely and follow guidelines. Professional reports, proposals, and articles also 
            frequently have word count specifications that must be met for publication or submission.
          </p>

          <h3>Content Marketing and SEO</h3>
          <p>
            For digital marketing, word count significantly impacts SEO performance. Search engines 
            favor comprehensive content, with studies showing that pages with 1,500-2,500 words 
            typically rank higher in search results. Blog posts, product descriptions, and web copy 
            all benefit from strategic word count optimization to improve visibility and engagement.
          </p>

          <h3>Social Media Optimization</h3>
          <p>
            Different social media platforms have varying character and word limits. Twitter posts 
            are limited to 280 characters, while LinkedIn posts perform best between 150-300 words. 
            Facebook posts see optimal engagement with 40-80 characters. Our tool helps you craft 
            platform-specific content that maximizes reach and engagement.
          </p>
        </section>

        <section class="content-section">
          <h2>Word Counter Use Cases</h2>
          
          <h3>Academic Writing</h3>
          <p>
            Students and researchers use word counters for essays, dissertations, and research papers. 
            Meeting exact word count requirements is essential for academic success, and our tool helps 
            ensure compliance with assignment guidelines while maintaining content quality.
          </p>

          <h3>Professional Content Creation</h3>
          <p>
            Content creators, journalists, and copywriters rely on word counts for article length, 
            blog post optimization, and meeting editorial requirements. Publishers often specify 
            exact word ranges for different types of content, making accurate counting essential.
          </p>

          <h3>Social Media Management</h3>
          <p>
            Social media managers use word and character counters to optimize posts for different 
            platforms. Each social network has optimal lengths for maximum engagement, and our tool 
            helps create perfectly sized content for Twitter, Facebook, LinkedIn, and Instagram.
          </p>

          <h3>SEO and Web Content</h3>
          <p>
            SEO professionals and web developers use word counters to optimize page content length 
            for search engine rankings. Meta descriptions, title tags, and body content all have 
            optimal word counts that improve search visibility and user experience.
          </p>
        </section>

        <section class="content-section">
          <h2>Frequently Asked Questions</h2>
          
          <div class="faq-item">
            <h3>How do I count unique words in my text?</h3>
            <p>
              Our tool automatically calculates the number of unique words for you. Simply paste your text into the input box, and look for the "Unique Words" metric in the results. Our <strong>unique words counter</strong> algorithm processes the text instantly, giving you a count of all distinct terms.
            </p>
          </div>
          
          <div class="faq-item">
            <h3>Can I use this as a website word count checker?</h3>
            <p>
              Absolutely. While this tool requires you to paste text manually, it functions perfectly as a <strong>website word count checker</strong>. Simply copy the text from any webpage (Ctrl+A, Ctrl+C) and paste it into the box above. You'll instantly get the word count, character count, and other vital metrics for any web content.
            </p>
          </div>
          
          <div class="faq-item">
            <h3>What is the maximum text length this tool can handle?</h3>
            <p>
              Our word counter can handle extremely large documents with hundreds of thousands of words. 
              The tool is optimized for performance and will continue to provide accurate counts even 
              with lengthy manuscripts, books, or research papers.
            </p>
          </div>

          <div class="faq-item">
            <h3>How accurate is the word and character counting?</h3>
            <p>
              Our counting algorithm is highly accurate and follows standard text processing rules. 
              Words are counted by splitting text on whitespace and punctuation, while characters 
              include all visible text, spaces, and punctuation marks. The tool provides both 
              character counts with and without spaces for maximum flexibility.
            </p>
          </div>

          <div class="faq-item">
            <h3>Does this tool work without an internet connection?</h3>
            <p>
              Yes! Once the page loads, our word counter works entirely offline. All processing 
              happens in your browser, so you can count words even without internet access. This 
              also means your text never leaves your device, ensuring complete privacy.
            </p>
          </div>

          <div class="faq-item">
            <h3>Is my text data secure and private?</h3>
            <p>
              Absolutely. Your text is processed entirely within your browser and never sent to 
              our servers or any third parties. We don't store, save, or analyze your content in 
              any way. When you close the page, your text is completely removed from memory.
            </p>
          </div>

          <div class="faq-item">
            <h3>Can I use this tool for languages other than English?</h3>
            <p>
              Yes, our word counter supports all languages and character sets, including Chinese, 
              Japanese, Arabic, Russian, and many others. The tool correctly handles different 
              writing systems and provides accurate counts regardless of the language used.
            </p>
          </div>

          <div class="faq-item">
            <h3>How is reading time calculated?</h3>
            <p>
              Reading time is estimated based on the average adult reading speed of 225 words per 
              minute. This is a widely accepted standard for silent reading of normal text. The 
              calculation helps content creators estimate how long it will take readers to consume 
              their content.
            </p>
          </div>
        </section>

        <section class="content-section">
          <h2>Word Counter and Your Workflow</h2>
          <p>
            Our word counter integrates perfectly into any writing workflow, whether you're crafting academic papers, creating blog content, or managing social media posts. Combine it with other essential tools from our platform:
          </p>
          <ul>
            <li><strong><a href="/tools/case-converter/">Case Converter</a></strong> - Transform text case for consistent formatting</li>
            <li><strong><a href="/tools/passive-voice-detector/">Passive Voice Detector</a></strong> - Improve writing clarity and engagement</li>
            <li><strong><a href="/tools/meta-description-generator/">Meta Description Generator</a></strong> - Create SEO-optimized descriptions within character limits</li>
          </ul>
          <p>
            <strong>Explore our complete collection of text analysis tools</strong> to streamline 
            your writing workflow and create better content faster.
          </p>
        </section>
      </div>
    </div>
  `;
}

export async function init() {
  const textInput = document.getElementById('text-input');
  const clearBtn = document.getElementById('clear-btn');
  const copyStatsBtn = document.getElementById('copy-stats-btn');
  
  // Statistics elements
  const wordCountEl = document.getElementById('word-count');
  const charCountEl = document.getElementById('char-count');
  const charCountNoSpacesEl = document.getElementById('char-count-no-spaces');
  const sentenceCountEl = document.getElementById('sentence-count');
  const paragraphCountEl = document.getElementById('paragraph-count');
  const uniqueWordsEl = document.getElementById('unique-words');
  const readingTimeEl = document.getElementById('reading-time');
  
  function countWords(text) {
    if (!text.trim()) return 0;
    return text.trim().split(/\s+/).length;
  }
  
  function countSentences(text) {
    if (!text.trim()) return 0;
    return text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
  }
  
  function countParagraphs(text) {
    if (!text.trim()) return 0;
    return text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length;
  }
  
  function countUniqueWords(text) {
    if (!text.trim()) return 0;
    
    // Normalize text to lowercase
    const normalizedText = text.toLowerCase();
    
    // Split on whitespace and punctuation, filter out empty strings
    const words = normalizedText.split(/\W+/).filter(word => word.length > 0);
    
    // Use Set to get unique words
    const uniqueWords = new Set(words);
    
    return uniqueWords.size;
  }
  
  function calculateReadingTime(wordCount) {
    // Average reading speed is 200-250 words per minute
    // We'll use 225 as a middle ground
    const wordsPerMinute = 225;
    return Math.ceil(wordCount / wordsPerMinute);
  }
  
  function updateStats() {
    const text = textInput.value;
    
    const words = countWords(text);
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = countSentences(text);
    const paragraphs = countParagraphs(text);
    const uniqueWords = countUniqueWords(text);
    const readingTime = calculateReadingTime(words);
    
    // Update the display with optimized animation
    animateNumber(wordCountEl, words);
    animateNumber(charCountEl, characters);
    animateNumber(charCountNoSpacesEl, charactersNoSpaces);
    animateNumber(sentenceCountEl, sentences);
    animateNumber(paragraphCountEl, paragraphs);
    animateNumber(uniqueWordsEl, uniqueWords);
    animateNumber(readingTimeEl, readingTime);
  }
  
  // Debounced version for very large texts during typing
  let updateTimeout;
  function debouncedUpdateStats() {
    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(updateStats, 100); // 100ms delay for large text
  }
  
  function animateNumber(element, newValue) {
    const currentValue = parseInt(element.textContent.replace(/,/g, '')) || 0;
    const steps = Math.abs(newValue - currentValue);
    
    if (steps === 0) return;
    
    // For large differences (>100), skip animation and update instantly
    // This prevents performance issues with large text input
    if (steps > 100) {
      element.textContent = newValue.toLocaleString();
      return;
    }
    
    // For smaller differences, use smooth animation
    const increment = newValue > currentValue ? 1 : -1;
    const stepDuration = Math.min(300 / steps, 20); // Max 300ms total, min 20ms per step
    
    let current = currentValue;
    const timer = setInterval(() => {
      current += increment;
      element.textContent = current.toLocaleString();
      
      if (current === newValue) {
        clearInterval(timer);
      }
    }, stepDuration);
  }
  
  function clearText() {
    textInput.value = '';
    textInput.focus();
    updateStats();
  }
  
  function copyStatistics() {
    const text = textInput.value;
    const words = countWords(text);
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, '').length;
    const sentences = countSentences(text);
    const paragraphs = countParagraphs(text);
    const uniqueWords = countUniqueWords(text);
    const readingTime = calculateReadingTime(words);
    
    const stats = `Text Statistics:
Words: ${words.toLocaleString()}
Characters: ${characters.toLocaleString()}
Characters (no spaces): ${charactersNoSpaces.toLocaleString()}
Sentences: ${sentences.toLocaleString()}
Paragraphs: ${paragraphs.toLocaleString()}
Unique Words: ${uniqueWords.toLocaleString()}
Reading Time: ${readingTime} minute${readingTime !== 1 ? 's' : ''}`;
    
    navigator.clipboard.writeText(stats).then(() => {
      // Show success feedback
      const originalText = copyStatsBtn.textContent;
      copyStatsBtn.textContent = 'Copied!';
      copyStatsBtn.classList.add('success');
      
      setTimeout(() => {
        copyStatsBtn.textContent = originalText;
        copyStatsBtn.classList.remove('success');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy statistics:', err);
      alert('Failed to copy statistics to clipboard');
    });
  }
  
  // Smart event listeners that adapt to text size
  textInput.addEventListener('input', (e) => {
    const textLength = e.target.value.length;
    // Use debouncing for large texts (>5000 chars) to improve performance
    if (textLength > 5000) {
      debouncedUpdateStats();
    } else {
      updateStats();
    }
  });
  
  textInput.addEventListener('paste', () => {
    // Use setTimeout to ensure paste content is processed
    setTimeout(() => {
      const textLength = textInput.value.length;
      // For large pastes, use immediate update (no animation) for best UX
      if (textLength > 5000) {
        updateStats();
      } else {
        updateStats();
      }
    }, 10);
  });
  
  clearBtn.addEventListener('click', clearText);
  copyStatsBtn.addEventListener('click', copyStatistics);
  
  // Keyboard shortcuts
  textInput.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key.toLowerCase()) {
        case 'a':
          // Allow Ctrl+A (select all)
          break;
        case 'l':
          e.preventDefault();
          clearText();
          break;
      }
    }
  });
  
  // Initialize with any existing content
  updateStats();
  
  // Focus the textarea for immediate use
  textInput.focus();
  
  console.log('Word Counter tool initialized successfully');
}