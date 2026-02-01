// ルートページ（ / へのアクセスをブラウザ言語に応じて /en/ or /ja/ にリダイレクトする）
// noscript タグは JavaScript が無効な環境向けのフォールバック
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const browserLang = navigator.language || '';
    const targetLang = browserLang.startsWith('ja') ? 'ja' : 'en';
    router.replace(`/${targetLang}/`);
  }, [router]);

  return (
    <>
      <link rel="canonical" href="https://z-ume01234.pages.dev/en/" />
      <noscript>
        <meta httpEquiv="refresh" content="0;url=/en/" />
      </noscript>
    </>
  );
}
