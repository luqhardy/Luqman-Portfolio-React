import { loadAnkiStats } from "@/lib/anki";

export const dynamic = "force-dynamic";

/**
 * The Anki panel as a standalone SVG, for places that can show an image but
 * can't run the page's JavaScript: the GitHub profile README, mainly.
 *
 * GitHub serves README images through its camo proxy, which honours
 * Cache-Control, so max-age here decides how stale the README can get.
 *
 * ?theme=light swaps to the light tokens; dark is the default.
 */
const THEMES = {
  dark: {
    bg: "#0c0c0b",
    fg: "#e9e6e0",
    muted: "#918d85",
    border: "#2a2826",
    accent: "#e8724f",
  },
  light: {
    bg: "#faf9f7",
    fg: "#1c1b19",
    muted: "#6b6862",
    border: "#e0ddd5",
    accent: "#b23a1f",
  },
};

const WEEKS = 53;
const CELL = 11;
const GAP = 3;
const PAD = 24;
const WIDTH = PAD * 2 + WEEKS * (CELL + GAP) - GAP;
const LEVELS = [1, 30, 80, 160];
const OPACITY = [0.25, 0.5, 0.75, 1];

const level = (reviews: number) =>
  LEVELS.reduce((acc, min, i) => (reviews >= min ? i : acc), -1);

/** Today as a YYYY-MM-DD in Japan, where the reviews happen. */
function todayInJapan() {
  return new Date(Date.now() + 9 * 3600_000).toISOString().slice(0, 10);
}

function addDays(iso: string, n: number) {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

const fmt = (v: number | undefined) =>
  typeof v === "number" ? v.toLocaleString("en-US") : "—";

export async function GET(request: Request) {
  const theme =
    new URL(request.url).searchParams.get("theme") === "light"
      ? THEMES.light
      : THEMES.dark;
  const s = await loadAnkiStats();
  const days = new Map(s.heatmap ?? []);

  const font =
    "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace";

  // Metric tiles.
  const tileW = (WIDTH - PAD * 2) / 4;
  const metrics: [string, string, string?][] = [
    [
      "STREAK",
      typeof s.streakCurrent === "number" ? `${s.streakCurrent} d` : "—",
      typeof s.streakLongest === "number" ? `best ${s.streakLongest} d` : "",
    ],
    ["TODAY", fmt(s.todayReviews), s.online ? "reviews" : ""],
    [
      "RETENTION",
      typeof s.retentionPercent === "number"
        ? `${s.retentionPercent.toFixed(1)}%`
        : "—",
      "30d mature",
    ],
    [
      "TOTAL REVIEWS",
      fmt(s.totalReviews),
      typeof s.totalSeconds === "number"
        ? `${Math.round(s.totalSeconds / 3600).toLocaleString("en-US")} h`
        : "",
    ],
  ];
  const tilesY = 52;
  const tilesH = 58;
  const tiles = metrics
    .map(([label, value, note], i) => {
      const x = PAD + i * tileW;
      return `
    <rect x="${x}" y="${tilesY}" width="${tileW}" height="${tilesH}" fill="none" stroke="${theme.border}"/>
    <text x="${x + 12}" y="${tilesY + 20}" font-size="9" letter-spacing="1.5" fill="${theme.muted}">${label}</text>
    <text x="${x + 12}" y="${tilesY + 42}" font-size="16" fill="${theme.fg}">${value}<tspan dx="8" font-size="10" fill="${theme.muted}">${note ?? ""}</tspan></text>`;
    })
    .join("");

  // Heatmap: 53 weeks ending today, Sunday on top.
  const today = todayInJapan();
  const dow = new Date(`${today}T00:00:00Z`).getUTCDay();
  const start = addDays(today, -dow - (WEEKS - 1) * 7);
  const mapY = tilesY + tilesH + 20;
  let rects = "";
  for (let w = 0; w < WEEKS; w++) {
    for (let d = 0; d < 7; d++) {
      const date = addDays(start, w * 7 + d);
      if (date > today) break;
      const lv = level(days.get(date) ?? 0);
      rects += `<rect x="${PAD + w * (CELL + GAP)}" y="${mapY + d * (CELL + GAP)}" width="${CELL}" height="${CELL}" fill="${lv < 0 ? theme.border : theme.accent}"${lv < 0 ? "" : ` fill-opacity="${OPACITY[lv]}"`}/>`;
    }
  }
  const mapH = 7 * (CELL + GAP) - GAP;
  const footY = mapY + mapH + 22;
  const height = footY + 18;

  // Legend, laid out from the right edge: "less ■■■■■ more".
  const moreW = 30;
  const swatchesX = WIDTH - PAD - moreW - 5 * 14;
  const legend = [theme.border, ...OPACITY.map(() => theme.accent)]
    .map(
      (c, i) =>
        `<rect x="${swatchesX + i * 14}" y="${footY - 9}" width="10" height="10" fill="${c}"${i === 0 ? "" : ` fill-opacity="${OPACITY[i - 1]}"`}/>`,
    )
    .join("");

  const status = !s.online
    ? "unreachable"
    : s.studying
      ? "studying now"
      : s.studiedToday
        ? "studied today"
        : "not yet today";

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${height}" viewBox="0 0 ${WIDTH} ${height}" font-family="${font}" role="img" aria-label="Anki review stats for Luqman Hadi">
  <title>Anki — ${fmt(s.totalReviews)} reviews since ${s.firstDay ?? "2021"}</title>
  <rect width="100%" height="100%" fill="${theme.bg}"/>
  <rect x="${PAD}" y="22" width="6" height="6" fill="${s.online && s.studiedToday ? theme.accent : theme.muted}"/>
  <text x="${PAD + 14}" y="29" font-size="11" font-weight="600" letter-spacing="2" fill="${theme.fg}">ANKI — DAILY REVIEWS</text>
  <text x="${WIDTH - PAD}" y="29" font-size="10" text-anchor="end" fill="${theme.muted}">${status} · anki.luqmanhadi.com</text>
  <line x1="${PAD}" y1="40" x2="${WIDTH - PAD}" y2="40" stroke="${theme.border}"/>
  ${tiles}
  ${rects}
  <text x="${PAD}" y="${footY}" font-size="10" fill="${theme.muted}">${start.slice(0, 7).replace("-", ".")} — ${today.slice(0, 7).replace("-", ".")} · since ${(s.firstDay ?? "").slice(0, 7).replace("-", ".")}</text>
  <text x="${swatchesX - 6}" y="${footY}" font-size="10" text-anchor="end" fill="${theme.muted}">less</text>
  ${legend}
  <text x="${WIDTH - PAD}" y="${footY}" font-size="10" text-anchor="end" fill="${theme.muted}">more</text>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": s.online
        ? "public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600"
        : "public, max-age=300, s-maxage=300",
    },
  });
}
