const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

async function optimizeTeamImages() {
  const specsDir = path.join(__dirname, "..", "specs", "assets");
  const publicTeamDir = path.join(__dirname, "..", "public", "team");

  // Créer le dossier public/team s'il n'existe pas
  if (!fs.existsSync(publicTeamDir)) {
    fs.mkdirSync(publicTeamDir, { recursive: true });
  }

  // Mapping des fichiers sources vers les noms de sortie
  const imageMap = [
    { source: "julie.jpg", output: "julie.webp" },
    { source: "pierre.jpg", output: "pierre.webp" },
    { source: "vladimir-scaled.jpg", output: "vladimir.webp" },
    { source: "elsa.jpg", output: "elsa.webp" },
    { source: "lou-emma-1.jpg", output: "lou-emma.webp" },
  ];

  console.log("🚀 Starting team images optimization...");

  for (const { source, output } of imageMap) {
    const inputPath = path.join(specsDir, source);
    const outputPath = path.join(publicTeamDir, output);

    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${source} - file not found`);
      continue;
    }

    try {
      // Get original file size
      const originalStats = fs.statSync(inputPath);
      const originalSizeKB = Math.round(originalStats.size / 1024);

      console.log(`\n📸 Processing ${source} (${originalSizeKB}KB)...`);

      // Resize to 600x600 preserving aspect ratio and convert to WebP
      await sharp(inputPath)
        .resize(600, 600, {
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({
          quality: 85,
          effort: 6,
        })
        .toFile(outputPath);

      const webpStats = fs.statSync(outputPath);
      const webpSizeKB = Math.round(webpStats.size / 1024);
      const webpSavings = Math.round(
        ((originalSizeKB - webpSizeKB) / originalSizeKB) * 100
      );

      // Get dimensions
      const metadata = await sharp(outputPath).metadata();
      console.log(
        `✅ ${output}: ${webpSizeKB}KB (${webpSavings}% smaller) - ${metadata.width}x${metadata.height}px`
      );
    } catch (error) {
      console.error(`❌ Error processing ${source}:`, error.message);
    }
  }

  console.log("\n🎉 Team images optimization complete!");
}

optimizeTeamImages().catch(console.error);
