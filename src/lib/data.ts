import blogPostsData from './blogPosts.json';

export const siteUrl = 'https://z-ume01234.pages.dev';

export type Language = 'en' | 'ja';

export interface ActivityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'intern' | 'lecture' | 'hackathon';
  url?: string;
}

export interface Certification {
  text: string;
  date: string;
}

export interface Achievement {
  certifications: Certification[];
  activityEvents: ActivityEvent[];
}

export interface Work {
  id: string;
  title: string;
  description: string;
  url: string;
  technologies?: string[];
  features?: string[];
  longDescription?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  date: string;        // YYYY-MM-DD
  platform?: string;   // 'Medium' | 'Zenn' | 'Note'
  thumbnail?: string;  // Medium記事のサムネイルURL
  emoji?: string;      // Zenn記事の絵文字
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface Hobby {
  id: string;
  title: string;
  description: string;
  image: string;
}

const data = {
  en: {
    profileData: {
      name: 'Rikuto Hashizume',
      catchCopy: 'The Brewing Engineer',
      vision: 'Creating new worlds through technology',
      aboutMe: `From Sanda, Hyogo.
Data science, web engineering, acoustics, cognitive science,
HCI, philosophy, physics — a generalist fascinated by a wide range of fields.

In an era where technology and society are changing at a dizzying pace,
we need **bridges** that connect complex technology with essential value.
My goal is to become someone who can **translate technology into meaningful experiences**.

I actively share my work in English and aim to expand my reach globally.
Drawing on a lifelong engagement with music and my perspective as someone with hearing differences, my current graduation research explores the **intersection of music and accessibility**.`,
      education: [
        { text: 'University of Tsukuba, College of General Studies, Science Group 3 - Enrollment', date: 'Apr 2023' },
        { text: 'University of Tsukuba, School of Informatics, Media Sciences - Transfer', date: 'Apr 2024' },
        { text: 'Digital Nature Group (Yoichi Ochiai Laboratory) - Affiliation', date: 'Jan 2025', url: 'https://digitalnature.slis.tsukuba.ac.jp/' },
        { text: 'Lab Member Page', url: 'https://digitalnature.slis.tsukuba.ac.jp/2025/12/rikuto-hashizume/' },
      ],
    },
    achievements: {
      certifications: [
        { text: 'EIKEN Grade Pre-1', date: 'Nov 2022' },
        { text: 'Fundamental Information Technology Engineer', date: 'Sep 2024' },
        { text: "Regular Driver's License", date: 'Oct 2024' },
      ],
      activityEvents: [
        { id: '1', title: 'E-Certification Preparation Course (Completed)', description: 'Acquired advanced AI engineering knowledge connecting deep learning fundamentals to E-Certification qualification. Tech stack: Python(PyTorch) / Numpy / Applied Mathematics / Model Optimization / Backpropagation', date: 'Jan 2026', category: 'lecture' as const },
        // Company: Queue Inc. (disclosure pending approval)
        { id: '2', title: 'Contract Engineer', description: 'Database migration (Supabase) and feature improvements for a business support application that centrally manages advertising and listing information across multiple web services. Tech stack: Go / TypeScript / Supabase', date: 'Dec 2025 - Present', category: 'intern' as const },
        { id: '3', title: 'Security Mini Camp 2025 Online (IPA) - Participated', description: 'Cross-disciplinary learning covering LLM application threat analysis, multi-agent systems, and RFC-based protocol implementation. Tech stack: Rust / Python / x86 Assembly / LLM Security / Reverse Engineering', date: 'Oct 2025', category: 'lecture' as const, url: 'https://www.security-camp.or.jp/minicamp/online2025.html' },
        { id: '4', title: 'Logglass 1-Week Engineer Intern', description: 'Participated as a software engineer. Developed a management support system based on Domain-Driven Design (DDD). Learned agile development and clean architecture. Tech stack: Kotlin / TypeScript / SQL / DDD / Agile/Scrum / Clean Architecture', date: 'Sep 2025', category: 'intern' as const },
        { id: '5', title: 'Works Applications 1-Week DX Planning Intern', description: 'Participated as a DX planner. Created business efficiency improvement proposals from a user perspective. Tech stack: DX Strategy / Business Process Analysis / User Research', date: 'Sep 2025', category: 'intern' as const },
        { id: '6', title: 'Security Mini Camp 2025 Yamanashi (IPA) - Participated', description: 'Intensive hands-on training on robust class design using modern C++ standards, and analysis and defense techniques against phishing sites and DDoS attacks. Tech stack: C++ / PHP / Malware Analysis', date: 'Sep 2025', category: 'lecture' as const, url: 'https://www.security-camp.or.jp/minicamp/yamanashi2025.html' },
        { id: '7', title: 'GCI Summer 2025 (UTokyo Matsuo & Iwasawa Lab) - Completed', description: 'Comprehensive program covering data analysis with Python to machine learning implementation and business applications. Honed data analysis skills through Kaggle-style competitions. Tech stack: Python(Pandas, Scikit-learn) / SQL / Data Science / Machine Learning', date: 'Sep 2025', category: 'lecture' as const },
        { id: '8', title: 'Earth Re Pure Inc. Volunteer Development', description: 'Solo website development for a chemical company with patented technology. Handled domain transfer, server selection, SEO improvement, and form implementation on the technical side, and created articles through interviews with technical experts. Currently maintaining the site. Tech stack: PHP / JavaScript / CSS', date: 'Aug 2025 - Present', category: 'intern' as const },
        { id: '9', title: 'Deep Learning Fundamentals Course (UTokyo Matsuo & Iwasawa Lab) - Completed', description: 'Systematically learned from neural network fundamentals to cutting-edge deep learning technologies including CNN, RNN, Transformer, and generative models. JDLA certified course. Tech stack: Python(PyTorch) / Deep Learning / Transformer / LLM', date: 'Jul 2025', category: 'lecture' as const },
        { id: '10', title: 'TrackJob Hackathon - Participated', description: 'Completed product planning, technology selection, implementation, and presentation in 3 days. Developed an app to measure the impact of caffeine intake. Tech stack: JavaScript / CSS', date: 'May 2025', category: 'hackathon' as const },
      ],
    },
    works: [
      {
        id: '1',
        title: 'Portfolio Site Development',
        description: 'This site itself is my first work. A fully static portfolio site themed around coffee, built with Next.js (App Router) and deployed on Cloudflare Pages.',
        url: 'https://z-ume01234.pages.dev',
        technologies: ['Next.js 14 (App Router)', 'TypeScript', 'React 18', 'Tailwind CSS', 'Framer Motion', 'Lucide React', 'Cloudflare Pages', 'GitHub Actions'],
        features: [
          'Fully static export (SSG) — no server required, deployed on Cloudflare Pages',
          'Server Components for SEO-critical pages + Client Components for interactive elements',
          'URL-based multilingual support (EN/JA) with hreflang, OGP, and JSON-LD structured data',
          'Automatic blog aggregation from Medium & Zenn APIs during prebuild',
          'Postbuild script to fix html lang attribute for Japanese pages',
          'Coffee-themed design system with custom Tailwind color palette and gradients',
          'Scroll-linked liquid background animation and interactive steam cursor effect',
          'Responsive split-screen layout (fixed sidebar on desktop, vertical scroll on mobile)',
        ],
        longDescription: `A fully static Next.js application deployed on Cloudflare Pages via GitHub Actions.
It uses the App Router with static export (output: 'export'), pre-rendering the entire site as HTML at build time with zero server runtime.

The architecture separates Server Components and Client Components by role.
List pages (blog, works, activities) are Server Components that generate SEO-optimized static HTML through generateStaticParams.
Animation-heavy UI — the liquid background, steam cursor, and opening animation — is handled by Client Components with Framer Motion.

Multilingual support is implemented via URL prefixes (/en, /ja) rather than a library.
Each page generates both language variants at build time, and a postbuild script corrects the html lang attribute for Japanese pages.
SEO metadata including hreflang alternates, OGP tags, and JSON-LD structured data (Person, BreadcrumbList) is generated per page.

During the prebuild step, a Node.js script fetches the latest articles from Medium (RSS) and Zenn (API).
These are normalized into a shared blogPosts.json and imported as static data, keeping blog content current without any runtime API calls.

The visual design is built on a custom coffee-themed Tailwind configuration.
Six brand colors (cream, latte, beige, brown, dark, espresso) and gradient utilities form the foundation.
The opening animation, scroll-linked liquid wave background, and mouse-tracking steam cursor create a cohesive, immersive experience.`,
      },
      {
        id: '2',
        title: 'Corporate Website Development|(Earth Re Pure Inc.)',
        description: 'Implemented and maintained a corporate website as a volunteer for an acquaintance\'s company. Also handled server contracts and domain transfers.',
        url: 'https://www.earthrepure.co.jp/',
        technologies: ['WordPress', 'Google Analytics', 'Google Search Console', 'Domain Transfer'],
        features: [
          'WordPress site construction',
          'Google Analytics integration',
          'Google Search Console optimization',
          'Domain transfer and server contract',
          'Contact form implementation',
          'Handover documentation creation',
        ],
        longDescription: `Developed and maintained a corporate website for Earth Re Pure Inc. as a volunteer project. The website was built using modern web technologies to ensure optimal performance and user experience.

Key responsibilities included implementing the website structure, setting up hosting infrastructure, managing domain transfers, and ensuring smooth operation. The project involved working closely with the client to understand their needs and deliver a solution that effectively represents their business.

The website features a clean, professional design that is fully responsive across all devices. SEO optimization was implemented to improve search engine visibility, and a contact form was integrated to facilitate communication with potential customers.`,
      },
      {
        id: '3',
        title: 'Deep Learning × Art:|Model Accuracy Improvement Experiment',
        description: 'Conducted an experiment to improve accuracy for the art domain by fine-tuning an image captioning model.',
        url: 'https://example.com',
        technologies: ['Python', 'PyTorch', 'Transformers', 'Hugging Face', 'Jupyter Notebook'],
        features: [
          'Image captioning model fine-tuning',
          'Art domain dataset preparation',
          'Model evaluation and metrics',
          'Transfer learning techniques',
          'Performance optimization',
        ],
        longDescription: `This research project focused on improving the accuracy of image captioning models specifically for the art domain. By fine-tuning pre-trained models on a curated dataset of artworks, I aimed to enhance the model's ability to generate accurate and contextually relevant captions for paintings and other artistic works.

The experiment involved collecting and preprocessing a specialized dataset of artworks, fine-tuning transformer-based models using transfer learning techniques, and evaluating performance using various metrics. The project demonstrated the effectiveness of domain-specific fine-tuning in improving model accuracy for specialized use cases.

Key achievements included successfully adapting general-purpose image captioning models to the art domain, achieving improved accuracy metrics, and documenting the fine-tuning process and results for future reference.`,
      },
      {
        id: '4',
        title: 'HR Data Analysis Using|Machine Learning Models',
        description: 'Conducted EDA and model building from CSV files, proposing measures to improve employee turnover rates.',
        url: 'https://example.com',
        technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'LightGBM', 'Google Colab'],
        features: [
          'EDA (Exploratory Data Analysis)',
          'Model building',
          'Proposal of measures to improve turnover rates',
          'Execution on Google Colab',
        ],
        longDescription: `This project involved conducting EDA and model building from CSV files, proposing measures to improve employee turnover rates.

Key achievements included performing EDA, building models, and proposing measures to improve turnover rates.

The project was executed on Google Colab.`,
      },
    ],
    blogPosts: (blogPostsData as BlogPost[]).filter(p => p.platform !== 'Note'), // Note記事を一時的に非表示
    hobbies: [
      {
        id: '1',
        title: 'Music',
        description: 'Enjoying live concerts and festivals, and playing electric guitar and piano.',
        image: '/images/hobbies/music.jpg',
      },
      {
        id: '2',
        title: 'Sports',
        description: 'Skiing, tennis, and soccer.',
        image: '/images/hobbies/sports.jpg',
      },
      {
        id: '3',
        title: 'Movies',
        description: 'Favorite films include LEON, The Invisible Guest, and Harry Potter series.',
        image: '/images/hobbies/movies.jpg',
      },
      {
        id: '4',
        title: 'Travel',
        description: 'Exploring new places and cultures.',
        image: '/images/hobbies/travel.jpg',
      },
      {
        id: '5',
        title: 'Games',
        description: 'Enjoying various video games.',
        image: '/images/hobbies/games.jpg',
      },
      {
        id: '6',
        title: 'Personal Development',
        description: 'Personal projects, English learning, and participating in Kaggle competitions.',
        image: '/images/hobbies/development.jpg',
      },
    ],
    sections: {
      aboutMe: 'About Me',
      education: 'Affiliation & Education',
      certifications: 'Certifications',
      activityEvents: 'Internships & Events',
      works: 'Projects',
      blog: 'Blog',
      hobbies: 'Hobbies & Interests',
      viewAll: 'View All',
      comingSoon: 'Coming Soon!',
      sourceCode: 'Source code is available on',
      back: 'Back',
    },
    categoryLabels: {
      intern: 'Internship',
      lecture: 'Lecture',
      hackathon: 'Hackathon',
    },
  },
  ja: {
    profileData: {
      name: '橋爪 陸人',
      catchCopy: '技術と感性を、一杯の価値へ',
      vision: '技術を通じて新しい世界を創造する',
      aboutMe: `兵庫県三田市出身。
Webエンジニアリング, データサイエンス, 音響学, 認知科学, HCI, 哲学, 物理学
——幅広い領域に魅了されているジェネラリスト。

技術も社会も目まぐるしく変化する時代だからこそ、  
複雑な技術と本質的な価値をつなぐ**架け橋**が必要である。
私が目指すのは、技術を**意味のある体験に翻訳**できる人。

英語で積極的に発信しており、世界に活動の場を広げていきたいと考えている。
幼少期からの音楽体験と、聴覚の当事者としての視点を持って、  
現在卒業研究では**音楽とアクセシビリティの交差点**を探っている。`,
      education: [
        { text: '筑波大学総合学域群 理系3　入学', date: '2023年4月' },
        { text: '筑波大学 情報学群メディア創成学類　移行', date: '2024年4月' },
        { text: 'Digital Nature Group(落合陽一研究室)　所属', date: '2025年1月', url: 'https://digitalnature.slis.tsukuba.ac.jp/' },
        { text: '所属研究室 個人ページ', url: 'https://digitalnature.slis.tsukuba.ac.jp/2025/12/rikuto-hashizume/' },
      ],
    },
    achievements: {
      certifications: [
        { text: '実用英語検定準一級', date: '2022年11月' },
        { text: '基本情報技術者', date: '2024年9月' },
        { text: '普通自動車免許', date: '2024年10月' },
      ],
      activityEvents: [
        { id: '1', title: 'E資格対策講座 修了', description: '深層学習基礎講座修了からE資格合格までを接続する高度なAIエンジニアリング知識を習得。技術スタック: Python(PyTorch) / Numpy / 応用数学 / モデル最適化 / 誤差逆伝播法', date: '2026年1月', category: 'lecture' as const },
        // 会社名: Queue株式会社（公開許可確認中）
        { id: '2', title: 'エンジニア(業務委託開発)', description: '複数Webサービスに対する広告・掲載情報を一元管理する業務支援アプリケーションにおいてデータベース基盤の移行(Supabase)および関連機能の改修。技術スタック: Go / TypeScript / Supabase', date: '2025年12月~現在', category: 'intern' as const },
        { id: '3', title: 'セキュリティ・キャンプミニ2025オンライン (IPA主催) 参加', description: 'LLMアプリケーションの脅威分析やマルチエージェントシステム,RFCに基づくプロトコル実装を含む技術を横断的に学習。技術スタック: Rust / Python / x86 Assembly / LLM Security / Reverse Engineering', date: '2025年10月', category: 'lecture' as const, url: 'https://www.security-camp.or.jp/minicamp/online2025.html' },
        { id: '4', title: '株式会社Logglass 1week インターン 参加', description: 'ソフトウェアエンジニアとして参加。ドメイン駆動設計(DDD)に基づいた経営管理支援システムを開発。アジャイル開発とクリーンアーキテクチャを習得。技術スタック: Kotlin / TypeScript / SQL / DDD / アジャイル/スクラム / クリーンアーキテクチャ', date: '2025年9月', category: 'intern' as const },
        { id: '5', title: '株式会社WorksApplications 1week インターン 参加', description: 'DX企画職として参加。ユーザー視点に立った業務効率化の提案を作成。技術スタック: DX戦略 / 業務プロセス分析 / ユーザーリサーチ', date: '2025年9月', category: 'intern' as const },
        { id: '6', title: 'セキュリティ・キャンプミニ2025 山梨 (IPA主催) 参加', description: 'C++の最新規格を用いた堅牢なクラス設計や、フィッシングサイト・DDoS攻撃の解析と防御手法を集中的にハンズオン。技術スタック: C++ / PHP / Malware Analysis', date: '2025年9月', category: 'lecture' as const, url: 'https://www.security-camp.or.jp/minicamp/yamanashi2025.html' },
        { id: '7', title: 'GCI Summer2025 (東京大学松尾・岩澤研究室 主催) 修了', description: 'Pythonを用いたデータ分析から機械学習実装,ビジネスへの応用までを網羅。Kaggle形式のコンペティションを通じてデータ解析スキルを研鑽。技術スタック: Python(Pandas,Scikit-learn) / SQL / Data Science / Machine Learning', date: '2025年9月', category: 'lecture' as const },
        { id: '8', title: '株式会社Earth Re Pure ボランティア開発', description: '特許技術を持つ化学系企業のホームページ制作を一人で実施。技術面ではドメイン移管,サーバー選定,SEO改善,フォーム実装、内容面では技術専門家とのインタビューを通して記事を制作した。現在も運営中。技術スタック: PHP / JavaScript / CSS', date: '2025年8月~現在', category: 'intern' as const },
        { id: '9', title: 'DeepLearning(深層学習)基礎講座 (東京大学松尾・岩澤研究室 主催) 修了', description: 'ニューラルネットワークの基礎理論から,CNN,RNN,そしてTransformerや生成モデルといった最先端の深層学習技術までを体系的に習得。JDLA認定講座。技術スタック: Python(PyTorch) / Deep Learning / Transformer / LLM', date: '2025年7月', category: 'lecture' as const },
        { id: '10', title: 'TrackJob Hackathon 参加', description: '3日間でプロダクトの企画から技術選定,実装,プレゼンまでを実施。カフェイン摂取量の影響を測定するアプリを開発。技術スタック: JavaScript / CSS', date: '2025年5月', category: 'hackathon' as const },
      ],
    },
    works: [
      {
        id: '1',
        title: 'ポートフォリオサイト制作',
        description: 'このサイト自体が作品の一つです。Next.js (App Router) による完全静的なポートフォリオサイトを設計・実装し、Cloudflare Pagesにデプロイしています。',
        url: 'https://z-ume01234.pages.dev',
        technologies: ['Next.js 14 (App Router)', 'TypeScript', 'React 18', 'Tailwind CSS', 'Framer Motion', 'Lucide React', 'Cloudflare Pages', 'GitHub Actions'],
        features: [
          '完全静的エクスポート(SSG) — サーバー不要、Cloudflare Pagesにデプロイ',
          'SEO重要ページはServer Components + インタラクティブ要素はClient Componentsで分離',
          'URLベースの多言語対応(日/英) — hreflang・OGP・JSON-LD構造化データを自動生成',
          'prebuildスクリプトでMedium・Zenn APIからブログ記事を自動取得',
          'postbuildスクリプトで日本語ページのhtml lang属性を補正',
          'コーヒーテーマのデザインシステム（Tailwindカスタムカラーパレット・グラデーション）',
          'スクロール連動の液体背景アニメーションとインタラクティブな湯気カーソルエフェクト',
          'レスポンシブ分割画面レイアウト（デスクトップ: 固定サイドバー / モバイル: 縦スクロール）',
        ],
        longDescription: `Next.js App Routerを用いた完全静的アプリケーションです。
output: 'export' による静的エクスポートで、ビルド時に全ページをHTMLとして生成。
サーバーランタイムを一切持たず、Cloudflare Pages上で配信しています。
デプロイはGitHub Actionsで自動化しています。

Server ComponentsとClient Componentsを役割ごとに分離しています。
一覧ページ（ブログ・プロジェクト・活動実績）はServer Componentで実装し、generateStaticParamsによりSEOに最適化された静的HTMLを生成。
液体背景・湯気カーソル・オープニングアニメーションなどのインタラクティブなUIは、Framer Motionを用いたClient Componentで実装しています。

多言語対応はライブラリを使用せず、URLプレフィックス(/en, /ja)方式で実装。
各ページはビルド時に両言語分を生成し、postbuildスクリプトで日本語ページのhtml lang属性を補正しています。
SEOメタデータとして、hreflang・OGPタグ・JSON-LD構造化データ（Person, BreadcrumbList）をページごとに生成。

prebuildステップでは、Node.jsスクリプトがMedium（RSS）とZenn（API）から最新記事を取得。
共通のblogPosts.jsonに正規化し、静的データとしてインポートすることで、ランタイムAPIコールなしにブログコンテンツを最新に保っています。

ビジュアル面では、コーヒーをテーマにしたTailwindカスタム設定を基盤としています。
6色のブランドカラー(cream, latte, beige, brown, dark, espresso)とグラデーションユーティリティを定義。
オープニングアニメーション、スクロール連動の液体波背景、マウス追従の湯気カーソルにより、統一感のある没入体験を実現しています。`,
      },
      {
        id: '2',
        title: '企業webサイト制作|(株式会社earth re pure)',
        description: 'ボランティアとして知人企業のwebサイトを実装・運用。サーバーの契約やドメインの移管等も行いました。',
        url: 'https://www.earthrepure.co.jp/',
        technologies: ['WordPress','Google Analytics','Google Search Console','Domain Transfer'],
        features: [
          'WordPressを使用したサイト構築',
          'Google Analyticsを使用した分析',
          'Google Search Consoleを使用した最適化',
          'ドメイン移管とサーバー契約',
          'お問い合わせフォーム実装',
          '引き継ぎ資料作成'
        ],
        longDescription: `株式会社earth re pureの企業サイトをボランティアとして開発・運用しました。モダンなWeb技術を使用して、パフォーマンスとユーザー体験を最適化したサイトを構築しました。

主な業務内容として、サイト構造の実装、ホスティングインフラの構築、ドメイン移管の管理、そしてスムーズな運用を担当しました。クライアントと密に連携し、ビジネスニーズを理解した上で、効果的に企業を表現するソリューションを提供しました。

サイトは、すべてのデバイスで完全にレスポンシブな、クリーンでプロフェッショナルなデザインを特徴としています。検索エンジンの可視性を向上させるためのSEO最適化を実装し、潜在顧客とのコミュニケーションを促進するお問い合わせフォームを統合しました。`,
      },
      {
        id: '3',
        title: '深層学習×絵画で|モデルの精度向上実験',
        description: '画像キャプショニングモデルをファインチューニングすることで、絵画ドメインに対して精度向上を目指した実験を行いました。',
        url: 'https://example.com',
        technologies: ['Python', 'PyTorch', 'Transformers', 'Hugging Face', 'Jupyter Notebook'],
        features: [
          '画像キャプショニングモデルのファインチューニング',
          '絵画ドメインデータセットの準備',
          'モデル評価とメトリクス',
          '転移学習技術',
          'パフォーマンス最適化',
        ],
        longDescription: `この研究プロジェクトは、絵画ドメインに特化した画像キャプショニングモデルの精度向上に焦点を当てました。キュレーションされた絵画データセットで事前学習済みモデルをファインチューニングすることで、絵画やその他の芸術作品に対して正確で文脈的に適切なキャプションを生成するモデルの能力を向上させることを目指しました。

実験には、専門的な絵画データセットの収集と前処理、転移学習技術を使用したTransformerベースのモデルのファインチューニング、そして様々なメトリクスを使用したパフォーマンス評価が含まれました。このプロジェクトは、専門的な用途のためにドメイン固有のファインチューニングがモデル精度を向上させる効果を実証しました。

主な成果には、汎用の画像キャプショニングモデルを絵画ドメインに適応させることに成功し、改善された精度メトリクスを達成し、将来の参照のためにファインチューニングプロセスと結果を文書化することが含まれます。`,
      },
      {
        id: '4',
        title: '機械学習モデルを用いた|人事データ分析',
        description: 'csvファイルからEDA/モデル構築を行い、離職率改善の施策提案までを行いました。',
        url: 'https://example.com',
        technologies: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Scikit-learn', 'LightGBM','Google Colab'],
        features: [
          'EDA',
          'モデル構築',
          '離職率改善の施策提案',
          'Google Colabでの実行',
        ],
        longDescription: `このプロジェクトは、csvファイルからEDA/モデル構築を行い、離職率改善の施策提案までを行いました。

主な成果には、EDAを行い、モデル構築を行い、離職率改善の施策提案までを行いました。

Google Colabでの実行を行いました。`,
      },
    ],
    blogPosts: (blogPostsData as BlogPost[]).filter(p => p.platform !== 'Note'), // Note記事を一時的に非表示
    hobbies: [
      {
        id: '1',
        title: '音楽',
        description: 'ライブやフェスに行くことと、エレキギターやピアノを演奏することが好きです。',
        image: '/images/hobbies/music.jpg',
      },
      {
        id: '2',
        title: 'スポーツ',
        description: 'スキー、テニス、サッカーを楽しんでいます。',
        image: '/images/hobbies/sports.jpg',
      },
      {
        id: '3',
        title: '映画',
        description: 'LEON、インビジブルゲスト、ハリーポッターシリーズなどが好きです。',
        image: '/images/hobbies/movies.jpg',
      },
      {
        id: '4',
        title: '旅行',
        description: '新しい場所や文化を探索することが好きです。',
        image: '/images/hobbies/travel.jpg',
      },
      {
        id: '5',
        title: 'ゲーム',
        description: '様々なビデオゲームを楽しんでいます。',
        image: '/images/hobbies/games.jpg',
      },
      {
        id: '6',
        title: '個人開発・学習',
        description: '個人開発プロジェクト、英語学習、Kaggleへの参加をしています。',
        image: '/images/hobbies/development.jpg',
      },
    ],
    sections: {
      aboutMe: '私について',
      education: '所属・学歴',
      certifications: '資格',
      activityEvents: 'インターン・外部イベント',
      works: 'プロジェクト',
      blog: 'ブログ',
      hobbies: '趣味・好きなこと',
      viewAll: '一覧へ',
      comingSoon: 'Coming Soon!',
      sourceCode: 'ソースコードは',
      back: '戻る',
    },
    categoryLabels: {
      intern: 'インターン',
      lecture: '外部講義',
      hackathon: 'ハッカソン',
    },
  },
};

// メールアドレス
export const emailAddress = 'zume2.dev@gmail.com';

// GitHubリポジトリURL
export const repositoryUrl = 'https://github.com/ume01234/portfolio-site';

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/ume01234',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/rikuto-h-aa316137a/',
    icon: 'linkedin',
  },
  {
    name: 'Medium',
    url: 'https://medium.com/@zume2.dev',
    icon: 'newspaper',
  },
  // Note連携を一時的に無効化
  // {
  //   name: 'Note',
  //   url: 'https://note.com/triple_field/portal',
  //   icon: 'pen-tool',
  // },
  {
    name: 'Zenn',
    url: 'https://zenn.dev/sunlight_white',
    icon: 'file-text',
  },
];

// 言語に応じたデータを取得する関数
export function getData(language: Language = 'en') {
  return data[language];
}

// ブログ記事データ（言語共通、prebuildスクリプトで生成）
export { blogPostsData };
