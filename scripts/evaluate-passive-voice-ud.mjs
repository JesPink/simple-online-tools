import { analyzePassiveText } from '../src/tools/passive-voice-detector/engine.js';

let input = '';
for await (const chunk of process.stdin) input += chunk;
const sentences = JSON.parse(input);
if (!Array.isArray(sentences) || sentences.some((sentence) => typeof sentence !== 'string')) {
  throw new TypeError('Expected a JSON array of sentence strings on stdin.');
}

// The product reports sentence-level detection. A passive construction can occur
// in a later coordinated/subordinate clause even when the sentence's first clause
// is active, so include the engine's additional clause-level detections as well.
const predictions = sentences.map((sentence) =>
  analyzePassiveText(sentence).some((result) =>
    result.isPassive || (Array.isArray(result.additionalPatterns) && result.additionalPatterns.length > 0)
  )
);
process.stdout.write(JSON.stringify(predictions));
