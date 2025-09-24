# Complete Tool Development Workflow

## Step 1: Tool Scaffold
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

**REGISTRY FIELDS (Phase 1 Tag-Based Architecture):**
* **primaryCategory:** Choose from: text-and-writing, productivity-and-business, files-and-docs, seo-and-marketing, utilities-and-conversion
* **tags:** Array of 5-7 relevant keywords/phrases for tool discovery (e.g., ["word count", "text analysis", "writing tools", "seo", "content creation"])
* **complexity:** "simple" (client-side only) or "complex" (requires server processing)
* **privacy:** "client-side" (data never leaves user's browser)

**BEFORE PROVIDING CODE, VERIFY:**
1. Search your render() for `<h1` - if found, DELETE it
2. Search your HTML for "btn-primary" or "btn-secondary" - ensure they are always prefixed with the "btn " class. (e.g., class="btn btn-primary")
3. Search your CSS for hex colors (#) - replace with CSS variables
4. Verify every div class exists in foundation system

**🚨 CRITICAL: USE SCAFFOLDING SYSTEM INSTEAD**

**Instead of manually creating tools, use:**
```bash
npm run create-tool -- --name="Tool Name" --type=simple --category=text-and-writing
```

**ONLY use manual creation if scaffolding system is unavailable.**

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
9. **NEW**: Would `npm run validate:strict` pass? YES/NO
10. **NEW**: Is this tool scaffolded (not manually created)? YES/NO

**If ANY answer is NO, fix the issue before providing your response.**

**OUTPUT REQUIRED:**
1. Your validation checklist answers (8 YES answers required)
2. Complete `src/tools/[tool-slug]/index.js`
3. Complete `src/tools/[tool-slug]/style.css` 
4. JSON entry for `tool-registry.json`

## Step 2: Error Detection & Correction  
**Critical Error Scan:**
1. **H1 Tag Check:** Search your render() function for `<h1` - if found, explain why this violates the rule and remove it
2. **Button Class Check:** Look for `class="btn-primary"` - should be `class="btn btn-primary"`  
3. **CSS Variable Check:** Find any hardcoded colors (#hex) or spacing (px values) - replace with CSS variables
4. **Structure Check:** Verify presence of `.tool-container`, `.tool-interface`, `.tool-main`
5. **Mobile Check:** Confirm this layout works at 375px width without horizontal scroll

**ENHANCED ERROR PREVENTION - NEW:**
6. **Logic Flow Check:** Does the tool actually process different inputs and produce different outputs?
7. **Event Listener Check:** Are all buttons and inputs properly connected to functions?
8. **Error Handling Check:** What happens with invalid/empty/large inputs?
9. **Performance Check:** Is there debouncing for real-time input processing?

**For each issue found, provide the corrected version.**
**If no issues found, confirm with: 'All validation checks passed.'


## Step 3: SEO Content Generation
Role: You are a world-class SEO Content Strategist and professional copywriter. Your expertise is in creating long-form, helpful content for tool-based websites that ranks #1 on Google. Write in a clear, helpful, and slightly informal tone, avoiding jargon.

Task: Generate comprehensive SEO content for the Value Proposition Generator tool page. The content must be between 800 and 1200 words of original, valuable content.

Keyword Strategy:

Main Keyword: value proposition generator (Use this naturally in the first paragraph, one FAQ, and the conclusion.)

Secondary Keywords: ["value proposition maker", "value statement generator", "unique value proposition generator"] (Each must have its own H2 section.)

Related Keywords: ["business messaging", "elevator pitch", "startup tools", "marketing tools", "value proposition canvas", "unique value proposition"] (Weave these naturally throughout the content.)

Content Structure:

Introduction (H2): "Understanding the Value Proposition Generator" - Include the main keyword in the first paragraph.

How-To (H2): "How to Use Our Value Proposition Generator" - Provide a step-by-step guide.

Deep Dive (H2s): Create one H2 section for each secondary keyword. Use compelling titles like "What is a Value Proposition Maker?" for each.

FAQ (H2): "Frequently Asked Questions" - Include 5 questions and answers. Ensure one question contains the main keyword.

Conclusion (H2): "Value Proposition Generator and Your Workflow" - Summarize the tool's value and suggest related tools like "Word Counter" or "Case Converter".

Task: Validate the following SEO content for the "Value Proposition Generator" tool against the checklist below. Do not generate new content; only validate and correct if necessary.

## Step 3.1: SEO Content Validation


[Paste the generated HTML content from Step 3a here]
Validation Checklist:

Word Count: Is the content between 800-1200 words? (Provide the word count) YES/NO

Main Keyword in First Paragraph: Does the first paragraph contain the main keyword value proposition generator naturally? YES/NO

Secondary Keywords Sections: Does each secondary keyword have its own H2 section? (List the H2 headings found) YES/NO

FAQ Count: Are there exactly 5 FAQ questions? YES/NO

Main Keyword in FAQ: Does one FAQ question contain the main keyword? YES/NO

No H1 Tags: Are there any H1 tags in the content? YES/NO

Main Keyword Placement: Is the main keyword used naturally in the first paragraph, one FAQ, and the conclusion? YES/NO

Related Tools in Conclusion: Does the conclusion suggest 1-2 related tools? YES/NO

Instructions:

For each checklist item, answer YES or NO.

If any item is NO, provide a corrected version of the HTML content that addresses all failed items.

If all items are YES, state: "✅ All validation checks passed. Content is ready for integration."

Output:

First, list the validation results for each item.

Then, if needed, provide the corrected HTML content. Otherwise, confirm validation.


## Step 4: Final Integration
**Final Integration for [Tool Name] with Error Prevention:**

**CRITICAL PRE-INTEGRATION CHECKS:**
Before integration, verify these items from your previous responses:

**Code Quality Verification:**
1. Does render() function have ZERO H1 tags? YES/NO
2. Does HTML follow exact foundation structure? YES/NO
3. Do buttons use `.btn.btn-primary` format? YES/NO
4. Are all colors/spacing using CSS variables? YES/NO

**If ANY check is NO, provide corrected code first.**

**ENHANCED VALIDATION - NEW:**
5. **Template Consistency Check:** Does navigation in `src/index.html` include this tool's category? YES/NO
6. **Functional Logic Test:** Have you verified the tool actually processes different inputs correctly? YES/NO
7. **Console Error Check:** Are there any JavaScript console errors when testing? YES/NO
8. **Mobile Touch Test:** Do all interactive elements work on mobile touch devices? YES/NO

**1. Registry Entry:**
{
  "slug": "[tool-slug]",
  "title": "[SEO Title - verify under 60 chars]",
  "description": "[Meta description - verify 150-160 chars]",
  "keywords": "[primary, secondary, tertiary]",
  "primaryCategory": "[text-and-writing | productivity-and-business | files-and-docs | seo-and-marketing | utilities-and-conversion]",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "complexity": "[simple | complex]",
  "privacy": "client-side",
  "type": "[simple/complex]",
  "jsPath": "./tools/[tool-slug]/index.js",
  "relatedTools": ["tool-1", "tool-2"],
  "author": "Free Tools Platform", 
  "datePublished": "2025-01-16"
}

**2. SEO Integration:**
[PASTE SEO CONTENT HERE]

Provide updated `render()` function integrating this SEO content into `.seo-content` div.

**3. Final Validation Report:**
Confirm compliance with these foundation rules:
- [ ] Mobile responsive (375px+ compatible)
- [ ] Foundation classes only (no custom .btn-primary)
- [ ] CSS variables usage (no hardcoded values)
- [ ] Proper HTML structure hierarchy
- [ ] No H1 tags in render() function
- [ ] Tool-specific styles scoped properly

**4. Post-Integration Testing Protocol - NEW:**
After integration, perform these tests:
- [ ] **Build Test**: Run `npm run build` - no errors?
- [ ] **Load Test**: Tool loads without console errors?
- [ ] **Function Test**: Enter different inputs - tool responds correctly?
- [ ] **Mobile Test**: Works on 375px width without horizontal scroll?
- [ ] **Navigation Test**: Tool appears in correct category navigation?

**TESTING EXAMPLES TO USE:**
For text analysis tools, test with:
- Empty input
- Short text (5 words)
- Medium text (100+ words)  
- Large text (1000+ words)
- Special characters and punctuation

**Provide final code ONLY after all validations AND tests pass.**
