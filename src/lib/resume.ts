import {
  BadgeCheck,
  Languages,
  Mic,
  Presentation,
  Trophy,
  Users,
} from "lucide-react";

import type { Bilingual, IconComponent } from "@/lib/content";

/** An award or standout moment worth pulling out of the timeline. */
export type Highlight = {
  id: string;
  title: Bilingual;
  detail: Bilingual;
  href?: string;
  /** Always set: the media panel falls back to this when there is no photo. */
  icon: IconComponent;
  /** Only where a real photo of the moment exists. */
  photo?: { src: string; alt: Bilingual };
};

export const highlights: Highlight[] = [
  {
    id: "nanoconnect",
    icon: Trophy,
    photo: {
      src: "/highlights/nanoconnect.webp",
      alt: {
        en: "Key visual for NANO CONNECT's competition-style internship",
        ja: "ナノコネクト『コンペ形式インターンシップ』のキービジュアル",
      },
    },
    title: {
      en: "Winner — NANO CONNECT competition internship",
      ja: "『ナノコネ コンペ形式インターンシップ』最優秀賞",
    },
    detail: {
      en: "Nanometer, a real-time multiplayer quiz platform built with Next.js, React, TypeScript, Tailwind and Firebase, was chosen from over 300 submissions by university students across Japan.",
      ja: "全国300名以上の大学生の応募の中から、Next.js / React / TypeScript / Tailwind / Firebase で制作したリアルタイム・マルチプレイヤークイズアプリ『ナノメーター』が最優秀賞に選出されました。",
    },
    href: "https://nanometer.luqmanhadi.com",
  },
  {
    id: "expo-selangor",
    icon: Languages,
    photo: {
      src: "/highlights/expo-selangor.webp",
      alt: {
        en: "Luqman speaking at a microphone while interpreting at Expo 2025 Osaka",
        ja: "大阪・関西万博で通訳を務めるルクマン",
      },
    },
    title: {
      en: "Official interpreter, Selangor delegation",
      ja: "セランゴール州代表団 公式通訳",
    },
    detail: {
      en: "Official interpreter for the Selangor state delegation to Expo 2025 Osaka, working between Japanese, English and Malay.",
      ja: "大阪・関西万博におけるセランゴール州代表団の公式通訳を担当。日本語・英語・マレー語間で対応。",
    },
  },
  {
    id: "expo-linearity",
    icon: Languages,
    photo: {
      src: "/highlights/expo-linearity.webp",
      alt: {
        en: "Luqman at the Linearity linear motor elevator exhibit at Expo 2025 Osaka",
        ja: "大阪・関西万博のリニアモーター・エレベータ展示ブースに立つルクマン",
      },
    },
    title: {
      en: "Official interpreter, Linearity Co., Ltd.",
      ja: "株式会社リニアリティー 公式通訳",
    },
    detail: {
      en: "Interpreting and exhibition support on Linearity's linear motor elevator stand at Expo 2025 Osaka.",
      ja: "大阪・関西万博の株式会社リニアリティー「リニアモーター・エレベータ」出展ブースにて通訳・運営サポートを担当。",
    },
  },
  {
    id: "lt",
    icon: Presentation,
    photo: {
      src: "/highlights/lt-talk.webp",
      alt: {
        en: "Luqman presenting at the programming club lightning talk event",
        ja: "プロコン部のLT会で登壇するルクマン",
      },
    },
    title: {
      en: "Unscripted talk, entirely in Japanese",
      ja: "全編フル日本語・台本なしで登壇",
    },
    detail: {
      en: "Spoke to 50+ people at the programming club LT event at Kobe Institute of Computing Graduate School (神戸情報大学院大学), on implementing a Tamagotchi for VRChat users, and fielded the live Q&A in Japanese too. Clip on LinkedIn.",
      ja: "神戸情報大学院大学プロコン部のLT会にて50名以上を前に「【朗報】VRChatter向けのたまごっちを実装してみた件」を発表。質疑応答も日本語で対応。動画はLinkedInにて公開。",
    },
    href: "https://www.linkedin.com/posts/luqman-hadi_publicspeaking-japaneselanguage-vrchat-activity-7482367009016426496-HKiy",
  },
  {
    id: "open-campus",
    icon: Users,
    photo: {
      src: "/highlights/open-campus.webp",
      alt: {
        en: "Luqman speaking at the Open Campus seminar for prospective international students",
        ja: "オープンキャンパスの留学希望者向けセミナーで登壇するルクマン",
      },
    },
    title: {
      en: "Open Campus seminar, in Japanese",
      ja: "オープンキャンパス セミナー登壇",
    },
    detail: {
      en: "Gave a seminar to prospective international students at Kobe Institute of Computing's Open Campus, on student life in Japan and practical Japanese acquisition, answering the live Q&A entirely in Japanese. Three-minute clip on LinkedIn.",
      ja: "神戸電子専門学校のオープンキャンパスにて、留学希望者向けに日本での留学生活と実践的な日本語習得法についてセミナーを実施。質疑応答もすべて日本語で対応。3分間の動画はLinkedInにて公開。",
    },
    href: "https://www.linkedin.com/posts/luqman-hadi_studyinjapan-japaneselanguage-languagelearning-activity-7476561257920110592-rrxb",
  },
  {
    id: "speech",
    icon: Mic,
    photo: {
      src: "/highlights/kansai-speech.webp",
      alt: {
        en: "Luqman speaking at the lectern at the Kansai University exchange programme closing ceremony",
        ja: "関西大学交換留学修了式で登壇するルクマン",
      },
    },
    title: {
      en: "Student representative speech, Kansai University",
      ja: "関西大学 交換留学修了式 学生代表スピーチ",
    },
    detail: {
      en: "Spoke on behalf of 88 students from 50 universities across 19 countries and regions at the autumn 2023 exchange programme closing ceremony. Named as 修了生代表 in the university's own announcement.",
      ja: "2023年秋学期交換留学修了式にて、19の国と地域・50大学・88名を代表してスピーチを担当。関西大学の公式ニュースに修了生代表として掲載。",
    },
    href: "https://www.kansai-u.ac.jp/ja/about/pr/topics/2024/01/post_75757.html",
  },
  {
    id: "fe",
    icon: BadgeCheck,
    photo: {
      src: "/highlights/fe-textbook.webp",
      alt: {
        en: "The 科目B study guide used to prepare for the FE examination",
        ja: "基本情報技術者試験 科目Bの参考書",
      },
    },
    title: {
      en: "Passed the Japanese FE examination",
      ja: "基本情報技術者試験（FE）合格",
    },
    detail: {
      en: "A national IT engineering certification with a 20–40% pass rate, sat in Japanese.",
      ja: "合格率20〜40%の国家試験。日本語で受験。",
    },
  },
];

