"use client";

import Image from "next/image";
import { partners } from "@/data/site";
import { MaskLine } from "@/components/motion/reveal";

/** Partners: two rows of white logo tiles drifting in opposite directions, fading out at both ends. */
export function Partners() {
  return (
    <section aria-labelledby="partners-title" className="relative overflow-hidden bg-ground section-y">
      <div className="wrap flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 id="partners-title" className="font-display t-h2">
          <MaskLine>Ils nous font</MaskLine>
          <MaskLine delay={0.08}>
            confiance<span className="text-main">.</span>
          </MaskLine>
        </h2>
        <p className="max-w-[36ch] pb-2 text-[17px] leading-[1.6] text-text-gray">Promoteurs, agences et marques qui ont confié leurs projets au studio.</p>
      </div>

      <div className="relative head-gap">
        <div className="fade-x relative grid gap-5">
          {[0, 1].map((r) => (
            <div key={r}>
              <ul className="marquee flex w-max gap-5" style={{ animationDirection: r ? "reverse" : "normal", animationDuration: "52s" }}>
                {/* Two identical halves for the loop; phones need one logo set per half, which keeps the moving layer light */}
                {[0, 1, 2, 3].map((copy) => partners.map((p, i) => (
                  <li
                    key={`${copy}-${i}`}
                    className={`group grid h-[130px] w-[230px] shrink-0 place-items-center rounded-[var(--radius-card)] bg-white md:h-[170px] md:w-[300px] ${copy % 2 ? "max-md:hidden" : ""}`}
                  >
                    <Image
                      src={p.src}
                      alt={copy === 0 ? p.name : ""}
                      width={220}
                      height={110}
                      className="max-h-[70px] w-auto max-w-[160px] object-contain md:max-h-[92px] md:max-w-[190px]"
                    />
                  </li>
                )))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
