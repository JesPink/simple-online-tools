/**
 * Free Tools Platform - Core Application Router
 * 
 * This is the client-side "router" that identifies which tool to load
 * based on the data-tool-slug attribute and dynamically imports the tool's module.
 */

import * as RatingWidget from './components/rating-widget.js';

class ToolsApp {
  constructor() {
    this.toolRegistry = null;
    this.currentTool = null;
    this.init();
  }

  async init() {
    try {
      // Load the tool registry
      await this.loadToolRegistry();
      
      // Get the current tool slug from the body data attribute
      const toolSlug = document.body.getAttribute('data-tool-slug');
      const categorySlug = document.body.getAttribute('data-category-slug');
      
      if (toolSlug && toolSlug.trim() !== '') {
        // We're on a tool page - load the specific tool
        await this.loadTool(toolSlug);
      } else if (categorySlug && categorySlug.trim() !== '') {
        // We're on a category page - show tools for this category
        this.showCategoryPage(categorySlug);
      } else {
        // We're on the homepage - show tool listing
        this.showHomepage();
      }
      
      // Hide loading indicator
      this.hideLoading();
      
      // Initialize performance optimizations
      this.initPerformanceOptimizations();
      
    } catch (error) {
      console.error('Failed to initialize app:', error);
      this.showError('Failed to load the application. Please refresh the page.');
    }
  }

  /**
   * Initialize performance optimizations
   * - Lazy loading for images
   * - Preload hints for likely navigation
   * - Resource cleanup
   */
  initPerformanceOptimizations() {
    // Setup lazy loading for images
    this.setupLazyLoading();
    
    // Setup prefetch for likely tool navigation
    this.setupPrefetchHints();
    
    // Monitor performance metrics
    this.monitorPerformance();
  }

