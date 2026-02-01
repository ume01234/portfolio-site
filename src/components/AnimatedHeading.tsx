// ページ見出し（h1）のフェードインアニメーション
// Server Component化した一覧ページから利用する共有Client Component
'use client';

import { motion } from 'framer-motion';

export default function AnimatedHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.h1>
  );
}
