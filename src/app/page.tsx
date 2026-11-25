import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { Partners } from "@/components/sections/partners";
import { Bridge } from "@/components/sections/bridge";
import { Works } from "@/components/sections/works";
import { Departments } from "@/components/sections/departments";
import { Method } from "@/components/sections/method";
import { Audiences } from "@/components/sections/audiences";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Partners />
        <Bridge />
        <Works />
        <Departments base="/realisations" withProjects={false} />
        <Method />
        <Audiences />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
