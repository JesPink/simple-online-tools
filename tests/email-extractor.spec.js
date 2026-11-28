import { readFile } from 'node:fs/promises';
import { test, expect } from '@playwright/test';

test.describe('Email Extractor', () => {
  test('extracts, groups, filters, and removes addresses from pasted text', async ({ page }) => {
    await page.goto('/tools/email-extractor/');
    await page.waitForLoadState('networkidle');
    await page.locator('#email-input').fill(
      'Contact jane@example.com on line one.\nSend a copy to JANE@example.com.\nFor support use help@example.org.'
    );
    await page.locator('#extract-emails-btn').click();

    await expect(page.locator('#email-unique-count')).toHaveText('2');
    await expect(page.locator('#email-occurrence-count')).toHaveText('3');
    await expect(page.locator('#email-domain-count')).toHaveText('2');
    await expect(page.locator('#email-results-list')).toContainText('jane@example.com');
    await expect(page.locator('#email-results-list')).toContainText('2 occurrences');
    await expect(page.locator('#email-results-list')).toContainText('Line 1');

    await page.locator('#email-domain-filter').fill('example.org');
    await expect(page.locator('#email-results-list')).toContainText('help@example.org');
    await expect(page.locator('#email-results-list')).not.toContainText('jane@example.com');

    await page.locator('#email-domain-filter').fill('');
    await page.locator('#show-occurrences').check();
    await expect(page.locator('#email-results-list')).toContainText('JANE@example.com');

    await page.locator('#email-removal-text').fill('[removed]');
    await page.locator('#create-clean-text-btn').click();
    await expect(page.locator('#email-clean-output')).toHaveValue(
      '--- Pasted text ---\nContact [removed] on line one.\nSend a copy to [removed].\nFor support use [removed].'
    );
  });

  test('recognizes bracketed obfuscation and respects the option toggle', async ({ page }) => {
    await page.goto('/tools/email-extractor/');
    await page.locator('#email-input').fill('Write to sales [at] example [dot] com.');
    await page.locator('#extract-emails-btn').click();
    await expect(page.locator('#email-results-list')).toContainText('sales@example.com');

    await page.locator('#include-obfuscated').uncheck();
    await page.locator('#extract-emails-btn').click();
    await expect(page.locator('#email-unique-count')).toHaveText('0');
  });

  test('reads supported text files and extracts HTML mailto links without script content', async ({ page }) => {
    await page.goto('/tools/email-extractor/');
    await page.locator('#email-files').setInputFiles({
      name: 'contacts.html',
      mimeType: 'text/html',
      buffer: Buffer.from('<p>Public: public@example.com</p><a href="mailto:help@example.org">Help</a><script>fake@script.com</script>')
    });
    await page.locator('#extract-emails-btn').click();

    await expect(page.locator('#email-unique-count')).toHaveText('2');
    await expect(page.locator('#email-results-list')).toContainText('public@example.com');
    await expect(page.locator('#email-results-list')).toContainText('help@example.org');
    await expect(page.locator('#email-results-list')).not.toContainText('fake@script.com');
    await expect(page.locator('#email-results-list')).toContainText('mailto link');
  });

  test('combines multiple files and preserves each source for duplicate matches', async ({ page }) => {
    await page.goto('/tools/email-extractor/');
    await page.locator('#email-files').setInputFiles([
      { name: 'first.txt', mimeType: 'text/plain', buffer: Buffer.from('Contact jane@example.com') },
      { name: 'second.csv', mimeType: 'text/csv', buffer: Buffer.from('email\\njane@example.com\\nhelp@example.org') }
    ]);
    await page.locator('#extract-emails-btn').click();
    await expect(page.locator('#email-unique-count')).toHaveText('2');
    await expect(page.locator('#email-occurrence-count')).toHaveText('3');
    await expect(page.locator('#email-results-list')).toContainText('first.txt');
    await page.locator('#email-results-list').getByText('View all 2 occurrences').click();
    await expect(page.locator('#email-results-list')).toContainText('second.csv');
  });

  test('includes and excludes exact domains and their subdomains', async ({ page }) => {
    await page.goto('/tools/email-extractor/');
    await page.locator('#email-input').fill(
      'jane@example.com\\nadmin@sub.example.com\\nblocked@blocked.com\\nother@company.org'
    );
    await page.locator('#extract-emails-btn').click();
    await page.locator('#email-include-domains').fill('example.com');
    await page.locator('#email-exclude-domains').fill('blocked.com');
    await expect(page.locator('#email-results-list')).toContainText('jane@example.com');
    await expect(page.locator('#email-results-list')).toContainText('admin@sub.example.com');
    await expect(page.locator('#email-results-list')).not.toContainText('blocked@blocked.com');
    await expect(page.locator('#email-results-list')).not.toContainText('other@company.org');
  });

  test('applies selected separators and optional lowercasing to plain-list downloads', async ({ page }) => {
    await page.goto('/tools/email-extractor/');
    await page.locator('#email-input').fill('Jane.Doe@Example.com\\nHelp@Example.org');
    await page.locator('#extract-emails-btn').click();
    await page.locator('#email-separator').selectOption('semicolon');
    await page.locator('#lowercase-plain-list').check();
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#download-txt-btn').click();
    const download = await downloadPromise;
    const filePath = await download.path();
    const contents = await readFile(filePath, 'utf8');
    expect(contents).toBe('jane.doe@example.com; help@example.org');
  });

  test('downloads a CSV with source-aware results', async ({ page }) => {
    await page.goto('/tools/email-extractor/');
    await page.locator('#email-input').fill('Contact jane@example.com');
    await page.locator('#extract-emails-btn').click();
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#download-csv-btn').click();
    const download = await downloadPromise;
    expect(download.suggestedFilename()).toBe('extracted-emails.csv');
  });

  test('does not send supplied text in analytics requests', async ({ page }) => {
    const secretSentinel = 'private-test-content-7b3d@example.invalid';
    const analyticsRequests = [];
    page.on('request', request => {
      if (/google-analytics\.com|googletagmanager\.com/.test(request.url())) {
        analyticsRequests.push(request.url() + ' ' + (request.postData() || ''));
      }
    });
    await page.goto('/tools/email-extractor/');
    await page.locator('#email-input').fill(secretSentinel);
    await page.locator('#extract-emails-btn').click();
    await page.waitForTimeout(500);
    expect(analyticsRequests.join('\n')).not.toContain(secretSentinel);
    const scripts = await page.locator('script').allTextContents();
    const analyticsScript = scripts.find(source => source.includes('window.simpleOnlineToolAnalytics'));
    expect(analyticsScript).toBeTruthy();
    expect(analyticsScript).toContain('const parameters = { tool_slug: toolSlug };');
    expect(analyticsScript).toContain('if (actionType) parameters.action_type = actionType;');
    expect(analyticsScript).not.toContain('email-input');
    expect(analyticsScript).not.toContain('email-files');
  });

  test('rejects unsupported document formats with a clear message', async ({ page }) => {
    await page.goto('/tools/email-extractor/');
    await page.locator('#email-files').setInputFiles({
      name: 'document.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('%PDF-1.7')
    });
    await page.locator('#extract-emails-btn').click();
    await expect(page.locator('#email-error')).toContainText('Unsupported file');
  });

  test('fits a narrow mobile viewport without horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/tools/email-extractor/');
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth
    }));
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
  });

  test('makes the website-scraping exclusion visible and has no URL input', async ({ page }) => {
    await page.goto('/tools/email-extractor/');
    await expect(page.getByText(/does not scan websites or discover new contacts/i)).toBeVisible();
    await expect(page.locator('input[type="url"]')).toHaveCount(0);
  });
});
