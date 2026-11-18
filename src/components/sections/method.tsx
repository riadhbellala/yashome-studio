"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { method } from "@/data/site";
import { LINE_PIN } from "@/components/ui/ribbon";
import { MaskLine, Reveal, RevealItem } from "@/components/motion/reveal";

/** The brand ribbon draws itself as you read the four steps: from the visit to the sale. */
export function Method() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const draw = useTransform(scrollYProgress, [0, 1], [reduce ? 1 : 0, 1]);

  return (
    <section id="methode" ref={ref} aria-labelledby="method-title" className="relative scroll-mt-20 overflow-hidden bg-ground section-y">
      <svg aria-hidden viewBox={LINE_PIN.viewBox} fill="none" className="pointer-events-none absolute left-0 top-[9%] w-full -scale-x-100">
        {LINE_PIN.paths.map((d) => (
          <g key={d}>
            <path d={d} stroke="#EBE5DA" strokeWidth={LINE_PIN.stroke} />
            <motion.path d={d} stroke="#FF004F" strokeWidth={LINE_PIN.stroke} style={{ pathLength: draw }} />
          </g>
        ))}
      </svg>
      <div className="relative wrap">
        <h2 id="method-title" className="font-display max-w-[900px] text-[clamp(36px,6vw,154px)] font-extrabold leading-[0.9] tracking-[-0.05em]">
          <MaskLine>De la visite</MaskLine>
          <MaskLine delay={0.08}>à la vente.</MaskLine>
        </h2>
        <Reveal as="div" className="mt-20 grid gap-6 sm:grid-cols-2 md:mt-[clamp(120px,12vw,307px)] lg:grid-cols-4">
          {method.map((m) => (
            <RevealItem key={m.verb} className="rounded-[28px] bg-white p-7 md:p-8">
              <h3 className="font-display text-[clamp(28px,2.4vw,38px)] font-extrabold tracking-[-0.04em]">{m.verb}</h3>
              <p className="mt-4 text-[16px] leading-[1.6] text-text-gray">{m.text}</p>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
