# Resource Optimization Guide

This document outlines best practices for resource loading and optimization in the Simple Online Tool platform.

---

## Image Optimization

### 1. Lazy Loading Images

**For SEO Content Images:**

```html
<!-- Use data-src instead of src for lazy loading -->
<img 
  data-src="/images/tool-screenshot.jpg"
  alt="Tool screenshot"
  width="800"
  height="600"
  class="seo-image"
/>
```

**Important Rules:**
- ✅ **Always include width and height** to prevent layout shift
- ✅ Use `data-src` for below-fold images
- ✅ Use regular `src` for above-fold images (hero, tool interface)
- ✅ Provide descriptive alt text for SEO and accessibility

**Automatic Behavior:**
- Images load when they're 50px from entering viewport
- Smooth fade-in animation when loaded
- Fallback for browsers without IntersectionObserver

### 2. Image Formats and Compression

**Recommended Workflow:**

1. **Use Modern Formats:**
   ```html
   <picture>
     <source srcset="/images/tool.webp" type="image/webp">
     <source srcset="/images/tool.jpg" type="image/jpeg">
     <img src="/images/tool.jpg" alt="Tool">
   </picture>
   ```

2. **Optimize File Sizes:**
   - Screenshots: 80-90% JPEG quality
   - Icons/logos: SVG or optimized PNG
   - Hero images: < 100KB after compression
   - Thumbnails: < 20KB

3. **Responsive Images:**
   ```html
   <img 
     src="/images/tool-800.jpg"
     srcset="
       /images/tool-400.jpg 400w,
       /images/tool-800.jpg 800w,
       /images/tool-1200.jpg 1200w
     "
     sizes="(max-width: 768px) 400px, (max-width: 1024px) 800px, 1200px"
     alt="Tool screenshot"
   />
   ```

---

## JavaScript Optimization

### 1. Code Splitting (Automatic)

The platform automatically splits code:
- Main app bundle: `app.js`
- Individual tool modules: `tools/[tool-slug]/index.js`
- Shared components: `components/*.js`

**Tool modules are lazy-loaded only when needed.**

### 2. Prefetch Hints (Automatic)

When users hover over tool links, the platform automatically prefetches:
- Tool JavaScript modules
- Related assets

**Manual Prefetch:**
```javascript
// In your tool's init() function
const relatedTool = document.querySelector('[data-tool="related-slug"]');
if (relatedTool) {
  // Prefetch will happen automatically on hover
}
```

### 3. Defer Non-Critical JavaScript

**In esbuild.config.js:**
```javascript
// Non-critical scripts should be deferred
<script defer src="/analytics.js"></script>
<script defer src="/rating-widget.js"></script>
```

---

## CSS Optimization

### 1. Critical CSS (Inline)

**Critical styles already inlined in index.html:**
- Skip-to-content styles
- Rating widget styles
- Loading spinner

**For additional critical styles:**
```html
<style>
  /* Only include absolutely critical styles */
  .above-fold-content { /* ... */ }
</style>
```

### 2. Font Loading Strategy

**Current Strategy (Optimized):**
```css
/* System font stack - No external fonts */
--font-family-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", ...;
```

**If Using Custom Fonts:**
```html
<!-- Preload critical font -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

<!-- Font with font-display: swap -->
<style>
  @font-face {
    font-family: 'Inter';
    src: url('/fonts/inter-var.woff2') format('woff2');
    font-display: swap; /* Show fallback immediately */
    font-weight: 100 900;
  }
</style>
```

---

## API Optimization

### 1. Caching Strategy

**For Static Assets (Already Configured):**
```
Cache-Control: public, max-age=31536000, immutable
```

**For Dynamic Content:**
```javascript
// In Cloudflare Workers
export default {
  async fetch(request, env, ctx) {
    const cache = caches.default;
    
    // Try cache first
    let response = await cache.match(request);
    
    if (!response) {
      response = await fetch(request);
      
      // Cache for 5 minutes
      const headers = new Headers(response.headers);
      headers.set('Cache-Control', 'public, max-age=300');
      
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: headers
      });
      
      ctx.waitUntil(cache.put(request, response.clone()));
    }
    
    return response;
  }
}
```

### 2. Request Optimization

**Use the provided utility:**
```javascript
// Automatically includes timeout
const response = await fetchWithTimeout('/api/tool', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
}, 10000); // 10 second timeout
```

**Best Practices:**
- ✅ Use timeouts (10s for file processing, 5s for data)
- ✅ Show loading states
- ✅ Handle errors gracefully
- ✅ Implement retry logic for failed requests

---

## Performance Monitoring

### 1. Core Web Vitals

**Automatic Monitoring (Development):**
The platform automatically monitors:
- **LCP (Largest Contentful Paint):** Target < 2.5s
- **FID (First Input Delay):** Target < 100ms
- **CLS (Cumulative Layout Shift):** Target < 0.1
- **FCP (First Contentful Paint):** Target < 1.8s
- **TTFB (Time to First Byte):** Target < 800ms

**View Metrics:**
```javascript
// In browser console
window.performanceMonitor.getMetrics();
```

