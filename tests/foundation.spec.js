import { test, expect } from '@playwright/test';

/**
 * Foundation Tests - Apply to ALL Tools
 * 
 * These tests validate that every tool follows the platform's
 * foundational requirements for responsive design, SEO, and
 * CSS architecture compliance.
 */

const TOOL_SLUGS = [
  'word-counter',
  'case-converter',
  'invoice-generator',
  'passive-voice-detector',
  'value-proposition-generator',
  'meeting-cost-calculator',
  'pdf-metadata-editor',
  'meta-description-generator',
  'recipe-scaler'
];

// Run foundation tests for each tool
for (const toolSlug of TOOL_SLUGS) {
  test.describe(`Foundation Tests: ${toolSlug}`, () => {
    
    // ============================================================
    // RESPONSIVE DESIGN TESTS
    // ============================================================
    
    test('should render without horizontal scroll on 375px mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(`/tools/${toolSlug}/`);
      
      // Wait for page to fully load
      await page.waitForLoadState('networkidle');
      
      // Check for horizontal scrollbar
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
    });
    
    test('should have minimum 44px touch targets on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto(`/tools/${toolSlug}/`);
      await page.waitForLoadState('networkidle');
      
      // Check all buttons
      const buttons = page.locator('button:visible');
      const buttonCount = await buttons.count();
      
      for (let i = 0; i < buttonCount; i++) {
        const button = buttons.nth(i);
        const box = await button.boundingBox();
        
        if (box) {
          expect(box.height).toBeGreaterThanOrEqual(44);
          expect(box.width).toBeGreaterThanOrEqual(44);
        }
      }
    });
    
    test('should use responsive layout on tablet (768px)', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto(`/tools/${toolSlug}/`);
      await page.waitForLoadState('networkidle');
      
      // Check that .tool-interface exists and is visible
      const toolInterface = page.locator('.tool-interface');
      await expect(toolInterface).toBeVisible();
      
      // Verify no horizontal scroll
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20); // Allow 20px tolerance
    });
    
    test('should use desktop layout on 1280px screen', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto(`/tools/${toolSlug}/`);
      await page.waitForLoadState('networkidle');
      
      // Check that layout is properly constrained
      const toolContainer = page.locator('.tool-container');
      await expect(toolContainer).toBeVisible();
      
      // Verify no horizontal scroll
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);
      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 20);
    });
    
    // ============================================================
    // SEO CONTENT TESTS
    // ============================================================
    
    test('should have exactly one H1 tag (page title)', async ({ page }) => {
      await page.goto(`/tools/${toolSlug}/`);
      await page.waitForLoadState('networkidle');
      
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);
      
      // Verify H1 is the tool title in header
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
      
      const h1Text = await h1.textContent();
      expect(h1Text?.trim().length).toBeGreaterThan(0);
    });
    
    test('should have visible SEO content section', async ({ page }) => {
      await page.goto(`/tools/${toolSlug}/`);
      await page.waitForLoadState('networkidle');
      
      // Look for SEO content inside the tool's scoping class to avoid the static hidden version
      const toolScope = `.${toolSlug}-tool`;
      const seoContent = page.locator(`${toolScope} .seo-content`);
      await expect(seoContent).toBeVisible();
      
      // Verify SEO content has substantial text (minimum 500 characters)
      const seoText = await seoContent.textContent();
      expect(seoText?.length || 0).toBeGreaterThan(500);
    });
    
    test('should have proper H2/H3 hierarchy in SEO content', async ({ page }) => {
      await page.goto(`/tools/${toolSlug}/`);
      await page.waitForLoadState('networkidle');
      
      // Look for SEO content inside the tool's scoping class
      const toolScope = `.${toolSlug}-tool`;
      
      // Check for H2 tags in SEO content
      const h2Count = await page.locator(`${toolScope} .seo-content h2`).count();
      expect(h2Count).toBeGreaterThan(0);
      
      // Verify no H1 tags in SEO content
      const h1InSeo = await page.locator(`${toolScope} .seo-content h1`).count();
      expect(h1InSeo).toBe(0);
    });
    
    test('should have complete meta description', async ({ page }) => {
      await page.goto(`/tools/${toolSlug}/`);
      
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      expect(metaDescription).toBeTruthy();
      expect(metaDescription?.length || 0).toBeGreaterThan(100);
      expect(metaDescription?.length || 0).toBeLessThan(165);
    });
    
    // ============================================================
    // FOUNDATION CSS COMPLIANCE TESTS
    // ============================================================
    
    test('should use foundation .tool-container class', async ({ page }) => {
      await page.goto(`/tools/${toolSlug}/`);
      await page.waitForLoadState('networkidle');
      
      const toolContainer = page.locator('.tool-container');
      await expect(toolContainer).toBeVisible();
    });
    
    test('should use foundation .tool-interface class', async ({ page }) => {
      await page.goto(`/tools/${toolSlug}/`);
      await page.waitForLoadState('networkidle');
      
      const toolInterface = page.locator('.tool-interface');
      await expect(toolInterface).toBeVisible();
    });
    
    test('should use foundation button classes (.btn)', async ({ page }) => {
      await page.goto(`/tools/${toolSlug}/`);
      await page.waitForLoadState('networkidle');
      
      // Check that all buttons inside the tool container have .btn class
      const buttons = page.locator('.tool-container button:visible, .tool-interface button:visible');
      const buttonCount = await buttons.count();
      
      if (buttonCount > 0) {
        for (let i = 0; i < buttonCount; i++) {
          const button = buttons.nth(i);
          const hasBtn = await button.evaluate(el => el.classList.contains('btn'));
          expect(hasBtn).toBe(true);
        }
      }
    });
    
    test('should have proper tool scoping class', async ({ page }) => {
      await page.goto(`/tools/${toolSlug}/`);
      await page.waitForLoadState('networkidle');
      
      // Check for tool-specific scoping class
      const scopingClass = `.${toolSlug}-tool`;
      const toolScope = page.locator(scopingClass);
      await expect(toolScope).toBeVisible();
    });
    
    // ============================================================
    // PERFORMANCE TESTS
    // ============================================================
    
    test('should load within 2 seconds', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto(`/tools/${toolSlug}/`);
      await page.waitForLoadState('networkidle');
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(2000);
    });
    
    test('should have no JavaScript console errors', async ({ page }) => {
      const consoleErrors = [];
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      
      await page.goto(`/tools/${toolSlug}/`);
      await page.waitForLoadState('networkidle');
      
      // Wait a bit for any delayed errors
      await page.waitForTimeout(1000);
      
      expect(consoleErrors).toHaveLength(0);
    });
    
    // ============================================================
    // ACCESSIBILITY TESTS
    // ============================================================
    
    test('should have readable text size (minimum 16px)', async ({ page }) => {
      await page.goto(`/tools/${toolSlug}/`);
      await page.waitForLoadState('networkidle');
      
      // Check body text font size
      const bodyFontSize = await page.locator('body').evaluate(el => {
        return window.getComputedStyle(el).fontSize;
      });
      
      const fontSize = parseInt(bodyFontSize);
      expect(fontSize).toBeGreaterThanOrEqual(16);
    });
    
    test('should have focus indicators on interactive elements', async ({ page }) => {
      await page.goto(`/tools/${toolSlug}/`);
      await page.waitForLoadState('networkidle');
      
      // Check first button for focus styles
      const firstButton = page.locator('button').first();
      if (await firstButton.count() > 0) {
        await firstButton.focus();
        
        // Verify outline or box-shadow exists
        const focusStyles = await firstButton.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            outline: styles.outline,
            boxShadow: styles.boxShadow
          };
        });
        
        const hasFocusIndicator = 
          focusStyles.outline !== 'none' || 
          focusStyles.boxShadow !== 'none';
        
        expect(hasFocusIndicator).toBe(true);
      }
    });
  });
}
