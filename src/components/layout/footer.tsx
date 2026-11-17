import { footer, nav } from "@/data/site";
import { RIBBON_VIEWBOX } from "@/components/ui/ribbon";

const DARK_PATH =
  "M-103.009 88.011C-103.009 88.011 350.949 577.319 699.975 422.7C1049 268.081 917.137 69.5976 769.215 93.8005C675.606 109.117 596.902 230.481 705.254 294.443C813.607 358.404 1409.29 644.49 1493.85 232.942C1578.42 -178.607 2026.56 187.886 2026.56 187.886";

/** The name returns at full width over the darker ribbon. */
export function Footer() {
  return (
    <footer className="bg-ground pb-5 md:pb-8">
      <div className="wrap">
      <div className="relative overflow-hidden rounded-[40px] bg-second px-6 pt-16 text-white md:px-12 md:pt-20 min-[1600px]:rounded-[56px] min-[1600px]:px-[3vw] min-[1600px]:pt-[5vw]">
      <svg aria-hidden viewBox={RIBBON_VIEWBOX.replace("2181", "1923")} fill="none" className="pointer-events-none absolute left-0 top-[18%] w-full">
        <path d={DARK_PATH} stroke="#AF003F" strokeWidth={75} strokeMiterlimit={10} />
      </svg>
      <div className="relative @container">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <p className="max-w-[360px] text-[17px] leading-[1.6] text-white/85">
            Le studio digital de Yashome. On filme, on raconte et on publie les biens des agences et des promoteurs.
          </p>
          <nav aria-label="Pied de page" className="flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
            {nav.links.map((l) => (
              <a key={l.href} href={l.href} className="text-white/80 transition-colors hover:text-white">
                {l.label}
              </a>
            ))}
            <a href={footer.platform.href} target="_blank" rel="noreferrer" className="text-third transition-colors hover:text-white">
              {footer.platform.label} ↗
            </a>
          </nav>
        </div>
        <p aria-hidden className="font-display mt-24 select-none text-[15.6cqw] font-extrabold leading-[0.8] tracking-[-0.06em]">
          YASHOME
        </p>
        <div className="flex flex-col justify-between gap-2 py-8 text-[14px] text-white/60 md:flex-row">
          <span>{footer.note}</span>
          <span>Oran · Alger · Constantine</span>
        </div>
      </div>
      </div>
      </div>
    </footer>
  );
}
