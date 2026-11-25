"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { creationSlug, departments, type Creation, type Department } from "@/data/site";
import { Button } from "@/components/ui/button";
import { MaskLine } from "@/components/motion/reveal";
import { SharedMedia } from "@/components/ui/shared-media";

const EASE = [0.23, 1, 0.32, 1] as const;
const HEAD = { pink: "#FF004F", navy: "#151533", gold: "#C6B467" } as const;
const pad = (n: number) => String(n).padStart(2, "0");

/** The index: one small folder per department. `base` is where the folders lead: "" on the projects page, "/realisations" from home. */
export function Departments({ base = "", withProjects = true }: { base?: string; withProjects?: boolean }) {
  return (
    <>
      <section id="departements" aria-labelledby="dep-title" className="scroll-mt-20 bg-ground section-y">
        <div className="wrap">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 id="dep-title" className="font-display t-h2">
              <MaskLine>Nos départements</MaskLine>
            </h2>
            <p className="max-w-[36ch] pb-2 text-[17px] leading-[1.6] text-text-gray">Sept départements, une seule équipe. Choisissez un dossier pour voir ce qu’on y fait.</p>
          </div>

          <ul className="head-gap grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {departments.map((d, i) => (
              <motion.li
                key={d.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 4) * 0.06 }}
              >
                <FolderCard dep={d} index={i} href={`${base}#dep-${d.id}`} />
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
            >
              <a href="#contact" className="press group flex min-h-[220px] h-full flex-col justify-between rounded-[var(--radius-card)] bg-second p-7 text-white sm:aspect-square sm:min-h-0 sm:rounded-[var(--radius-card)]">
                <span aria-hidden className="grid size-12 place-items-center rounded-full bg-main transition-transform duration-500 ease-[var(--ease-out)] fine:group-hover:rotate-45">
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

      {withProjects && <DepartmentIndex />}
    </>
  );
}

/**
 * Cut like the folder ref: coloured head with the brand ribbon, the department's own drawing tucked
 * in like a sheet that rises when you point at it, a tab notched into the head, the name large below.
 */
function FolderCard({ dep, index, href }: { dep: Department; index: number; href: string }) {
  const head = index % 2 ? HEAD.navy : HEAD.pink;
  const count = dep.creations.length;
  return (
    <a href={href} className="press group flex min-h-[260px] flex-col rounded-[var(--radius-card)] bg-white p-[10px] sm:aspect-square sm:min-h-0">
      <div className="relative h-[110px] shrink-0 overflow-hidden rounded-[var(--radius-card)] sm:h-[40%]" style={{ background: head }}>
        <svg aria-hidden viewBox="0 0 2181 491" fill="none" className="absolute -right-[20%] -top-[30%] w-[120%] opacity-20 transition-transform duration-700 ease-[var(--ease-out)] fine:group-hover:-translate-x-[6%]">
          <path d="M27.5234 88.011C27.5234 88.011 481.481 577.319 830.507 422.7C1179.53 268.081 1047.67 69.5976 899.747 93.8005C806.138 109.117 727.434 230.481 835.787 294.443C944.139 358.404 1539.82 644.49 1624.38 232.942C1708.95 -178.607 2157.1 187.886 2157.1 187.886" stroke="#fff" strokeWidth="75" />
        </svg>
        <span className="absolute left-4 top-4 rounded-full bg-white/20 px-3 py-1.5 text-[13px] font-medium text-white">
          {count} projet{count > 1 ? "s" : ""}
        </span>
        {/* The drawing on a white sheet, half tucked in the folder */}
        <span className="absolute bottom-[-14%] left-5 grid aspect-square h-[82%] translate-y-[4%] place-items-center rounded-[var(--radius-inner)] bg-white transition-transform duration-500 ease-[var(--ease-out)] fine:group-hover:-translate-y-[8%] fine:group-hover:-rotate-3">
          <Image src={dep.icon} alt="" width={120} height={120} className="h-[72%] w-auto" />
        </span>
        <div className="absolute bottom-0 right-0 flex h-[42%] items-center gap-2 rounded-tl-[24px] bg-white pl-5 pr-5">
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
          <span aria-hidden className="grid size-9 shrink-0 place-items-center rounded-full bg-ground text-second transition-[background-color,color,transform] duration-300 ease-[var(--ease-out)] fine:group-hover:-rotate-45 fine:group-hover:bg-main fine:group-hover:text-white">→</span>
        </p>
      </div>
    </a>
  );
}

const TONE = { pink: "bg-main text-white", navy: "bg-second text-white", gold: "bg-third text-second", sand: "bg-sand text-second" } as const;

