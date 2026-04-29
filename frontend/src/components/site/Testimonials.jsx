import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "María Fernanda L.",
    role: "Vecina · Caballito",
    text: "Excelente atención y rapidez. Resolvieron un cortocircuito el mismo día. Muy recomendables.",
  },
  {
    name: "Diego R.",
    role: "Local comercial · Almagro",
    text: "Trabajo impecable y súper profesional. Renovaron el tablero de mi local en tiempo récord.",
  },
  {
    name: "Carolina M.",
    role: "Departamento · Villa Crespo",
    text: "Puntuales, responsables y muy prolijos. Dejaron todo limpio y funcionando perfecto.",
  },
  {
    name: "Martín S.",
    role: "Casa · Flores",
    text: "Instalaron el aire acondicionado en un día. Muy serios, el precio fue el acordado y sin sorpresas.",
  },
  {
    name: "Lucía P.",
    role: "Oficina · Microcentro",
    text: "Nos salvaron con una urgencia a la noche. Atendieron al toque y lo dejaron andando en 40 minutos.",
  },
  {
    name: "Ramiro G.",
    role: "Comercio · Palermo",
    text: "Contraté el mantenimiento anual y es lo mejor que hice. Nunca más tuve cortes imprevistos.",
  },
  {
    name: "Andrea V.",
    role: "Departamento · Belgrano",
    text: "Recargaron el gas del aire y lo dejaron como nuevo. Excelente trato, muy amables y prolijos.",
  },
  {
    name: "Pablo N.",
    role: "Casa · Devoto",
    text: "Presupuesto claro, sin vueltas. Cambiaron toda la iluminación por LED y quedó espectacular.",
  },
  {
    name: "Sofía T.",
    role: "Local · Recoleta",
    text: "Cumplieron con la fecha, presupuesto sin cargo y garantía por escrito. Un 10.",
  },
];

const AUTOPLAY_MS = 4500;

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
  });

  const [selected, setSelected] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  // Autoplay
  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const id = setInterval(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [emblaApi, isPaused]);

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

        {/* Carousel */}
        <div
          className="mt-14 relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          data-testid="testimonials-carousel"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6 touch-pan-y">
              {testimonials.map((t, i) => (
                <div
                  key={t.name}
                  className="shrink-0 grow-0 basis-full sm:basis-1/2 lg:basis-1/3"
                  data-testid={`testimonial-${i}`}
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-[#FACC15]/40 transition-colors flex flex-col h-full min-h-[280px]">
                    <div className="flex gap-0.5 mb-4">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 text-[#FACC15]" fill="#FACC15" />
                      ))}
                    </div>
                    <p className="text-slate-200 text-base leading-relaxed mb-8">
                      "{t.text}"
                    </p>
                    <div className="mt-auto pt-6 border-t border-white/10">
                      <div className="font-semibold text-white text-sm">{t.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-2">
              {scrollSnaps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Ir a opinión ${i + 1}`}
                  data-testid={`testimonial-dot-${i}`}
                  className={`h-1.5 rounded-full transition-all ${
                    selected === i
                      ? "w-8 bg-[#FACC15]"
                      : "w-4 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={scrollPrev}
                aria-label="Opinión anterior"
                data-testid="testimonial-prev"
                className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-white/20 text-white hover:bg-[#FACC15] hover:text-[#0F172A] hover:border-[#FACC15] transition-colors flex items-center justify-center"
              >
                <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
              </button>
              <button
                onClick={scrollNext}
                aria-label="Siguiente opinión"
                data-testid="testimonial-next"
                className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-[#FACC15] text-[#0F172A] hover:bg-[#EAB308] transition-colors flex items-center justify-center shadow-md"
              >
                <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
