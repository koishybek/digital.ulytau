const sharp = require('sharp');
const path = require('path');

const images = ['baurdaq.png', 'swat.png', 'utari.png'];

async function optimize() {
  for (const img of images) {
    const input = path.join(__dirname, img);
    const output = path.join(__dirname, img.replace('.png', '.webp'));
    const info = await sharp(input)
      .resize({ width: 1200, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(output);
    console.log(`✅ ${img} → ${img.replace('.png', '.webp')} | ${(info.size/1024).toFixed(0)}KB`);
  }
}

optimize().catch(console.error);
