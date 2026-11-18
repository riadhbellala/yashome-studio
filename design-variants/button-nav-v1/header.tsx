"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { nav } from "@/data/site";
import { Logo } from "@/components/ui/logo";

/** Plain bar. Hides while scrolling down, comes back on the way up; takes the page ground once scrolled. */
export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240 && !open);
    setSolid(y > 24);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${solid || open ? "bg-ground" : "bg-transparent"}`}
    >
      <div className="wrap flex h-[76px] items-center justify-between">
        <a href="#top" aria-label="Yashome Studio, accueil" className="press">
          <Logo />
        </a>
        <nav aria-label="Principale" className="hidden items-center gap-9 md:flex">
          {nav.links.map((l) => (
            <a key={l.href} href={l.href} className="group relative text-[15px] text-text-gray transition-colors hover:text-second">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 rounded-full bg-main transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-x-100" />
            </a>
          ))}
        </nav>
        <a href={nav.cta.href} className="press hidden h-11 items-center rounded-full bg-second px-5 text-[15px] font-medium text-white hover:bg-main md:inline-flex">
          {nav.cta.label}
        </a>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="press grid size-11 place-items-center rounded-full bg-second text-white md:hidden"
        >
          <span className="sr-only">{open ? "Fermer le menu" : "Ouvrir le menu"}</span>
          <span className="relative block h-3 w-4">
            <span className={`absolute left-0 top-0 h-[2px] w-4 rounded bg-current transition-transform duration-300 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`absolute bottom-0 left-0 h-[2px] w-4 rounded bg-current transition-transform duration-300 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="menu-mobile"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="flex flex-col gap-1 bg-ground px-5 pb-8 md:hidden"
          >
            {nav.links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-display py-2 text-[34px] font-extrabold tracking-[-0.04em]">
                {l.label}
              </a>
            ))}
            <a href={nav.cta.href} onClick={() => setOpen(false)} className="press mt-4 inline-flex h-12 items-center justify-center rounded-full bg-main text-white">
              {nav.cta.label}
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
