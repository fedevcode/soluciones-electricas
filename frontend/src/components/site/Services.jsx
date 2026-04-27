import {
  Cable,
  Wrench,
  CalendarCheck,
  CircuitBoard,
  Lightbulb,
  Building2,
  Activity,
  Settings,
} from "lucide-react";

const services = [
  {
    icon: Cable,
    title: "Instalaciones eléctricas",
    desc: "Instalaciones nuevas para hogares y comercios bajo normas vigentes.",
  },
  {
    icon: Wrench,
    title: "Reparaciones eléctricas",
    desc: "Diagnóstico y reparación de fallas con respuesta rápida.",
  },
  {
    icon: CalendarCheck,
    title: "Mantenimiento preventivo",
    desc: "Planes para evitar cortes y prolongar la vida útil de tus instalaciones.",
  },
  {
    icon: CircuitBoard,
    title: "Tableros eléctricos",
    desc: "Armado, ampliación y normalización de tableros con materiales certificados.",
  },
  {
    icon: Lightbulb,
    title: "Iluminación interior y exterior",
    desc: "Diseño y colocación de iluminación LED, decorativa y de seguridad.",
  },
  {
    icon: Building2,
    title: "Hogares y comercios",
    desc: "Soluciones a medida para departamentos, casas, locales y oficinas.",
  },
  {
    icon: Activity,
    title: "Diagnóstico y detección de fallas",
    desc: "Detectamos cortocircuitos, sobrecargas y fugas con instrumental profesional.",
  },
  {
    icon: Settings,
    title: "Servicio técnico profesional",
    desc: "Equipo matriculado con experiencia comprobable en CABA.",
  },
];

export default function Services() {
  return (
    <section
      id="servicios"
      data-testid="services-section"
      className="py-24 md:py-32 bg-white"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Nuestros servicios
          </span>
          <h2 className="mt-3 font-display font-black text-3xl md:text-5xl text-[#0F172A] leading-tight tracking-tight">
            Todo el trabajo eléctrico que tu hogar o comercio necesita.
          </h2>
          <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed">
            Soluciones integrales con materiales de primera calidad, presupuesto sin
            cargo y garantía escrita.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              data-testid={`service-card-${i}`}
              className="group relative bg-white rounded-2xl border-t-4 border-t-[#FACC15] border border-slate-200 p-6 md:p-7 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0F172A] flex items-center justify-center group-hover:bg-[#FACC15] transition-colors">
                <s.icon className="w-6 h-6 text-[#FACC15] group-hover:text-[#0F172A] transition-colors" strokeWidth={2} />
              </div>
              <h3 className="mt-5 font-display font-bold text-lg text-[#0F172A] leading-snug">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              <div className="mt-5 text-xs font-semibold text-slate-400 group-hover:text-[#0F172A] transition-colors">
                Consultar →
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
