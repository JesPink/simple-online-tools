import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Normalize paths to use forward slashes consistently (platform-agnostic)
function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/');
}

async function buildSite() {
  try {
    console.log('🚀 Building Free Tools Platform with Cache Busting...');

    // Clean dist directory
    if (fs.existsSync('dist')) {
      fs.rmSync('dist', { recursive: true, force: true });
    }
    fs.mkdirSync('dist', { recursive: true });
    fs.mkdirSync('dist/tools', { recursive: true });

    // Copy public assets to dist
    if (fs.existsSync('public')) {
      copyDirectory('public', 'dist');
    }

    // Read tool registry
    const toolRegistryPath = path.join('src', 'tool-registry.json');
    if (!fs.existsSync(toolRegistryPath)) {
      throw new Error('tool-registry.json not found in src/');
    }

    const toolRegistry = JSON.parse(fs.readFileSync(toolRegistryPath, 'utf8'));
    console.log(`📚 Found ${toolRegistry.length} tools in registry`);

    // Initialize hash tracking for asset references
    let assetHashes = new Map();

    // Read template HTML early (will be updated with hashes later)
    const templatePath = path.join('src', 'index.html');
    if (!fs.existsSync(templatePath)) {
      throw new Error('index.html template not found in src/');
    }
    let baseTemplateHtml = fs.readFileSync(templatePath, 'utf8');

    // Generate static pages (About, Privacy, Terms, Contact) with clean URLs
    const staticPages = [
      { name: 'about', title: 'About Us - Simple Online Tools' },
      { name: 'privacy', title: 'Privacy Policy - Simple Online Tools' },
      { name: 'terms', title: 'Terms of Service - Simple Online Tools' },
      { name: 'contact', title: 'Contact - Simple Online Tools' }
    ];

    for (const staticPage of staticPages) {
      const staticPagePath = path.join('src', `${staticPage.name}.html`);
      if (fs.existsSync(staticPagePath)) {
        // Create directory for clean URL structure
        const pageDir = path.join('dist', staticPage.name);
        fs.mkdirSync(pageDir, { recursive: true });
        
        // Copy the static page content to /pagename/index.html for clean URLs
        fs.copyFileSync(staticPagePath, path.join(pageDir, 'index.html'));
        console.log(`✅ Generated static page: ${staticPage.name}/index.html`);
      }
    }

    // Create category directory structure
    fs.mkdirSync('dist/category', { recursive: true });

    // Generate category pages using directory-based routing (using base template for now)
    const categories = [...new Set(toolRegistry.map(tool => tool.primaryCategory))];
    for (const category of categories) {
      const categoryTools = toolRegistry.filter(tool => tool.primaryCategory === category);
      const categoryName = category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      const categoryHtml = baseTemplateHtml
        .replace(/<!--SEO_TITLE-->/g, `${categoryName} - Free Online Tools`)
        .replace(/<!--SEO_DESCRIPTION-->/g, `Discover our collection of ${categoryName.toLowerCase()} tools. Free, fast, and no sign-up required.`)
        .replace(/<!--SEO_KEYWORDS-->/g, `${categoryName.toLowerCase()}, free tools, online tools, ${category}`)
        .replace(/<!--OG_URL-->/g, `https://simpleonlinetool.com/category/${category}/`)
        .replace(/<!--OG_IMAGE-->/g, `https://simpleonlinetool.com/images/${category}-preview.jpg`)
        .replace(/<!--TWITTER_IMAGE-->/g, `https://simpleonlinetool.com/images/${category}-preview.jpg`)
        .replace('<body>', `<body data-category-slug="${category}">`);

      // Create category directory and index.html file for clean URLs
      const categoryDir = path.join('dist', 'category', category);
      fs.mkdirSync(categoryDir, { recursive: true });
      const categoryPath = path.join(categoryDir, 'index.html');
      fs.writeFileSync(categoryPath, categoryHtml);
      // Normalize path for consistent output (convert backslashes to forward slashes)
      const normalizedCategoryPath = categoryPath.replace(/\\/g, '/');
      console.log(`✅ Generated category page: ${normalizedCategoryPath}`);
    }

    // Generate individual tool pages with SEO content extraction
    for (const tool of toolRegistry) {
      // Use enhanced SEO metadata if available
      const metaTitle = tool.seo?.metaTitle || tool.title;
      const metaDescription = tool.seo?.metaDescription || tool.description;
      const metaKeywords = tool.keywords;

      // Extract SEO content from tool's render() function
      const toolSeoContent = extractSeoContentFromTool(tool.slug);

      let toolHtml = baseTemplateHtml
        .replace(/<!--SEO_TITLE-->/g, metaTitle)
        .replace(/<!--SEO_DESCRIPTION-->/g, metaDescription)
        .replace(/<!--SEO_KEYWORDS-->/g, metaKeywords)
        .replace(/<!--SEO_H1_TITLE-->/g, tool.title) // For server-side H1
        .replace(/<!--SEO_H1_DESCRIPTION-->/g, tool.description) // For server-side description
        .replace(/<!--OG_URL-->/g, `https://simpleonlinetool.com/tools/${tool.slug}/`)
        .replace(/<!--OG_IMAGE-->/g, `https://simpleonlinetool.com/images/${tool.slug}-preview.jpg`)
        .replace(/<!--TWITTER_IMAGE-->/g, `https://simpleonlinetool.com/images/${tool.slug}-preview.jpg`)
        .replace('<body>', `<body data-tool-slug="${tool.slug}">`);

      // Add additional SEO meta tags with clean URLs
      let additionalMeta = '';
      if (tool.seo?.canonicalUrl) {
        // Use the clean canonical URL directly
        additionalMeta += `    <link rel="canonical" href="https://simpleonlinetool.com${tool.seo.canonicalUrl}">\n`;
      }
      if (tool.seo?.lastModified) {
        additionalMeta += `    <meta name="last-modified" content="${tool.seo.lastModified}">\n`;
      }
      if (tool.seo?.author) {
        additionalMeta += `    <meta name="author" content="${tool.seo.author}">\n`;
      }
      
      if (additionalMeta) {
        toolHtml = toolHtml.replace('</head>', `${additionalMeta}</head>`);
      }

      // Update tool-specific asset references with hashes
      toolHtml = updateToolAssetReferences(toolHtml, tool.slug, assetHashes);

      // Inject tool-specific CSS if it exists (non-bundled CSS files don't get hashed)
      const toolStylePath = path.join('src', 'tools', tool.slug, 'style.css');
      if (fs.existsSync(toolStylePath)) {
        const cssLinkTag = `<link rel="stylesheet" href="/tools/${tool.slug}/style.css">`;
        toolHtml = toolHtml.replace('</head>', `    ${cssLinkTag}\n</head>`);
      }

      // Inject static SEO content for search engine crawling
      if (toolSeoContent) {
        toolHtml = toolHtml.replace('<!--STATIC_SEO_CONTENT-->', toolSeoContent);
        console.log(`✅ Injected SEO content for ${tool.slug}`);
      } else {
        toolHtml = toolHtml.replace('<!--STATIC_SEO_CONTENT-->', '');
      }

      // LCP OPTIMIZATION: Preload tool-specific JavaScript (use hashed version if available)
      const toolJsPath = path.join('src', 'tools', tool.slug, 'index.js');
      if (fs.existsSync(toolJsPath)) {
        let preloadPath = `/tools/${tool.slug}/index.js`;
        if (assetHashes.has(tool.slug)) {
          preloadPath = assetHashes.get(tool.slug).replace('dist/', '/');
        }
        const jsPreloadTag = `<link rel="preload" href="${preloadPath}" as="script" crossorigin>`;
        toolHtml = toolHtml.replace('<!--TOOL_PRELOAD-->', jsPreloadTag);
      }

      // Create enhanced JSON-LD schema markup for WebApplication and HowTo guide
      const webApplicationSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": tool.title,
        "description": tool.description,
        "url": `https://simpleonlinetool.com/tools/${tool.slug}/`,
        "applicationCategory": "UtilityApplication",
        "operatingSystem": "Any",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "creator": {
          "@type": "Organization",
          "name": "Simple Online Tools",
          "url": "https://simpleonlinetool.com"
        },
        "datePublished": tool.seo?.lastModified || "2025-09-16",
        "dateModified": tool.seo?.lastModified || "2025-09-16",
        "inLanguage": "en-US",
        "isAccessibleForFree": true
      };

      // Create HowTo schema for tool usage
      const howToSchema = {
        "@context": "https://schema.org",
        "@type": "HowTo",
        "name": `How to Use ${tool.title}`,
        "description": `Step-by-step guide on using our ${tool.title.toLowerCase()} tool.`,
        "totalTime": "PT2M",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "USD",
          "value": "0"
        },
        "supply": [
          {
            "@type": "HowToSupply",
            "name": "Web Browser"
          },
          {
            "@type": "HowToSupply", 
            "name": "Internet Connection"
          }
        ],
        "tool": [
          {
            "@type": "HowToTool",
            "name": tool.title
          }
        ],
        "step": [
          {
            "@type": "HowToStep",
            "position": 1,
            "name": "Open the Tool",
            "text": `Navigate to the ${tool.title} page on our website.`,
            "url": `https://simpleonlinetool.com/tools/${tool.slug}/`
          },
          {
            "@type": "HowToStep",
            "position": 2,
            "name": "Input Your Data",
            "text": `Enter or paste your content into the input field.`
          },
          {
            "@type": "HowToStep",
            "position": 3,
            "name": "Get Results",
            "text": `View the instant results and analysis provided by our tool.`
          }
        ]
      };

      // Add breadcrumb structured data
      const categoryName = tool.primaryCategory
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const breadcrumbSchema = {
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
            "item": `https://simpleonlinetool.com/category/${tool.primaryCategory}/`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": tool.title,
            "item": `https://simpleonlinetool.com/tools/${tool.slug}/`
          }
        ]
      };

      // Extract FAQ schema from tool SEO content
      const faqSchema = extractFAQSchema(toolSeoContent, tool.slug);

      // Create the comprehensive schema markup script tags (including FAQ if found)
      let schemaMarkup = `
    <script type="application/ld+json">${JSON.stringify(webApplicationSchema, null, 2)}</script>
    <script type="application/ld+json">${JSON.stringify(howToSchema, null, 2)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbSchema, null, 2)}</script>`;
      
      if (faqSchema) {
        schemaMarkup += `
    <script type="application/ld+json">${JSON.stringify(faqSchema, null, 2)}</script>`;
        console.log(`✅ Generated FAQPage schema for ${tool.slug} with ${faqSchema.mainEntity.length} questions`);
      }
      
      // Inject schema markup using the new placeholder
      toolHtml = toolHtml.replace('<!--SCHEMA_MARKUP-->', schemaMarkup);

      // Tool foundation compliance is validated by npm run validate before this build process

      // Apply tool-specific critical CSS inlining for performance optimization
      toolHtml = inlineCriticalCSS(toolHtml, tool.slug);

      // Create clean URL structure: /tools/tool-slug/ (instead of /tools/tool-slug.html)
      const toolDir = path.join('dist', 'tools', tool.slug);
      fs.mkdirSync(toolDir, { recursive: true });
      const toolPath = path.join(toolDir, 'index.html');
      fs.writeFileSync(toolPath, toolHtml);
      // Normalize path for consistent output (convert backslashes to forward slashes)
      const normalizedToolPath = toolPath.replace(/\\/g, '/');
      console.log(`✅ Generated tool page: ${normalizedToolPath} (clean URL: /tools/${tool.slug}/)`);
    }

    // Bundle CSS with content hashing for cache busting
    const cssResult = await esbuild.build({
      entryPoints: [
        'src/styles/base.css',
        'src/styles/layout.css'
      ],
      bundle: true,
      outdir: 'dist/styles',
      minify: process.env.NODE_ENV === 'production',
      sourcemap: process.env.NODE_ENV !== 'production',
      entryNames: '[name].[hash]', // Content-based hashing
      metafile: true,
      write: true
    });
    
    // Extract CSS hash information for HTML updates
    const cssHashes = new Map();
    Object.entries(cssResult.metafile.outputs).forEach(([path, info]) => {
      const normalizedPath = normalizePath(path);
      const filename = path.split('/').pop();
      const baseName = filename.split('.')[0];
      cssHashes.set(baseName, normalizedPath);
    });
    
    console.log('✅ Bundled CSS files with content hashing');

    // Bundle main app.js with content hashing
    const appResult = await esbuild.build({
      entryPoints: ['src/app.js'],
      bundle: true,
      format: 'esm',
      outdir: 'dist',
      minify: process.env.NODE_ENV === 'production',
      sourcemap: process.env.NODE_ENV !== 'production',
      splitting: true,
      entryNames: '[name].[hash]', // Content-based hashing
      chunkNames: '[name].[hash]', // Hash shared chunks too
      metafile: true,
      write: true
    });
    
    // Extract JS hash information for HTML updates
    const jsHashes = new Map();
    Object.entries(appResult.metafile.outputs).forEach(([path, info]) => {
      const normalizedPath = normalizePath(path);
      const filename = path.split('/').pop();
      const baseName = filename.split('.')[0];
      jsHashes.set(baseName, normalizedPath);
    });

    // Bundle individual tool modules that have imports with content hashing
    const toolHashes = new Map();
    for (const tool of toolRegistry) {
      const toolJsPath = path.join('src', 'tools', tool.slug, 'index.js');
      if (fs.existsSync(toolJsPath)) {
        // Check if the tool has imports (indicates it needs bundling)
        const toolContent = fs.readFileSync(toolJsPath, 'utf8');
        if (toolContent.includes('import ') && toolContent.includes('from ')) {
          // This tool has imports - bundle it with content hashing
          const toolDistDir = path.join('dist', 'tools', tool.slug);
          fs.mkdirSync(toolDistDir, { recursive: true });
          
          const toolResult = await esbuild.build({
            entryPoints: [toolJsPath],
            bundle: true,
            format: 'esm',
            outdir: toolDistDir,
            minify: process.env.NODE_ENV === 'production',
            sourcemap: process.env.NODE_ENV !== 'production',
            external: [], // Bundle all dependencies
            entryNames: 'index.[hash]', // Content-based hashing for tools
            metafile: true,
            write: true,
            define: {
              'global': 'globalThis' // Fix for pdf-lib Node.js compatibility in browser
            }
          });
          
          // Extract tool hash information
          Object.entries(toolResult.metafile.outputs).forEach(([path, info]) => {
            const normalizedPath = normalizePath(path);
            if (normalizedPath.includes(`/${tool.slug}/`)) {
              toolHashes.set(tool.slug, normalizedPath);
            }
          });
          
          console.log(`✅ Bundled tool: ${tool.slug} (with content hashing)`);
        }
      }
    }
    
    // Merge all asset hashes for template replacement
    assetHashes = new Map([...cssHashes, ...jsHashes, ...toolHashes]);
    
    console.log('✅ Bundled JavaScript files with content hashing');
    
    // Update all generated HTML files with hashed asset references
    updateGeneratedFilesWithHashes(assetHashes);
    
    console.log('✅ Updated all HTML files with hashed asset references');

    // Generate homepage with hashed assets
    let templateHtml = updateAssetReferences(baseTemplateHtml, assetHashes);
    templateHtml = inlineCriticalCSS(templateHtml);

    const homepageHtml = templateHtml
      .replace(/<!--SEO_TITLE-->/g, 'Simple Online Tools - No Sign-up Required')
      .replace(/<!--SEO_DESCRIPTION-->/g, 'Discover our collection of simple online tools for text processing, calculations, conversions, and more. Fast, secure, and no registration needed.')
      .replace(/<!--SEO_KEYWORDS-->/g, 'simple online tools, free tools, text tools, calculators, converters')
      .replace(/<!--OG_URL-->/g, 'https://simpleonlinetool.com/')
      .replace(/<!--OG_IMAGE-->/g, 'https://simpleonlinetool.com/images/homepage-preview.jpg')
      .replace(/<!--TWITTER_IMAGE-->/g, 'https://simpleonlinetool.com/images/homepage-preview.jpg')
      .replace('<body>', '<body data-tool-slug="">');

    fs.writeFileSync(path.join('dist', 'index.html'), homepageHtml);
    console.log('✅ Generated homepage with hashed assets: dist/index.html');

    // Copy component files
    if (fs.existsSync('src/components')) {
      copyDirectory('src/components', 'dist/components');
      console.log('✅ Copied component files');
    }

    // Copy tool files to dist (skip index.js files that were bundled)
    if (fs.existsSync('src/tools')) {
      copyToolFiles('src/tools', 'dist/tools', toolRegistry);
      console.log('✅ Copied tool files');
    }

    // Update tool registry with hashed asset paths and copy to dist
    const updatedRegistry = toolRegistry.map(tool => {
      const updatedTool = { ...tool };
      // Update jsPath if tool was bundled with hash
      if (assetHashes.has(tool.slug)) {
        updatedTool.jsPath = assetHashes.get(tool.slug).replace('dist/', './');
      }
      return updatedTool;
    });
    
    fs.writeFileSync('dist/tool-registry.json', JSON.stringify(updatedRegistry, null, 2));
    console.log('✅ Generated tool registry with hashed asset paths');

    // Generate sitemap.xml
    generateSitemap(toolRegistry);
    
    // Generate or update robots.txt
    generateRobotsTxt();

    console.log('🎉 Build completed successfully with cache busting!');
    console.log('📁 Output directory: ./dist/');
    console.log('🔄 Cache busting assets generated:', assetHashes.size);
    console.log('🌐 You can now serve the dist/ folder with any static hosting service');
    
    // Log cache busting information for debugging
    if (assetHashes.size > 0) {
      console.log('\n📋 Cache Busting Summary:');
      for (const [name, path] of assetHashes.entries()) {
        console.log(`  ${name}: ${path.replace('dist/', '/')}`);
      }
    }

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

