// 言語コンテキスト
// URLの言語プレフィックス（/en/ or /ja/）から決まった言語を各コンポーネントに共有する
// 言語の切り替え自体は LanguageSwitcher がURLナビゲーションで行う
'use client';

import { createContext, useContext, ReactNode } from 'react';
import { type Language } from '@/lib/data';

interface LanguageContextType {
  language: Language;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({
  children,
  lang,
}: {
  children: ReactNode;
  lang: Language;
}) {
  return (
    <LanguageContext.Provider value={{ language: lang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
