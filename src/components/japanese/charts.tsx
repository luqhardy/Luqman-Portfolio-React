"use client";

import * as React from "react";

import { useLanguage } from "@/components/language-provider";
import {
  ankiMarks,
  ankiMonthly,
  BJT_MAX,
  BJT_TARGET,
  bjt,
  speechSamples,
  teacher,
  type SpeechSample,
} from "@/lib/japanese";

/** Tracks a container's width, so chart text stays one size on any screen. */
function useWidth(initial: number) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(initial);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const next = Math.round(entry.contentRect.width);
      if (next > 0) setWidth(next);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, width] as const;
}

const monthIndex = (date: string) => {
  const [y, m] = date.split("-").map(Number);
  return y * 12 + m;
};

function Tooltip({
  x,
  y,
  width,
  children,
}: {
  x: number;
  y: number;
  width: number;
  children: React.ReactNode;
}) {
  const left = Math.min(Math.max(x, 96), width - 96);
  return (
    <div
      role="status"
      className="pointer-events-none absolute z-10 w-44 -translate-x-1/2 -translate-y-full border bg-popover px-2.5 py-2 text-xs leading-snug text-popover-foreground shadow-sm"
      style={{ left, top: Math.max(y - 14, 74) }}
    >
      {children}
    </div>
  );
}

const SERIES = {
  long: "var(--chart-1)",
  short: "var(--chart-1)",
  unscripted: "var(--chart-3)",
} as const;

/** Speech rate over time, one line per kind of speaking. */
export function SpeechChart() {
  const { lang, t } = useLanguage();
  const [ref, width] = useWidth(720);
  const [active, setActive] = React.useState<SpeechSample | null>(null);

  const height = 300;
  const pad = { top: 18, right: 40, bottom: 28, left: 34 };
  const yMin = 4.5;
  const yMax = 7.5;
  const xMin = monthIndex("2024-01");
  const xMax = monthIndex("2026-10");

  const x = (date: string) =>
    pad.left +
    ((monthIndex(date) - xMin) / (xMax - xMin)) *
      (width - pad.left - pad.right);
  const y = (rate: number) =>
    pad.top +
    ((yMax - rate) / (yMax - yMin)) * (height - pad.top - pad.bottom);

  const line = (series: "long" | "unscripted") =>
    speechSamples
      .filter((s) => s.series === series)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map((s) => `${x(s.date)},${y(s.rate)}`)
      .join(" ");

  const points = speechSamples.filter((s) => s.series !== "offLine");
  const labels: Record<string, { dx: number; dy: number; anchor: "start" | "middle" | "end" }> = {
    kansai: { dx: 4, dy: 20, anchor: "start" },
    kic: { dx: 0, dy: 20, anchor: "middle" },
    formal: { dx: 0, dy: 20, anchor: "middle" },
    shuto: { dx: 0, dy: -11, anchor: "middle" },
    classroom: { dx: 0, dy: -11, anchor: "middle" },
    lt: { dx: -8, dy: 16, anchor: "end" },
    kobe: { dx: 9, dy: 11, anchor: "start" },
    "lt-qa": { dx: -10, dy: -2, anchor: "end" },
    "kobe-qa": { dx: 9, dy: 0, anchor: "start" },
  };

  return (
    <figure>
      <figcaption className="mb-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-0.5 w-5 bg-chart-1" />
          {t({ ja: "4分以上の発表", en: "Talks of 4+ minutes" })}
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="size-2.5 rounded-full border-2 border-chart-1" />
          {t({ ja: "4分未満の短い発表", en: "Talks under 4 minutes" })}
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="h-0.5 w-5 bg-chart-3" />
          {t({ ja: "その場の質疑応答", en: "Live Q&A" })}
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="w-5 border-t-2 border-dashed border-muted-foreground" />
          {t({ ja: "同じ教室の日本人教員 1名", en: "One native teacher, same room" })}
        </span>
      </figcaption>

      <div ref={ref} className="relative">
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={t({
            ja: "話速の推移。4分以上の発表は2024年1月の4.98から2026年10月の6.01へ。質疑応答は6.12。",
            en: "Speech rate over time. Talks of four minutes or more rose from 4.98 in January 2024 to 6.01 in October 2026. Live Q&A reached 6.12.",
          })}
          className="block"
        >
          {[5, 6, 7].map((tick) => (
            <g key={tick}>
              <line
                x1={pad.left}
                x2={width - pad.right}
                y1={y(tick)}
                y2={y(tick)}
                stroke="var(--border)"
              />
              <text x={pad.left - 8} y={y(tick) + 4} textAnchor="end" fontSize={11} fill="var(--muted-foreground)">
                {tick}
              </text>
            </g>
          ))}
          {["2024-01", "2025-01", "2026-01"].map((tick) => (
            <text key={tick} x={x(tick)} y={height - 8} textAnchor="middle" fontSize={11} fill="var(--muted-foreground)">
              {tick.slice(0, 4)}
            </text>
          ))}
          <line
            x1={pad.left}
            x2={width - pad.right}
            y1={y(teacher.rate)}
            y2={y(teacher.rate)}
            stroke="var(--muted-foreground)"
            strokeWidth={1.5}
            strokeDasharray="5 4"
          />
          <text x={pad.left + 4} y={y(teacher.rate) - 7} fontSize={11} fill="var(--muted-foreground)">
            {teacher.rate}
          </text>

          {(["long", "unscripted"] as const).map((series) => (
            <polyline
              key={series}
              points={line(series)}
              fill="none"
              stroke={SERIES[series]}
              strokeWidth={2}
              strokeLinejoin="round"
            />
          ))}

          {points.map((s) => {
            const l = labels[s.id];
            return (
              <g key={s.id}>
                <circle
                  cx={x(s.date)}
                  cy={y(s.rate)}
                  r={4.5}
                  fill={s.series === "short" ? "var(--background)" : SERIES[s.series as "long"]}
                  stroke={s.series === "short" ? SERIES.short : "var(--background)"}
                  strokeWidth={2}
                />
                <text
                  x={x(s.date) + l.dx}
                  y={y(s.rate) + l.dy}
                  textAnchor={l.anchor}
                  fontSize={11.5}
                  fontWeight={600}
                  fill="var(--foreground)"
                  stroke="var(--background)"
                  strokeWidth={3}
                  paintOrder="stroke"
                >
                  {s.rate.toFixed(2)}
                </text>
                <circle
                  cx={x(s.date)}
                  cy={y(s.rate)}
                  r={18}
                  fill="transparent"
                  tabIndex={0}
                  aria-label={`${t(s.name)} ${s.rate}`}
                  className="outline-none"
                  onMouseEnter={() => setActive(s)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(s)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive(s)}
                />
              </g>
            );
          })}
        </svg>

        {active ? (
          <Tooltip x={x(active.date)} y={y(active.rate)} width={width}>
            <p className="font-semibold">{t(active.name)}</p>
            <p className="mt-0.5 text-muted-foreground">
              {active.date.replace("-", ".")}・{active.rate.toFixed(2)}
              {lang === "ja" ? " モーラ/秒" : " morae/s"}
            </p>
            <p className="text-muted-foreground">
              {lang === "ja"
                ? `間 ${active.pauses}回/分・${active.minutes}分`
                : `${active.pauses} pauses/min, ${active.minutes} min`}
            </p>
          </Tooltip>
        ) : null}
      </div>
    </figure>
  );
}

