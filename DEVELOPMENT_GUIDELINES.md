# DEVELOPMENT GUIDELINES - MANDATORY COMPLIANCE

## 🚨 **CRITICAL RULES - ZERO TOLERANCE**

### 1. NEVER CREATE TOOLS MANUALLY

**⛔ FORBIDDEN ACTIONS:**
- Creating tool files manually
- Copying existing tools as templates  
- Modifying tool structure without scaffolding
- Bypassing foundation validation

**✅ REQUIRED ACTION:**
```bash
npm run create-tool -- --name="Tool Name" --type=simple --category=text-and-writing
```

### 2. FOUNDATION COMPLIANCE IS MANDATORY

**Every tool MUST follow these rules:**

#### HTML Structure (EXACT PATTERN REQUIRED)
```html
<div class="[tool-slug]-tool">
  <div class="tool-container">
    <div class="tool-interface">
      <div class="tool-main">
        <div class="form-section">
          <h3>Section Title</h3>
          <div class="form-group">
            <label for="input-id">Label</label>
            <input type="text" id="input-id" />
          </div>
          <div class="form-actions">
            <button class="btn btn-primary">Action</button>
          </div>
        </div>
      </div>
      <div class="tool-results">
        <h3>Results</h3>
        <div class="results-content"></div>
      </div>
    </div>
    <div class="seo-content">
      <!-- SEO content -->
    </div>
  </div>
</div>
```

#### CSS Rules (NO EXCEPTIONS)
- ✅ **USE**: `var(--primary-color)` 
- ❌ **NEVER**: `#2563eb` or any hex colors
- ✅ **USE**: `var(--space-4)`
- ❌ **NEVER**: `16px` or hardcoded spacing
- ✅ **USE**: `class="btn btn-primary"`
- ❌ **NEVER**: `class="btn-primary"`

#### JavaScript Exports (MANDATORY)
```javascript
export function render() {
  // NO H1 TAGS ALLOWED - app.js handles H1
  return `<div class="tool-slug-tool">...`;
}

export async function init() {
  // Tool functionality
}

export function cleanup() {
  // Memory cleanup
}
```

### 3. VALIDATION BEFORE COMMIT

**MANDATORY CHECKS:**
```bash
# 1. Strict validation
npm run validate:strict

# 2. Build test  
npm run build

# 3. Visual inspection at 375px width
# 4. Test all interactive elements
```

**If ANY validation fails → FIX IMMEDIATELY, no exceptions**

## 🛠️ **SCAFFOLDING SYSTEM**

### Tool Creation Command
```bash
npm run create-tool -- --name="[Tool Name]" --type=[simple|complex] --category=[category]
```

### Generated Files (ALL FOUNDATION COMPLIANT)
- `src/tools/[slug]/index.js` - Foundation HTML structure, proper exports
- `src/tools/[slug]/style.css` - CSS variables only, scoped styles
- Updates `tool-registry.json` - Proper metadata

### Customization Guidelines

#### ✅ ALLOWED Customizations:
- Tool-specific logic in `processText()` function
- SEO content in render() function  
- Tool-specific CSS within foundation scope
- Error handling and validation

#### ❌ FORBIDDEN Modifications:
- HTML structure changes
- Foundation class modifications
- Hardcoded CSS values
- H1 tag additions
- Manual registry edits

## 🔍 **VALIDATION SYSTEM**

### Validation Levels

#### Standard Mode (`npm run validate`)
- Checks critical errors
- Warns about violations  
- Allows build to continue

#### Strict Mode (`npm run validate:strict`)  
- Treats warnings as errors
- Blocks build on ANY violation
- Required for production commits

### Common Violations and Fixes

#### ❌ H1 Tag Found
```javascript
// WRONG
export function render() {
  return `<h1>My Tool</h1>`;
}

// CORRECT  
export function render() {
  return `<div class="my-tool-tool">`;
}
```

#### ❌ Wrong Button Classes
```html
<!-- WRONG -->
<button class="btn-primary">Click</button>

<!-- CORRECT -->
<button class="btn btn-primary">Click</button>
```

#### ❌ Hardcoded CSS
```css
/* WRONG */
.my-tool {
  background: #f8f9fa;
  padding: 20px;
}

/* CORRECT */
.my-tool-tool .custom-element {
  background: var(--bg-secondary);
  padding: var(--space-5);
}
```

## 📋 **PRE-COMMIT CHECKLIST**

**Before committing ANY tool changes:**

- [ ] Used `npm run create-tool` for new tools
- [ ] `npm run validate:strict` passes with zero warnings
- [ ] `npm run build` completes successfully
- [ ] Tool works on 375px mobile width
- [ ] All interactive elements are touch-friendly
- [ ] No console errors in browser
- [ ] SEO content is 800+ words
- [ ] Tool appears in correct category

**If ANY item fails → DO NOT COMMIT**

## 🚫 **VIOLATION CONSEQUENCES**

### Build Failures
- Cloudflare Pages deployment will fail
- All team development blocked
- Manual remediation required

### Code Quality Issues  
- Foundation compliance violations
- Mobile responsiveness problems
- SEO ranking impact

### Prevention Measures
- Automated validation in CI/CD
- Pre-commit hooks (coming soon)
- Mandatory code review
- Template enforcement

## 🆘 **EMERGENCY FIXES**

If you accidentally created violations:

### 1. Identify Issues
```bash
npm run validate:strict
```

### 2. Fix Common Problems
- Remove H1 tags from render()
- Replace hardcoded CSS with variables
- Fix button class format
- Ensure foundation structure

### 3. Re-validate
```bash
npm run validate:strict && npm run build
```

### 4. Commit Fix
```bash
git add .
git commit -m "Fix foundation compliance violations"
git push
```

## 📞 **GET HELP**

If you're unsure about ANY aspect:
1. Check existing compliant tools as reference
2. Use scaffolding system instead of manual creation
3. Run validation frequently during development
4. Test on mobile devices early and often

**Remember: It's easier to create tools correctly from the start than to fix violations later!**

---

**Last Updated: September 24, 2025**
**Version: 2.0 - Strict Compliance Enforcement**