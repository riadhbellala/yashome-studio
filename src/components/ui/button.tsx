import type { CSSProperties, ReactNode } from "react";
import { RIBBON_PATH, RIBBON_VIEWBOX } from "@/components/ui/ribbon";

const styles = {
  pink: { body: "bg-main text-white", icon: "bg-second text-white", ribbon: "#af003f" },
  navy: { body: "bg-second text-white", icon: "bg-main text-white", ribbon: "#2b2b5c" },
  light: { body: "bg-white text-second", icon: "bg-main text-white", ribbon: "#fbd5e1" },
  ghost: { body: "bg-second/[0.06] text-second", icon: "bg-second text-white", ribbon: "#ebe5da" },
};

/**
 * Main button: the label plate has the same round bite as the Yashome cards, and the arrow sits
 * in it. On hover the brand ribbon draws itself behind the label.
 */
export function Button({
  href,
  children,
  theme = "pink",
  className = "",
  external,
}: {
  href: string;
  children: ReactNode;
  theme?: keyof typeof styles;
  className?: string;
  external?: boolean;
}) {
  const t = styles[theme];
  const bite: CSSProperties = {
    WebkitMaskImage: "radial-gradient(circle calc(var(--d) / 2 + 5px) at calc(100% + 8px) 50%, transparent 98%, #000 100%)",
    maskImage: "radial-gradient(circle calc(var(--d) / 2 + 5px) at calc(100% + 8px) 50%, transparent 98%, #000 100%)",
  };
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`press group inline-flex h-[54px] items-center text-[15px] font-semibold [--d:44px] [--px:24px] ${className}`}
    >
      <span
        style={{ ...bite, paddingLeft: "var(--px)", paddingRight: "calc(var(--d) / 2 + var(--px) - 8px)" }}
        className={`relative flex h-full flex-1 items-center overflow-hidden rounded-[18px] ${t.body}`}
      >
        <svg aria-hidden viewBox={RIBBON_VIEWBOX} fill="none" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-1/2 h-[120%] w-full -translate-y-1/2">
          <path
            d={RIBBON_PATH}
            pathLength={1}
            stroke={t.ribbon}
            strokeWidth={90}
            strokeDasharray={1}
            className="[stroke-dashoffset:1] transition-[stroke-dashoffset] duration-700 ease-[var(--ease-out)] group-hover:[stroke-dashoffset:0] motion-reduce:transition-none"
          />
        </svg>
        <span className="relative whitespace-nowrap">{children}</span>
      </span>
      <span
        aria-hidden
        style={{ width: "var(--d)", height: "var(--d)", marginLeft: "calc(8px - var(--d) / 2 * 2 + var(--d) / 2)" }}
        className={`btn-icon relative grid shrink-0 place-items-center rounded-full transition-transform duration-300 ease-[var(--ease-out)] group-hover:-rotate-45 ${t.icon}`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M1 7h11m0 0L7 2m5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
