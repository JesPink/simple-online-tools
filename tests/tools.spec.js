import { test, expect } from '@playwright/test';
import { PDFDocument } from 'pdf-lib';

/**
 * Tool-Specific Functionality Tests
 * 
 * Each tool has unique functionality that needs validation:
 * - Word Counter: Real-time statistics calculation
 * - Case Converter: Multiple conversion modes
 * - Invoice Generator: Zoom controls, PDF generation
 * - Passive Voice Detector: Analysis and highlighting
 * - Value Proposition Generator: AI-powered generation
 * - Meeting Cost Calculator: Real-time cost calculation
 * - PDF Metadata Editor: File upload and metadata editing
 * - Meta Description Generator: SEO analysis and generation
 * - Recipe Scaler: Dynamic scaling calculations
 */

// ============================================================
// WORD COUNTER TESTS
// ============================================================

test.describe('Word Counter Functionality', () => {
  test('should count words in real-time', async ({ page }) => {
    await page.goto('/tools/word-counter/');
    await page.waitForLoadState('networkidle');
    
    const textarea = page.locator('#text-input');
    const wordCount = page.locator('#word-count');
    
    // Type text and verify count updates
    await textarea.fill('Hello world this is a test');
    await page.waitForTimeout(300); // Wait for animation/update
    
    const count = await wordCount.textContent();
    expect(parseInt(count.replace(/,/g, '') || '0')).toBe(6);
  });
  
  test('should calculate character count', async ({ page }) => {
    await page.goto('/tools/word-counter/');
    await page.waitForLoadState('networkidle');
    
    const textarea = page.locator('#text-input');
    await textarea.fill('Hello');
    await page.waitForTimeout(300);
    
    // Find character count stat
    const charCount = page.locator('#char-count');
    const count = await charCount.textContent();
    
    expect(parseInt(count.replace(/,/g, '') || '0')).toBe(5);
  });
  
  test('should show reading time estimate', async ({ page }) => {
    await page.goto('/tools/word-counter/');
    await page.waitForLoadState('networkidle');
    
    const textarea = page.locator('#text-input');
    await textarea.fill('Lorem ipsum dolor sit amet '.repeat(100));
    await page.waitForTimeout(400);
    
    const readingTime = page.locator('#reading-time');
    const time = await readingTime.textContent();
    
    expect(parseInt(time.replace(/,/g, '') || '0')).toBeGreaterThan(0);
  });
});

// ============================================================
// CASE CONVERTER TESTS
// ============================================================

test.describe('Case Converter Functionality', () => {
  test('should convert to uppercase', async ({ page }) => {
    await page.goto('/tools/case-converter/');
    await page.waitForLoadState('networkidle');
    
    const input = page.locator('#case-input');
    const uppercaseBtn = page.locator('button[data-case="upper"]');
    const output = page.locator('#case-output');
    
    await input.fill('hello world');
    await uppercaseBtn.click();
    await page.waitForTimeout(200);
    
    const outputText = await output.inputValue();
    expect(outputText).toBe('HELLO WORLD');
  });
  
  test('should convert to lowercase', async ({ page }) => {
    await page.goto('/tools/case-converter/');
    await page.waitForLoadState('networkidle');
    
    const input = page.locator('#case-input');
    const lowercaseBtn = page.locator('button[data-case="lower"]');
    const output = page.locator('#case-output');
    
    await input.fill('HELLO WORLD');
    await lowercaseBtn.click();
    await page.waitForTimeout(200);
    
    const outputText = await output.inputValue();
    expect(outputText).toBe('hello world');
  });
  
  test('should convert to title case', async ({ page }) => {
    await page.goto('/tools/case-converter/');
    await page.waitForLoadState('networkidle');
    
    const input = page.locator('#case-input');
    const titleBtn = page.locator('button[data-case="title"]');
    const output = page.locator('#case-output');
    
    await input.fill('hello world');
    await titleBtn.click();
    await page.waitForTimeout(200);
    
    const outputText = await output.inputValue();
    expect(outputText).toBe('Hello World');
  });
  
  test('should have copy button', async ({ page }) => {
    await page.goto('/tools/case-converter/');
    await page.waitForLoadState('networkidle');
    
    const copyBtn = page.locator('#copy-btn');
    await expect(copyBtn).toBeVisible();
  });
});

