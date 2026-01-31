// クライアント側レイアウト
// - オープニングアニメーションの表示制御
// - 言語切替時はオープニングをスキップ（__skipOpening フラグで判定）
// - ページリロード時はオープニングを表示
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
  const [showContent, setShowContent] = useState(false);
  const [skipOpening, setSkipOpening] = useState(false);
  const [ready, setReady] = useState(false); // サーバー/クライアントの描画ずれ防止用

  // HTMLの lang 属性を動的に更新
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // 言語切替時は LanguageSwitcher が __skipOpening を設定するので、オープニングをスキップ
  useEffect(() => {
    if ((window as any).__skipOpening) {
      setShowContent(true);
      setSkipOpening(true);
    }
    setReady(true);
  }, []);

  const handleOpeningComplete = () => {
    setShowContent(true);
  };

  if (!ready) return null;

  return (
    <LanguageProvider lang={lang}>
      {!skipOpening && !showContent && (
        <OpeningAnimation onComplete={handleOpeningComplete} />
      )}
      {showContent && (
        <>
          <SteamCursor />
          <LanguageSwitcher />
          {children}
        </>
      )}
    </LanguageProvider>
  );
}
