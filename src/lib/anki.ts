const UPSTREAM = "https://anki.luqmanhadi.com/api/stats";

/** [date "YYYY-MM-DD", reviews] for each day with at least one review. */
export type AnkiDay = [string, number];

export type AnkiStats = {
  online: boolean;
  studying?: boolean;
  lastReviewAt?: number;
  firstDay?: string;
  streakCurrent?: number;
  streakLongest?: number;
  studiedToday?: boolean;
  todayReviews?: number;
  totalReviews?: number;
  totalSeconds?: number;
  retentionPercent?: number;
  matureCards?: number;
  heatmap?: AnkiDay[];
};

const num = (v: unknown) => (typeof v === "number" ? v : undefined);

/**
 * Reads the Anki stats endpoint and keeps only the aggregates.
 *
 * The upstream also publishes per-deck names and counts, which nothing on
 * this site needs to re-publish. Never throws: an unreachable upstream is
 * reported as { online: false }.
 */
export async function loadAnkiStats(): Promise<AnkiStats> {
  try {
    const res = await fetch(UPSTREAM, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`upstream responded ${res.status}`);

    const data = await res.json();
    const snap = data?.snapshot ?? {};
    const mature = snap.retention?.mature;

    const heatmap: AnkiDay[] = Array.isArray(snap.heatmap)
      ? snap.heatmap
          .filter(
            (d: unknown): d is [string, number] =>
              Array.isArray(d) &&
              typeof d[0] === "string" &&
              typeof d[1] === "number",
          )
          .map(([date, reviews]: [string, number]) => [date, reviews])
      : [];

    const body: AnkiStats = {
      online: true,
      studying: data?.presence?.studying === true,
      lastReviewAt: num(snap.last_review_at),
      firstDay: typeof snap.first_day === "string" ? snap.first_day : undefined,
      streakCurrent: num(snap.streak?.current),
      streakLongest: num(snap.streak?.longest),
      studiedToday: snap.streak?.studied_today === true,
      todayReviews: num(snap.today_stats?.reviews),
      totalReviews: num(snap.totals?.reviews),
      totalSeconds: num(snap.totals?.seconds),
      // Mature-card pass rate over the last 30 days: Anki's own "true
      // retention" figure, and the one that means something at this scale.
      retentionPercent:
        typeof mature?.pass === "number" && mature?.total > 0
          ? (mature.pass / mature.total) * 100
          : undefined,
      matureCards: num(snap.cards?.mature),
      heatmap,
    };

    return body;
  } catch {
    return { online: false };
  }
}
