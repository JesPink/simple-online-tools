// Pure, browser-local passive voice analysis engine.
// Pattern-based detection is intentionally conservative and is not a full parser.

// COMPREHENSIVE PASSIVE VOICE DETECTION SYSTEM
// Pattern-based heuristic detector; scores are not calibrated accuracy probabilities.

const PASSIVE_VOICE_PATTERNS = {
  // Core verb patterns
  beVerbs: new Set(['be', 'is', 'am', 'are', 'was', 'were', 'being', 'been', 'isnt', 'arent', 'wasnt', 'werent']),
  getVerbs: new Set(['get', 'gets', 'got', 'getting']),
  becomeVerbs: new Set(['become', 'becomes', 'became', 'becoming']),
  modalVerbs: new Set(['will', 'would', 'shall', 'should', 'can', 'could', 'may', 'might', 'must', 'wont', 'wouldnt', 'shant', 'shouldnt', 'cant', 'couldnt', 'mightnt', 'mustnt']),
  auxiliaryVerbs: new Set(['have', 'has', 'had', 'havent', 'hasnt', 'hadnt']),
  
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
export function analyzePassiveText(text) {
  const sentenceMatches = getSentenceMatches(text);
  const results = [];

  sentenceMatches.forEach((match, index) => {
    const rawSentence = match[0];
    const trimmedWithPunctuation = rawSentence.trim();
    const leadingWhitespace = rawSentence.length - rawSentence.trimStart().length;
    const punctuation = /[.!?]+$/.exec(trimmedWithPunctuation)?.[0] || '';
    const trimmedSentence = trimmedWithPunctuation.slice(0, trimmedWithPunctuation.length - punctuation.length).trimEnd();
    if (!trimmedSentence) return;

    const sentenceStart = match.index + leadingWhitespace;
    const sentenceEnd = sentenceStart + trimmedSentence.length;
    const sentenceForRewrite = trimmedSentence + punctuation;
    const analysisResult = analyzeForPassiveVoice(trimmedSentence);
    const coordinatedPatterns = detectCoordinatedPerfectPassive(trimmedSentence, sentenceStart);
    const additionalPatterns = [
      ...coordinatedPatterns,
      ...detectAdditionalPassiveClauses(trimmedSentence, sentenceStart, coordinatedPatterns, analysisResult.passiveMatch),
      ...detectSharedSubjectPassivePredicates(trimmedSentence, sentenceStart)
    ];

    results.push({
      sentence: trimmedSentence,
      punctuation,
      isPassive: analysisResult.isPassive,
      passiveMatch: analysisResult.passiveMatch,
      passiveType: analysisResult.passiveType,
      confidence: analysisResult.confidence || 0,
      pattern: analysisResult.pattern || null,
      index,
      start: sentenceStart,
      end: sentenceEnd,
      activeRewrite: analysisResult.isPassive ? generateActiveRewrite(sentenceForRewrite, analysisResult.passiveMatch) : null,
      suggestion: analysisResult.isPassive ?
        (additionalPatterns.length
          ? 'No actor is stated for this first passive clause. The actor in the later clause applies only to that later action.'
          : generateActiveSuggestion(sentenceForRewrite, analysisResult.passiveMatch)) : null,
      additionalPatterns
    });
  });

  return results;
}

// Sentence segmentation that preserves offsets and protects common titles
// when Intl.Segmenter treats an abbreviation such as "Dr." as a boundary.
function getSentenceMatches(text) {
  const titleAbbreviationAtEnd = /\b(?:Mr|Mrs|Ms|Dr|Prof|Rev|Sr|Jr|St|Capt|Gen|Hon)\.\s*$/i;
  if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
    const segments = Array.from(new Intl.Segmenter('en', { granularity: 'sentence' }).segment(text));
    const matches = [];
    for (let i = 0; i < segments.length; i++) {
      const current = segments[i];
      if (titleAbbreviationAtEnd.test(current.segment) && segments[i + 1]) {
        matches.push({ 0: current.segment + segments[i + 1].segment, index: current.index });
        i++;
      } else {
        matches.push({ 0: current.segment, index: current.index });
      }
    }
    return matches;
  }
  const protectedText = text.replace(/\b(Mr|Mrs|Ms|Dr|Prof|Rev|Sr|Jr|St|Capt|Gen|Hon)\./gi, '$1\uE000');
  return Array.from(protectedText.matchAll(/[^.!?]+(?:[.!?]+|$)/g),
    match => ({ 0: match[0].replaceAll('\uE000', '.'), index: match.index }));
}

