'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { language } = useLanguage();
  const isJa = language === 'ja';

  return (
    <main className="h-screen w-full flex flex-col items-center justify-center bg-coffee-cream px-6">
      <p className="text-6xl mb-6">☕</p>
      <h1 className="text-2xl font-serif font-bold text-coffee-espresso mb-3">
        {isJa ? 'エラーが発生しました' : 'Something went wrong'}
      </h1>
      <p className="text-coffee-dark/70 mb-8 text-center">
        {isJa
          ? 'ページの読み込み中に問題が起きました。'
          : 'An error occurred while loading this page.'}
      </p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-coffee-brown text-coffee-cream rounded-full font-medium hover:bg-coffee-espresso transition-colors"
      >
        {isJa ? 'もう一度試す' : 'Try again'}
      </button>
    </main>
  );
}
