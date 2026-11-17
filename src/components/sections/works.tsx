"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { works, type Work } from "@/data/site";
import { MaskLine } from "@/components/motion/reveal";

/** Desktop: the section holds and the projects travel sideways with the scroll. Phones: a swipe row. */
export function Works() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
      <div className="section-y top-0 overflow-hidden lg:sticky lg:!py-0 lg:flex lg:h-[100vh] lg:flex-col lg:justify-center lg:py-0">
        <div className="wrap flex items-end justify-between gap-8">
          <h2 id="works-title" className="font-display text-[clamp(36px,6vw,154px)] font-extrabold leading-[0.9] tracking-[-0.05em]">
            <MaskLine>Nos réalisations</MaskLine>
          </h2>
          <p className="hidden max-w-[360px] pb-2 text-[17px] leading-[1.6] md:block">
            Résidences, villas et projets sur plan, filmés et lancés pour des agences et des promoteurs.
          </p>
        </div>

        <div className="wrap mt-10 md:mt-14">
          <motion.div
            ref={track}
            style={{ x: dist ? x : 0 }}
            className="-mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] lg:mx-0 lg:snap-none lg:gap-6 lg:overflow-visible lg:px-0"
          >
            {works.map((w) => (
              <WorkCard key={w.id} work={w} />
            ))}
            <a href="#contact" className="press group flex w-[78vw] shrink-0 snap-start flex-col justify-between rounded-[32px] bg-main p-8 text-white sm:w-[44vw] lg:h-[54vh] lg:w-[24vw]">
              <span aria-hidden className="grid size-14 place-items-center rounded-full bg-white text-main transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-45">
                <svg width="20" height="20" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3m0 0H4.5M11 3v6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
              <span className="font-display mt-16 text-[clamp(28px,2.4vw,61px)] font-extrabold leading-[0.98] tracking-[-0.045em]">Le prochain, c’est le vôtre.</span>
            </a>
          </motion.div>

          <div aria-hidden className="mt-10 hidden h-[3px] overflow-hidden rounded-full bg-sand lg:block">
            <motion.div className="h-full rounded-full bg-main" style={{ width: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkCard({ work }: { work: Work }) {
  const illu = work.image?.startsWith("/illu");
  return (
    <article className="group w-[78vw] shrink-0 snap-start sm:w-[54vw] lg:w-[38vw]">
      <div className={`relative overflow-hidden rounded-[32px] ${illu ? "bg-[#fbe4ec]" : "bg-second"} aspect-[4/3] lg:aspect-auto lg:h-[54vh]`}>
        {work.image && (
          <Image
            src={work.image}
            alt={`${work.title}, ${work.place}`}
            fill
            sizes="(min-width:1024px) 38vw, 78vw"
            className={`transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04] ${illu ? "object-contain p-[8%]" : "object-cover"}`}
          />
        )}
        <span className="absolute left-5 top-5 rounded-full bg-white/90 px-3 py-1.5 text-[12px] font-medium text-second">Visuel d’exemple</span>
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div>
          <h3 className="font-display text-[clamp(22px,1.8vw,30px)] font-extrabold leading-tight tracking-[-0.035em]">{work.title}</h3>
          <p className="mt-1 text-[15px] text-text-gray">
            {work.client} · {work.place}
          </p>
        </div>
        <ul className="flex shrink-0 gap-1.5 sm:pt-1">
          {work.services.map((s) => (
            <li key={s} className="rounded-full bg-white px-3 py-1 text-[13px] font-medium">
              {s}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
