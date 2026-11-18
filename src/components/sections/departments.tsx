"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { departments, type Department, type Creation } from "@/data/site";
import { Button } from "@/components/ui/button";
import { Placeholder } from "@/components/ui/placeholder";
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
            <h2 id="dep-title" className="font-display text-[clamp(36px,6vw,154px)] font-extrabold leading-[0.9] tracking-[-0.05em]">
              <MaskLine>Nos départements</MaskLine>
            </h2>
            <p className="max-w-[380px] pb-2 text-[17px] leading-[1.6]">Sept départements, une seule équipe. Choisissez un dossier pour voir ce qu’on y fait.</p>
          </div>

          <ul className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 md:mt-24 lg:grid-cols-4 lg:gap-7">
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
              <a href="#contact" className="press group flex min-h-[220px] h-full flex-col justify-between rounded-[32px] bg-second p-7 text-white sm:aspect-square sm:min-h-0 sm:rounded-[36px]">
                <span aria-hidden className="grid size-12 place-items-center rounded-full bg-main transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-45">
                  <svg width="18" height="18" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3m0 0H4.5M11 3v6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span>
                  <span className="font-display block text-[28px] font-extrabold leading-[1] tracking-[-0.04em]">Pas sûr du dossier ?</span>
                  <span className="mt-3 block text-[15px] leading-[1.5] text-white/70">Dites-nous ce que vous vendez, on vous oriente.</span>
                </span>
              </a>
            </motion.li>
          </ul>
        </div>
      </section>

      {/* The seven departments form one group: one section padding around it, a smaller step inside */}
      <div className="section-y flex flex-col bg-ground" style={{ gap: "calc(var(--sy) * 0.7)" }}>
        {departments.map((d, i) => (
          <DepartmentSection key={d.id} dep={d} index={i} />
        ))}
      </div>
    </>
  );
}

