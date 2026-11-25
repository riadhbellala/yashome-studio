import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SharedMedia } from "@/components/ui/shared-media";
import { Button } from "@/components/ui/button";
import { SectionNav } from "@/components/ui/section-nav";
import { getProject, projects, type Project } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: `${p.title} — Yashome Studio`, description: `${p.kind} pour ${p.client}, ${p.place}.` } : {};
}

const TONE = { pink: "bg-main", navy: "bg-second", gold: "bg-third", sand: "bg-sand" } as const;
const illu = (src?: string) => !!src?.startsWith("/images/illustrations");

/** The hero: the full film, or the cover picture at its own proportions. */
function Hero({ p }: { p: Project }) {
  if (p.film)
    return (
      <video
        src={p.film}
        poster={p.poster}
        controls
        playsInline
        preload="none"
        className={`mx-auto block rounded-[var(--radius-card)] bg-second object-cover ${p.vertical ? "aspect-[9/16] max-h-[72vh] w-auto" : "aspect-video w-full"}`}
      />
    );
  if (!p.poster) return <div className={`aspect-[16/9] rounded-[var(--radius-card)] ${TONE[p.tone]}`} />;
  return (
    <Image
      src={p.poster}
      alt={`${p.title}, ${p.kind}`}
      width={1800}
      height={1200}
      priority
      sizes="(min-width:1504px) 1380px, 94vw"
      className={`mx-auto block h-auto max-h-[68vh] w-auto max-w-full rounded-[var(--radius-card)] ${illu(p.poster) ? "bg-[#fbe4ec] p-[6%]" : ""}`}
    />
  );
}

/** Linked picture for the next project. */
function Thumb({ p, className = "" }: { p: Project; className?: string }) {
  return (
    <SharedMedia slug={p.slug}>
      <span className={`relative block overflow-hidden rounded-[var(--radius-card)] ${p.poster ? "bg-second" : TONE[p.tone]} ${className}`}>
        {p.poster && (
          <Image
            src={p.poster}
            alt=""
            fill
            sizes="(min-width:1024px) 50vw, 94vw"
            className={`transition-transform duration-[1100ms] ease-[var(--ease-out)] fine:group-hover:scale-[1.04] ${illu(p.poster) ? "bg-[#fbe4ec] object-contain p-[6%]" : "object-cover"}`}
          />
        )}
      </span>
    </SharedMedia>
  );
}

/**
 * Laid out like an agency case study: title and facts, a short contents bar, the hero, an intro,
 * the objective and what we did, every picture in a calm rhythm, the service, then what comes next.
 */
