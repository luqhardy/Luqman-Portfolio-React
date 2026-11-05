"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { Section, SectionHeading } from "@/components/section";

/** The portfolio's short pointer to the full Japanese museum. */
export function JapaneseTeaser() {
  const { t } = useLanguage();

  return (
    <Section id="japanese" className="py-8">
      <SectionHeading title={t({ ja: "日本語", en: "Japanese" })} />
      <Link
        href="/japanese"
        className="group flex items-start justify-between gap-4 border bg-card p-4 hover:border-primary"
      >
        <span>
          <span className="block text-sm font-semibold">
            {t({
              ja: "日本語博物館：五年間の記録",
              en: "The Japanese museum: five years on display",
            })}
          </span>
          <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
            {t({
              ja: "話す速さは2024年から2026年で約23%向上。スピーチの聞き比べ、BJT、35万回のAnki、年表を公開しています。",
              en: "Speaking speed is up about 23% from 2024 to 2026. Compare the speeches, and see BJT scores, 350,000 Anki reviews and the timeline.",
            })}
          </span>
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground group-hover:text-primary"
        />
      </Link>
    </Section>
  );
}
