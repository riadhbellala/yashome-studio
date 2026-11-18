import { contact, departments, footer, nav } from "@/data/site";
import { Logo } from "@/components/ui/logo";
import { LINE_WAVE } from "@/components/ui/ribbon";

const link = "text-[15px] text-white/70 transition-colors duration-200 hover:text-white";

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[14px] font-medium text-white">{title}</h2>
      <ul className="mt-4 grid gap-2.5">{children}</ul>
    </div>
  );
}

/** Information first, on a strict grid; a brand line, then the name closes the page. */
export function Footer() {
  return (
    <footer className="bg-ground pb-5 md:pb-8">
      <div className="wrap">
        <div className="overflow-hidden rounded-[36px] bg-second px-6 pt-12 text-white md:px-12 md:pt-16">
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-12 lg:gap-5">
            <div className="col-span-2 lg:col-span-4">
              <Logo light />
              <p className="mt-5 max-w-[330px] text-[15px] leading-[1.6] text-white/70">Le studio digital de Yashome, pour les agences immobilières et les promoteurs.</p>
            </div>
            <div className="lg:col-span-2">
              <Column title="Navigation">
                {nav.links.map((l) => <li key={l.href}><a href={l.href} className={link}>{l.label}</a></li>)}
              </Column>
            </div>
            <div className="lg:col-span-3">
              <Column title="Départements">
                {departments.slice(0, 5).map((d) => <li key={d.id}><a href={`#dep-${d.id}`} className={link}>{d.name}</a></li>)}
              </Column>
            </div>
            <div className="col-span-2 lg:col-span-3">
              <Column title="Contact">
                <li><a href={contact.whatsapp.href} target="_blank" rel="noreferrer" className={link}>WhatsApp</a></li>
                <li><a href={contact.email.href} className={link}>{contact.email.label}</a></li>
                <li><a href={contact.phone.href} className={link}>{contact.phone.label}</a></li>
                <li><a href={footer.platform.href} target="_blank" rel="noreferrer" className={link}>{footer.platform.label} ↗</a></li>
              </Column>
            </div>
          </div>

          {/* The brand line separates the links from the name and never touches the letters */}
          <svg aria-hidden viewBox={LINE_WAVE.viewBox} preserveAspectRatio="none" fill="none" className="mt-10 h-14 w-full md:mt-14 md:h-20">
            <path d={LINE_WAVE.path} stroke="#FF004F" strokeWidth={3} vectorEffect="non-scaling-stroke" />
          </svg>

          <div className="@container mt-8 md:mt-10">
            <p aria-hidden className="font-display flex select-none justify-between text-[14.6cqw] font-extrabold leading-[0.8] tracking-[-0.05em]">
              {"YASHOME".split("").map((c, i) => <span key={i}>{c}</span>)}
            </p>
          </div>

          <div className="mt-8 flex items-center justify-between gap-4 pb-6 text-[13px] text-white/60 md:mt-10">
            <span>{footer.note}</span>
            <a href="#top" className="shrink-0 transition-colors hover:text-white">Haut de page ↑</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
