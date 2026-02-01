'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import type { ActivityEvent } from '@/lib/data';

interface TimelineSectionProps {
  title: string;
  events: ActivityEvent[];
  maxDisplay?: number;
  viewAllLink?: string;
  viewAllText?: string;
  categoryLabels: Record<string, string>;
  language: string;
}

const categoryStyles: Record<string, string> = {
  intern: 'bg-coffee-brown/10 text-coffee-brown',
  lecture: 'bg-coffee-latte/50 text-coffee-dark',
  hackathon: 'bg-coffee-espresso/10 text-coffee-espresso',
};

export default function TimelineSection({
  title,
  events,
  maxDisplay,
  viewAllLink,
  viewAllText,
  categoryLabels,
}: TimelineSectionProps) {
  const displayEvents = maxDisplay ? events.slice(0, maxDisplay) : events;
  const hasMore = maxDisplay ? events.length > maxDisplay : false;

  return (
    <section className="min-h-[40vh] px-6 pt-8 pb-16 md:pt-8 md:pb-16 flex flex-col justify-center">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-2xl font-bold text-coffee-espresso">
          {title}
        </h2>
        {viewAllLink && viewAllText && (
          <Link
            href={viewAllLink}
            aria-label={viewAllText}
          >
            <span className="text-coffee-brown hover:text-coffee-espresso transition-colors font-medium border-b border-coffee-brown/30 hover:border-coffee-brown text-sm md:text-base">
              {viewAllText} →
            </span>
          </Link>
        )}
      </div>

      <div className="relative pl-8 md:pl-10">
        {/* Timeline line */}
        <div className="absolute left-[8px] top-0 bottom-0 border-l-4 border-coffee-brown/30" />

        <div className="space-y-6">
          {displayEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="relative"
            >
              {/* Timeline dot */}
              <div className="absolute -left-8 md:-left-10 top-1 w-5 h-5 bg-coffee-brown rounded-full border-2 border-coffee-cream" />

              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryStyles[event.category] || ''}`}>
                  {categoryLabels[event.category] || event.category}
                </span>
                <span className="text-xs text-coffee-dark/50 font-mono">
                  {event.date}
                </span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-coffee-espresso">
                {event.url ? (
                  <a href={event.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-coffee-brown transition-colors">
                    {event.title}
                  </a>
                ) : (
                  event.title
                )}
              </h3>
              <p className="text-sm text-coffee-dark/70 leading-relaxed mt-1">
                {(() => {
                  const sep = event.description.match(/技術スタック:|Tech stack:/);
                  if (!sep || sep.index === undefined) return event.description;
                  return <>{event.description.slice(0, sep.index)}<br />{event.description.slice(sep.index)}</>;
                })()}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Fade-out dots indicating more items in the past */}
        {hasMore && (
          <div className="flex flex-col items-center gap-2 pt-4 -ml-8 md:-ml-10 w-5">
            <div className="w-2.5 h-2.5 rounded-full bg-coffee-brown/40" />
            <div className="w-2.5 h-2.5 rounded-full bg-coffee-brown/25" />
            <div className="w-2.5 h-2.5 rounded-full bg-coffee-brown/10" />
          </div>
        )}
      </div>
    </section>
  );
}