  /**
   * Setup lazy loading for images using Intersection Observer
   * Images should use data-src attribute instead of src
   */
  setupLazyLoading() {
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers - load all images immediately
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
        }
      });
      return;
    }

    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Load the image
          if (img.dataset.src) {
            img.src = img.dataset.src;
          }
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          
          // Add loaded class for fade-in effect
          img.classList.add('lazy-loaded');
          
          // Stop observing this image
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px', // Start loading 50px before entering viewport
      threshold: 0.01
    });

    // Observe all images with data-src
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });

    // Store observer for cleanup
    this.imageObserver = imageObserver;
  }

  /**
   * Setup prefetch hints for likely tool navigation
   * Prefetches tool modules when user hovers over tool links
   */
  setupPrefetchHints() {
    const toolLinks = document.querySelectorAll('.tool-link, .related-tool-link');
    
    toolLinks.forEach(link => {
      let prefetchTimer;
      
      // Prefetch on hover (desktop)
      link.addEventListener('mouseenter', () => {
        prefetchTimer = setTimeout(() => {
          this.prefetchTool(link);
        }, 300); // Wait 300ms to avoid prefetching during quick scrolls
      }, { passive: true });
      
      link.addEventListener('mouseleave', () => {
        clearTimeout(prefetchTimer);
      }, { passive: true });
      
      // Prefetch on touch start (mobile) with longer delay
      link.addEventListener('touchstart', () => {
        prefetchTimer = setTimeout(() => {
          this.prefetchTool(link);
        }, 500);
      }, { passive: true });
    });
  }

  /**
   * Prefetch a tool's module for faster loading
   */
  async prefetchTool(link) {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Extract tool slug from href
    const match = href.match(/\/tools\/([^\/]+)/);
    if (!match) return;
    
    const slug = match[1];
    const toolConfig = this.toolRegistry.find(tool => tool.slug === slug);
    
    if (!toolConfig) return;
    
    // Prefetch using link rel="prefetch"
    const prefetchLink = document.createElement('link');
    prefetchLink.rel = 'prefetch';
    prefetchLink.href = toolConfig.jsPath;
    prefetchLink.as = 'script';
    
    // Check if already prefetched
    if (!document.querySelector(`link[href="${toolConfig.jsPath}"]`)) {
      document.head.appendChild(prefetchLink);
      console.log(`Prefetched: ${toolConfig.title}`);
    }
  }

  /**
   * Monitor performance metrics using Performance Observer
   */
  monitorPerformance() {
    if (!('PerformanceObserver' in window)) return;

    try {
      // Monitor Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        // Log LCP for monitoring (can be sent to analytics)
        console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

      // Monitor First Input Delay (FID)
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          console.log('FID:', entry.processingStart - entry.startTime);
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Monitor Cumulative Layout Shift (CLS)
      let clsScore = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if (!entry.hadRecentInput) {
            clsScore += entry.value;
          }
        }
        console.log('CLS:', clsScore);
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

    } catch (error) {
      console.warn('Performance monitoring not available:', error);
    }
  }

  async loadToolRegistry() {
    try {
      const response = await fetch('/tool-registry.json');
      if (!response.ok) {
        throw new Error(`Failed to load tool registry: ${response.status}`);
      }
      this.toolRegistry = await response.json();
      console.log(`Loaded ${this.toolRegistry.length} tools from registry`);
    } catch (error) {
      console.error('Error loading tool registry:', error);
      throw error;
    }
  }

  async loadTool(slug) {
    try {
      // Find the tool in the registry
      const toolConfig = this.toolRegistry.find(tool => tool.slug === slug);
      
      if (!toolConfig) {
        throw new Error(`Tool not found: ${slug}`);
      }

      console.log(`Loading tool: ${toolConfig.title}`);

      // Dynamically import the tool's module
      const toolModule = await import(toolConfig.jsPath);
      
      if (!toolModule.render || !toolModule.init) {
        throw new Error(`Invalid tool module: ${slug}. Must export render() and init() functions.`);
      }

      // Render the tool's HTML
      const toolContainer = document.getElementById('tool-container');
      const toolHTML = toolModule.render();
      
      // Create breadcrumbs
      const breadcrumbs = this.createBreadcrumbs(toolConfig);
      
      // Create rating widget HTML
      const ratingWidgetHTML = RatingWidget.render();
      
      // Create related tools section
      const relatedToolsHTML = this.createRelatedToolsSection(toolConfig);
      
      toolContainer.innerHTML = `
        ${breadcrumbs}
        <div class="tool-header">
          <h1>${toolConfig.title}</h1>
          <p class="tool-description">${toolConfig.description}</p>
        </div>
        ${toolHTML}
        <div id="rating-widget-container">
          ${ratingWidgetHTML}
        </div>
        ${relatedToolsHTML}
      `;

      // Initialize the tool's functionality
      await toolModule.init();
      
      // Initialize the rating widget
      RatingWidget.init(toolConfig.slug);
      
      this.currentTool = {
        config: toolConfig,
        module: toolModule
      };

      console.log(`Successfully loaded tool: ${toolConfig.title}`);

    } catch (error) {
      console.error(`Failed to load tool: ${slug}`, error);
      this.showError(`Failed to load the ${slug} tool. Please try refreshing the page.`);
    }
  }

  showHomepage() {
    const toolContainer = document.getElementById('tool-container');
    
    // Group tools by category
    const toolsByCategory = this.groupToolsByCategory();
    
    let homepageHTML = `
      <div class="container">
        <div class="homepage-header">
          <h1>Simple Online Tools</h1>
          <p class="homepage-description">
            Discover our collection of simple online tools. No sign-up required, 
            fast loading, and completely secure. All tools work directly in your browser.
          </p>
        </div>
        <div class="tools-grid">
    `;

    // Render tools by category
    for (const [category, tools] of Object.entries(toolsByCategory)) {
      homepageHTML += `
        <div class="tool-category">
          <h2 class="category-title">
            <a href="/category/${category}">${this.formatCategoryName(category)}</a>
          </h2>
          <div class="category-tools">
      `;
      
      for (const tool of tools) {
        homepageHTML += `
          <div class="tool-card">
            <a href="/tools/${tool.slug}/" class="tool-link">
              <h3>${tool.title}</h3>
              <p>${tool.description}</p>
              <span class="tool-arrow">→</span>
            </a>
          </div>
        `;
      }
      
      homepageHTML += `
          </div>
        </div>
      `;
    }

    homepageHTML += `
        </div>
      </div>
    `;

    toolContainer.innerHTML = homepageHTML;
  }

  showCategoryPage(categorySlug) {
    const toolContainer = document.getElementById('tool-container');
    
    // Filter tools for this category
    const categoryTools = this.toolRegistry.filter(tool => tool.primaryCategory === categorySlug);
    const categoryName = this.formatCategoryName(categorySlug);
    
    if (categoryTools.length === 0) {
      this.showError(`No tools found in the ${categoryName} category.`);
      return;
    }

    let categoryHTML = `
      <div class="container">
        <nav class="breadcrumbs">
          <a href="/">Home</a>
          <span class="breadcrumb-separator">›</span>
          <span class="breadcrumb-current">${categoryName}</span>
        </nav>
        
        <div class="category-header">
          <h1>${categoryName}</h1>
          <p class="category-description">
            Explore our collection of ${categoryName.toLowerCase()} tools. 
            All tools are free, fast, and work directly in your browser.
          </p>
        </div>
        
        <div class="category-tools-grid">
    `;

    // Render tools for this category
    for (const tool of categoryTools) {
      categoryHTML += `
        <div class="tool-card">
          <a href="/tools/${tool.slug}/" class="tool-link">
            <h3>${tool.title}</h3>
            <p>${tool.description}</p>
            <span class="tool-arrow">→</span>
          </a>
        </div>
      `;
    }

    categoryHTML += `
        </div>
      </div>
    `;

    toolContainer.innerHTML = categoryHTML;
  }

  groupToolsByCategory() {
    const grouped = {};
    
    for (const tool of this.toolRegistry || []) {
      const category = tool.primaryCategory || 'other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(tool);
    }
    
    return grouped;
  }

  formatCategoryName(category) {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  createBreadcrumbs(toolConfig) {
    const categoryName = this.formatCategoryName(toolConfig.primaryCategory);
    
    return `
      <nav class="breadcrumbs">
        <a href="/">Home</a>
        <span class="breadcrumb-separator">›</span>
        <a href="/category/${toolConfig.primaryCategory}">${categoryName}</a>
        <span class="breadcrumb-separator">›</span>
        <span class="breadcrumb-current">${toolConfig.title}</span>
      </nav>
    `;
  }

  createRelatedToolsSection(toolConfig) {
    if (!toolConfig.relatedTools || toolConfig.relatedTools.length === 0) {
      return '';
    }

    let relatedToolsHTML = `
      <section class="related-tools-section">
        <div class="related-tools-container">
          <h2 class="related-tools-title">Related Tools</h2>
          <p class="related-tools-description">Explore these complementary tools to enhance your workflow</p>
          <div class="related-tools-grid">
    `;

    // Process each related tool
    for (const relatedTool of toolConfig.relatedTools) {
      // Handle both old format (object with slug/name/description) and new format (just slug string)
      let toolSlug, toolName, toolDescription;
      
      if (typeof relatedTool === 'string') {
        // New format: just slug string, look up in registry
        const foundTool = this.toolRegistry.find(tool => tool.slug === relatedTool);
        if (foundTool) {
          toolSlug = foundTool.slug;
          toolName = foundTool.title;
          toolDescription = foundTool.description;
        } else {
          continue; // Skip if tool not found
        }
      } else {
        // Old format: object with slug/name/description
        toolSlug = relatedTool.slug;
        toolName = relatedTool.name;
        toolDescription = relatedTool.description;
      }

      relatedToolsHTML += `
        <div class="related-tool-card">
          <a href="/tools/${toolSlug}/" class="related-tool-link">
            <h3 class="related-tool-name">${toolName}</h3>
            <p class="related-tool-description">${toolDescription}</p>
            <span class="related-tool-arrow">→</span>
          </a>
        </div>
      `;
    }

    relatedToolsHTML += `
          </div>
        </div>
      </section>
    `;

    return relatedToolsHTML;
  }

  hideLoading() {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) {
      loadingElement.style.display = 'none';
    }
  }

  showError(message) {
    const toolContainer = document.getElementById('tool-container');
    toolContainer.innerHTML = `
      <div class="container">
        <div class="error-message">
          <h2>Oops! Something went wrong</h2>
          <p>${message}</p>
          <a href="/" class="btn btn-primary">← Back to Home</a>
        </div>
      </div>
    `;
  }
}

