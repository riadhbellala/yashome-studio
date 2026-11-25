"use client";

import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

/* Phone address bars resize the viewport while scrolling: don't recalculate the page for that. */
ScrollTrigger.config({ ignoreMobileResize: true });

/** Lenis eases the wheel on desktop; touch keeps native scrolling. GSAP's ticker keeps both in step. */
export function SmoothScroll() {
  const lenis = useRef<Lenis | null>(null);
  const path = usePathname();

  // A new page starts at the top: Lenis must forget the old position.
  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true, force: true });
    lenis.current?.resize();
  }, [path]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce), (pointer: coarse)").matches) return;
    const l = new Lenis({ lerp: 0.1, anchors: { offset: -72 } });
    lenis.current = l;
    l.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => l.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      l.destroy();
      lenis.current = null;
    };
  }, []);
  return null;
}
