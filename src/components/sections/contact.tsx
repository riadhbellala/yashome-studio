import { contact } from "@/data/site";
import { MaskLine, Reveal, RevealItem } from "@/components/motion/reveal";

const channels = [
  { ...contact.whatsapp, name: "WhatsApp", cls: "bg-main text-white hover:bg-main-deep", external: true },
  { ...contact.email, name: "E-mail", cls: "bg-second text-white hover:bg-night", external: false },
  { ...contact.phone, name: "Téléphone", cls: "bg-white text-second hover:bg-sand", external: false },
];

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 bg-ground section-y">
      <div className="wrap">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 id="contact-title" className="font-display text-[clamp(36px,6vw,154px)] font-extrabold leading-[0.9] tracking-[-0.05em] lg:col-span-9">
            <MaskLine>Votre prochain bien</MaskLine>
            <MaskLine delay={0.08}>mérite son film.</MaskLine>
          </h2>
          <p className="max-w-[360px] text-[17px] leading-[1.6] lg:col-span-3">{contact.lead}</p>
        </div>
        <Reveal className="mt-16 grid gap-4 md:grid-cols-3">
          {channels.map((c) => (
            <RevealItem key={c.name}>
              <a
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className={`press group flex h-[220px] flex-col justify-between rounded-[28px] p-7 md:h-[260px] ${c.cls}`}
              >
                <span className="flex items-center justify-between text-[15px] font-medium opacity-80">
                  {c.name}
                  <span aria-hidden className="text-[22px] transition-transform duration-300 ease-[var(--ease-out)] group-hover:-rotate-45">→</span>
                </span>
                <span className="font-display text-[clamp(20px,1.8vw,28px)] font-extrabold leading-[1.05] tracking-[-0.035em] [overflow-wrap:anywhere]">{c.label}</span>
              </a>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