function generateSitemap(toolRegistry) {
  const baseUrl = 'https://simpleonlinetool.com';
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  const staticPages = ['about', 'privacy', 'terms', 'contact'];
  
  let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
`;

  // Add static pages to sitemap
  sitemapContent += `  <!-- Static Pages -->
`;
  for (const page of staticPages) {
    sitemapContent += `  <url>
    <loc>${baseUrl}/${page}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  }

  // Add category pages to sitemap
  const categories = [...new Set(toolRegistry.map(tool => tool.primaryCategory))];
  for (const category of categories) {
    sitemapContent += `  <!-- Category: ${category} -->
  <url>
    <loc>${baseUrl}/category/${category}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  }

  // Add tool pages to sitemap
  sitemapContent += `  <!-- Tool Pages -->
`;
  for (const tool of toolRegistry) {
    const lastModified = tool.seo?.lastModified || currentDate;
    sitemapContent += `  <url>
    <loc>${baseUrl}/tools/${tool.slug}</loc>
    <lastmod>${lastModified}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
`;
  }

  sitemapContent += `</urlset>`;

  // Write sitemap.xml to dist directory
  const sitemapPath = path.join('dist', 'sitemap.xml');
  fs.writeFileSync(sitemapPath, sitemapContent);
  console.log('✅ Generated sitemap.xml with', toolRegistry.length + categories.length + staticPages.length + 1, 'URLs');
}

function generateRobotsTxt() {
  // SEO-OPTIMIZED: Validator-friendly robots.txt per official standards
  // Reference: https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt
  const robotsContent = `# Sitemap location (best practice: at top)
Sitemap: https://simpleonlinetool.com/sitemap.xml

# Block AI training crawlers and scrapers
User-agent: GPTBot
User-agent: CCBot
User-agent: Google-Extended
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: Claude-Web
User-agent: Amazonbot
User-agent: Applebot-Extended
User-agent: Bytespider
User-agent: meta-externalagent
User-agent: anthropic-ai
User-agent: cohere-ai
User-agent: Omgilibot
User-agent: FacebookBot
User-agent: Diffbot
Disallow: /

# Default rules for all other crawlers (Google, Bing, etc.)
User-agent: *
Allow: /
Disallow: /src/
Disallow: /node_modules/
Disallow: /*.json$`;

  const robotsPath = path.join('dist', 'robots.txt');
  fs.writeFileSync(robotsPath, robotsContent);
  console.log('✅ Generated SEO-optimized validator-friendly robots.txt');
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyToolFiles(src, dest, toolRegistry) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const files = fs.readdirSync(src);
  
  for (const file of files) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    
    if (fs.statSync(srcPath).isDirectory()) {
      // This is a tool directory
      fs.mkdirSync(destPath, { recursive: true });
      
      // Check if this tool was bundled
      const tool = toolRegistry.find(t => t.slug === file);
      const toolJsPath = path.join(srcPath, 'index.js');
      const isBundled = tool && fs.existsSync(toolJsPath) && 
                       fs.readFileSync(toolJsPath, 'utf8').includes('import ') && 
                       fs.readFileSync(toolJsPath, 'utf8').includes('from ');
      
      // Copy all files in the tool directory
      const toolFiles = fs.readdirSync(srcPath);
      for (const toolFile of toolFiles) {
        const toolFileSrc = path.join(srcPath, toolFile);
        const toolFileDest = path.join(destPath, toolFile);
        
        // Skip copying index.js if it was bundled (esbuild already created it)
        if (toolFile === 'index.js' && isBundled) {
          continue;
        }
        
        fs.copyFileSync(toolFileSrc, toolFileDest);
      }
    }
  }
}

// Check if running in watch mode
const isWatchMode = process.argv.includes('--watch');

if (isWatchMode) {
  console.log('👀 Starting watch mode...');
  
  // Initial build
  await buildSite();
  
  // Watch for changes in src directory
  const chokidar = await import('chokidar');
  const watcher = chokidar.default.watch(['src/**/*'], {
    ignored: /node_modules/,
    persistent: true
  });
  
  let buildTimeout;
  
  watcher.on('change', (path) => {
    console.log(`📝 File changed: ${path}`);
    
    // Debounce builds to avoid multiple rapid rebuilds
    clearTimeout(buildTimeout);
    buildTimeout = setTimeout(async () => {
      try {
        await buildSite();
        console.log('🔄 Rebuild completed');
      } catch (error) {
        console.error('❌ Rebuild failed:', error.message);
      }
    }, 300);
  });
  
  console.log('👀 Watching for changes... Press Ctrl+C to stop');
  
  // Keep the process alive
  process.on('SIGINT', () => {
    console.log('\n👋 Stopping watch mode...');
    watcher.close();
    process.exit(0);
  });
  
} else {
  // Run single build
  buildSite();
}

