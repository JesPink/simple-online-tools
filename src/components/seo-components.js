/**
 * FAQ Component with Structured Data
 * 
 * Creates SEO-optimized FAQ sections with Schema.org markup
 * for rich snippets in search results.
 */

export function createFAQSection(faqs, toolName) {
  // Generate FAQ structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Generate HTML with proper markup
  let faqHTML = `
    <section class="content-section">
      <h2>Frequently Asked Questions</h2>
      <script type="application/ld+json">${JSON.stringify(faqStructuredData, null, 2)}</script>
  `;

  faqs.forEach(faq => {
    faqHTML += `
      <div class="faq-item" itemscope itemtype="https://schema.org/Question">
        <h3 itemprop="name">${faq.question}</h3>
        <div itemscope itemtype="https://schema.org/Answer" itemprop="acceptedAnswer">
          <p itemprop="text">${faq.answer}</p>
        </div>
      </div>
    `;
  });

  faqHTML += `</section>`;
  return faqHTML;
}

export function createRelatedToolsSection(relatedTools) {
  let toolsHTML = `
    <section class="content-section">
      <h2>Related Tools</h2>
      <p>Enhance your text analysis and content creation with these complementary tools:</p>
      <div class="related-tools">
  `;

  relatedTools.forEach(tool => {
    toolsHTML += `
      <div class="related-tool">
        <h3><a href="/tools/${tool.slug}/">${tool.name}</a></h3>
        <p>${tool.description}</p>
      </div>
    `;
  });

  toolsHTML += `
      </div>
      <p>
        <strong>Explore our complete collection of text analysis tools</strong> to streamline 
        your writing workflow and create better content faster.
      </p>
    </section>
  `;

  return toolsHTML;
}

export function createBreadcrumbStructuredData(toolName, categoryName, categorySlug) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://simpleonlinetool.com/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": categoryName,
        "item": `https://simpleonlinetool.com/category/${categorySlug}/`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": toolName,
        "item": window.location.href
      }
    ]
  };
}

export default {
  createFAQSection,
  createRelatedToolsSection,
  createBreadcrumbStructuredData
};