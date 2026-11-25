import { test, expect } from '@playwright/test';

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
    
    const results = page.locator('.tool-results');
    await expect(results).toBeVisible();
    test('should identify a clear passive construction and show review guidance', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');

    await page.locator('#text-input').fill('The report was written by John. John revised the report.');
    await page.locator('#analyze-btn').click();

    await expect(page.locator('#total-sentences')).toHaveText('2');
    await expect(page.locator('#passive-count')).toHaveText('1');
    await expect(page.locator('#highlighted-text')).toContainText('The report was written by John');
    await expect(page.locator('#suggestions-container')).toBeVisible();
  });

  test('should describe its rule-based limitations and avoid unsupported SEO claims', async ({ page }) => {
    await page.goto('/tools/passive-voice-detector/');
    await page.waitForLoadState('networkidle');

    const content = page.locator('.seo-content');
    await expect(content).toContainText('rule-based');
    await expect(content).toContainText('false positives');
    await expect(content).toContainText('Passive voice does not directly affect');
    await expect(content).not.toContainText('readability analyzer');
  });
});
});

// ============================================================
// VALUE PROPOSITION GENERATOR TESTS
// ============================================================

test.describe('Value Proposition Generator Functionality', () => {
  test('should have input fields', async ({ page }) => {
    await page.goto('/tools/value-proposition-generator/');
    await page.waitForLoadState('networkidle');
    
    const inputs = page.locator('input, textarea');
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });
  
  test('should have generate button', async ({ page }) => {
    await page.goto('/tools/value-proposition-generator/');
    await page.waitForLoadState('networkidle');
    
    const generateBtn = page.locator('button').first();
    await expect(generateBtn).toBeVisible();
  });
  
  test('should have results section', async ({ page }) => {
    await page.goto('/tools/value-proposition-generator/');
    await page.waitForLoadState('networkidle');
    
    const results = page.locator('.tool-results');
    await expect(results).toBeVisible();
  });
});


  test('should not invent evidence-based marketing claims', async ({ page }) => {
    await page.goto('/tools/value-proposition-generator/');
    await page.waitForLoadState('networkidle');

    await page.locator('#target-audience').fill('small business owners');
    await page.locator('#main-problem').fill('manual reporting');
    await page.locator('#product-name').fill('Report Helper');
    await page.locator('#key-feature').fill('automated report drafts');
    await page.locator('#key-benefit').fill('faster report preparation');
    await page.locator('#generate-btn').click();

    const results = page.locator('#results-container');
    await expect(results).toContainText('Report Helper');
    await expect(results).not.toContainText(/10x faster|join thousands|award-winning|the only/i);
  });

  test('should render user-provided invoice content as text, not markup', async ({ page }) => {
    await page.goto('/tools/invoice-generator/');
    await page.waitForLoadState('networkidle');

    await page.locator('#from-company').fill('<img src=x onerror=alert(1)>');
    await expect(page.locator('#invoice-preview img')).toHaveCount(0);
    await expect(page.locator('#invoice-preview')).toContainText('<img src=x onerror=alert(1)>');
  });

// ============================================================
// MEETING COST CALCULATOR TESTS
// ============================================================

test.describe('Meeting Cost Calculator Functionality', () => {
  test('should have number inputs', async ({ page }) => {
    await page.goto('/tools/meeting-cost-calculator/');
    await page.waitForLoadState('networkidle');
    
    const numberInputs = page.locator('input[type="number"]');
    const count = await numberInputs.count();
    expect(count).toBeGreaterThanOrEqual(2);
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
