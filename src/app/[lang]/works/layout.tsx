// Works一覧ページのレイアウト
// - generateMetadata: SEOメタデータ（title, OGP, hreflang, og:locale等）
// - パンくずリスト構造化データ（ホーム > Works）
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
    ? `${data.sections.works}一覧ページ。プロジェクトや作品を紹介しています。`
    : `${data.sections.works} page. Showcasing projects and creations.`;

  return {
    title: `${data.sections.works} - portfolio-Hashizume`,
    description,
    openGraph: {
      title: `${data.sections.works} - portfolio-Hashizume`,
      description,
      url: `${siteUrl}/${lang}/works`,
      locale: isJa ? 'ja_JP' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/ogp-image.png',
          width: 1200,
          height: 630,
          alt: `${data.sections.works} - portfolio-Hashizume`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.sections.works} - portfolio-Hashizume`,
      description,
      images: ['/images/ogp-image.png'],
    },
    alternates: {
      canonical: `${siteUrl}/${lang}/works`,
      languages: {
        en: `${siteUrl}/en/works`,
        ja: `${siteUrl}/ja/works`,
      },
    },
  };
}

export default function WorksLayout({
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
        name: data.sections.works,
        item: `${siteUrl}/${lang}/works`,
      },
    ],
  };

  return (
    <>
      <Script
        id="breadcrumb-works"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {children}
    </>
  );
}
