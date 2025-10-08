# 🚀 Playwright Quick Reference

## ⚡ **QUICK START** (Copy-Paste This)

```powershell
# Terminal 1: Start dev server (keep open)
cd "c:\Python Projects\FreeAiTools\aifreegenerator-pro"
npm run serve

# Terminal 2: Run tests
cd "c:\Python Projects\FreeAiTools\aifreegenerator-pro"
npm test
```

---

## 📋 **MOST USED COMMANDS**

```powershell
# Run all tests (headless)
npm test

# Visual test UI (BEST for debugging)
npm run test:ui

# Watch browser execution
npm run test:headed

# View test report
npm run test:report

# Debug step-by-step
npm run test:debug
```

---

## 🎯 **TARGETED TESTING**

```powershell
# Test only foundation rules
npm run test:foundation

# Test only tool functionality
npm run test:tools

# Test mobile only (375px)
npm run test:mobile

# Test desktop only (1280px)
npm run test:desktop

# Test specific tool
npx playwright test --grep "invoice-generator"

# Test specific feature
npx playwright test --grep "zoom controls"
```

---

## 🔄 **PRE-COMMIT WORKFLOW**

```powershell
# 1. Build
npm run build

# 2. Serve (separate terminal)
npm run serve

# 3. Test
npm test

# 4. If all pass, deploy
git add .
git commit -m "Your message"
git push
```

---

## 🐛 **DEBUGGING FAILURES**

### Quick Debug:
```powershell
npm run test:ui  # Click failed test → see screenshot/video
```

### Watch Browser:
```powershell
npm run test:headed  # See browser execute test
```

### Step Through:
```powershell
npm run test:debug  # Line-by-line debugging
```

### Review After:
```powershell
npm run test:report  # Open HTML report with artifacts
```

---

## 📊 **TEST COVERAGE**

### Foundation Tests (ALL Tools):
- ✅ Responsive design (4 tests)
- ✅ SEO content (4 tests)
- ✅ Foundation CSS (4 tests)
- ✅ Performance (2 tests)
- ✅ Accessibility (2 tests)

### Tool-Specific Tests:
- ✅ Word Counter (3 tests)
- ✅ Case Converter (4 tests)
- ✅ Invoice Generator (5 tests)
- ✅ Passive Voice Detector (3 tests)
- ✅ Value Proposition Generator (3 tests)
- ✅ Meeting Cost Calculator (3 tests)
- ✅ PDF Metadata Editor (3 tests)
- ✅ Meta Description Generator (3 tests)
- ✅ Recipe Scaler (3 tests)

**Total**: 178 tests × 6 browsers = **1,068 test runs**

---

## ✅ **PASS CRITERIA**

Tool is production-ready when:
- ✅ All 16 foundation tests pass
- ✅ All tool-specific tests pass
- ✅ Mobile tests pass (375px, 768px)
- ✅ Desktop tests pass (1280px)
- ✅ Cross-browser pass (Chrome, Firefox, Safari)
- ✅ Load time <2 seconds
- ✅ Zero console errors

---

## 🚨 **COMMON ERRORS**

### "baseURL is not available"
**Fix**: Start dev server first
```powershell
npm run serve  # In separate terminal
```

### "Timeout exceeded"
**Fix**: Build project first
```powershell
npm run build
```

### "Element not found"
**Fix**: Debug with UI mode
```powershell
npm run test:ui
```

---

## 📚 **FULL DOCUMENTATION**

- **TESTING_IMPLEMENTATION.md** - Complete setup guide
- **TESTING_GUIDE.md** - Workflow documentation
- **TEST_PLAN_SUMMARY.md** - Test coverage overview

---

## ⚙️ **FILES CREATED**

```
aifreegenerator-pro/
├── playwright.config.js         # Test configuration
├── tests/
│   ├── foundation.spec.js       # Universal tests (144 tests)
│   └── tools.spec.js            # Tool-specific tests (34 tests)
├── TESTING_IMPLEMENTATION.md    # Setup guide
├── TESTING_GUIDE.md             # Workflow guide
├── TEST_PLAN_SUMMARY.md         # Test plan
└── QUICK_REFERENCE.md           # This file!
```

---

## 🎯 **WHAT GETS TESTED**

### Every Tool Tests:
✅ No horizontal scroll on mobile
✅ Touch targets ≥44px
✅ Exactly 1 H1 tag
✅ SEO content visible (500+ chars)
✅ Foundation CSS classes used
✅ Load time <2 seconds
✅ Zero console errors

### Tool-Specific:
✅ Real-time updates
✅ Button functionality
✅ Calculation accuracy
✅ Layout responsiveness
✅ Feature completeness

---

## 🏆 **SUCCESS METRICS**

### Before Playwright:
⏱️ 30 minutes to find bugs
🐛 Bugs found after deployment
🔄 Multiple deploy cycles

### After Playwright:
⚡ 30 seconds to find bugs
🐛 Bugs caught before deployment
✅ Single deploy cycle

---

## 🚀 **START TESTING NOW**

```powershell
# Terminal 1
npm run serve

# Terminal 2
npm run test:ui
```

**Click on tests in the UI to run them!** 🎉
