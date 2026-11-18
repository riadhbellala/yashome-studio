"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { departments, type Department, type Creation } from "@/data/site";
import { Button } from "@/components/ui/button";
import { MaskLine } from "@/components/motion/reveal";

const EASE = [0.23, 1, 0.32, 1] as const;
const HEAD = { pink: "#FF004F", navy: "#151533", gold: "#C6B467" } as const;
const pad = (n: number) => String(n).padStart(2, "0");

/** The index: one small folder per department. Each one jumps to its own section below. */
export function Departments() {
  return (
    <>
      <section id="departements" aria-labelledby="dep-title" className="scroll-mt-20 bg-ground section-y">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 id="dep-title" className="font-display t-h2">
              <MaskLine>Nos départements</MaskLine>
            </h2>
            <p className="max-w-[380px] pb-2 text-[17px] leading-[1.6]">Sept départements, une seule équipe. Choisissez un dossier pour voir ce qu’on y fait.</p>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-16 lg:grid-cols-4">
            {departments.map((d, i) => (
              <motion.li
                key={d.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease: EASE, delay: (i % 4) * 0.07 }}
              >
                <FolderCard dep={d} index={i} />
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.21 }}
            >
              <a href="#contact" className="press group flex min-h-[220px] h-full flex-col justify-between rounded-[28px] bg-second p-7 text-white sm:aspect-square sm:min-h-0 sm:rounded-[36px]">
                <span aria-hidden className="grid size-12 place-items-center rounded-full bg-main transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-45">
                  <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3m0 0H4.5M11 3v6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span>
                  <span className="font-display block t-h4">Pas sûr du dossier ?</span>
                  <span className="mt-3 block text-[15px] leading-[1.5] text-white/70">Dites-nous ce que vous vendez, on vous oriente.</span>
                </span>
              </a>
            </motion.li>
          </ul>
        </div>
      </section>

      {/* The seven departments form one group: one section padding around it, a smaller step inside */}
      <div className="section-y flex flex-col bg-ground" style={{ gap: "calc(var(--sy) * 0.5)" }}>
        {departments.map((d, i) => (
          <DepartmentSection key={d.id} dep={d} index={i} />
        ))}
      </div>
    </>
  );
}