// Function to update asset references with hashed versions
function updateAssetReferences(html, assetHashes) {
  let updatedHtml = html;
  
  // Update main app.js reference
  if (assetHashes.has('app')) {
    const hashedPath = assetHashes.get('app').replace('dist/', '/');
    updatedHtml = updatedHtml.replaceAll('/app.js', hashedPath);
  }
  
  // Update CSS references
  if (assetHashes.has('base')) {
    const hashedPath = assetHashes.get('base').replace('dist/', '/');
    updatedHtml = updatedHtml.replaceAll('/styles/base.css', hashedPath);
  }
  
  if (assetHashes.has('layout')) {
    const hashedPath = assetHashes.get('layout').replace('dist/', '/');
    updatedHtml = updatedHtml.replaceAll('/styles/layout.css', hashedPath);
  }
  
  return updatedHtml;
}

// Function to update tool-specific asset references
function updateToolAssetReferences(html, toolSlug, assetHashes) {
  let updatedHtml = html;
  
  // Update tool-specific JS reference if it was bundled with hash
  if (assetHashes.has(toolSlug)) {
    const hashedPath = assetHashes.get(toolSlug).replace('dist/', '/');
    const originalPath = `/tools/${toolSlug}/index.js`;
    updatedHtml = updatedHtml.replace(originalPath, hashedPath);
  }
  
  return updatedHtml;
}

