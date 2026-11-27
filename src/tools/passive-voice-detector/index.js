import { analyzePassiveText } from './engine.js';

// Passive Voice Detector - Client-side passive voice detection tool

export function render() {
  return `
    <div class="passive-voice-detector-tool">
      <div class="tool-container">
        <div class="tool-interface">
          <div class="tool-grid">
            <div class="tool-main">
              <div class="form-section">
                <div class="section-title">Text Analysis</div>
                <div class="form-group">
                  <label for="text-input">Enter your text below:</label>
                  <textarea 
                    id="text-input" 
                    class="form-control" 
                    placeholder="Paste or type your text here to detect passive voice..."
                    rows="8"
                  ></textarea>
                </div>
                <div class="form-actions">
                  <button id="analyze-btn" class="btn btn-primary">Analyze Text</button>
                  <button id="clear-btn" class="btn btn-secondary">Clear</button>
                  <button id="undo-rewrite-btn" class="btn btn-secondary undo-rewrite-btn" type="button">Undo rewrite</button>
                </div>
              </div>
            </div>
            
            <div class="tool-results">
            <div class="stats-container">
              <div class="stat-item">
                <span class="stat-label">Total Sentences:</span>
                <span id="total-sentences" class="stat-value">0</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Sentences with passive voice:</span>
                <span id="passive-count" class="stat-value">0</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Passive sentence rate:</span>
                <span id="passive-percentage" class="stat-value">0%</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Detected passive constructions:</span>
                <span id="passive-clause-count" class="stat-value">0</span>
              </div>
              <p class="stats-note">A sentence is counted once if it contains one or more passive constructions. The sentence rate is not a measure of how much of the text is passive.</p>
            </div>
            
            <div class="output-container">
              <h3 class="output-title">Text with detected patterns</h3>
              <div id="highlighted-text" class="highlighted-output"></div>
            </div>
            
            <div id="suggestions-container" class="suggestions-container">
              <h3 class="suggestions-title">Review each detected pattern</h3>
              <div id="suggestions-list" class="suggestions-list"></div>
            </div>
          </div>
        </div>
      
      <div class="seo-content">
        <h2>Free Passive Voice Checker and Detector</h2>
        <p>Use this free passive voice checker to review English text for common passive-voice patterns. Paste or type your writing, select <strong>Analyze Text</strong>, and review highlighted sentences, construction counts, and explanations. For supported simple constructions with a clear actor, preview and apply an active-voice rewrite. Ambiguous cases remain review-only so the tool does not invent an actor or silently change your meaning.</p>
        <p>The summary separates sentences containing passive voice from the passive constructions detected within them. A sentence is counted once if it contains one or more passive constructions, so the sentence rate is not a measure of how much of the text is passive.</p>
        <p>The detector is a quick first-pass editing aid, not a complete grammar checker. It uses browser-based word and pattern matching, so it can miss passive constructions and flag phrases that are not passive in context. Treat each highlight as a prompt to review the sentence—not an instruction to remove every passive construction.</p>

        <h2>How to Check for Passive Voice</h2>
        <ol>
          <li><strong>Paste your draft:</strong> Add the English text you want to review in the text box.</li>
          <li><strong>Run the check:</strong> Select <strong>Analyze Text</strong> to scan the text for patterns the detector recognizes.</li>
          <li><strong>Review the highlights:</strong> Read each highlighted sentence in context and decide whether it is genuinely passive.</li>
          <li><strong>Review a rewrite when available:</strong> Apply the draft active version only when the actor and verb form are clear, then check that it preserves the original meaning.</li>
          <li><strong>Revise selectively:</strong> Keep passive voice when the receiver of the action is the right focus or when the actor is unknown or unimportant.</li>
        </ol>

        <h2>Active Voice vs. Passive Voice: Examples</h2>
        <p>In an active sentence, the grammatical subject performs the action. In a passive sentence, the subject receives the action. Both forms are grammatically valid; the best choice depends on what the reader needs to focus on.</p>
        <ul>
          <li><strong>Active:</strong> “The editor revised the report.” The subject (the editor) performs the action.</li>
          <li><strong>Passive:</strong> “The report was revised by the editor.” The report receives the action; the actor is included.</li>
          <li><strong>Passive with no named actor:</strong> “The report was revised.” The sentence does not say who revised it.</li>
        </ul>
        <p>To revise a passive sentence, identify who or what performed the action, make that actor the subject when it is known and relevant, and adjust the verb. Do not invent an actor when the original sentence intentionally leaves it unknown.</p>

        <h2>How This Passive Voice Detector Works</h2>
        <p>The checker uses JavaScript pattern matching rather than a full syntactic or semantic grammar model. It looks for selected forms of <em>be</em> or <em>get</em> near words in an included past-participle list, plus selected modal and perfect constructions. It filters several common adjective-like words, but context can still be ambiguous.</p>
        <p>This approach is fast, but English grammar is more complex than a word-pattern test. The adjective filter favors precision and may miss an ambiguous passive when the actor is omitted; other participles can still function as adjectives, and passive constructions may fall outside the supported patterns. Sentence segmentation uses the browser's language-aware segmenter when available and a punctuation-based fallback otherwise; uncommon abbreviations and unusual punctuation can still affect the displayed sentence count. Review results manually, especially for academic, legal, or technical writing.</p>

        <h2>When Should You Use Passive Voice?</h2>
        <p>Passive voice is not automatically a writing mistake. It can be useful when the person doing the action is unknown (“The package was delivered”), obvious from context, or less important than the result (“The samples were stored at room temperature”). It is also common in scientific and technical writing when the procedure or object is the focus.</p>
        <p>Choose active voice when naming the actor makes a sentence clearer or more direct. Choose passive voice when the receiver or result deserves emphasis. A useful edit improves clarity and meaning—not simply the percentage of passive sentences.</p>

        <h2>Frequently Asked Questions</h2>
        <h3>What is a passive voice checker?</h3>
        <p>A passive voice checker scans writing for sentence patterns that may use passive voice. This tool highlights patterns it recognizes, counts the matches, and offers suggested active wording for review.</p>
        <h3>Does it treat words like “interested” or “tired” as passive voice?</h3>
        <p>The checker filters several common adjective-like uses when no likely agent is named. Because grammar depends on context, it can still miss some passive sentences or flag other ambiguous phrases. Review every result in context.</p>
        <h3>How accurate is this passive voice detector?</h3>
        <p>It is a heuristic pattern-based checker, not a validated grammar assessment. It can still produce false positives and miss constructions outside its rules. Always judge a highlighted sentence in context.</p>
        <h3>Can I use it to check passive voice in Word or Google Docs?</h3>
        <p>Yes. Copy text from Word or Google Docs into the checker, analyze it, and review the results. The tool does not directly integrate with or modify either application.</p>
        <h3>Can it rewrite passive voice into active voice?</h3>
        <p>For a limited set of simple constructions with an explicit “by” agent, the checker offers a draft active rewrite you can apply. It does not rewrite every passive construction. Compound sentences, ambiguous agents, and unsupported verb forms remain review-only. Always check that a suggested rewrite preserves the original meaning.</p>
        <h3>Should I remove every passive sentence?</h3>
        <p>No. Passive voice is appropriate when the actor is unknown, unimportant, or less relevant than the action or its recipient. Revise only when an active construction makes the sentence clearer.</p>
        <h3>Is my text uploaded for analysis?</h3>
        <p>The detector's analysis runs in the browser in this tool module; it does not send the text to a grammar-analysis API. As with any website, avoid entering highly sensitive information unless you have reviewed the site's privacy policy and are comfortable with its overall operation.</p>
        <h3>Does passive voice directly affect Google rankings?</h3>
        <p>There is no reason to rewrite every passive sentence for SEO. Prioritize useful, accurate, easy-to-understand content. Use active voice when it improves clarity for readers.</p>

        <h2>Related Writing Tools</h2>
        <p>After reviewing sentence structure, you can use the <a href="/tools/word-counter/">Word Counter</a> to check document length or the <a href="/tools/case-converter/">Case Converter</a> to change text capitalization. These tools address different editing tasks and can be used alongside a manual review.</p>
      </div>
          </div>
        </div>
      </div>
  `;
}

