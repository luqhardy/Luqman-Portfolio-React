"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/language-provider";
import type { ElsewhereLink, Project } from "@/lib/content";
import { ui } from "@/lib/content";

const COLUMN_CLASS: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
};

/**
 * Container for the seamless bordered grid: it draws the top and left edges,
 * each cell draws its own bottom and right, so shared edges never double up.
 *
 * Fixed column counts rather than auto-fill, because with a couple of dozen
 * items an auto-sized track count leaves ragged half-rows — and a ragged row
 * visibly tears the bordered frame open. Any leftover slot in the final row is
 * filled with an empty cell so the frame always closes.
 */
export function CellGrid({
  children,
  className,
  columns = 2,
}: {
  children: React.ReactNode;
  className?: string;
  columns?: 2 | 3;
}) {
  const count = React.Children.count(children);
  const fillers = (columns - (count % columns)) % columns;

  return (
    <div className={cn("cell-grid grid-cols-1", COLUMN_CLASS[columns], className)}>
      {children}
      {Array.from({ length: fillers }, (_, i) => (
        <span key={`filler-${i}`} aria-hidden="true" className="cell hidden sm:block" />
      ))}
    </div>
  );
}

export function ProjectCell({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const { t } = useLanguage();
  const Icon = project.icon;

  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "cell group relative",
        featured
          ? "min-h-[86px] items-start bg-primary/[0.06] hover:bg-primary/[0.12]"
          : "hover:bg-accent/70",
      )}
    >
      <Icon
        aria-hidden="true"
        className={cn(
          "shrink-0 transition-transform group-hover:scale-110",
          featured
            ? "mt-0.5 size-5 text-primary"
            : "size-5 text-muted-foreground",
        )}
      />
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="truncate text-sm font-medium">
            {t(project.title)}
          </span>
          {project.tag ? (
            <span className="shrink-0 border border-border px-1.5 py-px font-mono text-[0.6rem] tracking-[0.1em] text-muted-foreground uppercase">
              {t(project.tag)}
            </span>
          ) : null}
        </span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
          {t(project.description)}
        </span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 shrink-0 self-start text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
      />
      <span className="sr-only">({t(ui.newTab)})</span>
    </a>
  );
}

export function ElsewhereCell({ link }: { link: ElsewhereLink }) {
  const { t } = useLanguage();
  const Icon = link.icon;
  const isMail = link.href.startsWith("mailto:");

  return (
    <a
      href={link.href}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
      className="cell group hover:bg-accent/70"
    >
      <Icon
        aria-hidden="true"
        className="size-5 shrink-0 text-muted-foreground transition-transform group-hover:scale-110"
      />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium">{link.label}</span>
        <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
          {t(link.description)}
        </span>
      </span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
      />
      {isMail ? null : <span className="sr-only">({t(ui.newTab)})</span>}
    </a>
  );
}
