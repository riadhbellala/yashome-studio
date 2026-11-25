"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { method } from "@/data/site";
import { MaskLine } from "@/components/motion/reveal";

const EASE = [0.23, 1, 0.32, 1] as const;

/** Loop that plays only while visible. */
function Loop({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);
  return <video ref={ref} src={src} poster={poster} muted loop playsInline preload="none" aria-hidden className="absolute inset-0 size-full object-cover" />;
}

/**
 * One property's week, told by its own pictures: the building on the first visit, the shoot,
 * the listing live on a phone, then the weekly report. Same project from start to finish.
 */
function Frame({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="absolute inset-0 bg-second">
        <Image src="/images/works/residence.webp" alt="La résidence au premier repérage" fill sizes="(min-width:768px) 40vw, 92vw" className="object-cover" />
        <p className="absolute bottom-5 left-5 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium text-second">Repérage · lumière de 17 h</p>
      </div>
    );
  if (i === 1)
    return (
      <div className="absolute inset-0 bg-second">
        <Loop src="/videos/riff-promotion.mp4" poster="/videos/riff-promotion.jpg" />
        <p className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-black/35 px-3 py-1.5 text-[12px] font-semibold text-white">
          <span className="size-1.5 animate-pulse rounded-full bg-main motion-reduce:animate-none" />
          Tournage en cours
        </p>
      </div>
    );
  if (i === 2)
    return (
      <div className="absolute inset-0 grid place-items-center bg-main">
        <Image src="/images/devices/phone-yashome.webp" alt="L’annonce en ligne sur Yashome, sur un téléphone" width={667} height={1333} sizes="(min-width:768px) 16vw, 40vw" className="h-[82%] w-auto drop-shadow-[0_24px_30px_rgba(21,21,51,0.35)]" />
      </div>
    );
  const bars = [38, 52, 47, 70, 64, 88, 96];
  return (
    <div className="absolute inset-0 grid place-items-center bg-second p-[8%]">
      <div className="w-full rounded-[var(--radius-inner)] bg-white p-6 text-second md:p-7">
        <p className="text-[14px] font-medium">Rapport de la semaine</p>
        <p className="text-[13px] text-text-gray">Exemple, Résidence Riff</p>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { k: "Vues", v: "4 812" },
            { k: "Appels", v: "37" },
            { k: "Visites", v: "12" },
          ].map((s) => (
            <div key={s.k} className="rounded-[12px] bg-ground p-3">
              <p className="font-display text-[clamp(20px,1.8vw,30px)] font-extrabold tabular-nums leading-none">{s.v}</p>
              <p className="mt-1.5 text-[12px] text-text-gray">{s.k}</p>
            </div>
          ))}
        </div>
        <div aria-hidden className="mt-6 flex h-24 items-end gap-2">
          {bars.map((h, k) => (
            <span key={k} className={`flex-1 rounded-[6px] ${k === bars.length - 1 ? "bg-main" : "bg-second/15"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        <p className="mt-2 flex justify-between text-[11px] text-text-gray">
          <span>Lun</span>
          <span>Dim</span>
        </p>
      </div>
    </div>
  );
}

/**
 * Desktop: the picture holds still on the left and changes with the day you are reading on the
 * right. Phones: each day carries its own picture.
 */
export function Method() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    steps.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="methode" aria-labelledby="method-title" className="scroll-mt-20 bg-ground section-y">
      <div className="wrap grid gap-y-12 md:grid-cols-12 md:gap-x-8">
        {/* Stage */}
        <div className="hidden md:col-span-5 md:block">
          <div className="sticky top-[14vh] max-w-[calc(72vh*0.8)]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-second">
              <AnimatePresence initial={false}>
                <motion.div
                  key={active}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: reduce ? 1 : 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: EASE }}
                >
                  <Frame i={active} />
                </motion.div>
              </AnimatePresence>
            </div>
            {/* Where we are in the week */}
            <div aria-hidden className="mt-5 flex gap-1.5">
              {method.map((m, i) => (
                <span key={m.verb} className="h-1 flex-1 overflow-hidden rounded-full bg-second/10">
                  <span className={`block h-full rounded-full bg-main transition-transform duration-500 ease-[var(--ease-out)] origin-left ${i <= active ? "scale-x-100" : "scale-x-0"}`} />
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="md:col-span-6 md:col-start-7">
          <h2 id="method-title" className="font-display t-h2">
            <MaskLine>De la visite</MaskLine>
            <MaskLine delay={0.06}>à la vente.</MaskLine>
          </h2>
          <p className="mt-6 max-w-[36ch] text-[17px] leading-[1.6] text-text-gray">
            Une semaine entre le premier repérage et votre bien en ligne. Voici celle de la Résidence Riff.
          </p>

          <ol className="mt-10 md:mt-0">
            {method.map((m, i) => (
              <li
                key={m.verb}
                ref={(el) => {
                  steps.current[i] = el;
                }}
                data-i={i}
                className={`py-10 transition-opacity duration-500 md:flex md:min-h-[62vh] md:flex-col md:justify-center md:py-0 ${i === active ? "md:opacity-100" : "md:opacity-25"}`}
              >
                <div className="relative mb-7 aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] md:hidden">
                  <Frame i={i} />
                </div>
                <h3 className="font-display t-h3">{m.verb}</h3>
                <p className="mt-4 max-w-[42ch] text-[17px] leading-[1.6]">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
