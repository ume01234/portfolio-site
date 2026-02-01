'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getData } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';

export default function WorksPage() {
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
            {data.sections.works}
          </motion.h1>

          <div className="space-y-2">
            {data.works.map((work, index) => (
              <motion.article
                key={work.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
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
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
