// 戻るボタンのアニメーション（ホバー・タップ時のスケール変化）
// Server Component化した一覧ページから利用する共有Client Component
'use client';

import { motion } from 'framer-motion';

export default function AnimatedBackButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 text-coffee-espresso/70 hover:text-coffee-espresso transition-colors"
    >
      {children}
    </motion.span>
  );
}
