export function render() {
  return `
    <div class="meeting-cost-calculator-tool">
      <div class="tool-container">
        <div class="tool-interface">
          <div class="tool-main">
            <div class="form-section">
              <h2>Meeting Setup</h2>
              <div class="form-group">
                <label for="currency-select">Currency (applies to all participants)</label>
                <select id="currency-select">
                  <option value="USD">USD ($) - US Dollar</option>
                  <option value="EUR">EUR (€) - Euro</option>
                  <option value="GBP">GBP (£) - British Pound</option>
                  <option value="JPY">JPY (¥) - Japanese Yen</option>
                  <option value="CAD">CAD (C$) - Canadian Dollar</option>
                  <option value="AUD">AUD (A$) - Australian Dollar</option>
                  <option value="CHF">CHF (CHF) - Swiss Franc</option>
                  <option value="CNY">CNY (¥) - Chinese Yuan</option>
                  <option value="SEK">SEK (kr) - Swedish Krona</option>
                  <option value="NOK">NOK (kr) - Norwegian Krone</option>
                  <option value="INR">INR (₹) - Indian Rupee</option>
                  <option value="BRL">BRL (R$) - Brazilian Real</option>
                </select>
                <small class="currency-help">Note: All participant rates will be displayed in the selected currency</small>
              </div>
              
              <h3>Add Participants</h3>
              <div class="form-group">
                <label for="participant-name">Participant Name</label>
                <input type="text" id="participant-name" placeholder="e.g., John Smith, Marketing Manager" />
              </div>
              <div class="form-group">
                <label for="hourly-rate">Hourly Rate</label>
                <input type="number" id="hourly-rate" placeholder="e.g., 50" min="0" step="0.01" />
              </div>
              <div class="form-actions">
                <button class="btn btn-primary" id="add-participant-btn">Add Participant</button>
              </div>
            </div>

            <div class="form-section" id="participants-section" style="display: none;">
              <h2>Current Participants</h2>
              <div id="participants-list"></div>
              <div class="meeting-controls">
                <div class="timer-display">
                  <div class="timer-time" id="timer-display">00:00:00</div>
                  <div class="timer-cost" id="cost-display">$0.00</div>
                </div>
                <div class="form-actions">
                  <button class="btn btn-primary" id="start-timer-btn">Start Meeting</button>
                  <button class="btn btn-secondary" id="pause-timer-btn" disabled>Pause</button>
                  <button class="btn btn-secondary" id="reset-timer-btn" disabled>Reset</button>
                </div>
              </div>
            </div>
          </div>
          
          <div class="tool-results">
            <h2>Meeting Cost Analysis</h2>
            <div class="results-content">
              <div id="results-container">
                <p class="placeholder-text">Add participants and start the meeting timer to see real-time cost analysis.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="seo-content">
          <h3>Understanding the Meeting Cost Calculator</h3>
          <p>A <strong>meeting cost calculator</strong> is an essential business productivity tool that reveals the true financial impact of your meetings by calculating real-time costs based on participant salaries and meeting duration. In today's business environment where the average knowledge worker spends 37% of their time in meetings, understanding the actual dollar cost of each meeting has become crucial for optimizing productivity and making informed decisions about meeting necessity and duration.</p>
          
          <p>Our meeting cost calculator transforms abstract time into concrete financial data, helping teams and managers visualize exactly how much each minute costs when multiple professionals gather. Whether you're running a quick 15-minute standup or a lengthy strategic planning session, this tool provides immediate visibility into the accumulating expense, creating natural motivation for more focused and efficient discussions.</p>

          <h3>How to Use Our Meeting Cost Calculator</h3>
          <p>Using our meeting cost calculator is straightforward and takes just minutes to set up, but provides valuable insights throughout your meeting duration:</p>
          
          <p><strong>Step 1: Add Meeting Participants</strong><br>
          Enter each participant's name and their hourly rate. You can estimate hourly rates by dividing annual salaries by 2,080 working hours, or use industry averages for different roles if exact figures aren't available.</p>
          
          <p><strong>Step 2: Review Participant List</strong><br>
          Once you've added participants, review the list to ensure accuracy. You can remove participants if plans change or add additional attendees as needed.</p>
          
          <p><strong>Step 3: Start the Meeting Timer</strong><br>
          Click "Start Meeting" when your meeting begins. The calculator immediately starts tracking time and calculating cumulative costs based on all participants' combined hourly rates.</p>
          
          <p><strong>Step 4: Monitor Real-Time Costs</strong><br>
          Watch as the meeting cost accumulates in real-time. This live feedback helps maintain awareness of the financial investment being made and encourages more focused discussions.</p>
          
          <p><strong>Step 5: Analyze Meeting Efficiency</strong><br>
          Use the pause and reset functions to break down costs by agenda items or meeting segments, helping you identify which portions of meetings provide the most value relative to their cost.</p>

          <h3>Meeting Cost Counter: Real-Time Financial Awareness</h3>
          <p>A meeting cost counter serves as more than just a calculation tool—it's a behavioral change catalyst that transforms how teams approach meeting planning and execution. By providing immediate visual feedback on accumulating costs, the counter creates natural pressure to stay on topic, reduce tangential discussions, and respect scheduled time limits.</p>
          
          <p>The psychological impact of seeing dollars tick upward every second cannot be understated. Teams report that simply having a visible meeting cost counter running during their sessions leads to more focused conversations, quicker decision-making, and increased respect for everyone's time. This real-time awareness helps justify the business case for shorter meetings and more selective participant lists.</p>
          
          <p>Modern businesses are increasingly adopting meeting cost counters as part of their efficiency initiatives, with some companies requiring cost calculations for any meeting involving more than three people or lasting longer than 30 minutes. This data-driven approach to meeting management helps organizations make informed decisions about which meetings truly justify their financial investment.</p>

          <h3>Meeting Time Cost Calculator for Strategic Planning</h3>
          <p>A meeting time cost calculator becomes particularly valuable for strategic planning sessions, where senior executives and department heads often gather for extended periods. These high-level meetings can easily accumulate costs of hundreds or thousands of dollars per hour, making it crucial to ensure every minute delivers proportional value to the organization.</p>
          
          <p>By using a meeting time cost calculator during planning sessions, organizations can make data-informed decisions about meeting frequency, duration, and participant inclusion. The calculator helps answer critical questions: Is this two-hour session worth $2,400 in combined salaries? Would splitting this into smaller, focused sessions be more cost-effective? Are all invited participants essential, or could some receive updates through other channels?</p>
          
          <p>The strategic value extends beyond individual meetings to overall meeting culture transformation. Teams that regularly use meeting time cost calculators report developing better meeting hygiene, including more thorough agenda preparation, stricter time management, and increased focus on actionable outcomes rather than status updates or lengthy discussions that could happen asynchronously.</p>

          <h3>Meeting Cost Calculator Timer: Optimizing Business Efficiency</h3>
          <p>The meeting cost calculator timer function provides granular insights into how meeting time translates to business expenses, enabling organizations to optimize their collaborative processes. Unlike simple timers that only track duration, a cost-integrated timer creates immediate awareness of financial implications, encouraging more disciplined meeting management.</p>
          
          <p>Professional teams use meeting cost calculator timers to establish meeting budgets, much like project budgets. Before scheduling a meeting, they estimate the total cost based on required participants and planned duration, then use the timer to stay within budget. This approach treats meeting time as the valuable business resource it truly is, leading to more strategic decisions about when meetings are necessary versus when alternatives like shared documents or asynchronous communication might suffice.</p>
          
          <p>The timer's pause and segment features allow for detailed analysis of meeting efficiency. Teams can track which agenda items consume the most time relative to their importance, identify recurring time drains, and develop strategies for more efficient future meetings. This data-driven approach to meeting optimization can result in significant productivity gains and cost savings across the organization.</p>

          <h3>Meeting Cost Tracker: Long-Term Meeting ROI Analysis</h3>
          <p>A comprehensive meeting cost tracker extends beyond individual session calculations to provide insights into long-term meeting patterns and return on investment. By tracking costs across multiple meetings, teams can identify trends, optimize recurring meetings, and make strategic decisions about their collaborative processes.</p>
          
          <p>Organizations using meeting cost trackers often discover surprising patterns: certain types of meetings consistently exceed their value threshold, some participants contribute more effectively in smaller groups, or specific meeting formats generate better outcomes per dollar invested. This data enables informed decisions about meeting restructuring, participant optimization, and format changes that can significantly improve overall efficiency.</p>
          
          <p>The tracking capability also supports budget planning and resource allocation decisions. Teams can forecast meeting costs for upcoming projects, compare the efficiency of different collaboration methods, and demonstrate the ROI of investments in meeting efficiency tools or training. This quantitative approach to meeting management aligns with broader business objectives of operational efficiency and cost optimization.</p>

          <h3>Frequently Asked Questions</h3>
          <div class="faq-section">
            <div class="faq-item">
              <h4>How accurate is the meeting cost calculator in determining real meeting expenses?</h4>
              <p>Our meeting cost calculator provides highly accurate cost estimates based on the hourly rates you input. The calculation includes all participants' combined hourly costs multiplied by meeting duration. However, remember that true meeting costs may include additional factors like opportunity costs, preparation time, and follow-up activities that extend beyond the actual meeting duration.</p>
            </div>
            
            <div class="faq-item">
              <h3>What's the ideal meeting cost threshold for different types of business meetings?</h3>
              <p>Meeting cost thresholds vary by organization size and industry, but general guidelines suggest keeping routine meetings under $200, strategic planning sessions justified up to $1,000+ per hour, and decision-making meetings evaluated based on the financial impact of delayed decisions. The key is ensuring meeting outcomes justify the calculated investment.</p>
            </div>
            
            <div class="faq-item">
              <h4>Can I use estimated hourly rates if I don't know exact participant salaries?</h4>
              <p>Yes, estimated rates work well for cost awareness purposes. Use industry salary surveys, role-based estimates, or general ranges (junior: $25-40/hour, mid-level: $40-75/hour, senior: $75-150/hour). The goal is relative cost awareness rather than precise accounting, so reasonable estimates provide valuable insights.</p>
            </div>
            
            <div class="faq-item">
              <h4>How can I use meeting cost data to improve team productivity?</h4>
              <p>Use cost data to set meeting budgets, justify agenda changes, reduce participant lists to essential members only, and demonstrate the value of preparation. Share cost calculations with teams to create collective awareness and motivation for more efficient meetings. Track costs over time to identify improvement opportunities and measure progress.</p>
            </div>
            
            <div class="faq-item">
              <h4>Does the calculator account for benefits and overhead costs beyond salary?</h4>
              <p>The basic calculator uses the hourly rates you provide. To account for full employment costs (benefits, overhead, etc.), multiply salary-based hourly rates by 1.25-1.4 when entering them. This adjustment provides a more comprehensive view of true participant costs, including typical benefit and overhead expenses.</p>
            </div>
          </div>

          <h3>Meeting Cost Calculator and Your Business Workflow</h3>
          <p>Integrating a meeting cost calculator into your business workflow transforms meeting culture from time-focused to value-focused, ensuring every collaborative session delivers appropriate return on investment. This tool works excellently alongside other productivity tools like our <a href="/tools/word-counter/">Word Counter</a> for measuring meeting agenda length and our <a href="/tools/case-converter/">Case Converter</a> for standardizing meeting documentation formats.</p>
          
          <p>The meeting cost calculator serves as a cornerstone tool for organizations committed to operational efficiency and data-driven decision making. By quantifying the true cost of collaboration, it enables more strategic choices about when, how, and with whom to meet, ultimately leading to more productive teams and better business outcomes.</p>
        </div>
      </div>
    </div>
  `;
}