// Initialize the app when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new ToolsApp();
  
  // Smart sticky header - reduce size on scroll (mobile optimization)
  let lastScrollTop = 0;
  const header = document.getElementById('main-header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add 'scrolled' class when scrolling down past 50px
      if (scrollTop > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScrollTop = scrollTop;
    }, { passive: true }); // Passive for better scroll performance
  }
});

// ========================================
// UTILITY FUNCTIONS FOR TOOL DEVELOPERS
// ========================================

/**
 * Toast Notification System
 * Usage: showToast('success', 'File saved successfully!');
 */
window.showToast = function(type, message, actionText = null, actionCallback = null) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  const icons = {
    error: '⚠️',
    success: '✅',
    info: 'ℹ️',
    warning: '⚡'
  };
  
  const icon = icons[type] || icons.info;
  
  toast.innerHTML = `
    <div class="toast-content">
      <span class="toast-icon">${icon}</span>
      <p class="toast-message">${message}</p>
      ${actionText ? `<button class="toast-action">${actionText}</button>` : ''}
    </div>
  `;
  
  document.body.appendChild(toast);
  
  if (actionCallback && actionText) {
    toast.querySelector('.toast-action').addEventListener('click', () => {
      actionCallback();
      toast.remove();
    });
  }
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
  
  return toast;
};

