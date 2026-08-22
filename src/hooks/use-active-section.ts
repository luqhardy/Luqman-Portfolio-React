"use client";

import * as React from "react";

/**
 * Highlights whichever section heading is closest to the top of the viewport.
 * Plain scroll math rather than IntersectionObserver, because sections here
 * vary wildly in height and observers pick the tallest, not the nearest.
 */
export function useActiveSection(ids: string[], offset = 96) {
  const [active, setActive] = React.useState(ids[0] ?? "");

  React.useEffect(() => {
    const onScroll = () => {
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      // Pin the last section once the page is scrolled to the very bottom,
      // otherwise a short final section can never become active.
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 2;
      setActive(atBottom ? (ids[ids.length - 1] ?? current) : current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offset]);

  return active;
}
