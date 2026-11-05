"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Check,
  CircleDashed,
  HelpCircle,
} from "lucide-react";

import { AnkiStatsPanel } from "@/components/anki-stats";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/components/language-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  BjtChart,
  ReviewsChart,
  SpeechChart,
  SpeechTable,
} from "@/components/japanese/charts";
import log from "@/data/japanese-log.json";
import type { Bilingual } from "@/lib/content";
import {
  clips,
  anki,
  BJT_TARGET,
  fixes,
  GOAL_DATE,
  spokenLanguages,
  teacher,
  timeline,
  videos,
  type TimelineKind,
} from "@/lib/japanese";
import { highlights } from "@/lib/resume";
import { cn } from "@/lib/utils";

const KINDS: Record<TimelineKind, Bilingual> = {
  life: { ja: "人生", en: "Life" },
  study: { ja: "勉強", en: "Study" },
  exam: { ja: "試験", en: "Exam" },
  work: { ja: "仕事", en: "Work" },
  stage: { ja: "登壇", en: "Stage" },
};

const EXHIBIT_PHOTOS = [
  "expo-selangor",
  "expo-linearity",
  "lt",
  "open-campus",
  "speech",
  "mext",
];

function Room({
  number,
  title,
  lead,
  children,
}: {
  number: string;
  title: Bilingual;
  lead?: Bilingual;
  children: React.ReactNode;
}) {
  const { lang, t } = useLanguage();
  return (
    <section className="border-t px-4 py-12 sm:px-6 sm:py-14">
      <p className="font-mono text-xs text-primary">
        {lang === "ja" ? `展示 ${number}` : `Room ${number}`}
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-museum)] text-2xl leading-snug font-bold sm:text-3xl">
        {t(title)}
      </h2>
      {lead ? (
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {t(lead)}
        </p>
      ) : null}
      <div className="mt-7">{children}</div>
    </section>
  );
}

function Stat({
  value,
  label,
  note,
  className,
}: {
  value: string;
  label: string;
  note?: string;
  className?: string;
}) {
  return (
    <div className={cn("bg-card p-4", className)}>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tabular-nums">{value}</p>
      {note ? <p className="mt-1 text-xs text-muted-foreground">{note}</p> : null}
    </div>
  );
}

function SpeechVideo({
  src,
  poster,
  date,
  title,
  note,
  wide = false,
}: {
  src: string;
  poster: string;
  date: string;
  title: string;
  note: string;
  wide?: boolean;
}) {
  return (
    <figure className="min-w-0">
      <video
        controls
        playsInline
        preload="none"
        poster={poster}
        className={cn("aspect-[4/5] w-full bg-muted", wide && "object-contain")}
      >
        <source src={src} type="video/mp4" />
      </video>
      <figcaption className="mt-2">
        <p className="font-mono text-xs text-primary">{date}</p>
        <p className="mt-0.5 text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
          {note}
        </p>
      </figcaption>
    </figure>
  );
}

function useDaysLeft() {
  const [days, setDays] = React.useState<number | null>(null);
  React.useEffect(() => {
    const goal = new Date(`${GOAL_DATE}T00:00:00+09:00`).getTime();
    setDays(Math.max(Math.ceil((goal - Date.now()) / 86_400_000), 0));
  }, []);
  return days;
}

type GoalStatus = "progress" | "unknown";

function GoalRow({
  status,
  name,
  value,
}: {
  status: GoalStatus;
  name: string;
  value: string;
}) {
  const { t } = useLanguage();
  const Icon = status === "progress" ? CircleDashed : HelpCircle;
  return (
    <li className="grid gap-1 border-b py-3 text-sm sm:grid-cols-[1fr_auto] sm:gap-6">
      <span className="flex items-start gap-2 font-medium">
        <Icon aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
        {name}
      </span>
      <span className="pl-6 text-muted-foreground sm:pl-0 sm:text-right">
        {value}
        <span className="ml-2 border px-1.5 py-0.5 text-[0.65rem]">
          {status === "progress"
            ? t({ ja: "進行中", en: "In progress" })
            : t({ ja: "未測定", en: "Not measured" })}
        </span>
      </span>
    </li>
  );
}

