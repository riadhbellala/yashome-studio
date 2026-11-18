"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { hero } from "@/data/site";
import { Button } from "@/components/ui/button";
import { RIBBON_PATH, RIBBON_VIEWBOX } from "@/components/ui/ribbon";

const EASE = [0.23, 1, 0.32, 1] as const;
const WORD = "YASHOME".split("");

/**
 * The residence stands in front of the studio's name, the brand ribbon draws itself behind it,
 * and a drone hovers above, the way the studio films a property. Scrolling turns dusk into night.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const wordY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -140]);
  const houseY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const houseScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const night = useTransform(scrollYProgress, [0.05, 0.55], [0, 1]);
  const ribbonY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const droneScrollY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -320]);
  const droneScrollX = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 180]);

  // Drone leans toward the pointer, on a spring so it feels airborne.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 14 });
  const sy = useSpring(my, { stiffness: 60, damping: 14 });
  const tilt = useTransform(sx, [-1, 1], [-8, 8]);

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  }
  const droneX = useTransform(sx, (v) => v * 36);
  const droneY = useTransform(sy, (v) => v * 22);

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      aria-labelledby="hero-title"
      className="relative isolate flex flex-col overflow-hidden bg-ground pt-[104px] lg:block lg:min-h-[760px] lg:pt-0 lg:h-[100svh]"
    >
      {/* Brand ribbon, drawn once on arrival */}
      <motion.svg
        aria-hidden
        viewBox={RIBBON_VIEWBOX}
        fill="none"
        style={{ y: ribbonY }}
        className="pointer-events-none absolute left-[-45%] top-[56%] -z-10 w-[190%] lg:left-[-6%] lg:top-[40%] lg:w-[112%]"
      >
        <motion.path
          d={RIBBON_PATH}
          stroke="#FF004F"
          strokeWidth={75}
          strokeMiterlimit={10}
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.2, ease: [0.77, 0, 0.175, 1], delay: 0.5 }}
        />
      </motion.svg>

      <div className="wrap order-2 mt-12 lg:absolute lg:inset-x-0 lg:top-[29vh] lg:mt-0">
        <motion.h1 id="hero-title" style={{ y: wordY }} className="relative">
          <span className="sr-only">Yashome Studio, le studio digital immobilier</span>
          <span aria-hidden className="hero-word font-display flex justify-between font-extrabold leading-[0.78] tracking-[-0.05em] text-second">
            {WORD.map((c, i) => (
              <span key={i} className="-mx-[0.06em] -my-[0.1em] inline-block overflow-hidden px-[0.06em] py-[0.1em]">
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease: EASE, delay: 0.1 + i * 0.05 }}
                >
                  {c}
                </motion.span>
              </span>
            ))}
          </span>
          <motion.span
            aria-hidden
            initial={reduce ? false : { opacity: 0, scale: 0.9, rotate: -14 }}
            animate={{ opacity: 1, scale: 1, rotate: -7 }}
            transition={{ type: "spring", duration: 0.7, bounce: 0.3, delay: 0.9 }}
            className="absolute -top-[0.5em] right-[2%] rounded-full bg-main px-[0.7em] py-[0.2em] text-[clamp(16px,2.3vw,34px)] font-semibold text-white lg:-top-[0.9em]"
          >
            studio
          </motion.span>
        </motion.h1>
      </div>

      {/* Copy: under the name on phones; on desktop the line and services sit above it, the actions in the lower corner */}
      <div className="wrap relative z-20 order-1 lg:absolute lg:mt-0 lg:inset-x-0 lg:top-[13vh] lg:flex lg:items-start lg:justify-between">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.6 }}
          className="max-w-[440px] text-[15px] leading-[1.55] text-second sm:text-[16px] lg:text-[17px]"
        >
          {hero.line}
        </motion.p>
        <motion.ul
          aria-label="Ce que nous faisons"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.8 } } }}
          className="hidden max-w-[380px] flex-wrap justify-end gap-2 lg:flex"
        >
          {hero.tags.map((t) => (
            <motion.li
              key={t}
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } } }}
              className="flex items-center gap-2 rounded-full bg-white py-2 pl-3 pr-4 text-[14px] font-medium text-second"
            >
              <span aria-hidden className="size-2 rounded-full bg-main" />
              {t}
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.8 }}
        className="wrap relative z-20 order-4 -mt-[13vw] flex flex-row flex-nowrap items-center gap-2 pb-8 sm:mt-4 lg:absolute lg:inset-x-0 lg:bottom-[7vh] lg:mt-0 lg:pb-0"
      >
        <Button href={hero.primary.href} className="max-sm:h-11 max-sm:text-[13px] max-sm:[--d:34px] max-sm:[--px:14px]">{hero.primary.label}</Button>
        <Button href={hero.secondary.href} theme="light" className="max-sm:h-11 max-sm:text-[13px] max-sm:[--d:34px] max-sm:[--px:14px]">
          <span className="sm:hidden">Réalisations</span>
          <span className="max-sm:hidden">{hero.secondary.label}</span>
        </Button>
      </motion.div>

      {/* The residence: dusk, then night as you scroll */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 80, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.4, ease: EASE, delay: 0.25 }}
        className="relative z-10 order-3 mx-auto hero-house -mt-[1vw] lg:pt-0 max-w-none self-center lg:absolute lg:bottom-[-5vh] lg:left-1/2 lg:mt-0 lg:-translate-x-1/2"
      >
        <motion.div style={{ y: houseY, scale: houseScale }} className="relative origin-bottom">
          <Image src="/images/hero/shadow.webp" alt="" width={1299} height={162} aria-hidden className="absolute -bottom-[4%] left-[2%] w-[96%] opacity-70" />
          <Image src="/images/hero/residence.webp" alt="Résidence contemporaine en pierre et béton blanc, fenêtres éclairées au crépuscule" width={975} height={594} priority sizes="(min-width:1024px) 64vw, 118vw" className="relative w-full" />
          <motion.div style={{ opacity: night }} className="absolute inset-0">
            <Image src="/images/hero/residence-night.webp" alt="" aria-hidden width={975} height={594} sizes="(min-width:1024px) 64vw, 118vw" className="w-full" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Drone */}
      <motion.div
        style={{ x: droneScrollX, y: droneScrollY }}
        className="pointer-events-none absolute right-[1%] top-[56%] z-20 w-[24vw] sm:top-[40%] max-w-[300px] lg:right-[7%] lg:top-[52%] lg:w-[18vw]"
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, x: 120, y: -80 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 1.8, ease: EASE, delay: 0.9 }}
        >
          <motion.div style={{ x: droneX, y: droneY, rotate: tilt }}>
            <Image src="/images/hero/drone.webp" alt="Drone de tournage du studio" width={1022} height={431} sizes="20vw" className="bob w-full drop-shadow-none" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
