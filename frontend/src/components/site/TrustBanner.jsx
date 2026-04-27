import { Star, ShieldCheck, Clock, Users } from "lucide-react";

const items = [
  { icon: Star, value: "5.0", label: "Calificación promedio", color: "text-[#FACC15]" },
  { icon: Users, value: "36+", label: "Opiniones verificadas", color: "text-[#0F172A]" },
  { icon: ShieldCheck, value: "100%", label: "Trabajos garantizados", color: "text-[#0F172A]" },
  { icon: Clock, value: "Lun–Sáb", label: "9 a 17 hs · CABA", color: "text-[#0F172A]" },
];

export default function TrustBanner() {
  return (
    <section
      data-testid="trust-banner"
      className="relative -mt-12 md:-mt-14 px-6 md:px-10 z-20"
    >
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200 overflow-hidden">
        {items.map((it, i) => (
          <div
            key={it.label}
            className="px-6 py-6 md:py-8 flex flex-col gap-1.5"
            data-testid={`trust-item-${i}`}
          >
            <div className="flex items-center gap-2">
              <it.icon className={`w-5 h-5 ${it.color}`} fill={i === 0 ? "#FACC15" : "none"} />
              <span className="font-display font-black text-2xl md:text-3xl text-[#0F172A]">
                {it.value}
              </span>
            </div>
            <span className="text-xs md:text-sm text-slate-500 font-medium">{it.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
