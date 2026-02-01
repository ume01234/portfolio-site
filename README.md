# portfolio-Hashizume

私のポートフォリオサイトです。

## プロジェクト概要

コーヒーをテーマに設計されたポートフォリオサイトです。PC版では左右分割レイアウト（左側固定、右側スクロール）、モバイル版では縦スクロールレイアウトを採用しています。

### 主な特徴

- コーヒーをテーマにしたデザイン（液体の波打つ背景、スクロール連動の「コーヒーを飲む」演出、カーソル追従の湯気エフェクト）
- コーヒー注入モチーフのオープニングアニメーション（クリック/時間経過でスキップ可能）
- 多言語対応（英語・日本語のURL切替方式、言語切替時はオープニングをスキップして即表示）
- Server Component活用（一覧ページは静的HTMLに本文コンテンツを直接出力し、アニメーション部分のみClient Component）
- ブログ記事の自動取得（Zenn / Medium / Note からビルド時に並列フェッチ）
- SEO最適化（Person構造化データ、hreflang、OGP、サイトマップ、robots.txt）
- Cloudflare Pages + GitHub Actionsによる自動デプロイ

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
├── app/                        # Next.js App Router
│   ├── layout.tsx              # ルートレイアウト（最小限、CSSのみ）
│   ├── page.tsx                # ルート（/en/ へリダイレクト）
│   ├── [lang]/                 # 言語別ルート（/en/..., /ja/...）
│   │   ├── layout.tsx          # 言語別メタデータ・構造化データ（SEO）
│   │   ├── layout-client.tsx   # クライアント側レイアウト（オープニング・表示制御）
│   │   ├── page.tsx            # トップページ
│   │   ├── blog/page.tsx       # ブログ一覧（Server Component）
│   │   ├── works/
│   │   │   ├── page.tsx        # 作品一覧（Server Component）
│   │   │   ├── layout.tsx      # 作品詳細レイアウト
│   │   │   └── [id]/           # 作品詳細ページ
│   │   └── activities/page.tsx # 活動実績一覧（Server Component）
│   ├── robots.ts               # robots.txt生成
│   └── sitemap.ts              # サイトマップ生成（両言語対応）
├── components/                 # 再利用可能なコンポーネント
│   ├── PageHeader.tsx          # 一覧ページ共通の固定ヘッダー（戻るボタン）
│   ├── AnimatedBackButton.tsx  # 戻るボタンのホバー・タップアニメーション
│   ├── AnimatedHeading.tsx     # ページ見出しのフェードインアニメーション
│   ├── AnimatedListItem.tsx    # リストアイテムのスクロール連動アニメーション
│   ├── OpeningAnimation.tsx    # エントリー時のコーヒー注入アニメーション
│   ├── LiquidBackground.tsx    # コーヒー液体の波打つ背景アニメーション
│   ├── LanguageSwitcher.tsx    # 言語切り替えボタン（URL切替方式）
│   ├── SteamCursor.tsx         # カーソル追従の湯気エフェクト
│   ├── ScrollToTop.tsx         # トップへ戻るボタン
│   ├── TimelineSection.tsx     # タイムライン表示セクション
│   ├── TypeBSection.tsx        # TypeBレイアウトセクション
│   └── StarBackground.tsx      # 星空背景アニメーション
├── contexts/                   # React Context
│   └── LanguageContext.tsx      # 言語コンテキスト（URLから言語を共有）
└── lib/                        # ユーティリティ・データ
    ├── data.ts                 # プロフィール、Works、Blog等のデータ（多言語対応）
    └── blogPosts.json          # ブログ記事データ（prebuildで自動生成）
scripts/
├── prebuild.mjs                # ビルド前処理（Zenn/Medium/Note記事の自動取得）
└── postbuild.mjs               # ビルド後処理（日本語ページのhtml lang属性修正）
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


## 実装上の工夫

- **Server / Client Componentの分離**: 一覧ページ（blog, works, activities）はServer Componentとして静的HTMLを生成し、Framer Motionによるアニメーションだけを小さなClient Componentに切り出すことで、SEOとインタラクティブ性を両立
- **SSR時のコンテンツ出力**: layout-client.tsxでchildrenを常にDOMに配置し、CSSのopacity制御で表示を切り替えることで、SSR時もHTMLにコンテンツが含まれる設計（ハイドレーションミスマッチなし）
- **スクロール連動アニメーション**: `requestAnimationFrame`でスクロール進捗を計算し、液体背景やセクション表示と連動
- **多言語対応**: URLプレフィックス方式（`/en/...`, `/ja/...`）で言語管理。`generateStaticParams()`により全ページを両言語で静的生成
- **ブログ記事の自動収集**: prebuildスクリプトでZenn・Medium・NoteのAPIから記事を並列取得し、JSONに書き出してビルド時にページに反映

