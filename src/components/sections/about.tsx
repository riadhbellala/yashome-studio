"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { about } from "@/data/site";
import { Notch, ArrowDot } from "@/components/ui/notch";
import { MaskLine } from "@/components/motion/reveal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Small props that stand on top of each navy card. */
const PROPS = [
  { src: "/images/illustrations/props/tree.webp", w: 166, h: 193, cls: "right-10 w-[78px] md:w-[92px]" },
  { src: "/images/illustrations/props/camera.webp", w: 140, h: 184, cls: "right-10 w-[62px] md:w-[74px]" },
  { src: "/images/illustrations/props/sign.webp", w: 195, h: 167, cls: "right-10 w-[92px] md:w-[108px]" },
];

/**
 * Straight on the page ground. The tower lies on its side, base against the right edge of the
 * screen, and slides in from beyond it. A drone drifts over the title; a tree, a camera and a
 * "À vendre" sign pop up on top of the three cards.
 */
export function About() {
  const root = useRef<HTMLElement>(null);
  const tower = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          tower.current,
          { x: () => (tower.current?.offsetWidth ?? 600) * 1.05 },
          { x: 0, ease: "power3.out", scrollTrigger: { trigger: root.current, start: "top 90%", end: "top 20%", scrub: 1.2, invalidateOnRefresh: true } },
        );
        gsap.fromTo(
          ".about-drone",
          { x: -120, y: 40, rotate: -12, autoAlpha: 0 },
          { x: 0, y: 0, rotate: 0, autoAlpha: 1, ease: "power2.out", scrollTrigger: { trigger: root.current, start: "top 70%", end: "top 10%", scrub: 1.5 } },
        );
        gsap.to(".about-drone-bob", { y: -12, rotate: 3, duration: 2.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
        gsap.from(".about-card", {
          y: 16,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.07,
          scrollTrigger: { trigger: ".about-cards", start: "top 85%" },
        });
        gsap.from(".about-prop", {
          yPercent: 30,
          scale: 0.92,
          autoAlpha: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.07,
          delay: 0.25,
          transformOrigin: "50% 100%",
          scrollTrigger: { trigger: ".about-cards", start: "top 85%" },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="studio" ref={root} aria-labelledby="about-title" className="relative overflow-x-clip bg-ground section-y">
      {/* Row: text on the left, the tower lying on its side at the right edge of the screen, level with it */}
      <div className="relative">
        <div
          ref={tower}
          aria-hidden
          className="pointer-events-none relative mb-10 ml-auto w-[88vw] md:absolute md:right-0 md:top-[8%] md:mb-0 md:w-[46vw] md:max-w-[980px]"
        >
          <div className="about-drone absolute -left-[4%] -top-[30%] w-[22%] max-w-[150px]">
            <div className="about-drone-bob">
              <Image src="/images/illustrations/props/drone.webp" alt="" width={234} height={102} className="w-full" />
            </div>
          </div>
          <div className="relative aspect-[1228/470] w-full">
            <Image
              src="/images/illustrations/tower.webp"
              alt=""
              width={470}
              height={1228}
              sizes="(min-width:768px) 20vw, 34vw"
              className="absolute left-1/2 top-1/2 w-[38.3%] max-w-none -translate-x-1/2 -translate-y-1/2 -rotate-90"
            />
          </div>
        </div>
      <div className="wrap relative">
        <div className="relative md:max-w-[52%]">
          <h2 id="about-title" className="font-display t-h2">
            <MaskLine>Le studio</MaskLine>
            <MaskLine delay={0.08}>
              de Yashome<span className="text-main">.</span>
            </MaskLine>
          </h2>
          <p className="mt-8 max-w-[60ch] text-[17px] leading-[1.65]">{about.lead}</p>
        </div>

      </div>
      </div>
      <div className="wrap relative">
        <ul className="about-cards mt-24 grid gap-x-5 gap-y-24 md:mt-32 md:grid-cols-3">
          {about.cards.map((c, i) => (
            <li key={c.title} className="about-card relative">
              <Image
                src={PROPS[i].src}
                alt=""
                aria-hidden
                width={PROPS[i].w}
                height={PROPS[i].h}
                className={`about-prop pointer-events-none absolute bottom-[calc(100%-2px)] z-10 h-auto ${PROPS[i].cls}`}
                style={{ right: 110 }}
              />
              <article className="group relative flex h-full min-h-[280px] flex-col justify-end rounded-[var(--radius-card)] bg-second p-7 text-white md:p-9">
                <Notch ground="#f5f2ed" size={86}>
                  <ArrowDot />
                </Notch>
                <h3 className="font-display t-h4">{c.title}</h3>
                <p className="mt-3 max-w-[340px] text-[16px] leading-[1.55] text-white/75">{c.text}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