/** Cut like the folder ref: coloured head, a tab notched into it, the name large, one line below. */
function FolderCard({ dep, index }: { dep: Department; index: number }) {
  const head = index % 2 ? HEAD.navy : HEAD.pink;
  const onGold = false;
  return (
    <a href={`#dep-${dep.id}`} className="press group flex min-h-[240px] flex-col rounded-[28px] bg-white p-[10px] sm:aspect-square sm:min-h-0 sm:rounded-[36px]">
      <div className="relative h-[96px] shrink-0 overflow-hidden rounded-[24px] sm:h-[34%] sm:rounded-[28px]" style={{ background: head }}>
        <svg aria-hidden viewBox="0 0 2181 491" fill="none" className="absolute -right-[20%] -top-[30%] w-[120%] opacity-25 transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-[-6%]">
          <path d="M27.5234 88.011C27.5234 88.011 481.481 577.319 830.507 422.7C1179.53 268.081 1047.67 69.5976 899.747 93.8005C806.138 109.117 727.434 230.481 835.787 294.443C944.139 358.404 1539.82 644.49 1624.38 232.942C1708.95 -178.607 2157.1 187.886 2157.1 187.886" stroke={onGold ? "#151533" : "#fff"} strokeWidth="75" />
        </svg>
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[13px] font-semibold ${onGold ? "bg-second/10 text-second" : "bg-white/20 text-white"}`}>Département :</span>
        <div className="absolute bottom-0 right-0 flex h-[46%] items-center gap-2 rounded-tl-[24px] bg-white pl-5 pr-5">
          <span aria-hidden className="absolute -left-[24px] bottom-0 size-[24px]" style={{ background: "radial-gradient(circle at 0 0, transparent 24px, #fff 24.5px)" }} />
          <span aria-hidden className="absolute -top-[24px] right-0 size-[24px]" style={{ background: "radial-gradient(circle at 0 0, transparent 24px, #fff 24.5px)" }} />
          <span className="text-[14px] text-text-gray">dossier</span>
          <span className="font-display t-h4 leading-none text-second">{pad(index + 1)}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between px-5 pb-5 pt-6 md:px-6">
        <h3 className="font-display mb-6 t-h4 text-second">{dep.name}</h3>
        <p className="flex items-center justify-between gap-3 text-[15px] text-text-gray">
          {dep.tagline}
          <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-ground text-second transition-colors duration-300 group-hover:bg-main group-hover:text-white">↓</span>
        </p>
      </div>
    </a>
  );
}

function Visual({ c, cover }: { c: Creation; cover: string }) {
  const src = c.image ?? cover;
  const illu = src.startsWith("/images/illustrations");
  return (
    <div className={`relative h-full w-full ${illu ? "bg-[#fbe4ec]" : "bg-second"}`}>
      <Image src={src} alt="" fill sizes="(min-width:1504px) 1300px, 92vw" className={illu ? "object-contain p-[6%]" : "object-cover"} />
    </div>
  );
}

function Arrow({ dir, label, onClick }: { dir: 1 | -1; label: string; onClick: () => void }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} className="press grid size-12 place-items-center rounded-full bg-ground text-second hover:bg-second hover:text-white">
      <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden className={dir < 0 ? "rotate-180" : ""}>
        <path d="M1 7h11m0 0L7 2m5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

/** One department: intro, one large visual, then the current creation with its controls. */
function DepartmentSection({ dep, index }: { dep: Department; index: number }) {
  const [[slide, dir], setSlide] = useState<[number, number]>([0, 1]);
  const reduce = useReducedMotion();
  const total = dep.creations.length;
  const c = dep.creations[slide];
  const go = (d: 1 | -1) => setSlide(([s]) => [(s + d + total) % total, d]);
  const shift = reduce ? 0 : 6;

  return (
    <section id={`dep-${dep.id}`} aria-labelledby={`dep-${dep.id}-title`} className="scroll-mt-24 bg-ground">
      <div className="wrap">
        <motion.article
          initial={reduce ? false : { opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE }}
          className="rounded-[36px] bg-white p-5 sm:p-8 lg:p-14"
        >
          <header className="grid gap-5 px-1 lg:grid-cols-12 lg:items-end lg:px-0">
            <div className="lg:col-span-7">
              <p className="text-[15px] font-medium text-main">{dep.tagline}</p>
              <h2 id={`dep-${dep.id}-title`} className="font-display t-h3 mt-3">{dep.name}</h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-[16px] leading-[1.6] text-text-gray">{dep.definition}</p>
            </div>
          </header>

          <div className="relative mt-8 aspect-[4/3] overflow-hidden rounded-[28px] bg-second md:aspect-[16/8] lg:mt-10 lg:aspect-auto lg:h-[clamp(340px,calc(100vh-500px),760px)]">
            <AnimatePresence initial={false} custom={dir}>
              <motion.div
                key={slide}
                custom={dir}
                className="absolute inset-0"
                variants={{
                  enter: (d: number) => ({ opacity: 0, x: `${d * shift}%`, scale: reduce ? 1 : 1.03 }),
                  show: { opacity: 1, x: "0%", scale: 1 },
                  exit: (d: number) => ({ opacity: 0, x: `${-d * shift}%` }),
                }}
                initial="enter"
                animate="show"
                exit="exit"
                transition={{ duration: 0.65, ease: EASE }}
              >
                <Visual c={c} cover={dep.cover} />
              </motion.div>
            </AnimatePresence>
            <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[13px] font-medium text-second">Visuel d’exemple</span>
          </div>

          <footer className="mt-7 flex flex-col gap-6 px-1 lg:mt-10 lg:flex-row lg:items-center lg:justify-between lg:px-0">
            <div className="flex items-start gap-5">
              <span aria-hidden className="font-display t-h2 text-[#ffd3e0]">{pad(index + 1)}</span>
              <div aria-live="polite">
                <h3 className="font-display t-h5">{c.title}</h3>
                <p className="mt-1.5 text-[15px] text-text-gray">{c.kind}{total > 1 ? ` · ${slide + 1} sur ${total}` : ""}</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button href="#contact" className="max-sm:w-full">{dep.cta}</Button>
              {total > 1 && (
                <div className="flex gap-2 lg:ml-2">
                  <Arrow dir={-1} label={`Création précédente, ${dep.name}`} onClick={() => go(-1)} />
                  <Arrow dir={1} label={`Création suivante, ${dep.name}`} onClick={() => go(1)} />
                </div>
              )}
            </div>
          </footer>
        </motion.article>
      </div>
    </section>
  );
}
