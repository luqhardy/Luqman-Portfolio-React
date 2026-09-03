const UPSTREAM = "https://proxmox.luqmanhadi.com/api/stats";

export const dynamic = "force-dynamic";

export type NodeStatus = {
  online: boolean;
  cpuPercent?: number;
  memPercent?: number;
  diskPercent?: number;
  uptimeSeconds?: number;
  guestsRunning?: number;
  guestsTotal?: number;
};

/**
 * Proxies the Proxmox node's stats endpoint.
 *
 * Two reasons this is server-side rather than a fetch from the browser:
 * the upstream sends no Access-Control-Allow-Origin, so a direct call would
 * be blocked; and going through here lets us forward only the handful of
 * numbers the widget draws. The upstream also reports hostname, kernel
 * version, CPU model, root device, guest names and the Tailscale interface,
 * none of which needs re-publishing on the front page.
 *
 * The Cache-Control header matters: this points at a machine in someone's
 * home, so the CDN absorbs bursts instead of the node taking one request per
 * visitor.
 */
const CACHE = "public, s-maxage=10, stale-while-revalidate=30";

const pct = (used: unknown, total: unknown) =>
  typeof used === "number" && typeof total === "number" && total > 0
    ? Math.min(100, Math.max(0, (used / total) * 100))
    : undefined;

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(`upstream responded ${res.status}`);

    const data = await res.json();
    const pve = data?.pve ?? {};
    const guests: { status?: string }[] = Array.isArray(pve.guests)
      ? pve.guests
      : [];

    const body: NodeStatus = {
      online: true,
      // pve.cpu is already a 0..1 fraction, so no two-sample delta needed.
      cpuPercent:
        typeof pve.cpu === "number"
          ? Math.min(100, Math.max(0, pve.cpu * 100))
          : undefined,
      memPercent: pct(pve.mem?.used, pve.mem?.total),
      diskPercent: pct(pve.rootfs?.used, pve.rootfs?.total),
      uptimeSeconds: typeof pve.uptime === "number" ? pve.uptime : undefined,
      guestsRunning: guests.filter((g) => g.status === "running").length,
      guestsTotal: guests.length,
    };

    return Response.json(body, { headers: { "Cache-Control": CACHE } });
  } catch {
    // The node being down is a normal state for this widget, not an error the
    // page should surface as a failure.
    return Response.json({ online: false } satisfies NodeStatus, {
      headers: { "Cache-Control": "public, s-maxage=10" },
    });
  }
}
