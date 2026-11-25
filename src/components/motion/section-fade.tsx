"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Every section below the first screen fades and rises once as it enters.
 * Uses the Web Animations API, so the HTML React rendered is never touched (no hydration mismatch),
 * and nothing is hidden without JavaScript.
 */
export function SectionFade() {
  const path = usePathname();
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = [...document.querySelectorAll<HTMLElement>("main section, main article, footer")].filter(
      (el) => el.id !== "top" && !el.parentElement?.closest("section, article") && el.getBoundingClientRect().top > innerHeight * 0.9,
    );
    const anims = new Map<Element, Animation>();
    for (const el of els) {
      const a = el.animate([{ opacity: 0, transform: "translate3d(0,40px,0)" }, { opacity: 1, transform: "none" }], {
        duration: 1100,
        easing: "cubic-bezier(0.23, 1, 0.32, 1)",
        fill: "both",
      });
      a.pause();
      a.onfinish = () => a.cancel();
      anims.set(el, a);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries)
          if (e.isIntersecting) {
            anims.get(e.target)?.play();
            io.unobserve(e.target);
          }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      anims.forEach((a) => a.cancel());
    };
  }, [path]);
  return null;
}
