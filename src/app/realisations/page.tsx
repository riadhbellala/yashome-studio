import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Departments } from "@/components/sections/departments";
import { Contact } from "@/components/sections/contact";

export const metadata: Metadata = {
  title: "Réalisations — Yashome Studio",
  description: "Tous les projets du studio, classés par département : shooting, vidéo, réseaux sociaux, branding et publicité.",
};

export default function Realisations() {
  return (
    <>
      <Header />
      <main id="top" className="pt-[76px]">
        <Departments />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
