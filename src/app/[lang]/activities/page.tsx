// 活動実績一覧ページ（Server Component）
// - インターン・講座・ハッカソン等のイベントデータを静的HTMLとして出力
import { getData, type Language } from '@/lib/data';
import PageHeader from '@/components/PageHeader';
import AnimatedHeading from '@/components/AnimatedHeading';
import AnimatedListItem from '@/components/AnimatedListItem';

// カテゴリごとのバッジスタイル
const categoryStyles: Record<string, string> = {
  intern: 'bg-coffee-brown/10 text-coffee-brown',
  lecture: 'bg-coffee-latte/50 text-coffee-dark',
  hackathon: 'bg-coffee-espresso/10 text-coffee-espresso',
};

export default function ActivitiesPage({
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
            {data.sections.activityEvents}
          </AnimatedHeading>

          <div className="space-y-2">
            {data.achievements.activityEvents.map((event, index) => (
              <AnimatedListItem
                key={event.id}
                index={index}
                className="bg-white/80 backdrop-blur-sm border border-coffee-brown/30 rounded-lg p-4 hover:bg-white hover:shadow-md transition-all"
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryStyles[event.category] || ''}`}>
                    {data.categoryLabels[event.category as keyof typeof data.categoryLabels] || event.category}
                  </span>
                  <span className="text-xs text-coffee-dark/50 font-mono">
                    {event.date}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-coffee-espresso mb-2">{event.title}</h2>
                <p className="text-sm text-coffee-dark/70 leading-relaxed">{event.description}</p>
              </AnimatedListItem>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
