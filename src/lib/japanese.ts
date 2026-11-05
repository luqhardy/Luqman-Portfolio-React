import type { Bilingual } from "@/lib/content";

/** Fixed facts behind the Japanese museum. Measured 2026-11-05. */

export const GOAL_DATE = "2027-04-01";

export type SpeechSample = {
  id: string;
  date: string; // YYYY-MM
  name: Bilingual;
  /** Talk length changes the pace, so long and short talks stay separate. */
  series: "long" | "short" | "unscripted" | "offLine";
  minutes: number;
  rate: number;
  pauses: number;
};

export const speechSamples: SpeechSample[] = [
  { id: "kansai", date: "2024-01", name: { ja: "関西大学 修了スピーチ（原稿あり）", en: "Kansai University speech (scripted)" }, series: "long", minutes: 4.1, rate: 4.98, pauses: 8.5 },
  { id: "kic", date: "2025-07", name: { ja: "神戸電子 個人開発の発表", en: "Kobe Denshi project presentation" }, series: "long", minutes: 5.6, rate: 5.88, pauses: 7.3 },
  { id: "shuto", date: "2026-01", name: { ja: "個人開発の紹介動画", en: "Personal project intro video" }, series: "short", minutes: 2.6, rate: 6.8, pauses: 3.1 },
  { id: "formal", date: "2026-02", name: { ja: "改まった場での発表", en: "Formal presentation" }, series: "long", minutes: 8.5, rate: 5.53, pauses: 5.5 },
  { id: "lt", date: "2026-07", name: { ja: "LT会 登壇（原稿なし）", en: "Lightning talk (no script)" }, series: "short", minutes: 3.3, rate: 6.52, pauses: 6.5 },
  { id: "kobe", date: "2026-10", name: { ja: "神戸電子 講演", en: "Kobe Denshi talks" }, series: "long", minutes: 13.9, rate: 6.01, pauses: 6.3 },
  { id: "lt-qa", date: "2026-07", name: { ja: "LT会 質疑応答", en: "Lightning talk Q&A" }, series: "unscripted", minutes: 2.0, rate: 6.66, pauses: 5.0 },
  { id: "kobe-qa", date: "2026-10", name: { ja: "講演後の質疑応答", en: "Q&A after the talks" }, series: "unscripted", minutes: 9.7, rate: 6.12, pauses: 5.6 },
  { id: "aws", date: "2026-06", name: { ja: "VRChat AWS解説（画面操作あり）", en: "VRChat AWS demo (screen work)" }, series: "offLine", minutes: 14.0, rate: 5.38, pauses: 9.1 },
  { id: "cloud", date: "2026-06", name: { ja: "VRChat クラウド解説（画面操作あり）", en: "VRChat cloud demo (screen work)" }, series: "offLine", minutes: 9.9, rate: 5.53, pauses: 8.1 },
  { id: "azure", date: "2026-06", name: { ja: "VRChat Azure解説（画面操作あり）", en: "VRChat Azure demo (screen work)" }, series: "offLine", minutes: 9.4, rate: 4.81, pauses: 8.2 },
  { id: "classroom", date: "2026-06", name: { ja: "教室での短い話", en: "Short classroom talk" }, series: "short", minutes: 2.8, rate: 7.2, pauses: 3.2 },
];

export const teacher = { rate: 6.69, pauses: 6.8, minutes: 2.1 };

export const fixes: { wrong: string; right: string; count: number }[] = [
  { wrong: "A社といった（一社だけ）", right: "A社という", count: 5 },
  { wrong: "節の中の「〜ます」", right: "節の中は普通形", count: 5 },
  { wrong: "すごくたくさん多い", right: "どちらか一つ", count: 4 },
  { wrong: "うまくいけない", right: "うまくいかない", count: 3 },
  { wrong: "選考を受験する", right: "選考を受ける", count: 2 },
  { wrong: "可能性が広げていく", right: "可能性を広げる", count: 2 },
];

export const bjt = [
  { date: "2025.04", score: 504, band: "J2" },
  { date: "2026.10", score: 540, band: "J1" },
] as const;
export const BJT_TARGET = 600;
export const BJT_MAX = 800;

export const anki = {
  firstDay: "2021-08-24",
  reviews: 354463,
  hours: 775,
  mature: 15300,
  twoYearRecall: 93.6,
  twoYearCards: 1179,
};

