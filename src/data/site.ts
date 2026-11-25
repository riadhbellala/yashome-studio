/** All page copy lives here. Contact details and works are placeholders until the client sends them. */

export const nav = {
  links: [
    { label: "Départements", href: "/#departements" },
    { label: "Réalisations", href: "/#realisations" },
    { label: "Méthode", href: "/#methode" },
    { label: "Studio", href: "/#studio" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Démarrer un projet", href: "#contact" },
};

export const hero = {
  line: "Shooting, drone, vidéo et publicité pour les agences immobilières et les promoteurs. On met vos biens en scène, Yashome les met devant les acheteurs.",
  primary: { label: "Démarrer un projet", href: "#contact" },
  secondary: { label: "Voir les réalisations", href: "/realisations" },
  tags: ["Shooting photo", "Drone 4K", "Reels", "Visite 360°", "Ads"],
};

export const statement =
  "Un bien mal photographié reste en ligne des mois. Nous le filmons, le racontons et le plaçons devant les bons acheteurs, pour qu’il parte vite.";

export type Tone = "pink" | "navy" | "gold" | "sand";

export type Creation = { title: string; kind: string; image?: string; tone: Tone };

export type Department = {
  id: string;
  name: string;
  tagline: string;
  cta: string;
  /** Plain words, for someone who has never ordered one. */
  definition: string;
  items: string[];
  cover: string;
  icon: string;
  head: "pink" | "navy" | "gold";
  creations: Creation[];
};

const ILLU = { villa: "/images/works/villa.webp", appart: "/images/works/appartment.webp", photo: "/images/works/residence.webp", campaign: "/images/works/yashome-og.webp", villa2: "/images/illustrations/villa.webp", building: "/images/illustrations/building.webp" };

/** Departments of the studio, digital only. Creations are samples until the real work arrives. */
export const departments: Department[] = [
  {
    id: "shooting",
    tagline: "La première impression.",
    cta: "Réserver un shooting",
    icon: "/images/departments/shooting.webp",
    head: "pink",
    name: "Shooting photo",
    definition: "Des photos HDR grand angle, lumière retravaillée, qui donnent envie de visiter avant même d’appeler.",
    items: ["Intérieur HDR", "Extérieur et façade", "Retouche et ciel", "Formats annonce"],
    cover: ILLU.photo,
    creations: [
      { title: "Résidence Les Pins", kind: "Extérieur", image: ILLU.photo, tone: "navy" },
      { title: "Villa Canastel", kind: "Intérieur HDR", tone: "sand" },
      { title: "F4 Hydra", kind: "Séjour et cuisine", image: ILLU.appart, tone: "pink" },
      { title: "Duplex Akid Lotfi", kind: "Terrasse", tone: "gold" },
    ],
  },
  {
    id: "video",
    tagline: "Le bien en mouvement.",
    cta: "Lancer un tournage",
    icon: "/images/departments/video.webp",
    head: "navy",
    name: "Production audiovisuelle",
    definition: "La visite filmée comme un film : plans stabilisés, drone 4K, montage rythmé, musique et sous-titres.",
    items: ["Film de visite", "Vues drone 4K", "Reels verticaux", "Motion design"],
    cover: ILLU.villa,
    creations: [
      { title: "Riff Promotion", kind: "Film de lancement", image: "/videos/riff-promotion.jpg", tone: "navy" },
      { title: "Résidence Safwa", kind: "Collage vidéo", image: "/videos/safwa.jpg", tone: "pink" },
      { title: "Montazah", kind: "Reel", image: "/videos/montazah.jpg", tone: "gold" },
    ],
  },
  {
    id: "social",
    tagline: "Présents chaque semaine.",
    cta: "Confier nos réseaux",
    icon: "/images/departments/social.webp",
    head: "gold",
    name: "Réseaux sociaux",
    definition: "Ce que vos abonnés voient chaque semaine : visuels, reels et publications, tenus pour vous.",
    items: ["Gestion des comptes", "Calendrier éditorial", "Création de contenus", "Community management"],
    cover: ILLU.campaign,
    creations: [
      { title: "Yashome", kind: "Campagne de lancement", image: ILLU.campaign, tone: "navy" },
      { title: "Agence Les Clés d’Oran", kind: "Posts et stories", tone: "pink" },
      { title: "Résidence Les Pins", kind: "Série de reels", tone: "sand" },
    ],
  },
  {
    id: "branding",
    tagline: "Le visage du projet.",
    cta: "Créer une identité",
    icon: "/images/departments/branding.webp",
    head: "pink",
    name: "Branding",
    definition: "Le visage de votre agence ou de votre projet : nom, logo, couleurs, ton, jusqu’au panneau de chantier.",
    items: ["Identité de marque", "Charte graphique", "Panneaux de chantier", "Brochures digitales"],
    cover: ILLU.appart,
    creations: [
      { title: "Projet Belle Vue", kind: "Identité du projet", image: ILLU.appart, tone: "gold" },
      { title: "Agence Medina Immo", kind: "Logo et charte", tone: "navy" },
    ],
  },
  {
    id: "marketing",
    tagline: "Devant les bons acheteurs.",
    cta: "Lancer une campagne",
    icon: "/images/departments/marketing.webp",
    head: "navy",
    name: "Stratégie & publicité",
    definition: "Le plan qui relie votre bien aux bons acheteurs : qui viser, quoi dire, sur quels canaux, à quel budget.",
    items: ["Étude et ciblage", "Campagnes Meta & Google", "Mise en avant Yashome", "Rapport chaque semaine"],
    cover: ILLU.campaign,
    creations: [
      { title: "Les Terrasses du Front de mer", kind: "Campagne Meta", tone: "pink" },
      { title: "Résidence Les Pins", kind: "Annonce à la une", image: ILLU.photo, tone: "navy" },
    ],
  },
  {
    id: "visite",
    tagline: "Visiter sans se déplacer.",
    cta: "Créer une visite 360°",
    icon: "/images/departments/visite.webp",
    head: "gold",
    name: "Visite virtuelle 360°",
    definition: "L’acheteur se promène dans le bien depuis son téléphone, pièce par pièce, à toute heure.",
    items: ["Capture 360°", "Plan interactif", "Intégration Yashome", "Lien partageable"],
    cover: ILLU.villa,
    creations: [{ title: "Villa Canastel", kind: "Visite complète", image: ILLU.villa, tone: "sand" }],
  },
  {
    id: "dev",
    tagline: "Votre vitrine en ligne.",
    cta: "Lancer un site",
    icon: "/images/departments/dev.svg",
    head: "navy",
    name: "Web & mobile",
    definition: "Sites et applications pour agences et promoteurs : catalogue de biens, page de projet, formulaires de contact reliés à Yashome.",
    items: ["Sites d’agence", "Pages de projet", "Applications mobiles", "Intégration Yashome"],
    cover: ILLU.campaign,
    creations: [
      { title: "Projet Belle Vue", kind: "Site du projet", image: ILLU.campaign, tone: "navy" },
      { title: "Agence Les Clés d’Oran", kind: "Site d’agence", tone: "pink" },
    ],
  },
];

export type Work = {
  id: string;
  title: string;
  client: string;
  place: string;
  kind: string;
  /** Short silent loop shown on the card. */
  preview: string;
  poster: string;
  /** Full film, streamed only when the visitor opens it. */
  film: string;
  vertical: boolean;
};

const R2 = "https://pub-0dadb4cbf6734b90a3601fb2eeec942f.r2.dev";
const v = (id: string) => ({ preview: `/videos/${id}.mp4`, poster: `/videos/${id}.jpg` });

/** Selected films. Places and clients are placeholders until confirmed. */
export const works: Work[] = [
  { id: "canastel", title: "F4 Canastel", client: "Agence immobilière", place: "Oran, Canastel", kind: "Film de visite", ...v("canastel"), film: `${R2}/F4%20canastel.mp4`, vertical: true },
  { id: "riff-promotion", title: "Riff Promotion", client: "Promoteur", place: "Oran", kind: "Film de lancement", ...v("riff-promotion"), film: `${R2}/RIFF%20PROMOTION%20modifier.mp4`, vertical: false },
  { id: "montazah", title: "Montazah", client: "Yashome", place: "Oran", kind: "Reel", ...v("montazah"), film: `${R2}/montazah%20by%20yashome%20(1).mp4`, vertical: true },
  { id: "millenium", title: "F5 Millenium", client: "Agence immobilière", place: "Oran", kind: "Film de visite", ...v("millenium"), film: `${R2}/F5%20millinieum%20001%20mp4.mp4`, vertical: true },
  { id: "logis", title: "Logis", client: "Yashome", place: "Oran", kind: "Reel", ...v("logis"), film: `${R2}/logis%20by%20yashome%20.mp4`, vertical: true },
  { id: "safwa", title: "Résidence Safwa", client: "Riff Promotion", place: "Oran", kind: "Collage vidéo", ...v("safwa"), film: `${R2}/riff%20collage%20safwa%20(1).mp4`, vertical: true },
  { id: "riff-reels", title: "Série de reels", client: "Riff Promotion", place: "Oran", kind: "Reels", ...v("riff-reels"), film: `${R2}/riff%20reels..%2002.mp4`, vertical: true },
];

export const partners = [
  { name: "BTPM", src: "/images/partners/btpm.svg" },
  { name: "Enjoy", src: "/images/partners/enjoy.svg" },
  { name: "Jyson", src: "/images/partners/jyson.svg" },
  { name: "Louni", src: "/images/partners/louni.png" },
  { name: "NC Déco", src: "/images/partners/ncdeco.svg" },
  { name: "RB", src: "/images/partners/rb.svg" },
];

export const bridge = {
  title: ["Filmé par le studio.", "Vu sur Yashome."],
  lead: "Le studio est né dans Yashome. Ce qu’on tourne pour vous part directement là où les acheteurs cherchent : la plateforme, vos réseaux et leurs fils d’actualité.",
  points: [
    { k: "À la une sur Yashome", v: "Photos, film et visite 360° sur votre annonce." },
    { k: "Reels à votre nom", v: "Prêts à poster sur vos réseaux." },
    { k: "Publicité ciblée", v: "Par ville et par budget." },
  ],
};

/** Timings are indicative placeholders. */
export const method = [
  { when: "Jour 1", verb: "On visite", text: "Repérage du bien, de la lumière et des meilleurs angles. On fixe le plan de tournage avec vous." },
  { when: "Jour 3", verb: "On tourne", text: "Une demi-journée sur place : photo, vidéo et drone dans la même session." },
  { when: "Jour 7", verb: "On publie", text: "Annonce mise en avant sur Yashome, reels sur vos réseaux, campagnes lancées." },
  { when: "Chaque semaine", verb: "On mesure", text: "Vues, appels, demandes de visite : un rapport simple chaque semaine." },
];

export const audiences = [
  {
    name: "Agences immobilières",
    lead: "Des annonces qui sortent du lot, sans y passer vos journées.",
    points: [
      "Shooting et vidéo pour chaque mandat",
      "Annonces mises en avant sur Yashome",
      "Pages Instagram et Facebook tenues",
      "Un seul interlocuteur pour tout",
    ],
  },
  {
    name: "Promoteurs",
    lead: "Vendre sur plan, c’est vendre une image. On la construit avant le béton.",
    points: [
      "Film de lancement et vues drone du chantier",
      "Identité du projet, du nom au panneau",
      "Campagnes ciblées par ville",
      "Suivi des demandes chaque semaine",
    ],
  },
];

export const contact = {
  title: "Votre prochain bien mérite son film.",
  lead: "Dites-nous ce que vous vendez et où. On revient vers vous sous 24 h avec un devis.",
  whatsapp: { label: "Écrire sur WhatsApp", href: "https://wa.me/213000000000" },
  email: { label: "studio@yas-home.com", href: "mailto:studio@yas-home.com?subject=Projet%20Yashome%20Studio" },
  phone: { label: "+213 000 00 00 00", href: "tel:+213000000000" },
};

export const footer = {
  platform: { label: "La plateforme Yashome", href: "https://yas-home.com/fr" },
  note: "© 2026 Yashome Studio. Le studio digital de Yashome.",
};

export const about = {
  title: "Le studio de Yashome.",
  lead: "Yashome Studio est l’équipe créative de la plateforme Yashome. Nous connaissons les acheteurs, les annonces et ce qui fait vendre un bien en Algérie : c’est ce savoir que nous mettons dans chaque image.",
  cards: [
    { title: "Vision", text: "Chaque bien mérite d’être vu comme il est vraiment, sous son meilleur jour, par les bons acheteurs." },
    { title: "Équipe", text: "Photographes, vidéastes, pilotes de drone, designers et spécialistes de la publicité, sous un même toit." },
    { title: "Engagement", text: "Des délais tenus, des tarifs clairs et un suivi chaque semaine, du premier repérage à la vente." },
  ],
};

/* ---------- Projects: one page per work ---------- */

export type Project = {
  slug: string;
  title: string;
  kind: string;
  client: string;
  place: string;
  department?: Department;
  poster?: string;
  preview?: string;
  film?: string;
  vertical: boolean;
  tone: Tone;
};

const slugify = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Slug of a department creation. Films share the slug of their work, so both lead to the same page. */
export const creationSlug = (c: Creation) => (c.image?.startsWith("/videos/") ? c.image.slice(8, -4) : slugify(c.title));

function build(): Project[] {
  const map = new Map<string, Project>();
  for (const w of works) {
    const department = departments.find((d) => d.creations.some((c) => creationSlug(c) === w.id));
    map.set(w.id, { slug: w.id, title: w.title, kind: w.kind, client: w.client, place: w.place, department, poster: w.poster, preview: w.preview, film: w.film, vertical: w.vertical, tone: "navy" });
  }
  for (const d of departments)
    for (const c of d.creations) {
      const slug = creationSlug(c);
      if (map.has(slug)) continue;
      map.set(slug, { slug, title: c.title, kind: c.kind, client: "Agence immobilière", place: "Oran", department: d, poster: c.image, vertical: false, tone: c.tone });
    }
  return [...map.values()];
}

export const projects = build();
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
