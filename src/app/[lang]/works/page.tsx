// 作品一覧ページ（Server Component）
// - 作品データはビルド時に読み込み、静的HTMLとして出力される
// - 各作品は /[lang]/works/[id] の詳細ページへリンク
import Link from 'next/link';
import { getData, type Language } from '@/lib/data';
import PageHeader from '@/components/PageHeader';
import AnimatedHeading from '@/components/AnimatedHeading';
import AnimatedListItem from '@/components/AnimatedListItem';

export default function WorksPage({
  params,
}: {
  params: { lang: string };
}) {
  const language = params.lang as Language;
  const data = getData(language);

  return (
    <main className="min-h-screen bg-coffee-cream">
      <PageHeader language={language} backText={data.sections.back} />

      <section className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <AnimatedHeading className="text-4xl md:text-5xl font-bold mb-8 text-coffee-espresso">
            {data.sections.works}
          </AnimatedHeading>

          <div className="space-y-2">
            {data.works.map((work, index) => (
              <AnimatedListItem
                key={work.id}
                index={index}
                className="bg-white/80 backdrop-blur-sm border border-coffee-brown/30 rounded-lg p-4 hover:bg-white hover:shadow-md transition-all"
              >
                <Link
                  href={`/${language}/works/${work.id}`}
                  className="block group"
                  aria-label={language === 'ja' ? `${work.title}を表示` : `View project: ${work.title}`}
                >
                  <h2 className="text-lg font-semibold text-coffee-espresso group-hover:text-coffee-brown transition-colors mb-2">
                    {work.title.split('|').map((part, index, array) => (
                      <span key={index}>
                        {part}
                        {index < array.length - 1 && <br />}
                      </span>
                    ))}
                  </h2>
                  <p className="text-sm text-coffee-dark/70 leading-relaxed">{work.description}</p>
                </Link>
              </AnimatedListItem>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