export type ExperienceEntry = {
  id: string;
  period: string;
  org: Bilingual;
  role: Bilingual;
  detail?: Bilingual;
};

export const experience: ExperienceEntry[] = [
  {
    id: "syunaz",
    period: "2026.04 —",
    org: { en: "Syunaz Travel & Tours", ja: "Syunaz Travel & Tours" },
    role: {
      en: "Trilingual tour guide (freelance)",
      ja: "トライリンガル・ツアーガイド（フリーランス）",
    },
    detail: {
      en: "Itinerary design and delivery across Kansai, interpreting and negotiation in Japanese, English and Malay, halal-compliant meal and lodging arrangements, budget tracking in Excel.",
      ja: "関西エリアの旅程設計・催行、日英マレー3言語での通訳・折衝、ハラール対応の食事／宿泊手配、Excelによる予算・経費管理。",
    },
  },
  {
    id: "kdl",
    period: "2025.11 — 2026.01",
    org: { en: "Kobe Digital Labo", ja: "株式会社神戸デジタル・ラボ" },
    role: {
      en: "App development engineer internship",
      ja: "アプリ開発エンジニア体験インターンシップ",
    },
    detail: {
      en: "Optimised a Python API on Azure Functions: replaced direct Azure SQL reads over 45M+ rows with Apache Parquet on Blob Storage queried through DuckDB, cutting response time from 1–2 minutes to 10–20 seconds. Shut down an unused DB instance for roughly 15,000 yen/month in savings. Rebuilt screens on Atomic Design with Figma and React/Vite/TypeScript, and presented demos on client visits.",
      ja: "Azure Functions上のPython APIを最適化（4,500万件超のAzure SQL直参照 → Blob Storage上のApache ParquetをDuckDBで処理し、1〜2分から10〜20秒に短縮）。不要なDBインスタンス停止で月額約15,000円のコスト削減。Figma＋React/Vite/TypeScriptでAtomic Designに基づく画面刷新。日本語での報連相を徹底し、クライアント訪問デモも担当。",
    },
  },
  {
    id: "expo",
    period: "2025.09 — 2025.10",
    org: { en: "Linearity Inc.", ja: "株式会社リニアリティー" },
    role: {
      en: "Expo 2025 Osaka — JP/EN interpreter, exhibition support",
      ja: "大阪・関西万博 日英通訳／展示運営サポート",
    },
    detail: {
      en: "Official interpreter for the Selangor state delegation to the Expo, and for Linearity at its own exhibit.",
      ja: "万博におけるセランゴール州代表団の公式通訳、および同社出展ブースでの通訳を担当。",
    },
  },
  {
    id: "nano",
    period: "2025.08 — 2025.09",
    org: { en: "NANO CONNECT Inc.", ja: "株式会社ナノコネクト" },
    role: {
      en: "Competition-style engineering internship — winner",
      ja: "コンペ形式ITエンジニアインターンシップ（最優秀賞）",
    },
    detail: {
      en: "Built Nanometer, a real-time quiz app, with Next.js, React and Firebase.",
      ja: "Next.js / React / Firebaseでリアルタイムクイズアプリ「ナノメーター」を開発。",
    },
  },
  {
    id: "wownas",
    period: "2024.04 —",
    org: { en: "Wownas Inc.", ja: "株式会社ワオナス" },
    role: {
      en: "Recruitment support, interpreting, DX (part-time)",
      ja: "外国人採用サポート・通訳・DX推進（アルバイト）",
    },
    detail: {
      en: "Hiring support for Specified Skilled Worker candidates, interpreting for interviews and orientations, data management in Notion and Figma, manual writing and translation, CSV editing from the CLI, and web production support (HTML/CSS/JS, Studio.Design, Adobe).",
      ja: "特定技能（SSW）候補者の採用支援、面接・オリエンテーション通訳、Notion/Figmaでのデータ管理、マニュアル作成・翻訳、CLIでのCSV編集、Web制作サポート（HTML/CSS/JS, Studio.Design, Adobe）。",
    },
  },
  {
    id: "mext",
    period: "2024.04 —",
    org: { en: "Ministry of Education (MEXT)", ja: "文部科学省（MEXT）" },
    role: {
      en: "Japanese Government scholarship holder",
      ja: "国費外国人留学生（奨学生）",
    },
  },
  {
    id: "rgb",
    period: "2022.01 —",
    org: { en: "RGB Monster Limited (UK)", ja: "RGB MONSTER LIMITED（英国）" },
    role: {
      en: "Video producer & videographer (freelance)",
      ja: "映像プロデューサー・ビデオグラファー（フリーランス）",
    },
    detail: {
      en: "Event content for the Edinburgh Fringe. Photoshop, Illustrator, Premiere Pro, After Effects, FFmpeg compression, and two shooting trips to the UK.",
      ja: "Edinburgh Fringe向けイベントコンテンツ制作。Adobe Photoshop/Illustrator/Premiere Pro/After Effects、FFmpegによる動画圧縮、英国出張撮影2回。",
    },
  },
  {
    id: "jbrc",
    period: "2020.05 — 2022.02",
    org: {
      en: "Japan By River Cruise (podcast)",
      ja: "Japan By River Cruise（ポッドキャスト）",
    },
    role: {
      en: "Video editing & social content (freelance)",
      ja: "動画編集・SNSコンテンツ制作（フリーランス）",
    },
  },
  {
    id: "tanuki",
    period: "2021.11 — 2022.01",
    org: { en: "Tanuki Games", ja: "Tanuki Games" },
    role: {
      en: "Motion graphics & JP/EN localisation (freelance)",
      ja: "モーショングラフィックス制作・日英ローカライズ（フリーランス）",
    },
    detail: {
      en: "Teaser video and English localisation for the Four Kingdoms Kickstarter, which met its goal.",
      ja: "Kickstarter（Four Kingdoms）のティザー動画制作と英語ローカライズを担当、目標達成。",
    },
  },
  {
    id: "pona",
    period: "2019.12 — 2021.12",
    org: { en: "Pona", ja: "Pona" },
    role: {
      en: "Video editing & motion graphics (freelance)",
      ja: "動画編集・モーショングラフィックス（フリーランス）",
    },
  },
];

