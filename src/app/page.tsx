// ルートページ（ / へのアクセスを /en/ にリダイレクトする）
// noscript タグは JavaScript が無効な環境向けのフォールバック
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/en/');
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
