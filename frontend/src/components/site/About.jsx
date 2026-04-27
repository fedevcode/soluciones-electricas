import { CheckCircle2 } from "lucide-react";

const ABOUT_IMG =
  "https://images.pexels.com/photos/5767595/pexels-photo-5767595.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1200";

const stats = [
  { value: "+15", label: "Años de experiencia" },
  { value: "500+", label: "Obras completadas" },
  { value: "24h", label: "Respuesta promedio" },
  { value: "100%", label: "Atención personalizada" },
];

const points = [
  "Electricistas certificados y capacitados",
  "Trabajos con materiales certificados",
  "Cumplimiento con normas IRAM y AEA",
  "Presupuestos claros y sin sorpresas",
];

export default function About() {
  return (
    <section
      id="nosotros"
      data-testid="about-section"
      className="py-24 md:py-32 bg-[#F8FAFC]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="reveal">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Sobre nosotros
          </span>
          <h2 className="mt-3 font-display font-black text-3xl md:text-5xl text-[#0F172A] leading-tight tracking-tight">
            Empresa eléctrica de{" "}
            <span className="relative inline-block">
              <span className="relative z-10">confianza</span>
              <span className="absolute left-0 right-0 bottom-1 h-3 bg-[#FACC15]/60 -z-0" />
            </span>{" "}
            en CABA.
          </h2>
          <p className="mt-6 text-base md:text-lg text-slate-600 leading-relaxed">
            <strong className="text-[#0F172A]">Soluciones Eléctricas</strong> es una
            empresa especializada en servicios eléctricos en la Ciudad Autónoma de
            Buenos Aires. Brindamos soluciones seguras, eficientes y profesionales para
            instalaciones, reparaciones y mantenimiento eléctrico, tanto en hogares
            como en comercios.
          </p>
          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed">
            Nos destacamos por ofrecer{" "}
            <strong className="text-[#0F172A]">atención personalizada</strong>,
            compromiso con cada trabajo y un servicio respaldado por la confianza de
            nuestros clientes.
          </p>

          <ul className="mt-8 grid sm:grid-cols-2 gap-3">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-[#FACC15] shrink-0 mt-0.5" fill="#0F172A" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4 reveal" style={{ animationDelay: "0.15s" }}>
          <div className="col-span-2 row-span-1 rounded-2xl overflow-hidden h-64 md:h-80 shadow-lg">
            <img
              src={ABOUT_IMG}
              alt="Electricista profesional trabajando en tablero"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`rounded-2xl p-5 md:p-6 border ${
                i % 3 === 0
                  ? "bg-[#0F172A] text-white border-[#0F172A]"
                  : "bg-white border-slate-200"
              }`}
              data-testid={`about-stat-${i}`}
            >
              <div className={`font-display font-black text-3xl md:text-4xl ${i % 3 === 0 ? "text-[#FACC15]" : "text-[#0F172A]"}`}>
                {s.value}
              </div>
              <div className={`text-xs md:text-sm mt-1 ${i % 3 === 0 ? "text-slate-300" : "text-slate-500"}`}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
