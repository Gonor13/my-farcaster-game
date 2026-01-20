// Simple script to generate a placeholder icon.png
// This creates a minimal 512x512 PNG with the game color scheme

const fs = require('fs');
const path = require('path');

// Create a simple SVG first, then note that user should convert to PNG
// For now, we'll create instructions
const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" fill="#1a1a2e"/>
  <rect x="156" y="156" width="200" height="200" fill="#10b981" rx="10"/>
  <circle cx="256" cy="256" r="80" fill="#3b82f6"/>
  <circle cx="356" cy="156" r="30" fill="#ef4444"/>
  <circle cx="156" cy="356" r="30" fill="#ef4444"/>
</svg>`;

const svgPath = path.join(__dirname, '../public/icon.svg');
fs.writeFileSync(svgPath, svgContent);

console.log('Created icon.svg. Please convert it to PNG format (512x512) as icon.png');
console.log('You can use online tools like https://svgtopng.com/ or ImageMagick:');
console.log('convert -background none -resize 512x512 public/icon.svg public/icon.png');
