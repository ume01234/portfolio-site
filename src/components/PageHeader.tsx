// ページ共通の固定ヘッダー（戻るボタン付き）
// 一覧ページ（blog, works, activities）で共有
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { type Language } from '@/lib/data';
import AnimatedBackButton from '@/components/AnimatedBackButton';

export default function PageHeader({
  language,
  backText,
}: {
  language: Language;
  backText: string;
}) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-coffee-cream/80 backdrop-blur-sm border-b border-coffee-brown/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <Link href={`/${language}`}>
          <AnimatedBackButton>
            <ArrowLeft className="w-5 h-5" />
            {backText}
          </AnimatedBackButton>
        </Link>
      </div>
    </header>
  );
}
