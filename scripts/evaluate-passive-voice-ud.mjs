import { analyzePassiveText } from '../src/tools/passive-voice-detector/engine.js';

let input = '';
for await (const chunk of process.stdin) input += chunk;
const sentences = JSON.parse(input);
if (!Array.isArray(sentences) || sentences.some((sentence) => typeof sentence !== 'string')) {
  throw new TypeError('Expected a JSON array of sentence strings on stdin.');
}
const predictions = sentences.map((sentence) =>
  analyzePassiveText(sentence).some((result) => result.isPassive)
);
process.stdout.write(JSON.stringify(predictions));
