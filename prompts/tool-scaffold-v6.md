I am working on the project defined in our `PROJECT_RULES.md`. You MUST adhere to the **Foundation Compliance System** (Section 10) and **Complete Tool Development Checklist** (Section 13).

**TASK:** Create a new **[simple/complex]** tool called **[Tool Name]**.

**CRITICAL ANTI-HALLUCINATION RULES:**
❌ NEVER write: `class="btn-primary"` → ✅ ALWAYS: `class="btn btn-primary"`
❌ NEVER write: `<h1>` in render() → ✅ app.js generates H1 automatically  
❌ NEVER write: `color: #333;` → ✅ ALWAYS: `color: var(--text-primary);`
❌ NEVER write: `<div class="main-wrapper">` → ✅ ALWAYS: `<div class="tool-container">`

**MANDATORY FOUNDATION REQUIREMENTS:**
* **HTML Structure:** You MUST use this EXACT pattern:
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
      <!-- SEO content placeholder -->
    </div>
  </div>
</div>
```

* **CSS Rules:** ONLY foundation classes: `.btn.btn-primary` (NOT `.btn-primary`), `.form-group`, `.tool-container`. Use CSS variables: `var(--primary-color)`, `var(--space-4)`. ALL styles scoped to `.[tool-slug]-tool`.

* **JavaScript:** Export `render()` (HTML string) and `init()` (functionality). **CRITICAL:** NO H1 tags in render() - app.js generates H1 automatically.

**TOOL FUNCTIONALITY:**
[Describe specific requirements]

**SEO:**
* **Title:** Under 60 chars, includes primary keyword
* **Description:** 150-160 chars
* **Keywords:** Primary, secondary, related keywords

**BEFORE PROVIDING CODE, VERIFY:**
1. Search your render() for `<h1` - if found, DELETE it
2. Search your HTML for `"btn-primary"` - ensure it has `"btn "` prefix
3. Search your CSS for hex colors (#) - replace with CSS variables
4. Verify every div class exists in foundation system

**BEFORE PROVIDING YOUR ANSWER, PERFORM THIS SELF-VALIDATION:**

**Validation Checklist - Answer YES/NO to each:**
1. Does my HTML use the EXACT structure pattern above? YES/NO
2. Does my render() function contain ZERO H1 tags? YES/NO  
3. Do I use `.btn.btn-primary` (NOT `.btn-primary`)? YES/NO
4. Are ALL my CSS variables (no hardcoded colors/spacing)? YES/NO
5. Are ALL styles scoped to `.[tool-slug]-tool`? YES/NO
6. Does my JavaScript export both render() and init()? YES/NO
7. Is my meta title under 60 characters? YES/NO
8. Will this work on 375px mobile width? YES/NO

**If ANY answer is NO, fix the issue before providing your response.**

**OUTPUT REQUIRED:**
1. Your validation checklist answers (8 YES answers required)
2. Complete `src/tools/[tool-slug]/index.js`
3. Complete `src/tools/[tool-slug]/style.css` 
4. JSON entry for `tool-registry.json`
