"use client";

import * as React from "react";
import { ArrowUpRight, Layers } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { Metric } from "@/components/proxmox-status";
import { ui } from "@/lib/content";
import type { AnkiStats } from "@/lib/anki";

const POLL_MS = 60_000;
const WEEKS = 53;
const CELL = 10;
const GAP = 2;

/** Review-count thresholds for the four shades. Fixed, not relative to the
 * busiest day, so one huge session doesn't wash the rest of the year out. */
const LEVELS = [1, 30, 80, 160];
const OPACITY = [0.25, 0.5, 0.75, 1];

const level = (reviews: number) =>
  LEVELS.reduce((acc, min, i) => (reviews >= min ? i : acc), -1);

/** Local-calendar YYYY-MM-DD; toISOString() would shift the day in JST. */
function isoDay(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function relativeTime(unixSeconds: number, lang: "ja" | "en") {
  const diff = unixSeconds - Date.now() / 1000;
  const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  const abs = Math.abs(diff);
  if (abs < 3600) return rtf.format(Math.round(diff / 60), "minute");
  if (abs < 86400) return rtf.format(Math.round(diff / 3600), "hour");
  return rtf.format(Math.round(diff / 86400), "day");
}

/**
 * A GitHub-style year of reviews: one column per week, Sunday at the top.
 * Drawn as a single SVG on a viewBox so it scales to any width without
 * reflowing into a different number of weeks.
 */
function Heatmap({ days }: { days: Map<string, number> }) {
  const { t, lang } = useLanguage();

  const cells = React.useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);
    start.setDate(start.getDate() - start.getDay() - (WEEKS - 1) * 7);

    const out: { x: number; y: number; date: string; reviews: number }[] = [];
    for (let w = 0; w < WEEKS; w++) {
      for (let d = 0; d < 7; d++) {
        const date = new Date(start);
        date.setDate(start.getDate() + w * 7 + d);
        if (date > today) break;
        const key = isoDay(date);
        out.push({ x: w, y: d, date: key, reviews: days.get(key) ?? 0 });
      }
    }
    return out;
  }, [days]);

  const width = WEEKS * (CELL + GAP) - GAP;
  const height = 7 * (CELL + GAP) - GAP;
  const first = cells[0]?.date.slice(0, 7).replace("-", ".");
  const last = cells.at(-1)?.date.slice(0, 7).replace("-", ".");

  return (
    <div className="cell col-span-2 min-h-0 flex-col items-stretch gap-2 py-3 sm:col-span-4">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="block h-auto w-full"
        role="img"
        aria-label={`${t(ui.ankiTitle)}: ${first} — ${last}`}
      >
        {cells.map((c) => {
          const lv = level(c.reviews);
          return (
            <rect
              key={c.date}
              x={c.x * (CELL + GAP)}
              y={c.y * (CELL + GAP)}
              width={CELL}
              height={CELL}
              className={lv < 0 ? "fill-border" : "fill-primary"}
              fillOpacity={lv < 0 ? 1 : OPACITY[lv]}
            >
              <title>
                {lang === "ja"
                  ? `${c.date}・${c.reviews.toLocaleString()}回`
                  : `${c.date} · ${c.reviews.toLocaleString()} reviews`}
              </title>
            </rect>
          );
        })}
      </svg>
      <div className="flex items-center justify-between font-mono text-[0.6rem] text-muted-foreground">
        <span>
          {first} — {last}
        </span>
        <span aria-hidden="true" className="flex items-center gap-1">
          {t(ui.ankiFewer)}
          <span className="inline-block size-2 bg-border" />
          {OPACITY.map((o) => (
            <span
              key={o}
              className="inline-block size-2 bg-primary"
              style={{ opacity: o }}
            />
          ))}
          {t(ui.ankiMore)}
        </span>
      </div>
    </div>
  );
}

