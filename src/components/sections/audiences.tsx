import { audiences } from "@/data/site";
import { MaskLine, Reveal, RevealItem } from "@/components/motion/reveal";

/** Two clients, two promises: agencies on navy, promoters on pink. */
export function Audiences() {
  return (
    <section aria-labelledby="audiences-title" className="bg-ground section-y">
      <div className="wrap">
        <h2 id="audiences-title" className="font-display t-h2">
          <MaskLine>Pour qui</MaskLine>
          <MaskLine delay={0.08}>on travaille.</MaskLine>
        </h2>
        <Reveal className="mt-12 grid gap-5 md:mt-16 lg:grid-cols-2">
          {audiences.map((a, i) => (
            <RevealItem
              key={a.name}
              className={`flex min-h-[460px] flex-col justify-between rounded-[var(--radius-card)] p-8 md:p-12 ${i === 0 ? "bg-second text-white" : "bg-main text-white"}`}
            >
              <div>
                <h3 className="font-display t-h3">{a.name}</h3>
                <p className="mt-5 max-w-[420px] text-[17px] leading-[1.6] text-white/85">{a.lead}</p>
              </div>
              <ul className="mt-12 grid gap-3">
                {a.points.map((p) => (
                  <li key={p} className="flex items-center gap-4 text-[17px]">
                    <span aria-hidden className={`grid size-8 shrink-0 place-items-center rounded-full ${i === 0 ? "bg-white text-second" : "bg-white text-main"}`}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
