import type { ReactNode } from "react";

const styles = {
  pink: "bg-main text-white hover:bg-main-deep [&_.btn-icon]:bg-white [&_.btn-icon]:text-main",
  navy: "bg-second text-white hover:bg-night [&_.btn-icon]:bg-main",
  light: "bg-white text-second hover:bg-sand [&_.btn-icon]:bg-second [&_.btn-icon]:text-white",
  ghost: "bg-second/[0.06] text-second hover:bg-second/[0.12]",
};

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
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`press group inline-flex h-[52px] items-center gap-4 rounded-full pl-6 pr-[6px] text-[15px] font-semibold ${styles[theme]} ${className}`}
    >
      {children}
      <span className="btn-icon grid size-10 place-items-center rounded-full transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-0.5 group-hover:-rotate-45">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
          <path d="M1 7h11m0 0L7 2m5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </a>
  );
}
