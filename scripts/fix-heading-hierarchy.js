#!/usr/bin/env node

/**
 * Fix Heading Hierarchy Accessibility Issue
 * 
 * Problem: Tools have H1 (auto-generated) → H3 (interface) → H2 (SEO content)
 * Solution: Change to H1 → H2 (interface) → H3 (SEO content) → H4 (subsections)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Tool directories to process
const toolsDir = path.join(__dirname, '..', 'src', 'tools');
const toolDirs = fs.readdirSync(toolsDir, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name);

console.log('🔧 Fixing heading hierarchy accessibility issues...');
console.log(`📁 Found ${toolDirs.length} tools to process`);

let totalChanges = 0;

toolDirs.forEach(toolSlug => {
  const indexPath = path.join(toolsDir, toolSlug, 'index.js');
  
  if (!fs.existsSync(indexPath)) {
    console.log(`⚠️  Skipping ${toolSlug} - no index.js found`);
    return;
  }
  
  let content = fs.readFileSync(indexPath, 'utf8');
  let changes = 0;
  
  // Phase 1: Fix interface headings (H3 → H2)
  // These are headings in tool-main and tool-results sections, before SEO content
  
  // Common interface heading patterns
  const interfaceHeadingPatterns = [
    // Form section headings
    { pattern: /<h3>Enter Your Text<\/h3>/g, replacement: '<h2>Enter Your Text</h2>' },
    { pattern: /<h3>Text Analysis<\/h3>/g, replacement: '<h2>Text Analysis</h2>' },
    { pattern: /<h3>Text Statistics<\/h3>/g, replacement: '<h2>Text Statistics</h2>' },
    { pattern: /<h3>Converted Text<\/h3>/g, replacement: '<h2>Converted Text</h2>' },
    { pattern: /<h3>Generated Value Propositions/g, replacement: '<h2>Generated Value Propositions' },
    { pattern: /<h3>Business Information<\/h3>/g, replacement: '<h2>Business Information</h2>' },
    { pattern: /<h3>Meeting Participants<\/h3>/g, replacement: '<h2>Meeting Participants</h2>' },
    { pattern: /<h3>Current Participants<\/h3>/g, replacement: '<h2>Current Participants</h2>' },
    { pattern: /<h3>Meeting Cost Analysis<\/h3>/g, replacement: '<h2>Meeting Cost Analysis</h2>' },
    { pattern: /<h3>Upload PDF Document<\/h3>/g, replacement: '<h2>Upload PDF Document</h2>' },
    { pattern: /<h3>Current PDF Metadata<\/h3>/g, replacement: '<h2>Current PDF Metadata</h2>' },
    { pattern: /<h3>Edit PDF Metadata<\/h3>/g, replacement: '<h2>Edit PDF Metadata</h2>' },
    { pattern: /<h3>Metadata Analysis<\/h3>/g, replacement: '<h2>Metadata Analysis</h2>' },
    { pattern: /<h3>Generate Your Meta Description<\/h3>/g, replacement: '<h2>Generate Your Meta Description</h2>' },
    { pattern: /<h3>Generated Meta Description<\/h3>/g, replacement: '<h2>Generated Meta Description</h2>' },
    { pattern: /<h3>Recipe Details<\/h3>/g, replacement: '<h2>Recipe Details</h2>' },
    { pattern: /<h3>Scaled Recipe<\/h3>/g, replacement: '<h2>Scaled Recipe</h2>' },
    { pattern: /<h3 class="output-title">Analysis Results<\/h3>/g, replacement: '<h2 class="output-title">Analysis Results</h2>' },
    { pattern: /<h3 class="suggestions-title">Active Voice Suggestions<\/h3>/g, replacement: '<h2 class="suggestions-title">Active Voice Suggestions</h2>' }
  ];
  
  interfaceHeadingPatterns.forEach(({ pattern, replacement }) => {
    const matches = content.match(pattern);
    if (matches) {
      content = content.replace(pattern, replacement);
      changes += matches.length;
    }
  });
  
  // Phase 2: Fix SEO content headings (H2 → H3)
  // These are the main section headings in SEO content
  
  // Look for H2 headings that come after the seo-content div
  const seoContentIndex = content.indexOf('<div class="seo-content">');
  if (seoContentIndex !== -1) {
    // Split content at seo-content div
    const beforeSeoContent = content.substring(0, seoContentIndex);
    const seoContentPart = content.substring(seoContentIndex);
    
    // Replace H2 with H3 in SEO content section only
    const updatedSeoContent = seoContentPart.replace(/<h2>/g, '<h3>').replace(/<\/h2>/g, '</h3>');
    const h2Changes = (seoContentPart.match(/<h2>/g) || []).length;
    changes += h2Changes;
    
    // Phase 3: Fix subsection headings in SEO content (H3 → H4)
    // These are FAQ questions and subsection headings under main SEO headings
    const updatedSeoContentWithH4 = updatedSeoContent.replace(
      // FAQ questions and subsections that were originally H3 in SEO content
      /<h3>(.*?(?:Academic and Professional Writing|Content Marketing and SEO|Social Media Optimization|Academic Writing|Professional Content Creation|Social Media Management|SEO and Web Content|What .*?\?|How .*?\?|Can .*?\?|Does .*?\?|Is .*?\?|Why .*?\?).*?)<\/h3>/g,
      '<h4>$1</h4>'
    );
    const h3toH4Changes = (updatedSeoContent.match(/<h3>(.*?(?:Academic and Professional Writing|Content Marketing and SEO|Social Media Optimization|Academic Writing|Professional Content Creation|Social Media Management|SEO and Web Content|What .*?\?|How .*?\?|Can .*?\?|Does .*?\?|Is .*?\?|Why .*?\?).*?)<\/h3>/g) || []).length;
    changes += h3toH4Changes;
    
    content = beforeSeoContent + updatedSeoContentWithH4;
  }
  
  // Write back to file if changes were made
  if (changes > 0) {
    fs.writeFileSync(indexPath, content, 'utf8');
    console.log(`✅ Fixed ${toolSlug}: ${changes} heading${changes !== 1 ? 's' : ''} updated`);
    totalChanges += changes;
  } else {
    console.log(`ℹ️  ${toolSlug}: No heading issues found`);
  }
});

console.log(`\n🎉 Heading hierarchy fix completed!`);
console.log(`📊 Total changes made: ${totalChanges}`);
console.log(`\n📋 New heading hierarchy:`);
console.log(`   H1: Tool title (auto-generated by app.js)`);
console.log(`   H2: Interface sections (Enter Your Text, Results, etc.)`);
console.log(`   H3: SEO content main sections`);
console.log(`   H4: SEO subsections and FAQ questions`);