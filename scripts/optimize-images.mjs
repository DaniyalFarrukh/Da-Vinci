import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SOURCE_DIR = path.resolve("Photos");
const OUT_DIR = path.resolve("public/images");

const ASSET_MAP = {
  "WhatsApp Image 2026-11-16 at 11.14.59 PM.jpeg": "surgical-team-hands-on",
  "WhatsApp Image 2026-11-16 at 11.15.02 PM (1).jpeg": "keynote-stage-thank-you",
  "WhatsApp Image 2026-11-16 at 11.15.02 PM.jpeg": "da-vinci-emblem",
  "WhatsApp Image 2026-11-16 at 11.15.04 PM (1).jpeg": "founder-xray-portrait",
  "WhatsApp Image 2026-11-16 at 11.15.04 PM.jpeg": "surgical-training-duo",
  "WhatsApp Image 2026-11-16 at 11.15.05 PM (1).jpeg": "lecture-zygomatic-wide",
  "WhatsApp Image 2026-11-16 at 11.15.05 PM (2).jpeg": "lab-model-sculpting",
  "WhatsApp Image 2026-11-16 at 11.15.05 PM (3).jpeg": "lecture-zygomatic-portrait",
  "WhatsApp Image 2026-11-16 at 11.15.05 PM.jpeg": "surgical-loupes-closeup",
  "WhatsApp Image 2026-11-16 at 11.15.06 PM (1).jpeg": "hallway-consultation",
  "WhatsApp Image 2026-11-16 at 11.15.06 PM (2).jpeg": "digital-planning-display",
  "WhatsApp Image 2026-11-16 at 11.15.06 PM (3).jpeg": "conference-stage-case",
  "WhatsApp Image 2026-11-16 at 11.15.06 PM.jpeg": "surgical-precision-duo",
  "WhatsApp Image 2026-11-16 at 11.15.07 PM (1).jpeg": "mayo-clinic-fellowship",
  "WhatsApp Image 2026-11-16 at 11.15.07 PM.jpeg": "harvard-mgh-team",
};

fs.mkdirSync(OUT_DIR, { recursive: true });

const files = fs.readdirSync(SOURCE_DIR).sort();
for (const file of files) {
  const slug = ASSET_MAP[file];
  if (!slug) {
    console.warn(`Skipping unmapped file: ${file}`);
    continue;
  }

  const inputPath = path.join(SOURCE_DIR, file);
  const pipeline = sharp(inputPath)
    .rotate()
    .resize({
      width: 2400,
      kernel: sharp.kernel.lanczos3,
      withoutEnlargement: false,
    })
    .normalize()
    .modulate({ brightness: 1.04, saturation: 1.07 })
    .sharpen({ sigma: 1.0, m1: 1.2, m2: 0.4 });

  const webpPath = path.join(OUT_DIR, `${slug}.webp`);
  const avifPath = path.join(OUT_DIR, `${slug}.avif`);

  await pipeline.clone().webp({ quality: 94 }).toFile(webpPath);
  await pipeline.clone().avif({ quality: 78 }).toFile(avifPath);

  const webpSize = (fs.statSync(webpPath).size / 1024).toFixed(1);
  const avifSize = (fs.statSync(avifPath).size / 1024).toFixed(1);
  console.log(`${slug}: webp=${webpSize}KB, avif=${avifSize}KB`);
}