/** One project tile. Films loop silently while on screen; projects without a visual yet show their name. */
function Tile({ c, big, sizes }: { c: Creation; big: boolean; sizes: string }) {
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const clip = c.image?.startsWith("/videos/") ? c.image.replace(/\.jpg$/, ".mp4") : null;

  useEffect(() => {
    const el = video.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <Link href={`/projets/${creationSlug(c)}`} className="press group flex h-full flex-col">
      <SharedMedia slug={creationSlug(c)}>
      <div className={`relative flex-1 overflow-hidden rounded-[var(--radius-card)] ${c.image ? "bg-second" : TONE[c.tone]} ${big ? "aspect-[4/3] lg:aspect-auto" : "aspect-[4/3]"}`}>
        {clip ? (
          <video ref={video} src={clip} poster={c.image} muted loop playsInline preload="none" aria-hidden className="absolute inset-0 size-full object-cover" />
        ) : c.image ? (
          <Image
            src={c.image}
            alt={`${c.title}, ${c.kind}`}
            fill
            sizes={sizes}
            className={`transition-transform duration-[900ms] ease-[var(--ease-out)] fine:group-hover:scale-[1.03] ${c.image.startsWith("/images/illustrations") ? "bg-[#fbe4ec] object-contain p-[6%]" : "object-cover"}`}
          />
        ) : (
          <span className="absolute left-6 top-6 text-[13px] font-medium opacity-70">Visuel à venir</span>
        )}
      </div>
      </SharedMedia>
      <span className="mt-3 flex justify-between gap-4 text-[14px]">
        <span className="font-medium underline-offset-4 fine:group-hover:underline">{c.title}</span>
        <span className="text-text-gray">{c.kind}</span>
      </span>
    </Link>
  );
}

/**
 * Every project, sorted by department. One row of tabs, a pink pill that slides to the chosen one,
 * then all of that department's projects in a calm grid: the first one large, the rest beside it.
 * The folder cards above link here by hash and open the right tab.
 */
function DepartmentIndex() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const dep = departments[active];
  const list = dep.creations;
  const tabs = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sync = () => {
      const i = departments.findIndex((d) => `#dep-${d.id}` === location.hash);
      if (i >= 0) setActive(i);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // Keep the chosen tab in view on phones, where the row scrolls sideways.
  useEffect(() => {
    const row = tabs.current;
    const el = row?.querySelector<HTMLElement>(`[data-i="${active}"]`);
    if (!row || !el) return;
    // Scroll the row only, never the page.
    row.scrollTo({ left: el.offsetLeft - (row.clientWidth - el.offsetWidth) / 2, behavior: reduce ? "auto" : "smooth" });
  }, [active, reduce]);

  const grid =
    list.length === 1 ? "grid-cols-1" : list.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[auto_auto]";

  return (
    <section aria-labelledby="dep-index-title" className="bg-ground section-y !pt-0">
      {departments.map((d) => <span key={d.id} id={`dep-${d.id}`} className="block scroll-mt-28" aria-hidden />)}
      <div className="wrap">
        <h2 id="dep-index-title" className="sr-only">Projets par département</h2>

        <div ref={tabs} role="tablist" aria-label="Départements" className="-mx-5 flex gap-1 overflow-x-auto px-5 [scrollbar-width:none] lg:mx-0 lg:flex-wrap lg:px-0">
          {departments.map((d, i) => {
            const on = i === active;
            return (
              <button
                key={d.id}
                data-i={i}
                role="tab"
                aria-selected={on}
                aria-controls="dep-panel"
                onClick={() => setActive(i)}
                className={`relative h-11 shrink-0 rounded-full px-5 text-[15px] font-medium transition-colors duration-200 ${on ? "text-white" : "text-second fine:hover:bg-second/5"}`}
              >
                {on && <motion.span layoutId="dep-pill" className="absolute inset-0 rounded-full bg-main" transition={{ duration: reduce ? 0 : 0.4, ease: EASE }} />}
                <span className="relative">{d.name}</span>
              </button>
            );
          })}
        </div>

        <div id="dep-panel" role="tabpanel" aria-live="polite" className="mt-10 border-t border-second/15 pt-10 md:mt-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={dep.id}
              initial={{ opacity: 0, y: reduce ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <header className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-x-8">
                <div className="lg:col-span-7">
                  <p className="flex items-baseline gap-3 text-[14px] font-medium">
                    <span className="tabular-nums text-main">{pad(active + 1)}</span>
                    <span className="text-text-gray">{dep.tagline}</span>
                  </p>
                  <h3 className="font-display t-h3 mt-4">{dep.name}</h3>
                  <p className="mt-4 max-w-[52ch] text-[17px] leading-[1.6] text-text-gray">{dep.definition}</p>
                </div>
                <div className="flex flex-col gap-5 lg:col-span-5 lg:items-end">
                  <p className="text-[14px] text-text-gray lg:text-right">{dep.items.join(" · ")}</p>
                  <Button href="#contact" className="max-sm:w-full">{dep.cta}</Button>
                </div>
              </header>

              <ul className={`mt-10 grid gap-5 ${grid}`}>
                {list.map((c, i) => {
                  const big = list.length >= 3 && i === 0;
                  return (
                    <li key={c.title + i} className={big ? "lg:col-span-2 lg:row-span-2" : ""}>
                      <Tile c={c} big={big} sizes={big ? "(min-width:1024px) 62vw, 92vw" : "(min-width:1024px) 30vw, (min-width:640px) 46vw, 92vw"} />
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
