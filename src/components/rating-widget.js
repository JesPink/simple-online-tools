/**
 * Tool Rating Widget Component
 * 
 * A reusable 5-star rating widget for tool pages.
 * Follows PROJECT_RULES.md component isolation principles.
 */

/**
 * Renders the HTML for the 5-star rating widget
 * @returns {string} HTML string for the rating widget
 */
export function render() {
  return `
    <div class="rating-widget">
      <div class="rating-header">
        <h3>Rate This Tool</h3>
        <p class="rating-subtitle">Help us improve by rating your experience</p>
      </div>
      
      <div class="star-rating" id="star-rating">
        ${generateStars()}
      </div>
      
      <div class="rating-feedback" id="rating-feedback" style="display: none;">
        <p class="feedback-message">Thank you for your feedback!</p>
        <p class="feedback-subtitle">Your rating helps us make better tools.</p>
      </div>
      
      <div class="rating-stats">
        <span class="rating-count">Join thousands of users who've rated our tools</span>
      </div>
    </div>
  `;
}

/**
 * Generates SVG star icons for the rating widget
 * @returns {string} HTML string with 5 star SVG elements
 */
function generateStars() {
  let starsHTML = '';
  
  for (let i = 1; i <= 5; i++) {
    starsHTML += `
      <button class="star-btn" data-rating="${i}" aria-label="Rate ${i} star${i > 1 ? 's' : ''}">
        <svg class="star-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path class="star-outline" d="M12 2L14.09 8.26L22 8.26L16.18 12.74L18.18 19L12 15.74L5.82 19L7.82 12.74L2 8.26L9.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          <path class="star-fill" d="M12 2L14.09 8.26L22 8.26L16.18 12.74L18.18 19L12 15.74L5.82 19L7.82 12.74L2 8.26L9.91 8.26L12 2Z" fill="currentColor" style="display: none;"/>
        </svg>
      </button>
    `;
  }
  
  return starsHTML;
}

/**
 * Initializes the rating widget with event listeners and functionality
 * @param {string} toolSlug - The slug of the current tool for tracking purposes
 */
export function init(toolSlug) {
  const starRating = document.getElementById('star-rating');
  const ratingFeedback = document.getElementById('rating-feedback');
  const starButtons = starRating.querySelectorAll('.star-btn');
  
  let selectedRating = 0;
  let isRated = false;

  // Add hover effects and click handlers
  starButtons.forEach((button, index) => {
    const starIndex = index + 1;
    
    // Hover effects
    button.addEventListener('mouseenter', () => {
      if (!isRated) {
        highlightStars(starIndex);
      }
    });
    
    button.addEventListener('mouseleave', () => {
      if (!isRated) {
        highlightStars(selectedRating);
      }
    });
    
    // Click handler
    button.addEventListener('click', () => {
      if (!isRated) {
        selectedRating = starIndex;
        submitRating(toolSlug, selectedRating);
      }
    });
  });

  /**
   * Highlights stars up to the specified rating
   * @param {number} rating - Number of stars to highlight (1-5)
   */
  function highlightStars(rating) {
    starButtons.forEach((button, index) => {
      const starIcon = button.querySelector('.star-icon');
      const starOutline = starIcon.querySelector('.star-outline');
      const starFill = starIcon.querySelector('.star-fill');
      
      if (index < rating) {
        // Highlight star
        starOutline.style.color = '#fbbf24'; // Yellow color
        starFill.style.display = 'block';
        starFill.style.color = '#fbbf24';
      } else {
        // Unhighlight star
        starOutline.style.color = '#d1d5db'; // Gray color
        starFill.style.display = 'none';
      }
    });
  }

  /**
   * Handles the rating submission process
   * @param {string} toolSlug - The tool being rated
   * @param {number} rating - The selected rating (1-5)
   */
  function submitRating(toolSlug, rating) {
    // Mark as rated to prevent multiple submissions
    isRated = true;
    
    // Visually update the UI to show selected rating
    highlightStars(rating);
    
    // Disable all star buttons
    starButtons.forEach(button => {
      button.disabled = true;
      button.style.cursor = 'not-allowed';
      button.style.opacity = '0.7';
    });
    
    // Show thank you message
    ratingFeedback.style.display = 'block';
    
    // Add a subtle animation
    ratingFeedback.style.opacity = '0';
    ratingFeedback.style.transform = 'translateY(10px)';
    ratingFeedback.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
      ratingFeedback.style.opacity = '1';
      ratingFeedback.style.transform = 'translateY(0)';
    }, 100);

    // TODO: Implement Cloudflare Worker call
    // This would send the rating to a backend service for persistence and analytics
    /*
    try {
      const response = await fetch('/api/rate-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          toolSlug: toolSlug,
          rating: rating,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          referrer: document.referrer || 'direct'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Rating submitted successfully:', result);
      
      // Optionally update UI with aggregate rating data
      if (result.averageRating && result.totalRatings) {
        updateRatingStats(result.averageRating, result.totalRatings);
      }
      
    } catch (error) {
      console.error('Failed to submit rating:', error);
      // Could show an error message to user or retry mechanism
    }
    */

    console.log(`Rating submitted for ${toolSlug}: ${rating} stars`);
  }

  /**
   * Updates the rating statistics display (for future use with backend data)
   * @param {number} averageRating - Average rating from backend
   * @param {number} totalRatings - Total number ratings from backend
   */
  function updateRatingStats(averageRating, totalRatings) {
    const ratingStats = document.querySelector('.rating-count');
    if (ratingStats) {
      ratingStats.textContent = `${averageRating.toFixed(1)} stars (${totalRatings} ratings)`;
    }
  }

  // Initialize with no rating selected
  highlightStars(0);
  
  console.log(`Rating widget initialized for tool: ${toolSlug}`);
}

/**
 * Cleanup function for component hot-swapping (follows PROJECT_RULES.md guidelines)
 */
export function cleanup() {
  // Remove any global event listeners or timers if added in the future
  console.log('Rating widget cleaned up');
}