// ============================================================
// INVOICE GENERATOR TESTS
// ============================================================

test.describe('Invoice Generator Functionality', () => {
  test('should have zoom controls', async ({ page }) => {
    await page.goto('/tools/invoice-generator/');
    await page.waitForLoadState('networkidle');
    
    const zoomInBtn = page.locator('#zoom-in-btn');
    const zoomOutBtn = page.locator('#zoom-out-btn');
    
    await expect(zoomInBtn).toBeVisible();
    await expect(zoomOutBtn).toBeVisible();
  });
  
  test('should have invoice preview element', async ({ page }) => {
    await page.goto('/tools/invoice-generator/');
    await page.waitForLoadState('networkidle');
    
    const preview = page.locator('#invoice-preview');
    await expect(preview).toBeVisible();
  });
  
  test('should have form inputs', async ({ page }) => {
    await page.goto('/tools/invoice-generator/');
    await page.waitForLoadState('networkidle');
    
    const fromInput = page.locator('input, textarea').first();
    await expect(fromInput).toBeVisible();
  });
  
  test('should have download PDF button', async ({ page }) => {
    await page.goto('/tools/invoice-generator/');
    await page.waitForLoadState('networkidle');

    const downloadBtn = page.locator('#generate-pdf-btn, #download-pdf-btn').first();
    await expect(downloadBtn).toBeVisible();
  });
});

// ============================================================
// PASSIVE VOICE DETECTOR TESTS
// ============================================================

