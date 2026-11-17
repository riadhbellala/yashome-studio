/**
 * The cut-out corner from the Yashome cards: a bite out of the top-right corner, with an arrow
 * button sitting in it. `ground` is the colour of what is behind the card.
 */
export function Notch({ ground, size = 84, children }: { ground: string; size?: number; children: React.ReactNode }) {
  const r = 26;
  return (
    <div aria-hidden={false} className="absolute right-0 top-0 z-10" style={{ width: size, height: size }}>
      <div className="absolute inset-0 grid place-items-center" style={{ background: ground, borderBottomLeftRadius: r + 6 }}>
        {children}
      </div>
      {/* inverted corners that soften the bite into the card */}
      <span className="absolute top-0" style={{ left: -r, width: r, height: r, background: `radial-gradient(circle at 0 100%, transparent ${r}px, ${ground} ${r + 0.5}px)` }} />
      <span className="absolute right-0" style={{ bottom: -r, width: r, height: r, background: `radial-gradient(circle at 0 100%, transparent ${r}px, ${ground} ${r + 0.5}px)` }} />
    </div>
  );
}

export function ArrowDot({ className = "" }: { className?: string }) {
  return (
    <span className={`grid size-[54px] place-items-center rounded-full bg-main text-white transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-45 ${className}`}>
      <svg width="18" height="18" viewBox="0 0 14 14" fill="none" aria-hidden>
        <path d="M3 11L11 3m0 0H4.5M11 3v6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}
