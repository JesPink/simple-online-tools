#!/usr/bin/env node

/**
 * Pre-Commit Hook Setup
 * 
 * Sets up Git pre-commit hooks to automatically validate foundation compliance
 * before allowing commits, preventing violations from entering the repository.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const PRE_COMMIT_HOOK = `#!/bin/sh
#
# Pre-commit hook for Foundation Compliance
# Automatically runs validation before commits
#

echo "🔍 Running foundation compliance validation..."

# Run strict validation
npm run validate:strict

if [ $? -ne 0 ]; then
  echo ""
  echo "❌ COMMIT BLOCKED: Foundation compliance violations detected!"
  echo ""
  echo "Fix the issues above and try again."
  echo "Hint: Use 'npm run create-tool' instead of manual creation"
  echo ""
  exit 1
fi

echo "✅ Foundation compliance check passed!"
echo ""
`;

function setupPreCommitHook() {
  const gitHooksDir = path.join(projectRoot, '.git', 'hooks');
  const preCommitPath = path.join(gitHooksDir, 'pre-commit');
  
  // Check if .git directory exists
  if (!fs.existsSync(path.join(projectRoot, '.git'))) {
    console.log('⚠️  No .git directory found. Initialize git first:');
    console.log('   git init');
    return;
  }
  
  // Create hooks directory if it doesn't exist
  if (!fs.existsSync(gitHooksDir)) {
    fs.mkdirSync(gitHooksDir, { recursive: true });
  }
  
  // Write pre-commit hook
  fs.writeFileSync(preCommitPath, PRE_COMMIT_HOOK);
  
  // Make hook executable (on Unix systems)
  if (process.platform !== 'win32') {
    fs.chmodSync(preCommitPath, '755');
  }
  
  console.log('✅ Pre-commit hook installed successfully!');
  console.log('');
  console.log('🔒 From now on, all commits will be validated for:');
  console.log('   • Foundation compliance');
  console.log('   • Build success');
  console.log('   • Code quality standards');
  console.log('');
  console.log('💡 To bypass validation (emergency only):');
  console.log('   git commit --no-verify -m "Emergency fix"');
  console.log('');
}

function main() {
  console.log('🔧 Setting up pre-commit hooks...');
  console.log('');
  
  setupPreCommitHook();
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { setupPreCommitHook };