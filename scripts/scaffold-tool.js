#!/usr/bin/env node

/**
 * Tool Scaffolding Script
 * 
 * Automatically generates foundation-compliant tool files with proper structure
 * to prevent manual creation mistakes and ensure compliance from day 1.
 * 
 * Usage: npm run create-tool -- --name="Tool Name" --type=simple --category=text-and-writing
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Tool creation configuration
const CATEGORIES = [
  'text-and-writing',
  'productivity-and-business', 
  'files-and-docs',
  'seo-and-marketing',
  'utilities-and-conversion'
];

const TOOL_TYPES = ['simple', 'complex'];

function parseArgs() {
  const args = process.argv.slice(2);
  const config = {};
  
  args.forEach(arg => {
    if (arg.startsWith('--name=')) {
      config.name = arg.split('=')[1].replace(/['"]/g, '');
    } else if (arg.startsWith('--type=')) {
      config.type = arg.split('=')[1];
    } else if (arg.startsWith('--category=')) {
      config.category = arg.split('=')[1];
    }
  });
  
  return config;
}

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function generateToolIndexJs(toolName, toolSlug, toolType) {
  return `/**
 * ${toolName} Tool
 * 
 * Foundation-compliant ${toolType} tool following all validation requirements.
 * Generated on ${new Date().toISOString().split('T')[0]}
 */

export function render() {
  return \`
    <div class="${toolSlug}-tool">
      <div class="tool-container">
        <div class="tool-interface">
          <div class="tool-main">
            <div class="form-section">
              <h3>Input</h3>
              <div class="form-group">
                <label for="${toolSlug}-input">Enter your text:</label>
                <textarea id="${toolSlug}-input" rows="6" placeholder="Type or paste your text here..."></textarea>
              </div>
              <div class="form-actions">
                <button id="${toolSlug}-process" class="btn btn-primary">Process</button>
                <button id="${toolSlug}-clear" class="btn btn-secondary">Clear</button>
              </div>
            </div>
          </div>
          
          <div class="tool-results">
            <h3>Results</h3>
            <div class="results-content">
              <div id="${toolSlug}-output" class="result-display">
                <!-- Results will appear here -->
              </div>
            </div>
          </div>
        </div>
        
        <div class="seo-content">
          <h2>Understanding the ${toolName}</h2>
          <p>This ${toolName.toLowerCase()} helps you process and analyze text efficiently. Enter your content above and click "Process" to get instant results.</p>
          
          <h2>How to Use Our ${toolName}</h2>
          <ol>
            <li><strong>Enter Text:</strong> Type or paste your content into the input area</li>
            <li><strong>Click Process:</strong> Use the "Process" button to analyze your text</li>
            <li><strong>View Results:</strong> See the processed output in the results section</li>
            <li><strong>Clear and Repeat:</strong> Use "Clear" to start over with new content</li>
          </ol>
          
          <h2>Frequently Asked Questions</h2>
          
          <h3>How does the ${toolName.toLowerCase()} work?</h3>
          <p>Our ${toolName.toLowerCase()} processes your input text using advanced algorithms to provide accurate, instant results directly in your browser.</p>
          
          <h3>Is my data secure?</h3>
          <p>Yes! This tool processes all data locally in your browser. Your text never leaves your device, ensuring complete privacy and security.</p>
          
          <h3>What types of text can I process?</h3>
          <p>You can process any type of text content, from short phrases to long documents. The tool handles various formats and special characters.</p>
          
          <h2>${toolName} and Your Workflow</h2>
          <p>This ${toolName.toLowerCase()} integrates seamlessly into your daily workflow, providing instant results without the need for complex software or account registration.</p>
        </div>
      </div>
    </div>
  \`;
}

export async function init() {
  const input = document.getElementById('${toolSlug}-input');
  const processBtn = document.getElementById('${toolSlug}-process');
  const clearBtn = document.getElementById('${toolSlug}-clear');
  const output = document.getElementById('${toolSlug}-output');
  
  // Input validation and error handling
  function validateInput(text) {
    if (!text || text.trim().length === 0) {
      throw new Error('Please enter some text to process');
    }
    return text.trim();
  }
  
  // Main processing function
  function processText(text) {
    try {
      const validText = validateInput(text);
      
      // TODO: Implement your specific tool logic here
      const result = {
        processed: validText,
        length: validText.length,
        words: validText.split(/\\s+/).filter(word => word.length > 0).length
      };
      
      return result;
    } catch (error) {
      throw error;
    }
  }
  
  // Display results
  function displayResults(result) {
    output.innerHTML = \`
      <div class="result-item">
        <div class="result-label">Processed Text:</div>
        <div class="result-value">\${result.processed}</div>
      </div>
      <div class="result-item">
        <div class="result-label">Character Count:</div>
        <div class="result-value">\${result.length}</div>
      </div>
      <div class="result-item">
        <div class="result-label">Word Count:</div>
        <div class="result-value">\${result.words}</div>
      </div>
    \`;
  }
  
  // Error display
  function showError(message) {
    output.innerHTML = \`
      <div class="error-message">
        <strong>Error:</strong> \${message}
      </div>
    \`;
  }
  
  // Event listeners
  processBtn.addEventListener('click', () => {
    try {
      processBtn.disabled = true;
      processBtn.textContent = 'Processing...';
      
      const text = input.value;
      const result = processText(text);
      displayResults(result);
      
    } catch (error) {
      console.error('Processing error:', error);
      showError(error.message);
    } finally {
      processBtn.disabled = false;
      processBtn.textContent = 'Process';
    }
  });
  
  clearBtn.addEventListener('click', () => {
    input.value = '';
    output.innerHTML = '<p class="placeholder-text">Results will appear here after processing your text.</p>';
    input.focus();
  });
  
  // Real-time input feedback (optional)
  input.addEventListener('input', () => {
    const text = input.value.trim();
    if (text.length > 1000) {
      // Smart debouncing for large inputs
      clearTimeout(input.debounceTimer);
      input.debounceTimer = setTimeout(() => {
        // Optional: Add real-time preview here
      }, 500);
    }
  });
  
  // Initialize display
  output.innerHTML = '<p class="placeholder-text">Results will appear here after processing your text.</p>';
}

// Cleanup function for memory management
export function cleanup() {
  const input = document.getElementById('${toolSlug}-input');
  if (input && input.debounceTimer) {
    clearTimeout(input.debounceTimer);
  }
}
`;
}