/** Japanese reviews per month, JST, with other languages and IT decks removed. */
export const ankiMonthly: [string, number][] = [
  ["2021-08", 787], ["2021-09", 1409], ["2021-10", 1890], ["2021-11", 2943], ["2021-12", 5249],
  ["2022-01", 8462], ["2022-02", 18265], ["2022-03", 25385], ["2022-04", 24382], ["2022-05", 17901], ["2022-06", 9979], ["2022-07", 11483], ["2022-08", 1646], ["2022-09", 9349], ["2022-10", 17219], ["2022-11", 15181], ["2022-12", 13736],
  ["2023-01", 13770], ["2023-02", 8923], ["2023-03", 8896], ["2023-04", 7568], ["2023-05", 12882], ["2023-06", 10470], ["2023-07", 5851], ["2023-08", 4620], ["2023-09", 9555], ["2023-10", 9997], ["2023-11", 6652], ["2023-12", 6631],
  ["2024-01", 6820], ["2024-02", 5952], ["2024-03", 4546], ["2024-04", 5097], ["2024-05", 4785], ["2024-06", 3308], ["2024-07", 1487], ["2024-08", 3165], ["2024-09", 2877], ["2024-10", 4042], ["2024-11", 3953], ["2024-12", 2591],
  ["2025-01", 2615], ["2025-02", 856], ["2025-03", 1493], ["2025-04", 1380], ["2025-05", 914], ["2025-06", 67], ["2025-07", 169], ["2025-08", 497], ["2025-09", 371], ["2025-10", 30], ["2025-11", 188], ["2025-12", 271],
  ["2026-01", 107], ["2026-02", 183], ["2026-03", 53], ["2026-04", 147], ["2026-05", 306], ["2026-06", 109], ["2026-07", 72], ["2026-08", 2803], ["2026-09", 295], ["2026-10", 1692],
];

export const ankiMarks: { month: string; label: Bilingual }[] = [
  { month: "2023-07", label: { ja: "N1", en: "N1" } },
  { month: "2023-09", label: { ja: "来日", en: "Japan" } },
];

export type TimelineKind = "life" | "study" | "exam" | "work" | "stage";

export const timeline: {
  date: string;
  kind: TimelineKind;
  text: Bilingual;
  approx?: boolean;
  goal?: boolean;
}[] = [
  { date: "2016", kind: "life", text: { ja: "マレーシアの寄宿学校 MRSM に入学", en: "Started at MRSM boarding school in Malaysia" } },
  { date: "2021.08", kind: "study", text: { ja: "Ankiで最初の復習。ここから全部始まる", en: "First Anki review. Everything starts here" } },
  { date: "2022.10", kind: "life", text: { ja: "マレーシアの大学 IIUM に入学", en: "Started at IIUM in Malaysia" } },
  { date: "2023.06", kind: "life", text: { ja: "関西大学の交換留学に受入許可", en: "Accepted for exchange at Kansai University" } },
  { date: "2023.07", kind: "exam", text: { ja: "JLPT N1 合格（101点）", en: "Passed JLPT N1 with 101" } },
  { date: "2023.09", kind: "life", text: { ja: "初来日。関西大学へ", en: "First came to Japan, for Kansai University" } },
  { date: "2024.01", kind: "stage", text: { ja: "関西大学で修了スピーチ", en: "Farewell speech at Kansai University" } },
  { date: "2024.04", kind: "life", text: { ja: "国費留学生に。JASSO大阪へ、ワオナスで勤務開始", en: "MEXT scholar, JASSO Osaka, started at Wownas" } },
  { date: "2025.03", kind: "life", text: { ja: "神戸電子専門学校に入学", en: "Started at Kobe Denshi" } },
  { date: "2025.04", kind: "exam", text: { ja: "BJT J2（504点）", en: "BJT J2, 504" } },
  { date: "2025.05", kind: "work", text: { ja: "万博マレーシアパビリオンで州代表団の公式通訳", en: "Official interpreter for a state delegation at the Expo Malaysia Pavilion" } },
  { date: "2025.07", kind: "stage", text: { ja: "神戸電子で個人開発を発表", en: "Presented a personal project at Kobe Denshi" }, approx: true },
  { date: "2025.08", kind: "work", text: { ja: "ナノコネクトのコンペ形式インターンで最優秀賞", en: "Won the NANO CONNECT competition internship" } },
  { date: "2025.09", kind: "work", text: { ja: "万博リニアリティー出展ブースで通訳", en: "Interpreter on the Linearity stand at the Expo" } },
  { date: "2025.11", kind: "work", text: { ja: "神戸デジタル・ラボでインターン", en: "Internship at Kobe Digital Labo" } },
  { date: "2026.04", kind: "study", text: { ja: "VRChatの記録に残る最初の一枚", en: "Earliest VRChat screenshot on record" }, approx: true },
  { date: "2026.06", kind: "stage", text: { ja: "VRChatで日本語の技術解説動画を公開", en: "Published Japanese tech videos from VRChat" } },
  { date: "2026.07", kind: "stage", text: { ja: "LT会で自作たまごっちを発表。質疑も日本語で", en: "Lightning talk on a self-built Tamagotchi, with Q&A in Japanese" } },
  { date: "2026.10", kind: "exam", text: { ja: "BJT J1（540点）、応用情報 科目A 合格", en: "BJT J1, 540, and passed Applied Information Subject A" } },
  { date: "2026.10", kind: "stage", text: { ja: "神戸電子で留学生の就活について講演", en: "Talk at Kobe Denshi on job hunting as an international student" } },
  { date: "2027.04", kind: "work", text: { ja: "社会人スタート。ここが今の締切", en: "Start work. This is the deadline" }, goal: true },
];

