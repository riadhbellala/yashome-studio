"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { partners } from "@/data/site";
import { LINE_WAVE } from "@/components/ui/ribbon";
import { MaskLine } from "@/components/motion/reveal";

/**
 * Partners, large: two rows of white logo tiles drifting in opposite directions over a pale
 * ribbon, fading out at both ends. Scrolling nudges each row a little further its own way.
 */
export function Partners() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 80, reduce ? 0 : -80]);
  const b = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : -80, reduce ? 0 : 80]);

  return (
    <section ref={ref} aria-labelledby="partners-title" className="relative overflow-hidden bg-ground section-y">
      <div className="wrap flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 id="partners-title" className="font-display t-h2">
          <MaskLine>Ils nous font</MaskLine>
          <MaskLine delay={0.08}>
            confiance<span className="text-main">.</span>
          </MaskLine>
        </h2>
        <p className="max-w-[360px] pb-2 text-[17px] leading-[1.6]">Promoteurs, agences et marques qui ont confié leurs projets au studio.</p>
      </div>

      <div className="relative mt-12 md:mt-16">
        <svg aria-hidden viewBox={LINE_WAVE.viewBox} fill="none" className="pointer-events-none absolute left-1/2 top-1/2 w-[140%] max-w-[2400px] -translate-x-1/2 -translate-y-1/2">
          <path d={LINE_WAVE.path} stroke="#ebe5da" strokeWidth={LINE_WAVE.stroke} />
        </svg>
        <div className="fade-x relative grid gap-5">
          {[a, b].map((shift, r) => (
            <motion.div key={r} style={{ x: shift }}>
              <ul className="marquee flex w-max gap-5" style={{ animationDirection: r ? "reverse" : "normal", animationDuration: "52s" }}>
                {/* Two identical halves for the loop; phones need one logo set per half, which keeps the moving layer light */}
                {[0, 1, 2, 3].map((copy) => partners.map((p, i) => (
                  <li
                    key={`${copy}-${i}`}
                    className={`group grid h-[130px] w-[230px] shrink-0 place-items-center rounded-[28px] bg-white transition-transform duration-500 ease-[var(--ease-out)] hover:-translate-y-1 md:h-[170px] md:w-[300px] ${copy % 2 ? "max-md:hidden" : ""}`}
                  >
                    <Image
                      src={p.src}
                      alt={copy === 0 ? p.name : ""}
                      width={220}
                      height={110}
                      className="max-h-[70px] w-auto max-w-[160px] object-contain transition-transform duration-500 ease-[var(--ease-out)] group-hover:scale-105 md:max-h-[92px] md:max-w-[190px]"
                    />
                  </li>
                )))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
