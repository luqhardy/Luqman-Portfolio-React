import { loadAnkiStats } from "@/lib/anki";

export const dynamic = "force-dynamic";

/**
 * Proxies the Anki stats endpoint, the same way /api/proxmox does.
 *
 * The upstream does allow cross-origin reads, so this isn't about CORS. The
 * CDN cache keeps visitors from each triggering an upstream request, and
 * loadAnkiStats() forwards only aggregates, not the per-deck breakdown.
 */
export async function GET() {
  const stats = await loadAnkiStats();
  return Response.json(stats, {
    headers: {
      "Cache-Control": stats.online
        ? "public, s-maxage=30, stale-while-revalidate=120"
        : "public, s-maxage=30",
    },
  });
}
