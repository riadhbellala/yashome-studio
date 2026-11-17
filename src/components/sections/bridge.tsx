"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { bridge, platformShots } from "@/data/site";
import { RIBBON_PATH, RIBBON_VIEWBOX } from "@/components/ui/ribbon";
import { MaskLine, Reveal, RevealItem } from "@/components/motion/reveal";

/**
 * One navy card on the cream page: what the studio films goes straight onto Yashome.
 * The ribbon runs through the card behind the devices and draws itself as it scrolls in.
 */
export function Bridge() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const draw = useTransform(scrollYProgress, [0.15, 0.55], [reduce ? 1 : 0, 1]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 24, reduce ? 0 : -24]);
  const laptopY = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 30, reduce ? 0 : -30]);

  return (
    <section ref={ref} aria-labelledby="bridge-title" className="bg-ground section-y">
      <div className="wrap">
        <div className="relative isolate overflow-hidden rounded-[40px] bg-second px-6 py-14 text-white md:px-14 md:py-20 lg:px-16">
          <svg aria-hidden viewBox={RIBBON_VIEWBOX} fill="none" className="pointer-events-none absolute -right-[30%] bottom-[-6%] -z-10 w-[130%] md:-right-[8%] md:bottom-[-10%] md:w-[80%]">
            <path d={RIBBON_PATH} stroke="#22224a" strokeWidth={75} strokeMiterlimit={10} />
            <motion.path d={RIBBON_PATH} stroke="#FF004F" strokeWidth={75} strokeMiterlimit={10} style={{ pathLength: draw }} />
          </svg>

          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <h2 id="bridge-title" className="font-display text-[clamp(34px,3.9vw,100px)] font-extrabold leading-[0.95] tracking-[-0.05em]">
                <MaskLine>{bridge.title[0]}</MaskLine>
                <MaskLine delay={0.08} className="text-main">{bridge.title[1]}</MaskLine>
              </h2>
              <p className="mt-6 max-w-[520px] text-[17px] leading-[1.6] text-white/80">{bridge.lead}</p>
              <Reveal as="div" className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-8">
                {bridge.points.map((p) => (
                  <RevealItem key={p.k}>
                    <h3 className="flex items-center gap-2 text-[16px] font-semibold">
                      <span aria-hidden className="size-2 rounded-full bg-main" />
                      {p.k}
                    </h3>
                    <p className="mt-2 text-[15px] leading-[1.55] text-white/70">{p.v}</p>
                  </RevealItem>
                ))}
              </Reveal>
            </div>

            <div className="relative lg:col-span-6">
              <motion.div style={{ y: laptopY }} className="relative">
                {/* screen box measured from the frame: (146,48)-(1214,723) of 1360x837 */}
                <div className="absolute overflow-hidden bg-white" style={{ left: "10.7%", top: "5.7%", width: "78.6%", height: "80.7%" }}>
                  <Image src={platformShots.desktop} alt="La plateforme Yashome" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover object-top" />
                </div>
                <Image src="/brand/mac-frame.webp" alt="" aria-hidden width={1360} height={837} sizes="(min-width:1024px) 40vw, 90vw" className="relative w-full" />
              </motion.div>
              <motion.div style={{ y: phoneY }} className="absolute bottom-[6%] -left-[4%] w-[34%] -rotate-6">
                <Image src="/brand/phone.webp" alt="L’application Yashome sur téléphone" width={562} height={531} sizes="16vw" className="w-full" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
