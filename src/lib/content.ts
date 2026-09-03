import type * as React from "react";
import {
  Braces,
  BookOpen,
  BriefcaseBusiness,
  CloudSun,
  FileText,
  Heart,
  Languages,
  Link2,
  Mail,
  Music4,
  Palette,
  PenLine,
  ScanText,
  Server,
  Smartphone,
  Trophy,
} from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons";

/** Any 24x24 currentColor icon: lucide's, or one of our inlined brand marks. */
export type IconComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export type Lang = "ja" | "en";

/** A string that exists in both site languages. */
export type Bilingual = Record<Lang, string>;

export type Project = {
  id: string;
  href: string;
  icon: IconComponent;
  title: Bilingual;
  description: Bilingual;
  /** Shown as a small badge in the cell, e.g. WIP or an award. */
  tag?: Bilingual;
};

export type ProjectGroup = {
  id: string;
  label: Bilingual;
  projects: Project[];
};

const nanometer: Project = {
  id: "nanometer",
  href: "https://nanometer.luqmanhadi.com",
  icon: Trophy,
  title: { en: "Nanometer", ja: "ナノメーター" },
  description: {
    en: "Real-time multiplayer quiz platform",
    ja: "リアルタイム・マルチプレイヤークイズアプリ",
  },
  tag: { en: "Award", ja: "最優秀賞" },
};

const garakei: Project = {
  id: "garakei",
  href: "https://garakei.luqmanhadi.com/",
  icon: Smartphone,
  title: { en: "Garakei Server", ja: "ガラケーサーバー" },
  description: {
    en: "I turned a flip phone into a web server",
    ja: "ガラケーをサーバーにしてみました",
  },
};

const weather: Project = {
  id: "iot",
  href: "https://iot.luqmanhadi.com/",
  icon: CloudSun,
  title: { en: "Weather Station", ja: "ウェザーステーション" },
  description: {
    en: "Live weather data from Kōbe, Japan",
    ja: "神戸三宮周辺のリアルタイム気象データ",
  },
};

const shortlink: Project = {
  id: "shortlink",
  href: "https://s.luqmanhadi.com",
  icon: Link2,
  title: { en: "Shortlink", ja: "ショートリンク" },
  description: {
    en: "Serverless link shortener on Cloudflare",
    ja: "Cloudflareで動くサーバーレスなリンク短縮サービス",
  },
};

const proxmox: Project = {
  id: "proxmox",
  href: "https://proxmox.luqmanhadi.com",
  icon: Server,
  title: { en: "Proxmox Dashboard", ja: "Proxmox ダッシュボード" },
  description: {
    en: "Live stats from the Proxmox node I run",
    ja: "自分で運用するProxmoxノードのライブ稼働状況",
  },
};

const bunsekikun: Project = {
  id: "bunsekikun",
  href: "https://bunsekikun.luqmanhadi.com/",
  icon: ScanText,
  title: { en: "Bunsekikun", ja: "ぶんせきくん" },
  description: { en: "Japanese sentence analysis tool", ja: "和文分析ツール" },
};

const shutokun: Project = {
  id: "shutokun",
  href: "https://shutokun.luqmanhadi.com/",
  icon: Languages,
  title: { en: "Shutokun", ja: "しゅうとくん" },
  description: {
    en: "User-adaptive language learning",
    ja: "ユーザーに合わせた言語学習ツール",
  },
};

const vocalaysia: Project = {
  id: "vocalaysia",
  href: "https://vocalaysia.luqmanhadi.com/",
  icon: Music4,
  title: { en: "Vocalaysia", ja: "Vocalaysia" },
  description: {
    en: "Survey of Malaysian Vocaloid fans",
    ja: "マレーシアにおけるボカロ愛好家の調査",
  },
};

const oshikatsu: Project = {
  id: "oshikatsu",
  href: "https://oshikatsu.luqmanhadi.com/",
  icon: Heart,
  title: { en: "oshikatsu.json", ja: "推し活.json" },
  description: {
    en: "Oshikatsu, tracked with JSON files",
    ja: "JSONファイルで推し活",
  },
};