function generateToolStyleCss(toolSlug) {
  return `/* ${toolSlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} - Uses Foundation Classes */

/* Tool-specific result display styling */
.${toolSlug}-tool .result-display {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  min-height: 120px;
}

.${toolSlug}-tool .result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--border-color);
}

.${toolSlug}-tool .result-item:last-child {
  border-bottom: none;
}

.${toolSlug}-tool .result-label {
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  font-size: var(--font-size-sm);
}

.${toolSlug}-tool .result-value {
  font-weight: var(--font-weight-bold);
  color: var(--primary-color);
  font-size: var(--font-size-lg);
  text-align: right;
}

.${toolSlug}-tool .placeholder-text {
  color: var(--text-secondary);
  font-style: italic;
  text-align: center;
  padding: var(--space-6);
}

.${toolSlug}-tool .error-message {
  color: var(--error-color);
  background: var(--error-bg);
  border: 1px solid var(--error-border);
  border-radius: var(--radius-md);
  padding: var(--space-4);
  text-align: center;
}

/* Mobile-specific adjustments */
@media (max-width: 768px) {
  .${toolSlug}-tool .result-item {
    flex-direction: column;
    align-items: flex-start;
    gap: var(--space-1);
  }
  
  .${toolSlug}-tool .result-value {
    text-align: left;
    font-size: var(--font-size-base);
  }
}
`;
}

function generateRegistryEntry(toolName, toolSlug, category, toolType) {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return {
    slug: toolSlug,
    title: `${toolName} | Free Online Tool`,
    description: `Free ${toolName.toLowerCase()} tool. Process and analyze your text instantly with our easy-to-use online ${toolName.toLowerCase()}.`,
    keywords: `${toolName.toLowerCase()}, text processing, online tool, free`,
    primaryCategory: category,
    tags: [
      toolName.toLowerCase().replace(/\s+/g, ' '),
      'text processing',
      'online tool',
      'free tool',
      'instant results',
      'browser tool'
    ],
    complexity: toolType,
    privacy: 'client-side',
    type: toolType,
    jsPath: `./tools/${toolSlug}/index.js`,
    relatedTools: [],
    author: 'Free Tools Platform',
    datePublished: currentDate
  };
}

