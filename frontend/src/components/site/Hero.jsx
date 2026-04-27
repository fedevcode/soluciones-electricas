import { Button } from "@/components/ui/button";
import { Phone, ShieldCheck, Clock, Award } from "lucide-react";
import { telLink } from "@/lib/site";

const HERO_BG =
  "https://images.pexels.com/photos/33694034/pexels-photo-33694034.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1600";

export default function Hero() {
  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative min-h-[92vh] flex items-center bg-[#0F172A] overflow-hidden pt-20"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_BG})` }}
        aria-hidden="true"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/90 to-[#0F172A]/40" />
      <div className="absolute inset-0 electric-grid opacity-40" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full grid lg:grid-cols-12 gap-12 items-center py-16">
        <div className="lg:col-span-8 reveal">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FACC15]/15 border border-[#FACC15]/30 text-[#FACC15] text-xs font-semibold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15] animate-pulse" />
            Electricistas matriculados · CABA
          </span>

          <h1
            data-testid="hero-title"
            className="mt-6 font-display font-black text-white text-[2.5rem] sm:text-5xl lg:text-7xl leading-[1.02] tracking-tight"
          >
            Soluciones Eléctricas
            <br />
            <span className="text-[#FACC15]">en Buenos Aires</span>
          </h1>

          <p
            data-testid="hero-subtitle"
            className="mt-6 text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed"
          >
            Servicio profesional de electricidad para hogares, comercios y empresas.
            Atención <strong className="text-white">confiable, rápida y segura</strong>{" "}
            — instalaciones, reparaciones y mantenimiento con garantía escrita.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              data-testid="hero-cta-quote"
              className="h-14 px-8 text-base bg-[#FACC15] text-[#0F172A] hover:bg-[#EAB308] font-bold rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
            >
              <a href="#contacto">Solicitar Presupuesto</a>
            </Button>
            <Button
              asChild
              data-testid="hero-cta-call"
              variant="outline"
              className="h-14 px-8 text-base bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#0F172A] font-bold rounded-full"
            >
              <a href={telLink} className="inline-flex items-center gap-2">
                <Phone className="w-5 h-5" /> Llamar Ahora
              </a>
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-xl">
            {[
              { icon: ShieldCheck, label: "Trabajo Seguro" },
              { icon: Clock, label: "Respuesta Rápida" },
              { icon: Award, label: "Garantía Escrita" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-start gap-2 p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-sm"
                data-testid={`hero-badge-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <item.icon className="w-5 h-5 text-[#FACC15]" />
                <span className="text-xs sm:text-sm font-semibold text-white">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block lg:col-span-4 reveal" style={{ animationDelay: "0.2s" }}>
          <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#0F172A]/40 backdrop-blur-sm">
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <span className="text-[#FACC15] text-xs font-bold uppercase tracking-widest">
                Calificación verificada
              </span>
              <span className="text-white font-display font-black text-xl">5.0 ★</span>
            </div>
            <div className="px-6 py-5 space-y-3">
              {["Atención profesional", "Respuesta rápida", "Servicio confiable", "Clientes satisfechos"].map(
                (b) => (
                  <div key={b} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FACC15]" />
                    <span className="text-sm text-slate-200">{b}</span>
                  </div>
                )
              )}
            </div>
            <div className="px-6 py-4 bg-[#FACC15]/10 border-t border-[#FACC15]/30 text-xs text-slate-200">
              <span className="font-bold text-[#FACC15]">36 opiniones</span> verificadas
              de Google y clientes locales.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
