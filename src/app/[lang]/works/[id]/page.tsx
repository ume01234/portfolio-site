import { getData } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Script from 'next/script';
import WorkDetailClient from './WorkDetailClient';

const siteUrl = 'https://z-ume01234.pages.dev';

interface WorkDetailPageProps {
  params: {
    lang: string;
    id: string;
  };
}

export function generateStaticParams() {
  const data = getData('en');
  const langs = ['en', 'ja'];
  return langs.flatMap((lang) =>
    data.works.map((work) => ({
      lang,
      id: work.id,
    }))
  );
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const lang = params.lang as 'en' | 'ja';
  const data = getData(lang);
  const work = data.works.find((w) => w.id === params.id);

  if (!work) {
    return {
      title: 'Work Not Found',
    };
  }

  return {
    title: `${work.title} - portfolio-Hashizume`,
    description: work.description,
    openGraph: {
      title: work.title,
      description: work.description,
      url: `${siteUrl}/${lang}/works/${work.id}`,
      type: 'website',
      images: [
        {
          url: '/images/ogp-image.png',
          width: 1200,
          height: 630,
          alt: work.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: work.title,
      description: work.description,
      images: ['/images/ogp-image.png'],
    },
    alternates: {
      canonical: `${siteUrl}/${lang}/works/${work.id}`,
      languages: {
        en: `${siteUrl}/en/works/${work.id}`,
        ja: `${siteUrl}/ja/works/${work.id}`,
      },
    },
  };
}

export default function WorkDetailPage({ params }: WorkDetailPageProps) {
  const lang = params.lang as 'en' | 'ja';
  const data = getData(lang);
  const work = data.works.find((w) => w.id === params.id);

  if (!work) {
    notFound();
  }

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
      {
        '@type': 'ListItem',
        position: 3,
        name: work.title,
        item: `${siteUrl}/${lang}/works/${work.id}`,
      },
    ],
  };

  return (
    <>
      <Script
        id="breadcrumb-work-detail"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <WorkDetailClient workId={params.id} />
    </>
  );
}