// Detect a narrow, safely rewritable coordinated perfect-passive clause
// that shares the subject of an earlier clause (e.g. "... were found and
// have since been carefully cataloged by historians"). Keep the first
// clause intact and rewrite only the coordinated tail.
function detectCoordinatedPerfectPassive(sentence, sentenceStart) {
  const adverbPattern = '(?:since|already|recently|carefully|quickly|slowly|thoroughly|successfully|officially|properly|deliberately|widely|regularly|usually|often|frequently|quietly|publicly|privately|directly|independently|closely)';
  const match = new RegExp('\\band\\s+(have|has|had)\\s+((?:' + adverbPattern + '\\s+)*)been\\s+((?:' + adverbPattern + '\\s+)*)([a-z]+ed)\\s+by\\s+(.+)$', 'i').exec(sentence);
  if (!match) return [];
  const participle = match[4].toLowerCase();
  const baseVerbs = { cataloged: 'catalog', catalogued: 'catalogue', reviewed: 'review', recorded: 'record', examined: 'examine', documented: 'document', processed: 'process', discovered: 'discover', uncovered: 'uncover', completed: 'complete', published: 'publish', prepared: 'prepare', created: 'create', updated: 'update', delivered: 'deliver', managed: 'manage', designed: 'design', tested: 'test', cleaned: 'clean' };
  const base = baseVerbs[participle];
  if (!base) return [];
  const actor = match[5].trim().replace(/[.!?]+$/, '');
  if (!actor || /[,;:]|\b(?:during|after|before|because|while|through|within|without|under|over|around)\b/i.test(actor)) return [];
  const actorObject = actor.toLowerCase().replace(/^(?:the|a|an|this|that|these|those)\s+/, '').split(/\s+/)[0];
  if (NON_AGENT_BY_OBJECTS.has(actorObject) || /\bby\b/i.test(actor)) return [];
  const firstClause = sentence.slice(0, match.index);
  const subjectMatch = /^(.*?)\b(?:is|am|are|was|were)\b/i.exec(firstClause);
  if (!subjectMatch) return [];
  const subject = subjectMatch[1].trim();
  const lastWord = subject.toLowerCase().match(/[\p{L}]+$/u)?.[0] || '';
  const objectPronoun = /(?:s|people|men|women|children)$/i.test(lastWord) ? 'them' : 'it';
  const auxiliary = match[1].toLowerCase();
  const actorWords = actor.toLowerCase().split(/\s+/);
  const actorHead = actorWords[actorWords.length - 1];
  const pluralActor = /\band\b/i.test(actor) || /(?:s|people|men|women|children)$/i.test(actorHead);
  const activeAuxiliary = auxiliary === 'had' ? 'had' : (pluralActor ? 'have' : 'has');
  const adverbs = [match[2].trim(), match[3].trim()].filter(Boolean).join(' ');
  const activeVerb = participle;
  const lowerActor = actor.charAt(0).toLowerCase() + actor.slice(1);
  const clauseStart = match.index;
  const originalClause = sentence.slice(clauseStart);
  const rewriteClause = 'and ' + lowerActor + ' ' + activeAuxiliary + (adverbs ? ' ' + adverbs : '') + ' ' + activeVerb + ' ' + objectPronoun;
  return [{
    sentence: originalClause,
    start: sentenceStart + clauseStart,
    activeRewrite: rewriteClause,
    suggestion: 'The actor is named in this clause. Review the proposed active version before applying it.',
    pattern: `${auxiliary} been ${participle} (coordinated clause)`,
    confidence: 0.95
  }];
}

