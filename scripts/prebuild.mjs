import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, '..', 'src', 'lib', 'blogPosts.json');

function toDateString(str) {
  if (!str) return '';
  const d = new Date(str);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0];
}

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

function stripHtml(str) {
  return str.replace(/<[^>]+>/g, '');
}

// --- Medium RSS ---
async function fetchMedium() {
  const url = 'https://medium.com/feed/@zume2.dev';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Medium fetch failed: ${res.status}`);
  const xml = await res.text();

  const items = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;
  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1];

    const title = block.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1]
      || block.match(/<title>(.*?)<\/title>/)?.[1]
      || '';

    const link = block.match(/<link>(.*?)<\/link>/)?.[1]
      || block.match(/<guid.*?>(.*?)<\/guid>/)?.[1]
      || '';

    const pubDate = block.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || '';

    // Extract thumbnail from content:encoded
    const contentEncoded = block.match(/<content:encoded><!\[CDATA\[([\s\S]*?)\]\]><\/content:encoded>/)?.[1] || '';
    const thumbnail = contentEncoded.match(/<img[^>]+src="([^"]+)"/)?.[1] || '';

    // Extract subtitle from first <p> tag
    const firstP = contentEncoded.match(/<p>([\s\S]*?)<\/p>/)?.[1] || '';
    const subtitle = decodeHtmlEntities(stripHtml(firstP)).trim().slice(0, 120);

    const date = toDateString(pubDate);

    items.push({
      title,
      subtitle,
      url: link.split('?')[0], // remove query params
      date,
      platform: 'Medium',
      thumbnail: thumbnail || undefined,
    });
  }

  console.log(`[prebuild] Medium: ${items.length} articles fetched`);
  return items;
}

// --- Zenn API ---
async function fetchZenn() {
  const url = 'https://zenn.dev/api/articles?username=sunlight_white';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Zenn fetch failed: ${res.status}`);
  const json = await res.json();

  const items = (json.articles || []).map((article) => ({
    title: article.title || '',
    subtitle: '',
    url: `https://zenn.dev${article.path}`,
    date: toDateString(article.published_at),
    platform: 'Zenn',
    emoji: article.emoji || undefined,
  }));

  console.log(`[prebuild] Zenn: ${items.length} articles fetched`);
  return items;
}

// --- Note API --- (一時的に無効化)
// async function fetchNote() {
//   const url = 'https://note.com/api/v2/creators/triple_field/contents?kind=note';
//   const res = await fetch(url);
//   if (!res.ok) throw new Error(`Note fetch failed: ${res.status}`);
//   const json = await res.json();
//
//   const notes = json.data?.contents || [];
//   const items = notes.map((note) => ({
//     title: note.name || '',
//     subtitle: stripHtml(note.body || '').replace(/\n+/g, ' ').trim().slice(0, 120),
//     url: note.noteUrl || '',
//     date: toDateString(note.publishAt),
//     platform: 'Note',
//   }));
//
//   console.log(`[prebuild] Note: ${items.length} articles fetched`);
//   return items;
// }

// --- Main ---
async function main() {
  console.log('[prebuild] Fetching blog posts...');

  const results = await Promise.allSettled([
    fetchMedium(),
    fetchZenn(),
    // fetchNote(), // 一時的に無効化
  ]);

  const allPosts = [];
  for (const result of results) {
    if (result.status === 'fulfilled') {
      allPosts.push(...result.value);
    } else {
      console.warn(`[prebuild] Warning: ${result.reason}`);
    }
  }

  // Sort by date descending
  allPosts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));

  // Assign sequential IDs
  const postsWithIds = allPosts.map((post, index) => ({
    id: String(index + 1),
    ...post,
  }));

  // Remove undefined values for clean JSON
  const cleaned = JSON.parse(JSON.stringify(postsWithIds));

  writeFileSync(OUTPUT_PATH, JSON.stringify(cleaned, null, 2) + '\n');
  console.log(`[prebuild] Wrote ${cleaned.length} posts to blogPosts.json`);
}

main().catch((err) => {
  console.error('[prebuild] Fatal error:', err);
  writeFileSync(OUTPUT_PATH, '[]\n');
  console.log('[prebuild] Wrote empty array as fallback');
});
