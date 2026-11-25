"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { bridge } from "@/data/site";
import { MaskLine } from "@/components/motion/reveal";

const EASE = [0.23, 1, 0.32, 1] as const;
const CLIP = { preview: "/videos/montazah.mp4", poster: "/videos/montazah.jpg" };
const PATH = "M4 40 C60 4 120 76 196 40";

/** Live timecode from the clip, so the viewfinder reads like a real camera. */
function useTimecode(video: React.RefObject<HTMLVideoElement | null>) {
  const [t, setT] = useState(0);
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    const on = () => setT(el.currentTime);
    el.addEventListener("timeupdate", on);
    return () => el.removeEventListener("timeupdate", on);
  }, [video]);
  const s = Math.floor(t);
  const f = Math.floor((t - s) * 25);
  return `00:00:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`;
}

/**
 * The studio's promise shown as the real path: a clip in the camera on the left, the same property
 * live on Yashome on the right, one pink line from one to the other.
 */
export function Bridge() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const tc = useTimecode(video);

  // A light drift between the two sides while the section crosses the screen.
  const { scrollYProgress } = useScroll({ target: section, offset: ["start end", "end start"] });
  const camY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [24, -24]);
  const phoneY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [36, -20]);

  useEffect(() => {
    const el = video.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? el.play().catch(() => {}) : el.pause()), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <section ref={section} aria-labelledby="bridge-title" className="relative overflow-hidden bg-ground section-y">
      <div className="wrap">
        {/* Header, set like every other section: title left, lead right */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 id="bridge-title" className="font-display t-h2">
            <MaskLine>Filmé par le studio.</MaskLine>
            <MaskLine delay={0.06}>
              <span className="text-main">Vu sur Yashome.</span>
            </MaskLine>
          </h2>
          <div className="max-w-[36ch] pb-2">
            <p className="text-[17px] leading-[1.6] text-text-gray">{bridge.lead}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {bridge.points.map((p) => (
                <li key={p.k} className="rounded-full bg-white px-4 py-2 text-[14px] font-medium">{p.k}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="head-gap grid items-center gap-y-12 md:grid-cols-12 md:gap-x-8">
          {/* Filmed */}
          <figure className="max-w-[340px] md:col-span-4 md:max-w-none">
            <motion.div style={{ y: camY }} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-second">
                <video ref={video} src={CLIP.preview} poster={CLIP.poster} muted loop playsInline preload="none" aria-hidden className="absolute inset-0 size-full scale-[1.02] object-cover" />
                {/* Soft vignette so the overlay always reads */}
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_55%,rgba(10,10,30,0.45))]" />
                {/* Viewfinder */}
                <div aria-hidden className="pointer-events-none absolute inset-[6%] text-white">
                  {["left-0 top-0 border-l-2 border-t-2 rounded-tl-[6px]", "right-0 top-0 border-r-2 border-t-2 rounded-tr-[6px]", "bottom-0 left-0 border-b-2 border-l-2 rounded-bl-[6px]", "bottom-0 right-0 border-b-2 border-r-2 rounded-br-[6px]"].map((c) => (
                    <span key={c} className={`absolute size-7 border-white/90 ${c}`} />
                  ))}
                  {/* Focus square, centre */}
                  <span className="absolute left-1/2 top-1/2 size-14 -translate-x-1/2 -translate-y-1/2 rounded-[4px] border border-white/60">
                    <span className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80" />
                  </span>
                  <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-semibold tracking-[0.1em]">
                    <span className="size-1.5 animate-pulse rounded-full bg-main motion-reduce:animate-none" />
                    REC
                  </span>
                  <span className="absolute right-4 top-4 rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-medium tabular-nums">{tc}</span>
                  <span className="absolute bottom-4 left-4 text-[11px] font-medium tracking-[0.06em] text-white/85">4K · 25 i/s</span>
                  {/* Audio level, quiet bars */}
                  <span className="absolute bottom-4 right-4 flex h-3 items-end gap-[3px]">
                    {[0.5, 0.85, 0.65, 1, 0.4].map((h, i) => (
                      <span
                        key={i}
                        className="w-[3px] origin-bottom rounded-full bg-white/85 motion-safe:animate-[meter_1.1s_ease-in-out_infinite_alternate]"
                        style={{ height: `${h * 100}%`, animationDelay: `${i * 0.13}s` }}
                      />
                    ))}
                  </span>
                </div>
              </div>
            </motion.div>
            <figcaption className="mt-5 text-[14px] text-text-gray">Montazah, tourné par le studio</figcaption>
          </figure>

          {/* The line from the camera to the platform: draws once, then a dot keeps travelling it */}
          <div aria-hidden className="hidden self-center md:col-span-3 md:block md:px-4">
            <svg viewBox="0 0 200 80" fill="none" className="w-full overflow-visible">
              <path d={PATH} stroke="#151533" strokeOpacity="0.12" strokeWidth="2" strokeDasharray="2 7" strokeLinecap="round" />
              <motion.path
                d={PATH}
                stroke="#FF004F"
                strokeWidth="2.5"
                strokeLinecap="round"
                initial={{ pathLength: reduce ? 1 : 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 1.1, ease: EASE }}
              />
              <path d="M186 32 L198 40 L186 48" stroke="#FF004F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="4" cy="40" r="4" fill="#FF004F" />
              {!reduce && (
                <circle r="4" fill="#fff" stroke="#FF004F" strokeWidth="2">
                  <animateMotion dur="2.8s" repeatCount="indefinite" path={PATH} keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.25 1" />
                </circle>
              )}
            </svg>
            <p className="mt-6 text-center text-[13px] font-medium text-text-gray">
              Monté, puis publié <span className="text-second">en 7 jours</span>
            </p>
          </div>

          {/* Seen */}
          <figure className="md:col-span-5 md:col-start-8">
            {/* No surface: the laptop and phone stand on the page, a soft shadow grounds them */}
            <div>
            <div className="relative w-full pb-[2%] pl-[9%]">
              <span aria-hidden className="absolute -bottom-2 left-[6%] right-[2%] h-6 rounded-[50%] bg-second/15 blur-xl" />
              <Image src="/images/devices/laptop-yashome.webp" alt="Le site Yashome sur un ordinateur portable" width={1360} height={837} sizes="(min-width:768px) 40vw, 84vw" className="relative w-full" />
              <motion.div style={{ y: phoneY }} className="absolute bottom-0 left-0 w-[21%] drop-shadow-[0_18px_24px_rgba(21,21,51,0.28)]">
                <Image src="/images/devices/phone-yashome.webp" alt="Le site Yashome sur un téléphone" width={667} height={1333} sizes="(min-width:768px) 9vw, 18vw" className="w-full" />
              </motion.div>
              {/* Live badge on the screen */}
              <span className="absolute right-[6%] top-[6%] flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[12px] font-medium text-second">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 rounded-full bg-[#22c55e] opacity-60 motion-safe:animate-ping" />
                  <span className="relative size-2 rounded-full bg-[#22c55e]" />
                </span>
                En ligne
              </span>
            </div>
            </div>
            <figcaption className="mt-5 text-[14px] text-text-gray">Publié sur Yashome, là où les acheteurs cherchent</figcaption>
          </figure>
        </div>

      </div>
    </section>
  );
}
