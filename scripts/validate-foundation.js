import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

// Check for strict mode
const isStrictMode = process.argv.includes('--strict');

const VALIDATION_RULES = {
  // HTML Structure Rules
  requiredClasses: [
    'tool-container',
    'tool-interface',
    'tool-main',
    'tool-results'
  ],
  
  // CSS Rules - Forbidden patterns
  forbiddenPatterns: [
    {
      pattern: /class="btn-primary"/g,
      message: 'Use class="btn btn-primary" instead of class="btn-primary"'
    },
    {
      pattern: /#[0-9a-f]{3,6}(?![0-9a-f])/gi,
      message: 'Hardcoded hex colors found - use CSS variables like var(--primary-color)'
    },
    {
      pattern: /padding:\s*\d+px/gi,
      message: 'Hardcoded padding - use CSS variables like var(--space-4)'
    },
    {
      pattern: /margin:\s*\d+px/gi,
      message: 'Hardcoded margin - use CSS variables like var(--space-4)'
    },
    {
      pattern: /font-size:\s*\d+px/gi,
      message: 'Hardcoded font-size - use CSS variables like var(--font-size-lg)'
    }
  ],
  
  // JavaScript Rules
  h1InRender: /<h1[^>]*>/gi,
  missingExports: /export\s+(async\s+)?function\s+(render|init)/g
};

export function validateTool(toolSlug) {
  const toolPath = path.join(projectRoot, 'src', 'tools', toolSlug);
  const indexPath = path.join(toolPath, 'index.js');
  const stylePath = path.join(toolPath, 'style.css');
  
  const results = {
    passed: true,
    warnings: [],
    errors: []
  };
  
  // Validate JavaScript file
  if (fs.existsSync(indexPath)) {
    const jsContent = fs.readFileSync(indexPath, 'utf8');
    
    // Check for H1 in render function
    const h1Matches = jsContent.match(VALIDATION_RULES.h1InRender);
    if (h1Matches) {
      results.errors.push('❌ H1 tag found in render() function - app.js generates H1 automatically');
      results.passed = false;
    }
    
    // Check required exports
    const exportMatches = jsContent.match(VALIDATION_RULES.missingExports) || [];
    const hasRender = exportMatches.some(e => e.includes('render'));
    const hasInit = exportMatches.some(e => e.includes('init'));
    
    if (!hasRender) {
      results.errors.push('❌ Missing render() export function');
      results.passed = false;
    }
    if (!hasInit) {
      results.errors.push('❌ Missing init() export function');
      results.passed = false;
    }
    
    // Check for foundation structure classes
    VALIDATION_RULES.requiredClasses.forEach(className => {
      if (!jsContent.includes(className)) {
        results.warnings.push(`⚠️  Missing foundation class: .${className}`);
      }
    });
    
    // Check forbidden patterns in JS
    VALIDATION_RULES.forbiddenPatterns.forEach(rule => {
      const matches = jsContent.match(rule.pattern);
      if (matches) {
        results.errors.push(`❌ ${rule.message}`);
        results.passed = false;
      }
    });
  } else {
    results.errors.push(`❌ Missing index.js file at ${indexPath}`);
    results.passed = false;
  }
  
  // Validate CSS file
  if (fs.existsSync(stylePath)) {
    const cssContent = fs.readFileSync(stylePath, 'utf8');
    
    // Check forbidden patterns in CSS
    VALIDATION_RULES.forbiddenPatterns.forEach(rule => {
      const matches = cssContent.match(rule.pattern);
      if (matches) {
        results.warnings.push(`⚠️  ${rule.message}`);
      }
    });
    
    // Check if styles are scoped to tool container
    const toolScopePattern = new RegExp(`\\.${toolSlug}-tool`, 'g');
    if (!toolScopePattern.test(cssContent)) {
      results.errors.push(`❌ CSS not scoped to .${toolSlug}-tool container`);
      results.passed = false;
    }
  }
  
  return results;
}

export function validateAllTools() {
  const toolsDir = path.join(projectRoot, 'src', 'tools');
  
  if (!fs.existsSync(toolsDir)) {
    console.log('⚠️  No tools directory found at src/tools');
    return {};
  }
  
  let toolDirs;
  try {
    toolDirs = fs.readdirSync(toolsDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
  } catch (error) {
    console.error('❌ Error reading tools directory:', error.message);
    return {};
  }
  
  if (toolDirs.length === 0) {
    console.log('ℹ️  No tools found in src/tools directory');
    return {};
  }
  
  const allResults = {};
  let totalPassed = 0;
  let totalFailed = 0;
  
  console.log(`🔍 Validating ${toolDirs.length} tool(s)...\n`);
  
  toolDirs.forEach(toolSlug => {
    const result = validateTool(toolSlug);
    allResults[toolSlug] = result;
    
    console.log(`📋 Validating ${toolSlug}:`);
    
    if (result.passed) {
      console.log('✅ All validation checks passed');
      totalPassed++;
    } else {
      result.errors.forEach(error => console.log(`  ${error}`));
      totalFailed++;
    }
    
    if (result.warnings.length > 0) {
      result.warnings.forEach(warning => console.log(`  ${warning}`));
    }
    
    console.log(''); // Empty line between tools
  });
  
  // Summary
  console.log('📊 Validation Summary:');
  console.log(`✅ Passed: ${totalPassed}`);
  console.log(`❌ Failed: ${totalFailed}`);
  
  if (totalFailed > 0) {
    console.log('\n🔧 Fix the errors above before building.');
    // In strict mode, exit with error even for warnings
    if (isStrictMode) {
      console.log('🚫 STRICT MODE: Build blocked due to validation failures.');
      process.exit(1);
    }
    // Only exit if running directly (not from npm build process)
    if (process.argv[1].includes('validate-foundation.js')) {
      process.exit(1);
    }
  } else if (isStrictMode && Object.values(allResults).some(r => r.warnings.length > 0)) {
    const totalWarnings = Object.values(allResults).reduce((sum, r) => sum + r.warnings.length, 0);
    console.log(`\n⚠️  STRICT MODE: ${totalWarnings} warnings found.`);
    console.log('🚫 In strict mode, warnings are treated as errors. Fix all issues before proceeding.');
    process.exit(1);
  } else {
    console.log('\n🎉 All tools passed foundation validation!');
    if (isStrictMode) {
      console.log('✅ STRICT MODE: Perfect compliance achieved!');
    }
  }
  
  return allResults;
}

// CLI usage - check if this script is being run directly
const isMainModule = import.meta.url === `file://${process.argv[1]}` || 
                     import.meta.url.includes(process.argv[1]?.replace(/\\/g, '/'));

if (isMainModule) {
  const cliArgs = process.argv.slice(2);
  const toolSlug = cliArgs.find(arg => !arg.startsWith('--'));
  if (toolSlug) {
    console.log(`Validating single tool: ${toolSlug}\n`);
    const result = validateTool(toolSlug);
    
    console.log(`Validating ${toolSlug}:`);
    if (result.passed) {
      console.log('All validation checks passed');
    } else {
      result.errors.forEach(error => console.log(`  ${error}`));
    }
    
    result.warnings.forEach(warning => console.log(`  ${warning}`));
    
    process.exit(result.passed ? 0 : 1);
  } else {
    validateAllTools();
  }
}