// Function to update all generated HTML files with hashed asset references
function updateGeneratedFilesWithHashes(assetHashes) {
  // Update category pages
  const categoryDirs = fs.readdirSync('dist/category');
  for (const categoryDir of categoryDirs) {
    const categoryPath = path.join('dist', 'category', categoryDir, 'index.html');
    if (fs.existsSync(categoryPath)) {
      let categoryHtml = fs.readFileSync(categoryPath, 'utf8');
      categoryHtml = updateAssetReferences(categoryHtml, assetHashes);
      categoryHtml = inlineCriticalCSS(categoryHtml);
      fs.writeFileSync(categoryPath, categoryHtml);
    }
  }
  
  // Update tool pages
  const toolDirs = fs.readdirSync('dist/tools');
  for (const toolDir of toolDirs) {
    const toolPath = path.join('dist', 'tools', toolDir, 'index.html');
    if (fs.existsSync(toolPath)) {
      let toolHtml = fs.readFileSync(toolPath, 'utf8');
      toolHtml = updateAssetReferences(toolHtml, assetHashes);
      toolHtml = updateToolAssetReferences(toolHtml, toolDir, assetHashes);
      toolHtml = inlineCriticalCSS(toolHtml, toolDir);
      fs.writeFileSync(toolPath, toolHtml);
    }
  }
}