/** Every measured sample, including the ones kept off the line. */
export function SpeechTable() {
  const { lang, t } = useLanguage();
  return (
    <details className="mt-4 text-xs">
      <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
        {t({ ja: "全サンプルの数字を見る", en: "See every sample" })}
      </summary>
      <div className="mt-2 overflow-x-auto">
        <table className="w-full min-w-[30rem] border-collapse text-left">
          <thead className="text-muted-foreground">
            <tr className="border-b">
              <th className="py-1.5 pr-3 font-medium">{t({ ja: "時期", en: "Date" })}</th>
              <th className="py-1.5 pr-3 font-medium">{t({ ja: "サンプル", en: "Sample" })}</th>
              <th className="py-1.5 pr-3 text-right font-medium">{t({ ja: "分", en: "Min" })}</th>
              <th className="py-1.5 pr-3 text-right font-medium">{lang === "ja" ? "モーラ/秒" : "Morae/s"}</th>
              <th className="py-1.5 text-right font-medium">{t({ ja: "間/分", en: "Pauses/min" })}</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {[...speechSamples]
              .sort((a, b) => a.date.localeCompare(b.date))
              .map((s) => (
                <tr key={s.id} className="border-b">
                  <td className="py-1.5 pr-3 whitespace-nowrap">{s.date.replace("-", ".")}</td>
                  <td className="py-1.5 pr-3">{t(s.name)}</td>
                  <td className="py-1.5 pr-3 text-right">{s.minutes.toFixed(1)}</td>
                  <td className="py-1.5 pr-3 text-right">{s.rate.toFixed(2)}</td>
                  <td className="py-1.5 text-right">{s.pauses.toFixed(1)}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </details>
  );
}

/** BJT scores on the real 0 to 800 scale, with the J1 and J1+ lines drawn in. */
export function BjtChart() {
  const { t } = useLanguage();
  const pct = (score: number) => `${(score / BJT_MAX) * 100}%`;
  const rows = [
    ...bjt.map((row) => ({ ...row, target: false })),
    { date: t({ ja: "目標", en: "Goal" }), score: BJT_TARGET, band: "J1+", target: true },
  ];

  return (
    <div className="grid gap-3">
      {rows.map((row) => (
        <div key={row.date} className="grid grid-cols-[3.75rem_1fr] items-center gap-2 text-xs">
          <span className="text-muted-foreground tabular-nums">{row.date}</span>
          <div className="relative h-7 bg-muted">
            <div
              className={
                row.target
                  ? "absolute inset-y-0 left-0 border-2 border-dashed border-chart-1"
                  : "absolute inset-y-0 left-0 bg-chart-1"
              }
              style={{ width: pct(row.score) }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-y-0 w-px bg-foreground/50"
              style={{ left: pct(530) }}
            />
            <span
              aria-hidden="true"
              className="absolute inset-y-0 w-px bg-foreground/50"
              style={{ left: pct(600) }}
            />
            <span
              className={
                "absolute inset-y-0 left-2 flex items-center font-semibold tabular-nums " +
                (row.target ? "text-foreground" : "text-primary-foreground")
              }
            >
              {row.score}・{row.band}
            </span>
          </div>
        </div>
      ))}
      <p className="text-xs text-muted-foreground">
        {t({
          ja: "縦線は J1（530点）と J1+（600点）の境目。満点は800点。",
          en: "Vertical lines mark J1 (530) and J1+ (600). The maximum is 800.",
        })}
      </p>
    </div>
  );
}

/** Monthly reviews, from the first review to now. */
export function ReviewsChart() {
  const { lang, t } = useLanguage();
  const [ref, width] = useWidth(720);
  const [active, setActive] = React.useState<number | null>(null);

  const height = 200;
  const pad = { top: 22, right: 4, bottom: 24, left: 4 };
  const plotHeight = height - pad.top - pad.bottom;
  const slot = (width - pad.left - pad.right) / ankiMonthly.length;
  const bar = Math.max(slot - (slot > 6 ? 2 : 1), 2);
  const peak = Math.max(...ankiMonthly.map(([, n]) => n));
  const peakIndex = ankiMonthly.findIndex(([, n]) => n === peak);

  const barX = (i: number) => pad.left + i * slot;
  const barH = (n: number) => Math.max((n / peak) * plotHeight, 1);
  const base = height - pad.bottom;

  return (
    <div ref={ref} className="relative">
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={t({
          ja: "月ごとの復習回数。2022年3月の25,385回が最多で、2025年以降は少なくなる。",
          en: "Reviews per month. The peak is 25,385 in March 2022, and the count falls from 2025.",
        })}
        className="block"
      >
        <line x1={pad.left} x2={width - pad.right} y1={base} y2={base} stroke="var(--border)" />
        {ankiMonthly.map(([month, n], i) => (
          <g key={month}>
            <rect
              x={barX(i)}
              y={base - barH(n)}
              width={bar}
              height={barH(n)}
              fill="var(--chart-1)"
              fillOpacity={active === null || active === i ? 1 : 0.45}
            />
            <rect
              x={barX(i)}
              y={pad.top}
              width={slot}
              height={plotHeight}
              fill="transparent"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(i)}
            />
          </g>
        ))}
        <text
          x={barX(peakIndex) + bar / 2}
          y={pad.top - 8}
          textAnchor="middle"
          fontSize={11.5}
          fontWeight={600}
          fill="var(--foreground)"
        >
          {peak.toLocaleString()}
        </text>
        {ankiMarks.map((mark, i) => {
          const index = ankiMonthly.findIndex(([m]) => m === mark.month);
          const x = barX(index) + bar / 2;
          return (
            <g key={mark.month}>
              <line x1={x} x2={x} y1={i === 0 ? 62 : 80} y2={base - barH(ankiMonthly[index][1])} stroke="var(--muted-foreground)" />
              <text x={x} y={i === 0 ? 58 : 76} textAnchor={i === 0 ? "end" : "start"} fontSize={11} fill="var(--muted-foreground)">
                {t(mark.label)}
              </text>
            </g>
          );
        })}
        {["2022", "2023", "2024", "2025", "2026"].map((year) => {
          const index = ankiMonthly.findIndex(([m]) => m === `${year}-01`);
          return (
            <text key={year} x={barX(index)} y={height - 7} fontSize={11} fill="var(--muted-foreground)">
              {year}
            </text>
          );
        })}
      </svg>
      {active !== null ? (
        <Tooltip x={barX(active)} y={base - barH(ankiMonthly[active][1])} width={width}>
          <p className="font-semibold">{ankiMonthly[active][0].replace("-", ".")}</p>
          <p className="text-muted-foreground">
            {ankiMonthly[active][1].toLocaleString()}
            {lang === "ja" ? " 回" : " reviews"}
          </p>
        </Tooltip>
      ) : null}
    </div>
  );
}