export async function init() {
  const textInput = document.getElementById('text-input');
  const analyzeBtn = document.getElementById('analyze-btn');
  const clearBtn = document.getElementById('clear-btn');
  const undoRewriteBtn = document.getElementById('undo-rewrite-btn');
  const totalSentencesEl = document.getElementById('total-sentences');
  const passiveCountEl = document.getElementById('passive-count');
  const passivePercentageEl = document.getElementById('passive-percentage');
  const passiveClauseCountEl = document.getElementById('passive-clause-count');
  const highlightedTextEl = document.getElementById('highlighted-text');
  const suggestionsContainer = document.getElementById('suggestions-container');
  const suggestionsTitle = suggestionsContainer.querySelector('.suggestions-title');
  const suggestionsList = document.getElementById('suggestions-list');

  let debounceTimer;
  let previousTextBeforeRewrite = null;

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>\"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '\"': '&quot;', "'": '&#39;'
    })[character]);
  }

  // Highlight passive sentences in text
  function highlightPassiveText(results) {
    let highlightedHtml = '';
    
    results.forEach((result, index) => {
      if (result.isPassive) {
        const confidenceClass = result.confidence >= 0.7 ? 'high-confidence' : 
                                result.confidence >= 0.5 ? 'medium-confidence' : 'low-confidence';
        highlightedHtml += `<span class="passive-sentence ${confidenceClass}" data-index="${index}" data-confidence="${(result.confidence * 100).toFixed(0)}%" title="Possible passive-voice pattern (${(result.confidence * 100).toFixed(0)} heuristic score): ${escapeHtml(result.pattern || result.passiveMatch)}">${escapeHtml(result.sentence)}${escapeHtml(result.punctuation)}</span> `;
      } else {
        highlightedHtml += `<span class="active-sentence">${escapeHtml(result.sentence)}${escapeHtml(result.punctuation)}</span> `;
      }
    });
    
    return highlightedHtml;
  }

  // Generate suggestions HTML
  function generateSuggestionsHtml(results) {
    const passiveResults = results.filter(result => result.isPassive)
      .flatMap(result => [result, ...(result.additionalPatterns || [])]);
    if (passiveResults.length === 0) {
      return '<p class="no-suggestions" role="status" aria-live="polite">No passive-voice patterns detected in this text. The checker found no matches among the patterns it recognizes.</p>';
    }
    return passiveResults.map(result => {
      const confidenceLabel = result.confidence >= 0.7 ? 'Strong pattern match' :
        result.confidence >= 0.5 ? 'Possible pattern match' : 'Weak pattern match — review carefully';
      const confidenceClass = result.confidence >= 0.7 ? 'high-confidence' :
        result.confidence >= 0.5 ? 'medium-confidence' : 'low-confidence';
      const rewriteHtml = result.activeRewrite ? `
        <div class="rewrite-preview">
          <strong>Suggested active version</strong>
          <p>${escapeHtml(result.activeRewrite)}</p>
          <button type="button" class="btn btn-secondary apply-rewrite-btn"
            data-start="${result.start}"
            data-original="${escapeHtml(result.sentence)}"
            data-rewrite="${escapeHtml(result.activeRewrite)}">Apply rewrite</button>
        </div>
      ` : '';
      return `
        <article class="suggestion-item ${confidenceClass}" data-confidence="${result.confidence}">
          <div class="suggestion-header">
            <span class="confidence-badge">${confidenceLabel}</span>
            <code class="pattern-info">${escapeHtml(result.pattern || result.passiveMatch || 'Possible passive pattern')}</code>
          </div>
          <p class="suggestion-text">${escapeHtml(result.suggestion)}</p>
          ${rewriteHtml}
        </article>
      `;
    }).join('');
  }

  // Analyze text function
  function analyzeText() {
    // Keep the original text intact so sentence offsets remain aligned when
    // applying a rewrite to text with leading/trailing whitespace or newlines.
    const text = textInput.value;

    if (!text.trim()) {
      resetResults();
      return;
    }
    
    try {
      const results = analyzePassiveText(text);
      const passiveCount = results.filter(r => r.isPassive).length;
      const passiveClauseCount = results.reduce((count, result) =>
        count + (result.isPassive ? 1 : 0) + (result.additionalPatterns || []).length, 0);
      const totalSentences = results.length;
      const passivePercentage = totalSentences > 0 ? Math.round((passiveCount / totalSentences) * 100) : 0;
      
      // Update statistics
      totalSentencesEl.textContent = totalSentences;
      passiveCountEl.textContent = passiveCount;
      passivePercentageEl.textContent = `${passivePercentage}%`;
      passiveClauseCountEl.textContent = passiveClauseCount;
      
      // Update highlighted text
      const highlightedHtml = highlightPassiveText(results);
      highlightedTextEl.innerHTML = highlightedHtml;
      
      // Update suggestions
      suggestionsList.innerHTML = generateSuggestionsHtml(results);
      
      // Always show a clear outcome after analysis, including when no patterns match.
      suggestionsTitle.textContent = passiveCount > 0 ? 'Review Suggestions' : 'Result';
      suggestionsContainer.style.display = 'block';
      
      console.log('Analysis completed:', { totalSentences, passiveCount, passivePercentage });
    } catch (error) {
      console.error('Error analyzing text:', error);
      highlightedTextEl.innerHTML = '<p class="error-text">Error analyzing text. Please try again.</p>';
    }
  }

  // Reset results
  function resetResults() {
    totalSentencesEl.textContent = '0';
    passiveCountEl.textContent = '0';
    passivePercentageEl.textContent = '0%';
    passiveClauseCountEl.textContent = '0';
    highlightedTextEl.innerHTML = '<p class="no-text">Enter text above to analyze passive voice patterns.</p>';
    suggestionsList.innerHTML = '<p class="no-suggestions">Analysis suggestions will appear here after you enter text.</p>';
    suggestionsContainer.style.display = 'none';
  }

  // Apply only the exact rewrite shown to the user, then re-run the analysis.
  suggestionsList.addEventListener('click', (event) => {
    const button = event.target.closest('.apply-rewrite-btn');
    if (!button) return;
    const original = button.getAttribute('data-original');
    const rewrite = button.getAttribute('data-rewrite');
    const start = Number(button.getAttribute('data-start'));
    if (!original || !rewrite || !Number.isInteger(start) || start < 0) return;
    const currentText = textInput.value;
    const end = start + original.length;
    if (currentText.slice(start, end) !== original) return;
    previousTextBeforeRewrite = currentText;
    textInput.value = currentText.slice(0, start) + rewrite.replace(/[.!?]$/, '') + currentText.slice(end);
    undoRewriteBtn.style.display = 'inline-flex';
    analyzeText();
    textInput.focus();
  });

  undoRewriteBtn.addEventListener('click', () => {
    if (previousTextBeforeRewrite === null) return;
    textInput.value = previousTextBeforeRewrite;
    previousTextBeforeRewrite = null;
    undoRewriteBtn.style.display = 'none';
    analyzeText();
    textInput.focus();
  });

  // Event listeners
  console.log('Setting up passive voice detector event listeners');
  
  analyzeBtn.addEventListener('click', () => {
    console.log('Analyze button clicked');
    analyzeText();
  });
  
  clearBtn.addEventListener('click', () => {
    console.log('Clear button clicked');
    textInput.value = '';
    previousTextBeforeRewrite = null;
    undoRewriteBtn.style.display = 'none';
    resetResults();
    textInput.focus();
  });

  // Smart debouncing for large inputs
  textInput.addEventListener('input', (e) => {
    previousTextBeforeRewrite = null;
    undoRewriteBtn.style.display = 'none';
    clearTimeout(debounceTimer);
    
    const textLength = e.target.value.length;
    const debounceDelay = textLength > 1000 ? 500 : 250;
    
    debounceTimer = setTimeout(() => {
      console.log('Input changed, analyzing text:', textLength, 'characters');
      if (textLength > 0) {
        analyzeText();
      } else {
        resetResults();
      }
    }, debounceDelay);
  });

  // Initialize with empty state
  console.log('Initializing passive voice detector');
  resetResults();
}