// Function to inline critical CSS (enhanced for performance)
function inlineCriticalCSS(html, toolSlug = null) {
  try {
    // Read critical CSS files
    const baseCss = fs.readFileSync('src/styles/base.css', 'utf8');
    const layoutCss = fs.readFileSync('src/styles/layout.css', 'utf8');
    
    // Combine critical CSS
    let criticalCSS = baseCss + '\n' + layoutCss;
    
    // For tool pages, inline critical tool-specific CSS to prevent render-blocking
    if (toolSlug) {
      const toolCssPath = `src/tools/${toolSlug}/style.css`;
      if (fs.existsSync(toolCssPath)) {
        const toolCss = fs.readFileSync(toolCssPath, 'utf8');
        
        // CRITICAL FIX: Include entire tool CSS to preserve media queries
        // Previous extractCriticalToolCSS was stripping @media wrappers while keeping their contents,
        // causing desktop 2-column grid to apply on mobile devices
        criticalCSS += '\n' + toolCss;
        
        // Remove tool CSS link to prevent render-blocking
        html = html.replace(new RegExp(`<link rel="stylesheet" href="/tools/${toolSlug}/style\\.css">\\s*`, 'g'), '');
      }
    }
    
    // Remove existing CSS link tags for critical files (support both original and hashed versions)
    html = html.replace(/<link rel="stylesheet" href="\/styles\/base[^"]*\.css"[^>]*>\s*/g, '');
    html = html.replace(/<link rel="stylesheet" href="\/styles\/layout[^"]*\.css"[^>]*>\s*/g, '');
    
    // CRITICAL FIX: Extract rating widget CSS before removing style tags
    // This preserves the critical rating widget styles that must load immediately
    const ratingWidgetCSSMatch = html.match(/\/\* Rating widget styles[\s\S]*?@media \(max-width:640px\)\{[\s\S]*?\}/);
    const ratingWidgetCSS = ratingWidgetCSSMatch ? ratingWidgetCSSMatch[0] : '';
    
    // CRITICAL FIX: Remove any existing inlined CSS before adding new one
    // This prevents CSS duplication when inlineCriticalCSS is called multiple times
    html = html.replace(/<style>[\s\S]*?<\/style>\s*/g, '');
    
    // Combine critical CSS with rating widget CSS
    const combinedCSS = criticalCSS + (ratingWidgetCSS ? '\n\n/* Rating Widget Critical CSS */\n' + ratingWidgetCSS : '');
    
    // Inline critical CSS before closing </head>
    const inlinedCSS = `    <style>\n${combinedCSS}\n    </style>\n    `;
    html = html.replace('</head>', `${inlinedCSS}</head>`);
    
    return html;
  } catch (error) {
    console.warn('⚠️ Failed to inline critical CSS:', error.message);
    return html;
  }
}

