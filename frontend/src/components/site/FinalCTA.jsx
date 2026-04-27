import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import { telLink } from "@/lib/site";

export default function FinalCTA() {
  return (
    <section
      data-testid="final-cta"
      className="relative py-24 md:py-32 bg-[#0F172A] overflow-hidden"
    >
      <div className="absolute inset-0 electric-grid opacity-50 pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#FACC15]/10 blur-3xl pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-6 md:px-10 text-center">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#FACC15]">
          Listos para ayudarte
        </span>
        <h2 className="mt-4 font-display font-black text-white text-3xl md:text-5xl lg:text-6xl leading-tight tracking-tight">
          ¿Necesitás un electricista
          <br />
          de <span className="text-[#FACC15]">confianza</span>?
        </h2>
        <p className="mt-6 text-lg text-slate-300 max-w-2xl mx-auto">
          Contactanos hoy y recibí atención profesional para tu instalación o
          reparación eléctrica. Presupuesto sin cargo y respuesta rápida.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            asChild
            data-testid="final-cta-quote"
            className="h-14 px-8 text-base bg-[#FACC15] text-[#0F172A] hover:bg-[#EAB308] font-bold rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
          >
            <a href="#contacto" className="inline-flex items-center gap-2">
              Solicitar presupuesto <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
          <Button
            asChild
            data-testid="final-cta-call"
            variant="outline"
            className="h-14 px-8 text-base bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0F172A] font-bold rounded-full"
          >
            <a href={telLink} className="inline-flex items-center gap-2">
              <Phone className="w-5 h-5" /> Llamar ahora
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
