import sharp from 'sharp';
import { readdir, stat } from 'node:fs/promises';
import { join, basename } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const WORKS_DIR = join(ROOT, 'public/images/works');
const OGP_SRC = join(ROOT, 'public/images/ogp-image.png');
const OGP_DST = join(ROOT, 'public/images/ogp-image.webp');

async function needsUpdate(src, dst) {
  try {
    const [srcStat, dstStat] = await Promise.all([stat(src), stat(dst)]);
    return srcStat.mtimeMs > dstStat.mtimeMs;
  } catch {
    return true; // dst does not exist
  }
}

async function convertWorksImages() {
  const files = await readdir(WORKS_DIR);
  const pngs = files.filter((f) => f.endsWith('.png'));

  for (const png of pngs) {
    const src = join(WORKS_DIR, png);
    const dst = join(WORKS_DIR, png.replace(/\.png$/, '.webp'));

    if (!(await needsUpdate(src, dst))) {
      console.log(`[skip] ${basename(dst)} is up to date`);
      continue;
    }

    await sharp(src).webp({ quality: 80 }).toFile(dst);
    console.log(`[ok]   ${basename(png)} -> ${basename(dst)}`);
  }
}

async function convertOgpImage() {
  if (!(await needsUpdate(OGP_SRC, OGP_DST))) {
    console.log(`[skip] ogp-image.webp is up to date`);
    return;
  }

  await sharp(OGP_SRC).resize(1200, 630).webp({ quality: 85 }).toFile(OGP_DST);
  console.log(`[ok]   ogp-image.png -> ogp-image.webp`);
}

console.log('--- optimize-images ---');
await convertWorksImages();
await convertOgpImage();
console.log('--- done ---');