// Find further finite passive clauses joined to the first clause.
// This deliberately handles explicit coordinated subjects; fragments and
// subjectless auxiliary continuations are left to the dedicated shared-subject
// handler above rather than guessed.
function detectAdditionalPassiveClauses(sentence, sentenceStart, existingPatterns = [], primaryMatch = null) {
  const found = [];
  let primaryMatchAccountedFor = false;
  const separators = Array.from(sentence.matchAll(/\b(?:and|but|or|if|when|whenever|because|although|though|while|unless|until|once|after|before|since|whereas|where)\s+/gi));
  const ranges = [];
  let rangeStart = 0;

  // Include the leading clause as well: the highest-confidence sentence-level
  // match may be in a later subordinate clause, not in the opening clause.
  for (const separator of separators) {
    ranges.push({ start: rangeStart, end: separator.index });
    rangeStart = separator.index + separator[0].length;
  }
  ranges.push({ start: rangeStart, end: sentence.length });

  for (const range of ranges) {
    const rawClause = sentence.slice(range.start, range.end);
    const clauseText = rawClause.trim();
    if (!clauseText) continue;
    const leadingSpace = rawClause.length - rawClause.trimStart().length;
    const normalizedStart = range.start + leadingSpace;
    if (existingPatterns.some(pattern => pattern.start === sentenceStart + normalizedStart)) continue;

    // Subjectless auxiliary continuations share the earlier subject and are
    // handled by the dedicated coordinated-passive detector.
    if (/^(?:have|has|had|is|am|are|was|were|being|been)\b/i.test(clauseText)) continue;

    const punctuation = /[.!?]+$/.exec(clauseText)?.[0] || '';
    const clauseForAnalysis = clauseText.slice(0, clauseText.length - punctuation.length).trim();
    if (!clauseForAnalysis) continue;
    const analysis = analyzeForPassiveVoice(clauseForAnalysis);
    if (!analysis.isPassive) continue;

    // Skip the first clause whose detected pattern matches the sentence-level
    // primary result. Segments are processed in text order, so this also handles
    // identical passive forms in separate clauses without double-counting.
    if (!primaryMatchAccountedFor && primaryMatch && analysis.passiveMatch === primaryMatch) {
      primaryMatchAccountedFor = true;
      continue;
    }

    const absoluteStart = sentenceStart + normalizedStart;
    if (found.some(item => item.start === absoluteStart)) continue;
    const rewriteInput = clauseForAnalysis + punctuation;
    found.push({
      sentence: rewriteInput,
      start: absoluteStart,
      activeRewrite: generateActiveRewrite(rewriteInput, analysis.passiveMatch),
      suggestion: generateActiveSuggestion(rewriteInput, analysis.passiveMatch),
      pattern: analysis.pattern || analysis.passiveMatch,
      confidence: analysis.confidence || 0
    });
  }
  return found;
}

// Detect a second participle that shares the first clause's subject and
// passive auxiliary (e.g. "was written and published by Maya"). It is counted
// separately, but neither fragment is offered as a standalone rewrite.
function detectSharedSubjectPassivePredicates(sentence, sentenceStart) {
  const found = [];
  const pattern = /\b(?:and|but|or)\s+((?:(?:carefully|quickly|slowly|recently|already|successfully|officially|properly|thoroughly|deliberately|widely|regularly|usually|often|frequently|quietly|publicly|privately|directly|independently|closely)\s+)*)([\p{L}]+)\s+by\s+(.+?)(?=\s+(?:and|but|or)\s+|$)/giu;
  for (const match of sentence.matchAll(pattern)) {
    const participle = match[2].toLowerCase();
    const actorPhrase = 'by ' + match[3].trim();
    if (!isPastParticiple(participle) || !hasLikelyAgentByPhrase(actorPhrase)) continue;
    const participleOffset = match.index + match[0].indexOf(match[2]);
    const punctuation = /[.!?]+$/.exec(match[3])?.[0] || '';
    found.push({
      sentence: match[2] + ' by ' + match[3].trim(),
      start: sentenceStart + participleOffset,
      activeRewrite: null,
      suggestion: 'This passive verb shares the subject and auxiliary from the preceding clause. It is counted separately, but the tool will not rewrite this fragment on its own.',
      pattern: `${participle} (shared-subject passive predicate)`,
      confidence: 0.85
    });
  }
  return found;
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
  const modifiers = new Set([
    'not', 'never', 'already', 'still', 'recently', 'easily', 'quickly',
    'slowly', 'carefully', 'accidentally', 'regularly', 'usually', 'often',
    'frequently', 'completely', 'successfully', 'unexpectedly'
  ]);
  for (let i = 0; i < words.length - 1; i++) {
    const currentWord = words[i];
    if (!PASSIVE_VOICE_PATTERNS.getVerbs.has(currentWord)) continue;

    let participleIndex = i + 1;
    while (participleIndex < words.length && participleIndex <= i + 3 && modifiers.has(words[participleIndex])) {
      participleIndex++;
    }
    const participle = words[participleIndex];
    if (!isPastParticiple(participle)) continue;

    const confidence = calculateGetPassiveConfidence(currentWord, participle, originalSentence);
    return {
      isPassive: true,
      passiveMatch: `${currentWord} ${participle}`,
      passiveType: 'get_passive',
      confidence,
      pattern: `${currentWord} + ${participle}`
    };
  }
  return { isPassive: false, confidence: 0 };
}

