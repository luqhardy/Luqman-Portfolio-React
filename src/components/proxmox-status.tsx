"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { useLanguage } from "@/components/language-provider";
import { ui } from "@/lib/content";
import type { NodeStatus } from "@/app/api/proxmox/route";

const POLL_MS = 15_000;

function formatUptime(seconds: number, lang: "ja" | "en") {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (lang === "ja") {
    if (d > 0) return `${d}日 ${h}時間`;
    if (h > 0) return `${h}時間 ${m}分`;
    return `${m}分`;
  }
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

/** One reading: tiny caps label, the value, and a hairline fill bar. */
function Metric({
  label,
  value,
  percent,
}: {
  label: string;
  value: string;
  percent?: number;
}) {
  return (
    <div className="cell min-h-0 flex-col items-start gap-1 py-2.5">
      <span className="font-mono text-[0.6rem] tracking-[0.16em] text-muted-foreground uppercase">
        {label}
      </span>
      <span className="font-mono text-sm tabular-nums">{value}</span>
      {typeof percent === "number" ? (
        <span
          aria-hidden="true"
          className="mt-0.5 block h-px w-full bg-border"
        >
          <span
            className="block h-px bg-primary transition-[width] duration-700"
            style={{ width: `${Math.max(2, percent)}%` }}
          />
        </span>
      ) : null}
    </div>
  );
}

export function ProxmoxStatus() {
  const { t, lang } = useLanguage();
  const [status, setStatus] = React.useState<NodeStatus | null>(null);

  React.useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/api/proxmox");
        const data: NodeStatus = await res.json();
        if (!cancelled) setStatus(data);
      } catch {
        if (!cancelled) setStatus({ online: false });
      }
    };

    load();
    const id = setInterval(load, POLL_MS);
    // Stop hitting the node while the tab is in the background.
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

  const loading = status === null;
  const online = status?.online === true;
  const dash = "—";
  const num = (v: number | undefined, suffix = "%") =>
    typeof v === "number" ? `${v.toFixed(1)}${suffix}` : dash;

  return (
    <section
      aria-label={t(ui.nodeStatus)}
      className="px-4 pb-2 sm:px-6"
      // Height is stable across loading/online/offline, so nothing below
      // shifts once the first reading lands.
    >
      <div className="mb-2 flex items-baseline gap-3 border-b pb-2">
        <h2 className="eyebrow flex items-center gap-2 text-foreground">
          <span
            aria-hidden="true"
            className={
              "inline-block size-1.5 shrink-0 " +
              (loading
                ? "animate-pulse bg-muted-foreground"
                : online
                  ? "animate-pulse bg-primary"
                  : "bg-muted-foreground")
            }
          />
          {t(ui.nodeStatus)}
        </h2>
        <span aria-hidden="true" className="h-px flex-1" />
        <a
          href="https://proxmox.luqmanhadi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-1 font-mono text-[0.65rem] text-muted-foreground hover:text-foreground"
        >
          {loading
            ? t(ui.nodeLoading)
            : online
              ? t(ui.nodeOnline)
              : t(ui.nodeOffline)}
          <ArrowUpRight className="size-3 opacity-0 transition-opacity group-hover:opacity-100" />
          <span className="sr-only">({t(ui.newTab)})</span>
        </a>
      </div>

      <div className="cell-grid grid-cols-2 sm:grid-cols-4">
        <Metric
          label="CPU"
          value={online ? num(status?.cpuPercent) : dash}
          percent={online ? status?.cpuPercent : undefined}
        />
        <Metric
          label={t(ui.nodeMemory)}
          value={online ? num(status?.memPercent) : dash}
          percent={online ? status?.memPercent : undefined}
        />
        <Metric
          label={t(ui.nodeDisk)}
          value={online ? num(status?.diskPercent) : dash}
          percent={online ? status?.diskPercent : undefined}
        />
        <Metric
          label={t(ui.nodeUptime)}
          value={
            online && typeof status?.uptimeSeconds === "number"
              ? formatUptime(status.uptimeSeconds, lang)
              : dash
          }
        />
      </div>

      <p className="mt-3 max-w-prose text-xs leading-relaxed text-muted-foreground">
        {t(ui.nodeBlurb)}
      </p>
    </section>
  );
}
