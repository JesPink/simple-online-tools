# Playwright Testing Workflow Guide

## 🎯 **Purpose**

Catch bugs in **30 seconds locally** instead of **30 minutes** in the deploy-wait-check cycle.

This testing infrastructure validates:
- **Foundation compliance** (responsive design, CSS architecture, SEO)
- **Tool functionality** (each tool's unique features work correctly)
- **Cross-browser compatibility** (Chrome, Firefox, Safari)
- **Cross-device testing** (mobile, tablet, desktop)

---

## 📋 **Test Coverage**

### Foundation Tests (Universal - ALL 9 Tools)

Every tool must pass these tests:

#### **Responsive Design**
- ✅ No horizontal scroll at 375px (minimum mobile width)
- ✅ Touch targets minimum 44px × 44px
- ✅ Responsive layout at 768px (tablet)
- ✅ Desktop layout at 1280px

#### **SEO Requirements**
- ✅ Exactly one H1 tag (page title)
- ✅ Visible SEO content section (minimum 500 characters)
- ✅ Proper H2/H3 hierarchy (no H1 in content)
- ✅ Meta description 100-165 characters

#### **Foundation CSS Compliance**
- ✅ Uses `.tool-container` class
- ✅ Uses `.tool-interface` class
- ✅ All buttons have `.btn` class
- ✅ Tool scoping class `.[tool-slug]-tool`

#### **Performance**
- ✅ Loads within 2 seconds
- ✅ No JavaScript console errors

#### **Accessibility**
- ✅ Minimum 16px text size
- ✅ Focus indicators on interactive elements

### Tool-Specific Tests

Each tool has custom tests for its unique functionality:

- **Word Counter**: Real-time word/character count, reading time
- **Case Converter**: Multiple conversion modes (UPPER, lower, Title)
- **Invoice Generator**: Zoom controls, 2-column desktop layout, PDF generation
- **Passive Voice Detector**: Detection accuracy, highlighting, percentage
- **Value Proposition Generator**: Input fields, generation button
- **Meeting Cost Calculator**: Real-time cost calculation, timer controls
- **PDF Metadata Editor**: File upload, metadata fields
- **Meta Description Generator**: Character count, SEO validation
- **Recipe Scaler**: Ingredient scaling calculations

---

## 🚀 **Quick Start**

### Prerequisites

1. **Build the project first**:
```powershell
npm run build
```

2. **Start dev server** (in separate terminal):
```powershell
npm run serve
```

### Run All Tests

```powershell
npm test
```

This runs **all tests** across **6 browser/device configurations**:
- Mobile Chrome (375px)
- Mobile Safari (390px)
- Tablet (768px)
- Desktop Chrome (1280px)
- Desktop Firefox (1280px)
- Desktop Safari (1280px)

---

## 🧪 **Test Commands Reference**

### Core Commands

```powershell
# Run all tests (headless)
npm test

# Run tests with UI (visual interface)
npm run test:ui

# Run tests with browser visible (headed mode)
npm run test:headed

# Debug specific test (step through with breakpoints)
npm run test:debug

# View last test report (HTML)
npm run test:report
```

### Targeted Testing

```powershell
# Run only foundation tests (universal checks)
npm run test:foundation

# Run only tool-specific tests
npm run test:tools

# Run only mobile tests (375px)
npm run test:mobile

# Run only desktop tests (1280px)
npm run test:desktop
```

### Test Specific Tool

```powershell
# Test specific tool (e.g., invoice-generator)
npx playwright test --grep "invoice-generator"

# Test specific functionality (e.g., zoom controls)
npx playwright test --grep "zoom controls"
```

---

## 📊 **Understanding Test Results**

### Success Output

```
✓ Foundation Tests: word-counter > should render without horizontal scroll on 375px mobile (2s)
✓ Foundation Tests: word-counter > should have exactly one H1 tag (1s)
✓ Word Counter Functionality > should count words in real-time (1s)

Passed: 27 tests (9 tools × 3 foundation checks)
```

### Failure Output

```
✗ Foundation Tests: invoice-generator > should use 2-column layout on desktop
  Error: Expected grid-template-columns to have 2 columns, but got 1

  Expected: "1fr 1fr"
  Received: "1fr"

  Screenshot: test-results/invoice-generator-desktop-layout/screenshot.png
  Video: test-results/invoice-generator-desktop-layout/video.webm
```

### Artifacts Generated

When tests fail, Playwright captures:
- **Screenshots**: Visual evidence of failure state
- **Videos**: Recording of the entire test run
- **Trace files**: Detailed execution logs for debugging

View artifacts:
```powershell
npm run test:report
```

---

## 🔄 **Development Workflow Integration**

### Before Every Git Push

```powershell
# 1. Build the project
npm run build

# 2. Start dev server (separate terminal)
npm run serve

# 3. Run all tests
npm test

# 4. Fix any failures, then repeat

# 5. Once all tests pass:
git add .
git commit -m "Feature: Add new tool with full test coverage"
git push
```

### Adding New Tool

When you create a new tool:

1. **Build the tool** following Foundation compliance
2. **Add tool slug** to `TOOL_SLUGS` array in `tests/foundation.spec.js`
3. **Create tool-specific tests** in `tests/tools.spec.js`
4. **Run tests**:
```powershell
npm test
```
5. **Fix failures** until all tests pass

---

## 🛠️ **Test Maintenance**

### Updating Foundation Tests

If Foundation requirements change:

1. Edit `tests/foundation.spec.js`
2. Update assertion logic (e.g., new minimum width)
3. Run tests to validate changes:
```powershell
npm run test:foundation
```

### Updating Tool-Specific Tests

If tool functionality changes:

1. Edit `tests/tools.spec.js`
2. Update test logic for specific tool
3. Run targeted test:
```powershell
npx playwright test --grep "tool-name"
```

### Adding New Test Cases

```javascript
test('should have new feature', async ({ page }) => {
  await page.goto('/tools/tool-slug.html');
  await page.waitForLoadState('networkidle');
  
  const newFeature = page.locator('.new-feature');
  await expect(newFeature).toBeVisible();
});
```

---

## 🐛 **Debugging Failed Tests**

### Strategy 1: Visual Debugging (UI Mode)

```powershell
npm run test:ui
```

- Opens interactive UI
- Click on failed test
- See screenshots/videos inline
- Re-run specific tests

### Strategy 2: Headed Mode (Watch Browser)

```powershell
npm run test:headed
```

- Opens real browser
- Watch test execution in real-time
- See exactly what's happening

### Strategy 3: Debug Mode (Step Through)

```powershell
npm run test:debug
```

- Opens Playwright Inspector
- Step through test line-by-line
- Inspect page state at each step
- Use browser DevTools

### Strategy 4: Screenshot Analysis

After test failure:

```powershell
npm run test:report
```

- Open HTML report
- View screenshot of failure
- Compare to expected state

---

## 📱 **Mobile-Specific Testing**

### Test Mobile Layout Issues

```powershell
# Run all mobile tests
npm run test:mobile

# Test specific mobile issue
npx playwright test --project='Mobile Chrome' --grep "horizontal scroll"
```

### Common Mobile Issues Caught

- Horizontal scrollbar (viewport overflow)
- Touch targets too small (<44px)
- Text too small (<16px)
- Fixed-width containers breaking layout

---

## 💻 **Desktop-Specific Testing**

### Test Desktop Layout Issues

```powershell
# Run all desktop tests
npm run test:desktop

# Test specific desktop issue
npx playwright test --project='Desktop Chrome' --grep "2-column"
```

### Common Desktop Issues Caught

- Single-column layout instead of multi-column
- Grid not activating at breakpoint
- Desktop-specific CSS not loading
- Layout shifting on larger screens

---

## 🎯 **Performance Testing**

### Load Time Validation

All tools must load in **under 2 seconds**:

```javascript
test('should load within 2 seconds', async ({ page }) => {
  const startTime = Date.now();
  await page.goto('/tools/tool-slug.html');
  await page.waitForLoadState('networkidle');
  const loadTime = Date.now() - startTime;
  
  expect(loadTime).toBeLessThan(2000); // ✅ Pass if <2s
});
```

If test fails:
- Check asset sizes (CSS/JS bundles)
- Verify cache busting working correctly
- Profile page with Chrome DevTools

---

## 🔍 **SEO Testing**

### Validate SEO Content Extraction

Foundation tests verify:
- SEO content section exists (`.seo-content`)
- Minimum 500 characters of content
- No H1 tags in SEO content
- Proper H2/H3 hierarchy

If SEO test fails:
- Check `esbuild.config.js` extraction logic
- Verify `extractNestedDivContent()` function
- Build and inspect `dist/tools/[slug].html`

---

## 📈 **Test Reports**

### HTML Report (Visual)

```powershell
npm run test:report
```

Shows:
- Pass/fail summary
- Screenshots of failures
- Video recordings
- Execution timeline

### JSON Report (CI/CD)

Located at: `test-results/test-results.json`

Use for:
- CI/CD pipeline integration
- Automated notifications
- Historical tracking

---

## 🚨 **Troubleshooting**

### "baseURL is not available" Error

**Cause**: Dev server not running

**Solution**:
```powershell
# Terminal 1: Start dev server
npm run serve

# Terminal 2: Run tests
npm test
```

### "Timeout exceeded" Errors

**Cause**: Page loading too slowly

**Solutions**:
1. Increase timeout in `playwright.config.js`
2. Check network performance
3. Verify `npm run build` completed successfully

### "Element not found" Errors

**Cause**: Selector doesn't match HTML structure

**Solutions**:
1. Run test in headed mode: `npm run test:headed`
2. Inspect actual HTML in browser
3. Update test selector to match reality

### All Tests Failing Immediately

**Cause**: Project not built

**Solution**:
```powershell
npm run build
npm run serve
npm test
```

---

## 🎓 **Best Practices**

### 1. Build Before Testing
Always build the project before running tests:
```powershell
npm run build && npm test
```

### 2. Test Locally Before Pushing
Run full test suite before `git push`:
```powershell
npm test
```

### 3. Fix Failures Immediately
Don't accumulate test failures. Fix them when they appear.

### 4. Use Descriptive Test Names
```javascript
// ✅ Good
test('should render without horizontal scroll on 375px mobile', ...)

// ❌ Bad
test('mobile test', ...)
```

### 5. Keep Tests Fast
- Use `waitForLoadState('networkidle')` instead of arbitrary `waitForTimeout()`
- Don't wait longer than necessary

---

## 📚 **Additional Resources**

- **Playwright Documentation**: https://playwright.dev
- **Foundation CSS Reference**: `src/styles/base.css`, `src/styles/layout.css`
- **Project Rules**: `PROJECT_RULES.md`

---

## 🎉 **Success Criteria**

Your tool is **production-ready** when:

✅ All foundation tests pass (responsive, SEO, CSS)
✅ All tool-specific tests pass (functionality)
✅ Tests pass on mobile, tablet, and desktop
✅ Tests pass in Chrome, Firefox, and Safari
✅ No console errors detected
✅ Load time under 2 seconds

**Then you can confidently deploy!** 🚀
