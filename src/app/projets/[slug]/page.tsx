import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Contact } from "@/components/sections/contact";
import { SharedMedia } from "@/components/ui/shared-media";
import { Button } from "@/components/ui/button";
import { getProject, projects, type Project } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const p = getProject((await params).slug);
  return p ? { title: `${p.title} — Yashome Studio`, description: `${p.kind} pour ${p.client}, ${p.place}.` } : {};
}

const TONE = { pink: "bg-main", navy: "bg-second", gold: "bg-third", sand: "bg-sand" } as const;

/** The project's picture, the same one as on its card, so the morph lands on it. */
function Media({ p, priority }: { p: Project; priority?: boolean }) {
  if (p.film)
    return (
      <video
        src={p.film}
        poster={p.poster}
        controls
        playsInline
        preload="none"
        className={`block w-full rounded-[var(--radius-card)] bg-second object-cover ${p.vertical ? "aspect-[4/5] max-h-[78vh] md:aspect-[9/14]" : "aspect-video"}`}
      />
    );
  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-[var(--radius-card)] ${p.poster ? "bg-second" : TONE[p.tone]}`}>
      {p.poster ? (
        <Image
          src={p.poster}
          alt={`${p.title}, ${p.kind}`}
          fill
          priority={priority}
          sizes="(min-width:1024px) 66vw, 100vw"
          className={p.poster.startsWith("/images/illustrations") ? "bg-[#fbe4ec] object-contain p-[6%]" : "object-cover"}
        />
      ) : (
        <span className="absolute left-6 top-6 text-[13px] font-medium text-white/80">Visuel à venir</span>
      )}
    </div>
  );
}

/** Small linked thumbnail, used for related and neighbour projects. */
function Thumb({ p, className = "", bare }: { p: Project; className?: string; bare?: boolean }) {
  return (
    <SharedMedia slug={p.slug}>
      <span className={`relative block overflow-hidden rounded-[var(--radius-inner)] ${p.poster ? "bg-second" : TONE[p.tone]} ${className}`}>
        {p.poster ? (
          <Image src={p.poster} alt="" fill sizes="(min-width:1024px) 28vw, 90vw" className={`transition-transform duration-[900ms] ease-[var(--ease-out)] fine:group-hover:scale-[1.04] ${p.poster.startsWith("/images/illustrations") ? "bg-[#fbe4ec] object-contain p-[6%]" : "object-cover"}`} />
        ) : bare ? null : (
          <span className="absolute left-4 top-4 text-[12px] font-medium text-white/80">Visuel à venir</span>
        )}
      </span>
    </SharedMedia>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projets/[slug]">) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const n = projects.length;
  const prev = projects[(i - 1 + n) % n];
  const next = projects[(i + 1) % n];
  const related = projects.filter((r) => r.department && r.department === p.department && ![p, prev, next].includes(r)).slice(0, 3);
  const facts = [
    { k: "Client", v: p.client },
    { k: "Lieu", v: p.place },
    { k: "Département", v: p.department?.name ?? "Production audiovisuelle" },
    { k: "Format", v: p.kind },
  ];

  return (
    <>
      <Header />
      <main id="top" className="pt-[76px]">
        <article className="wrap pb-[var(--sy)] pt-8 md:pt-12">
          {/* Top bar: way back, and where we are in the list */}
          <div className="flex items-center justify-between border-b border-second/10 pb-5 text-[14px] font-medium">
            <Link href="/realisations" className="press inline-flex items-center gap-2 text-text-gray transition-colors hover:text-second">
              <span aria-hidden>←</span> Toutes les réalisations
            </Link>
            <span className="tabular-nums text-text-gray">
              <span className="text-second">{String(i + 1).padStart(2, "0")}</span> / {String(n).padStart(2, "0")}
            </span>
          </div>

          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-12 lg:gap-x-10">
            {/* Facts: stay in view while the picture scrolls */}
            <aside className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
              <p className="flex items-center gap-3 text-[14px] font-medium">
                <span className="text-main">{p.kind}</span>
                <span aria-hidden className="h-px w-8 bg-second/20" />
                <span className="text-text-gray">{p.place}</span>
              </p>
              <h1 className="font-display t-h3 mt-5">{p.title}</h1>
              <p className="mt-5 max-w-[44ch] text-[17px] leading-[1.6] text-text-gray">
                {p.department?.definition ?? "Un film tourné et monté par le studio, publié sur Yashome et sur les réseaux du client."}
              </p>

              <dl className="mt-10 grid grid-cols-2 border-t border-second/10">
                {facts.map((f, k) => (
                  <div key={f.k} className={`border-b border-second/10 py-4 ${k % 2 ? "pl-5" : "pr-5"}`}>
                    <dt className="text-[13px] text-text-gray">{f.k}</dt>
                    <dd className="mt-1.5 text-[15px] font-medium">{f.v}</dd>
                  </div>
                ))}
              </dl>

              {p.department && (
                <div className="mt-8">
                  <p className="text-[13px] text-text-gray">Ce qu’on a fait</p>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {p.department.items.map((it) => (
                      <li key={it} className="rounded-full bg-white px-3.5 py-1.5 text-[13px] font-medium">{it}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Button href="#contact" className="mt-10 max-sm:w-full">{p.department?.cta ?? "Démarrer un projet"}</Button>
            </aside>

            {/* The picture or film, as large as the column allows */}
            <div className="order-first lg:order-none lg:col-span-8">
              <div className={p.vertical ? "mx-auto max-w-[480px]" : ""}>
                <SharedMedia slug={p.slug}>
                  <div>
                    <Media p={p} priority />
                  </div>
                </SharedMedia>
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <section aria-labelledby="related-title" className="mt-[var(--sy)]">
              <div className="flex items-end justify-between gap-6">
                <h2 id="related-title" className="font-display t-h4">Du même département</h2>
                <Link href="/realisations" className="text-[14px] font-medium text-text-gray transition-colors hover:text-second">Tout voir</Link>
              </div>
              <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug}>
                    <Link href={`/projets/${r.slug}`} className="press group block">
                      <Thumb p={r} className="aspect-[4/3]" />
                      <span className="mt-3 flex justify-between gap-4 text-[14px]">
                        <span className="font-medium">{r.title}</span>
                        <span className="text-text-gray">{r.kind}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Neighbours */}
          <nav aria-label="Autres projets" className="mt-[var(--sy)] grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-second/10 sm:grid-cols-2">
            {[
              { p: prev, label: "Projet précédent", arrow: "←" },
              { p: next, label: "Projet suivant", arrow: "→" },
            ].map(({ p: q, label, arrow }, k) => (
              <Link key={label} href={`/projets/${q.slug}`} className={`press group flex items-center gap-5 bg-white p-5 md:p-6 ${k ? "sm:flex-row-reverse sm:text-right" : ""}`}>
                <Thumb p={q} bare className="aspect-square w-20 shrink-0 md:w-24" />
                <span className="min-w-0 flex-1">
                  <span className="text-[13px] text-text-gray">
                    {k ? `${label} ${arrow}` : `${arrow} ${label}`}
                  </span>
                  <span className="font-display t-h4 mt-1 block truncate transition-colors duration-200 fine:group-hover:text-main">{q.title}</span>
                </span>
              </Link>
            ))}
          </nav>
        </article>
        <Contact />
      </main>
      <Footer />
    </>
  );
}
