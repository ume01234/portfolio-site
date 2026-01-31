import { Metadata } from 'next';
import { getData } from '@/lib/data';

const siteUrl = 'https://z-ume01234.pages.dev';

type Lang = 'en' | 'ja';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = params.lang as Lang;
  const data = getData(lang);
  const isJa = lang === 'ja';

  const description = isJa
    ? `${data.sections.blog}一覧ページ。技術記事やブログ投稿を紹介しています。`
    : `${data.sections.blog} page. Technical articles and blog posts.`;

  return {
    title: `${data.sections.blog} - portfolio-Hashizume`,
    description,
    openGraph: {
      title: `${data.sections.blog} - portfolio-Hashizume`,
      description,
      url: `${siteUrl}/${lang}/blog`,
      type: 'website',
      images: [
        {
          url: '/images/ogp-image.png',
          width: 1200,
          height: 630,
          alt: `${data.sections.blog} - portfolio-Hashizume`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.sections.blog} - portfolio-Hashizume`,
      description,
      images: ['/images/ogp-image.png'],
    },
    alternates: {
      canonical: `${siteUrl}/${lang}/blog`,
      languages: {
        en: `${siteUrl}/en/blog`,
        ja: `${siteUrl}/ja/blog`,
      },
    },
  };
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
