// Activities一覧ページのレイアウト
// - generateMetadata: SEOメタデータ（title, OGP, hreflang, og:locale等）
// - パンくずリスト構造化データ（ホーム > Activities）
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
    ? `${data.sections.activities}ページ。現在の主な取り組みや活動を紹介しています。`
    : `${data.sections.activities} page. Current activities and initiatives.`;

  return {
    title: `${data.sections.activities} - portfolio-Hashizume`,
    description,
    openGraph: {
      title: `${data.sections.activities} - portfolio-Hashizume`,
      description,
      url: `${siteUrl}/${lang}/activities`,
      locale: isJa ? 'ja_JP' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/ogp-image.png',
          width: 1200,
          height: 630,
          alt: `${data.sections.activities} - portfolio-Hashizume`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.sections.activities} - portfolio-Hashizume`,
      description,
      images: ['/images/ogp-image.png'],
    },
    alternates: {
      canonical: `${siteUrl}/${lang}/activities`,
      languages: {
        en: `${siteUrl}/en/activities`,
        ja: `${siteUrl}/ja/activities`,
      },
    },
  };
}

export default function ActivitiesLayout({
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
        name: data.sections.activities,
        item: `${siteUrl}/${lang}/activities`,
      },
    ],
  };

  return (
    <>
      <Script
        id="breadcrumb-activities"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      {children}
    </>
  );
}
