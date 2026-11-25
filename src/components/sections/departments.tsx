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
            <p className="max-w-[36ch] pb-2 text-[17px] leading-[1.6] text-text-gray">Six départements, une seule équipe. Choisissez un dossier pour voir ce qu’on y fait.</p>
          </div>

          <ul className="head-gap grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-10 xl:gap-y-12">
            {departments.map((d, i) => (
              <motion.li
                key={d.id}
                className="h-full"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE, delay: (i % 3) * 0.08 }}
              >
                <FolderCard dep={d} index={i} href={`${base}#dep-${d.id}`} />
              </motion.li>
            ))}
            <motion.li
              className="md:col-span-2 xl:col-span-3"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/* Not sure: one wide line under the folders */}
              <a href="#contact" className="press group flex flex-col gap-6 rounded-[var(--radius-card)] bg-second p-7 text-white sm:flex-row sm:items-center sm:justify-between md:px-10 md:py-9">
                <span>
                  <span className="font-display block t-h4">Pas sûr du dossier ?</span>
                  <span className="mt-2 block text-[15px] text-white/75">Dites-nous ce que vous vendez, on vous oriente.</span>
                </span>
                <span className="flex items-center gap-4 text-[15px] font-medium">
                  Nous écrire
                  <Arrow />
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

const PHOTO: Record<string, string> = {
  shooting: "/folders/shooting.webp",
  video: "/folders/audio-visuale.webp",
  social: "/folders/social.webp",
  branding: "/folders/branding.webp",
  marketing: "/folders/marketing.webp",
  dev: "/folders/web.webp",
};

function Arrow({ light }: { light?: boolean }) {
  return (
    <span aria-hidden className={`grid size-10 shrink-0 place-items-center rounded-full transition-[background-color,color,transform] duration-300 ease-[var(--ease-out)] fine:group-hover:rotate-45 ${light ? "bg-white text-main" : "bg-main text-white"}`}>
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 11L11 3m0 0H4.5M11 3v6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

/**
 * A folder like a paper file: a navy tab with a slanted edge on top, a white card below.
 * Number, name and a short line on the left; the service photo on the right, its top corner
 * folded, the pink arrow sitting on its foot in a white ring.
 */
function FolderCard({ dep, index, href }: { dep: Department; index: number; href: string }) {
  const n = pad(index + 1);
  return (
    <a href={href} className="press group flex h-full flex-col pt-10">
      <span className="relative block flex-1">
        {/* Tab */}
        <span
          className="absolute -top-10 left-0 flex h-11 w-[46%] items-start bg-second pl-5 pt-3 text-[12px] font-semibold text-white"
          style={{ clipPath: "polygon(0 0, 82% 0, 100% 100%, 0 100%)", borderTopLeftRadius: 14 }}
        >
          Dossier {n}
        </span>
        {/* Card */}
        <span className="relative grid h-full grid-cols-[minmax(0,1fr)_38%] gap-4 sm:gap-5 rounded-[var(--radius-card)] rounded-tl-none bg-white p-5 shadow-[0_1px_2px_rgba(21,21,51,0.04),0_12px_32px_-18px_rgba(21,21,51,0.18)] md:p-6">
          <span className="flex flex-col justify-center py-2">
            <span className="font-display text-[18px] font-extrabold tabular-nums text-main">{n}.</span>
            <h3 className="font-display mt-3 text-[clamp(22px,1.7vw,30px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-second">{dep.name}</h3>
            <span className="mt-4 block text-[14px] leading-[1.6] text-text-gray">{dep.blurb}</span>
          </span>
          <span className="relative aspect-[3/4]">
            <span className="absolute inset-0 overflow-hidden rounded-[var(--radius-inner)] bg-second" style={{ clipPath: "polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 0 100%)" }}>
              <Image
                src={PHOTO[dep.id] ?? dep.cover}
                alt=""
                fill
                sizes="(min-width:1024px) 14vw, (min-width:640px) 20vw, 38vw"
                className="object-cover transition-transform duration-[1100ms] ease-[var(--ease-out)] fine:group-hover:scale-[1.06]"
              />
            </span>
            <span className="absolute -bottom-2 -right-2 rounded-full bg-white p-1">
              <Arrow />
            </span>
          </span>
        </span>
      </span>
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

  const grid = "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

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

              <ul className={`mt-10 grid gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10 ${grid}`}>
                {list.map((c, i) => {
                  const big = false;
                  return (
                    <li key={c.title + i}>
                      <Tile c={c} big={big} sizes="(min-width:1024px) 22vw, (min-width:768px) 30vw, 46vw" />
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
