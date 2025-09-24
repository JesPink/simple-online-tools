export function render() {
  return `
    <div class="meta-description-generator-tool">
      <div class="tool-container">
        <div class="tool-interface">
          <div class="tool-main">
            <div class="form-section">
              <h3>Generate Your Meta Description</h3>
              <div class="form-group">
                <label for="page-title">Page Title</label>
                <input type="text" id="page-title" placeholder="Enter your page title..." aria-describedby="page-title-help" />
                <small id="page-title-help" class="form-help">The main title of your web page</small>
              </div>
              <div class="form-group">
                <label for="content-summary">Content Summary</label>
                <textarea id="content-summary" rows="3" placeholder="Brief description of your page content..." aria-describedby="content-summary-help"></textarea>
                <small id="content-summary-help" class="form-help">Briefly describe what your page is about</small>
              </div>
              <div class="form-group">
                <label for="target-keyword">Target Keyword (Optional)</label>
                <input type="text" id="target-keyword" placeholder="Primary keyword to include..." aria-describedby="target-keyword-help" />
                <small id="target-keyword-help" class="form-help">Main keyword you want to rank for in search engines</small>
              </div>
              <div class="form-group">
                <label for="tone-select">Tone</label>
                <select id="tone-select" aria-describedby="tone-select-help">
                  <option value="professional">Professional</option>
                  <option value="friendly">Friendly</option>
                  <option value="urgent">Urgent</option>
                  <option value="informative">Informative</option>
                  <option value="creative">Creative</option>
                </select>
                <small id="tone-select-help" class="form-help">Choose the style that matches your brand voice</small>
              </div>
              <div class="form-actions">
                <button class="btn btn-primary" id="generate-btn">Generate Meta Description</button>
                <button class="btn btn-secondary" id="clear-btn">Clear All</button>
              </div>
            </div>
          </div>
          <div class="tool-results">
            <h3>Generated Meta Description</h3>
            <div class="results-content">
              <div id="meta-preview" class="meta-preview">
                <div class="preview-placeholder">
                  Your generated meta description will appear here...
                </div>
              </div>
              <div id="character-info" class="character-info">
                <span id="char-count">0</span> characters
                <span id="length-status" class="length-status"></span>
              </div>
              <div class="result-actions">
                <button class="btn btn-primary" id="copy-btn" disabled>Copy to Clipboard</button>
                <button class="btn btn-secondary" id="regenerate-btn" disabled>Regenerate</button>
              </div>
            </div>
          </div>
        </div>
        <div class="seo-content">
          <h2>Understanding the Meta Description Generator</h2>
          <p>A meta description generator is an essential SEO tool that helps you create compelling, optimized meta descriptions for your web pages. These short snippets of text appear beneath your page title in search engine results and play a crucial role in attracting clicks from potential visitors. Our free meta description generator streamlines the process of crafting perfect meta descriptions that balance SEO optimization with user engagement, ensuring your pages stand out in crowded search results.</p>

          <p>Meta descriptions serve as your page's elevator pitch to search engine users. While they don't directly impact rankings, they significantly influence click-through rates, which can indirectly boost your SEO performance. A well-crafted meta description can be the difference between a user clicking on your result or choosing a competitor's page instead.</p>

          <h2>How to Use Our Meta Description Generator</h2>
          <p>Creating effective meta descriptions with our tool is straightforward and takes just a few simple steps:</p>

          <ol>
          <li><strong>Enter Your Page Title:</strong> Start by inputting your page's title or main heading. This helps the generator understand your content's primary focus.</li>
          <li><strong>Add Content Summary:</strong> Provide a brief description of your page content. This gives context for creating a relevant and engaging meta description.</li>
          <li><strong>Include Target Keyword (Optional):</strong> If you have a specific keyword you want to target, enter it here. The generator will incorporate it naturally into your meta description.</li>
          <li><strong>Select Your Tone:</strong> Choose from professional, friendly, urgent, informative, or creative tones to match your brand voice and target audience.</li>
          <li><strong>Generate and Review:</strong> Click the generate button to create your meta description. Review the character count and optimize as needed.</li>
          <li><strong>Copy and Implement:</strong> Use the copy button to easily transfer your optimized meta description to your website's HTML or CMS.</li>
          </ol>

          <h2>What is a Meta Description Creator and Why You Need One</h2>
          <p>A meta description creator is a specialized tool designed to help website owners, marketers, and SEO professionals craft compelling meta descriptions efficiently. Unlike manually writing descriptions, a meta description creator ensures consistency, optimal length, and keyword integration across all your web pages.</p>

          <p>The challenge with writing meta descriptions manually is maintaining the perfect balance between SEO optimization and user appeal while staying within the 120-160 character limit. Our meta description creator solves this by providing templates, character counting, and tone variations that align with best practices and search engine guidelines.</p>

          <p>Professional marketers and content creators rely on meta description creators to scale their SEO efforts. Instead of spending hours crafting individual descriptions, you can generate multiple variations quickly, test different approaches, and maintain consistent messaging across your entire website.</p>

          <h2>SEO Description Generator: Boosting Your Click-Through Rates</h2>
          <p>An SEO description generator focuses specifically on creating meta descriptions that drive organic traffic and improve search engine visibility. Our SEO description generator incorporates proven marketing psychology principles and SEO best practices to maximize your pages' click-through potential.</p>

          <p>The key advantage of using an SEO description generator is its ability to create descriptions that appeal to both search engines and human users. It ensures proper keyword placement, maintains optimal character counts, and incorporates compelling calls-to-action that encourage clicks.</p>

          <p>Search engines like Google use meta descriptions as snippets in search results about 70% of the time. When your meta description is well-optimized and engaging, it can significantly increase your organic click-through rates, leading to more website traffic and potential conversions.</p>

          <h2>Best Practices for Meta Description Optimization</h2>
          <p>Creating effective meta descriptions requires understanding both technical SEO requirements and user psychology. Here are essential best practices to follow:</p>

          <p><strong>Character Count Optimization:</strong> Keep your meta descriptions between 120-160 characters. Descriptions shorter than 120 characters may appear incomplete, while those longer than 160 characters risk being truncated in search results.</p>

          <p><strong>Keyword Integration:</strong> Include your target keyword naturally within the meta description, preferably near the beginning. However, avoid keyword stuffing, which can make your description sound unnatural and potentially harm your SEO.</p>

          <p><strong>Compelling Call-to-Action:</strong> End your meta description with a clear call-to-action that encourages users to click. Phrases like "Learn more," "Get started today," or "Discover how" can increase engagement.</p>

          <p><strong>Unique Descriptions:</strong> Each page on your website should have a unique meta description that accurately reflects its specific content. Duplicate meta descriptions can confuse search engines and users alike.</p>

          <h2>Advanced Meta Description Strategies</h2>
          <p>Beyond basic optimization, advanced meta description strategies can give you a competitive edge in search results. Consider implementing these techniques using our meta description writer:</p>

          <p><strong>Emotional Triggers:</strong> Incorporate emotional words that resonate with your target audience. Words like "essential," "proven," "exclusive," or "breakthrough" can increase click-through rates when used appropriately.</p>

          <p><strong>Number and Statistics:</strong> Including specific numbers or statistics in your meta descriptions can increase credibility and attract clicks. For example, "Increase conversions by 47%" is more compelling than "Increase conversions significantly."</p>

          <p><strong>Problem-Solution Format:</strong> Structure your meta description to first identify a problem your audience faces, then position your content as the solution. This approach directly addresses user intent and search queries.</p>

          <h2>Frequently Asked Questions</h2>

          <h3>What makes a good meta description for SEO?</h3>
          <p>A good meta description for SEO is 120-160 characters long, includes your target keyword naturally, provides a clear value proposition, and includes a compelling call-to-action. It should accurately represent your page content while enticing users to click through from search results.</p>

          <h3>How does a meta description generator improve my SEO workflow?</h3>
          <p>A meta description generator streamlines your SEO workflow by automating the creation process, ensuring consistent formatting, maintaining optimal character counts, and providing multiple tone variations. This saves time while maintaining quality and consistency across all your web pages.</p>

          <h3>Can I use the same meta description for multiple pages?</h3>
          <p>No, each page should have a unique meta description that specifically describes its content. Duplicate meta descriptions can confuse search engines about which page to show for specific queries and may result in lower click-through rates.</p>

          <h3>How often should I update my meta descriptions?</h3>
          <p>Review and update your meta descriptions regularly, especially when you refresh page content, target new keywords, or notice declining click-through rates. A good practice is to audit meta descriptions quarterly as part of your overall SEO maintenance.</p>

          <h3>Do meta descriptions directly affect search engine rankings?</h3>
          <p>While meta descriptions don't directly influence search engine rankings, they significantly impact click-through rates, which can indirectly affect your SEO performance. Higher click-through rates signal to search engines that your content is relevant and valuable to users.</p>

          <h2>Meta Description Generator and Your SEO Workflow</h2>
          <p>Integrating our meta description generator into your SEO workflow can dramatically improve your efficiency and results. By automating the creation of optimized meta descriptions, you can focus more time on creating quality content and implementing other SEO strategies.</p>

          <p>The tool works perfectly alongside other SEO resources like our Word Counter for content optimization and Case Converter for proper text formatting. Together, these tools form a comprehensive suite that supports every aspect of your content marketing and SEO efforts.</p>

          <p>Start using our free meta description generator today to create compelling, SEO-optimized meta descriptions that drive more organic traffic to your website. With consistent use, you'll see improved click-through rates and better overall search engine performance.</p>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  const pageTitleInput = document.getElementById('page-title');
  const contentSummaryInput = document.getElementById('content-summary');
  const targetKeywordInput = document.getElementById('target-keyword');
  const toneSelect = document.getElementById('tone-select');
  const generateBtn = document.getElementById('generate-btn');
  const clearBtn = document.getElementById('clear-btn');
  const copyBtn = document.getElementById('copy-btn');
  const regenerateBtn = document.getElementById('regenerate-btn');
  const metaPreview = document.getElementById('meta-preview');
  const charCount = document.getElementById('char-count');
  const lengthStatus = document.getElementById('length-status');

  let debounceTimer;
  let currentMetaDescription = '';
  let generatedVariants = [];
  let isExpandedView = false; // Track if user is in expanded view

  // Utility functions for enhanced meta description generation
  function pick(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function ensureKeyword(meta, keyword) {
    if (!keyword) return meta;
    const idx = meta.toLowerCase().indexOf(keyword.toLowerCase());
    if (idx >= 0) return meta;
    // Insert keyword at the beginning for better SEO
    return `${keyword} — ${meta}`;
  }

  function safeTruncate(s, max = 155) {
    if (s.length <= max) return s;
    let cut = s.substring(0, max);
    // Drop partial word to avoid mid-word cuts
    cut = cut.replace(/\s+\S*$/, '');
    return cut + '...';
  }

  function tidy(s) {
    // Clean up spacing and punctuation
    s = s.replace(/\s+/g, ' ').trim();
    s = s.replace(/\s+([.,!?:;])/g, '$1');
    s = s.replace(/\s{2,}/g, ' ');
    
    // Generic redundancy removal patterns
    s = s.replace(/\b(\w+)\s+\1\b/gi, '$1'); // Remove duplicate words
    s = s.replace(/(\w+)\s+(\w+)\s+\1\s+\2/gi, '$1 $2'); // Remove duplicate phrases
    
    // Generic pattern fixes that work for any content
    // Fix awkward repetitive structures: "X with Y X" -> "Professional X with Y"
    s = s.replace(/(\w+)\s+with\s+[^.!?]*\1/gi, (match, word) => {
      return `Professional ${word.toLowerCase()} with comprehensive features`;
    });
    
    // Fix awkward preposition chains: "X for Y for Z" -> "X designed for Y and Z"
    s = s.replace(/(\w+)\s+for\s+([^.!?]*)\s+for\s+([^.!?]*)/gi, '$1 designed for $2 and $3');
    
    // Fix timing contradictions generically
    s = s.replace(/before.*time.*out.*(today|now)/gi, 'today only');
    s = s.replace(/until.*time.*out.*(today|now)/gi, 'available now');
    s = s.replace(/time runs out (today|now)/gi, 'limited time');
    
    // Generic grammar improvements
    s = s.replace(/with\s+([^.!?]*)\s+explained/gi, 'with detailed $1');
    s = s.replace(/featuring\s+([^.!?]*)\s+information/gi, 'with comprehensive $1');
    s = s.replace(/\s+(and|to)\s+(and|to)\s+/gi, ' and '); // Remove duplicate connectors
    
    // Improve common awkward endings
    s = s.replace(/\bhere\./gi, 'available.');
    s = s.replace(/\bnow\.\s*$/gi, 'today.');
    
    // Remove duplicate connectors generically
    s = s.replace(/\b(and|with|for|to)\s+\1\b/gi, '$1');
    s = s.replace(/\b(now|today)\s+(now|today)\b/gi, '$1');
    
    // Capitalize properly and fix common proper nouns
    s = s.charAt(0).toUpperCase() + s.slice(1);
    s = s.replace(/\.\s+([a-z])/g, (match, p1) => '. ' + p1.toUpperCase());
    
    // Common proper noun capitalizations
    s = s.replace(/\b(german|french|italian|japanese|american)\b/gi, (match) => 
      match.charAt(0).toUpperCase() + match.slice(1).toLowerCase()
    );
    
    return s;
  }

  function scoreMetaDescription(meta, keyword) {
    let score = 0;
    const length = meta.length;
    
    // Length scoring (prefer 140-155 characters)
    if (length >= 140 && length <= 155) score += 30;
    else if (length >= 120 && length <= 160) score += 20;
    else if (length < 120) score += 5;
    else score += 0; // Too long
    
    // Keyword position scoring (earlier is better)
    if (keyword) {
      const keywordIndex = meta.toLowerCase().indexOf(keyword.toLowerCase());
      if (keywordIndex >= 0) {
        if (keywordIndex <= 20) score += 25;
        else if (keywordIndex <= 50) score += 15;
        else score += 10;
      }
    }
    
    // Call-to-action detection
    const ctaWords = ['discover', 'learn', 'get', 'find', 'explore', 'try', 'start', 'join', 'unlock', 'master'];
    const hasCTA = ctaWords.some(word => meta.toLowerCase().includes(word));
    if (hasCTA) score += 15;
    
    // Punctuation variety (more engaging)
    const hasPunctuation = /[!?:]/.test(meta);
    if (hasPunctuation) score += 10;
    
    return score;
  }

  // Simplified SEO Pattern System - Proven copywriting formulas
  function analyzeContent(title, summary, keyword) {
    const content = (title + ' ' + summary + ' ' + keyword).toLowerCase();
    
    return {
      contentType: determineContentType(title, summary),
      hasAudience: /\b(for|professionals?|beginners?|users?|customers?|home|business)\b/.test(content),
      hasFeatures: /\b(\d+[\w-]*|durable|professional|free|premium|advanced|simple|easy)\b/.test(content),
      hasBenefit: /\b(help[s]?|improve[s]?|boost[s]?|increase[s]?|save[s]?|deliver[s]?)\b/.test(content),
      isProduct: /\b(buy|shop|price|\$|knife|tool|software|service)\b/.test(content)
    };
  }
  
  function determineContentType(title, summary) {
    const combined = (title + ' ' + summary).toLowerCase();
    
    if (/\b(how to|guide|tutorial|learn|step[s]?)\b/.test(combined)) return 'guide';
    if (/\b(free|audit|tool|calculator|generator)\b/.test(combined)) return 'tool';
    if (/\b(terms|policy|legal|privacy)\b/.test(combined)) return 'legal';
    if (/\b(about|company|team|contact)\b/.test(combined)) return 'page';
    return 'product'; // Default for e-commerce and services
  }
  
  function buildMetaDescription(title, summary, keyword, tone, analysis) {
    const focus = keyword || extractMainConcept(title);
    const cleanSummary = summary || 'professional solutions and expert guidance';
    
    // Choose pattern based on content analysis and tone
    if (tone === 'urgent' && analysis.isProduct) {
      return buildUrgentProduct(focus, cleanSummary, analysis);
    } else if (tone === 'urgent') {
      return buildUrgentOffer(focus, cleanSummary, analysis);
    } else if (analysis.contentType === 'guide') {
      return buildGuidePattern(focus, cleanSummary, tone, analysis);
    } else if (analysis.contentType === 'tool') {
      return buildToolPattern(focus, cleanSummary, tone, analysis);
    } else if (analysis.contentType === 'legal') {
      return buildLegalPattern(focus, cleanSummary);
    } else if (analysis.isProduct) {
      return buildProductPattern(focus, cleanSummary, tone, analysis);
    } else {
      return buildGenericPattern(focus, cleanSummary, tone, analysis);
    }
  }
  
  function buildGuidePattern(focus, summary, tone, analysis) {
    const action = tone === 'friendly' ? 'Learn' : 'Discover';
    const modifier = analysis.hasAudience ? 'step-by-step' : 'comprehensive';
    const ending = tone === 'friendly' ? 'Perfect for beginners and experts alike.' : 'Complete with examples and expert tips.';
    
    return `${action} ${focus} with our ${modifier} guide. ${summary} ${ending}`.substring(0, 160);
  }
  
  function buildToolPattern(focus, summary, tone, analysis) {
    if (tone === 'urgent') {
      return `Get your ${focus} today! ${summary} Limited time access - start now!`;
    }
    
    const action = analysis.hasBenefit ? 'Boost your results with our' : 'Use our professional';
    const ending = tone === 'friendly' ? 'Easy to use and always free!' : 'Trusted by thousands of users.';
    
    return `${action} ${focus}. ${summary} ${ending}`.substring(0, 160);
  }
  
  function buildProductPattern(focus, summary, tone, analysis, variant = null) {
    if (tone === 'creative') {
      return `Transform your experience with ${focus}. ${summary} Revolutionary design meets exceptional performance.`;
    }
    
    // Context-appropriate endings
    let suffix;
    if (analysis.contentType === 'tool' || summary.toLowerCase().includes('software')) {
      suffix = pick(['Trusted by thousands of users worldwide.', 'Proven solution for professionals.', 'Join thousands of satisfied users.']);
    } else if (summary.toLowerCase().includes('recipe') || summary.toLowerCase().includes('cooking')) {
      suffix = pick(['Perfect results every time.', 'Kitchen-tested recipes.', 'Delicious results guaranteed.']);
    } else if (summary.toLowerCase().includes('doctor') || summary.toLowerCase().includes('medical')) {
      suffix = pick(['Secure and confidential consultations.', 'Licensed healthcare professionals.', 'Safe and reliable medical care.']);
    } else if (summary.toLowerCase().includes('course') || summary.toLowerCase().includes('learn')) {
      suffix = pick(['Start learning today.', 'Expert-designed curriculum.', 'Advance your skills now.']);
    } else {
      suffix = pick(['Get started today.', 'Perfect for your needs.', 'Everything you need.']);
    }
    
    // Multiple pattern structures for variety
    const patterns = [
      `Professional ${focus}: ${summary} ${suffix}`,
      `Discover ${focus} - ${summary} ${suffix}`,
      `Premium ${focus}: ${summary} ${suffix}`,
      `Quality ${focus} solution: ${summary} ${suffix}`,
      `${focus} that works: ${summary} ${suffix}`
    ];
    
    // Use specific variant or random selection
    const selectedPattern = variant !== null && patterns[variant] ? patterns[variant] : pick(patterns);
    return selectedPattern.substring(0, 160);
  }
  
  function buildUrgentProduct(focus, summary, analysis) {
    return `Limited time: Premium ${focus} available now! ${summary} Don't miss out - order today!`;
  }
  
  function buildUrgentOffer(focus, summary, analysis) {
    return `Get your ${focus} today! ${summary} Limited time offer - claim yours now!`;
  }
  
  function buildLegalPattern(focus, summary) {
    return `View our ${focus}: ${summary} Clear, comprehensive policies for all users and visitors.`;
  }
  
  function buildGenericPattern(focus, summary, tone, analysis) {
    const starters = {
      professional: 'Professional',
      friendly: 'Discover',
      informative: 'Learn about',
      creative: 'Experience'
    };
    
    const starter = starters[tone] || starters.professional;
    const ending = analysis.hasBenefit ? 'Get started today.' : 'Learn more now.';
    
    return `${starter} ${focus}: ${summary} ${ending}`;
  }
  
  function extractMainConcept(title) {
    // Extract the most important term from title
    const words = title.toLowerCase().split(/[\s\-—]+/);
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with'];
    const meaningful = words.filter(word => word.length > 2 && !stopWords.includes(word));
    
    return meaningful.slice(0, 2).join(' ') || title;
  }

  function generateMetaDescription() {
    const title = pageTitleInput.value.trim();
    const summary = contentSummaryInput.value.trim();
    const keyword = targetKeywordInput.value.trim();
    const tone = toneSelect.value;

    if (!title && !summary) {
      showError('Please enter at least a page title or content summary.');
      return;
    }

    try {
      // Analyze content to choose the best pattern
      const analysis = analyzeContent(title, summary, keyword);
      
      // Generate 3 high-quality variants using proven SEO patterns
      const variants = [];
      
      // Always generate at least one of each type to ensure variety
      const methods = [
        () => buildMetaDescription(title, summary, keyword, tone, analysis),
        () => createVariation1('', title, summary, keyword, tone, analysis),
        () => createVariation2('', title, summary, keyword, tone, analysis)
      ];
      
      // Randomize the order but ensure we use all 3 methods
      const shuffledMethods = [...methods].sort(() => Math.random() - 0.5);
      
      for (let i = 0; i < 3; i++) {
        let meta = shuffledMethods[i]();
        
        // Ensure proper keyword integration
        if (keyword && !meta.toLowerCase().includes(keyword.toLowerCase())) {
          meta = integrateKeyword(meta, keyword);
        }
        
        // Final optimization
        meta = optimizeLength(meta);
        meta = polishGrammar(meta);
        
        const score = scoreMetaDescription(meta, keyword);
        variants.push({ text: meta, score: score });
      }
      
      // Sort by score
      variants.sort((a, b) => b.score - a.score);
      
      generatedVariants = variants;
      currentMetaDescription = variants[0].text;
      
      displayResult(variants[0].text, variants, isExpandedView); // Preserve current view state
      
      // Update button text based on view state
      if (isExpandedView && variants.length > 1) {
        regenerateBtn.textContent = 'Regenerate All';
      } else {
        regenerateBtn.textContent = 'Regenerate';
      }
      
    } catch (error) {
      console.error('Generation failed:', error);
      showError('Failed to generate meta description. Please try again.');
    }
  }
  
  function createVariation1(baseMeta, title, summary, keyword, tone, analysis) {
    // Alternative approach for variation with expanded patterns
    const focus = keyword || extractMainConcept(title);
    
    if (analysis.contentType === 'product') {
      const productPatterns = [
        `Premium ${focus}: ${summary} Expert quality and reliable performance.`,
        `Top-rated ${focus} - ${summary} Outstanding value and service.`,
        `Best ${focus} available: ${summary} Exceptional quality guaranteed.`,
        `Choose ${focus}: ${summary} Superior results and satisfaction.`
      ];
      return pick(productPatterns);
    } else if (analysis.contentType === 'guide') {
      const guidePatterns = [
        `Master ${focus}: ${summary} Expert guidance and practical examples included.`,
        `Learn ${focus} quickly: ${summary} Step-by-step instructions and tips.`,
        `Complete ${focus} guide: ${summary} Everything you need to succeed.`,
        `${focus} made simple: ${summary} Clear explanations and real examples.`
      ];
      return pick(guidePatterns);
    } else if (analysis.contentType === 'tool') {
      const toolPatterns = [
        `Free ${focus} tool: ${summary} Get instant results and professional insights.`,
        `Online ${focus} calculator: ${summary} Fast, accurate, and easy to use.`,
        `${focus} made easy: ${summary} Powerful tool with instant results.`,
        `Try our ${focus} tool: ${summary} No signup required, immediate results.`
      ];
      return pick(toolPatterns);
    }
    
    const genericPatterns = [
      `Expert ${focus} resource: ${summary} Professional solutions you can trust.`,
      `Your ${focus} solution: ${summary} Reliable results and expert support.`,
      `Best ${focus} resource: ${summary} Comprehensive and user-friendly.`,
      `${focus} experts: ${summary} Trusted advice and proven methods.`
    ];
    return pick(genericPatterns);
  }
  
  function createVariation2(baseMeta, title, summary, keyword, tone, analysis) {
    // Third variation using different structure with more variety
    const focus = keyword || extractMainConcept(title);
    
    if (tone === 'urgent') {
      const urgentPatterns = [
        `Don't wait! Get ${focus} now. ${summary} Limited time - act today!`,
        `${focus} available now! ${summary} Hurry - limited availability!`,
        `Act fast: ${focus} special offer. ${summary} Don't miss out!`,
        `Limited time ${focus}: ${summary} Get yours before it's gone!`
      ];
      return pick(urgentPatterns);
    } else if (tone === 'friendly') {
      const friendlyPatterns = [
        `Looking for ${focus}? ${summary} Easy, helpful, and designed for everyone!`,
        `Need ${focus}? We've got you covered! ${summary} Simple and effective.`,
        `Find the perfect ${focus}: ${summary} Made simple for you.`,
        `${focus} made easy: ${summary} User-friendly and reliable.`
      ];
      return pick(friendlyPatterns);
    } else if (analysis.isProduct) {
      // Context-appropriate product language with variety
      if (summary.toLowerCase().includes('doctor') || summary.toLowerCase().includes('medical')) {
        const medicalPatterns = [
          `Access ${focus}: ${summary} Licensed professionals available now.`,
          `Professional ${focus} services: ${summary} Trusted medical experts.`,
          `${focus} consultations: ${summary} Secure and confidential care.`
        ];
        return pick(medicalPatterns);
      } else if (summary.toLowerCase().includes('course') || summary.toLowerCase().includes('learn')) {
        const educationPatterns = [
          `Enroll in ${focus}: ${summary} Comprehensive curriculum and expert instruction.`,
          `Learn ${focus} effectively: ${summary} Structured courses with proven results.`,
          `${focus} training program: ${summary} Expert-led education and certification.`
        ];
        return pick(educationPatterns);
      } else {
        const productPatterns = [
          `Discover ${focus}: ${summary} Professional quality and proven results.`,
          `Experience ${focus}: ${summary} Outstanding performance and value.`,
          `Get ${focus} today: ${summary} Reliable solution with excellent support.`,
          `Try ${focus}: ${summary} Satisfaction guaranteed with expert backing.`
        ];
        return pick(productPatterns);
      }
    }
    
    const genericPatterns = [
      `Complete ${focus} solution: ${summary} Everything you need to succeed.`,
      `Ultimate ${focus} resource: ${summary} Comprehensive and reliable.`,
      `${focus} that works: ${summary} Proven results and expert support.`,
      `Smart ${focus} choice: ${summary} Efficient and user-friendly.`
    ];
    return pick(genericPatterns);
  }
  
  function integrateKeyword(meta, keyword) {
    // Natural keyword integration without forcing
    if (meta.startsWith('Get ') || meta.startsWith('Use ')) {
      return meta.replace(/^(Get|Use)\s+/, `$1 ${keyword} - `);
    }
    
    return `${keyword}: ${meta.charAt(0).toLowerCase() + meta.slice(1)}`;
  }
  
  function optimizeLength(meta) {
    if (meta.length < 120) {
      // Extend if too short
      const extensions = [
        ' Get started today and see the difference.',
        ' Trusted by thousands of satisfied users.',
        ' Professional quality and exceptional results.',
        ' Everything you need to succeed, simplified.',
        ' Join the thousands who trust our expertise.'
      ];
      
      const extension = extensions[Math.floor(Math.random() * extensions.length)];
      if (meta.length + extension.length <= 160) {
        meta += extension;
      }
    }
    
    return safeTruncate(meta, 160);
  }
  
  function polishGrammar(meta) {
    // Simple grammar polish without over-processing
    meta = meta.replace(/\s+/g, ' ').trim();
    meta = meta.replace(/\s+([.,!?:;])/g, '$1');
    meta = meta.charAt(0).toUpperCase() + meta.slice(1);
    
    // Fix common issues
    meta = meta.replace(/\b(a|an)\s+(a|an)\b/gi, '$1');
    meta = meta.replace(/\.\s*\./g, '.');
    
    return meta;
  }



  function displayResult(bestMeta, variants = [], showAll = false) {
    // Update view state tracking
    isExpandedView = showAll;
    
    let resultHtml = `
      <div class="serp-preview">
        <div class="serp-title">${pageTitleInput.value || 'Your Page Title'}</div>
        <div class="serp-url">https://yoursite.com/page-url</div>
        <div class="serp-description">${bestMeta}</div>
      </div>
      <div class="meta-result-primary">
        <strong>Best Generated Description:</strong>
        <div class="meta-text">${bestMeta}</div>
      </div>
    `;
    
    // Smart display logic
    if (!showAll && variants.length > 1) {
      // Show "Generate More Options" button
      resultHtml += `
        <div class="more-options-section">
          <button class="btn btn-secondary" id="show-more-btn">Generate More Options</button>
        </div>
      `;
    } else if (showAll && variants.length > 1) {
      // Show all variants + "Regenerate All" button
      resultHtml += `<div class="variants-section">
        <h4>Alternative Options:</h4>`;
      
      variants.slice(1).forEach((variant, index) => {
        resultHtml += `
          <div class="variant-option" data-variant="${index + 1}">
            <div class="variant-text">${variant.text}</div>
            <div class="variant-score">Score: ${variant.score}/100</div>
            <button class="btn btn-secondary btn-sm use-variant-btn" data-text="${variant.text.replace(/"/g, '&quot;')}">Use This</button>
          </div>
        `;
      });
      
      resultHtml += `</div>`;
      
      // Update regenerate button text
      regenerateBtn.textContent = 'Regenerate All';
    }
    
    metaPreview.innerHTML = resultHtml;
    updateCharacterCount(bestMeta);
    copyBtn.disabled = false;
    regenerateBtn.disabled = false;
    
    // Add event listeners for "Use This" buttons
    const useVariantBtns = metaPreview.querySelectorAll('.use-variant-btn');
    useVariantBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const variantText = e.target.getAttribute('data-text').replace(/&quot;/g, '"');
        currentMetaDescription = variantText;
        isExpandedView = false; // Reset to minimal view when selecting a variant
        displayResult(variantText, [{ text: variantText, score: scoreMetaDescription(variantText, targetKeywordInput.value.trim()) }], false);
        regenerateBtn.textContent = 'Regenerate'; // Reset button text
      });
    });
    
    // Add event listener for "Generate More Options" button
    const showMoreBtn = document.getElementById('show-more-btn');
    if (showMoreBtn) {
      showMoreBtn.addEventListener('click', () => {
        displayResult(bestMeta, variants, true);
      });
    }
  }

  function updateCharacterCount(text) {
    const length = text.length;
    charCount.textContent = length;
    
    // Update length status with color coding
    if (length < 120) {
      lengthStatus.textContent = '(Too short - aim for 120-160)';
      lengthStatus.className = 'length-status warning';
    } else if (length >= 120 && length <= 160) {
      lengthStatus.textContent = '(Perfect length ✓)';
      lengthStatus.className = 'length-status success';
    } else {
      lengthStatus.textContent = '(Too long - may be truncated)';
      lengthStatus.className = 'length-status warning';
    }
  }

  function showError(message) {
    metaPreview.innerHTML = `<div class="error-message">${message}</div>`;
    charCount.textContent = '0';
    lengthStatus.textContent = '';
    copyBtn.disabled = true;
    regenerateBtn.disabled = true;
  }

  function clearAll() {
    pageTitleInput.value = '';
    contentSummaryInput.value = '';
    targetKeywordInput.value = '';
    toneSelect.value = 'professional';
    metaPreview.innerHTML = '<div class="preview-placeholder">Your generated meta description will appear here...</div>';
    charCount.textContent = '0';
    lengthStatus.textContent = '';
    copyBtn.disabled = true;
    regenerateBtn.disabled = true;
    currentMetaDescription = '';
    generatedVariants = [];
  }

  async function copyToClipboard() {
    try {
      await navigator.clipboard.writeText(currentMetaDescription);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy to Clipboard';
      }, 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = currentMetaDescription;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy to Clipboard';
      }, 2000);
    }
  }

  // Debounced real-time preview for title/summary changes
  function debouncedPreview() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (pageTitleInput.value.trim() || contentSummaryInput.value.trim()) {
        generateMetaDescription();
      }
    }, 800);
  }

  // Event listeners
  generateBtn.addEventListener('click', generateMetaDescription);
  clearBtn.addEventListener('click', clearAll);
  copyBtn.addEventListener('click', copyToClipboard);
  regenerateBtn.addEventListener('click', () => {
    // Force regeneration with different random selections
    generateMetaDescription();
  });
  
  // Real-time preview with debouncing
  pageTitleInput.addEventListener('input', debouncedPreview);
  contentSummaryInput.addEventListener('input', debouncedPreview);
  targetKeywordInput.addEventListener('input', debouncedPreview);
  toneSelect.addEventListener('change', debouncedPreview);
}

export function cleanup() {
  // Clear any pending timers
  const debounceTimer = null;
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
}