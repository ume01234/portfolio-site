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
    ? `${data.sections.activities}ページ。現在の主な取り組みや活動を紹介しています。`
    : `${data.sections.activities} page. Current activities and initiatives.`;

  return {
    title: `${data.sections.activities} - portfolio-Hashizume`,
    description,
    openGraph: {
      title: `${data.sections.activities} - portfolio-Hashizume`,
      description,
      url: `${siteUrl}/${lang}/activities`,
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
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