const portfolio: Project = {
  id: "portfolio",
  href: "https://portfolio.luqmanhadi.com/",
  icon: Palette,
  title: { en: "Graphics Design Portfolio", ja: "ポートフォリオ" },
  description: {
    en: "Posters, flyers and event key visuals",
    ja: "グラフィックデザイン作品集",
  },
};

const selfPr: Project = {
  id: "pr",
  href: "https://pr.luqmanhadi.com/",
  icon: BriefcaseBusiness,
  title: { en: "Self-PR", ja: "自己PR" },
  description: { en: "Information for recruiters", ja: "採用担当者の方へ" },
};

const blog: Project = {
  id: "blog",
  href: "https://blog.luqmanhadi.com/",
  icon: PenLine,
  title: { en: "Blog", ja: "ブログ" },
  description: {
    en: "Notes on what I am building",
    ja: "制作中のものについての記録",
  },
  tag: { en: "WIP", ja: "準備中" },
};

const cloudis: Project = {
  id: "cloudis",
  href: "https://cloudis.luqmanhadi.com/",
  icon: Braces,
  title: { en: "Cloudis GIS", ja: "Cloudis GIS" },
  description: {
    en: "一般社団法人クラウディス",
    ja: "一般社団法人クラウディス",
  },
};

/** The four I would show first if someone only had a minute. */
export const featured: Project[] = [nanometer, garakei, bunsekikun, weather];

export const projectGroups: ProjectGroup[] = [
  {
    id: "apps",
    label: { en: "Apps & tools", ja: "アプリ・ツール" },
    projects: [nanometer, bunsekikun, shutokun, oshikatsu],
  },
  {
    id: "hardware",
    label: { en: "Hardware & infrastructure", ja: "ハードウェア・インフラ" },
    projects: [garakei, weather, shortlink, proxmox],
  },
  {
    id: "research",
    label: { en: "Research & design", ja: "リサーチ・デザイン" },
    projects: [vocalaysia, portfolio],
  },
  {
    id: "profile",
    label: { en: "Profile & work", ja: "プロフィール・仕事" },
    projects: [selfPr, blog, cloudis],
  },
];

export const allProjects: Project[] = projectGroups.flatMap((g) => g.projects);

export type ElsewhereLink = {
  id: string;
  href: string;
  icon: IconComponent;
  label: string;
  description: Bilingual;
};

export const elsewhere: ElsewhereLink[] = [
  {
    id: "linkedin",
    href: "https://linkedin.com/in/luqman-hadi/",
    icon: LinkedinIcon,
    label: "LinkedIn",
    description: { en: "Work history and connections", ja: "職歴・つながり" },
  },
  {
    id: "github",
    href: "https://github.com/luqhardy",
    icon: GithubIcon,
    label: "GitHub",
    description: {
      en: "Source for most of the above",
      ja: "上記のソースコード",
    },
  },
  {
    id: "qiita",
    href: "https://qiita.com/luqhardy",
    icon: FileText,
    label: "Qiita",
    description: {
      en: "Technical articles, written in Japanese",
      ja: "技術記事（日本語）",
    },
  },
  {
    id: "zenn",
    href: "https://zenn.dev/luqhardy",
    icon: BookOpen,
    label: "Zenn",
    description: {
      en: "Longer technical write-ups",
      ja: "技術記事・本",
    },
  },
  {
    id: "email",
    href: "mailto:hello@luqmanhadi.com",
    icon: Mail,
    label: "hello@luqmanhadi.com",
    description: { en: "The fastest way to reach me", ja: "一番早い連絡方法" },
  },
];