function createTool(config) {
  const { name, type, category } = config;
  
  // Validation
  if (!name) {
    console.error('❌ Error: Tool name is required. Use --name="Tool Name"');
    process.exit(1);
  }
  
  if (!TOOL_TYPES.includes(type)) {
    console.error(`❌ Error: Invalid tool type "${type}". Must be one of: ${TOOL_TYPES.join(', ')}`);
    process.exit(1);
  }
  
  if (!CATEGORIES.includes(category)) {
    console.error(`❌ Error: Invalid category "${category}". Must be one of: ${CATEGORIES.join(', ')}`);
    process.exit(1);
  }
  
  const toolSlug = generateSlug(name);
  const toolDir = path.join(projectRoot, 'src', 'tools', toolSlug);
  
  // Check if tool already exists
  if (fs.existsSync(toolDir)) {
    console.error(`❌ Error: Tool "${toolSlug}" already exists`);
    process.exit(1);
  }
  
  console.log('🔧 Creating foundation-compliant tool...');
  console.log(`📝 Name: ${name}`);
  console.log(`🔗 Slug: ${toolSlug}`);
  console.log(`📂 Category: ${category}`);
  console.log(`⚙️ Type: ${type}`);
  console.log('');
  
  // Create tool directory
  fs.mkdirSync(toolDir, { recursive: true });
  
  // Generate files
  const indexJs = generateToolIndexJs(name, toolSlug, type);
  const styleCss = generateToolStyleCss(toolSlug);
  const registryEntry = generateRegistryEntry(name, toolSlug, category, type);
  
  // Write files
  fs.writeFileSync(path.join(toolDir, 'index.js'), indexJs);
  fs.writeFileSync(path.join(toolDir, 'style.css'), styleCss);
  
  // Update tool registry
  const registryPath = path.join(projectRoot, 'src', 'tool-registry.json');
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  registry.push(registryEntry);
  fs.writeFileSync(registryPath, JSON.stringify(registry, null, 2));
  
  console.log('✅ Files created:');
  console.log(`   📄 ${path.relative(projectRoot, path.join(toolDir, 'index.js'))}`);
  console.log(`   🎨 ${path.relative(projectRoot, path.join(toolDir, 'style.css'))}`);
  console.log(`   📋 Updated tool-registry.json`);
  console.log('');
  console.log('🎯 Next steps:');
  console.log('1. Customize the tool logic in the processText() function');
  console.log('2. Update the SEO content in the render() function');
  console.log('3. Test with: npm run build');
  console.log('4. Commit your changes');
  console.log('');
  console.log('⚠️  Remember: All generated code follows foundation compliance rules!');
}

// CLI execution
function main() {
  const config = parseArgs();
  
  if (Object.keys(config).length === 0) {
    console.log('🛠️  Tool Scaffolding Script');
    console.log('');
    console.log('Usage:');
    console.log('  npm run create-tool -- --name="Tool Name" --type=simple --category=text-and-writing');
    console.log('');
    console.log('Options:');
    console.log('  --name       Tool name (required)');
    console.log(`  --type       Tool type: ${TOOL_TYPES.join(', ')} (required)`);
    console.log(`  --category   Category: ${CATEGORIES.join(', ')} (required)`);
    console.log('');
    console.log('Examples:');
    console.log('  npm run create-tool -- --name="URL Encoder" --type=simple --category=utilities-and-conversion');
    console.log('  npm run create-tool -- --name="PDF Merger" --type=complex --category=files-and-docs');
    process.exit(0);
  }
  
  if (!config.name || !config.type || !config.category) {
    console.error('❌ Error: Missing required parameters');
    console.log('Use: npm run create-tool -- --name="Tool Name" --type=simple --category=text-and-writing');
    process.exit(1);
  }
  
  createTool(config);
}

main();