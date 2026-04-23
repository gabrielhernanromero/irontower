import { Header, Footer } from "@/components/layout";
import {
  Hero,
  WhyUs,
  Services,
  About,
  Industries,
  Training,
  FireSection,
  Testimonials,
  Contact,
  FAQ,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <WhyUs />
        <Services />
        <About />
        <Industries />
        <Training />
        <FireSection />
        <Testimonials />
        <Contact />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