// Extract critical (above-the-fold) CSS from tool styles
function extractCriticalToolCSS(toolCSS, toolSlug) {
  // Extract only the most critical styles for initial render
  const criticalSelectors = [
    `.${toolSlug}-tool`,
    '.tool-container',
    '.tool-interface', 
    '.tool-main',
    '.form-section',
    '.form-group',
    '.btn',
    'input',
    'textarea',
    '.stats-grid',
    '.stat-card',
    '.stat-number',
    '.stat-label'
  ];
  
  let criticalCSS = '';
  
  // Extract base tool styles and form elements (critical for first paint)
  const lines = toolCSS.split('\n');
  let currentRule = '';
  let inCriticalRule = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check if this line starts a new CSS rule
    if (line.includes('{') && !line.trim().startsWith('/*')) {
      // Check if this is a critical selector
      inCriticalRule = criticalSelectors.some(selector => 
        line.includes(selector) && 
        !line.includes('@media') && 
        !line.includes('@keyframes')
      );
      currentRule = line;
    } else if (line.includes('}')) {
      currentRule += '\n' + line;
      if (inCriticalRule) {
        criticalCSS += currentRule + '\n';
      }
      currentRule = '';
      inCriticalRule = false;
    } else if (inCriticalRule || currentRule) {
      currentRule += '\n' + line;
    }
  }
  
  return criticalCSS;
}

