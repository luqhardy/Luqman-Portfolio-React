"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { ui } from "@/lib/content";
import type { Highlight } from "@/lib/resume";

/**
 * A highlight reads as one bordered row split into a square media panel and a
 * block of text. The panel is full-bleed against the cell's own border, which
 * keeps the seamless grid intact.
 *
 * Only some highlights have a real photo of the moment. Rather than let those
 * rows look different, the panel falls back to the highlight's icon on a muted
 * tile — same footprint, same rhythm, no invented imagery.
 */
function MediaPanel({ highlight }: { highlight: Highlight }) {
  const { t } = useLanguage();
  const Icon = highlight.icon;

  return (
    <span className="relative w-20 shrink-0 self-stretch overflow-hidden border-r bg-muted sm:w-24">
      {highlight.photo ? (
        <Image
          src={highlight.photo.src}
          alt={t(highlight.photo.alt)}
          width={480}
          height={480}
          // The panel is ~96px wide but stretches to the cell's full height,
          // so object-cover needs more pixels than the panel's width alone.
          sizes="256px"
          className="h-full w-full object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-105 group-hover:grayscale-0"
        />
      ) : (
        <span className="grid h-full w-full place-items-center">
          <Icon
            aria-hidden="true"
            className="size-5 text-muted-foreground transition-transform group-hover:scale-110"
          />
        </span>
      )}
    </span>
  );
}

export function HighlightCell({ highlight }: { highlight: Highlight }) {
  const { t } = useLanguage();

  const body = (
    <>
      <MediaPanel highlight={highlight} />
      <span className="min-w-0 flex-1 px-3.5 py-3">
        <span className="flex items-start gap-2">
          <span className="text-sm leading-snug font-medium">
            {t(highlight.title)}
          </span>
          {highlight.href ? (
            <ArrowUpRight
              aria-hidden="true"
              className="mt-0.5 size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            />
          ) : null}
        </span>
        <span className="mt-1.5 block text-xs leading-relaxed text-muted-foreground">
          {t(highlight.detail)}
        </span>
      </span>
    </>
  );

  if (!highlight.href) {
    return <div className="cell-flush group">{body}</div>;
  }

  return (
    <a
      href={highlight.href}
      target="_blank"
      rel="noopener noreferrer"
      className="cell-flush group hover:bg-accent/70"
    >
      {body}
      <span className="sr-only">({t(ui.newTab)})</span>
    </a>
  );
}