export function AnkiStatsPanel() {
  const { t, lang } = useLanguage();
  const [stats, setStats] = React.useState<AnkiStats | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/anki");
        const data: AnkiStats = await res.json();
        if (!cancelled) setStats(data);
      } catch {
        if (!cancelled) setStats({ online: false });
      }
    };

    load();
    const id = setInterval(load, POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") load();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  const loading = stats === null;
  const online = stats?.online === true;
  const studying = online && stats?.studying === true;
  const dash = "—";
  const n = (v: number | undefined) =>
    online && typeof v === "number" ? v.toLocaleString() : dash;

  const days = React.useMemo(
    () => new Map(stats?.heatmap ?? []),
    [stats?.heatmap],
  );

  const status = loading
    ? t(ui.nodeLoading)
    : !online
      ? t(ui.nodeOffline)
      : studying
        ? t(ui.ankiStudying)
        : typeof stats?.lastReviewAt === "number"
          ? `${t(ui.ankiLastReview)} ${relativeTime(stats.lastReviewAt, lang)}`
          : dash;

  const dayUnit = (v: number) => (lang === "ja" ? `${v}日` : `${v} d`);
  const hours =
    online && typeof stats?.totalSeconds === "number"
      ? Math.round(stats.totalSeconds / 3600)
      : undefined;

  return (
    <section aria-label={t(ui.ankiTitle)} className="px-4 pt-6 pb-2 sm:px-6">
      <div className="mb-2 flex items-baseline gap-3 border-b pb-2">
        <h2 className="eyebrow flex items-center gap-2 text-foreground">
          <span
            aria-hidden="true"
            className={
              "inline-block size-1.5 shrink-0 " +
              (loading
                ? "animate-pulse bg-muted-foreground"
                : studying
                  ? "animate-pulse bg-primary"
                  : online && stats?.studiedToday
                    ? "bg-primary"
                    : "bg-muted-foreground")
            }
          />
          {t(ui.ankiTitle)}
        </h2>
        <span aria-hidden="true" className="h-px flex-1" />
        <span className="font-mono text-[0.65rem] text-muted-foreground">
          {status}
        </span>
      </div>

      <div className="cell-grid grid-cols-2 sm:grid-cols-4">
        <Metric
          label={t(ui.ankiStreak)}
          value={
            online && typeof stats?.streakCurrent === "number"
              ? dayUnit(stats.streakCurrent)
              : dash
          }
          note={
            online && typeof stats?.streakLongest === "number"
              ? `${t(ui.ankiLongest)} ${dayUnit(stats.streakLongest)}`
              : undefined
          }
        />
        <Metric
          label={t(ui.ankiToday)}
          value={n(stats?.todayReviews)}
          note={online ? t(ui.ankiReviews) : undefined}
        />
        <Metric
          label={t(ui.ankiRetention)}
          value={
            online && typeof stats?.retentionPercent === "number"
              ? `${stats.retentionPercent.toFixed(1)}%`
              : dash
          }
          percent={online ? stats?.retentionPercent : undefined}
        />
        <Metric
          label={t(ui.ankiTotal)}
          value={n(stats?.totalReviews)}
          note={
            typeof hours === "number"
              ? lang === "ja"
                ? `${hours.toLocaleString()}時間`
                : `${hours.toLocaleString()} h`
              : undefined
          }
        />
        <Heatmap days={days} />
      </div>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <p className="max-w-prose text-xs leading-relaxed text-muted-foreground">
          {t(ui.ankiBlurb)}
        </p>
        <a
          href="https://anki.luqmanhadi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-2 self-start border px-2.5 py-1.5 text-xs transition-colors hover:bg-accent"
        >
          <Layers
            aria-hidden="true"
            className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:scale-110"
          />
          {t(ui.ankiDashboard)}
          <ArrowUpRight
            aria-hidden="true"
            className="size-3 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
          />
          <span className="sr-only">({t(ui.newTab)})</span>
        </a>
      </div>
    </section>
  );
}