test.describe('Passive Voice Detector Functionality', () => {
  test('should have analyze button', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');
    
    const analyzeBtn = page.locator('#analyze-btn');
    await expect(analyzeBtn).toBeVisible();
  });
  
  test('should have text input', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');
    
    const textarea = page.locator('#text-input');
    await expect(textarea).toBeVisible();
  });
  
  test('should have results section', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('.tool-results')).toBeVisible();
  });

  test('should show explicit feedback when no passive patterns are found', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');

    await page.locator('#text-input').fill('The manager wrote the report.');
    await page.locator('#analyze-btn').click();

    await expect(page.locator('#passive-count')).toHaveText('0');
    await expect(page.locator('#suggestions-container')).toBeVisible();
    await expect(page.locator('#suggestions-container .no-suggestions')).toContainText('No passive-voice patterns detected');
  });


  test('should preserve original punctuation and avoid rewriting passive questions as statements', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');

    await page.locator('#text-input').fill('The report was written by John?');
    await page.locator('#analyze-btn').click();

    await expect(page.locator('#highlighted-text')).toContainText('The report was written by John?');
    await expect(page.locator('#highlighted-text')).not.toContainText('John.');
    await expect(page.locator('.apply-rewrite-btn')).toHaveCount(0);
  });

  test('should identify a clear passive construction', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');

    await page.locator('#text-input').fill('The report was written by John. John revised the report.');
    await page.locator('#analyze-btn').click();

    await expect(page.locator('#total-sentences')).toHaveText('2');
    await expect(page.locator('#passive-count')).toHaveText('1');
    await expect(page.locator('#highlighted-text')).toContainText('The report was written by John');
  });

  test('should not count common adjective-like participles as passive without a likely agent', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');

    await page.locator('#text-input').fill(
      'I am interested in the result. She is excited about the trip. He was tired after work. They got bored during the lecture. I was tired by the end of the day. I got bored by walking around.'
    );
    await page.locator('#analyze-btn').click();

    await expect(page.locator('#total-sentences')).toHaveText('6');
    await expect(page.locator('#passive-count')).toHaveText('0');
    await expect(page.locator('#suggestions-container .no-suggestions')).toBeVisible();
  });

  test('should retain adjective-like participles when a likely passive agent is named', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');

    await page.locator('#text-input').fill('The audience was surprised by the magician. The players were surprised by the referee.');
    await page.locator('#analyze-btn').click();

    await expect(page.locator('#passive-count')).toHaveText('2');
    await expect(page.locator('#highlighted-text')).toContainText('The audience was surprised by the magician');
  });


  test('should offer and apply a conservative active rewrite when the actor is explicit', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');
    await page.locator('#text-input').fill('The report was written by John.');
    await page.locator('#analyze-btn').click();
    const suggestion = page.locator('.suggestion-item');
    await expect(suggestion).toContainText('John wrote the report.');
    await expect(suggestion.locator('.apply-rewrite-btn')).toBeVisible();
    await suggestion.locator('.apply-rewrite-btn').click();
    await expect(page.locator('#text-input')).toHaveValue('John wrote the report.');
    await expect(page.locator('#passive-count')).toHaveText('0');
  });


  test('should recognize accented names as explicit agents', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');

    await page.locator('#text-input').fill('The report was written by Élodie.');
    await page.locator('#analyze-btn').click();

    await expect(page.locator('.suggestion-item')).toContainText('Élodie wrote the report.');
    await expect(page.locator('.apply-rewrite-btn')).toBeVisible();
  });


  test('should apply a rewrite to the selected occurrence when sentences are duplicated', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');

    await page.locator('#text-input').fill('The report was written by John. The report was written by John.');
    await page.locator('#analyze-btn').click();

    await expect(page.locator('.apply-rewrite-btn')).toHaveCount(2);
    await page.locator('.apply-rewrite-btn').nth(1).click();
    await expect(page.locator('#text-input')).toHaveValue('The report was written by John. John wrote the report.');
  });

  test('should not invent an actor or repeat the full original sentence in suggestions', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');
    const original = 'The report was written.';
    await page.locator('#text-input').fill(original);
    await page.locator('#analyze-btn').click();
    const suggestions = page.locator('#suggestions-list');
    await expect(suggestions).toContainText('actor is not stated');
    await expect(suggestions.locator('.apply-rewrite-btn')).toHaveCount(0);
    await expect(suggestions).not.toContainText(original);
  });

  test('should avoid unsafe rewrites when a sentence contains multiple passive auxiliaries', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');
    await page.locator('#text-input').fill('The tablets were uncovered and have been cataloged by university historians.');
    await page.locator('#analyze-btn').click();
    await expect(page.locator('#suggestions-list .apply-rewrite-btn')).toHaveCount(0);
  });


  test('should reject causal by-phrases but recognize agents with participial modifiers', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');

    await page.locator('#text-input').fill('She was excited by the prospect. I was tired by the end of the day. I got bored by walking around.');
    await page.locator('#analyze-btn').click();
    await expect(page.locator('#passive-count')).toHaveText('0');

    await page.locator('#text-input').fill('The audience was surprised by the visiting performers.');
    await page.locator('#analyze-btn').click();
    await expect(page.locator('#passive-count')).toHaveText('1');
    await expect(page.locator('.suggestion-item')).toContainText('The visiting performers surprised the audience.');
  });

  test('should conjugate present-tense rewrites using the named actor', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');

    await page.locator('#text-input').fill('The report is reviewed by the editor. The reports are reviewed by the editors.');
    await page.locator('#analyze-btn').click();

    await expect(page.locator('.suggestion-item').nth(0)).toContainText('The editor reviews the report.');
    await expect(page.locator('.suggestion-item').nth(1)).toContainText('The editors review the reports.');
  });

  test('should explain the rule-based limitations accurately', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');

    const content = page.locator('body');
    await expect(content).toContainText('heuristic pattern-based checker');
    await expect(content).toContainText('false positives');
    await expect(content).toContainText('There is no reason to rewrite every passive sentence for SEO.');
    await expect(content).not.toContainText('readability analyzer');

  });
});

// ============================================================
// VALUE PROPOSITION GENERATOR TESTS
// ============================================================