/** Cut like the folder ref: coloured head, a tab notched into it, the name large, one line below. */
function FolderCard({ dep, index }: { dep: Department; index: number }) {
  const head = HEAD[dep.head];
  const onGold = dep.head === "gold";
  return (
    <a href={`#dep-${dep.id}`} className="press group flex min-h-[240px] flex-col rounded-[32px] bg-white p-[10px] sm:aspect-square sm:min-h-0 sm:rounded-[36px]">
      <div className="relative h-[96px] shrink-0 overflow-hidden rounded-[24px] sm:h-[34%] sm:rounded-[28px]" style={{ background: head }}>
        <svg aria-hidden viewBox="0 0 2181 491" fill="none" className="absolute -right-[20%] -top-[30%] w-[120%] opacity-25 transition-transform duration-700 ease-[var(--ease-out)] group-hover:translate-x-[-6%]">
          <path d="M27.5234 88.011C27.5234 88.011 481.481 577.319 830.507 422.7C1179.53 268.081 1047.67 69.5976 899.747 93.8005C806.138 109.117 727.434 230.481 835.787 294.443C944.139 358.404 1539.82 644.49 1624.38 232.942C1708.95 -178.607 2157.1 187.886 2157.1 187.886" stroke={onGold ? "#151533" : "#fff"} strokeWidth="75" />
        </svg>
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[13px] font-semibold ${onGold ? "bg-second/10 text-second" : "bg-white/20 text-white"}`}>Département :</span>
        <div className="absolute bottom-0 right-0 flex h-[46%] items-center gap-2 rounded-tl-[24px] bg-white pl-5 pr-5">
          <span aria-hidden className="absolute -left-[24px] bottom-0 size-[24px]" style={{ background: "radial-gradient(circle at 0 0, transparent 24px, #fff 24.5px)" }} />
          <span aria-hidden className="absolute -top-[24px] right-0 size-[24px]" style={{ background: "radial-gradient(circle at 0 0, transparent 24px, #fff 24.5px)" }} />
          <span className="text-[14px] text-text-gray">dossier</span>
          <span className="font-display text-[26px] font-extrabold leading-none tracking-[-0.04em] text-[#7c8aa5]">{pad(index + 1)}</span>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-between px-5 pb-5 pt-6 md:px-6">
        <h3 className="font-display mb-6 text-[clamp(26px,2.2vw,48px)] font-extrabold leading-[0.98] tracking-[-0.045em] text-second">{dep.name}</h3>
        <p className="flex items-center justify-between gap-3 text-[15px] text-[#9aa3b5]">
          {dep.tagline}
          <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-ground text-second transition-colors duration-300 group-hover:bg-main group-hover:text-white">↓</span>
        </p>
      </div>
    </a>
  );
}

function Thumb({ c }: { c: Creation }) {
  if (!c.image) return <Placeholder tone={c.tone} label="" className="h-full w-full" />;
  const illu = c.image.startsWith("/images/illustrations");
  return (
    <div className={`relative h-full w-full ${illu ? "bg-[#fbe4ec]" : "bg-white"}`}>
      <Image src={c.image} alt="" fill sizes="(min-width:1024px) 30vw, 90vw" className={illu ? "object-contain p-[8%]" : "object-cover"} />
    </div>
  );
}

/** One department: a sticky sheet with what it does, beside its creations. Sides alternate. */
function DepartmentSection({ dep, index }: { dep: Department; index: number }) {
  const flip = index % 2 === 1;
  return (
    <section id={`dep-${dep.id}`} aria-labelledby={`dep-${dep.id}-title`} className="scroll-mt-24 bg-ground">
      <div className="wrap grid gap-6 lg:grid-cols-12 lg:gap-8">
        <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: EASE }}
            className="rounded-[32px] bg-white p-7 md:p-10 lg:sticky lg:top-24"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-16 place-items-center rounded-[20px]" style={{ background: dep.head === "navy" ? "#ebe5da" : `${HEAD[dep.head]}1f` }}>
                <Image src={dep.icon} alt="" aria-hidden width={64} height={64} className="h-11 w-auto" />
              </span>
              <span className="text-[14px] font-medium text-text-gray">
                {pad(index + 1)} / {pad(departments.length)}
              </span>
            </div>
            <h2 id={`dep-${dep.id}-title`} className="font-display mt-8 text-[clamp(34px,3.4vw,87px)] font-extrabold leading-[0.95] tracking-[-0.045em]">
              {dep.name}
            </h2>
            <p className="mt-2 text-[17px] text-text-gray">{dep.tagline}</p>
            <p className="mt-6 text-[17px] leading-[1.6]">{dep.definition}</p>
            <ul className="mt-7 grid gap-3">
              {dep.items.map((it) => (
                <li key={it} className="flex items-center gap-3 text-[16px]">
                  <span aria-hidden className="grid size-6 shrink-0 place-items-center rounded-full bg-main text-white">
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2.5 7.5l3 3 6-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  {it}
                </li>
              ))}
            </ul>
            <Button href="#contact" theme="navy" className="mt-9 flex w-full">
              {dep.cta}
            </Button>
          </motion.div>
        </div>

        <ul className={`grid content-start gap-4 sm:grid-cols-2 lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
          {dep.creations.map((c, i) => {
            const wide = i === 0 && dep.creations.length % 2 === 1;
            return (
              <motion.li
                key={c.title + i}
                initial={{ opacity: 0, y: 36, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: EASE, delay: (i % 2) * 0.08 }}
                className={`group ${wide ? "sm:col-span-2" : ""}`}
              >
                <div className={`relative overflow-hidden rounded-[28px] ${wide ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
                  <div className="h-full w-full transition-transform duration-[1.1s] ease-[var(--ease-out)] group-hover:scale-[1.04]">
                    <Thumb c={c} />
                  </div>
                  <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[12px] font-medium text-second">Visuel à venir</span>
                </div>
                <div className="mt-3 flex items-baseline justify-between gap-4 px-1">
                  <p className="font-display text-[19px] font-extrabold tracking-[-0.03em]">{c.title}</p>
                  <p className="shrink-0 text-[14px] text-text-gray">{c.kind}</p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
