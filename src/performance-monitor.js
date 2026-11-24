/**
 * Performance Monitoring and Analytics
 * 
 * This module provides comprehensive performance monitoring using
 * Web Vitals and Performance Observer API.
 */

class PerformanceMonitor {
  constructor() {
    this.metrics = {
      lcp: null,
      fid: null,
      cls: 0,
      fcp: null,
      ttfb: null
    };
    
    this.init();
  }

  init() {
    // Wait for page load
    if (document.readyState === 'complete') {
      this.setupObservers();
    } else {
      window.addEventListener('load', () => {
        this.setupObservers();
      }, { once: true, passive: true });
    }
  }

  setupObservers() {
    if (!('PerformanceObserver' in window)) {
      console.warn('PerformanceObserver not supported');
      return;
    }

    // Largest Contentful Paint (LCP)
    this.observeLCP();
    
    // First Input Delay (FID)
    this.observeFID();
    
    // Cumulative Layout Shift (CLS)
    this.observeCLS();
    
    // First Contentful Paint (FCP)
    this.observeFCP();
    
    // Time to First Byte (TTFB)
    this.measureTTFB();
    
    // Report all metrics after page fully loaded
    this.scheduleReport();
  }

  observeLCP() {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        this.metrics.lcp = lastEntry.renderTime || lastEntry.loadTime;
        
        // Log to console (can be replaced with analytics)
        console.log(`📊 LCP: ${this.metrics.lcp.toFixed(2)}ms`, 
          this.getLCPRating(this.metrics.lcp));
      });
      
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (error) {
      console.warn('LCP observation failed:', error);
    }
  }

  observeFID() {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          this.metrics.fid = entry.processingStart - entry.startTime;
          
          console.log(`📊 FID: ${this.metrics.fid.toFixed(2)}ms`, 
            this.getFIDRating(this.metrics.fid));
        });
      });
      
      observer.observe({ entryTypes: ['first-input'] });
    } catch (error) {
      console.warn('FID observation failed:', error);
    }
  }

  observeCLS() {
    try {
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          // Only count layout shifts without recent input
          if (!entry.hadRecentInput) {
            this.metrics.cls += entry.value;
          }
        }
        
        console.log(`📊 CLS: ${this.metrics.cls.toFixed(3)}`, 
          this.getCLSRating(this.metrics.cls));
      });
      
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('CLS observation failed:', error);
    }
  }

  observeFCP() {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach(entry => {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.fcp = entry.startTime;
            
            console.log(`📊 FCP: ${this.metrics.fcp.toFixed(2)}ms`, 
              this.getFCPRating(this.metrics.fcp));
          }
        });
      });
      
      observer.observe({ entryTypes: ['paint'] });
    } catch (error) {
      console.warn('FCP observation failed:', error);
    }
  }

  measureTTFB() {
    try {
      const navigationEntry = performance.getEntriesByType('navigation')[0];
      if (navigationEntry) {
        this.metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        
        console.log(`📊 TTFB: ${this.metrics.ttfb.toFixed(2)}ms`, 
          this.getTTFBRating(this.metrics.ttfb));
      }
    } catch (error) {
      console.warn('TTFB measurement failed:', error);
    }
  }

  scheduleReport() {
    // Report metrics after 5 seconds of page load
    setTimeout(() => {
      this.reportMetrics();
    }, 5000);
  }

  reportMetrics() {
    console.group('📊 Performance Report');
    console.table({
      'LCP (Largest Contentful Paint)': {
        value: this.metrics.lcp ? `${this.metrics.lcp.toFixed(2)}ms` : 'N/A',
        rating: this.metrics.lcp ? this.getLCPRating(this.metrics.lcp) : 'N/A',
        target: '< 2500ms'
      },
      'FID (First Input Delay)': {
        value: this.metrics.fid ? `${this.metrics.fid.toFixed(2)}ms` : 'N/A',
        rating: this.metrics.fid ? this.getFIDRating(this.metrics.fid) : 'N/A',
        target: '< 100ms'
      },
      'CLS (Cumulative Layout Shift)': {
        value: this.metrics.cls.toFixed(3),
        rating: this.getCLSRating(this.metrics.cls),
        target: '< 0.1'
      },
      'FCP (First Contentful Paint)': {
        value: this.metrics.fcp ? `${this.metrics.fcp.toFixed(2)}ms` : 'N/A',
        rating: this.metrics.fcp ? this.getFCPRating(this.metrics.fcp) : 'N/A',
        target: '< 1800ms'
      },
      'TTFB (Time to First Byte)': {
        value: this.metrics.ttfb ? `${this.metrics.ttfb.toFixed(2)}ms` : 'N/A',
        rating: this.metrics.ttfb ? this.getTTFBRating(this.metrics.ttfb) : 'N/A',
        target: '< 800ms'
      }
    });
    console.groupEnd();

    // Send to analytics if configured
    this.sendToAnalytics();
  }

  sendToAnalytics() {
    // Integration point for Google Analytics 4
    if (typeof gtag === 'function') {
      // Send Web Vitals to GA4
      if (this.metrics.lcp) {
        gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'LCP',
          value: Math.round(this.metrics.lcp),
          non_interaction: true
        });
      }

      if (this.metrics.fid) {
        gtag('event', 'web_vitals', {
          event_category: 'Web Vitals',
          event_label: 'FID',
          value: Math.round(this.metrics.fid),
          non_interaction: true
        });
      }

      gtag('event', 'web_vitals', {
        event_category: 'Web Vitals',
        event_label: 'CLS',
        value: Math.round(this.metrics.cls * 1000), // GA4 expects integer
        non_interaction: true
      });
    }
  }

  // Rating helpers based on Core Web Vitals thresholds
  getLCPRating(value) {
    if (value <= 2500) return '✅ Good';
    if (value <= 4000) return '⚠️ Needs Improvement';
    return '❌ Poor';
  }

  getFIDRating(value) {
    if (value <= 100) return '✅ Good';
    if (value <= 300) return '⚠️ Needs Improvement';
    return '❌ Poor';
  }

  getCLSRating(value) {
    if (value <= 0.1) return '✅ Good';
    if (value <= 0.25) return '⚠️ Needs Improvement';
    return '❌ Poor';
  }

  getFCPRating(value) {
    if (value <= 1800) return '✅ Good';
    if (value <= 3000) return '⚠️ Needs Improvement';
    return '❌ Poor';
  }

  getTTFBRating(value) {
    if (value <= 800) return '✅ Good';
    if (value <= 1800) return '⚠️ Needs Improvement';
    return '❌ Poor';
  }

  // Public API to get current metrics
  getMetrics() {
    return { ...this.metrics };
  }
}

// Auto-initialize in development/staging environments
if (window.location.hostname === 'localhost' || 
    window.location.hostname.includes('127.0.0.1') ||
    window.location.hostname.includes('pages.dev')) {
  window.performanceMonitor = new PerformanceMonitor();
}

// Export for manual initialization in production
export default PerformanceMonitor;
