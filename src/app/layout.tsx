import type { Metadata } from "next";
import { Archivo, Poppins } from "next/font/google";
import { SmoothScroll } from "@/components/layout/smooth-scroll";
import { SectionFade } from "@/components/motion/section-fade";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yashome Studio — Shooting, drone et publicité immobilière",
  description:
    "Le studio digital de Yashome : shooting photo, vidéo, drone, visite 360° et publicité pour les agences immobilières et les promoteurs en Algérie.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${archivo.variable} ${poppins.variable}`}>
      <body>
        <SmoothScroll />
        <SectionFade />
        {children}
      </body>
    </html>
  );
}
