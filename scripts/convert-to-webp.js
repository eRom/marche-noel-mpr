const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Scan recursively for PNG/JPG files in a directory
 */
function findImageFiles(dir) {
  const results = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursive call for subdirectories
      results.push(...findImageFiles(filePath));
    } else if (stat.isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        results.push(filePath);
      }
    }
  }

  return results;
}

/**
 * Convert a single image to WebP format
 */
async function convertToWebP(inputPath, webpDir) {
  try {
    // Check if file exists
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${inputPath} - file not found`);
      return;
    }

    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSizeKB = Math.round(originalStats.size / 1024);

    const baseName = path.parse(inputPath).name;
    const outputPath = path.join(webpDir, `${baseName}.webp`);

    // Ensure webp directory exists
    fs.mkdirSync(webpDir, { recursive: true });

    console.log(`\n📸 Processing ${path.basename(inputPath)} (${originalSizeKB}KB)...`);

    // Convert to WebP
    await sharp(inputPath)
      .webp({ 
        quality: 90
      })
      .toFile(outputPath);

    const webpStats = fs.statSync(outputPath);
    const webpSizeKB = Math.round(webpStats.size / 1024);
    const savings = Math.round(((originalSizeKB - webpSizeKB) / originalSizeKB) * 100);

    console.log(`✅ Created ${path.basename(outputPath)} (${webpSizeKB}KB, ${savings}% smaller)`);

    return { originalSizeKB, webpSizeKB, savings };
  } catch (error) {
    console.error(`❌ Error processing ${inputPath}:`, error.message);
    return null;
  }
}

/**
 * Main function
 */
async function main() {
  // Get directory argument
  const directory = process.argv[2];

  if (!directory) {
    console.error('❌ Please provide a directory path as an argument');
    console.error('Usage: npm run convert:webp <directory>');
    console.error('Example: npm run convert:webp maquette/gallery/MPR');
    process.exit(1);
  }

  const fullPath = path.resolve(directory);

  // Check if directory exists
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Directory not found: ${fullPath}`);
    process.exit(1);
  }

  const stat = fs.statSync(fullPath);
  if (!stat.isDirectory()) {
    console.error(`❌ Path is not a directory: ${fullPath}`);
    process.exit(1);
  }

  console.log('🚀 Starting WebP conversion...');
  console.log(`📁 Target directory: ${fullPath}`);
  console.log(`📁 WebP output directory: ${path.join(fullPath, 'webp')}\n`);

  // Create webp subdirectory
  const webpDir = path.join(fullPath, 'webp');

  // Find all PNG/JPG files
  const imageFiles = findImageFiles(fullPath);

  if (imageFiles.length === 0) {
    console.log('⚠️  No PNG or JPG files found in the directory');
    process.exit(0);
  }

  console.log(`📸 Found ${imageFiles.length} image(s) to convert\n`);

  // Convert all images
  const results = [];
  for (const imagePath of imageFiles) {
    const result = await convertToWebP(imagePath, webpDir);
    if (result) {
      results.push(result);
    }
  }

  // Summary
  if (results.length > 0) {
    const totalOriginal = results.reduce((sum, r) => sum + r.originalSizeKB, 0);
    const totalWebp = results.reduce((sum, r) => sum + r.webpSizeKB, 0);
    const totalSavings = Math.round(((totalOriginal - totalWebp) / totalOriginal) * 100);

    console.log('\n' + '='.repeat(50));
    console.log('🎉 Conversion complete!');
    console.log(`📊 Summary:`);
    console.log(`   - Files converted: ${results.length}`);
    console.log(`   - Original size: ${totalOriginal}KB`);
    console.log(`   - WebP size: ${totalWebp}KB`);
    console.log(`   - Total savings: ${totalSavings}%`);
    console.log('='.repeat(50));
  } else {
    console.log('\n⚠️  No files were converted');
  }
}

main().catch(console.error);

