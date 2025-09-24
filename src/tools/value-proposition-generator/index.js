export function render() {
  return `
    <div class="value-proposition-generator-tool">
      <div class="tool-container">
        <div class="tool-interface">
          <div class="tool-main">
            <div class="form-section">
              <h3>Business Information</h3>
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
                <input type="text" id="key-feature" placeholder="e.g., automated lead tracking, AI-powered insights" />
              </div>
              <div class="form-group">
                <label for="key-benefit">Main Benefit <span class="help-text">(What customers gain)</span></label>
                <input type="text" id="key-benefit" placeholder="e.g., save 10 hours weekly, double conversion rates" />
                <div class="example-text">Try to quantify results when possible</div>
              </div>
              <div class="form-actions">
                <button class="btn btn-primary" id="generate-btn">Generate Value Propositions</button>
                <button class="btn btn-secondary" id="refine-btn" disabled>Get More Variations</button>
              </div>
            </div>
          </div>
          
          <div class="tool-results">
            <h3>Generated Value Propositions <span id="results-counter"></span></h3>
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
          <h2>Understanding the Value Proposition Generator</h2>

          <p>A <strong>value proposition generator</strong> is an essential business messaging tool that helps entrepreneurs, marketers, and business professionals create compelling statements that clearly communicate what makes their product or service unique. In today's competitive marketplace, having a clear and persuasive value proposition can be the difference between capturing your audience's attention and losing them to competitors.</p>

          <p>Our value proposition generator simplifies the complex process of crafting powerful business messaging by providing proven frameworks and templates. Whether you're launching a startup, repositioning an existing product, or preparing an elevator pitch, this tool guides you through creating statements that resonate with your target audience and highlight your unique competitive advantages.</p>

          <p>The tool combines established marketing methodologies with user-friendly interfaces, making professional-quality value proposition development accessible to businesses of all sizes. From solo entrepreneurs to enterprise teams, anyone can use this generator to transform complex product features into clear, customer-focused benefits.</p>

          <h2>How to Use Our Value Proposition Generator</h2>

          <p>Creating an effective value proposition with our generator is straightforward and takes just minutes to complete. Follow these simple steps to develop compelling business messaging:</p>

          <p><strong>Step 1: Define Your Target Audience</strong><br>
          Enter details about your ideal customer, including their main challenges, goals, and demographics. The more specific you are, the more targeted your value proposition will become.</p>

          <p><strong>Step 2: Describe Your Product or Service</strong><br>
          Input key features, benefits, and capabilities of what you're offering. Focus on tangible outcomes and results your customers can expect.</p>

          <p><strong>Step 3: Identify Your Unique Differentiators</strong><br>
          Specify what sets you apart from competitors. This might include proprietary technology, superior service, cost advantages, or unique expertise.</p>

          <p><strong>Step 4: Select a Framework</strong><br>
          Choose from proven value proposition templates, including the classic "We help X achieve Y by doing Z" format, or more specific frameworks for different industries and business models.</p>

          <p><strong>Step 5: Generate and Refine</strong><br>
          Click generate to create multiple variations of your value proposition. Review, edit, and test different versions to find the most compelling message for your audience.</p>

          <h2>Value Proposition Maker: Your Strategic Messaging Partner</h2>

          <p>A <strong>value proposition maker</strong> serves as your strategic partner in developing clear, compelling business messaging that cuts through market noise. Unlike generic marketing tools, a specialized value proposition maker focuses specifically on the art and science of communicating unique value.</p>

          <p>The best value proposition makers combine psychological insights about customer decision-making with proven marketing frameworks. They understand that effective value propositions must address three critical elements: the problem your customer faces, the unique solution you provide, and the specific benefits they'll receive.</p>

          <p>Modern value proposition makers also incorporate A/B testing principles, allowing you to generate multiple variations and compare their effectiveness. This iterative approach helps refine your messaging until you achieve maximum impact with your target audience.</p>

          <p>Professional marketers rely on value proposition makers because they streamline the creative process while ensuring all essential elements are included. Rather than starting from a blank page, you begin with proven structures that have helped thousands of businesses communicate their value more effectively.</p>

          <h2>Crafting Powerful Messages with a Value Statement Generator</h2>

          <p>A <strong>value statement generator</strong> takes the guesswork out of creating persuasive business communications by providing structured approaches to message development. These tools recognize that effective value statements must be both emotionally compelling and logically sound.</p>

          <p>The most effective value statement generators incorporate multiple psychological triggers, including social proof, urgency, and benefit-focused language. They help transform product features into customer benefits, ensuring your message resonates with your audience's actual needs and desires.</p>

          <p>Advanced value statement generators also consider different communication contexts. The value statement you use on your homepage might differ from what you include in a sales presentation or elevator pitch. Each context requires tailored messaging that maintains your core value while adapting to specific audiences and situations.</p>

          <p>By using a value statement generator, you ensure consistency across all your marketing materials while maintaining the flexibility to customize messages for different channels and customer segments. This approach builds stronger brand recognition and more effective customer communication.</p>

          <h2>Unique Value Proposition Generator: Stand Out From the Competition</h2>

          <p>A <strong>unique value proposition generator</strong> specifically focuses on helping businesses identify and articulate what makes them genuinely different from competitors. In saturated markets, having a unique angle isn't just helpful—it's essential for survival and growth.</p>

          <p>These specialized generators guide you through competitive analysis exercises, helping identify gaps in the market that your business can fill. They prompt you to consider not just what you do, but how you do it differently and why that difference matters to customers.</p>

          <p>The most sophisticated unique value proposition generators incorporate market research principles, encouraging users to validate their perceived uniqueness against actual customer preferences and competitor offerings. This ensures your unique positioning is both authentic and market-relevant.</p>

          <p>Beyond differentiation, unique value proposition generators help quantify your advantages. Whether it's faster delivery, lower costs, superior results, or better service, they help you present your uniqueness in concrete, measurable terms that customers can easily understand and remember.</p>

          <h2>Frequently Asked Questions</h2>

          <p><strong>What makes a good value proposition, and how can a value proposition generator help?</strong><br>
          A good value proposition clearly states who you serve, what problem you solve, and why you're the best choice. A value proposition generator helps by providing proven frameworks, ensuring you include all essential elements, and offering multiple variations to test and refine.</p>

          <p><strong>How long should my value proposition be?</strong><br>
          The most effective value propositions are typically one to two sentences long—concise enough to be memorable but comprehensive enough to communicate your unique value. They should be readable in under 10 seconds and immediately clear to your target audience.</p>

          <p><strong>Can I use the same value proposition for different marketing channels?</strong><br>
          While your core value proposition should remain consistent, you may need slight variations for different channels. Social media posts might require shorter versions, while website headers can accommodate more detailed statements. The key is maintaining your central message while adapting the format.</p>

          <p><strong>How often should I update my value proposition?</strong><br>
          Review your value proposition quarterly and update it when you launch new products, enter new markets, or receive customer feedback indicating your current message isn't resonating. Market conditions and competitive landscapes change, so your messaging should evolve accordingly.</p>

          <p><strong>What's the difference between a value proposition and a mission statement?</strong><br>
          A value proposition focuses on customer benefits and addresses "why should I buy from you?" A mission statement describes your company's purpose and addresses "why do we exist?" Value propositions are customer-focused and sales-oriented, while mission statements are company-focused and purpose-driven.</p>

          <h2>Value Proposition Generator and Your Business Workflow</h2>

          <p>Integrating a value proposition generator into your business workflow creates a foundation for all your marketing and sales efforts. Once you've developed your core value proposition, it becomes the north star for website copy, sales presentations, advertising campaigns, and customer communications.</p>

          <p>The value proposition you create serves as a filter for business decisions, helping ensure all initiatives align with your core promise to customers. This consistency builds stronger brand recognition and more effective customer relationships over time.</p>

          <p>To maximize the impact of your newly created value proposition, consider pairing it with other essential business tools. Our <strong>Word Counter</strong> can help you keep your value proposition concise and impactful, while our <strong>Case Converter</strong> ensures consistent formatting across all your marketing materials. Together, these tools create a comprehensive toolkit for professional business communication.</p>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  // Value proposition formulas - organized by approach
  const formulas = [
    // Problem-Solution Focus
    "We help {audience} {verb} {problem} by providing {feature}.",
    "For {audience} struggling with {problem}, {product} delivers {adjective} {feature} that {verb} results.",
    "Transform your {problem} into success with {product}'s {adjective} {feature} designed for {audience}.",
    "Stop letting {problem} hold you back. {product} provides {adjective} {feature} built for {audience}.",
    
    // Benefit-Driven
    "{product} helps {audience} achieve {benefit} through {adjective} {feature}.",
    "Get {benefit} for your business with {product}'s proven {feature}.",
    "{audience} achieve {benefit} faster with {product}'s {feature}.",
    
    // Differentiation Focus
    "The only {product} that helps {audience} {verb} {problem} through {feature}.",
    "Unlike other solutions, {product} helps {audience} {verb} {problem} using our {adjective} {feature}.",
    "{audience} choose {product} because it's the {adjective} way to {verb} {problem}.",
    
    // Results-Oriented
    "Join thousands of {audience} who use {product} to {verb} {problem} with {feature}.",
    "{product}: The {adjective} solution that helps {audience} go from {problem} to {benefit}.",
    "Proven results: {audience} {verb} {problem} 10x faster with {product}'s {feature}.",
    
    // Direct & Action-Focused
    "Ready to {verb} {problem}? {product} provides {adjective} {feature} for {audience}.",
    "{audience} trust {product} to {verb} {problem} with our award-winning {feature}."
  ];

  // Compelling verbs and adjectives
  const verbs = ["achieve", "unlock", "simplify", "transform", "boost", "overcome", "eliminate", "streamline", "maximize", "optimize"];
  const adjectives = ["effortless", "data-driven", "personalized", "scalable", "proven", "innovative", "intelligent", "comprehensive", "powerful", "reliable"];

  const generateBtn = document.getElementById('generate-btn');
  const resultsContainer = document.getElementById('results-container');

  // Form inputs
  const targetAudienceInput = document.getElementById('target-audience');
  const mainProblemInput = document.getElementById('main-problem');
  const productNameInput = document.getElementById('product-name');
  const keyFeatureInput = document.getElementById('key-feature');
  const keyBenefitInput = document.getElementById('key-benefit');

  function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function generateValueProposition(formula, inputs) {
    const randomVerb = getRandomItem(verbs);
    const randomAdjective = getRandomItem(adjectives);
    
    return formula
      .replace('{audience}', inputs.audience)
      .replace('{problem}', inputs.problem)
      .replace('{product}', inputs.product)
      .replace('{feature}', inputs.feature)
      .replace('{benefit}', inputs.benefit)
      .replace('{verb}', randomVerb)
      .replace('{adjective}', randomAdjective);
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

    // Use "better results" as fallback if no benefit specified
    if (!inputs.benefit) {
      inputs.benefit = "better results";
    }

    // Generate 5 unique propositions using different formulas
    const selectedFormulas = [];
    const propositions = [];

    // Ensure we get unique formulas
    while (selectedFormulas.length < Math.min(5, formulas.length)) {
      const formula = getRandomItem(formulas);
      if (!selectedFormulas.includes(formula)) {
        selectedFormulas.push(formula);
        propositions.push(generateValueProposition(formula, inputs));
      }
    }

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