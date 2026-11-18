/** All page copy lives here. Contact details and works are placeholders until the client sends them. */

export const nav = {
  links: [
    { label: "Départements", href: "#departements" },
    { label: "Réalisations", href: "#realisations" },
    { label: "Méthode", href: "#methode" },
    { label: "Studio", href: "#studio" },
    { label: "Contact", href: "#contact" },
  ],
  cta: { label: "Démarrer un projet", href: "#contact" },
};

export const hero = {
  line: "Shooting, drone, vidéo et publicité pour les agences immobilières et les promoteurs. On met vos biens en scène, Yashome les met devant les acheteurs.",
  primary: { label: "Démarrer un projet", href: "#contact" },
  secondary: { label: "Voir les réalisations", href: "#realisations" },
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
      { title: "Les Terrasses du Front de mer", kind: "Film drone", image: ILLU.villa, tone: "pink" },
      { title: "Projet Belle Vue", kind: "Film de lancement", tone: "navy" },
      { title: "Villa Canastel", kind: "Reel 30 s", tone: "gold" },
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
  services: string[];
  image?: string;
  tone: Tone;
};

/** Selected works. Sample entries until the client sends the real projects. */
export const works: Work[] = [
  { id: "w1", title: "Résidence Les Pins", client: "Promoteur", place: "Oran, Bir El Djir", services: ["Drone", "Film"], image: ILLU.photo, tone: "navy" },
  { id: "w2", title: "Villa Canastel", client: "Agence immobilière", place: "Oran, Canastel", services: ["Shooting", "360°"], image: ILLU.villa2, tone: "pink" },
  { id: "w3", title: "Campagne de lancement", client: "Yashome", place: "Algérie", services: ["Réseaux", "Ads"], image: ILLU.campaign, tone: "navy" },
  { id: "w4", title: "Les Terrasses du Front de mer", client: "Promoteur", place: "Alger, Bordj El Kiffan", services: ["Branding", "Reels"], image: ILLU.building, tone: "gold" },
  { id: "w5", title: "Appartement F4 Hydra", client: "Agence immobilière", place: "Alger, Hydra", services: ["Shooting", "Reels"], image: ILLU.appart, tone: "sand" },
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
    { k: "Sur Yashome", v: "Vos annonces passent à la une, avec photos, film et visite 360°." },
    { k: "Sur vos réseaux", v: "Reels et publications prêts à poster, à votre nom." },
    { k: "En publicité", v: "Campagnes ciblées par ville et par budget." },
  ],
};

export const method = [
  { verb: "On visite", text: "Repérage du bien, de la lumière et des meilleurs angles. On fixe le plan de tournage avec vous." },
  { verb: "On tourne", text: "Une demi-journée sur place : photo, vidéo et drone dans la même session." },
  { verb: "On publie", text: "Annonce mise en avant sur Yashome, reels sur vos réseaux, campagnes lancées." },
  { verb: "On mesure", text: "Vues, appels, demandes de visite : un rapport simple chaque semaine." },
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
