'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { getData } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BlogPage() {
  const { language } = useLanguage();
  const data = getData(language);

  return (
    <main className="min-h-screen bg-coffee-cream">
      <header className="fixed top-0 left-0 right-0 z-50 bg-coffee-cream/80 backdrop-blur-sm border-b border-coffee-brown/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href={`/${language}`}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-coffee-espresso/70 hover:text-coffee-espresso transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              {data.sections.back}
            </motion.button>
          </Link>
        </div>
      </header>

      <section className="pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-8 text-coffee-espresso"
          >
            {data.sections.blog}
          </motion.h1>

          {data.blogPosts.length > 0 ? (
            <div className="space-y-3">
              {data.blogPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
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
                </motion.article>
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