test.describe('Value Proposition Generator Functionality', () => {
  test('should have input fields and a generate button', async ({ page }) => {
    await page.goto('/tools/value-proposition-generator/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('#target-audience')).toBeVisible();
    await expect(page.locator('#main-problem')).toBeVisible();
    await expect(page.locator('#product-name')).toBeVisible();
    await expect(page.locator('#key-feature')).toBeVisible();
    await expect(page.locator('#generate-btn')).toBeVisible();
  });

  test('should disclose template-based generation and its limitations', async ({ page }) => {
    await page.goto('/tools/value-proposition-generator/');
    await page.waitForLoadState('networkidle');

    const content = page.locator('body');
    await expect(content).toContainText('predefined sentence templates');
    await expect(content).toContainText('does not call an AI service');
    await expect(content).toContainText('cannot see competitor products');
  });

  test('should generate useful drafts without inventing evidence-based claims', async ({ page }) => {
    await page.goto('/tools/value-proposition-generator/');
    await page.waitForLoadState('networkidle');

    await page.locator('#target-audience').fill('small business owners');
    await page.locator('#main-problem').fill('manual reporting');
    await page.locator('#product-name').fill('Report Helper');
    await page.locator('#key-feature').fill('automated report drafts');
    await page.locator('#key-benefit').fill('faster report preparation');
    await page.locator('#generate-btn').click();

    const results = page.locator('#results-container');
    await expect(results.locator('.result-item')).toHaveCount(5);
    await expect(results).toContainText('Report Helper');
    await expect(results).not.toContainText(/10x faster|join thousands|award-winning|the only/i);
    await expect(page.locator('#copy-all-btn')).toBeVisible();
    await expect(page.locator('#refine-btn')).toBeEnabled();
  });

  test('should allow the benefit to be omitted and still generate drafts', async ({ page }) => {
    await page.goto('/tools/value-proposition-generator/');
    await page.waitForLoadState('networkidle');

    await page.locator('#target-audience').fill('independent designers');
    await page.locator('#main-problem').fill('inconsistent client feedback');
    await page.locator('#product-name').fill('Design Review');
    await page.locator('#key-feature').fill('structured feedback forms');
    await page.locator('#generate-btn').click();

    await expect(page.locator('#results-container .result-item')).toHaveCount(5);
  });
});

// ============================================================
// MEETING COST CALCULATOR TESTS
// ============================================================

test.describe('Meeting Cost Calculator Functionality', () => {
  test('should expose participant name and hourly-rate inputs', async ({ page }) => {
    await page.goto('/tools/meeting-cost-calculator/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('#participant-name')).toBeVisible();
    await expect(page.locator('#hourly-rate')).toBeVisible();
    await expect(page.locator('#hourly-rate')).toHaveAttribute('type', 'number');
  });
  
  test('should have start button', async ({ page }) => {
    await page.goto('/tools/meeting-cost-calculator/');
    await page.waitForLoadState('networkidle');
    
    const buttons = page.locator('button');
    const count = await buttons.count();
    expect(count).toBeGreaterThan(0);
  });
  
  test('should have results display', async ({ page }) => {
    await page.goto('/tools/meeting-cost-calculator/');
    await page.waitForLoadState('networkidle');
    
    const results = page.locator('.tool-results');
    await expect(results).toBeVisible();
  });
});

// ============================================================
// PDF METADATA EDITOR TESTS
// ============================================================

test.describe('PDF Metadata Editor Functionality', () => {
  test('should have file upload input', async ({ page }) => {
    await page.goto('/tools/pdf-metadata-editor/');
    await page.waitForLoadState('networkidle');

    const uploadArea = page.locator('#upload-area');
    const fileInput = page.locator('input[type="file"]');

    await expect(uploadArea).toBeVisible();
    await expect(fileInput).toHaveCount(1);
  });
  
  test('should have form elements', async ({ page }) => {
    await page.goto('/tools/pdf-metadata-editor/');
    await page.waitForLoadState('networkidle');
    
    const formElements = page.locator('input, textarea, button');
    const count = await formElements.count();
    expect(count).toBeGreaterThan(0);
  });
});

// ============================================================
// META DESCRIPTION GENERATOR TESTS
// ============================================================

test.describe('Meta Description Generator Functionality', () => {
  test('should have text input', async ({ page }) => {
    await page.goto('/tools/meta-description-generator/');
    await page.waitForLoadState('networkidle');
    
    const textarea = page.locator('textarea');
    const count = await textarea.count();
    expect(count).toBeGreaterThan(0);
  });
  
  test('should have generate button', async ({ page }) => {
    await page.goto('/tools/meta-description-generator/');
    await page.waitForLoadState('networkidle');
    
    const generateBtn = page.locator('button').first();
    await expect(generateBtn).toBeVisible();
  });
});

// ============================================================
// RECIPE SCALER TESTS
// ============================================================

test.describe('Recipe Scaler Functionality', () => {
  test('should have servings input', async ({ page }) => {
    await page.goto('/tools/recipe-scaler/');
    await page.waitForLoadState('networkidle');
    
    const inputs = page.locator('input[type="number"]');
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });
  
  test('should have ingredient list input', async ({ page }) => {
    await page.goto('/tools/recipe-scaler/');
    await page.waitForLoadState('networkidle');
    
    const textarea = page.locator('textarea');
    const count = await textarea.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should preserve fractional precision when scaling larger quantities', async ({ page }) => {
    await page.goto('/tools/recipe-scaler/');
    await page.waitForLoadState('networkidle');

    await page.locator('#original-servings').fill('4');
    await page.locator('#target-servings').fill('6');
    await page.locator('#ingredients-input').fill('7 cups flour');
    await page.locator('#round-fractions').uncheck();
    await page.locator('#scale-btn').click();

    await expect(page.locator('#scaled-recipe')).toContainText('10.5 cups flour');
  });
});

// ============================================================
// SEO CONTENT ACCURACY REGRESSION TESTS
// ============================================================

test.describe('SEO content accuracy', () => {
  test('meta description drafts use supplied details without fabricated claims', async ({ page }) => {
    await page.goto('/tools/meta-description-generator/');
    await page.waitForLoadState('networkidle');

    await page.locator('#page-title').fill('Remote Work Policy');
    await page.locator('#content-summary').fill('Explains eligibility, equipment, and communication expectations for remote employees.');
    await page.locator('#target-keyword').fill('remote work policy');
    await page.locator('#tone-select').selectOption('urgent');
    await page.locator('#generate-btn').click();

    const draft = page.locator('.meta-text').first();
    const summary = 'Explains eligibility, equipment, and communication expectations for remote employees.';
    await expect(draft).toHaveText(summary);
    await expect(page.locator('#length-status')).toContainText('Google');

    await page.locator('#show-more-btn').click();
    const alternatives = page.locator('.variant-text');
    await expect(alternatives).toHaveCount(2);
    await expect(alternatives.nth(0)).toHaveText('Remote Work Policy: ' + summary);
    await expect(alternatives.nth(1)).toHaveText('Find remote work policy. ' + summary);
    await expect(page.locator('.variant-score')).toHaveCount(0);
  });

  test('meta generator preserves literal backslash sequences in summaries', async ({ page }) => {
    await page.goto('/tools/meta-description-generator/');
    await page.waitForLoadState('networkidle');

    const summary = String.raw`Keep \s+ and C:\temp\files exactly as written.`;
    await page.locator('#content-summary').fill(summary);
    await page.locator('#generate-btn').click();

    await expect(page.locator('.meta-text').first()).toHaveText(summary);
  });

  test('meta description preview treats supplied HTML as text', async ({ page }) => {
    await page.goto('/tools/meta-description-generator/');
    await page.waitForLoadState('networkidle');

    await page.locator('#page-title').fill('Example page');
    await page.locator('#content-summary').fill('<img src=x onerror="window.__injected=true"> describes the page.');
    await page.locator('#generate-btn').click();

    await expect(page.locator('#meta-preview img')).toHaveCount(0);
    await expect(page.locator('#meta-preview')).toContainText('<img');
  });

  test('recipe scaler explains its actual unit and cooking limitations', async ({ page }) => {
    await page.goto('/tools/recipe-scaler/');
    await page.waitForLoadState('networkidle');

    const content = page.locator('#tool-container .seo-content');
    await expect(content).toContainText('does not convert between');
    await expect(content).toContainText('does not adjust oven temperature, cooking time');
    await expect(content).not.toContainText('automatic conversion between metric and imperial');
  });
  test('About page describes the current tool collection and qualifies data handling', async ({ page }) => {
    await page.goto('/about/');
    await page.waitForLoadState('networkidle');

    const content = page.locator('.page-content');
    await expect(content).toContainText('data handling can differ by feature');
    await expect(content).toContainText('PDF Metadata Editor');
    await expect(content).toContainText('Recipe Scaler');
    await expect(content).not.toContainText('Your information never leaves your device');
  });


  test('PDF metadata editor clearly limits its sanitization claims', async ({ page }) => {
    await page.goto('/tools/pdf-metadata-editor/');
    await page.waitForLoadState('networkidle');

    const content = page.locator('#tool-container .seo-content');
    await expect(content).toContainText('does not guarantee removal');
    await expect(content).toContainText('creation or modification dates');
    await expect(content).toContainText('not a complete sanitization');
    await expect(content).not.toContainText('completely safe for sensitive documents');
  });

  test('tool pages do not emit generic HowTo structured data', async ({ page }) => {
    await page.goto('/tools/word-counter/');
    await page.waitForLoadState('networkidle');

    const schemaText = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(schemaText.join('\n')).not.toContain('"@type": "HowTo"');

    const schemas = schemaText.map((text) => JSON.parse(text));
    const breadcrumbSchemas = schemas.filter((schema) => schema['@type'] === 'BreadcrumbList');
    expect(breadcrumbSchemas).toHaveLength(1);
    const breadcrumb = breadcrumbSchemas[0];
    const visibleBreadcrumbs = await page.locator('.breadcrumbs a, .breadcrumbs .breadcrumb-current').allTextContents();
    const visibleToolName = visibleBreadcrumbs.at(-1).trim();
    expect(breadcrumb.itemListElement.map((item) => item.name)).toEqual(visibleBreadcrumbs.map((name) => name.trim()));
    await expect(page.locator('#tool-container h1')).toHaveText(visibleToolName);
    const webApplication = schemas.find((schema) => schema['@type'] === 'WebApplication');
    expect(webApplication.name).toBe(visibleToolName);
  });
});

// ============================================================
// MEETING COST CALCULATOR BEHAVIOR REGRESSION TESTS
// ============================================================


  test('category pages use canonical category and concise tool labels', async ({ page }) => {
    await page.goto('/category/text-and-writing/');
    await page.waitForLoadState('networkidle');

    await expect(page.locator('#tool-container h1')).toHaveText('Text & Writing Tools');
    const toolNames = await page.locator('#tool-container .tool-card h3').allTextContents();
    expect(toolNames.length).toBeGreaterThan(0);
    expect(toolNames.every((name) => !name.includes('|'))).toBe(true);
  });

  test('meeting cost page explains its formula and excludes unsupported ROI claims', async ({ page }) => {
    await page.goto('/tools/meeting-cost-calculator/');
    await page.waitForLoadState('networkidle');

    const content = page.locator('#tool-container .seo-content');
    await expect(content).toContainText('Combined hourly rate');
    await expect(content).toContainText('elapsed time in hours');
    await expect(content).toContainText('Not measured: Meeting quality, business value');
    await expect(content).not.toContainText('37% of their time in meetings');
    await expect(content).not.toContainText('Long-Term Meeting ROI Analysis');
  });

test.describe('Meeting Cost Calculator behavior', () => {
  test('renders participant names as text instead of HTML', async ({ page }) => {
    await page.goto('/tools/meeting-cost-calculator/');
    await page.waitForLoadState('networkidle');

    await page.locator('#participant-name').fill('<img src=x onerror="window.__injected=true">');
    await page.locator('#hourly-rate').fill('60');
    await page.locator('#add-participant-btn').click();

    await expect(page.locator('#participants-list img')).toHaveCount(0);
    await expect(page.locator('#participants-list')).toContainText('<img');
  });

  test('pause and resume preserves elapsed time and locks participant edits', async ({ page }) => {
    await page.goto('/tools/meeting-cost-calculator/');
    await page.waitForLoadState('networkidle');

    await page.locator('#participant-name').fill('Participant A');
    await page.locator('#hourly-rate').fill('60');
    await page.locator('#add-participant-btn').click();
    await page.locator('#start-timer-btn').click();
    await page.waitForTimeout(1100);

    await page.locator('#pause-timer-btn').click();
    const pausedTime = await page.locator('#timer-display').innerText();
    const pausedCost = await page.locator('#cost-display').innerText();
    await expect(page.locator('#participant-name')).toBeDisabled();

    await page.waitForTimeout(1100);
    await expect(page.locator('#timer-display')).toHaveText(pausedTime);
    await expect(page.locator('#cost-display')).toHaveText(pausedCost);

    await page.locator('#start-timer-btn').click();
    await page.waitForTimeout(1100);
    const resumedTime = await page.locator('#timer-display').innerText();
    expect(resumedTime).not.toBe(pausedTime);

    await page.locator('#reset-timer-btn').click();
    await expect(page.locator('#timer-display')).toHaveText('00:00:00');
    await expect(page.locator('#cost-display')).toContainText('0.00');
    await expect(page.locator('#participant-name')).toBeEnabled();
  });

  test('reset formats zero cost in the selected currency', async ({ page }) => {
    await page.goto('/tools/meeting-cost-calculator/');
    await page.waitForLoadState('networkidle');

    await page.locator('#currency-select').selectOption('EUR');
    await page.locator('#participant-name').fill('Participant A');
    await page.locator('#hourly-rate').fill('60');
    await page.locator('#add-participant-btn').click();
    await page.locator('#start-timer-btn').click();
    await page.waitForTimeout(1100);
    await page.locator('#reset-timer-btn').click();

    await expect(page.locator('#cost-display')).toContainText('€0.00');
  });
});

// ============================================================
// PDF METADATA EDITOR REGRESSION TESTS
// ============================================================

test.describe('PDF Metadata Editor behavior', () => {
  test('clears supported fields and enables the modified PDF download', async ({ page }) => {
    const pdf = await PDFDocument.create();
    pdf.setTitle('Sensitive test title');
    pdf.setAuthor('Private test author');
    pdf.setSubject('Internal subject');
    pdf.setKeywords(['alpha', 'beta']);
    pdf.setCreator('Test application');
    const bytes = Buffer.from(await pdf.save());

    await page.goto('/tools/pdf-metadata-editor/');
    await page.waitForLoadState('networkidle');
    await page.locator('#file-input').setInputFiles({
      name: 'metadata-test.pdf',
      mimeType: 'application/pdf',
      buffer: bytes
    });

    const metadata = page.locator('#metadata-display');
    await expect(metadata).toContainText('Sensitive test title');
    await expect(metadata).toContainText('Private test author');
    await expect(metadata).toContainText('alpha');

    await page.locator('#remove-all-btn').click();

    await expect(metadata).not.toContainText('Sensitive test title');
    await expect(metadata).not.toContainText('Private test author');
    await expect(metadata).not.toContainText('alpha');
    await expect(page.locator('#download-btn')).toBeEnabled();
  });

  test('the most recently selected PDF becomes the active document', async ({ page }) => {
    const firstPdf = await PDFDocument.create();
    firstPdf.setTitle('First selected PDF');
    const secondPdf = await PDFDocument.create();
    secondPdf.setTitle('Second selected PDF');

    await page.goto('/tools/pdf-metadata-editor/');
    await page.waitForLoadState('networkidle');

    const fileInput = page.locator('#file-input');
    await fileInput.setInputFiles({
      name: 'first.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from(await firstPdf.save())
    });
    await fileInput.setInputFiles({
      name: 'second.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from(await secondPdf.save())
    });

    await expect(page.locator('#metadata-display')).toContainText('Second selected PDF');
    await expect(page.locator('#metadata-display')).not.toContainText('First selected PDF');
  });
});
