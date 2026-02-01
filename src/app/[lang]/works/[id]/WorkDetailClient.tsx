'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Code, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getData } from '@/lib/data';

interface WorkDetailClientProps {
  workId: string;
}

export default function WorkDetailClient({ workId }: WorkDetailClientProps) {
  const { language } = useLanguage();
  const router = useRouter();
  const data = getData(language);
  const work = data.works.find((w) => w.id === workId);

  useEffect(() => {
    if (!work) {
      router.push(`/${language}/works`);
    }
  }, [workId, work, router, language]);

  if (!work) {
    return null;
  }

  const isJapanese = language === 'ja';

  return (
    <main className="min-h-screen bg-coffee-cream">
      <header className="fixed top-0 left-0 right-0 z-50 bg-coffee-cream/80 backdrop-blur-sm border-b border-coffee-brown/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <motion.button
            onClick={() => router.push(`/${language}/works`)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-coffee-espresso/70 hover:text-coffee-espresso transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {data.sections.back}
          </motion.button>
        </div>
      </header>

      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-coffee-espresso">
              {work.title.split('|').map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && <br />}
                </span>
              ))}
            </h1>

            <div className="w-full h-64 md:h-96 rounded-lg mb-8 overflow-hidden border border-coffee-brown/20">
              <img
                src={`/images/works/work-${work.id}.png`}
                alt={work.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-coffee-brown/30 rounded-lg p-8 mb-8">
              <p className="text-coffee-dark/70 text-lg leading-relaxed mb-6 whitespace-pre-line">
                {work.longDescription || work.description}
              </p>

              {work.url && (
                <a
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-coffee-brown/20 hover:bg-coffee-brown/30 text-coffee-espresso rounded-full transition-colors font-medium"
                  aria-label={isJapanese ? `${work.title}を開く` : `Visit project: ${work.title}`}
                >
                  <span>{isJapanese ? 'プロジェクトを見る' : 'View Project'}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>

            {work.technologies && work.technologies.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm border border-coffee-brown/30 rounded-lg p-8 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-coffee-espresso" />
                  <h2 className="text-2xl font-bold text-coffee-espresso">
                    {isJapanese ? '使用技術' : 'Technologies'}
                  </h2>
                </div>
                <div className="flex flex-wrap gap-3">
                  {work.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-coffee-brown/10 text-coffee-espresso rounded-full text-sm font-medium border border-coffee-brown/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {work.features && work.features.length > 0 && (
              <div className="bg-white/80 backdrop-blur-sm border border-coffee-brown/30 rounded-lg p-8 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-coffee-espresso" />
                  <h2 className="text-2xl font-bold text-coffee-espresso">
                    {isJapanese ? '主な機能' : 'Key Features'}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {work.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-coffee-dark/70"
                    >
                      <span className="text-coffee-brown mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </motion.div>
        </div>
      </section>
    </main>
  );
}