export async function init() {
  // Meeting participants data
  let participants = [];
  let timerInterval = null;
  let startTime = null;
  let pausedTime = 0;
  let isRunning = false;
  let isPaused = false;

  // DOM elements
  const participantNameInput = document.getElementById('participant-name');
  const hourlyRateInput = document.getElementById('hourly-rate');
  const addParticipantBtn = document.getElementById('add-participant-btn');
  const participantsSection = document.getElementById('participants-section');
  const participantsList = document.getElementById('participants-list');
  const startTimerBtn = document.getElementById('start-timer-btn');
  const pauseTimerBtn = document.getElementById('pause-timer-btn');
  const resetTimerBtn = document.getElementById('reset-timer-btn');
  const timerDisplay = document.getElementById('timer-display');
  const costDisplay = document.getElementById('cost-display');
  const resultsContainer = document.getElementById('results-container');

  // Utility functions
  function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  function formatCurrency(amount) {
    const selectedCurrency = document.getElementById('currency-select')?.value || 'USD';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: selectedCurrency,
      minimumFractionDigits: 2
    }).format(amount);
  }

  function calculateTotalHourlyRate() {
    return participants.reduce((total, participant) => total + participant.rate, 0);
  }

  function calculateCurrentCost(milliseconds) {
    const hours = milliseconds / (1000 * 60 * 60);
    const totalHourlyRate = calculateTotalHourlyRate();
    return hours * totalHourlyRate;
  }

  function addParticipant() {
    const name = participantNameInput.value.trim();
    const rate = parseFloat(hourlyRateInput.value);

    if (!name || !rate || rate <= 0) {
      alert('Please enter both participant name and a valid hourly rate.');
      return;
    }

    const participant = {
      id: Date.now(),
      name: name,
      rate: rate
    };

    participants.push(participant);
    updateParticipantsList();
    updateResults();

    // Clear inputs
    participantNameInput.value = '';
    hourlyRateInput.value = '';
    
    // Show participants section
    participantsSection.style.display = 'block';
    
    // Focus back to name input for quick addition
    participantNameInput.focus();
  }

  function removeParticipant(id) {
    participants = participants.filter(p => p.id !== id);
    updateParticipantsList();
    updateResults();
    
    if (participants.length === 0) {
      participantsSection.style.display = 'none';
      resetTimer();
    }
  }

  function updateParticipantsList() {
    if (participants.length === 0) {
      participantsList.innerHTML = '';
      return;
    }

    const listHtml = participants.map(participant => `
      <div class="participant-item">
        <div class="participant-info">
          <span class="participant-name">${participant.name}</span>
          <span class="participant-rate">${formatCurrency(participant.rate)}/hour</span>
        </div>
        <button class="btn btn-secondary remove-btn" data-id="${participant.id}">Remove</button>
      </div>
    `).join('');

    participantsList.innerHTML = listHtml;

    // Add event listeners to remove buttons
    const removeButtons = participantsList.querySelectorAll('.remove-btn');
    removeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.target.getAttribute('data-id'));
        removeParticipant(id);
      });
    });
  }

  function startTimer() {
    if (participants.length === 0) {
      alert('Please add at least one participant before starting the timer.');
      return;
    }

    if (!isRunning) {
      startTime = Date.now() - pausedTime;
      isRunning = true;
      isPaused = false;
      
      timerInterval = setInterval(updateTimer, 100);
      
      startTimerBtn.textContent = 'Meeting Running...';
      startTimerBtn.disabled = true;
      pauseTimerBtn.disabled = false;
      resetTimerBtn.disabled = false;
    }
  }

  function pauseTimer() {
    if (isRunning && !isPaused) {
      isPaused = true;
      isRunning = false;
      clearInterval(timerInterval);
      
      startTimerBtn.textContent = 'Resume Meeting';
      startTimerBtn.disabled = false;
      pauseTimerBtn.disabled = true;
    }
  }

  function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    isPaused = false;
    startTime = null;
    pausedTime = 0;
    
    timerDisplay.textContent = '00:00:00';
    costDisplay.textContent = '$0.00';
    
    startTimerBtn.textContent = 'Start Meeting';
    startTimerBtn.disabled = false;
    pauseTimerBtn.disabled = true;
    resetTimerBtn.disabled = true;
    
    updateResults();
  }

  function updateTimer() {
    if (!isRunning || !startTime) return;
    
    const currentTime = Date.now();
    const elapsedTime = currentTime - startTime;
    
    timerDisplay.textContent = formatTime(elapsedTime);
    
    const currentCost = calculateCurrentCost(elapsedTime);
    costDisplay.textContent = formatCurrency(currentCost);
    
    updateResults(elapsedTime);
  }

  function updateResults(elapsedTime = 0) {
    if (participants.length === 0) {
      resultsContainer.innerHTML = '<p class="placeholder-text">Add participants and start the meeting timer to see real-time cost analysis.</p>';
      return;
    }

    const totalHourlyRate = calculateTotalHourlyRate();
    const currentCost = calculateCurrentCost(elapsedTime);
    const projectedHourCost = totalHourlyRate;

    const resultsHtml = `
      <div class="cost-breakdown">
        <div class="cost-stat">
          <div class="stat-label">Total Participants</div>
          <div class="stat-value">${participants.length}</div>
        </div>
        <div class="cost-stat">
          <div class="stat-label">Combined Hourly Rate</div>
          <div class="stat-value">${formatCurrency(totalHourlyRate)}</div>
        </div>
        <div class="cost-stat">
          <div class="stat-label">Cost Per Minute</div>
          <div class="stat-value">${formatCurrency(totalHourlyRate / 60)}</div>
        </div>
        <div class="cost-stat primary">
          <div class="stat-label">Current Meeting Cost</div>
          <div class="stat-value">${formatCurrency(currentCost)}</div>
        </div>
      </div>
      
      <div class="projections">
        <h4>Cost Projections</h4>
        <div class="projection-grid">
          <div class="projection-item">
            <span>15 minutes:</span>
            <span>${formatCurrency(totalHourlyRate * 0.25)}</span>
          </div>
          <div class="projection-item">
            <span>30 minutes:</span>
            <span>${formatCurrency(totalHourlyRate * 0.5)}</span>
          </div>
          <div class="projection-item">
            <span>1 hour:</span>
            <span>${formatCurrency(totalHourlyRate)}</span>
          </div>
          <div class="projection-item">
            <span>2 hours:</span>
            <span>${formatCurrency(totalHourlyRate * 2)}</span>
          </div>
        </div>
      </div>
    `;

    resultsContainer.innerHTML = resultsHtml;
  }

  // Event listeners
  addParticipantBtn.addEventListener('click', addParticipant);
  
  // Currency change handler
  const currencySelect = document.getElementById('currency-select');
  currencySelect.addEventListener('change', () => {
    // Update display for all existing participants and calculations
    updateParticipantsList();
    if (isRunning || isPaused) {
      updateResults();
    }
  });
  
  // Enter key support for form fields
  participantNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      hourlyRateInput.focus();
    }
  });
  
  hourlyRateInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addParticipant();
    }
  });

  startTimerBtn.addEventListener('click', () => {
    if (!isRunning) {
      startTimer();
    } else if (isPaused) {
      startTimer();
    }
  });

  pauseTimerBtn.addEventListener('click', pauseTimer);
  resetTimerBtn.addEventListener('click', resetTimer);

  // Cleanup function
  return function cleanup() {
    if (timerInterval) {
      clearInterval(timerInterval);
    }
  };
}