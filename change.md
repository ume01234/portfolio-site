# Server Component 移行計画

## 現状の問題

### HTMLにコンテンツが出力されていない

ビルド後の静的HTMLを検査した結果、**全ページの本文コンテンツ（Works、Blog、Hobbies等）がHTML bodyに含まれていない**ことが判明した。タイトルも記事もすべてJavaScript実行後に初めて表示される状態。

### 原因は2つ

**原因1: `layout-client.tsx` がSSR時にchildrenをブロックしている**

```tsx
// layout-client.tsx
const [ready, setReady] = useState(false);

useEffect(() => {
  setReady(true); // useEffectはクライアントでのみ実行
}, []);

if (!ready) return null; // ← SSR時は常にnull = childrenがHTMLに出力されない
```

`ready` は `useEffect` でのみ `true` になるため、サーバーサイドレンダリング時は常に `null` を返す。さらに `showContent` もオープニングアニメーション完了後にしか `true` にならないため、**childrenは二重にブロックされている**。

これが最も影響の大きい根本原因。仮に個別ページがServer Componentであっても、このレイアウトがHTMLへの出力を阻止する。

**原因2: 全ページが `'use client'` になっている**

各ページで `useLanguage()` フックを使って言語を取得しているため、ページ全体が `'use client'` になっている。しかし言語情報はURLパラメータ `[lang]` として**サーバー側で既に利用可能**であり、Context経由で取得する必然性がない。

```
現状: params.lang → LanguageProvider → useLanguage() → getData(lang)
理想: params.lang → getData(lang) をサーバー側で直接実行
```

### `useLanguage` の使用状況

| ファイル | useLanguage の用途 | その他のclient機能 |
|---------|-------------------|------------------|
| `[lang]/page.tsx` | getData(), aria-label, ルート生成 | useState, useEffect, useRef (スクロール), framer-motion |
| `[lang]/blog/page.tsx` | getData(), aria-label | framer-motion のみ |
| `[lang]/works/page.tsx` | getData(), aria-label, ルート生成 | framer-motion のみ |
| `[lang]/activities/page.tsx` | getData(), ルート生成 | framer-motion のみ |
| `[lang]/works/[id]/WorkDetailClient.tsx` | getData(), useRouter (リダイレクト) | useEffect, framer-motion |
| `components/LanguageSwitcher.tsx` | 言語切替ロジック | useRouter, usePathname, onClick |
| `components/ScrollToTop.tsx` | aria-label のみ | useState, useEffect, scroll listener |

**blog, works, activities の各一覧ページ**は `useLanguage()` を除けばframer-motionしかclient機能を使っていない。つまりアニメーション部分だけを小さなClient Componentに切り出せば、ページ本体をServer Componentにできる。

---

## 改善方針

### Phase 1: `layout-client.tsx` の修正（最優先・最大効果）

**目的**: SSR時にもchildrenのHTMLを出力し、Googleクローラーやスクリーンリーダーがコンテンツを認識できるようにする。

**方法**: 条件付きレンダリング（`if (!ready) return null`）をやめ、**CSSでの表示制御**に切り替える。

```tsx
// Before（現状）: SSR時にchildrenが存在しない
if (!ready) return null;

// After: childrenは常にDOM/HTMLに存在し、CSSで非表示にする
<div className={showContent ? 'opacity-100' : 'opacity-0 pointer-events-none'}>
  {children}
</div>
```

- `children` はSSR時にも常にHTMLに含まれる → SEOに有効
- オープニングアニメーションは `children` の上にオーバーレイとして配置
- アニメーション完了後にオーバーレイをフェードアウトし、`children` が見えるようになる
- `LanguageSwitcher` と `SteamCursor` は引き続きclient-onlyで問題ない

**注意**: hydration mismatchを避けるため、`suppressHydrationWarning` やCSS-onlyの制御を検討する。`ready` ステートは `SteamCursor` やイベントリスナーの初期化用に残してもよいが、`children` のレンダリングに使わないことが重要。

### Phase 2: 一覧ページのServer Component化（blog, works, activities）

**目的**: 静的コンテンツをHTMLに直接出力し、JSバンドルサイズを削減する。

**方法**: 各ページから `'use client'` を除去し、アニメーション部分だけを小さなClient Componentに切り出す。

#### blog/page.tsx の例

```
Before（現状）:
  blog/page.tsx ('use client')  ← ページ全体がclient
    └── すべてのコンテンツがJS実行後に表示

After:
  blog/page.tsx (Server Component) ← ページ本体はサーバーで静的HTML生成
    ├── <h1>, <header>, 記事データ ← HTMLに直接含まれる
    └── <AnimatedArticleCard /> ('use client')  ← アニメーション部分のみclient
```

