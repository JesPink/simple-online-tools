import { analyzePassiveText } from '../src/tools/passive-voice-detector/engine.js';

let input = '';
for await (const chunk of process.stdin) input += chunk;
const sentences = JSON.parse(input);
if (!Array.isArray(sentences) || sentences.some((sentence) => typeof sentence !== 'string')) {
  throw new TypeError('Expected a JSON array of sentence strings on stdin.');
}

// Emit only coarse detector metadata. Never return matched spans, lemmas,
// pattern strings, sentence text, or any other corpus-derived lexical content.
const predictions = sentences.map((sentence) => {
  const results = analyzePassiveText(sentence);
  const primary = results.filter((result) => result.isPassive);
  const additionalCount = results.reduce(
    (count, result) => count + (Array.isArray(result.additionalPatterns) ? result.additionalPatterns.length : 0),
    0
  );
  const primaryTypes = [...new Set(primary.map((result) => result.passiveType || 'unknown'))];
  return {
    detected: primary.length > 0 || additionalCount > 0,
    primaryTypes,
    additionalCount
  };
});
process.stdout.write(JSON.stringify(predictions));
