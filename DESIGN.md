# Yashome Studio — Design & System

The portfolio of Yashome Studio, the digital studio of [yas-home.com](https://yas-home.com). It sells shooting, film, social media, branding, advertising and web to real-estate agencies and promoters in Algeria. All copy is in French.

---

## 1. The vibe

**Calm, premium, warm, confident.** It should feel like an architecture magazine that is also a working studio: lots of air, big bold type, real work shown large, and very little decoration.

- **Warm, not cold.** The page sits on a cream paper ground (`#f5f2ed`), not on white or grey. White is used only for surfaces that sit on top, such as cards, tabs and tags.
- **Two brand colours, used with intent.**
  - Yashome pink (`#FF004F`) marks the thing to click and one accent per section.
  - Deep navy (`#151533`) is the ink, and the colour of the strong surfaces: folders, cards and the footer.
- **Type does the talking.** The headlines are huge and tightly set (Archivo, extra bold). The body text is quiet (Poppins, 17px).
- **Real work, not icons.** Films, mockups, calendars, roll-ups and posts are the pictures. Drawings appear only in the hero and the "Studio" section, as the brand's illustration style.
- **Few motions, done well.** Three big moments; everything else fades in quietly.
- **The Yashome shapes recur.**
  - The **notched corner**: a round bite out of a card's corner with an arrow sitting in it.
  - The **folder tab**.
  - The **pink ribbon**.
  - These are the brand's signature; nothing else is ornament.

What we avoid:
- gradients (except a soft shade under text on a photo)
- glass blur
- glows
- icon-topped feature cards
- small uppercase labels
- thin decorative lines
- more than two typefaces
- stock "AI" layouts

---

## 2. Design tokens

All tokens live in `src/app/globals.css` under `@theme` (Tailwind v4). Components use tokens only.

### Colour

| Token | Value | Role |
|---|---|---|
| `--color-ground` | `#f5f2ed` | Page ground (cream paper) |
| `--color-second` | `#151533` | Ink, navy surfaces |
| `--color-main` | `#ff004f` | Brand pink: actions, accents, focus, selection |
| `--color-main-deep` | `#af003f` | Pink ribbon on pink buttons |
| `--color-third` | `#c6b467` | Gold, rare tone tiles |
| `--color-sand` | `#ebe5da` | One step darker than ground: placeholders |
| `--color-text-gray` | `#4d5454` | Secondary text only (leads, captions) |
| `--color-night` | `#0e0e26` | Hero night scene |
| white | `#ffffff` | Raised surfaces: cards, tabs, chips, flaps |

Rules:
- Running text is in full ink. Grey is only for secondary lines.
- Surfaces are separated by a step in tone (ground, white, navy), not by borders or shadows.

### Type

| Role | Font | Class | Size |
|---|---|---|---|
| Display | Archivo (wide axis), 800 | `.t-h2` | clamp(38px, 5.2vw, 124px), lh .95, tracking −.05em |
| Sub-display | Archivo 800 | `.t-h3` | clamp(30px, 3.4vw, 80px) |
| Card title | Archivo 800 | `.t-h4` | clamp(24px, 2vw, 46px) |
| Small title | Archivo 800 | `.t-h5` | 19px |
| Body / lead | Poppins 400–500 | `text-[17px] leading-[1.6]` | 17px |
| Caption | Poppins | `text-[14px]` / `text-[13px]` | 13–14px |

Rules:
- Headings use `text-wrap: balance` and are two lines at most.
- Numbers use tabular figures.

### Shape

| Token | Value | Used for |
|---|---|---|
| `--radius-card` | 24px | Every card, media block, folder, section panel |
| `--radius-inner` | 16px | Things inside a card: inset photos, gallery images, folder tabs |
| full round | 9999px | Buttons' icon dot, chips, tags, pills |

Only these three radii exist.

### Space

- `--sy`: clamp(48px, 5vw, 112px). Every section gets `section-y` (padding top and bottom = `--sy`), so the gap between any two sections is the same.
- `head-gap`: the space between a section header and its content, clamp(40px, 4.2vw, 72px).
- `wrap`: one container with equal side margins (16px gutter on phones) used by every section.
- Inside sections, the gaps are clearly smaller than the gaps between sections.

### Motion

| Token | Value |
|---|---|
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)`: every entrance and hover |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` |

- Hover effects only run on a real mouse (`fine:` variant), so nothing sticks on touch.
- Every move respects `prefers-reduced-motion`.

---

## 3. Components

| Component | File | Notes |
|---|---|---|
| **Button** | `components/ui/button.tsx` | Label plate with a round bite and the arrow dot sitting in it. On hover the brand ribbon draws behind the label. Themes: pink, navy, light, ghost. Uses `next/link`. |
| **Notch + ArrowDot** | `components/ui/notch.tsx` | The Yashome cut-out corner with a pink arrow. Used on the Studio cards. |
| **Folder** | `sections/departments.tsx` | A real folder:<br>• a navy back with a "Dossier 01" tab<br>• the service photo slipped inside, tilted 1.5°, which lifts on hover<br>• a white front flap with the name, tagline and pink arrow |
| **Tile** | `sections/departments.tsx` | Project thumbnail: 4:3 media (silent video loop or image), title and type below. |
| **Work card** | `sections/works.tsx` | Big media card, "Voir le film" / "Voir le projet" chip, title, type and client. |
| **SharedMedia** | `components/ui/shared-media.tsx` | Wraps a project's picture in React `<ViewTransition>`, so it morphs between card and page. |
| **Reveal / MaskLine** | `components/motion/reveal.tsx` | Quiet text entrances (16px rise, 0.6s, stagger 0.06s). |
| **SectionFade** | `components/motion/section-fade.tsx` | Every section below the first screen fades and rises once (Web Animations API, no hydration mismatch). |
| **Chips** | inline | White, full round, 13–14px, medium weight. |

