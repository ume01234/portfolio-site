'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getData } from '@/lib/data';
import { useLanguage } from '@/contexts/LanguageContext';

const categoryStyles: Record<string, string> = {
  intern: 'bg-coffee-brown/10 text-coffee-brown',
  lecture: 'bg-coffee-latte/50 text-coffee-dark',
  hackathon: 'bg-coffee-espresso/10 text-coffee-espresso',
};

export default function ActivitiesPage() {
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
            {data.sections.activityEvents}
          </motion.h1>

          <div className="space-y-2">
            {data.achievements.activityEvents.map((event, index) => (
              <motion.article
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
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
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
