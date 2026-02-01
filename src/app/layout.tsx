// ルートレイアウト（最小限）
// 実際のメタデータやSEO設定は [lang]/layout.tsx で言語別に管理している
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="dns-prefetch" href="https://cdn-images-1.medium.com" />
        <link rel="dns-prefetch" href="https://zenn.dev" />
      </head>
      <body>{children}</body>
    </html>
  );
}