---

## 4. Pages

### Home `/`

| # | Section | Idea |
|---|---|---|
| 1 | **Hero** | "YASHOME" set huge with the studio tag. The residence drawing rises from dusk to night as you scroll, with the pink ribbon and the drone. Two buttons. *(Signature motion 1)* |
| 2 | **Ils nous font confiance** | Partner logos on white tiles. |
| 3 | **Filmé par le studio. Vu sur Yashome.** | The promise shown as a path. A camera viewfinder plays a real clip (REC, live timecode, audio bars), and a pink line with a travelling dot leads to the same property live on Yashome (laptop and phone, "En ligne" badge). |
| 4 | **Nos réalisations** | The best piece of each folder (films and printed work). Pinned on desktop: the cards travel sideways as you scroll, with a progress line. Hovering one card blurs and dims the others. *(Signature motion 2)* |
| 5 | **Nos départements** | Six folders, 3 per row, and a wide navy "Pas sûr du dossier ?" strip. Each folder opens the projects page on its service. |
| 6 | **De la visite à la vente** | One property's week. The picture stays in place on the left and changes with the step you read on the right: visit, shoot, publish, measure. A progress bar under it. |
| 7 | **Pour qui on travaille** | Two cards: agencies (navy) and promoters (pink). |
| 8 | **Le studio de Yashome** | The tower lying on its side, the drone, and three navy cards with the notched corner. *(Signature motion 3, GSAP)* |
| 9 | **Contact** | Pink panel, short brief (property, need, city) that opens WhatsApp. |
| 10 | **Footer** | Navy panel, links, "YASHOME" at full width. |

### Projects `/realisations`

- The six folders.
- A tab row of the six services, with a pink pill that slides to the chosen one.
- For the chosen service: header (tagline, name, definition, services, button), then **all its projects** in a 4-column grid.
- `#dep-<id>` in the URL opens the right tab.

### Project `/projets/[slug]`

- **Top bar:** back link and position (e.g. 14 / 34).
- **Left, sticky:**
  - format, place, title and description
  - a 2×2 facts grid: client, place, service, format
  - the "Ce qu'on a fait" chips and the service's button
- **Right:** the picture or the full film (streamed from R2).
- **"Toutes les images":** the full gallery in a masonry grid.
- **"Du même département":** up to 3 other projects.
- **Previous / next:** each with a thumbnail.
- **Contact.**

**Transition:** clicking any project card morphs its picture into the project page (shared-element view transition) while the rest crossfades. Going back reverses it.

---

## 5. Motion system

The rule is three big moments and everything else quiet.

1. **Hero:** the residence and ribbon reveal, and dusk to night on scroll.
2. **Works:** the pinned horizontal scroll, and blur on the other cards.
3. **Studio:** the GSAP tower and drone.

Plus these small motions:
- **Section entrance:** fade and 40px rise, 1.1s, once.
- **Text:** MaskLine fade and 16px rise.
- **Hover:** photos zoom 1.03–1.06 over 0.9–1.1s; arrows turn 45°; pills slide (`layoutId`).
- **Press:** `.press` scales down slightly.
- **Page change:** shared-element morph 560ms with a light blur mid-flight; root crossfade 320ms.
- **Smooth scroll:** Lenis on desktop only (lerp 0.075); touch keeps native scroll.
- **Videos:** play only while on screen (IntersectionObserver); 6s previews load locally, and the full films load only on the project page.

---

## 6. Content and data

Everything lives in `src/data/site.ts`:

- **`departments`:** the six services. Each has `creations`, which are its projects (title, type, client, cover, `gallery`).
- **`works`:** the 7 films, with preview, poster and the R2 film URL.
- **`projects`:** built automatically from works and creations. One slug each; films share their work's slug.
- **`featured`:** the slugs shown in "Nos réalisations".
- **`method`, `bridge`, `audiences`, `about`, `contact`, `footer`:** section copy.

To add a project:
1. Drop the webp files in `public/projects/<folder>/`.
2. Add one `job(title, type, client, G(folder, [numbers]), tone, vertical?)` line to the right department.

### Assets

| Folder | Holds |
|---|---|
| `public/projects/` | `calendriers`, `depliants`, `identite`, `sacs`, `roll-up`, `backlights`, `affiches`, `social-riff`, `social-enjoy`: webp, at most 1800px |
| `public/folders/` | One photo per service, for the folder cards |
| `public/videos/` | 6s previews (mp4) and posters (jpg) |
| `public/images/` | Hero, devices, partners and illustrations |

---

## 7. Stack

| Part | Used |
|---|---|
| Framework | Next.js 16.4 App Router, React 19.3 (`<ViewTransition>`), TypeScript |
| Styling | Tailwind CSS v4 (`@theme`, `@utility`, `@custom-variant`) |
| Motion | `motion/react`; GSAP + ScrollTrigger (Studio section only); Lenis |
| Images | `next/image`, webp |
| Films | Cloudflare R2 |

---

## 8. Still placeholder

- Contact phone and WhatsApp number.
- Places of the projects ("Oran") and some client names.
- The figures in the weekly report, the "7 jours" delay and the "lumière de 17 h" tag.
- The Shooting photo and Web & mobile projects (samples until real files arrive).