export const profile = {
  name: { en: "Luqman Hadi", ja: "Luqman Hadi" },
  fullName: "Luqman Hadi Suhairi",
  /** Full name as it appears on official records. */
  legalName: "Mohamed Luqman Hadi Bin Mohamed Suhairi",
  legalNameKana: "モハメド・ルクマン・ハディ・ビン・モハメド・スハイリ",
  kana: "ルクマン・ハディ",
  pronouns: "He/Him",
  email: "hello@luqmanhadi.com",

  /** Illustrator of the hero art, credited in the footer. */
  artist: { handle: "@fsaturn12", href: "https://x.com/fsaturn12" },

  /** The notice bar at the top of the page. */
  status: {
    en: "Job search wrapped up for now — graduating March 2027. Still always glad to connect, so do get in touch.",
    ja: "2027年3月卒業予定・就職活動は一旦終了 — つながり・ご連絡はいつでも大歓迎です",
  },

  tagline: {
    en: "AI Systems Development (MEXT Scholarship) student in Kōbe, Japan. Heading toward cloud and infrastructure engineering — AWS SAA and Azure AZ-204 certified, building on Cloudflare Workers at the edge, and running Linux VMs on a Proxmox host I maintain myself. Currently working through LPIC and CCNA.",
    ja: "文部科学省国費留学生として、神戸でAIシステムを学ぶ学生。AWS SAA・Azure AZ-204を取得し、Cloudflare Workersでのエッジ開発や、自分で運用するProxmoxホスト上でのLinux VM運用に取り組みながら、クラウド／インフラエンジニアを目指しています。現在はLPIC・CCNAを学習中。",
  },

  bio: {
    en: [
      "I'm Luqman Hadi Suhairi, an AI Systems Development student at Kobe Institute of Computing on a Japanese Government (MEXT) scholarship, graduating in March 2027. I started at International Islamic University Malaysia (IIUM, Kulliyyah of ICT), self-studied Japanese to JLPT N1, spent an exchange year at Kansai University as a JASSO scholar, and have continued studying in Japan since.",
      "Trilingual in Japanese (JLPT N1, BJT J2), English (TOEIC 985) and Malay (native). I've worked as an interpreter at Wownas Inc. and at Expo 2025 Osaka, and completed engineering internships at Kobe Digital Labo and NANO CONNECT Inc.",
      "I hold the Japanese FE certification, AWS Certified Solutions Architect – Associate and Microsoft Certified: Azure Developer Associate (AZ-204). I'm currently studying for LPIC, CCNA and Oracle Master Silver.",
    ],
    ja: [
      "はじめまして、ルクマンです。文部科学省国費留学生として神戸電子専門学校（Kobe Institute of Computing）AIシステム開発学科に在籍し、2027年3月卒業予定です。マレーシア国際イスラム大学（IIUM・情報通信技術学部）在学中に独学でJLPT N1を取得し、JASSO奨学生として関西大学へ交換留学、その後MEXT奨学生として日本での学びを続けています。",
      "日本語（JLPT N1 / BJT J2）・英語（TOEIC 985）・マレー語（ネイティブ）のトリリンガルとして、株式会社ワオナスでの通訳・採用支援、大阪・関西万博での日英通訳、神戸デジタル・ラボおよび株式会社ナノコネクトでの開発インターンシップを経験しました。",
      "基本情報技術者試験（FE）、AWS Certified Solutions Architect – Associate、Microsoft Certified: Azure Developer Associate (AZ-204) などを取得済みで、現在はLPIC・CCNA・Oracle Master Silverに向けて学習中です。",
    ],
  },

  facts: [
    {
      label: { en: "Studying", ja: "在学" },
      value: {
        en: "Kobe Institute of Computing — AI Systems Development, graduating March 2027",
        ja: "神戸電子専門学校　AIシステム開発学科　2027年3月卒業予定",
      },
    },
    {
      label: { en: "Scholarship", ja: "奨学金" },
      value: {
        en: "Japanese Government (MEXT) Scholar",
        ja: "文部科学省国費外国人留学生",
      },
    },
    {
      label: { en: "Languages", ja: "語学" },
      value: {
        en: "Japanese JLPT N1 / BJT J2 · English TOEIC 985 · Malay native",
        ja: "日本語 JLPT N1・BJT J2／英語 TOEIC 985／マレー語 ネイティブ",
      },
    },
    {
      label: { en: "Currently", ja: "現在" },
      value: {
        en: "Wownas Inc.",
        ja: "株式会社ワオナス",
      },
    },
    {
      label: { en: "Based in", ja: "拠点" },
      value: {
        en: "Kōbe, Hyōgo, Japan — from Malaysia",
        ja: "兵庫県神戸市（マレーシア出身）",
      },
    },
  ],
} as const;

