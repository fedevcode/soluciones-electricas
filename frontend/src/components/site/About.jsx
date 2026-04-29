import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";

const ABOUT_IMAGES = [
  "https://customer-assets.emergentagent.com/job_electric-trust-ba/artifacts/hjip2fu0_1.jpeg",
  "https://customer-assets.emergentagent.com/job_electric-trust-ba/artifacts/mcl65vqb_2.jpeg",
  "https://customer-assets.emergentagent.com/job_electric-trust-ba/artifacts/l53iuxe4_3.jpeg",
  "https://customer-assets.emergentagent.com/job_electric-trust-ba/artifacts/0o84rwpj_4.jpeg",
];

const stats = [
  { value: "+10", label: "Años de experiencia" },
  { value: "100%", label: "Atención personalizada" },
];

const points = [
  "Electricista certificado y aires acondicionados",
  "Trabajos con materiales certificados",
  "Cumplimiento con normas IRAM y AEA",
  "Presupuestos claros y sin sorpresas",
];

const AUTOPLAY_MS = 4500;

export default function About() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || isPaused) return;
    const id = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [emblaApi, isPaused]);

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
            Empresa eléctrica de confianza en CABA y GBA.
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

        <div
          className="reveal"
          style={{ animationDelay: "0.15s" }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          data-testid="about-carousel"
        >
          {/* Carousel */}
          <div className="relative rounded-2xl overflow-hidden h-72 md:h-96 shadow-xl border border-slate-200 bg-[#0F172A]">
            <div className="overflow-hidden h-full" ref={emblaRef}>
              <div className="flex h-full">
                {ABOUT_IMAGES.map((src, i) => (
                  <div
                    key={src}
                    className="shrink-0 grow-0 basis-full h-full"
                    data-testid={`about-slide-${i}`}
                  >
                    <img
                      src={src}
                      alt={`Trabajo realizado por Soluciones Eléctricas ${i + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Arrows */}
            <button
              onClick={scrollPrev}
              aria-label="Imagen anterior"
              data-testid="about-prev"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white/90 hover:bg-[#FACC15] text-[#0F172A] flex items-center justify-center shadow-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2.5} />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Imagen siguiente"
              data-testid="about-next"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-[#FACC15] hover:bg-[#EAB308] text-[#0F172A] flex items-center justify-center shadow-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {ABOUT_IMAGES.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    selected === i ? "w-6 bg-[#FACC15]" : "w-3 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Stats below carousel */}
          <div className="mt-4 grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`rounded-2xl p-5 md:p-6 border ${
                  i === 0
                    ? "bg-[#0F172A] text-white border-[#0F172A]"
                    : "bg-white border-slate-200"
                }`}
                data-testid={`about-stat-${i}`}
              >
                <div className={`font-display font-black text-3xl md:text-4xl ${i === 0 ? "text-[#FACC15]" : "text-[#0F172A]"}`}>
                  {s.value}
                </div>
                <div className={`text-xs md:text-sm mt-1 ${i === 0 ? "text-slate-300" : "text-slate-500"}`}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