export type EducationEntry = {
  id: string;
  period: string;
  school: Bilingual;
  detail: Bilingual;
};

export const education: EducationEntry[] = [
  {
    id: "kic",
    period: "2025.03 — 2027.03",
    school: { en: "Kobe Institute of Computing", ja: "神戸電子専門学校" },
    detail: {
      en: "AI Systems Development, MEXT scholar. Diploma, graduating March 2027.",
      ja: "AIシステム開発学科（文部科学省国費留学生）／専門士・2027年3月卒業予定",
    },
  },
  {
    id: "jasso",
    period: "2024.04 — 2025.03",
    school: {
      en: "JASSO Osaka Japanese Language Education Center",
      ja: "JASSO 大阪日本語教育センター",
    },
    detail: {
      en: "One-year preparatory course, MEXT scholar.",
      ja: "進学コース（1年）／文部科学省国費留学生",
    },
  },
  {
    id: "kansai",
    period: "2023.09 — 2024.03",
    school: { en: "Kansai University", ja: "関西大学" },
    detail: {
      en: "JASSO exchange programme, business Japanese.",
      ja: "JASSO交換留学プログラム（ビジネス日本語）",
    },
  },
  {
    id: "iium",
    period: "2022.10 — 2026.10",
    school: {
      en: "International Islamic University Malaysia",
      ja: "マレーシア国際イスラム大学（IIUM）",
    },
    detail: {
      en: "Bachelor of Information Technology (ICT), KICT.",
      ja: "情報通信技術学部（KICT）／Bachelor of Information Technology",
    },
  },
  {
    id: "mrsm",
    period: "2016 — 2020",
    school: {
      en: "MARA Junior Science College (MRSM)",
      ja: "MARA Junior Science College（MRSM）",
    },
    detail: { en: "Science stream.", ja: "理系コース" },
  },
];

