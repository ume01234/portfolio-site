# portfolio-Hashizume

私のポートフォリオサイトです。

## プロジェクト概要

コーヒーをテーマに設計されたポートフォリオサイトです。PC版では左右分割レイアウト（左側固定、右側スクロール）、モバイル版では縦スクロールレイアウトを採用しています。

### 主な特徴

- ✔️ コーヒーをテーマにしたデザイン（液体の波打つアニメーション、スクロールに連動した「コーヒーを飲む」演出）
- ✔️ 多言語対応（英語・日本語の切り替え）
- ✔️ 豊富なアニメーション（Framer Motion）
- ✔️ レスポンシブデザイン
- ✔️ SEO最適化（構造化データ、サイトマップ、robots.txt）
- ✔️ 静的サイト生成（Next.js）

## 技術スタック

- **Next.js 14.2.0** (App Router, 静的エクスポート)
- **React 18.3.0**
- **TypeScript 5.3.3**
- **Tailwind CSS 3.4.1**
- **Framer Motion 11.0.0**
- **Lucide React 0.344.0**

## プロジェクト構造

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # ルートレイアウト（最小限、CSSのみ）
│   ├── page.tsx            # ルート（/en/ へリダイレクト）
│   ├── [lang]/             # 言語別ルート（/en/..., /ja/...）
│   │   ├── layout.tsx      # 言語別メタデータ・構造化データ（SEO）
│   │   ├── layout-client.tsx  # クライアント側レイアウト（オープニング制御）
│   │   ├── page.tsx        # トップページ
│   │   ├── works/          # プロジェクト一覧・詳細ページ
│   │   ├── blog/           # ブログ一覧ページ
│   │   └── activities/     # 取り組み一覧ページ
│   ├── robots.ts           # robots.txt生成
│   └── sitemap.ts          # サイトマップ生成（両言語対応）
├── components/             # 再利用可能なコンポーネント
│   ├── LiquidBackground.tsx    # コーヒー液体の波打つ背景アニメーション
│   ├── OpeningAnimation.tsx    # エントリー時のアニメーション
│   ├── LanguageSwitcher.tsx    # 言語切り替えボタン（URL切替方式）
│   └── ...
├── contexts/               # React Context
│   └── LanguageContext.tsx  # 言語コンテキスト（URLから言語を共有）
└── lib/                    # ユーティリティ・データ
    └── data.ts             # プロフィール、Works、Blog等のデータ（多言語対応）
scripts/
└── postbuild.mjs           # ビルド後処理（日本語ページのhtml lang属性修正）
```

## セットアップ

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# ビルド
npm run build
```

## デプロイ

Cloudflare Pagesへの自動デプロイはGitHub Actionsで設定されています。

### 必要な設定

1. **Cloudflare API Tokenの作成**
   - 必要な権限: `Account: Cloudflare Pages:Edit`, `Account: Account Settings:Read`

2. **GitHub Secretsの設定**
   - `CLOUDFLARE_API_TOKEN`: Cloudflare APIトークン
   - `CLOUDFLARE_ACCOUNT_ID`: CloudflareアカウントID

3. **デプロイフロー**
   - `main`ブランチへのプッシュで自動デプロイ
   - `.github/workflows/deploy.yml`が実行される

## カスタマイズ

`src/lib/data.ts`を編集することで、プロフィール情報やコンテンツを変更できます。

- プロフィール情報（名前、キャッチコピー、自己紹介）
- 学歴・所属情報
- 資格、インターン、イベント
- Works（プロジェクト）
- Blog投稿
- SNSリンク
- メールアドレス

## 主な実装の特徴

- **スクロール連動アニメーション**: `requestAnimationFrame`を使用してスクロール進捗を計算
- **多言語対応**: URLプレフィックス方式（`/en/...`, `/ja/...`）で言語を管理、全ページを両言語で静的生成
- **静的サイト生成**: `output: 'export'`を使用、動的ルートは`generateStaticParams()`で事前生成
- **SEO最適化**: hreflang、canonical、og:locale、パンくずリスト構造化データ、Person構造化データ、サイトマップ、robots.txtを実装

