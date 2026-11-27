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
        <p>Use this free passive voice checker to review English text for common passive-voice patterns. Paste or type your writing, select <strong>Analyze Text</strong>, and review the highlighted sentences, sentence count, passive-pattern count, and prompts for considering active-voice revisions. It is useful for editing essays, reports, articles, emails, and other drafts when you want to check whether the actor or action is clear.</p>
        <p>The detector is a quick first-pass editing aid, not a complete grammar checker. It uses browser-based word and pattern matching, so it can miss passive constructions and flag phrases that are not passive in context. Treat each highlight as a prompt to review the sentence—not an instruction to remove every passive construction.</p>

        <h2>How to Check for Passive Voice</h2>
        <ol>
          <li><strong>Paste your draft:</strong> Add the English text you want to review in the text box.</li>
          <li><strong>Run the check:</strong> Select <strong>Analyze Text</strong> to scan the text for patterns the detector recognizes.</li>
          <li><strong>Review the highlights:</strong> Read each highlighted sentence in context and decide whether it is genuinely passive.</li>
          <li><strong>Consider the suggestion:</strong> Use the proposed active wording as a starting point, then check that it preserves the original meaning.</li>
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
        <p>This approach is fast, but English grammar is more complex than a word-pattern test. The adjective filter favors precision and may miss an ambiguous passive when the actor is omitted; other participles can still function as adjectives, and passive constructions may fall outside the supported patterns. Sentence splitting is punctuation-based, so abbreviations and unusual punctuation can also affect the displayed sentence count. Review results manually, especially for academic, legal, or technical writing.</p>

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
  const totalSentencesEl = document.getElementById('total-sentences');
  const passiveCountEl = document.getElementById('passive-count');
  const passivePercentageEl = document.getElementById('passive-percentage');
  const highlightedTextEl = document.getElementById('highlighted-text');
  const suggestionsContainer = document.getElementById('suggestions-container');
  const suggestionsTitle = suggestionsContainer.querySelector('.suggestions-title');
  const suggestionsList = document.getElementById('suggestions-list');

  let debounceTimer;

  // COMPREHENSIVE PASSIVE VOICE DETECTION SYSTEM
  // Pattern-based heuristic detector; scores are not calibrated accuracy probabilities.
  
  const PASSIVE_VOICE_PATTERNS = {
    // Core verb patterns
    beVerbs: new Set(['is', 'am', 'are', 'was', 'were', 'being', 'been']),
    getVerbs: new Set(['get', 'gets', 'got', 'getting']),
    becomeVerbs: new Set(['become', 'becomes', 'became', 'becoming']),
    modalVerbs: new Set(['will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must']),
    auxiliaryVerbs: new Set(['have', 'has', 'had']),
    
    // Comprehensive past participle dictionary (500+ verbs)
    pastParticiples: new Set([
      // A-C irregular verbs
      'arisen', 'awoken', 'beaten', 'become', 'begun', 'bent', 'bet', 'bitten', 'bled', 'blown', 
      'born', 'bound', 'bought', 'bred', 'brought', 'built', 'burnt', 'burst', 'caught', 'chosen', 'come',
      
      // D-G irregular verbs  
      'dealt', 'dug', 'done', 'drawn', 'dreamt', 'driven', 'drunk', 'eaten', 'fallen', 'fed', 'felt',
      'fled', 'flung', 'flown', 'forbidden', 'forgotten', 'forgiven', 'frozen', 'given', 'gone', 'grown',
      
      // H-L irregular verbs
      'had', 'heard', 'held', 'hidden', 'hit', 'hung', 'kept', 'knelt', 'known', 'laid', 'led', 'left',
      'lent', 'let', 'lied', 'lit', 'lost', 'made', 'meant', 'met', 'mown', 'overcome', 'paid', 'proven',
      
      // R-T irregular verbs
      'read', 'ridden', 'rung', 'risen', 'run', 'said', 'seen', 'sent', 'set', 'sewn', 'shaken', 'shed',
      'shone', 'shot', 'shown', 'shrunk', 'shut', 'slept', 'slid', 'sown', 'spoken', 'spent', 'split',
      'spread', 'sprung', 'stood', 'stolen', 'struck', 'strung', 'stuck', 'stung', 'stunk', 'sung', 'sunk',
      'swept', 'swollen', 'sworn', 'swum', 'swung', 'taken', 'taught', 'thought', 'thrown', 'torn', 'told',
      
      // U-W irregular verbs + Critical test cases
      'understood', 'upset', 'woken', 'worn', 'woven', 'written', 'wound', 'won', 'withdrawn', 'wrung',
      'discovered', 'analyzed', 'examined', 'processed', 'researched', 'investigated', 'evaluated',
      
      // High-frequency regular verbs (-ed forms)
      'accepted', 'accessed', 'achieved', 'acquired', 'acted', 'added', 'addressed', 'adjusted', 'admitted',
      'adopted', 'advanced', 'affected', 'agreed', 'aimed', 'allowed', 'announced', 'answered', 'appeared',
      'applied', 'appointed', 'approached', 'approved', 'argued', 'arranged', 'arrested', 'arrived', 'asked',
      'assigned', 'assisted', 'assumed', 'attached', 'attacked', 'attempted', 'attended', 'attracted', 'avoided',
      
      'backed', 'based', 'behaved', 'believed', 'belonged', 'benefited', 'blocked', 'booked', 'borrowed', 'bothered',
      'bought', 'breathed', 'brought', 'brushed', 'budgeted', 'built', 'burned', 'buried', 'called', 'canceled',
      'cared', 'carried', 'caused', 'celebrated', 'challenged', 'changed', 'charged', 'checked', 'chosen', 'claimed',
      'cleaned', 'cleared', 'clicked', 'climbed', 'closed', 'coached', 'collected', 'combined', 'compared', 'competed',
      'complained', 'completed', 'concerned', 'concluded', 'conducted', 'confirmed', 'connected', 'considered', 'consisted',
      'constructed', 'consulted', 'contained', 'continued', 'contracted', 'contributed', 'controlled', 'converted', 'cooked',
      'copied', 'corrected', 'counted', 'covered', 'created', 'crossed', 'cut', 'damaged', 'danced', 'decided',
      
      'delivered', 'demanded', 'demonstrated', 'denied', 'depended', 'described', 'designed', 'destroyed', 'determined',
      'developed', 'died', 'differed', 'directed', 'disappeared', 'discovered', 'discussed', 'displayed', 'distributed',
      'divided', 'documented', 'downloaded', 'drafted', 'dropped', 'earned', 'edited', 'educated', 'elected', 'eliminated',
      'employed', 'enabled', 'encouraged', 'ended', 'engaged', 'enjoyed', 'entered', 'equipped', 'established', 'estimated',
      'evaluated', 'examined', 'exceeded', 'exchanged', 'excited', 'executed', 'exercised', 'existed', 'expanded', 'expected',
      'experienced', 'explained', 'explored', 'expressed', 'extended', 'faced', 'failed', 'featured', 'filed', 'filled',
      'filtered', 'financed', 'finished', 'fired', 'fixed', 'focused', 'followed', 'forced', 'formed', 'found', 'founded',
      'framed', 'funded', 'gained', 'gathered', 'generated', 'governed', 'grabbed', 'granted', 'greeted', 'grouped',
      
      'handled', 'happened', 'headed', 'helped', 'hired', 'hosted', 'identified', 'ignored', 'illustrated', 'imagined',
      'implemented', 'implied', 'imported', 'improved', 'included', 'increased', 'indicated', 'influenced', 'informed',
      'initiated', 'injured', 'inserted', 'installed', 'instructed', 'intended', 'interested', 'interviewed', 'introduced',
      'invested', 'invited', 'involved', 'issued', 'joined', 'judged', 'jumped', 'justified', 'kept', 'killed', 'knocked',
      'labeled', 'lacked', 'landed', 'lasted', 'launched', 'learned', 'left', 'lifted', 'liked', 'limited', 'linked',
      'listed', 'listened', 'lived', 'loaded', 'located', 'locked', 'logged', 'looked', 'loved', 'lowered', 'maintained',
      'managed', 'manufactured', 'mapped', 'marked', 'marketed', 'matched', 'mattered', 'measured', 'mentioned', 'merged',
      'missed', 'mixed', 'modified', 'monitored', 'moved', 'named', 'needed', 'negotiated', 'noted', 'noticed', 'numbered',
      
      'observed', 'obtained', 'occurred', 'offered', 'opened', 'operated', 'ordered', 'organized', 'oriented', 'originated',
      'owned', 'packed', 'painted', 'participated', 'passed', 'patched', 'paused', 'performed', 'permitted', 'picked',
      'placed', 'planned', 'played', 'pointed', 'positioned', 'posted', 'practiced', 'praised', 'predicted', 'preferred',
      'prepared', 'presented', 'preserved', 'pressed', 'prevented', 'printed', 'prioritized', 'processed', 'produced',
      'programmed', 'projected', 'promised', 'promoted', 'protected', 'proved', 'provided', 'published', 'pulled', 'purchased',
      'pushed', 'qualified', 'questioned', 'quoted', 'raised', 'ranked', 'rated', 'reached', 'read', 'realized', 'received',
      'recognized', 'recommended', 'recorded', 'recovered', 'recruited', 'reduced', 'referred', 'reflected', 'refused',
      'regarded', 'registered', 'regulated', 'rejected', 'related', 'released', 'relied', 'remained', 'remembered', 'removed',
      'repeated', 'replaced', 'replied', 'reported', 'represented', 'requested', 'required', 'researched', 'reserved',
      'resolved', 'responded', 'restored', 'restricted', 'resulted', 'returned', 'revealed', 'reviewed', 'revised', 'risked',
      
      'saved', 'scheduled', 'searched', 'secured', 'selected', 'sent', 'separated', 'served', 'settled', 'shared', 'shifted',
      'shipped', 'shocked', 'showed', 'signed', 'simplified', 'skipped', 'solved', 'sorted', 'specialized', 'specified',
      'sponsored', 'started', 'stated', 'stayed', 'stepped', 'stopped', 'stored', 'stretched', 'studied', 'submitted',
      'succeeded', 'suffered', 'suggested', 'summarized', 'supervised', 'supplied', 'supported', 'surprised', 'surrounded',
      'survived', 'suspended', 'sustained', 'switched', 'targeted', 'taught', 'tested', 'thanked', 'threatened', 'threw',
      'tied', 'timed', 'touched', 'tracked', 'traded', 'trained', 'transferred', 'transformed', 'translated', 'transmitted',
      'transported', 'traveled', 'treated', 'tried', 'triggered', 'trusted', 'turned', 'typed', 'understood', 'updated',
      'upgraded', 'uploaded', 'used', 'utilized', 'validated', 'valued', 'varied', 'verified', 'viewed', 'violated', 'visited',
      'voted', 'waited', 'walked', 'wanted', 'warned', 'washed', 'watched', 'welcomed', 'wished', 'worked', 'worried', 'wrapped'
    ]),
    
    // Context filtering patterns (reduce false positives)
    activeIndicators: new Set(['by myself', 'by accident', 'by heart', 'by hand', 'by chance', 'by choice']),
    passiveIndicators: new Set(['by the', 'by a', 'by an', 'by this', 'by that', 'by these', 'by those']),
    
    // Common false positive patterns to exclude
    stativeVerbs: new Set(['been', 'being']), // "I have been there" (not passive)
    adjectivalUses: new Set(['interested', 'excited', 'tired', 'bored', 'surprised']) // Often adjectives, not passive
  };

  // Enhanced passive voice detection
  function detectPassiveVoice(text) {
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const results = [];
    
    sentences.forEach((sentence, index) => {
      const trimmedSentence = sentence.trim();
      if (trimmedSentence.length === 0) return;
      
      const analysisResult = analyzeForPassiveVoice(trimmedSentence);
      
      results.push({
        sentence: trimmedSentence,
        isPassive: analysisResult.isPassive,
        passiveMatch: analysisResult.passiveMatch,
        passiveType: analysisResult.passiveType,
        confidence: analysisResult.confidence || 0,
        pattern: analysisResult.pattern || null,
        index,
        activeRewrite: analysisResult.isPassive ? generateActiveRewrite(trimmedSentence, analysisResult.passiveMatch) : null,
        suggestion: analysisResult.isPassive ?
          generateActiveSuggestion(trimmedSentence, analysisResult.passiveMatch) : null
      });
    });
    
    return results;
  }
  
  // ENHANCED COMPREHENSIVE PASSIVE VOICE ANALYZER
  // Multi-pattern detection with confidence scoring and context awareness
  function analyzeForPassiveVoice(sentence) {
    const originalSentence = sentence;
    const words = sentence.toLowerCase().replace(/[.,!?;:"']/g, '').split(/\s+/);
    const results = [];
    
    // Analyze multiple passive patterns and combine results
    const bePassiveResult = detectBePassive(words, originalSentence);
    const getPassiveResult = detectGetPassive(words, originalSentence);
    const modalPassiveResult = detectModalPassive(words, originalSentence);
    const perfectPassiveResult = detectPerfectPassive(words, originalSentence);
    
    // Combine all detection results
    const allResults = [bePassiveResult, getPassiveResult, modalPassiveResult, perfectPassiveResult]
      .filter(result => result.isPassive);
    
    if (allResults.length === 0) {
      return { isPassive: false, passiveMatch: null, passiveType: null, confidence: 0 };
    }
    
    // Select highest confidence result
    const bestResult = allResults.reduce((best, current) => 
      current.confidence > best.confidence ? current : best
    );
    
    // Apply context filtering to reduce false positives
    const filteredResult = applyContextFiltering(bestResult, originalSentence);
    
    return filteredResult;
  }
  
  // Pattern 1: BE + Past Participle (was written, is made, are being processed)
  function detectBePassive(words, originalSentence) {
    for (let i = 0; i < words.length - 1; i++) {
      const currentWord = words[i];
      
      if (PASSIVE_VOICE_PATTERNS.beVerbs.has(currentWord)) {
        // Look ahead for past participle (skip adverbs, articles)
        for (let j = i + 1; j < Math.min(i + 5, words.length); j++) {
          const potentialParticiple = words[j];
          
          // Skip common intervening words
          if (['to', 'the', 'a', 'an', 'very', 'quite', 'rather', 'extremely', 'being'].includes(potentialParticiple)) {
            continue;
          }
          
          if (isPastParticiple(potentialParticiple)) {
            const confidence = calculateBePassiveConfidence(currentWord, potentialParticiple, originalSentence);
            return {
              isPassive: true,
              passiveMatch: `${currentWord} ${potentialParticiple}`,
              passiveType: 'be_passive',
              confidence,
              pattern: `${currentWord} + ${potentialParticiple}`
            };
          }
        }
      }
    }
    return { isPassive: false, confidence: 0 };
  }
  
  // Pattern 2: GET + Past Participle (got stolen, gets updated, getting processed)
  function detectGetPassive(words, originalSentence) {
    for (let i = 0; i < words.length - 1; i++) {
      const currentWord = words[i];
      
      if (PASSIVE_VOICE_PATTERNS.getVerbs.has(currentWord)) {
        const nextWord = words[i + 1];
        if (isPastParticiple(nextWord)) {
          const confidence = calculateGetPassiveConfidence(currentWord, nextWord, originalSentence);
          return {
            isPassive: true,
            passiveMatch: `${currentWord} ${nextWord}`,
            passiveType: 'get_passive',
            confidence,
            pattern: `${currentWord} + ${nextWord}`
          };
        }
      }
    }
    return { isPassive: false, confidence: 0 };
  }
  
  // Pattern 3: Modal + BE + Past Participle (should be completed, must be reviewed)
  function detectModalPassive(words, originalSentence) {
    for (let i = 0; i < words.length - 2; i++) {
      const modal = words[i];
      const be = words[i + 1];
      const participle = words[i + 2];
      
      if (PASSIVE_VOICE_PATTERNS.modalVerbs.has(modal) && 
          be === 'be' && 
          isPastParticiple(participle)) {
        const confidence = calculateModalPassiveConfidence(modal, participle, originalSentence);
        return {
          isPassive: true,
          passiveMatch: `${modal} be ${participle}`,
          passiveType: 'modal_passive',
          confidence,
          pattern: `${modal} + be + ${participle}`
        };
      }
    }
    return { isPassive: false, confidence: 0 };
  }
  
  // Pattern 4: HAVE/HAS/HAD + BEEN + Past Participle (has been completed, had been written)
  function detectPerfectPassive(words, originalSentence) {
    for (let i = 0; i < words.length - 2; i++) {
      const auxiliary = words[i];
      const been = words[i + 1];
      const participle = words[i + 2];
      
      if (PASSIVE_VOICE_PATTERNS.auxiliaryVerbs.has(auxiliary) && 
          been === 'been' && 
          isPastParticiple(participle)) {
        const confidence = calculatePerfectPassiveConfidence(auxiliary, participle, originalSentence);
        return {
          isPassive: true,
          passiveMatch: `${auxiliary} been ${participle}`,
          passiveType: 'perfect_passive',
          confidence,
          pattern: `${auxiliary} + been + ${participle}`
        };
      }
    }
    return { isPassive: false, confidence: 0 };
  }
  
  // ENHANCED PAST PARTICIPLE DETECTION WITH COMPREHENSIVE COVERAGE
  function isPastParticiple(word) {
    // Primary check: comprehensive dictionary lookup (500+ verbs)
    if (PASSIVE_VOICE_PATTERNS.pastParticiples.has(word)) {
      return true;
    }
    
    // Secondary check: regular past participle patterns
    if (word.length > 3) {
      // Standard -ed endings
      if (word.endsWith('ed')) {
        // Exclude common false positives
        if (['lived', 'loved', 'moved'].includes(word)) return true;
        if (['red', 'fed', 'led', 'wed', 'shed', 'bed'].includes(word)) return false;
        return true;
      }
      
      // -en endings (beaten, written, chosen)
      if (word.endsWith('en')) {
        return !['when', 'then', 'open', 'often', 'green', 'seven', 'given'].includes(word) || 
               ['given', 'taken', 'chosen', 'spoken', 'written', 'beaten'].includes(word);
      }
    }
    
    // Tertiary check: irregular -n endings
    if (word.length > 2 && word.endsWith('n')) {
      const irregularNEndings = ['own', 'awn', 'ern', 'orn', 'urn', 'orn'];
      return irregularNEndings.some(ending => word.endsWith(ending)) &&
             ['shown', 'known', 'grown', 'thrown', 'drawn', 'flown', 'blown', 'sown'].includes(word);
    }
    
    return false;
  }
  
  // CONFIDENCE SCORING SYSTEM (reduces false positives)
  function calculateBePassiveConfidence(beVerb, participle, sentence) {
    let confidence = 0.7; // Base confidence
    
    // Increase confidence for clear passive indicators
    if (sentence.includes(' by ')) confidence += 0.2;
    if (['was', 'were', 'been'].includes(beVerb)) confidence += 0.1;
    if (PASSIVE_VOICE_PATTERNS.pastParticiples.has(participle)) confidence += 0.1;
    
    // Decrease confidence for potential false positives
    if (PASSIVE_VOICE_PATTERNS.stativeVerbs.has(participle)) confidence -= 0.3;
    if (sentence.includes('very ' + participle)) confidence -= 0.2; // "very tired" (adjective)
    if (PASSIVE_VOICE_PATTERNS.adjectivalUses.has(participle)) confidence -= 0.2;
    
    return Math.max(0, Math.min(1, confidence));
  }
  
  function calculateGetPassiveConfidence(getVerb, participle, sentence) {
    let confidence = 0.6; // Get-passives often informal
    
    if (['got', 'gets'].includes(getVerb)) confidence += 0.1;
    if (sentence.includes(' by ')) confidence += 0.2;
    if (PASSIVE_VOICE_PATTERNS.pastParticiples.has(participle)) confidence += 0.1;
    
    return Math.max(0, Math.min(1, confidence));
  }
  
  function calculateModalPassiveConfidence(modal, participle, sentence) {
    let confidence = 0.8; // Modal passives usually clear
    
    if (['should', 'must', 'will'].includes(modal)) confidence += 0.1;
    if (PASSIVE_VOICE_PATTERNS.pastParticiples.has(participle)) confidence += 0.1;
    
    return Math.max(0, Math.min(1, confidence));
  }
  
  function calculatePerfectPassiveConfidence(auxiliary, participle, sentence) {
    let confidence = 0.8; // Perfect passives usually clear
    
    if (['has', 'have', 'had'].includes(auxiliary)) confidence += 0.1;
    if (PASSIVE_VOICE_PATTERNS.pastParticiples.has(participle)) confidence += 0.1;
    
    return Math.max(0, Math.min(1, confidence));
  }
  
  // These words commonly function as adjectives. Without a likely agent phrase,
  // count them as adjectival states rather than passive constructions.
  const NON_AGENT_BY_OBJECTS = new Set([
    'accident', 'chance', 'choice', 'comparison', 'contrast', 'default', 'definition',
    'design', 'end', 'far', 'hand', 'heart', 'large', 'lot', 'means', 'mistake',
    'myself', 'nature', 'necessity', 'now', 'ourselves', 'then', 'themselves',
    'time', 'way', 'yourself', 'yourselves', 'himself', 'herself', 'itself',
    'prospect', 'idea', 'possibility', 'news', 'fact', 'thought', 'sight', 'sound',
    'smell', 'taste', 'appearance', 'presence', 'absence', 'result', 'weather',
    'circumstances', 'experience', 'situation', 'impression', 'feeling'
  ]);

  const LIKELY_AGENT_HEADWORDS = new Set([
    'performer', 'performers', 'person', 'people', 'team', 'teams', 'staff',
    'employee', 'employees', 'worker', 'workers', 'historian', 'historians',
    'editor', 'editors', 'manager', 'managers', 'magician', 'magicians',
    'referee', 'referees', 'teacher', 'teachers', 'student', 'students',
    'visitor', 'visitors', 'guest', 'guests', 'player', 'players', 'police',
    'committee', 'department', 'researcher', 'researchers', 'scientist', 'scientists',
    'author', 'authors', 'doctor', 'doctors', 'nurse', 'nurses', 'company'
  ]);

  function hasLikelyAgentByPhrase(sentence) {
    for (const match of sentence.toLowerCase().matchAll(/\bby\s+(?:(?:the|a|an|this|that|these|those)\s+)?([\p{L}][\p{L}'’-]*(?:\s+[\p{L}][\p{L}'’-]*)?)/gu)) {
      const phraseWords = match[1].split(/\s+/);
      const object = phraseWords[0];
      if (NON_AGENT_BY_OBJECTS.has(object)) continue;
      if (object.endsWith('ing') && !LIKELY_AGENT_HEADWORDS.has(phraseWords[1])) continue;
      return true;
    }
    return false;
  }

  // Context filtering adjusts heuristic scores; it does not produce calibrated accuracy probabilities.
  function applyContextFiltering(result, sentence) {
    if (!result.isPassive) return result;

    const lowerSentence = sentence.toLowerCase();
    const participle = (result.passiveMatch || '').split(/\s+/).pop();

    // Avoid counting common adjectival lookalikes unless a likely agent is named.
    // This favors precision, but may miss an ambiguous passive with an omitted agent.
    if (PASSIVE_VOICE_PATTERNS.adjectivalUses.has(participle) && !hasLikelyAgentByPhrase(lowerSentence)) {
      return { isPassive: false, passiveMatch: null, passiveType: null, confidence: 0 };
    }

    // Check for active voice indicators that suggest false positives.
    for (const indicator of PASSIVE_VOICE_PATTERNS.activeIndicators) {
      if (lowerSentence.includes(indicator)) {
        result.confidence *= 0.5;
        break;
      }
    }

    // Boost confidence for clear passive indicators.
    for (const indicator of PASSIVE_VOICE_PATTERNS.passiveIndicators) {
      if (lowerSentence.includes(indicator)) {
        result.confidence = Math.min(1, result.confidence * 1.3);
        break;
      }
    }

    if (result.confidence < 0.25) {
      return { isPassive: false, passiveMatch: null, passiveType: null, confidence: 0 };
    }

    return result;
  }

  // Conservative active-voice rewriting: only rewrite a simple, single-clause
  // construction when an explicit by-agent and a supported verb form are present.
  // Ambiguous or compound sentences remain review-only; never invent an actor.
  function generateActiveRewrite(sentence, passiveMatch) {
    if (!passiveMatch || /\b(?:been|being|get|got|getting)\b/i.test(passiveMatch)) return null;
    const passiveTokens = passiveMatch.toLowerCase().split(/\s+/);
    const auxiliary = passiveTokens[0];
    const participle = passiveTokens[passiveTokens.length - 1];
    if (!['was', 'were', 'is', 'are', 'am'].includes(auxiliary)) return null;

    // Avoid applying a sentence-level by-phrase to the wrong verb in compound sentences.
    const passiveAuxiliaries = sentence.match(/\b(?:is|am|are|was|were|been|being)\b/gi) || [];
    if (passiveAuxiliaries.length !== 1) return null;

    const predicatePattern = new RegExp('\\b' + auxiliary + '\\b(?:\\s+\\w+){0,3}\\s+' + participle + '\\b', 'i');
    const predicateMatch = predicatePattern.exec(sentence);
    if (!predicateMatch) return null;
    const byIndex = sentence.toLowerCase().indexOf(' by ', predicateMatch.index + predicateMatch[0].length);
    if (byIndex < 0) return null;

    const object = sentence.slice(0, predicateMatch.index).trim();
    const intervening = sentence.slice(predicateMatch.index + predicateMatch[0].length, byIndex).trim();
    if (intervening && !/^(?:carefully|quickly|slowly|recently|already|finally|successfully|officially|properly|thoroughly|deliberately)$/i.test(intervening)) return null;

    const agent = sentence.slice(byIndex + 4).replace(/[.!?]+$/, '').trim();
    if (!object || !agent || /[,;:]|\b(?:during|after|before|yesterday|today|tomorrow|because|while|since|through|within|without|under|over|around)\b/i.test(agent)) return null;
    const agentObject = agent.toLowerCase().replace(/^(?:the|a|an|this|that|these|those)\s+/, '').split(/\s+/)[0];
    if (/\bby\b/i.test(agent) || NON_AGENT_BY_OBJECTS.has(agentObject)) return null;

    const irregularPast = {
      arisen:'arose', beaten:'beat', begun:'began', bitten:'bit', blown:'blew', born:'bore',
      bought:'bought', brought:'brought', built:'built', caught:'caught', chosen:'chose',
      come:'came', done:'did', drawn:'drew', driven:'drove', drunk:'drank', eaten:'ate',
      fallen:'fell', felt:'felt', flown:'flew', forgotten:'forgot', forgiven:'forgave',
      frozen:'froze', given:'gave', gone:'went', grown:'grew', heard:'heard', held:'held',
      hidden:'hid', known:'knew', laid:'laid', led:'led', left:'left', lost:'lost',
      made:'made', met:'met', paid:'paid', proven:'proved', read:'read', ridden:'rode',
      risen:'rose', run:'ran', said:'said', seen:'saw', sent:'sent', shown:'showed',
      spoken:'spoke', stolen:'stole', taken:'took', taught:'taught', thought:'thought',
      thrown:'threw', told:'told', understood:'understood', worn:'wore', won:'won',
      written:'wrote', uncovered:'uncovered', cataloged:'cataloged', catalogued:'catalogued',
      surprised:'surprised', excited:'excited', tired:'tired', bored:'bored'
    };
    const presentBases = {
      written:'write', made:'make', built:'build', chosen:'choose', given:'give',
      taken:'take', thrown:'throw', stolen:'steal', seen:'see', done:'do',
      sent:'send', told:'tell', known:'know', shown:'show', broken:'break',
      found:'find', kept:'keep', taught:'teach', thought:'think', caught:'catch',
      bought:'buy', brought:'bring', read:'read', understood:'understand',
      led:'lead', lost:'lose', paid:'pay', said:'say', won:'win', eaten:'eat',
      driven:'drive', flown:'fly', grown:'grow', fallen:'fall', spoken:'speak',
      reviewed:'review', created:'create', used:'use', changed:'change',
      delivered:'deliver', discovered:'discover', cataloged:'catalog',
      catalogued:'catalogue', uncovered:'uncover', surprised:'surprise',
      excited:'excite', cleaned:'clean', tested:'test', completed:'complete',
      updated:'update', managed:'manage', prepared:'prepare', designed:'design',
      published:'publish', developed:'develop', processed:'process'
    };
    const isPresent = ['is', 'am', 'are'].includes(auxiliary);
    let activeVerb = isPresent ? presentBases[participle] : irregularPast[participle];
    if (!isPresent && !activeVerb && participle.endsWith('ed')) activeVerb = participle;
    if (!activeVerb) return null;

    if (isPresent) {
      const agentWords = agent.toLowerCase().split(/\s+/);
      const agentHead = agentWords[agentWords.length - 1];
      const pluralAgent = /\band\b/i.test(agent) || /^(?:we|you|they)$/i.test(agent) ||
        (/(?:s|people|men|women|children)$/i.test(agentHead) && !/(?:ss|us|is)$/i.test(agentHead));
      const thirdPersonSingular = !pluralAgent && !/^i$/i.test(agent);
      if (thirdPersonSingular) {
        if (activeVerb.endsWith('y') && !/[aeiou]y$/i.test(activeVerb)) activeVerb = activeVerb.slice(0, -1) + 'ies';
        else if (/(s|sh|ch|x|z|o)$/i.test(activeVerb)) activeVerb += 'es';
        else activeVerb += 's';
      }
    }
    const capitalizedAgent = agent.charAt(0).toUpperCase() + agent.slice(1);
    const activeSentence = capitalizedAgent + ' ' + activeVerb + ' ' + object.charAt(0).toLowerCase() + object.slice(1);
    const punctuation = /[.!?]$/.exec(sentence)?.[0] || '.';
    return activeSentence.replace(/[.!?]+$/, '') + punctuation;
  }

  // Deterministic, context-specific guidance instead of randomly selected generic prompts.
  function generateActiveSuggestion(sentence, passiveMatch) {
    if (generateActiveRewrite(sentence, passiveMatch)) {
      return 'The actor is named and this simple construction can be rewritten. Review the proposed version before applying it.';
    }
    if (/\\bby\\b/i.test(sentence)) {
      return 'A by-phrase appears, but the tool cannot safely connect it to this verb. Confirm the actor and clause before rewriting.';
    }
    return 'The actor is not stated. Identify who performed the action before rewriting; the tool will not invent an actor.';
  }

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
        highlightedHtml += `<span class="passive-sentence ${confidenceClass}" data-index="${index}" data-confidence="${(result.confidence * 100).toFixed(0)}%" title="Possible passive-voice pattern (${(result.confidence * 100).toFixed(0)} heuristic score): ${escapeHtml(result.pattern || result.passiveMatch)}">${escapeHtml(result.sentence)}.</span> `;
      } else {
        highlightedHtml += `<span class="active-sentence">${escapeHtml(result.sentence)}.</span> `;
      }
    });
    
    return highlightedHtml;
  }

  // Generate suggestions HTML
  function generateSuggestionsHtml(results) {
    const passiveResults = results.filter(result => result.isPassive);
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
    if (!original || !rewrite) return;
    const currentText = textInput.value;
    const occurrence = currentText.indexOf(original);
    if (occurrence < 0) return;
    textInput.value = currentText.slice(0, occurrence) + rewrite.replace(/[.!?]$/, '') + currentText.slice(occurrence + original.length);
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