**変更内容**:
- `useLanguage()` を `params.lang` に置換（Server Componentではpropsとして受け取れる）
- `getData(lang)` をServer Component内で直接呼び出す
- `<motion.article>` 等のframer-motion要素を小さなClient Component（例: `AnimatedCard.tsx`）に切り出す
- `<Link>`, `<a>`, `<time>`, テキスト等の静的コンテンツはServer Componentに残す

**対象ファイル**:
- `src/app/[lang]/blog/page.tsx`
- `src/app/[lang]/works/page.tsx`
- `src/app/[lang]/activities/page.tsx`

### Phase 3: トップページの部分的Server Component化

**目的**: トップページのコンテンツ（About Me、Education、Works、Blog等）をHTMLに含める。

**方法**: トップページは `useState`/`useEffect`（スクロール追跡）があるため完全なServer Component化は難しい。セクションごとにServer/Client Componentの境界を設計する。

```
Before（現状）:
  page.tsx ('use client')  ← ページ全体がclient

After:
  page.tsx (Server Component)
    ├── AboutMeSection (Server)     ← 静的テキスト、HTMLに含まれる
    ├── EducationSection (Server)   ← 静的テキスト
    ├── WorksSection (Server + Client child) ← データはServer、カードアニメーションはClient
    ├── BlogSection (Server + Client child)
    └── ScrollableContainer ('use client')  ← スクロール追跡、LiquidBackground
```

**注意**: トップページはスクロール追跡、LiquidBackground、モバイルヘッダーなど複雑なclient機能が絡み合うため、Phase 2より難易度が高い。段階的に進める。

### Phase 4: LanguageContext の役割縮小（任意）

Phase 2-3の完了後、`useLanguage()` が必要なのは以下のコンポーネントのみになる:
- `LanguageSwitcher.tsx` - 言語切替UI（client必須）
- `ScrollToTop.tsx` - aria-label用（propsに変更可能）

最終的に `LanguageContext` は `LanguageSwitcher` 専用になり、他のコンポーネントはすべて `lang` をpropsまたはServer Componentのparamsで受け取る形になる。

---

## 改善によって変わること

### SEO
- **Before**: HTML bodyにコンテンツなし。Googlebotがページ内容を認識するにはJS実行が必須
- **After**: HTML bodyにテキスト・リンク・構造が含まれる。JS実行なしでもコンテンツを認識可能
- **影響**: インデックス登録の高速化、Bing等のJS非対応クローラーへの対応

### パフォーマンス
- **Before**: 空HTML → JSダウンロード → 実行 → 表示（白画面が発生しうる）
- **After**: HTMLにコンテンツ → 即座に表示 → JSで対話性が追加される
- **影響**: LCP（Largest Contentful Paint）の改善、Core Web Vitalsスコア向上

### JSバンドルサイズ
- **Before**: 全ページコンポーネントのコードがクライアントに送信される
- **After**: Server Componentのコードはクライアントに送信されない
- **影響**: 初回ロード時のJS転送量削減

### アクセシビリティ
- **Before**: JS無効環境では何も表示されない
- **After**: JS無効でもコンテンツが読める（アニメーションは動かないが情報は得られる）

---

## なぜこれがベストプラクティスなのか

Next.js App Router の設計思想は**「Server Componentをデフォルトとし、クライアント側の対話性が必要な部分だけを `'use client'` にする」**こと。

```
推奨: Server Component（大部分） > Client Component（対話部分のみ）
現状: Client Component（全部）
```

Server Componentの利点:
1. **HTMLに直接レンダリングされる** → SEOとパフォーマンスが向上
2. **JSバンドルに含まれない** → クライアントに送信するコードが減る
3. **サーバー側のリソースに直接アクセスできる** → データ取得がシンプル
4. **シークレット情報がクライアントに漏洩しない** → セキュリティ向上

`'use client'` は**悪いことではない**が、その範囲は最小限にすべき。アニメーション等の対話性が必要な「葉」のコンポーネントだけをclientにし、データの取得やレイアウトの構築は可能な限りサーバー側で行うのが理想。

---

## 実施順序

| Phase | 対象 | 難易度 | SEO効果 |
|-------|------|--------|---------|
| 1 | layout-client.tsx の修正 | 中 | 最大（全ページに影響） |
| 2 | blog/works/activities ページのSC化 | 低〜中 | 大（一覧ページの内容がHTMLに） |
| 3 | トップページの部分SC化 | 高 | 大（メインコンテンツがHTMLに） |
| 4 | LanguageContext 縮小 | 低 | 小（コード整理） |

Phase 1だけでも全ページのHTML出力が改善されるため、最小の変更で最大の効果が得られる。
Phase 2はPhase 1と並行して進められる。
