// Blog一覧ページのレイアウト
// - generateMetadata: SEOメタデータ（title, OGP, hreflang, og:locale等）
// - パンくずリスト構造化データ（ホーム > Blog）
// - ItemList構造化データ（ブログ記事一覧）
import { Metadata } from 'next';
import Script from 'next/script';
import { getData, siteUrl, type Language } from '@/lib/data';

export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = params.lang as Language;
  const data = getData(lang);
  const isJa = lang === 'ja';

  const description = isJa
    ? `${data.sections.blog}一覧ページ。技術記事やブログ投稿を紹介しています。`
    : `${data.sections.blog} page. Technical articles and blog posts.`;

  return {
    title: `${data.sections.blog} | Rikuto Hashizume`,
    description,
    openGraph: {
      title: `${data.sections.blog} | Rikuto Hashizume`,
      description,
      url: `${siteUrl}/${lang}/blog`,
      locale: isJa ? 'ja_JP' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/ogp-image.webp',
          width: 1200,
          height: 630,
          alt: `${data.sections.blog} | Rikuto Hashizume`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.sections.blog} | Rikuto Hashizume`,
      description,
      images: ['/images/ogp-image.webp'],
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
  const lang = params.lang as Language;
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

  // ブログ記事一覧の構造化データ（ItemList）- Google検索向け
  const itemList = data.blogPosts.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: data.blogPosts.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Article',
        name: post.title,
        url: post.url,
        datePublished: post.date,
        ...(post.subtitle ? { description: post.subtitle } : {}),
        ...(post.platform ? { publisher: { '@type': 'Organization', name: post.platform } } : {}),
      },
    })),
  } : null;

  return (
    <>
      <Script
        id="breadcrumb-blog"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {itemList && (
        <Script
          id="itemlist-blog"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }}
        />
      )}
      {children}
    </>
  );
}
