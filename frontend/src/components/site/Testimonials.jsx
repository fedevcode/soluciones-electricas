import { Star } from "lucide-react";

const testimonials = [
  {
    name: "María Fernanda L.",
    role: "Vecina · Caballito",
    text: "Excelente atención y rapidez. Resolvieron un cortocircuito el mismo día. Muy recomendables.",
    rating: 5,
  },
  {
    name: "Diego R.",
    role: "Local comercial · Almagro",
    text: "Trabajo impecable y súper profesional. Renovaron el tablero de mi local en tiempo récord.",
    rating: 5,
  },
  {
    name: "Carolina M.",
    role: "Departamento · Villa Crespo",
    text: "Puntuales, responsables y muy prolijos. Dejaron todo limpio y funcionando perfecto.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section
      id="opiniones"
      data-testid="testimonials-section"
      className="py-24 md:py-32 bg-[#0F172A] relative overflow-hidden"
    >
      <div className="absolute inset-0 electric-grid opacity-40 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#FACC15]">
              Opiniones reales
            </span>
            <h2 className="mt-3 font-display font-black text-3xl md:text-5xl text-white leading-tight tracking-tight">
              Lo que dicen nuestros clientes.
            </h2>
            <p className="mt-5 text-base md:text-lg text-slate-300 leading-relaxed">
              Más de 36 opiniones verificadas con calificación promedio de{" "}
              <strong className="text-[#FACC15]">5.0 estrellas</strong>.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
            <div className="font-display font-black text-4xl text-[#FACC15]">5.0</div>
            <div>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-[#FACC15]" fill="#FACC15" />
                ))}
              </div>
              <div className="text-xs text-slate-300 mt-1">Basado en 36 opiniones</div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              data-testid={`testimonial-${i}`}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-[#FACC15]/40 transition-colors"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(t.rating)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 text-[#FACC15]" fill="#FACC15" />
                ))}
              </div>
              <p className="text-slate-200 text-base leading-relaxed">"{t.text}"</p>
              <div className="mt-6 pt-5 border-t border-white/10">
                <div className="font-semibold text-white text-sm">{t.name}</div>
                <div className="text-xs text-slate-400 mt-0.5">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
