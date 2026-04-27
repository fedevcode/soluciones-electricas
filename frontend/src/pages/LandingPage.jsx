import { useEffect } from "react";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import TrustBanner from "@/components/site/TrustBanner";
import About from "@/components/site/About";
import Services from "@/components/site/Services";
import Testimonials from "@/components/site/Testimonials";
import Contact from "@/components/site/Contact";
import FinalCTA from "@/components/site/FinalCTA";
import Footer from "@/components/site/Footer";
import FloatingActions from "@/components/site/FloatingActions";

export default function LandingPage() {
  useEffect(() => {
    document.title = "Soluciones Eléctricas en Buenos Aires · Electricistas certificados CABA";
    const meta = document.querySelector('meta[name="description"]') || document.createElement("meta");
    meta.name = "description";
    meta.content =
      "Empresa de servicios eléctricos en CABA. Instalaciones, reparaciones y mantenimiento profesional para hogares y comercios. Calificación 5.0 ★ — Pedí presupuesto sin cargo.";
    if (!meta.parentNode) document.head.appendChild(meta);
  }, []);

  return (
    <div data-testid="landing-page">
      <Navbar />
      <main>
        <Hero />
        <TrustBanner />
        <About />
        <Services />
        <Testimonials />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  );
}
