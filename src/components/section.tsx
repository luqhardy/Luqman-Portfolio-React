import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * Delphi's section rhythm: a hairline rule, a tiny uppercase label, and an
 * optional count sitting flush right in the same row.
 */
export function SectionHeading({
  id,
  title,
  count,
  as: Tag = "h2",
  className,
}: {
  id?: string;
  title: string;
  count?: number;
  as?: "h2" | "h3";
  className?: string;
}) {
  const isSub = Tag === "h3";

  return (
    <div
      id={id}
      className={cn(
        "flex scroll-mt-20 items-baseline gap-3 border-b pb-2",
        isSub ? "mb-0" : "mb-4",
        className,
      )}
    >
      <Tag
        className={cn(
          "eyebrow text-foreground",
          isSub && "text-[0.7rem] tracking-[0.16em] text-muted-foreground",
        )}
      >
        {title}
      </Tag>
      <span aria-hidden="true" className="h-px flex-1" />
      {typeof count === "number" ? (
        <span className="font-mono text-[0.7rem] tabular-nums text-muted-foreground">
          {count}
        </span>
      ) : null}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-16 px-4 py-10 sm:px-6", className)}>
      {children}
    </section>
  );
}
