import blogPostsData from './blogPosts.json';

export const siteUrl = 'https://z-ume01234.pages.dev';

export type Language = 'en' | 'ja';

export interface ActivityEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'intern' | 'lecture' | 'hackathon';
}

export interface Achievement {
  certifications: string[];
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
      aboutMe: `I work as a generalist spanning data science, web engineering, and robotics.
My goal is to become a bridge that **"extracts"** only the essential value from complex technology and delivers it to businesses and users.
I aspire to be an evangelist who translates the language of technology and provides it as new experiences.`,
      education: [
        'University of Tsukuba, College of General Studies, Science Group 3 - Enrollment',
        'University of Tsukuba, School of Informatics, Media Sciences - Transfer',
        'Digital Nature Group (Yoichi Ochiai Laboratory) - Affiliation',
      ],
    },
    achievements: {
      certifications: [
        'EIKEN Grade Pre-1',
        'Regular Driver\'s License',
        'Fundamental Information Technology Engineer',
        'Applied Information Technology Engineer',
      ],
      activityEvents: [
        { id: '1', title: 'E-Certification Preparation Course (In Progress)', description: 'Taking the E-Certification preparation course hosted by the University of Tokyo Matsuo & Iwasawa Lab.', date: '2025', category: 'lecture' as const },
        { id: '2', title: 'Deep Learning Fundamentals Course 2025 Autumn (Completed)', description: 'Completed the deep learning fundamentals course hosted by the University of Tokyo Matsuo & Iwasawa Lab.', date: '2025 Autumn', category: 'lecture' as const },
        { id: '3', title: 'Logglass Engineer Intern', description: 'Participated as an engineer intern at Logglass.', date: 'Sep 2025', category: 'intern' as const },
        { id: '4', title: 'Mybest Data Scientist Intern', description: 'Participated as a data scientist intern at Mybest.', date: 'Sep 2025', category: 'intern' as const },
        { id: '5', title: 'Works Applications DX Planning Intern', description: 'Participated in a DX planning intern at Works Applications.', date: 'Aug 2025', category: 'intern' as const },
        { id: '6', title: 'GCI 2025 Summer (Completed)', description: 'Completed the GCI 2025 Summer program at the University of Tokyo Matsuo & Iwasawa Lab.', date: '2025 Summer', category: 'lecture' as const },
        { id: '7', title: 'Security Mini Camp Yamanashi (Completed)', description: 'Completed the Security Mini Camp held in Yamanashi.', date: '2025', category: 'lecture' as const },
        { id: '8', title: 'Security Mini Camp Online (Participated)', description: 'Participated in the online Security Mini Camp.', date: '2025', category: 'lecture' as const },
        { id: '9', title: 'Track Job Hackathon (Participated)', description: 'Participated in the Track Job Hackathon.', date: 'May 2025', category: 'hackathon' as const },
        { id: '10', title: 'SAP Japan IT Consultant Intern', description: 'Participated as an IT consultant intern at SAP Japan.', date: 'Mar 2024', category: 'intern' as const },
      ],
    },
    works: [
      {
        id: '1',
        title: 'Portfolio Site Development',
        description: 'This site itself is my first work. A portfolio site themed around coffee, built with Next.js and Framer Motion.',
        url: 'https://z-ume01234.pages.dev',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide React'],
        features: [
          'Responsive split-screen layout',
          'Scroll-linked animations',
          'Multilingual support (EN/JA)',
          'Smooth page transitions',
          'Coffee-themed design system',
        ],
        longDescription: `This portfolio site represents my journey as a developer, combining modern web technologies with thoughtful design. The site features a unique split-screen layout that adapts beautifully to different screen sizes, creating an immersive experience for visitors.

The implementation leverages Next.js App Router for optimal performance and SEO, while Framer Motion provides smooth, scroll-linked animations that enhance the user experience. The coffee-themed design system creates a warm, inviting atmosphere that reflects my personality and approach to development.

Key highlights include a dynamic liquid background animation that responds to scroll progress, multilingual support for both English and Japanese audiences, and a comprehensive showcase of my projects, achievements, and blog posts. The site is fully responsive and optimized for performance, ensuring fast load times and smooth interactions across all devices.`,
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
    blogPosts: blogPostsData as BlogPost[],
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
      aboutMe: `データサイエンス、Webエンジニアリング、ロボティクスを横断するジェネラリストとして活動しています。
私が目指すのは、複雑な技術の中から本質的な価値だけを**「抽出」**し、ビジネスやユーザーに届ける架け橋となること。 
技術の言葉を翻訳し、新しい体験として提供するエバンジェリストでありたいと考えています。`,
      education: [
        '筑波大学 総合学域群 理系3　入学',
        '筑波大学 情報学群メディア創成学類　移行',
        'Digital Nature Group(落合陽一研究室)　所属',
      ],
    },
    achievements: {
      certifications: [
        '実用英語検定準一級',
        '普通自動車免許',
        '基本情報技術者',
        '応用情報技術者',
      ],
      activityEvents: [
        { id: '1', title: 'E資格対策講座 受講中', description: '東京大学松尾・岩澤研究室主催のE資格対策講座を受講しています。', date: '2025年', category: 'lecture' as const },
        { id: '2', title: '深層学習基礎講座 2025 Autumn 修了', description: '東京大学松尾・岩澤研究室主催の深層学習基礎講座を修了しました。', date: '2025年 Autumn', category: 'lecture' as const },
        { id: '3', title: 'Logglass エンジニアインターン', description: 'Logglassにてソフトウェアエンジニアとしてインターンに参加しました。', date: '2025年9月', category: 'intern' as const },
        { id: '4', title: 'Mybest データサイエンティストインターン', description: 'Mybestにてデータサイエンティストとしてインターンに参加しました。', date: '2025年9月', category: 'intern' as const },
        { id: '5', title: 'Works Applications DX企画インターン', description: 'Works ApplicationsにてDX企画のインターンに参加しました。', date: '2025年8月', category: 'intern' as const },
        { id: '6', title: 'GCI 2025 Summer 修了', description: '東京大学松尾・岩澤研究室主催のGCI 2025 Summerプログラムを修了しました。', date: '2025年 Summer', category: 'lecture' as const },
        { id: '7', title: 'セキュリティミニキャンプ 山梨 修了', description: '山梨で開催されたセキュリティミニキャンプを修了しました。', date: '2025年', category: 'lecture' as const },
        { id: '8', title: 'セキュリティミニキャンプ オンライン 参加', description: 'オンラインで開催されたセキュリティミニキャンプに参加しました。', date: '2025年', category: 'lecture' as const },
        { id: '9', title: 'Track Job Hackathon 参加', description: 'Track Job Hackathonに参加しました。', date: '2025年5月', category: 'hackathon' as const },
        { id: '10', title: 'SAP Japan ITコンサルタントインターン', description: 'SAP JapanにてITコンサルタントとしてインターンに参加しました。', date: '2024年3月', category: 'intern' as const },
      ],
    },
    works: [
      {
        id: '1',
        title: 'ポートフォリオサイト制作',
        description: 'このサイト自体が作品の一つです。Next.jsとFramer Motionを活用した、コーヒーをテーマにしたポートフォリオサイト。',
        url: 'https://z-ume01234.pages.dev',
        technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide React'],
        features: [
          'レスポンシブな分割画面レイアウト',
          'スクロール連動アニメーション',
          '多言語対応（日本語/英語）',
          'スムーズなページ遷移',
          'コーヒーテーマのデザインシステム',
        ],
        longDescription: `このポートフォリオサイトは、開発者としての私の旅路を表現し、モダンなWeb技術と丁寧なデザインを組み合わせています。サイトは、異なる画面サイズに美しく適応する独特の分割画面レイアウトを特徴としており、訪問者に没入感のある体験を提供します。

実装では、Next.js App Routerを活用して最適なパフォーマンスとSEOを実現し、Framer Motionがスムーズなスクロール連動アニメーションを提供してユーザー体験を向上させています。コーヒーテーマのデザインシステムは、温かみのある親しみやすい雰囲気を作り出し、私の個性と開発へのアプローチを反映しています。

主な特徴には、スクロールの進行に応答する動的な液体背景アニメーション、英語と日本語の両方のオーディエンス向けの多言語サポート、そして私のプロジェクト、実績、ブログ投稿の包括的な展示が含まれます。サイトは完全にレスポンシブで、パフォーマンスに最適化されており、すべてのデバイスで高速な読み込み時間とスムーズな操作を保証します。`,
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
    blogPosts: blogPostsData as BlogPost[],
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
  {
    name: 'Note',
    url: 'https://note.com/triple_field/portal',
    icon: 'pen-tool',
  },
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