export function JapaneseMuseum() {
  const { lang, t } = useLanguage();
  const daysLeft = useDaysLeft();
  const photos = EXHIBIT_PHOTOS.flatMap((id) =>
    highlights.filter((h) => h.id === id && h.photo),
  );
  const entries = [...log].sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-12 max-w-4xl items-center gap-3 px-4 sm:px-6">
          <Link
            href="https://luqmanhadi.com"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft aria-hidden="true" className="size-3.5" />
            Luqman Hadi
          </Link>
          <span aria-hidden="true" className="flex-1" />
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-4xl">
        {/* Entrance */}
        <section className="px-4 pt-14 pb-12 sm:px-6 sm:pt-20">
          <p className="font-mono text-xs text-primary">
            {t({ ja: "日本語博物館・入場無料", en: "A museum of one language habit. Free entry" })}
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-museum)] text-4xl leading-tight font-bold [word-break:auto-phrase] sm:text-5xl">
            {t({
              ja: "五年間、日本語に取り憑かれている。",
              en: "Five years in, still obsessed with Japanese.",
            })}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {t({
              ja: "マレーシア出身のルクマンです。2021年にAnkiを始め、N1を取り、来日し、万博で通訳をして、来年4月に日本で社会人になります。目標は、社会人としてネイティブの水準に届くこと。その途中経過を、全部ここに展示します。",
              en: "I'm Luqman, from Malaysia. I started Anki in 2021, passed N1, came to Japan, interpreted at the Expo, and start work here next April. The goal is a native level for working life. This is the progress so far, all of it on display.",
            })}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-px border bg-border sm:grid-cols-4">
            <Stat
              label={t({ ja: "社会人まで", en: "Until work starts" })}
              value={daysLeft === null ? "—" : lang === "ja" ? `${daysLeft}日` : `${daysLeft} days`}
              note="2027.04"
            />
            <Stat
              label={t({ ja: "Anki 復習回数", en: "Anki reviews" })}
              value={anki.reviews.toLocaleString()}
              note={t({ ja: "2021.08から", en: "Since 2021.08" })}
            />
            <Stat
              label={t({ ja: "Anki 累計時間", en: "Anki time" })}
              value={lang === "ja" ? `${anki.hours}時間` : `${anki.hours} h`}
            />
            <Stat
              label="BJT"
              value="540"
              note={t({ ja: `J1。目標は${BJT_TARGET}点`, en: `J1. Goal: ${BJT_TARGET}` })}
            />
          </div>
        </section>

        {/* Before and after */}
        <Room
          number="01"
          title={{ ja: "同じ人の、2年9か月後", en: "Same person, 33 months apart" }}
          lead={{
            ja: "左は原稿を読んだ修了スピーチ。右は留学生に向けた講演です。場面も準備の量も違うので、聞き比べる時はそこも含めてどうぞ。",
            en: "Left is a scripted farewell speech. Right is a talk to international students. The setting and preparation differ, so bear that in mind as you listen.",
          }}
        >
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <SpeechVideo
              src="/japanese/2024-kansai.mp4"
              poster="/japanese/2024-kansai.webp"
              date="2024.01"
              title={t({ ja: "関西大学 修了スピーチ", en: "Kansai University farewell speech" })}
              note={t({ ja: "来日130日目ごろ。原稿あり", en: "About day 130 in Japan. Scripted" })}
            />
            <SpeechVideo
              src="/japanese/2026-kobe.mp4"
              poster="/japanese/2026-kobe.webp"
              date="2026.10"
              title={t({ ja: "神戸電子 講演", en: "Talk at Kobe Denshi" })}
              note={t({ ja: "スライドあり、原稿の読み上げなし", en: "With slides, not read from a script" })}
            />
          </div>
        </Room>

        {/* Gallery */}
        <Room
          number="02"
          title={{ ja: "話しているところ", en: "Hear me speak" }}
          lead={{
            ja: "発表と質疑応答の動画です。短い動画は講演から切り出して字幕を付けました。",
            en: "Talks and live Q&A. The short clips are cut from the talk and subtitled.",
          }}
        >
          <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-3">
            {clips.map((clip) => (
              <SpeechVideo
                key={clip.id}
                src={`/japanese/gallery/${clip.id}.mp4`}
                poster={`/japanese/gallery/${clip.id}.webp`}
                date={`${clip.date} · ${clip.length}`}
                title={t(clip.title)}
                note={t(clip.note)}
                wide={clip.wide}
              />
            ))}
          </div>
        </Room>

        {/* Speech trend */}
        <Room
          number="03"
          title={{ ja: "話す速さは、確かに上がった", en: "The speed really did go up" }}
          lead={{
            ja: "2024年の4.98モーラ/秒から、2026年10月の質疑応答では6.12へ。同じ教室の日本人教員1名（6.69）の91%です。文法や発音の点数ではなく、速さだけの測定です。",
            en: "From 4.98 morae per second in 2024 to 6.12 in live Q&A in October 2026. That is 91% of one native teacher in the same room (6.69). It measures speed only, not grammar or pronunciation.",
          }}
        >
          <SpeechChart />
          <SpeechTable />
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {t({
              ja: `短い発表ほど速く、長い発表や改まった場ほどゆっくりになります。そのため、4分以上の発表だけを線で結びました。4.98から6.01まで、21%の上昇です。教員の値は${teacher.minutes}分のサンプルです。`,
              en: `Short talks run faster, and long or formal ones slower, so only talks of four minutes or more are joined by the line. They rose 21%, from 4.98 to 6.01. The teacher's figure comes from a ${teacher.minutes}-minute sample.`,
            })}
          </p>
        </Room>

        {/* Exams */}
        <Room number="04" title={{ ja: "試験の点数", en: "Exam scores" }}>
          <div className="grid gap-8 sm:grid-cols-[1fr_12rem]">
            <div>
              <h3 className="mb-3 text-sm font-semibold">BJT</h3>
              <BjtChart />
              <p className="mt-3 text-sm">
                {t({ ja: "J1+ まで、あと60点。", en: "60 points to go for J1+." })}
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold">JLPT</h3>
              <div className="border bg-card p-4">
                <p className="text-3xl font-semibold tabular-nums">N1</p>
                <p className="mt-1 text-sm">101 / 180</p>
                <p className="mt-1 text-xs text-muted-foreground">2023.07</p>
              </div>
            </div>
          </div>
        </Room>

        {/* Anki */}
        <Room
          number="05"
          title={{ ja: "Ankiの地層", en: "The Anki strata" }}
          lead={{
            ja: "最盛期は2022年3月の25,385回。今は毎日の修行をやめ、試験の前に集中して使っています。それでも、2年以上空けたカードの93.6%を覚えていました。",
            en: "The peak was 25,385 reviews in March 2022. The daily grind has ended, and now it comes out before exams. Even so, 93.6% of cards left for two years or more were still remembered.",
          }}
        >
          <ReviewsChart />
          <div className="mt-6 grid grid-cols-2 gap-px border bg-border sm:grid-cols-3">
            <Stat
              label={t({ ja: "定着カード", en: "Mature cards" })}
              value={`${anki.mature.toLocaleString()}+`}
            />
            <Stat
              label={t({ ja: "2年後の記憶", en: "Recall after 2+ years" })}
              value={`${anki.twoYearRecall}%`}
              note={t({
                ja: `${anki.twoYearCards.toLocaleString()}回の復習より`,
                en: `From ${anki.twoYearCards.toLocaleString()} reviews`,
              })}
            />
            <Stat
              label={t({ ja: "最長の連続記録", en: "Longest streak" })}
              value={lang === "ja" ? "558日" : "558 days"}
              className="col-span-2 sm:col-span-1"
            />
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            {t({
              ja: "他言語とIT系のデッキは除外。削除済みカードの復習は含みます。下のライブ表示は全デッキの数字です。",
              en: "Other languages and IT decks are excluded. Reviews of deleted cards are included. The live panel below counts every deck.",
            })}
          </p>
        </Room>

        <AnkiStatsPanel />

        {/* Timeline */}
        <Room number="06" title={{ ja: "年表", en: "Timeline" }}>
          <ol className="border-l">
            {timeline.map((event, i) => (
              <li
                key={`${event.date}-${i}`}
                className="relative grid gap-1 py-2.5 pl-5 sm:grid-cols-[5.5rem_3.25rem_1fr] sm:gap-3"
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute top-4 -left-[4px] size-[7px]",
                    event.goal ? "bg-primary" : "bg-muted-foreground",
                  )}
                />
                <span className="font-mono text-xs text-muted-foreground tabular-nums sm:pt-0.5">
                  {event.date}
                  {event.approx ? (lang === "ja" ? "頃" : " approx.") : ""}
                </span>
                <span className="hidden text-xs text-muted-foreground sm:block sm:pt-0.5">
                  {t(KINDS[event.kind])}
                </span>
                <span className={cn("text-sm leading-relaxed", event.goal && "font-semibold")}>
                  {t(event.text)}
                </span>
              </li>
            ))}
          </ol>
        </Room>

        {/* Exhibits */}
        <Room
          number="07"
          title={{ ja: "現場の記録", en: "From the field" }}
          lead={{
            ja: "通訳の現場と、人前で話した記録。使っている言語は四つです。",
            en: "Interpreting jobs and time on stage, working across four languages.",
          }}
        >
          <ul className="mb-8 grid grid-cols-2 gap-px border bg-border sm:grid-cols-4">
            {spokenLanguages.map((language) => (
              <li key={language.name.en} className="bg-card p-3">
                <p className="text-sm font-semibold">{t(language.name)}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t(language.note)}</p>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {photos.map((item) => (
              <figure key={item.id}>
                <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                  <Image
                    src={item.photo!.src}
                    alt={t(item.photo!.alt)}
                    fill
                    sizes="(min-width: 640px) 420px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="mt-2 text-sm">{t(item.title)}</figcaption>
              </figure>
            ))}
          </div>
          <h3 className="mt-9 mb-2 text-sm font-semibold">
            {t({ ja: "全編の動画", en: "Full videos" })}
          </h3>
          <ul>
            {videos.map((video) => (
              <li key={video.href} className="border-b">
                <a
                  href={video.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 py-2.5 text-sm hover:text-primary"
                >
                  <span className="font-mono text-xs text-muted-foreground">{video.date}</span>
                  <span className="min-w-0 flex-1">{t(video.title)}</span>
                  <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </Room>

        {/* Goal */}
        <Room
          number="08"
          title={{ ja: "社会人ネイティブへの残り", en: "What's left before April" }}
          lead={{
            ja: "2027年4月までの宿題です。測れていないものは、測れていないと書いておきます。",
            en: "The homework before April 2027. Anything not yet measured says so.",
          }}
        >
          <ul>
            <GoalRow
              status="progress"
              name={t({ ja: "BJT J1+", en: "BJT J1+" })}
              value={`540 / ${BJT_TARGET}`}
            />
            <GoalRow
              status="progress"
              name={t({ ja: "即興の話速", en: "Unscripted speed" })}
              value={`6.12 / ${teacher.rate}`}
            />
            <GoalRow
              status="progress"
              name={t({ ja: "よく出る誤用", en: "Recurring slips" })}
              value={t({ ja: "1分に約0.9回", en: "About 0.9 a minute" })}
            />
            <GoalRow status="unknown" name={t({ ja: "発音", en: "Pronunciation" })} value="—" />
            <GoalRow
              status="unknown"
              name={t({ ja: "全体のネイティブらしさ", en: "Overall nativeness" })}
              value="—"
            />
          </ul>

          <h3 className="mt-9 mb-1 text-sm font-semibold">
            {t({ ja: "ただいま修理中の日本語", en: "Japanese currently under repair" })}
          </h3>
          <p className="mb-3 text-xs text-muted-foreground">
            {t({
              ja: "2026年10月の講演と質疑、23.6分から。「ちゃんと」は34回言っていました。ちゃんと直します。",
              en: "From 23.6 minutes of talks and Q&A in October 2026. I also said ちゃんと (properly) 34 times. I will fix that properly.",
            })}
          </p>
          <ul className="grid gap-px border bg-border sm:grid-cols-2">
            {fixes.map((fix) => (
              <li key={fix.wrong} className="flex items-baseline gap-3 bg-card p-3 text-sm">
                <span className="min-w-0 flex-1">
                  <s className="text-muted-foreground">{fix.wrong}</s>
                  <span className="mx-1.5 text-muted-foreground">→</span>
                  {fix.right}
                </span>
                <span className="font-mono text-xs text-muted-foreground">{fix.count}</span>
              </li>
            ))}
          </ul>
        </Room>

        {/* Log */}
        <Room number="09" title={{ ja: "最新の記録", en: "Latest entries" }}>
          <ul>
            {entries.map((entry) => (
              <li key={`${entry.date}-${entry.en}`} className="flex gap-3 border-b py-2.5 text-sm">
                <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="font-mono text-xs leading-5 text-muted-foreground">
                  {entry.date.replaceAll("-", ".")}
                </span>
                <span className="min-w-0 flex-1">{lang === "ja" ? entry.ja : entry.en}</span>
              </li>
            ))}
          </ul>
        </Room>

        {/* Method */}
        <Room number="10" title={{ ja: "測り方", en: "How this was measured" }}>
          <ul className="grid max-w-2xl list-disc gap-2 pl-4 text-sm leading-relaxed text-muted-foreground">
            <li>
              {t({
                ja: "話速は音声認識（faster-whisper）の文字起こしからモーラ数を数えたもの。3秒以内の間は含みます。",
                en: "Speech rate counts morae from faster-whisper transcripts. Pauses up to 3 seconds are included.",
              })}
            </li>
            <li>
              {t({
                ja: "「間」は単語間の0.4秒以上の空白です。音声認識は「えー」「あの」を落としやすいため、フィラーは数えていません。",
                en: "A pause is a gap of 0.4 seconds or more between words. Whisper tends to drop fillers, so they aren't counted.",
              })}
            </li>
            <li>
              {t({
                ja: "2024年は原稿あり、2026年は原稿なしなので、文法の正確さは比較していません。発音も評価していません。",
                en: "2024 was scripted and 2026 wasn't, so grammar isn't compared. Pronunciation isn't assessed.",
              })}
            </li>
            <li>
              {t({
                ja: "誤用の数は文字検索によるもので、全ての誤りの数ではありません。一部は文字起こしの誤りかもしれません。",
                en: "Slips come from text search, so this isn't a full error count, and a few may be transcription mistakes.",
              })}
            </li>
          </ul>
        </Room>
      </main>

      <footer className="border-t px-4 py-6 text-center text-xs text-muted-foreground">
        {t({ ja: "最終集計 2026.11.05", en: "Last measured 2026.11.05" })}
      </footer>
    </div>
  );
}
