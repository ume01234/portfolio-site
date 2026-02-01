// ブログ一覧ページ（Server Component）
// - 記事データはビルド時にJSONから読み込み、静的HTMLとして出力される
// - アニメーションのみClient Componentに委譲
import { ExternalLink } from 'lucide-react';
import { getData, type Language } from '@/lib/data';
import PageHeader from '@/components/PageHeader';
import AnimatedHeading from '@/components/AnimatedHeading';
import AnimatedListItem from '@/components/AnimatedListItem';

export default function BlogPage({
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
            {data.sections.blog}
          </AnimatedHeading>

          {/* 記事一覧：サムネイル/絵文字 + タイトル・サブタイトル・日付 */}
          {data.blogPosts.length > 0 ? (
            <div className="space-y-3">
              {data.blogPosts.map((post, index) => (
                <AnimatedListItem
                  key={post.id}
                  index={index}
                  className="bg-white/80 backdrop-blur-sm border border-coffee-brown/30 rounded-lg overflow-hidden hover:bg-white hover:shadow-md transition-all"
                >
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex group"
                    aria-label={language === 'ja' ? `記事を読む: ${post.title}${post.platform ? ` (${post.platform})` : ''}` : `Read article: ${post.title} on ${post.platform || 'blog'}`}
                  >
                    {/* Left: Thumbnail / Emoji */}
                    <div className="hidden sm:flex w-32 md:w-40 flex-shrink-0 items-center justify-center bg-coffee-latte/15">
                      {post.platform === 'Medium' && post.thumbnail ? (
                        <img
                          src={post.thumbnail}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      ) : post.platform === 'Zenn' && post.emoji ? (
                        <span className="text-4xl">{post.emoji}</span>
                      ) : (
                        <span className="text-coffee-brown/30 font-serif text-sm">{post.platform || 'Article'}</span>
                      )}
                    </div>

                    {/* Right: Text content */}
                    <div className="flex-1 p-4 min-w-0">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h2 className="text-lg font-semibold text-coffee-espresso group-hover:text-coffee-brown transition-colors flex-1 line-clamp-2">
                          {post.title}
                        </h2>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {post.platform && (
                            <span className="px-2 py-0.5 bg-coffee-brown/20 text-coffee-espresso text-xs font-medium rounded-full whitespace-nowrap">
                              {post.platform}
                            </span>
                          )}
                          <ExternalLink className="w-4 h-4 text-coffee-brown/40 group-hover:text-coffee-brown transition-colors" />
                        </div>
                      </div>
                      {post.subtitle && (
                        <p className="text-sm text-coffee-dark/70 mb-2 leading-relaxed line-clamp-2">{post.subtitle}</p>
                      )}
                      <time dateTime={post.date} className="text-coffee-brown/60 text-xs">{post.date}</time>
                    </div>
                  </a>
                </AnimatedListItem>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-2xl md:text-3xl font-bold text-coffee-espresso/60">
                {data.sections.comingSoon}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