export default async function ProjectPage({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const n = projects.length;
  const prev = projects[(i - 1 + n) % n];
  const next = projects[(i + 1) % n];
  const dep = p.department;
  const media = (p.gallery ?? []).filter((src) => src !== p.poster);

  const facts = [
    { k: "Client", v: p.client },
    { k: "Catégorie", v: dep?.name ?? "Production audiovisuelle" },
    { k: "Format", v: p.kind },
    { k: "Lieu", v: p.place },
  ];
  const nav = [
    { id: "objectif", label: "L’objectif" },
    { id: "contribution", label: "Notre contribution" },
    ...(media.length ? [{ id: "medias", label: "Médias" }] : []),
    ...(dep ? [{ id: "services", label: "Services" }] : []),
  ];
  const total = media.length + 1;
  /** One row: title on the left third, text on the right. */
  const row = "grid gap-4 border-t border-second/10 pt-8 md:grid-cols-3 md:gap-8";

  return (
    <>
      <Header />
      <main id="top" className="pt-[76px]">
        <div className="wrap grid gap-12 pb-[var(--sy)] pt-8 md:pt-12 lg:grid-cols-12 lg:gap-x-12">
          {/* Sidebar: stays while the work scrolls */}
          <aside className="lg:sticky lg:top-28 lg:col-span-3 lg:self-start">
            <Link href="/realisations" className="press inline-flex items-center gap-2 text-[15px] text-text-gray transition-colors hover:text-second">
              <span aria-hidden>←</span> Toutes les réalisations
            </Link>
            <h1 className="font-display mt-8 text-[clamp(30px,2.5vw,44px)] font-extrabold leading-[1.02] tracking-[-0.045em] [overflow-wrap:anywhere]">{p.title}</h1>
            <dl className="mt-8 border-b border-second/10">
              {facts.map((f) => (
                <div key={f.k} className="grid grid-cols-[96px_1fr] gap-4 border-t border-second/10 py-3.5 text-[15px]">
                  <dt className="text-text-gray">{f.k}</dt>
                  <dd className="font-medium">{f.v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 hidden pl-4 lg:block">
              <SectionNav items={nav} />
            </div>
          </aside>

          {/* The work */}
          <article className="lg:col-span-9">
            <SharedMedia slug={p.slug}>
              <div>
                <Hero p={p} />
              </div>
            </SharedMedia>

            <p className="mt-10 max-w-[62ch] text-[17px] leading-[1.6]">
              {p.kind} pour {p.client}. {dep?.definition ?? "Un film tourné et monté par le studio, publié sur Yashome et sur les réseaux du client."}
            </p>

            <section id="objectif" className={`mt-16 scroll-mt-28 ${row}`}>
              <h2 className="font-display t-h5 md:text-[26px]">L’objectif</h2>
              <p className="text-[16px] leading-[1.65] text-text-gray md:col-span-2">
                Donner à {p.title} une image à la hauteur du projet, claire et cohérente sur chaque support, et la placer devant les bons acheteurs.
              </p>
            </section>

            <section id="contribution" className={`mt-16 scroll-mt-28 ${row}`}>
              <h2 className="font-display t-h5 md:text-[26px]">Notre contribution</h2>
              <p className="text-[16px] leading-[1.65] text-text-gray md:col-span-2">
                {dep ? `${dep.items.join(", ")}.` : "Tournage, montage, étalonnage et diffusion."} Du premier brief jusqu’aux fichiers prêts à imprimer ou à publier.
              </p>
            </section>

            {media.length > 0 && (
              <section id="medias" aria-labelledby="medias-title" className="mt-16 scroll-mt-28 border-t border-second/10 pt-8">
                <h2 id="medias-title" className="font-display t-h5 md:text-[26px]">Médias</h2>
                <ul className="mt-8 flex flex-col gap-10">
                  {media.map((src, k) => (
                    <li key={src} className="relative mx-auto w-fit max-w-full overflow-hidden rounded-[var(--radius-card)]">
                      <Image src={src} alt={`${p.title}, visuel ${k + 2}`} width={1800} height={1200} sizes="(min-width:1024px) 60vw, 94vw" className="block h-auto max-h-[64vh] w-auto max-w-full" />
                      <span className="absolute bottom-4 right-4 rounded-full bg-white/90 px-3 py-1 text-[13px] font-medium tabular-nums text-second">
                        {String(k + 2).padStart(2, "0")} / {String(total).padStart(2, "0")}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {dep && (
              <section id="services" className={`mt-16 scroll-mt-28 ${row}`}>
                <h2 className="font-display t-h5 md:text-[26px]">Services</h2>
                <Link href={`/realisations#dep-${dep.id}`} className="press group block md:col-span-2">
                  <span className="font-display block text-[20px] font-extrabold tracking-[-0.03em] transition-colors fine:group-hover:text-main">{dep.name} →</span>
                  <span className="mt-2 block text-[16px] leading-[1.65] text-text-gray">{dep.blurb}</span>
                </Link>
              </section>
            )}

            {/* Next up */}
            <section aria-labelledby="next-title" className="mt-16 border-t border-second/10 pt-8">
              <Link href={`/projets/${next.slug}`} className="press group grid items-end gap-6 md:grid-cols-3 md:gap-8">
                <span>
                  <span className="text-[14px] text-text-gray">Projet suivant</span>
                  <span id="next-title" className="font-display mt-2 block text-[clamp(26px,2.4vw,40px)] font-extrabold leading-[1.05] tracking-[-0.04em] transition-colors duration-200 fine:group-hover:text-main">{next.title}</span>
                  <span className="mt-2 block text-[15px] text-text-gray">{next.kind} · {next.client}</span>
                </span>
                <Thumb p={next} className="aspect-[16/9] md:col-span-2" />
              </Link>
            </section>

            <section className="mt-16 flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] bg-second p-8 text-white md:flex-row md:items-center md:p-10">
              <h2 className="font-display t-h4 max-w-[20ch]">Un projet comme celui-ci ?</h2>
              <Button href="/#contact">Démarrer un projet</Button>
            </section>

            <nav aria-label="Autres projets" className="mt-8 flex items-center justify-between gap-4 text-[14px] font-medium">
              <Link href={`/projets/${prev.slug}`} className="press min-w-0 truncate text-text-gray transition-colors hover:text-second">← {prev.title}</Link>
              <Link href="/realisations" className="press shrink-0 rounded-full bg-white px-4 py-2">Tous les projets</Link>
              <Link href={`/projets/${next.slug}`} className="press min-w-0 truncate text-right text-text-gray transition-colors hover:text-second">{next.title} →</Link>
            </nav>
          </article>
        </div>
      </main>
      <Footer />
    </>
  );
}
