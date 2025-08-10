const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/images';
const outputDir = 'public/images/optimized';

async function optimizeImages() {
  console.log('Aloitetaan kuvien optimointi...');
  
  // Varmista että output-kansio on olemassa
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const files = fs.readdirSync(inputDir);
  let optimized = 0;
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      const inputPath = path.join(inputDir, file);
      const fileName = path.parse(file).name;
      const ext = path.parse(file).ext.toLowerCase();
      
      try {
        // Optimoi alkuperäinen formaatti
        if (ext === '.jpg' || ext === '.jpeg') {
          await sharp(inputPath)
            .jpeg({ 
              quality: 85, 
              progressive: true,
              mozjpeg: true 
            })
            .toFile(path.join(outputDir, fileName + '_optimized.jpg'));
        } else if (ext === '.png') {
          await sharp(inputPath)
            .png({ 
              quality: 85,
              progressive: true,
              compressionLevel: 9
            })
            .toFile(path.join(outputDir, fileName + '_optimized.png'));
        }
        
        // Luo WebP-versio (parempi tuki)
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(path.join(outputDir, fileName + '.webp'));
          
        // Luo AVIF-versio (paras pakkaustehakkuus)
        await sharp(inputPath)
          .avif({ quality: 70 })
          .toFile(path.join(outputDir, fileName + '.avif'));
          
        console.log(`✅ Optimoitu: ${file} -> WebP & AVIF`);
        optimized++;
        
      } catch (error) {
        console.error(`❌ Virhe optimoidessa ${file}:`, error.message);
      }
    }
  }
  
  console.log(`\n🎉 Optimointi valmis! ${optimized} kuvaa käsitelty.`);
  console.log(`📁 Optimoidut kuvat: ${outputDir}`);
  
  // Näytä tiedostokoot
  console.log('\n📊 Tiedostokoot:');
  const optimizedFiles = fs.readdirSync(outputDir);
  optimizedFiles.forEach(file => {
    const filePath = path.join(outputDir, file);
    const stats = fs.statSync(filePath);
    const sizeKB = Math.round(stats.size / 1024);
    console.log(`   ${file}: ${sizeKB} KB`);
  });
}

optimizeImages().catch(console.error);
