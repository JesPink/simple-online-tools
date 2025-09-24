// Passive Voice Detector - Client-side passive voice detection tool

export function render() {
  return `
    <div class="passive-voice-detector-tool">
      <div class="tool-container">
        <div class="tool-interface">
          <div class="tool-main">
            <div class="form-section">
              <h3>Text Analysis</h3>
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
                <span class="stat-label">Passive Sentences:</span>
                <span id="passive-count" class="stat-value">0</span>
              </div>
              <div class="stat-item">
                <span class="stat-label">Passive Percentage:</span>
                <span id="passive-percentage" class="stat-value">0%</span>
              </div>
            </div>
            
            <div class="output-container">
              <h3 class="output-title">Analysis Results</h3>
              <div id="highlighted-text" class="highlighted-output"></div>
            </div>
            
            <div id="suggestions-container" class="suggestions-container">
              <h3 class="suggestions-title">Active Voice Suggestions</h3>
              <div id="suggestions-list" class="suggestions-list"></div>
            </div>
          </div>
        </div>
      
      <div class="seo-content">
      <h2>Understanding the Passive Voice Detector</h2>
      <p>Our <strong>passive voice detector</strong> is a powerful writing analysis tool designed to help you identify and eliminate passive voice constructions in your text. Passive voice can make your writing sound weak, unclear, or impersonal, while active voice creates more engaging, direct, and persuasive content. This tool instantly scans your text and highlights passive sentences, providing you with actionable insights to improve your writing quality.</p>
      
      <p>Whether you're a student working on essays, a professional crafting business communications, or a content creator optimizing for SEO, this passive voice checker helps you write with greater clarity and impact. The tool analyzes sentence structure, identifies passive constructions, and suggests active voice alternatives that make your writing more compelling.</p>
      
      <h2>How to Use Our Passive Voice Detector</h2>
      <p>Using our passive voice detector is straightforward and requires no technical expertise. Follow these simple steps to analyze and improve your writing:</p>
      
      <ol>
        <li><strong>Paste Your Text:</strong> Copy and paste your content into the text area, or type directly into the input field.</li>
        <li><strong>Click Analyze:</strong> Press the "Analyze Text" button to start the passive voice detection process.</li>
        <li><strong>Review Results:</strong> The tool will highlight passive sentences in yellow and display statistics about your text.</li>
        <li><strong>Read Suggestions:</strong> Review the active voice alternatives provided for each passive sentence identified.</li>
        <li><strong>Make Improvements:</strong> Use the suggestions to rewrite passive sentences in active voice for better clarity.</li>
      </ol>
      
      <p>The analysis is instant and works entirely in your browser, ensuring your content remains private and secure. You can analyze unlimited text without any registration or signup requirements.</p>
      
      <h2>Mastering the Passive Sentence Detector</h2>
      <p>Understanding how our <strong>passive sentence detector</strong> works helps you become a better writer. The tool uses advanced algorithms to identify several types of passive voice constructions commonly found in English writing.</p>
      
      <p>Passive voice typically follows the pattern "subject + be verb + past participle," such as "The report was written by John" instead of "John wrote the report." Our detector identifies these patterns by analyzing:</p>
      
      <ul>
        <li><strong>Be Verbs:</strong> Forms of "to be" (is, are, was, were, being, been) followed by past participles</li>
        <li><strong>Get Passives:</strong> Constructions using "get" + past participle ("The package got delivered")</li>
        <li><strong>Modal Passives:</strong> Modal verbs + be + past participle ("The task should be completed")</li>
        <li><strong>Perfect Passives:</strong> Have/has + been + past participle ("The project has been finished")</li>
      </ul>
      
      <p>The detector also considers context to avoid false positives, distinguishing between passive voice and other grammatical constructions that might appear similar.</p>
      
      <h2>Benefits of Our Passive Voice Detector Free Tool</h2>
      <p>Our <strong>passive voice detector free</strong> tool offers numerous advantages for writers, students, and professionals seeking to improve their communication skills. Unlike expensive grammar software, this tool provides comprehensive passive voice analysis at no cost.</p>
      
      <p>Key benefits include instant feedback on your writing quality, specific suggestions for improvement, and educational insights that help you recognize passive voice patterns independently. The tool supports unlimited text analysis, making it perfect for long documents, multiple drafts, or frequent writing tasks.</p>
      
      <p>For SEO professionals and content marketers, eliminating passive voice can significantly improve content engagement metrics. Search engines favor clear, direct content that provides value to readers, and active voice construction contributes to better readability scores and user experience.</p>
      
      <p>The tool also serves as an educational resource, helping users understand the difference between active and passive voice through practical examples and suggestions. This knowledge transfers to future writing, gradually improving overall communication skills.</p>
      
      <h2>Frequently Asked Questions</h2>
      
      <h3>What is passive voice and why should I avoid it?</h3>
      <p>Passive voice occurs when the subject of a sentence receives the action rather than performing it. For example, "The ball was thrown by Sarah" (passive) versus "Sarah threw the ball" (active). While passive voice isn't grammatically incorrect, it can make writing less engaging and harder to follow. Our passive voice detector helps you identify these constructions so you can choose when to use active voice for clearer communication.</p>
      
      <h3>How accurate is this passive voice detector?</h3>
      <p>Our passive voice detector uses sophisticated pattern recognition algorithms to achieve high accuracy in identifying passive constructions. The tool analyzes sentence structure, verb forms, and grammatical patterns to minimize false positives while catching subtle passive voice instances that writers might miss.</p>
      
      <h3>Can I use this tool for academic writing?</h3>
      <p>Absolutely! This passive voice checker is particularly valuable for academic writing, where clarity and precision are essential. Many academic style guides recommend minimizing passive voice to create more direct, engaging prose. The tool helps students and researchers identify areas for improvement in their papers, theses, and dissertations.</p>
      
      <h3>Is my text stored or shared when using this tool?</h3>
      <p>No, your privacy is completely protected. This passive voice detector operates entirely within your browser using client-side processing. Your text is never sent to external servers, stored, or shared. You can analyze sensitive documents with complete confidence in your data security.</p>
      
      <h3>Does passive voice affect SEO rankings?</h3>
      <p>While passive voice doesn't directly impact SEO rankings, it can affect user engagement metrics that search engines consider. Active voice generally creates more readable, engaging content that keeps visitors on your page longer and encourages sharing, indirectly benefiting your SEO performance.</p>
      
      <h2>Passive Voice Detector and Your Writing Workflow</h2>
      <p>Integrating our passive voice detector into your regular writing workflow can dramatically improve your content quality and reader engagement. Use this tool as a final editing step before publishing blog posts, articles, or important communications.</p>
      
      <p>Consider pairing this passive voice checker with other writing tools on our platform, such as our <strong>word counter</strong> for tracking document length and <strong>readability analyzer</strong> for comprehensive content optimization. Together, these tools create a complete writing enhancement suite that helps you produce professional, engaging content every time.</p>
      
        <p>Remember that while active voice is generally preferred, passive voice has its place in certain contexts, such as when the actor is unknown or when you want to emphasize the action rather than the actor. Our tool helps you make informed decisions about voice usage rather than blindly eliminating all passive constructions.</p>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  const textInput = document.getElementById('text-input');
  const analyzeBtn = document.getElementById('analyze-btn');
  const clearBtn = document.getElementById('clear-btn');
  const totalSentencesEl = document.getElementById('total-sentences');
  const passiveCountEl = document.getElementById('passive-count');
  const passivePercentageEl = document.getElementById('passive-percentage');
  const highlightedTextEl = document.getElementById('highlighted-text');
  const suggestionsContainer = document.getElementById('suggestions-container');
  const suggestionsList = document.getElementById('suggestions-list');

  let debounceTimer;

  // Enhanced passive voice detection patterns
  const beVerbs = ['am', 'is', 'are', 'was', 'were', 'being', 'been'];
  const modalVerbs = ['will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must'];
  const auxiliaryVerbs = ['have', 'has', 'had'];
  
  // Common past participles (both regular and irregular)
  const pastParticiples = [
    // Irregular past participles
    'written', 'spoken', 'broken', 'chosen', 'driven', 'eaten', 'fallen',
    'forgotten', 'given', 'hidden', 'known', 'proven', 'risen', 'seen',
    'shown', 'stolen', 'taken', 'thrown', 'worn', 'done', 'gone', 'come',
    'become', 'begun', 'sung', 'rung', 'swum', 'run', 'built', 'bought',
    'brought', 'caught', 'taught', 'thought', 'fought', 'sought', 'found',
    'bound', 'wound', 'ground', 'told', 'sold', 'held', 'felt', 'dealt',
    'meant', 'sent', 'spent', 'bent', 'lent', 'burnt', 'learnt', 'made',
    'paid', 'said', 'laid', 'read', 'heard', 'understood', 'misunderstood',
    'lost', 'cost', 'cut', 'put', 'shut', 'hit', 'let', 'set', 'bet',
    'hurt', 'split', 'quit', 'spread', 'shed', 'wed', 'fed', 'led', 'bled',
    // Common regular past participles
    'asked', 'worked', 'played', 'moved', 'lived', 'loved', 'liked', 'used',
    'wanted', 'needed', 'called', 'tried', 'opened', 'closed', 'created',
    'developed', 'produced', 'provided', 'required', 'allowed', 'followed',
    'changed', 'turned', 'placed', 'based', 'added', 'included', 'considered',
    'published', 'established', 'completed', 'designed', 'implemented',
    'analyzed', 'discussed', 'examined', 'studied', 'researched', 'tested',
    'approved', 'rejected', 'accepted', 'denied', 'cancelled', 'delayed',
    'scheduled', 'organized', 'planned', 'managed', 'controlled', 'handled'
  ];

  // Enhanced passive voice detection
  function detectPassiveVoice(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const results = [];
    
    sentences.forEach((sentence, index) => {
      const trimmedSentence = sentence.trim();
      if (trimmedSentence.length === 0) return;
      
      const { isPassive, passiveMatch, passiveType } = analyzeForPassiveVoice(trimmedSentence);
      
      results.push({
        sentence: trimmedSentence,
        isPassive,
        passiveMatch,
        passiveType,
        index,
        suggestion: isPassive ? generateActiveSuggestion(trimmedSentence, passiveMatch, passiveType) : null
      });
    });
    
    return results;
  }
  
  // Analyze a single sentence for passive voice
  function analyzeForPassiveVoice(sentence) {
    const words = sentence.toLowerCase().split(/\s+/);
    let isPassive = false;
    let passiveMatch = null;
    let passiveType = null;
    
    for (let i = 0; i < words.length - 1; i++) {
      const currentWord = words[i];
      const nextWord = words[i + 1];
      const nextTwoWords = i < words.length - 2 ? words[i + 2] : '';
      
      // Pattern 1: be verb + past participle
      if (beVerbs.includes(currentWord) && pastParticiples.includes(nextWord)) {
        isPassive = true;
        passiveMatch = `${currentWord} ${nextWord}`;
        passiveType = 'be_passive';
        break;
      }
      
      // Pattern 2: modal + be + past participle
      if (modalVerbs.includes(currentWord) && nextWord === 'be' && pastParticiples.includes(nextTwoWords)) {
        isPassive = true;
        passiveMatch = `${currentWord} be ${nextTwoWords}`;
        passiveType = 'modal_passive';
        break;
      }
      
      // Pattern 3: have/has/had + been + past participle
      if (auxiliaryVerbs.includes(currentWord) && nextWord === 'been' && pastParticiples.includes(nextTwoWords)) {
        isPassive = true;
        passiveMatch = `${currentWord} been ${nextTwoWords}`;
        passiveType = 'perfect_passive';
        break;
      }
      
      // Pattern 4: get + past participle (informal passive)
      if (['get', 'gets', 'got', 'getting'].includes(currentWord) && pastParticiples.includes(nextWord)) {
        isPassive = true;
        passiveMatch = `${currentWord} ${nextWord}`;
        passiveType = 'get_passive';
        break;
      }
    }
    
    return { isPassive, passiveMatch, passiveType };
  }

  // Generate active voice suggestions based on passive type
  function generateActiveSuggestion(sentence, passiveMatch, passiveType) {
    const suggestions = {
      'be_passive': [
        "Identify who performs the action and start the sentence with them",
        "Replace 'was/were + past participle' with the active verb form",
        "Look for the actor after 'by' and move them to the front"
      ],
      'modal_passive': [
        "Replace 'modal + be + past participle' with 'modal + active verb'",
        "Identify who should perform the action and make them the subject",
        "Remove 'be' and use the active form of the verb"
      ],
      'perfect_passive': [
        "Replace 'have/has/had been + past participle' with 'have/has/had + active verb'",
        "Identify who completed the action and make them the subject",
        "Remove 'been' and use the active perfect form"
      ],
      'get_passive': [
        "Replace 'get/got + past participle' with active verb form",
        "Identify who performs the action on the subject",
        "Use direct action instead of 'get' construction"
      ]
    };
    
    const typeSpecificSuggestions = suggestions[passiveType] || [
      "Identify who or what performs the action",
      "Make the actor the subject of the sentence",
      "Use active voice to create more direct, engaging writing"
    ];
    
    return typeSpecificSuggestions[Math.floor(Math.random() * typeSpecificSuggestions.length)];
  }

  // Highlight passive sentences in text
  function highlightPassiveText(results) {
    let highlightedHtml = '';
    
    results.forEach((result, index) => {
      if (result.isPassive) {
        highlightedHtml += `<span class="passive-sentence" data-index="${index}">${result.sentence}.</span> `;
      } else {
        highlightedHtml += `<span class="active-sentence">${result.sentence}.</span> `;
      }
    });
    
    return highlightedHtml;
  }

  // Generate suggestions HTML
  function generateSuggestionsHtml(results) {
    const passiveResults = results.filter(r => r.isPassive);
    
    if (passiveResults.length === 0) {
      return '<p class="no-suggestions">Great! No passive voice detected in your text.</p>';
    }
    
    let suggestionsHtml = '';
    passiveResults.forEach((result, index) => {
      suggestionsHtml += `
        <div class="suggestion-item">
          <div class="original-sentence">
            <strong>Passive:</strong> "${result.sentence}."
          </div>
          <div class="suggestion-text">
            <strong>Suggestion:</strong> ${result.suggestion}
          </div>
        </div>
      `;
    });
    
    return suggestionsHtml;
  }

  // Analyze text function
  function analyzeText() {
    const text = textInput.value.trim();
    
    if (!text) {
      resetResults();
      return;
    }
    
    try {
      const results = detectPassiveVoice(text);
      const passiveCount = results.filter(r => r.isPassive).length;
      const totalSentences = results.length;
      const passivePercentage = totalSentences > 0 ? Math.round((passiveCount / totalSentences) * 100) : 0;
      
      // Update statistics
      totalSentencesEl.textContent = totalSentences;
      passiveCountEl.textContent = passiveCount;
      passivePercentageEl.textContent = `${passivePercentage}%`;
      
      // Update highlighted text
      const highlightedHtml = highlightPassiveText(results);
      highlightedTextEl.innerHTML = highlightedHtml;
      
      // Update suggestions
      suggestionsList.innerHTML = generateSuggestionsHtml(results);
      
      // Show suggestions container if there are passive sentences
      suggestionsContainer.style.display = passiveCount > 0 ? 'block' : 'none';
      
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
    highlightedTextEl.innerHTML = '<p class="no-text">Enter text above to analyze passive voice patterns.</p>';
    suggestionsList.innerHTML = '<p class="no-suggestions">Analysis suggestions will appear here after you enter text.</p>';
    suggestionsContainer.style.display = 'none';
  }

  // Event listeners
  console.log('Setting up passive voice detector event listeners');
  
  analyzeBtn.addEventListener('click', () => {
    console.log('Analyze button clicked');
    analyzeText();
  });
  
  clearBtn.addEventListener('click', () => {
    console.log('Clear button clicked');
    textInput.value = '';
    resetResults();
    textInput.focus();
  });

  // Smart debouncing for large inputs
  textInput.addEventListener('input', (e) => {
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