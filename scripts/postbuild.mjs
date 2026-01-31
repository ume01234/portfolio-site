import { readdir, readFile, writeFile } from 'fs/promises';
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

await fixHtmlLang(join(outDir, 'ja'), 'ja');
console.log('Postbuild: html lang attributes fixed.');
