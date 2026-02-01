// Activities一覧ページのレイアウト
// - generateMetadata: SEOメタデータ（title, OGP, hreflang, og:locale等）
// - パンくずリスト構造化データ（ホーム > Activities）
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
    ? `${data.sections.activityEvents}ページ。インターンシップや外部講義、ハッカソンなどの活動を紹介しています。`
    : `${data.sections.activityEvents} page. Internships, lectures, and hackathons.`;

  return {
    title: `${data.sections.activityEvents} - portfolio-Hashizume`,
    description,
    openGraph: {
      title: `${data.sections.activityEvents} - portfolio-Hashizume`,
      description,
      url: `${siteUrl}/${lang}/activities`,
      locale: isJa ? 'ja_JP' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/ogp-image.png',
          width: 1200,
          height: 630,
          alt: `${data.sections.activityEvents} - portfolio-Hashizume`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.sections.activityEvents} - portfolio-Hashizume`,
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
        name: data.sections.activityEvents,
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
