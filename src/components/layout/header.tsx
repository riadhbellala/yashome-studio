"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { nav } from "@/data/site";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";

/** Links live in a folder tab hanging from the top of the screen; a simple line marks the current section. Plain bar. Hides while scrolling down, comes back on the way up; takes the page ground once scrolled. */
export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  const [active, setActive] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id === "top" ? null : `#${e.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ["top", ...nav.links.map((l) => l.href.slice(1))]) {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    }
    return () => io.disconnect();
  }, []);

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
      <div className="wrap relative flex h-[76px] items-center justify-between">
        <a href="#top" aria-label="Yashome Studio, accueil" className="press">
          <Logo />
        </a>
        <nav
          aria-label="Principale"
          onPointerLeave={() => setHovered(null)}
          className="absolute left-1/2 top-0 hidden h-[62px] -translate-x-1/2 items-center gap-1 rounded-b-[24px] bg-white px-4 lg:flex"
        >
          <span aria-hidden className="absolute -left-[24px] top-0 size-[24px]" style={{ background: "radial-gradient(circle at 0 100%, transparent 24px, #fff 24.5px)" }} />
          <span aria-hidden className="absolute -right-[24px] top-0 size-[24px]" style={{ background: "radial-gradient(circle at 100% 100%, transparent 24px, #fff 24.5px)" }} />
          {nav.links.map((l) => {
            const marked = (hovered ?? active) === l.href;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={active === l.href ? "location" : undefined}
                onPointerEnter={() => setHovered(l.href)}
                className={`relative px-4 py-2 text-[15px] font-medium transition-colors duration-200 ${marked ? "text-second" : "text-text-gray"}`}
              >
                {l.label}
                {marked && (
                  <motion.span
                    layoutId="nav-line"
                    aria-hidden
                    transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
                    className="absolute inset-x-4 bottom-0.5 h-[2px] rounded-full bg-main"
                  />
                )}
              </a>
            );
          })}
        </nav>
        <div className="hidden lg:block">
          <Button href={nav.cta.href} theme="navy" className="h-12 text-[14px] [--d:38px] [--px:18px]">
            {nav.cta.label}
          </Button>
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="menu-mobile"
          className="press grid size-11 place-items-center rounded-full bg-second text-white lg:hidden"
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
            className="flex flex-col gap-1 bg-ground px-5 pb-8 lg:hidden"
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
