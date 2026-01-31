// 言語別レイアウト（/en/... と /ja/... の共通親）
// - generateStaticParams: ビルド時に /en と /ja の2つを生成
// - generateMetadata: 言語ごとのSEOメタデータ（title, description, OGP, hreflang等）
// - structuredData: Google検索向けの人物情報（JSON-LD）
import { Metadata } from 'next';
import Script from 'next/script';
import { socialLinks, emailAddress } from '@/lib/data';
import LayoutClient from './layout-client';

const siteUrl = 'https://z-ume01234.pages.dev';

type Lang = 'en' | 'ja';

// ビルド時に /en と /ja の2パターンの静的HTMLを生成する
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ja' }];
}

// 言語ごとのSEOメタデータを生成（title, description, OGP, canonical, hreflang等）
export async function generateMetadata({
  params,
}: {
  params: { lang: string };
}): Promise<Metadata> {
  const lang = params.lang as Lang;
  const isJa = lang === 'ja';

  const title = 'portfolio-Hashizume | Rikuto Hashizume - Data Science & Web Engineering';
  const description = isJa
    ? 'データサイエンス、Webエンジニアリング、ロボティクスを横断するジェネラリストエンジニア。複雑な技術から本質的な価値を抽出し、ビジネスやユーザーに届ける架け橋となることを目指しています。筑波大学所属。'
    : 'A generalist engineer spanning Data Science, Web Engineering, and Robotics. Aiming to bridge the gap between complex technology and essential value for businesses and users. Based at the University of Tsukuba.';

  const ogDescription = isJa
    ? 'データサイエンス、Webエンジニアリング、ロボティクスを横断するジェネラリストエンジニア。複雑な技術から本質的な価値を抽出し、ビジネスやユーザーに届ける架け橋となることを目指しています。'
    : 'A generalist engineer spanning Data Science, Web Engineering, and Robotics. Bridging complex technology and essential value.';

  const altLang = isJa ? 'en' : 'ja';

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords: ['ポートフォリオ', 'エンジニア', 'データサイエンス', 'Webエンジニアリング', 'ロボティクス', '機械学習', 'Rikuto', 'Rikuto Hashizume', 'Hashizume', 'ume01234', '橋爪', '橋爪陸人', '陸人', '学生エンジニア', '筑波大学', 'Digital Nature Group'],
    authors: [{ name: 'Rikuto Hashizume' }],
    creator: 'Rikuto Hashizume',
    alternates: {
      canonical: `${siteUrl}/${lang}/`,
      languages: {
        [lang]: `${siteUrl}/${lang}/`,
        [altLang]: `${siteUrl}/${altLang}/`,
      },
    },
    openGraph: {
      title: 'portfolio-Hashizume | Rikuto Hashizume',
      description: ogDescription,
      url: `${siteUrl}/${lang}/`,
      siteName: 'portfolio-Hashizume',
      locale: isJa ? 'ja_JP' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/ogp-image.png',
          width: 1200,
          height: 630,
          alt: 'portfolio-Hashizume',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'portfolio-Hashizume | Rikuto Hashizume',
      description: ogDescription,
      images: ['/images/ogp-image.png'],
    },
    icons: {
      icon: [
        { url: '/images/favicon.ico', sizes: 'any' },
        { url: '/images/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/images/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/images/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/site.webmanifest',
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const lang = params.lang as Lang;

  // Google検索向けの人物構造化データ（JSON-LD）- 画面には非表示
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Rikuto Hashizume',
    alternateName: ['橋爪 陸人', 'Hashizume Rikuto'],
    url: siteUrl,
    jobTitle: 'Student Engineer',
    description:
      lang === 'ja'
        ? 'データサイエンス、Webエンジニアリング、ロボティクスを横断するジェネラリストエンジニア。複雑な技術から本質的な価値を抽出し、ビジネスやユーザーに届ける架け橋となることを目指しています。'
        : 'A generalist engineer spanning Data Science, Web Engineering, and Robotics. Bridging complex technology and essential value.',
    email: emailAddress,
    sameAs: socialLinks.map((link) => link.url),
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'University of Tsukuba',
    },
    knowsAbout: [
      'Data Science',
      'Web Engineering',
      'Robotics',
      'Machine Learning',
      'Generative Art',
      'TypeScript',
      'Python',
      'React',
      'Next.js',
    ],
  };

  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LayoutClient lang={lang}>{children}</LayoutClient>
    </>
  );
}