// Extract SEO content from tool's render() function during build
// Helper function to extract content from nested divs properly
function extractNestedDivContent(content, className) {
  const openTag = `<div class="${className}">`;
  const openTagIndex = content.indexOf(openTag);
  
  if (openTagIndex === -1) {
    return null;
  }
  
  let divCount = 0;
  let contentStart = openTagIndex + openTag.length;
  let currentIndex = contentStart;
  
  // Track opening and closing div tags to find the correct matching closing tag
  while (currentIndex < content.length) {
    const nextOpenDiv = content.indexOf('<div', currentIndex);
    const nextCloseDiv = content.indexOf('</div>', currentIndex);
    
    if (nextCloseDiv === -1) break;
    
    if (nextOpenDiv !== -1 && nextOpenDiv < nextCloseDiv) {
      // Found opening div before closing div
      divCount++;
      currentIndex = nextOpenDiv + 4; // Move past '<div'
    } else {
      // Found closing div
      if (divCount === 0) {
        // This is our matching closing tag
        return content.substring(contentStart, nextCloseDiv).trim();
      }
      divCount--;
      currentIndex = nextCloseDiv + 6; // Move past '</div>'
    }
  }
  
  return null;
}

function extractSeoContentFromTool(toolSlug) {
  try {
    const toolJsPath = path.join('src', 'tools', toolSlug, 'index.js');
    if (!fs.existsSync(toolJsPath)) {
      console.warn(`⚠️ Tool file not found: ${toolJsPath}`);
      return '';
    }
    
    const toolContent = fs.readFileSync(toolJsPath, 'utf8');
    
    // Extract content between .seo-content div tags from the render() function
    // Use a more sophisticated approach to handle nested divs properly
    const seoContentMatch = extractNestedDivContent(toolContent, 'seo-content');
    
    if (seoContentMatch) {
      // Clean up the extracted content - remove excessive whitespace and template literals formatting
      let seoContent = seoContentMatch
        .replace(/^\s*\n/gm, '') // Remove empty lines at start
        .replace(/\n\s*$/gm, '') // Remove empty lines at end
        .replace(/^\s{6,}/gm, '        ') // Normalize indentation to 8 spaces
        .trim();
      
      // Add intelligent internal linking to related tools
      seoContent = addInternalLinksToContent(seoContent);
      
      console.log(`✅ Extracted SEO content for ${toolSlug}: ${seoContent.length} characters`);
      return seoContent;
    } else {
      console.warn(`⚠️ No SEO content found in ${toolSlug} render() function`);
      return '';
    }
  } catch (error) {
    console.error(`❌ Error extracting SEO content for ${toolSlug}:`, error.message);
    return '';
  }
}

