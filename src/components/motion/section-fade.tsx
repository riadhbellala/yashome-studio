"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Every section after the first fades and rises once as it enters the screen.
 * Set by script only, so without JavaScript nothing stays hidden.
 */
export function SectionFade() {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [...document.querySelectorAll<HTMLElement>("main section, main article, footer")].filter(
      (el) => el.id !== "top" && !el.parentElement?.closest("section, article") && el.getBoundingClientRect().top > innerHeight * 0.9,
    );
    els.forEach((el) => el.setAttribute("data-fade", ""));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            e.target.setAttribute("data-fade", "in");
            io.unobserve(e.target);
          }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);
  return null;
}
