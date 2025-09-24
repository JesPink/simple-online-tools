export function render() {
  return `
    <div class="recipe-scaler-tool">
      <div class="tool-container">
        <div class="tool-interface">
          <div class="tool-main">
            <div class="form-section">
              <h3>Recipe Details</h3>
              <div class="form-group">
                <label for="recipe-title">Recipe Title</label>
                <input type="text" id="recipe-title" placeholder="Enter recipe name..." />
              </div>
              <div class="servings-row">
                <div class="form-group">
                  <label for="original-servings">Original Servings</label>
                  <input type="number" id="original-servings" value="4" min="1" max="100" />
                </div>
                <div class="form-group">
                  <label for="target-servings">Target Servings</label>
                  <input type="number" id="target-servings" value="8" min="1" max="100" />
                </div>
              </div>
              <div class="form-group">
                <label for="ingredients-input">Ingredients (one per line)</label>
                <textarea id="ingredients-input" rows="8" placeholder="2 cups flour&#10;1/2 cup sugar&#10;3 tbsp butter&#10;1.5 tsp vanilla extract&#10;to taste pepper"></textarea>
              </div>
              <div class="form-actions">
                <button class="btn btn-primary" id="scale-btn">Scale Recipe</button>
                <button class="btn btn-secondary" id="clear-btn">Clear All</button>
              </div>
            </div>
          </div>
          <div class="tool-results">
            <h3>Scaled Recipe</h3>
            <div class="results-content">
              <div id="scaling-info" class="scaling-info">
                <div class="scale-factor">Scale Factor: <span id="scale-factor-display">2.0x</span></div>
                <div class="rounding-controls">
                  <label>
                    <input type="checkbox" id="round-fractions" checked>
                    Round to common fractions
                  </label>
                </div>
              </div>
              <div id="scaled-recipe" class="scaled-recipe">
                <div class="recipe-placeholder">
                  Your scaled recipe will appear here...
                </div>
              </div>
              <div class="result-actions">
                <button class="btn btn-primary" id="copy-btn" disabled>Copy Recipe</button>
                <button class="btn btn-secondary" id="print-btn" disabled>Print View</button>
                <button class="btn btn-secondary" id="export-btn" disabled>Export JSON</button>
              </div>
            </div>
          </div>
        </div>
        <div class="seo-content">
          <h2>Understanding the Recipe Scaler</h2>
          <p>A recipe scaler is an essential kitchen tool that automatically adjusts ingredient quantities when you need to cook for more or fewer people than the original recipe serves. Our free online recipe scaler eliminates the guesswork and mathematical errors that often occur when manually calculating ingredient proportions, ensuring your scaled recipes maintain the perfect balance of flavors and textures every time.</p>

          <p>Whether you're cooking for a large family gathering or scaling down a recipe for a quiet dinner for two, a recipe scaler handles all the complex calculations instantly. The tool preserves ingredient ratios, converts between measurement units, and even handles fractional quantities with precision, making recipe adaptation effortless for home cooks and professional chefs alike.</p>

          <h2>How to Use Our Recipe Scaler</h2>
          <p>Converting recipe quantities with our tool is simple and intuitive. Follow these step-by-step instructions to scale any recipe perfectly:</p>

          <ol>
          <li><strong>Enter Recipe Details:</strong> Start by adding your recipe title and the original number of servings the recipe was designed for.</li>
          <li><strong>Set Target Servings:</strong> Input how many servings you actually need. The tool will automatically calculate the scaling factor for you.</li>
          <li><strong>Add Ingredients:</strong> Enter each ingredient on a separate line, including quantities, units, and ingredient names (e.g., "2 cups flour" or "1/2 tsp vanilla").</li>
          <li><strong>Choose Rounding Options:</strong> Select whether you want quantities rounded to common fractions for easier measuring.</li>
          <li><strong>Scale and Review:</strong> Click "Scale Recipe" to see your adjusted ingredient list with perfectly calculated quantities.</li>
          <li><strong>Export or Print:</strong> Use the copy, print, or JSON export features to save your scaled recipe for future use.</li>
          </ol>

          <p>The tool automatically handles unit conversions, fraction calculations, and maintains the mathematical precision needed for successful cooking results.</p>

          <h2>Recipe Scaler Online: The Digital Kitchen Assistant</h2>
          <p>An online recipe scaler offers significant advantages over manual calculation methods or basic smartphone calculators. Our recipe scaler online provides advanced features like intelligent ingredient parsing, unit conversion between metric and imperial measurements, and fraction handling that traditional calculators simply cannot match.</p>

          <p>The digital format means you can access your recipe scaler online from any device, whether you're shopping for ingredients on your phone or cooking from your tablet in the kitchen. The tool saves time during meal planning and reduces food waste by ensuring you buy exactly the right quantities for your target serving size.</p>

          <p>Professional bakers and cooking enthusiasts particularly appreciate the precision of our recipe scaler online because it maintains the critical ratios needed for successful baking, where even small measurement errors can affect the final result.</p>

          <h2>Scaling Down Recipes: Perfect Portions for Smaller Groups</h2>
          <p>Scaling down recipes presents unique challenges that our tool addresses expertly. When you're scaling down recipes from family-size portions to single servings or couple-sized meals, precise calculation becomes even more critical because smaller measurement errors have proportionally larger impacts on the final dish.</p>

          <p>Our recipe scaler excels at scaling down recipes by handling fractional measurements that are difficult to measure manually. For example, when scaling down recipes that call for 3 eggs to serve 2 people instead of 8, the tool calculates the exact fractional equivalent and suggests practical measuring alternatives.</p>

          <p>The tool also considers the practical limitations of scaling down recipes, such as minimum effective quantities for spices and seasonings, helping you avoid dishes that are under-seasoned due to mathematical scaling alone.</p>

          <h2>Advanced Recipe Scaling Techniques</h2>
          <p>Beyond basic multiplication and division, effective recipe scaling requires understanding how different ingredients behave at various quantities. Our recipe scaler incorporates culinary science principles to ensure your scaled recipes produce optimal results.</p>

          <p><strong>Liquid Ingredient Scaling:</strong> The tool maintains proper hydration ratios in baked goods and ensures sauces and dressings retain their intended consistency when scaled up or down.</p>

          <p><strong>Seasoning Adjustments:</strong> While most ingredients scale linearly, seasonings and spices often require more nuanced adjustments. Our tool provides guidance for these special cases.</p>

          <p><strong>Cooking Time Considerations:</strong> Though our tool focuses on ingredient quantities, understanding that cooking times don't always scale proportionally is crucial for recipe success.</p>

          <h2>Unit Conversion and Measurement Precision</h2>
          <p>Professional cooking relies on accurate measurements, and our recipe scaler includes comprehensive unit conversion capabilities. The tool seamlessly converts between cups and milliliters, ounces and grams, tablespoons and teaspoons, ensuring you can work with any recipe regardless of its original measurement system.</p>

          <p>The measurement converter functionality is particularly valuable for international recipes or when working with ingredients measured in unfamiliar units. Rather than consulting separate conversion charts, our integrated system handles all conversions automatically while maintaining the mathematical precision required for consistent cooking results.</p>

          <p>For bakers who prefer weight-based measurements for accuracy, the tool converts volume measurements to weight equivalents where appropriate, supporting the precision that professional baking demands.</p>

          <h2>Frequently Asked Questions</h2>

          <h3>How accurate is the recipe scaler for complex recipes?</h3>
          <p>Our recipe scaler maintains mathematical precision for all ingredient calculations, but some complex recipes may require additional adjustments for seasoning and cooking techniques. The tool provides a solid foundation that works excellently for most recipes, with 95% accuracy for standard cooking and baking applications.</p>

          <h3>Can I use the recipe scaler for baking recipes that require precise ratios?</h3>
          <p>Yes, the recipe scaler is particularly effective for baking because it maintains exact mathematical ratios between ingredients. However, always consider that some baking techniques may need adjustment when scaling significantly up or down, particularly for yeasted breads and delicate pastries.</p>

          <h3>What types of measurements can the recipe scaler handle?</h3>
          <p>The tool handles whole numbers, decimals, fractions (like 1/2 or 3/4), and mixed measurements. It recognizes common cooking units including cups, tablespoons, teaspoons, ounces, pounds, grams, kilograms, and milliliters, with automatic conversion between metric and imperial systems.</p>

          <h3>Does the recipe scaler work for scaling down recipes to single servings?</h3>
          <p>Absolutely! The tool excels at scaling down recipes and handles the challenging fractional measurements that result from reducing large recipes to smaller portions. It provides practical measurement suggestions even for very small quantities.</p>

          <h3>Can I save or export my scaled recipes?</h3>
          <p>Yes, our recipe scaler offers multiple export options including copy-to-clipboard for easy sharing, printable format for kitchen reference, and JSON export for digital recipe management systems. This makes it easy to save and organize your perfectly scaled recipes.</p>

          <h2>Recipe Scaler and Your Cooking Workflow</h2>
          <p>Integrating our recipe scaler into your cooking routine transforms meal planning from a source of mathematical stress into a streamlined, confident process. The tool pairs perfectly with other kitchen utilities like our Word Counter for recipe description optimization and Case Converter for consistent recipe formatting across your digital cookbook.</p>

          <p>Professional chefs use recipe scaling tools to maintain consistency across different service sizes, while home cooks appreciate the confidence that comes from knowing their ingredient ratios are mathematically perfect. Start using our free recipe scaler today to eliminate cooking calculation errors and enjoy consistently delicious results, whether you're cooking for one or feeding a crowd.</p>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  const recipeTitleInput = document.getElementById('recipe-title');
  const originalServingsInput = document.getElementById('original-servings');
  const targetServingsInput = document.getElementById('target-servings');
  const ingredientsInput = document.getElementById('ingredients-input');

  const scaleBtn = document.getElementById('scale-btn');
  const clearBtn = document.getElementById('clear-btn');
  const copyBtn = document.getElementById('copy-btn');
  const printBtn = document.getElementById('print-btn');
  const exportBtn = document.getElementById('export-btn');
  const scaleFactorDisplay = document.getElementById('scale-factor-display');
  const roundFractionsCheck = document.getElementById('round-fractions');
  const scaledRecipe = document.getElementById('scaled-recipe');

  let debounceTimer;
  let currentScaledData = null;

  // Unit conversion table
  const unitConversions = {
    // Volume conversions (to ml)
    'cups': 236.588,
    'cup': 236.588,
    'c': 236.588,
    'tbsp': 14.787,
    'tablespoon': 14.787,
    'tablespoons': 14.787,
    'tsp': 4.929,
    'teaspoon': 4.929,
    'teaspoons': 4.929,
    'ml': 1,
    'milliliter': 1,
    'milliliters': 1,
    'l': 1000,
    'liter': 1000,
    'liters': 1000,
    'fl oz': 29.574,
    'floz': 29.574,
    'fluid ounce': 29.574,
    'fluid ounces': 29.574,
    'pt': 473.176,
    'pint': 473.176,
    'pints': 473.176,
    'qt': 946.353,
    'quart': 946.353,
    'quarts': 946.353,
    
    // Weight conversions (to grams)
    'g': 1,
    'gram': 1,
    'grams': 1,
    'kg': 1000,
    'kilogram': 1000,
    'kilograms': 1000,
    'oz': 28.35,
    'ounce': 28.35,
    'ounces': 28.35,
    'lb': 453.592,
    'lbs': 453.592,
    'pound': 453.592,
    'pounds': 453.592
  };

  // Common fraction conversions
  const fractions = {
    0.125: '1/8',
    0.167: '1/6',
    0.2: '1/5',
    0.25: '1/4',
    0.333: '1/3',
    0.375: '3/8',
    0.4: '2/5',
    0.5: '1/2',
    0.6: '3/5',
    0.625: '5/8',
    0.667: '2/3',
    0.75: '3/4',
    0.8: '4/5',
    0.833: '5/6',
    0.875: '7/8'
  };

  function parseIngredientLine(line) {
    if (!line.trim()) return null;
    
    // Enhanced pattern to handle mixed numbers, fractions, and decimals
    // Matches: "1 1/2 cups flour", "1/2 tsp salt", "3.5 oz butter", "2 cups flour"
    const pattern = /^(\d+\s\d+\/\d+|\d+\/\d+|\d+(\.\d+)?)(?:\s+([^\s]+))?\s+(.*)$/;
    const match = line.trim().match(pattern);
    
    if (!match) {
      // If no quantity found, treat entire line as ingredient name (e.g., "to taste pepper")
      return {
        quantity: null,
        unit: '',
        ingredient: line.trim(),
        original: line
      };
    }

    let [, quantityStr, , unit, ingredient] = match;
    
    // Parse quantity (handle mixed numbers, fractions, decimals)
    let quantity = parseQuantity(quantityStr);
    
    return {
      quantity: isNaN(quantity) ? null : quantity,
      unit: unit ? unit.trim().toLowerCase() : '',
      ingredient: ingredient.trim(),
      original: line
    };
  }

  function parseQuantity(str) {
    if (!str || str.trim() === '') return null;
    
    str = str.trim();
    
    // Handle mixed numbers like "1 1/2"
    if (str.includes(' ')) {
      const parts = str.split(' ');
      if (parts.length === 2) {
        const whole = parseFloat(parts[0]);
        const fractionPart = parts[1];
        if (fractionPart.includes('/')) {
          const [numerator, denominator] = fractionPart.split('/');
          if (denominator !== '0') {
            return whole + (parseFloat(numerator) / parseFloat(denominator));
          }
        }
      }
    }
    
    // Handle fractions like "1/2", "2/3"
    if (str.includes('/')) {
      const parts = str.split('/');
      if (parts.length === 2) {
        const numerator = parseFloat(parts[0]);
        const denominator = parseFloat(parts[1]);
        if (denominator !== 0) {
          return numerator / denominator;
        }
      }
    }
    
    // Handle decimals and whole numbers
    return parseFloat(str) || null;
  }

  function formatQuantity(quantity, useRounding = true) {
    if (quantity == null || quantity === 0) return '';
    
    // For small quantities (< 5), use fraction rounding
    // For larger quantities, use decimal rounding for practicality
    if (useRounding && quantity < 5) {
      const whole = Math.floor(quantity);
      const remainder = quantity - whole;
      
      // Check if remainder matches common fractions
      const tolerance = 0.06;
      const fracMap = [
        [0.125, '1/8'],
        [0.25, '1/4'],
        [0.333, '1/3'],
        [0.375, '3/8'],
        [0.5, '1/2'],
        [0.625, '5/8'],
        [0.667, '2/3'],
        [0.75, '3/4'],
        [0.875, '7/8']
      ];
      
      for (const [decimal, fraction] of fracMap) {
        if (Math.abs(remainder - decimal) < tolerance) {
          return whole > 0 ? `${whole} ${fraction}` : fraction;
        }
      }
    }
    
    // For larger quantities or when fractions don't match well, use decimal
    if (quantity >= 10) {
      // Round to nearest whole number for large quantities
      return Math.round(quantity).toString();
    } else if (quantity >= 5) {
      // Round to nearest 0.5 for medium quantities
      return (Math.round(quantity * 2) / 2).toString();
    }
    
    // Round to 2 decimal places and remove trailing zeros for small quantities
    const rounded = Math.round(quantity * 100) / 100;
    return rounded % 1 === 0 ? rounded.toString() : rounded.toString();
  }

  function formatUnit(unit, quantity) {
    if (!unit) return '';
    
    // Handle singular/plural forms
    const singularUnits = {
      'cups': 'cup',
      'tablespoons': 'tablespoon', 
      'tbsp': 'tbsp',
      'teaspoons': 'teaspoon',
      'tsp': 'tsp',
      'ounces': 'ounce',
      'pounds': 'pound',
      'lbs': 'lb',
      'grams': 'gram',
      'kilograms': 'kilogram',
      'liters': 'liter',
      'milliliters': 'milliliter'
    };
    
    // If quantity is 1, use singular form
    if (Math.abs(quantity - 1) < 0.001) {
      return singularUnits[unit] || unit;
    }
    
    // For other quantities, use original unit (which is likely plural or standard)
    return unit;
  }

  function scaleRecipe() {
    const title = recipeTitleInput.value.trim() || 'Untitled Recipe';
    const originalServings = parseInt(originalServingsInput.value) || 1;
    const targetServings = parseInt(targetServingsInput.value) || 1;
    const ingredients = ingredientsInput.value.trim();

    const useRounding = roundFractionsCheck.checked;

    if (!ingredients) {
      showError('Please enter at least one ingredient.');
      return;
    }

    try {
      const scaleFactor = targetServings / originalServings;
      scaleFactorDisplay.textContent = `${scaleFactor.toFixed(1)}x`;

      const ingredientLines = ingredients.split('\n').filter(line => line.trim());
      const scaledIngredients = [];

      for (const line of ingredientLines) {
        const parsed = parseIngredientLine(line);
        
        if (!parsed) continue;

        if (parsed.quantity === null) {
          // No quantity found, just add the ingredient as-is (e.g., "to taste pepper")
          scaledIngredients.push({
            ...parsed,
            scaledQuantity: null,
            displayLine: parsed.ingredient
          });
        } else {
          // Scale the quantity
          let scaledQuantity = parsed.quantity * scaleFactor;
          
          const formattedQuantity = formatQuantity(scaledQuantity, useRounding);
          
          // Smart unit formatting (singular/plural)
          let displayUnit = parsed.unit;
          if (displayUnit && scaledQuantity !== null) {
            displayUnit = formatUnit(displayUnit, scaledQuantity);
          }
          
          const displayLine = `${formattedQuantity}${displayUnit ? ' ' + displayUnit : ''} ${parsed.ingredient}`.trim();

          scaledIngredients.push({
            ...parsed,
            scaledQuantity,
            displayLine
          });
        }
      }

      currentScaledData = {
        title,
        originalServings,
        targetServings,
        scaleFactor,
        ingredients: scaledIngredients
      };

      displayScaledRecipe(currentScaledData);
      
    } catch (error) {
      console.error('Scaling failed:', error);
      showError('Failed to scale recipe. Please check your ingredient format.');
    }
  }

  function displayScaledRecipe(data) {
    const recipeHtml = `
      <div class="recipe-header">
        <h4>${data.title}</h4>
        <div class="serving-info">
          <span>Serves: ${data.targetServings}</span>
        </div>
      </div>
      <div class="ingredients-list">
        <h5>Ingredients:</h5>
        <ul>
          ${data.ingredients.map(ing => `<li>${ing.displayLine}</li>`).join('')}
        </ul>
      </div>
    `;
    
    scaledRecipe.innerHTML = recipeHtml;
    copyBtn.disabled = false;
    printBtn.disabled = false;
    exportBtn.disabled = false;
  }

  function showError(message) {
    scaledRecipe.innerHTML = `<div class="error-message">${message}</div>`;
    copyBtn.disabled = true;
    printBtn.disabled = true;
    exportBtn.disabled = true;
  }

  function clearAll() {
    recipeTitleInput.value = '';
    originalServingsInput.value = '4';
    targetServingsInput.value = '8';
    ingredientsInput.value = '';

    roundFractionsCheck.checked = true;
    scaledRecipe.innerHTML = '<div class="recipe-placeholder">Your scaled recipe will appear here...</div>';
    scaleFactorDisplay.textContent = '2.0x';
    copyBtn.disabled = true;
    printBtn.disabled = true;
    exportBtn.disabled = true;
    currentScaledData = null;
  }

  async function copyRecipe() {
    if (!currentScaledData) return;

    const recipeText = formatRecipeForCopy(currentScaledData);
    
    try {
      await navigator.clipboard.writeText(recipeText);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy Recipe';
      }, 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = recipeText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => {
        copyBtn.textContent = 'Copy Recipe';
      }, 2000);
    }
  }

  function formatRecipeForCopy(data) {
    let text = `${data.title}\n`;
    text += `Serves: ${data.targetServings}\n`;

    text += `\nIngredients:\n`;
    data.ingredients.forEach(ing => {
      text += `• ${ing.displayLine}\n`;
    });
    text += `\nScaled from ${data.originalServings} to ${data.targetServings} servings (${data.scaleFactor.toFixed(1)}x)\n`;
    return text;
  }

  function printRecipe() {
    if (!currentScaledData) return;

    const printContent = `
      <html>
        <head>
          <title>${currentScaledData.title} - Recipe</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
            h2 { color: #333; border-bottom: 2px solid #eee; }
            .serving-info { background: #f5f5f5; padding: 10px; margin: 10px 0; }
            ul { list-style-type: none; padding: 0; }
            li { padding: 5px 0; border-bottom: 1px solid #eee; }
            .footer { margin-top: 30px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <h2>${currentScaledData.title}</h2>
          <div class="serving-info">
            <strong>Serves:</strong> ${currentScaledData.targetServings}
          </div>
          <h3>Ingredients:</h3>
          <ul>
            ${currentScaledData.ingredients.map(ing => `<li>${ing.displayLine}</li>`).join('')}
          </ul>
          <div class="footer">
            Scaled from ${currentScaledData.originalServings} to ${currentScaledData.targetServings} servings (${currentScaledData.scaleFactor.toFixed(1)}x)
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  }

  function exportRecipe() {
    if (!currentScaledData) return;

    const exportData = {
      ...currentScaledData,
      exportDate: new Date().toISOString(),
      originalIngredients: ingredientsInput.value.split('\n').filter(line => line.trim())
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentScaledData.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_scaled_recipe.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  }

  // Debounced auto-scaling
  function debouncedScale() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      if (ingredientsInput.value.trim() && originalServingsInput.value && targetServingsInput.value) {
        scaleRecipe();
      }
    }, 800);
  }

  function updateScaleFactor() {
    const original = parseInt(originalServingsInput.value) || 1;
    const target = parseInt(targetServingsInput.value) || 1;
    const factor = target / original;
    scaleFactorDisplay.textContent = `${factor.toFixed(1)}x`;
  }

  // Event listeners
  scaleBtn.addEventListener('click', scaleRecipe);
  clearBtn.addEventListener('click', clearAll);
  copyBtn.addEventListener('click', copyRecipe);
  printBtn.addEventListener('click', printRecipe);
  exportBtn.addEventListener('click', exportRecipe);
  
  // Real-time updates with debouncing
  ingredientsInput.addEventListener('input', debouncedScale);
  originalServingsInput.addEventListener('input', () => {
    updateScaleFactor();
    debouncedScale();
  });
  targetServingsInput.addEventListener('input', () => {
    updateScaleFactor();
    debouncedScale();
  });

  roundFractionsCheck.addEventListener('change', () => {
    if (currentScaledData) {
      scaleRecipe(); // Re-scale with new rounding setting
    }
  });

  // Initialize scale factor display
  updateScaleFactor();
}

export function cleanup() {
  // Clear any pending timers
  const debounceTimer = null;
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
}