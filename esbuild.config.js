import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildSite() {
  try {
    console.log('🚀 Building Free Tools Platform...');

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

    // Read template HTML
    const templatePath = path.join('src', 'index.html');
    if (!fs.existsSync(templatePath)) {
      throw new Error('index.html template not found in src/');
    }

    const templateHtml = fs.readFileSync(templatePath, 'utf8');

    // Generate homepage (index.html)
    const homepageHtml = templateHtml
      .replace(/<!--SEO_TITLE-->/g, 'Simple Online Tools - No Sign-up Required')
      .replace(/<!--SEO_DESCRIPTION-->/g, 'Discover our collection of simple online tools for text processing, calculations, conversions, and more. Fast, secure, and no registration needed.')
      .replace(/<!--SEO_KEYWORDS-->/g, 'simple online tools, free tools, text tools, calculators, converters')
      .replace(/<!--OG_URL-->/g, 'https://simpleonlinetool.com/')
      .replace(/<!--OG_IMAGE-->/g, 'https://simpleonlinetool.com/images/homepage-preview.jpg')
      .replace(/<!--TWITTER_IMAGE-->/g, 'https://simpleonlinetool.com/images/homepage-preview.jpg')
      .replace('<body>', '<body data-tool-slug="">');

    fs.writeFileSync(path.join('dist', 'index.html'), homepageHtml);
    console.log('✅ Generated homepage: dist/index.html');

    // Create category directory structure
    fs.mkdirSync('dist/category', { recursive: true });

    // Generate category pages using directory-based routing
    const categories = [...new Set(toolRegistry.map(tool => tool.primaryCategory))];
    for (const category of categories) {
      const categoryTools = toolRegistry.filter(tool => tool.primaryCategory === category);
      const categoryName = category
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      const categoryHtml = templateHtml
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
      console.log(`✅ Generated category page: ${categoryPath}`);
    }

    // Generate individual tool pages with clean URLs
    for (const tool of toolRegistry) {
      // Use enhanced SEO metadata if available
      const metaTitle = tool.seo?.metaTitle || tool.title;
      const metaDescription = tool.seo?.metaDescription || tool.description;
      const metaKeywords = tool.keywords;

      let toolHtml = templateHtml
        .replace(/<!--SEO_TITLE-->/g, metaTitle)
        .replace(/<!--SEO_DESCRIPTION-->/g, metaDescription)
        .replace(/<!--SEO_KEYWORDS-->/g, metaKeywords)
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

      // Inject tool-specific CSS if it exists
      const toolStylePath = path.join('src', 'tools', tool.slug, 'style.css');
      if (fs.existsSync(toolStylePath)) {
        const cssLinkTag = `<link rel="stylesheet" href="/tools/${tool.slug}/style.css">`;
        toolHtml = toolHtml.replace('</head>', `    ${cssLinkTag}\n</head>`);
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

      // Create the comprehensive schema markup script tags
      const schemaMarkup = `
    <script type="application/ld+json">${JSON.stringify(webApplicationSchema, null, 2)}</script>
    <script type="application/ld+json">${JSON.stringify(howToSchema, null, 2)}</script>
    <script type="application/ld+json">${JSON.stringify(breadcrumbSchema, null, 2)}</script>`;
      
      // Inject schema markup using the new placeholder
      toolHtml = toolHtml.replace('<!--SCHEMA_MARKUP-->', schemaMarkup);

      // Tool foundation compliance is validated by npm run validate before this build process

      // Create clean URL structure: /tools/tool-slug/ (instead of /tools/tool-slug.html)
      const toolDir = path.join('dist', 'tools', tool.slug);
      fs.mkdirSync(toolDir, { recursive: true });
      const toolPath = path.join(toolDir, 'index.html');
      fs.writeFileSync(toolPath, toolHtml);
      console.log(`✅ Generated tool page: ${toolPath} (clean URL: /tools/${tool.slug}/)`);
    }

    // Bundle CSS
    await esbuild.build({
      entryPoints: [
        'src/styles/base.css',
        'src/styles/layout.css'
      ],
      bundle: true,
      outdir: 'dist/styles',
      minify: process.env.NODE_ENV === 'production',
      sourcemap: process.env.NODE_ENV !== 'production'
    });
    console.log('✅ Bundled CSS files');

    // Bundle main app.js
    await esbuild.build({
      entryPoints: ['src/app.js'],
      bundle: true,
      format: 'esm',
      outdir: 'dist',
      minify: process.env.NODE_ENV === 'production',
      sourcemap: process.env.NODE_ENV !== 'production',
      splitting: true
    });

    // Bundle individual tool modules that have imports
    for (const tool of toolRegistry) {
      const toolJsPath = path.join('src', 'tools', tool.slug, 'index.js');
      if (fs.existsSync(toolJsPath)) {
        // Check if the tool has imports (indicates it needs bundling)
        const toolContent = fs.readFileSync(toolJsPath, 'utf8');
        if (toolContent.includes('import ') && toolContent.includes('from ')) {
          // This tool has imports - bundle it
          const toolDistDir = path.join('dist', 'tools', tool.slug);
          fs.mkdirSync(toolDistDir, { recursive: true });
          
          await esbuild.build({
            entryPoints: [toolJsPath],
            bundle: true,
            format: 'esm',
            outfile: path.join(toolDistDir, 'index.js'),
            minify: process.env.NODE_ENV === 'production',
            sourcemap: process.env.NODE_ENV !== 'production',
            external: [], // Bundle all dependencies
            define: {
              'global': 'globalThis' // Fix for pdf-lib Node.js compatibility in browser
            }
          });
          console.log(`✅ Bundled tool: ${tool.slug} (with dependencies)`);
        }
      }
    }
    
    console.log('✅ Bundled JavaScript files');

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

    // Copy tool registry to dist for client-side access
    fs.copyFileSync('src/tool-registry.json', 'dist/tool-registry.json');
    console.log('✅ Copied tool registry');

    // Generate sitemap.xml
    generateSitemap(toolRegistry);
    
    // Generate or update robots.txt
    generateRobotsTxt();

    console.log('🎉 Build completed successfully!');
    console.log('📁 Output directory: ./dist/');
    console.log('🌐 You can now serve the dist/ folder with any static hosting service');

  } catch (error) {
    console.error('❌ Build failed:', error.message);
    process.exit(1);
  }
}

function generateSitemap(toolRegistry) {
  const baseUrl = 'https://simpleonlinetool.com';
  const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  
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
  console.log('✅ Generated sitemap.xml with', toolRegistry.length + categories.length + 1, 'URLs');
}

function generateRobotsTxt() {
  const robotsContent = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://simpleonlinetool.com/sitemap.xml

# Crawl-delay
Crawl-delay: 1
`;

  const robotsPath = path.join('dist', 'robots.txt');
  fs.writeFileSync(robotsPath, robotsContent);
  console.log('✅ Generated robots.txt');
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
