"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { works, type Work } from "@/data/site";
import { MaskLine } from "@/components/motion/reveal";
import { SharedMedia } from "@/components/ui/shared-media";

/** Desktop: the section holds and the films travel sideways with the scroll. Phones: a swipe row. */
export function Works() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useLayoutEffect(() => {
    const measure = () => {
      const t = track.current;
      if (!t) return;
      setDist(window.innerWidth >= 1024 && !reduce ? Math.max(0, t.scrollWidth - t.clientWidth) : 0);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reduce]);

  return (
    <section id="realisations" ref={wrap} aria-labelledby="works-title" className="relative bg-ground" style={{ height: dist ? `calc(100vh + ${dist}px)` : undefined }}>
      <div className="section-y top-0 overflow-hidden lg:sticky lg:flex lg:h-[100vh] lg:flex-col lg:justify-center lg:!py-0">
        <div className="wrap flex items-end justify-between gap-8">
          <h2 id="works-title" className="font-display t-h2">
            <MaskLine>Nos réalisations</MaskLine>
          </h2>
          <div className="flex flex-col items-end gap-4 pb-2">
            <p className="hidden max-w-[36ch] text-right text-[17px] leading-[1.6] text-text-gray md:block">
              Films de visite, lancements et reels, tournés pour des agences et des promoteurs.
            </p>
            <Link href="/realisations" className="press group inline-flex shrink-0 items-center gap-2 text-[15px] font-medium">
              Tous les projets
              <span aria-hidden className="grid size-8 place-items-center rounded-full bg-second text-white transition-transform duration-300 ease-[var(--ease-out)] fine:group-hover:-rotate-45">→</span>
            </Link>
          </div>
        </div>

        <div className="wrap head-gap">
          <motion.div
            ref={track}
            style={{ x: dist ? x : 0 }}
            className="fine:[&:has(article:hover)>article:not(:hover)]:opacity-40 fine:[&:has(article:hover)>article:not(:hover)]:blur-[3px] -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:gap-5 lg:mx-0 lg:snap-none lg:gap-6 lg:overflow-visible lg:px-0"
          >
            {works.map((w, i) => (
              <WorkCard key={w.id} work={w} index={i} />
            ))}
          </motion.div>

          {dist > 0 && (
            <div aria-hidden className="mt-10 h-px bg-second/10">
              <motion.div className="h-px origin-left bg-main" style={{ scaleX: bar }} />
            </div>
          )}
        </div>
      </div>

    </section>
  );
}

/** Silent loop that only plays while the card is on screen. */
function WorkCard({ work, index }: { work: Work; index: number }) {
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = video.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <article className={`group shrink-0 snap-start transition-[opacity,filter] duration-300 ease-out ${work.vertical ? "w-[64vw] sm:w-[36vw] lg:w-[calc(62vh*0.8)]" : "w-[84vw] sm:w-[60vw] lg:w-[calc(62vh*1.4)]"}`}>
      <Link href={`/projets/${work.id}`} aria-label={`Voir le projet ${work.title}`} className="press relative block">
        <SharedMedia slug={work.id}>
          <span className="relative block w-full overflow-hidden rounded-[var(--radius-card)] bg-second">
            <span className={`block ${work.vertical ? "aspect-[4/5]" : "aspect-[7/5]"} lg:aspect-auto lg:h-[62vh]`} />
            <video
              ref={video}
              src={work.preview}
              poster={work.poster}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden
              className="absolute inset-0 size-full object-cover transition-transform duration-[900ms] ease-[var(--ease-out)] fine:group-hover:scale-[1.03]"
            />
          </span>
        </SharedMedia>
        <span className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3.5 text-[13px] font-medium text-second">
          <span className="grid size-6 place-items-center rounded-full bg-main text-white">
            <svg width="9" height="10" viewBox="0 0 9 10" fill="currentColor" aria-hidden><path d="M0 0.8v8.4a.6.6 0 0 0 .9.5l7.3-4.2a.6.6 0 0 0 0-1L.9.3A.6.6 0 0 0 0 .8Z" /></svg>
          </span>
          Voir le projet
        </span>
      </Link>
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="t-h5">{work.title}</h3>
        <span className="text-[13px] tabular-nums text-text-gray">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <p className="mt-1 text-[15px] text-text-gray">
        {work.kind} · {work.client}
      </p>
    </article>
  );
}
