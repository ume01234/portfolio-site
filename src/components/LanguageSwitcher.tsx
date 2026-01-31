'use client';

import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const targetLang = language === 'en' ? 'ja' : 'en';
    const newPath = pathname.replace(/^\/(en|ja)/, `/${targetLang}`);
    (window as any).__skipOpening = true;
    router.push(newPath);
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-[70] px-4 py-2 bg-white/50 backdrop-blur-sm border border-coffee-brown/20 rounded-full hover:bg-white/70 transition-colors text-coffee-espresso text-sm font-medium shadow-lg"
      aria-label={language === 'ja' ? '言語を切り替える' : 'Switch language'}
    >
      {language === 'en' ? '日本語' : 'English'}
    </motion.button>
  );
}
