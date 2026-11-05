"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { Section, SectionHeading } from "@/components/section";
import { anki, bjt, clips, speechSamples, teacher } from "@/lib/japanese";
import type { Bilingual } from "@/lib/content";

const photos: { src: string; caption: Bilingual }[] = [
  {
    src: "/highlights/kansai-speech.webp",
    caption: { ja: "関西大学 修了式", en: "Kansai University" },
  },
  {
    src: "/highlights/open-campus.webp",
    caption: { ja: "オープンキャンパス", en: "Open Campus" },
  },
  {
    src: "/highlights/lt-talk.webp",
    caption: { ja: "LT会 登壇", en: "Lightning talk" },
  },
];

function rateOf(id: string) {
  return speechSamples.find((sample) => sample.id === id)?.rate ?? 0;
}

const talkGain = Math.round((rateOf("kobe") / rateOf("kansai") - 1) * 100);
const qaShare = Math.round((rateOf("kobe-qa") / teacher.rate) * 100);
const latestBjt = bjt[bjt.length - 1];

const stats: { value: Bilingual; label: Bilingual }[] = [
  {
    value: { ja: `+${talkGain}%`, en: `+${talkGain}%` },
    label: { ja: "発表の話速 2024→26", en: "Talk speed, 2024 to 26" },
  },
  {
    value: { ja: `${qaShare}%`, en: `${qaShare}%` },
    label: { ja: "質疑の話速（教員1名比）", en: "Q&A speed vs one teacher" },
  },
  {
    value: { ja: String(latestBjt.score), en: String(latestBjt.score) },
    label: { ja: `BJT ${latestBjt.band}`, en: `BJT ${latestBjt.band}` },
  },
  {
    value: {
      ja: `${Math.floor(anki.reviews / 10000)}万回`,
      en: `${Math.floor(anki.reviews / 1000)}k`,
    },
    label: { ja: "Anki 復習", en: "Anki reviews" },
  },
];

/** The portfolio's short pointer to the full Japanese museum. */
export function JapaneseTeaser() {
  const { t } = useLanguage();

  return (
    <Section id="japanese" className="py-8">
      <SectionHeading title={t({ ja: "日本語", en: "Japanese" })} />
      <Link
        href="https://jp.luqmanhadi.com"
        className="group block border bg-card p-4 hover:border-primary"
      >
        <span className="block text-sm font-semibold">
          {t({
            ja: "日本語博物館：五年間の記録",
            en: "The Japanese museum: five years on display",
          })}
        </span>
        <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
          {t({
            ja: `スピーチの動画${clips.length}本と、試験、Anki、年表を公開しています。`,
            en: `Watch ${clips.length} videos of me speaking, and see the exams, Anki and the timeline.`,
          })}
        </span>

        <span className="mt-4 grid grid-cols-3 gap-2">
          {photos.map((photo) => (
            <span key={photo.src} className="block min-w-0">
              <Image
                src={photo.src}
                alt={t(photo.caption)}
                width={480}
                height={480}
                sizes="(min-width: 640px) 320px, 33vw"
                className="aspect-square w-full border object-cover"
              />
              <span className="mt-1 block text-[10px] leading-snug text-muted-foreground sm:text-[11px]">
                {t(photo.caption)}
              </span>
            </span>
          ))}
        </span>

        <span className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t pt-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <span key={stat.label.en} className="block min-w-0">
              <span className="block text-sm font-semibold tabular-nums">
                {t(stat.value)}
              </span>
              <span className="block text-[11px] leading-snug text-muted-foreground">
                {t(stat.label)}
              </span>
            </span>
          ))}
        </span>

        <span className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="inline-flex items-center justify-center gap-2 bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity group-hover:opacity-90">
            {t({ ja: "日本語博物館を見る", en: "Visit the Japanese museum" })}
            <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
          </span>
          <span className="text-center font-mono text-xs text-muted-foreground">
            jp.luqmanhadi.com
          </span>
        </span>
      </Link>
    </Section>
  );
}
