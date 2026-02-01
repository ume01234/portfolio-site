// リストアイテム（article）のスクロール連動フェードイン + スタガーアニメーション
// Server Component化した一覧ページから利用する共有Client Component
'use client';

import { motion } from 'framer-motion';

export default function AnimatedListItem({
  children,
  index,
  className,
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      className={className}
    >
      {children}
    </motion.article>
  );
}
