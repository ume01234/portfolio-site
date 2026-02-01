'use client';

import { motion } from 'framer-motion';

interface TypeBSectionProps {
  title: string;
  chunks: { text: string; date: string }[][];
}

export default function TypeBSection({ title, chunks }: TypeBSectionProps) {
  return (
    <section className="min-h-[30vh] px-6 py-8 md:py-8 flex flex-col justify-center">
      <h2 className="text-xl md:text-2xl font-bold mb-8 text-coffee-espresso">
        {title}
      </h2>
      <div className="overflow-x-auto no-scrollbar pb-8">
        <div className="flex gap-16 min-w-max px-4">
          {chunks.map((chunk, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-64 flex-shrink-0"
            >
              <ul className="space-y-2 border-l-2 border-coffee-brown/20 pl-6">
                {chunk.map((item, j) => (
                  <li key={j} className="text-coffee-dark font-medium whitespace-nowrap">
                    <span className="text-coffee-dark/50 font-mono text-sm mr-2">{item.date}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
