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
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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
