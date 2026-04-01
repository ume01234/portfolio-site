// ビルド後処理: 日本語ページの <html lang="en"> を <html lang="ja"> に修正する
// Next.js の静的エクスポートではルートlayoutの lang 属性が全ページに適用されるため、
// ビルド後に out/ja/ 配下のHTMLファイルを書き換えて対応している
import { readdir, readFile, writeFile, unlink } from 'fs/promises';
import { join } from 'path';

const outDir = join(process.cwd(), 'out');

async function fixHtmlLang(dir, lang) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await fixHtmlLang(fullPath, lang);
    } else if (entry.name.endsWith('.html')) {
      const content = await readFile(fullPath, 'utf-8');
      const fixed = content.replace(/(<html[^>]*) lang="en"/, `$1 lang="${lang}"`);
      if (fixed !== content) {
        await writeFile(fullPath, fixed, 'utf-8');
        console.log(`Fixed lang="${lang}": ${fullPath}`);
      }
    }
  }
}

// WebP変換元のPNGをout/から削除（favicon等の直接参照されるPNGは除外）
async function removeSourcePngs() {
  const keepFiles = new Set(['favicon-16x16.png', 'favicon-32x32.png', 'apple-touch-icon.png']);
  const targets = [
    join(outDir, 'images'),
    join(outDir, 'images', 'works'),
  ];

  let totalSize = 0;
  for (const dir of targets) {
    const entries = await readdir(dir).catch(() => []);
    for (const entry of entries) {
      if (entry.endsWith('.png') && !keepFiles.has(entry)) {
        const filePath = join(dir, entry);
        const { size } = await import('fs').then(fs => fs.statSync(filePath));
        await unlink(filePath);
        totalSize += size;
        console.log(`Removed: ${filePath}`);
      }
    }
  }
  console.log(`Postbuild: removed source PNGs (${(totalSize / 1024 / 1024).toFixed(1)} MB saved).`);
}

try {
  await fixHtmlLang(join(outDir, 'ja'), 'ja');
  console.log('Postbuild: html lang attributes fixed.');
  await removeSourcePngs();
} catch (err) {
  console.error('Postbuild: failed:', err);
  process.exit(1);
}
