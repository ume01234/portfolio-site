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
    ? `${data.sections.works}一覧ページ。プロジェクトや作品を紹介しています。`
    : `${data.sections.works} page. Showcasing projects and creations.`;

  return {
    title: `${data.sections.works} - portfolio-Hashizume`,
    description,
    openGraph: {
      title: `${data.sections.works} - portfolio-Hashizume`,
      description,
      url: `${siteUrl}/${lang}/works`,
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
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
