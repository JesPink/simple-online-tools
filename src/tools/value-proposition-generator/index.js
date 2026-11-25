export function render() {
  return `
    <div class="value-proposition-generator-tool">
      <div class="tool-container">
        <div class="tool-interface">
          <div class="tool-main">
            <div class="form-section">
              <div class="section-title">Business Information</div>
              <div class="form-group">
                <label for="target-audience">Target Audience <span class="help-text">(Who you serve)</span></label>
                <input type="text" id="target-audience" placeholder="e.g., small business owners, marketers, students" />
              </div>
              <div class="form-group">
                <label for="main-problem">Main Problem They Face <span class="help-text">(Keep it concise)</span></label>
                <input type="text" id="main-problem" placeholder="e.g., finding qualified leads, managing time effectively" />
                <div class="example-text">Example: "wasting time on manual data entry"</div>
              </div>
              <div class="form-group">
                <label for="product-name">Product/Service Name</label>
                <input type="text" id="product-name" placeholder="e.g., CRM Pro, Marketing Automation Tool" />
              </div>
              <div class="form-group">
                <label for="key-feature">Key Feature <span class="help-text">(What your product does)</span></label>
                <input type="text" id="key-feature" placeholder="e.g., shared booking page, automated lead tracking" />
              </div>
              <div class="form-group">
                <label for="key-benefit">Main Benefit <span class="help-text">(Optional: what customers can gain)</span></label>
                <input type="text" id="key-benefit" placeholder="e.g., reduce manual steps, organize project feedback" />
                <div class="example-text">Only enter measurable outcomes you can substantiate.</div>
              </div>
              <div class="form-group">
                <label for="message-focus">Message focus</label>
                <select id="message-focus" class="form-control">
                  <option value="all">Explore all angles</option>
                  <option value="problem">Problem-focused</option>
                  <option value="feature">Feature-focused</option>
                  <option value="benefit">Benefit-focused</option>
                </select>
              </div>
              <div class="form-group">
                <label for="variation-count">Number of drafts</label>
                <select id="variation-count" class="form-control">
                  <option value="3">3 drafts</option>
                  <option value="5" selected>5 drafts</option>
                  <option value="8">8 drafts</option>
                </select>
              </div>
              <div class="form-actions">
                <button class="btn btn-primary" id="generate-btn">Generate Value Propositions</button>
                <button class="btn btn-secondary" id="refine-btn" disabled>Get More Variations</button>
              </div>
            </div>
          </div>
          
          <div class="tool-results">
            <h2>Generated Value Propositions <span id="results-counter"></span></h2>
            <div class="results-content">
              <div id="results-container">
                <p class="placeholder-text">Fill in the form and click "Generate Value Propositions" to see your results.</p>
              </div>
              <div class="results-actions" id="results-actions" style="display: none;">
                <button class="btn btn-secondary" id="select-all-btn">Select All Text</button>
                <button class="btn btn-secondary" id="copy-all-btn">Copy All</button>
              </div>
            </div>
          </div>
        </div>
        
        <div class="seo-content">
          <h2>Free Value Proposition and USP Generator</h2>
          <p>Use this value proposition generator to draft customer-focused messages from your audience, the problem they face, your product or service, a key feature, and an optional benefit. Choose a problem-, feature-, or benefit-focused angle, then generate 3, 5, or 8 template-based drafts to review and adapt for a website headline, sales introduction, product description, or elevator pitch.</p>
          <p>It is a writing aid, not an AI model, market-research tool, or competitor-analysis system. It does not verify whether a benefit is true, whether a claim is unique, or whether customers will respond to a message. Treat every generated statement as a draft and validate factual claims with your own product evidence and customer research.</p>

          <h2>How to Use the Value Proposition Maker</h2>
          <ol>
            <li><strong>Describe your audience:</strong> name a specific customer group rather than everyone.</li>
            <li><strong>State the problem:</strong> describe one need, frustration, or task that matters to that audience.</li>
            <li><strong>Enter your product or service:</strong> use the name customers recognize.</li>
            <li><strong>Add a feature:</strong> describe what the product actually does.</li>
            <li><strong>Enter a benefit (optional):</strong> explain the outcome customers can reasonably expect. If omitted, the drafts use the neutral phrase “your intended outcome” rather than inventing a result.</li>
            <li><strong>Generate and refine:</strong> compare the draft variations, rewrite awkward wording, and keep only statements supported by evidence.</li>
          </ol>

          <h2>Value Proposition vs. Unique Selling Proposition (USP)</h2>
          <p>A value proposition explains the value a customer can expect: who the offer is for, what problem it addresses, and what benefit it provides. A unique selling proposition (USP) focuses more specifically on the distinctive reason to choose one offer over alternatives. The ideas overlap, but they are not interchangeable: a useful value proposition does not need to claim that a product is completely unique.</p>
          <p>This generator can help draft either type of message when you supply a real differentiator in the feature or benefit fields. It does not discover that differentiator for you. Compare your draft with competing offers and customer feedback before describing something as unique, faster, cheaper, or better.</p>

          <h2>Value Proposition Statement Examples</h2>
          <p>Consider a hypothetical scheduling service for independent consultants:</p>
          <ul>
            <li><strong>Audience:</strong> independent consultants</li>
            <li><strong>Problem:</strong> coordinating appointments by email</li>
            <li><strong>Product:</strong> ClearSlot</li>
            <li><strong>Feature:</strong> a shared booking page with available time slots</li>
            <li><strong>Benefit:</strong> fewer scheduling messages</li>
          </ul>
          <p>A clear draft could be: “ClearSlot helps independent consultants reduce appointment back-and-forth with a shared booking page.” This is an illustrative example, not a claim about a real product or measured result. Notice that it identifies an audience, a problem, a feature, and a plausible benefit without inventing customer numbers or guaranteed outcomes.</p>

          <h2>What Makes a Strong Value Proposition?</h2>
          <ul>
            <li><strong>Specific audience:</strong> identify the people the offer is designed to help.</li>
            <li><strong>Relevant problem:</strong> use language customers actually use to describe their needs.</li>
            <li><strong>Clear solution:</strong> explain what the product does rather than relying on vague adjectives.</li>
            <li><strong>Credible benefit:</strong> connect the feature to an outcome you can substantiate.</li>
            <li><strong>Meaningful differentiation:</strong> explain a real distinction that matters to the customer, if one exists.</li>
          </ul>
          <p>Test the message with customer interviews, support questions, product usage, or controlled marketing experiments. A generator can help you explore wording, but only real feedback and evidence can show whether a proposition is persuasive.</p>

          <h2>Frequently Asked Questions</h2>
          <h3>What is a value proposition?</h3>
          <p>A value proposition is a concise explanation of who a product serves, what customer problem it addresses, and why its benefits are relevant. It helps a potential customer understand why the offer may be worth considering.</p>
          <h3>What is the difference between a value proposition and a USP?</h3>
          <p>A value proposition communicates the value an offer provides. A unique selling proposition emphasizes a distinctive reason to choose it over alternatives. A USP should be based on a real, supportable difference.</p>
          <h3>Does this tool use AI?</h3>
          <p>No. It uses predefined sentence templates and simple word substitutions in your browser. It does not call an AI service or research your market.</p>
          <h3>Does the generator perform competitor analysis?</h3>
          <p>No. It cannot see competitor products, compare prices, validate differentiation, or identify market gaps. Conduct that research separately before making comparative claims.</p>
          <h3>Can I use the output as website or sales copy?</h3>
          <p>Yes, as a starting draft. Edit it for clarity and make sure every factual, performance, pricing, and comparative claim is accurate and supported before publishing.</p>
          <h3>How long should a value proposition be?</h3>
          <p>Start with one clear sentence. Include only the audience, problem, solution, and most relevant benefit; add detail only when it helps a customer understand the offer.</p>

          <h2>Related Business and Writing Tools</h2>
          <p>Use the <a href="/tools/word-counter/">Word Counter</a> to keep a draft concise or the <a href="/tools/case-converter/">Case Converter</a> to format headings and supporting copy. These tools support editing; they do not validate your business claims.</p>
        </div></div>
      </div>
    </div>
  `;
}