/** UI strings that are not tied to a single project. */
export const ui = {
  featured: { en: "Selected work", ja: "主な制作物" },
  allProjects: { en: "All projects", ja: "すべての制作物" },
  highlights: { en: "Awards & highlights", ja: "受賞歴・実績" },
  experience: { en: "Experience", ja: "職務経歴" },
  education: { en: "Education", ja: "学歴" },
  certifications: { en: "Certifications", ja: "資格・認定" },
  acquired: { en: "Acquired", ja: "取得済み" },
  inProgress: { en: "In progress", ja: "学習中" },
  stack: { en: "Tech stack", ja: "技術スタック" },
  elsewhere: { en: "Elsewhere", ja: "ほかの場所" },
  nodeStatus: { en: "Home node", ja: "自宅サーバー" },
  nodeOnline: { en: "live", ja: "稼働中" },
  nodeOffline: { en: "unreachable", ja: "接続不可" },
  nodeLoading: { en: "checking…", ja: "確認中…" },
  nodeMemory: { en: "Memory", ja: "メモリ" },
  nodeDisk: { en: "Disk", ja: "ディスク" },
  nodeUptime: { en: "Uptime", ja: "稼働時間" },
  nodeDashboard: { en: "Full dashboard", ja: "ダッシュボードを開く" },
  nodeBlurb: {
    en: "A single Proxmox VE 9 node on an Intel i7-6700 with 16GB of RAM, running four LXC containers across local and LVM storage, reachable over Cloudflare and Tailscale. The dashboard above runs in one of those containers — a small Python service on the standard library alone, polling the Proxmox API. No framework, no database.",
    ja: "Intel Core i7-6700・メモリ16GBの1台構成のProxmox VE 9ノード。local／LVMストレージ上でLXCコンテナを4台稼働させ、CloudflareとTailscale経由で接続しています。上のダッシュボードもそのコンテナの1つで、Pythonの標準ライブラリだけでProxmox APIを取得しています。フレームワークもデータベースも使っていません。",
  },
  about: { en: "About", ja: "自己紹介" },
  newTab: { en: "opens in new tab", ja: "新しいタブで開く" },
  rights: { en: "All rights reserved.", ja: "All rights reserved." },
  artBy: { en: "art by", ja: "イラスト" },
  builtWith: {
    en: "Built with Next.js, Tailwind CSS and shadcn/ui.",
    ja: "Next.js・Tailwind CSS・shadcn/ui で制作。",
  },
  toggleLanguage: { en: "日本語に切り替え", ja: "Switch to English" },
  toggleTheme: { en: "Toggle theme", ja: "テーマ切り替え" },
} as const;

/**
 * Every form of the name someone might search for, in both scripts. Fed to
 * the Person schema's alternateName so search engines treat them as one
 * person rather than several.
 */
export const nameVariants: string[] = [
  "Mohamed Luqman Hadi Bin Mohamed Suhairi",
  "MOHAMED LUQMAN HADI BIN MOHAMED SUHAIRI",
  "Luqman Hadi Suhairi",
  "Luqman Hadi",
  "モハメド・ルクマン・ハディ・ビン・モハメド・スハイリ",
  "モハメド　ルクマン　ハディ　ビン　モハメド　スハイリ",
  "ルクマン・ハディ",
  "ルクマン ハディ",
  "luqhardy",
];
