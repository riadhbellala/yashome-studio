"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { contact } from "@/data/site";
import { Button } from "@/components/ui/button";
import { RIBBON_PATH, RIBBON_VIEWBOX } from "@/components/ui/ribbon";
import { MaskLine } from "@/components/motion/reveal";

const EASE = [0.23, 1, 0.32, 1] as const;
const PROPERTIES = ["Villa", "Appartement", "Résidence", "Projet sur plan"];
const NEEDS = ["Shooting photo", "Vidéo & reels", "Drone", "Publicité", "Identité"];

function Chip({ label, on, onClick }: { label: string; on: boolean; onClick: () => void }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className={`press h-11 rounded-full px-4 text-[14px] font-medium ${on ? "bg-second text-white" : "bg-ground text-second hover-fine:bg-sand"}`}>
      {label}
    </button>
  );
}

/** A short brief instead of a form: three choices become a ready-to-send WhatsApp message. */
export function Contact() {
  const reduce = useReducedMotion();
  const [property, setProperty] = useState(PROPERTIES[0]);
  const [needs, setNeeds] = useState<string[]>([NEEDS[0]]);
  const [city, setCity] = useState("");

  const toggle = (n: string) => setNeeds((v) => (v.includes(n) ? v.filter((x) => x !== n) : [...v, n]));
  const place = city.trim() ? ` à ${city.trim()}` : "";
  const wanted = needs.length ? needs.join(", ").toLowerCase() : "un accompagnement";
  const message = `Bonjour Yashome Studio, j’ai un bien à mettre en avant : ${property.toLowerCase()}${place}. Je cherche : ${wanted}.`;
  const href = `${contact.whatsapp.href}?text=${encodeURIComponent(message)}`;

  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 bg-ground section-y">
      <div className="wrap">
        <div className="relative isolate overflow-hidden rounded-[var(--radius-card)] bg-main p-5 text-white sm:p-8 lg:p-14">
          <svg aria-hidden viewBox={RIBBON_VIEWBOX} fill="none" className="pointer-events-none absolute -left-[28%] bottom-[-3%] -z-10 w-[120%] lg:-left-[12%] lg:w-[78%]">
            <path d={RIBBON_PATH} stroke="#E00046" strokeWidth={75} strokeMiterlimit={10} />
          </svg>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-5">
            <div className="flex flex-col justify-between gap-10 px-1 lg:col-span-6 lg:px-0 lg:pr-10">
              <div>
                <h2 id="contact-title" className="font-display t-h2">
                  <MaskLine>Votre prochain</MaskLine>
                  <MaskLine delay={0.08}>bien mérite</MaskLine>
                  <MaskLine delay={0.16}>son film.</MaskLine>
                </h2>
                <p className="mt-6 max-w-[420px] text-[17px] leading-[1.6]">{contact.lead}</p>
              </div>
              <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[15px] font-medium">
                <li><a href={contact.email.href} className="underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white">{contact.email.label}</a></li>
                <li><a href={contact.phone.href} className="underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white">{contact.phone.label}</a></li>
              </ul>
            </div>

            <motion.form
              onSubmit={(e) => e.preventDefault()}
              aria-label="Préparer votre demande"
              initial={{ opacity: 0, y: reduce ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="rounded-[var(--radius-card)] bg-white p-6 text-second md:p-9 lg:col-span-6"
            >
              <fieldset>
                <legend className="font-display t-h5">Votre bien</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {PROPERTIES.map((p) => <Chip key={p} label={p} on={p === property} onClick={() => setProperty(p)} />)}
                </div>
              </fieldset>
              <fieldset className="mt-8">
                <legend className="font-display t-h5">Ce qu’il vous faut</legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {NEEDS.map((n) => <Chip key={n} label={n} on={needs.includes(n)} onClick={() => toggle(n)} />)}
                </div>
              </fieldset>
              <label className="mt-8 block">
                <span className="font-display t-h5">Votre ville</span>
                <input value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" placeholder="Oran, Alger, Constantine…" className="mt-4 h-12 w-full rounded-full bg-ground px-5 text-[16px] text-second outline-none transition-shadow placeholder:text-text-gray focus:ring-2 focus:ring-main" />
              </label>
              <Button href={href} external className="mt-8 flex w-full">{contact.whatsapp.label}</Button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