export async function init() {
  // Neutral, input-grounded templates. Avoid unverified performance or uniqueness claims.
  const formulas = [
    { focus: 'problem', text: "For {audience}, {product} addresses {problem} with {feature}." },
    { focus: 'problem', text: "{product} gives {audience} a way to address {problem} using {feature}." },
    { focus: 'problem', text: "When {problem} is a challenge, {product} offers {feature} for {audience}." },
    { focus: 'problem', text: "{product} is designed for {audience} who need to address {problem} through {feature}." },
    { focus: 'problem', text: "A way for {audience} to work on {problem}: {product} with {feature}." },
    { focus: 'feature', text: "{product} provides {audience} with {feature} for addressing {problem}." },
    { focus: 'feature', text: "With {feature}, {product} helps {audience} approach {problem}." },
    { focus: 'feature', text: "{product} brings {feature} to {audience} working through {problem}." },
    { focus: 'feature', text: "For {audience}, {product} combines {feature} with a focus on {problem}." },
    { focus: 'feature', text: "{feature} is how {product} supports {audience} dealing with {problem}." },
    { focus: 'benefit', text: "{product} helps {audience} work toward {benefit} through {feature}." },
    { focus: 'benefit', text: "For {audience} seeking {benefit}, {product} offers {feature}." },
    { focus: 'benefit', text: "{product} connects {feature} with the goal of {benefit} for {audience}." },
    { focus: 'benefit', text: "A practical starting point for {audience} pursuing {benefit}: {product} and {feature}." },
    { focus: 'benefit', text: "{product} is built around {feature} to help {audience} pursue {benefit}." }
  ];

  const generateBtn = document.getElementById('generate-btn');
  const resultsContainer = document.getElementById('results-container');

  // Form inputs
  const targetAudienceInput = document.getElementById('target-audience');
  const mainProblemInput = document.getElementById('main-problem');
  const productNameInput = document.getElementById('product-name');
  const keyFeatureInput = document.getElementById('key-feature');
  const keyBenefitInput = document.getElementById('key-benefit');

    function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>\"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '\"': '&quot;',
      "'": '&#39;'
    })[character]);
  }

  function generateValueProposition(formula, inputs) {
    const safeInputs = Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, escapeHtml(value)]));
    return formula.text.replace(/\{(audience|problem|product|feature|benefit)\}/g, (_, key) => safeInputs[key] || '');
  }

  function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.style.background = 'var(--success-color)';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy text: ', err);
    });
  }

  function displayResults(propositions) {
    if (propositions.length === 0) {
      resultsContainer.innerHTML = '<p class="error-message">Please fill in all required fields to generate value propositions.</p>';
      resultsCounter.textContent = '';
      resultsActionsDiv.style.display = 'none';
      refineBtn.disabled = true;
      return;
    }

    const resultsHtml = propositions.map((proposition, index) => `
      <div class="result-item">
        <div class="result-number">${index + 1}.</div>
        <div class="result-text">${proposition}</div>
        <div class="result-actions">
          <button class="btn btn-secondary copy-btn" data-text="${proposition}">Copy</button>
        </div>
      </div>
    `).join('');

    resultsContainer.innerHTML = `
      <div class="results-grid">
        ${resultsHtml}
      </div>
    `;

    // Update counter and show action buttons
    resultsCounter.textContent = `(${propositions.length} variations)`;
    resultsActionsDiv.style.display = 'flex';
    refineBtn.disabled = false;

    // Add event listeners to copy buttons
    const copyButtons = resultsContainer.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const text = e.target.getAttribute('data-text');
        copyToClipboard(text, e.target);
      });
    });
  }

  generateBtn.addEventListener('click', () => {
    const inputs = {
      audience: targetAudienceInput.value.trim(),
      problem: mainProblemInput.value.trim(),
      product: productNameInput.value.trim(),
      feature: keyFeatureInput.value.trim(),
      benefit: keyBenefitInput.value.trim()
    };

    // Validate inputs (benefit is optional)
    if (!inputs.audience || !inputs.problem || !inputs.product || !inputs.feature) {
      displayResults([]); // This will show error message
      return;
    }

      if (!inputs.benefit) inputs.benefit = 'your intended outcome';

    const focus = document.getElementById('message-focus').value;
    const count = Number(document.getElementById('variation-count').value);
    const eligibleFormulas = focus === 'all' ? formulas : formulas.filter(formula => formula.focus === focus);
    const shuffled = [...eligibleFormulas].sort(() => Math.random() - 0.5);
    const propositions = shuffled.slice(0, Math.min(count, shuffled.length))
      .map(formula => generateValueProposition(formula, inputs));

    displayResults(propositions);
  });

  // Enable generate button when required fields are filled
  function checkFormValidity() {
    const requiredFields = [targetAudienceInput, mainProblemInput, productNameInput, keyFeatureInput];
    const allFilled = requiredFields.every(field => field.value.trim() !== '');
    generateBtn.disabled = !allFilled;
  }

  // Add input event listeners to all form fields
  [targetAudienceInput, mainProblemInput, productNameInput, keyFeatureInput, keyBenefitInput].forEach(input => {
    input.addEventListener('input', checkFormValidity);
    
    // Add Enter key support
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !generateBtn.disabled) {
        generateBtn.click();
      }
    });
  });

  // Add "Get More Variations" button functionality
  const refineBtn = document.getElementById('refine-btn');
  refineBtn.addEventListener('click', () => {
    // Re-run generation with different random selections
    generateBtn.click();
  });

  // Add Select All and Copy All functionality
  const selectAllBtn = document.getElementById('select-all-btn');
  const copyAllBtn = document.getElementById('copy-all-btn');
  const resultsActionsDiv = document.getElementById('results-actions');
  const resultsCounter = document.getElementById('results-counter');

  selectAllBtn.addEventListener('click', () => {
    const resultTexts = document.querySelectorAll('.result-item .result-text');
    if (window.getSelection) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      resultTexts.forEach(textEl => {
        const range = document.createRange();
        range.selectNodeContents(textEl);
        selection.addRange(range);
      });
    }
  });

  copyAllBtn.addEventListener('click', () => {
    const resultTexts = document.querySelectorAll('.result-item .result-text');
    const allText = Array.from(resultTexts).map(el => el.textContent).join('\n\n');
    copyToClipboard(allText, copyAllBtn);
  });

  // Initial form validation check
  checkFormValidity();
}