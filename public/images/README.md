# Social Media Preview Images

This directory contains preview images for social media sharing (Open Graph and Twitter Cards).

## Required Images

### Tool-Specific Images (1200x630px recommended):
- `word-counter-preview.jpg` - Word Counter tool preview
- `case-converter-preview.jpg` - Case Converter tool preview  
- `invoice-generator-preview.jpg` - Invoice Generator tool preview

### Category Images (1200x630px recommended):
- `text-tools-preview.jpg` - Text Tools category preview
- `productivity-tools-preview.jpg` - Productivity Tools category preview

### General Images (1200x630px recommended):
- `homepage-preview.jpg` - Homepage/general site preview

## Image Specifications

**Dimensions**: 1200x630px (Facebook/LinkedIn recommended)
**Format**: JPG or PNG
**File Size**: Under 1MB for best performance
**Content**: 
- Tool/category name prominently displayed
- Brief description or key features
- Consistent branding with site colors
- High contrast for readability

## Design Guidelines

1. **Brand Colors**: Use CSS variables from base.css
   - Primary: #2563eb (blue)
   - Secondary: #64748b (gray)
   - Text: #0f172a (dark)

2. **Typography**: Match site fonts (system fonts)
   - Primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto

3. **Layout**: Clean, professional design that reflects the tool's purpose

4. **Accessibility**: Ensure sufficient color contrast for text readability

## Tools for Creating Images

- **Canva** (recommended for non-designers)
- **Figma** (for custom designs)
- **Adobe Photoshop/Illustrator** (professional tools)
- **GIMP** (free alternative)

## Implementation Note

These images are already referenced in the meta tags. Once created, simply place them in this directory and they will be served correctly.