/**
 * Loading State Helper for Buttons
 * Usage: 
 *   showLoading(button, 'Processing...');
 *   // do work
 *   hideLoading(button);
 */
window.showLoading = function(buttonEl, message = 'Processing...') {
  if (!buttonEl) return;
  buttonEl.disabled = true;
  buttonEl.dataset.originalText = buttonEl.textContent;
  buttonEl.innerHTML = `<span class="spinner"></span> ${message}`;
};

window.hideLoading = function(buttonEl) {
  if (!buttonEl) return;
  buttonEl.disabled = false;
  buttonEl.textContent = buttonEl.dataset.originalText || 'Submit';
  delete buttonEl.dataset.originalText;
};

/**
 * Debounce Helper
 * Usage: const debouncedFn = debounce(myFunction, 300);
 */
window.debounce = function(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Character Counter for Text Inputs
 * Usage: addCharCounter('my-textarea-id', 1000);
 */
window.addCharCounter = function(elementId, maxLength = null) {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with id "${elementId}" not found`);
    return;
  }
  
  const counter = document.createElement('div');
  counter.className = 'char-counter';
  counter.style.cssText = `
    font-size: var(--font-size-sm);
    color: var(--text-secondary);
    margin-top: var(--space-1);
    text-align: right;
  `;
  
  function updateCounter() {
    const count = element.value.length;
    counter.textContent = maxLength 
      ? `${count} / ${maxLength} characters`
      : `${count} characters`;
    
    if (maxLength && count > maxLength) {
      counter.style.color = 'var(--error-color)';
      counter.style.fontWeight = 'var(--font-weight-medium)';
    } else {
      counter.style.color = 'var(--text-secondary)';
      counter.style.fontWeight = 'var(--font-weight-normal)';
    }
  }
  
  element.parentNode.insertBefore(counter, element.nextSibling);
  element.addEventListener('input', updateCounter);
  updateCounter();
  
  return counter;
};

/**
 * Fetch with Timeout
 * Usage: const response = await fetchWithTimeout('/api/endpoint', { method: 'POST' }, 10000);
 */
window.fetchWithTimeout = async function(url, options = {}, timeout = 10000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    if (error.name === 'AbortError') {
      throw new Error('Request timeout - please check your connection and try again');
    }
    
    throw error;
  }
};

/**
 * Announce to Screen Readers (Accessibility)
 * Usage: announceToScreenReader('Form submitted successfully');
 */
window.announceToScreenReader = function(message) {
  let liveRegion = document.getElementById('screen-reader-announcements');
  
  if (!liveRegion) {
    liveRegion = document.createElement('div');
    liveRegion.id = 'screen-reader-announcements';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.style.cssText = `
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    `;
    document.body.appendChild(liveRegion);
  }
  
  liveRegion.textContent = message;
  setTimeout(() => { liveRegion.textContent = ''; }, 1000);
};

/**
 * Online/Offline Detection
 */
window.addEventListener('online', () => {
  showToast('success', 'Back online! You can continue using the tools.');
});

window.addEventListener('offline', () => {
  showToast('warning', 'You are offline. Some features may not work.', 'Dismiss');
});

// Export for potential testing or debugging
window.ToolsApp = ToolsApp;