// Extract FAQ schema from SEO content
function extractFAQSchema(seoContent, toolSlug) {
  if (!seoContent) return null;
  
  try {
    // Parse FAQs from the SEO content (looks for H4 questions and following paragraph answers)
    const faqRegex = /<h4>(.*?)<\/h4>\s*<p>(.*?)<\/p>/gs;
    const faqs = [];
    let match;
    
    while ((match = faqRegex.exec(seoContent)) !== null) {
      const question = match[1].trim().replace(/<[^>]+>/g, ''); // Strip HTML tags
      const answer = match[2].trim().replace(/<[^>]+>/g, ''); // Strip HTML tags
      
      faqs.push({
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answer
        }
      });
    }
    
    if (faqs.length === 0) return null;
    
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs
    };
  } catch (error) {
    console.warn(`⚠️ Failed to extract FAQ schema for ${toolSlug}:`, error.message);
    return null;
  }
}

// Add intelligent internal links to SEO content
function addInternalLinksToContent(content) {
  // Map of tool mentions to their slugs (case-insensitive matching)
  const toolLinks = {
    'word counter': '/tools/word-counter/',
    'case converter': '/tools/case-converter/',
    'invoice generator': '/tools/invoice-generator/',
    'passive voice detector': '/tools/passive-voice-detector/',
    'passive voice checker': '/tools/passive-voice-detector/',
    'value proposition generator': '/tools/value-proposition-generator/',
    'meeting cost calculator': '/tools/meeting-cost-calculator/',
    'pdf metadata editor': '/tools/pdf-metadata-editor/',
    'meta description generator': '/tools/meta-description-generator/',
    'recipe scaler': '/tools/recipe-scaler/',
    'readability analyzer': '/tools/word-counter/', // Placeholder - update when tool exists
    'grammar checker': '/tools/passive-voice-detector/' // Related tool
  };
  
  // Replace tool mentions with links (only first occurrence to avoid over-linking)
  for (const [toolName, toolUrl] of Object.entries(toolLinks)) {
    // Use case-insensitive regex with word boundaries, but only replace first mention
    const regex = new RegExp(`\\b${toolName}\\b(?![^<]*>|[^<>]*<\/)`, 'i');
    
    // Only link if not already within a tag and not the current page title
    if (regex.test(content)) {
      content = content.replace(regex, (match) => {
        // Check if this mention is already linked or in a heading
        const beforeMatch = content.substring(0, content.indexOf(match));
        const isInTag = /<[^>]*$/.test(beforeMatch);
        
        if (isInTag) return match;
        
        return `<a href="${toolUrl}">${match}</a>`;
      });
    }
  }
  
  return content;
}