### 2. Performance Budget

**Targets for Each Tool Page:**
- Total page size: < 500KB (uncompressed)
- JavaScript bundle: < 150KB (uncompressed)
- CSS bundle: < 50KB (uncompressed)
- Images: < 300KB total
- Time to Interactive: < 3s on 3G

**Check Current Size:**
```bash
# After build
npm run build

# Analyze bundle sizes
du -sh dist/**/*.js
du -sh dist/**/*.css
```

---

## Checklist for New Tools

### Performance Optimization Checklist

**Images:**
- [ ] All below-fold images use `data-src` for lazy loading
- [ ] Width and height attributes provided
- [ ] Images compressed (< 100KB for screenshots)
- [ ] Alt text provided for all images

**JavaScript:**
- [ ] No large external libraries (use vanilla JS)
- [ ] Debounce expensive operations (search, validation)
- [ ] Use provided utility functions (`debounce`, `fetchWithTimeout`)
- [ ] No blocking operations in init()

**CSS:**
- [ ] Tool-specific styles scoped to `.tool-slug-tool`
- [ ] Use CSS variables (no hardcoded values)
- [ ] No complex animations on mobile
- [ ] Foundation classes used where possible

**User Experience:**
- [ ] Loading states for async operations (`showLoading/hideLoading`)
- [ ] Toast notifications for feedback (`showToast`)
- [ ] Character counters for text inputs (`addCharCounter`)
- [ ] Error handling with user-friendly messages

**Testing:**
- [ ] Test on mobile (375px width)
- [ ] Check Lighthouse score (target: 95+)
- [ ] Verify no console errors
- [ ] Test on slow 3G connection

---

## Performance Tips by Tool Type

### Text Processing Tools (Word Counter, Case Converter)
- ✅ Debounce input handlers (200-300ms)
- ✅ Use `requestAnimationFrame` for DOM updates
- ✅ Process large texts in chunks

```javascript
const debouncedAnalyze = debounce((text) => {
  // Process text
  requestAnimationFrame(() => {
    // Update UI
    updateResults(analysis);
  });
}, 250);

textarea.addEventListener('input', (e) => {
  debouncedAnalyze(e.target.value);
});
```

### File Processing Tools (PDF Editor, Image Optimizer)
- ✅ Use Web Workers for heavy processing
- ✅ Show progress indicators
- ✅ Stream large files instead of loading all at once

```javascript
const processFile = async (file) => {
  showLoading(btn, 'Processing...');
  
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await fetchWithTimeout('/api/process', {
      method: 'POST',
      body: formData
    }, 30000); // 30s for file processing
    
    const result = await response.json();
    showToast('success', 'File processed successfully!');
    return result;
  } catch (error) {
    showToast('error', 'Processing failed. Please try again.');
    throw error;
  } finally {
    hideLoading(btn);
  }
};
```

### Calculator Tools (Meeting Cost, Recipe Scaler)
- ✅ Calculate on input (instant feedback)
- ✅ No API calls needed
- ✅ Validate inputs before calculation

```javascript
const calculate = () => {
  const value = parseFloat(input.value);
  
  if (isNaN(value) || value < 0) {
    showToast('warning', 'Please enter a valid number');
    return;
  }
  
  const result = performCalculation(value);
  updateDisplay(result);
};

input.addEventListener('input', debounce(calculate, 100));
```

---

## Advanced Optimizations

### 1. Service Worker (Future Enhancement)

**For offline capability:**
```javascript
// service-worker.js
const CACHE_NAME = 'simple-tools-v1';
const urlsToCache = [
  '/',
  '/styles/base.css',
  '/styles/layout.css',
  '/app.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

### 2. HTTP/2 Server Push (Cloudflare Pages)

**In _headers file:**
```
/tools/*
  Link: </styles/base.css>; rel=preload; as=style
  Link: </styles/layout.css>; rel=preload; as=style
  Link: </app.js>; rel=preload; as=script
```

### 3. Brotli Compression (Automatic on Cloudflare)

**Cloudflare automatically compresses:**
- HTML: ~70% size reduction
- CSS: ~80% size reduction
- JavaScript: ~75% size reduction

---

## Monitoring and Analytics

### 1. Performance Dashboard (Future)

**Key Metrics to Track:**
- Average LCP by tool
- 95th percentile load time
- Error rates by tool
- User engagement (time on page)

### 2. Real User Monitoring (RUM)

**Integration with Google Analytics:**
```javascript
// Already implemented in performance-monitor.js
// Metrics automatically sent to GA4 when available
```

---

## Resources

**Tools:**
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [WebPageTest](https://www.webpagetest.org/)
- [Chrome DevTools Performance Panel](https://developer.chrome.com/docs/devtools/performance/)

**Documentation:**
- [Web Vitals](https://web.dev/vitals/)
- [Image Optimization](https://web.dev/fast/#optimize-your-images)
- [JavaScript Performance](https://web.dev/fast/#optimize-your-javascript)

---

**Last Updated:** October 8, 2025  
**Status:** Phase 2 - Performance Optimization Complete
