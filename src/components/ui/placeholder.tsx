
import type { Tone } from "@/data/site";
export type { Tone };

const toneBg: Record<Tone, string> = {
  pink: "bg-[#fbe4ec] text-second",
  navy: "bg-second text-white",
  gold: "bg-sand text-second",
  sand: "bg-sand text-second",
};

/** Stand-in for a real photo or video until the client sends the works. */
export function Placeholder({ tone, label, className = "" }: { tone: Tone; label: string; className?: string }) {
  return (
    <div className={`relative overflow-hidden ${toneBg[tone]} ${className}`}>
      <span className="absolute bottom-5 left-5 rounded-full bg-black/15 px-3 py-1.5 text-[13px] font-medium">{label}</span>
    </div>
  );
}
