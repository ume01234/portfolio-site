import { MetadataRoute } from 'next';
import { getData } from '@/lib/data';

const siteUrl = 'https://z-ume01234.pages.dev';
const langs = ['en', 'ja'] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['', '/works', '/blog', '/activities'];

  const staticPages: MetadataRoute.Sitemap = langs.flatMap((lang) =>
    staticPaths.map((path) => ({
      url: `${siteUrl}/${lang}${path}`,
      lastModified: new Date(),
      changeFrequency: path === '' ? 'weekly' as const : path === '/blog' ? 'weekly' as const : 'monthly' as const,
      priority: path === '' ? 1.0 : path === '/blog' || path === '/works' ? 0.9 : 0.8,
    }))
  );

  const data = getData('en');
  const workPages: MetadataRoute.Sitemap = langs.flatMap((lang) =>
    data.works.map((work) => ({
      url: `${siteUrl}/${lang}/works/${work.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))
  );

  return [...staticPages, ...workPages];
}
