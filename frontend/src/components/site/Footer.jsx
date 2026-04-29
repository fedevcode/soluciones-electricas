import { Zap, Phone, MapPin, Clock } from "lucide-react";
import { COMPANY, telLink, waLink } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      data-testid="site-footer"
      className="bg-[#0B1220] text-slate-400 border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img
              src="https://customer-assets.emergentagent.com/job_electric-trust-ba/artifacts/0xgtygmf_logo%20se.jpg"
              alt="Soluciones Eléctricas"
              className="h-12 w-auto rounded-md object-contain"
            />
            <span className="font-display font-extrabold text-white text-lg uppercase">
              {COMPANY.name}
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed max-w-md">
            Empresa especializada en servicios eléctricos en la Ciudad Autónoma de
            Buenos Aires. Soluciones seguras, eficientes y profesionales para hogares y
            comercios.
          </p>
          <p className="mt-4 text-xs uppercase tracking-widest text-[#FACC15]">
            Electricista y service de aires acondicionados · CABA y GBA
          </p>
        </div>

        <div>
          <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-4">
            Contacto
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={telLink} className="flex items-start gap-2 hover:text-[#FACC15] transition" data-testid="footer-phone">
                <Phone className="w-4 h-4 mt-0.5 shrink-0" /> {COMPANY.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={waLink}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#FACC15] transition"
                data-testid="footer-whatsapp"
              >
                WhatsApp directo →
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              <span>Zona de trabajo: CABA y GBA</span>
            </li>
            <li className="text-xs text-slate-500">
              {COMPANY.website}
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-white text-sm uppercase tracking-widest mb-4">
            Horarios
          </h4>
          <ul className="space-y-2 text-sm">
            {COMPANY.hours.map((h) => (
              <li key={h.day} className="flex items-start gap-2">
                <Clock className="w-4 h-4 mt-0.5 shrink-0" />
                <span>
                  <span className="text-slate-300">{h.day}:</span> {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <span>© {year} {COMPANY.name}. Todos los derechos reservados.</span>
          <span>Servicio profesional · Trabajos garantizados · CABA y GBA</span>
        </div>
      </div>
    </footer>
  );
}
