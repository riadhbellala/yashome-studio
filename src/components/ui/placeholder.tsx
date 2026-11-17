import { RIBBON_PATH, RIBBON_VIEWBOX } from "@/components/ui/ribbon";

import type { Tone } from "@/data/site";
export type { Tone };

const toneBg: Record<Tone, string> = {
  pink: "bg-main text-white",
  navy: "bg-second text-white",
  gold: "bg-third text-second",
  sand: "bg-sand text-second",
};
const toneStroke: Record<Tone, string> = {
  pink: "#AF003F",
  navy: "#FF004F",
  gold: "#151533",
  sand: "#FF004F",
};

/** Stand-in for a real photo or video until the client sends the works. */
export function Placeholder({ tone, label, className = "" }: { tone: Tone; label: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${toneBg[tone]} ${className}`}>
      <svg aria-hidden viewBox={RIBBON_VIEWBOX} fill="none" className="absolute left-[-20%] top-[30%] w-[140%] opacity-80">
        <path d={RIBBON_PATH} stroke={toneStroke[tone]} strokeWidth={75} strokeMiterlimit={10} />
      </svg>
      <span className="absolute bottom-5 left-5 rounded-full bg-black/15 px-3 py-1.5 text-[13px] font-medium">{label}</span>
    </div>
  );
}
