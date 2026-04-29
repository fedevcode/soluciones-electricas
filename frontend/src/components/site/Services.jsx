import {
  Cable,
  Wrench,
  CalendarCheck,
  CircuitBoard,
  Lightbulb,
  Building2,
  Activity,
  Settings,
  AlertTriangle,
  Wind,
  PackageOpen,
  Snowflake,
} from "lucide-react";
import { waLinkForService } from "@/lib/site";

const services = [
  {
    icon: AlertTriangle,
    title: "Urgencias eléctricas",
    desc: "Atención inmediata ante cortocircuitos, cortes y emergencias en hogares y comercios.",
    urgent: true,
  },
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
    title: "Hogares, comercios e industrial",
    desc: "Soluciones a medida para departamentos, casas, locales, oficinas y naves industriales.",
  },
  {
    icon: Activity,
    title: "Diagnóstico y detección de fallas",
    desc: "Detectamos cortocircuitos, sobrecargas y fugas con instrumental profesional.",
  },
  {
    icon: Settings,
    title: "Servicio técnico profesional",
    desc: "Equipo certificado con experiencia comprobable en CABA y GBA.",
  },
  {
    icon: Wind,
    title: "Mantenimiento y reparación de AA",
    desc: "Service integral de aires acondicionados split, multi-split y ventana.",
  },
  {
    icon: PackageOpen,
    title: "Instalación y desinstalación de AA",
    desc: "Colocación y retiro profesional de equipos con soportes y caños certificados.",
  },
  {
    icon: Snowflake,
    title: "Recarga de gas de AA",
    desc: "Recarga y detección de fugas de gas refrigerante para devolverle la eficiencia a tu equipo.",
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
            Todo el trabajo eléctrico y de aires acondicionados que necesitás.
          </h2>
          <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed">
            Soluciones integrales para hogares, comercios e industria con materiales
            de primera calidad, presupuesto sin cargo y garantía.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 items-stretch">
          {services.map((s, i) => (
            <a
              key={s.title}
              href={waLinkForService(s.title)}
              target="_blank"
              rel="noreferrer"
              data-testid={`service-card-${i}`}
              className={`group relative rounded-2xl p-6 md:p-7 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col h-full ${
                s.urgent
                  ? "bg-[#0F172A] border-2 border-[#FACC15] text-white"
                  : "bg-white border-t-4 border-t-[#FACC15] border border-slate-200"
              }`}
            >
              {s.urgent && (
                <span className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-[#FACC15] text-[#0F172A] text-[10px] font-black uppercase tracking-widest shadow-md">
                  URGENTE
                </span>
              )}
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                s.urgent
                  ? "bg-[#FACC15]"
                  : "bg-[#0F172A] group-hover:bg-[#FACC15]"
              }`}>
                <s.icon
                  className={`w-6 h-6 transition-colors ${
                    s.urgent ? "text-[#0F172A]" : "text-[#FACC15] group-hover:text-[#0F172A]"
                  }`}
                  strokeWidth={2}
                />
              </div>
              <h3 className={`mt-5 font-display font-bold text-lg leading-snug ${s.urgent ? "text-white" : "text-[#0F172A]"}`}>
                {s.title}
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${s.urgent ? "text-slate-300" : "text-slate-600"}`}>
                {s.desc}
              </p>
              <div className={`mt-auto pt-5 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${
                s.urgent
                  ? "text-[#FACC15]"
                  : "text-slate-400 group-hover:text-[#0F172A]"
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                {s.urgent ? "Llamar urgente por WhatsApp →" : "Consultar por WhatsApp →"}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
