import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const assetsDir = './src/assets/images';

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else {
      if (file.toLowerCase().endsWith('.png')) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

async function convertPngToWebp() {
  const pngFiles = getFilesRecursively(assetsDir);
  console.log(`Found ${pngFiles.length} PNG files. Converting to WebP...`);

  for (const pngFile of pngFiles) {
    const webpFile = pngFile.substring(0, pngFile.length - 4) + '.webp';
    
    // Check if webp file already exists and is newer than png
    if (fs.existsSync(webpFile)) {
      const pngStat = fs.statSync(pngFile);
      const webpStat = fs.statSync(webpFile);
      if (webpStat.mtime > pngStat.mtime) {
        console.log(`Skipping ${pngFile} (WebP already exists and is up to date)`);
        continue;
      }
    }

    try {
      console.log(`Converting: ${pngFile} -> ${webpFile}`);
      await sharp(pngFile)
        .webp({ quality: 80 }) // 80% quality is visually indistinguishable but ~80% smaller!
        .toFile(webpFile);
    } catch (err) {
      console.error(`Error converting ${pngFile}:`, err);
    }
  }

  console.log('Conversion complete!');
}

convertPngToWebp();
