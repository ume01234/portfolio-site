import { Metadata } from 'next';
import Script from 'next/script';
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
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params.lang as Lang;
  const data = getData(lang);

  // パンくずリスト構造化データ（JSON-LD）- 画面には非表示、Google検索向け
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: lang === 'ja' ? 'ホーム' : 'Home',
        item: `${siteUrl}/${lang}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: data.sections.blog,
        item: `${siteUrl}/${lang}/blog`,
      },
    ],
  };

  return (
    <>
      <Script
        id="breadcrumb-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {children}
    </>
  );
}