// Pattern 3: Modal + BE + Past Participle (should be completed, must be reviewed)
function detectModalPassive(words, originalSentence) {
  const modifiers = new Set([
    'not', 'never', 'also', 'still', 'already', 'always', 'usually', 'often',
    'easily', 'quickly', 'slowly', 'carefully', 'recently', 'successfully',
    'officially', 'properly', 'thoroughly', 'deliberately', 'widely',
    'regularly', 'frequently', 'quietly', 'publicly', 'privately',
    'directly', 'independently', 'closely'
  ]);
  for (let i = 0; i < words.length - 2; i++) {
    const modal = words[i];
    if (!PASSIVE_VOICE_PATTERNS.modalVerbs.has(modal)) continue;
    let beIndex = i + 1;
    while (beIndex < words.length && beIndex <= i + 4 && modifiers.has(words[beIndex])) beIndex++;
    if (words[beIndex] !== 'be') continue;
    let participleIndex = beIndex + 1;
    while (participleIndex < words.length && participleIndex <= beIndex + 3 && modifiers.has(words[participleIndex])) participleIndex++;
    const participle = words[participleIndex];
    if (!isPastParticiple(participle)) continue;
    const confidence = calculateModalPassiveConfidence(modal, participle, originalSentence);
    const matchedWords = words.slice(i, participleIndex + 1);
    return {
      isPassive: true,
      passiveMatch: matchedWords.join(' '),
      passiveType: 'modal_passive',
      confidence,
      pattern: matchedWords.join(' + ')
    };
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
  if (!passiveMatch || /\?\s*$/.test(sentence) || /\b(?:been|being|get|got|getting)\b/i.test(passiveMatch)) return null;
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
  const coordinatedTail = sentence.slice(predicateMatch.index + predicateMatch[0].length, byIndex);
  if (/\b(?:and|but|or)\s+(?:(?:carefully|quickly|slowly|recently|already|successfully|officially|properly|thoroughly|deliberately|widely|regularly|usually|often|frequently|quietly|publicly|privately|directly|independently|closely)\s+)*[\p{L}]+$/iu.test(coordinatedTail.trim())) return null;

  const object = sentence.slice(0, predicateMatch.index).trim();
  const intervening = sentence.slice(predicateMatch.index + predicateMatch[0].length, byIndex).trim();
  const predicateWords = predicateMatch[0].trim().split(/\s+/);
  const adverbs = predicateWords.slice(1, -1).concat(intervening ? intervening.split(/\s+/) : []);
  const supportedAdverbs = new Set([
    'carefully', 'quickly', 'slowly', 'recently', 'already', 'finally',
    'successfully', 'officially', 'properly', 'thoroughly', 'deliberately',
    'widely', 'regularly', 'usually', 'often', 'frequently', 'quietly',
    'publicly', 'privately', 'directly', 'independently', 'closely'
  ]);
  if (adverbs.some(adverb => !supportedAdverbs.has(adverb.toLowerCase()))) return null;

  const agent = sentence.slice(byIndex + 4).replace(/[.!?]+$/, '').trim();
  if (!object || !agent || /[,;:]|\b(?:during|after|before|yesterday|today|tomorrow|because|while|since|through|within|without|under|over|around|in|on|at|from|until)\b/i.test(agent)) return null;
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
    spoken:'spoke', stolen:'stole', sung:'sang', taken:'took', taught:'taught', thought:'thought',
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
    reviewed:'review', created:'create', used:'use', changed:'change', maintained:'maintain', followed:'follow',
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
  const adverbPhrase = adverbs.join(' ');
  const activeSentence = capitalizedAgent + (adverbPhrase ? ' ' + adverbPhrase : '') + ' ' + activeVerb + ' ' + object.charAt(0).toLowerCase() + object.slice(1);
  const punctuation = /[.!?]+$/.exec(sentence)?.[0] || '';
  return activeSentence.replace(/[.!?]+$/, '') + punctuation;
}

// Deterministic, context-specific guidance instead of randomly selected generic prompts.
function generateActiveSuggestion(sentence, passiveMatch) {
  if (generateActiveRewrite(sentence, passiveMatch)) {
    return 'The actor is named and this simple construction can be rewritten. Review the proposed version before applying it.';
  }
  if (/\bby\b/i.test(sentence)) {
    return 'A by-phrase appears, but the tool cannot safely connect it to this verb. Confirm the actor and clause before rewriting.';
  }
  return 'The actor is not stated. Identify who performed the action before rewriting; the tool will not invent an actor.';
}

