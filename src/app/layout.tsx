// ルートレイアウト（最小限）
// 実際のメタデータやSEO設定は [lang]/layout.tsx で言語別に管理している
import './globals.css';
import Script from 'next/script';

const GA_ID = 'G-XWNXV5HXRS';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@300;400;700&display=swap" rel="stylesheet" />
        <link rel="dns-prefetch" href="https://cdn-images-1.medium.com" />
        <link rel="dns-prefetch" href="https://zenn.dev" />
      </head>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
