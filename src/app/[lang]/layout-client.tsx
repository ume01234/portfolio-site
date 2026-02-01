// クライアント側レイアウト
// - オープニングアニメーションの表示制御
// - 言語切替時はオープニングをスキップ（__skipOpening フラグで判定）
// - ページリロード時はオープニングを表示
// - childrenは常にDOMに配置し、CSSで表示制御（SSR時もHTMLに出力される）
'use client';

import { useState, useEffect } from 'react';
import OpeningAnimation from '@/components/OpeningAnimation';
import SteamCursor from '@/components/SteamCursor';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { LanguageProvider } from '@/contexts/LanguageContext';

export default function LayoutClient({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: 'en' | 'ja';
}) {
  // showOpening: オープニングアニメーションのオーバーレイ表示
  // showContent: コンテンツの表示切替（CSSで制御、SSR時はfalseでopacity-0）
  const [showContent, setShowContent] = useState(false);
  const [showOpening, setShowOpening] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // 初回マウント時：言語切替なら即表示、それ以外はオープニング再生
  useEffect(() => {
    if ((window as any).__skipOpening) {
      setShowContent(true);
    } else {
      setShowOpening(true);
    }
  }, []);

  const handleOpeningComplete = () => {
    setShowOpening(false);
    setShowContent(true);
  };

  return (
    <LanguageProvider lang={lang}>
      {/* オープニングアニメーション（fixed z-50のオーバーレイ、完了後に除去） */}
      {showOpening && (
        <OpeningAnimation onComplete={handleOpeningComplete} />
      )}

      {/* メインコンテンツ：常にDOMに存在し、CSSで表示制御（SSR時もHTMLに出力される） */}
      <div className={`transition-opacity duration-300 ${showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <SteamCursor />
        <LanguageSwitcher />
        {children}
      </div>
    </LanguageProvider>
  );
}