export type Certification = { name: string; date?: string };

export const certifications: {
  acquired: Certification[];
  inProgress: Certification[];
} = {
  acquired: [
    { name: "AWS Data Streaming Demonstrated", date: "2026.09" },
    { name: "AWS Data Lakehouse Demonstrated", date: "2026.09" },
    { name: "AWS Academy Graduate — Cloud Security Foundations", date: "2026.07" },
    { name: "AWS Academy Graduate — Cloud Architecting", date: "2026.07" },
    { name: "AWS Academy Graduate — Cloud Foundations", date: "2026.07" },
    { name: "基本情報技術者試験 (FE) / IPA", date: "2026.07" },
    {
      name: "Microsoft Certified: Azure Developer Associate (AZ-204)",
      date: "2026.07",
    },
    { name: "AWS Incident Response Demonstrated", date: "2026.06" },
    { name: "AWS Application Networking Demonstrated", date: "2026.05" },
    { name: "AWS Agentic AI Demonstrated", date: "2026.05" },
    { name: "AWS Serverless Demonstrated", date: "2026.05" },
    {
      name: "AWS Certified Solutions Architect — Associate (SAA)",
      date: "2026.02",
    },
    { name: "基本情報技術者試験 科目A 合格 / IPA", date: "2025.12" },
    { name: "AWS Certified Cloud Practitioner (CCP)", date: "2025.11" },
    { name: "TOEIC L&R 985", date: "2025.07" },
    { name: "IPA ITパスポート試験", date: "2025.06" },
    { name: "Adobe Certified Professional (Photoshop)", date: "2025.06" },
    { name: "BJT ビジネス日本語能力テスト J2", date: "2025.04" },
    { name: "日本語能力試験 N1 (JLPT N1)", date: "2023.07" },
  ],
  inProgress: [
    { name: "BJT ビジネス日本語能力テスト J1+", date: "2026 H2" },
    { name: "HashiCorp Terraform Associate", date: "2026 H2" },
    { name: "CKA — Certified Kubernetes Administrator", date: "2027 H1" },
    { name: "応用情報技術者試験 (AP) / IPA", date: "2027 H1" },
    { name: "Google Cloud Associate Cloud Engineer", date: "2027 H1" },
  ],
};

export const stack: { label: Bilingual; items: string[] }[] = [
  {
    label: { en: "Frontend", ja: "フロントエンド" },
    items: [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Vue.js",
      "Nuxt",
      "Vite",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
    ],
  },
  {
    label: { en: "Backend & cloud", ja: "バックエンド・クラウド" },
    items: [
      "Python",
      "Laravel",
      "NestJS",
      "Firebase",
      "Supabase",
      "DuckDB",
      "AWS",
      "Azure",
      "Google Cloud",
    ],
  },
  {
    label: { en: "Deploy & tools", ja: "デプロイ・ツール" },
    items: [
      "Docker",
      "Terraform",
      "Cloudflare",
      "Vercel",
      "Git",
      "VS Code",
      "Notion",
    ],
  },
  {
    label: { en: "Design & creative", ja: "デザイン・クリエイティブ" },
    items: [
      "Photoshop",
      "Illustrator",
      "Premiere Pro",
      "After Effects",
      "Figma",
      "Canva",
      "FFmpeg",
    ],
  },
];

export const languages: { name: Bilingual; level: Bilingual }[] = [
  {
    name: { en: "Japanese", ja: "日本語" },
    level: { en: "JLPT N1 · BJT J2", ja: "JLPT N1・BJT J2" },
  },
  {
    name: { en: "English", ja: "英語" },
    level: { en: "TOEIC 985", ja: "TOEIC 985点" },
  },
  {
    name: { en: "Malay", ja: "マレー語" },
    level: { en: "Native", ja: "ネイティブ" },
  },
];