export const videos: { date: string; title: Bilingual; href: string }[] = [
  { date: "2025.07", title: { ja: "神戸電子 個人開発の発表", en: "Kobe Denshi presentation" }, href: "https://youtu.be/GhKnluZjBk4" },
  { date: "2026.06", title: { ja: "VRChatでAWSを解説", en: "Explaining AWS in VRChat" }, href: "https://youtu.be/buNVtnQCZHU" },
  { date: "2026.06", title: { ja: "VRChatでクラウドを10分解説", en: "Cloud computing in 10 minutes" }, href: "https://youtu.be/aOd14B4l8dE" },
  { date: "2026.06", title: { ja: "420万行のAzure SQLと格闘した話", en: "Fighting 4.2 million rows of Azure SQL" }, href: "https://youtu.be/AOw1FRwFGz4" },
];

export const spokenLanguages: { name: Bilingual; note: Bilingual }[] = [
  { name: { ja: "マレー語", en: "Malay" }, note: { ja: "母語", en: "Native" } },
  { name: { ja: "日本語", en: "Japanese" }, note: { ja: "JLPT N1・BJT J1", en: "JLPT N1, BJT J1" } },
  { name: { ja: "英語", en: "English" }, note: { ja: "TOEIC 985", en: "TOEIC 985" } },
  { name: { ja: "インドネシア語", en: "Indonesian" }, note: { ja: "通訳で使用", en: "Used in interpreting" } },
];

export const clips: {
  id: string;
  date: string;
  length: string;
  title: Bilingual;
  note: Bilingual;
  wide?: boolean;
}[] = [
  { id: "highlight", date: "2026.10", length: "1:27", title: { ja: "留学生が5社から内定をもらうまで", en: "How I got 5 job offers in Japan" }, note: { ja: "神戸電子 オープンキャンパス講演のハイライト", en: "Highlights of the Kobe Denshi Open Campus talk" } },
  { id: "clip-final-round", date: "2026.10", length: "0:42", title: { ja: "最終面接で落ちた話と、5社の内定", en: "Rejected in the final round, then 5 offers" }, note: { ja: "講演より", en: "From the talk" } },
  { id: "clip-one-of-300", date: "2026.10", length: "0:18", title: { ja: "日本人300人の中の留学生1人", en: "One international student among 300" }, note: { ja: "講演より", en: "From the talk" } },
  { id: "clip-sabetsuka", date: "2026.10", length: "0:48", title: { ja: "覚えてほしい言葉「差別化」", en: "One word to remember: 差別化" }, note: { ja: "質疑応答より", en: "From the Q&A" } },
  { id: "clip-communication", date: "2026.10", length: "0:43", title: { ja: "資格より、話せること", en: "Speaking matters more than certificates" }, note: { ja: "質疑応答より", en: "From the Q&A" } },
  { id: "clip-apps", date: "2026.10", length: "0:55", title: { ja: "日本語学習アプリ、どれがおすすめ？", en: "Which app should you use to learn Japanese?" }, note: { ja: "質疑応答より", en: "From the Q&A" } },
  { id: "clip-toeic", date: "2026.10", length: "0:59", title: { ja: "TOEICは受けた方がいい？", en: "Is TOEIC worth taking?" }, note: { ja: "質疑応答より", en: "From the Q&A" } },
  { id: "lt-talk", date: "2026.07", length: "3:17", title: { ja: "LT会：自作たまごっちの発表", en: "Lightning talk: building a Tamagotchi" }, note: { ja: "原稿なしの発表部分", en: "The unscripted talk itself" }, wide: true },
  { id: "kansai-speech", date: "2024.01", length: "6:53", title: { ja: "関西大学 修了スピーチ全編", en: "Full Kansai University farewell speech" }, note: { ja: "原稿あり。前半は英語、後半は日本語", en: "Scripted. Starts in English, then Japanese" } },
];
