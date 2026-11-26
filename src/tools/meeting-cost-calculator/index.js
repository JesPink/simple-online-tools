export function render() {
  return `
    <div class="meeting-cost-calculator-tool">
      <div class="tool-container">
        <div class="tool-interface">
          <div class="tool-main">
            <div class="form-section">
              <div class="section-title">Meeting Setup</div>
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
              
              <div class="section-title">Add Participants</div>
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
              <div class="section-title">Current Participants</div>
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
            <div class="section-title">Meeting Cost Analysis</div>
            <div class="results-content">
              <div id="results-container">
                <p class="placeholder-text">Add participants and start the meeting timer to see real-time cost analysis.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="seo-content">
          <h2>What the Meeting Cost Calculator Measures</h2>
          <p>This meeting cost calculator estimates the staff-time cost of a live meeting from the hourly rates you enter for each participant. Add the attendees, start the timer, and watch the estimated cost update as time passes. You can pause, resume, or reset the timer and review cost projections for common meeting lengths.</p>

          <h2>How the Meeting Cost Is Calculated</h2>
          <p>The calculation uses the sum of participant hourly rates and the elapsed meeting time:</p>
          <p><strong>Combined hourly rate</strong> = the sum of all participant hourly rates.</p>
          <p><strong>Meeting cost</strong> = combined hourly rate × elapsed time in hours.</p>
          <p><strong>Cost per minute</strong> = combined hourly rate ÷ 60.</p>
          <p>For example, if three participants have hourly rates of $50, $60, and $70, their combined rate is $180 per hour. A 30-minute meeting is estimated at $90. The result is only as accurate as the rates and assumptions you enter.</p>

          <h2>How to Use the Live Meeting Cost Timer</h2>
          <ol>
            <li><strong>Choose a currency:</strong> Select one currency for all participant rates before entering them.</li>
            <li><strong>Add every participant:</strong> Enter each attendee's name and hourly rate. Add the full participant list before starting the timer.</li>
            <li><strong>Start the meeting:</strong> Select Start Meeting when the meeting begins. The timer and estimated cost update while it runs.</li>
            <li><strong>Pause or resume:</strong> Pause the timer for breaks and resume when the meeting continues. The elapsed time is retained.</li>
            <li><strong>Review projections:</strong> Compare estimated costs for 15 minutes, 30 minutes, one hour, and two hours.</li>
            <li><strong>Reset when finished:</strong> Reset the timer before setting up a different meeting or changing the participant list.</li>
          </ol>

          <h2>Choosing Hourly Rates and Currency</h2>
          <p>Use each participant's estimated hourly employment cost if you have it. If you only know annual salary, dividing it by 2,080 is one possible estimate of a standard full-time hourly rate; actual working hours and compensation vary. You can also enter another reasonable estimate, but label it clearly when sharing the result.</p>
          <p>All participant rates must use the selected currency. Changing the currency changes how the numbers are formatted; it does not convert amounts using exchange rates. If you change currency, update the rates so they represent that currency.</p>

          <h2>What This Estimate Includes—and Excludes</h2>
          <ul>
            <li><strong>Included:</strong> The participant hourly rates you enter and the elapsed time measured by the timer.</li>
            <li><strong>Not included:</strong> Employer taxes, benefits, overhead, room or software costs, preparation, follow-up work, opportunity cost, or recurring meeting schedules.</li>
            <li><strong>Not measured:</strong> Meeting quality, business value, decisions made, productivity gains, or return on investment.</li>
          </ul>
          <p>This is a simple staff-time estimate, not payroll accounting or a full calculation of meeting ROI. Add any extra costs separately if you need a broader estimate.</p>

          <h2>Frequently Asked Questions</h2>
          <h3>Does the calculator track the meeting cost in real time?</h3>
          <p>Yes. While the timer is running, the displayed cost updates using the combined hourly rates and elapsed time. Pausing stops the timer; resuming continues from the elapsed time already recorded.</p>
          <h3>Can I add or remove participants after starting?</h3>
          <p>Add all participants before starting the timer. The participant fields are locked while the timer is running or paused so that a changed attendee list does not incorrectly apply to the entire elapsed meeting.</p>
          <h3>Does changing the currency convert hourly rates?</h3>
          <p>No. The currency selector changes the display format only. It does not perform currency conversion, so all rates must already be in the selected currency.</p>
          <h3>Does the estimate include benefits and overhead?</h3>
          <p>No. It multiplies the hourly rates you enter by elapsed time. Include benefits or overhead in your input rates if you want them reflected in the estimate.</p>
          <h3>Can I calculate recurring meeting costs or ROI?</h3>
          <p>No. This tool estimates one timed meeting and shows fixed-duration cost projections. It does not save meeting history, forecast recurring schedules, or measure meeting outcomes or ROI.</p>

          <h2>Use the Estimate as a Planning Aid</h2>
          <p>The result can help make the staff-time cost of a meeting more visible when planning attendance or duration. It cannot determine whether a meeting is worthwhile: compare the estimate with the purpose, decisions, and outcomes of the meeting before making that judgment.</p>
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
        <h3>Cost Projections</h3>
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