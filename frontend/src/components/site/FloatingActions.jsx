import { useEffect, useState } from "react";
import { Phone, Facebook, Instagram } from "lucide-react";
import { waLink, telLink } from "@/lib/site";

const FACEBOOK_URL = "https://www.facebook.com/share/17F15bNGSa/";
const INSTAGRAM_URL = "https://www.instagram.com/electricidad_se";

// Official WhatsApp glyph
const WhatsAppIcon = ({ className = "" }) => (
  <svg
    className={className}
    viewBox="0 0 32 32"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.4-.545-.484-1.09-1.075-1.546-1.633-.413-.498-.668-.823-.668-1.082v-.064c.014-.29.215-.453.34-.654.116-.18.243-.387.357-.572.115-.186.2-.376.286-.56.23-.487.143-.737-.115-1.244-.515-1.014-.94-1.916-1.376-2.913-.173-.398-.4-.487-.802-.487-.057 0-.116 0-.172.005-.087.01-.187.01-.296.01-.21 0-.41-.01-.59-.01-.4 0-.66.16-.917.39-.91.81-1.243 1.79-1.243 2.913 0 1.073.376 2.083 1.27 3.34 1.523 2.143 3.6 4.103 5.997 5.06.83.353 1.477.567 1.946.726.78.247 1.39.317 1.946.317.247 0 .456-.016.617-.04.643-.106 2.022-.83 2.305-1.624.273-.78.273-1.464.196-1.605-.07-.13-.27-.21-.572-.36zm-3.118 7.21h-.014c-2.094 0-4.155-.564-5.953-1.626l-.43-.252-4.42 1.16 1.18-4.31-.282-.45A11.96 11.96 0 014 16c0-6.65 5.42-12.06 12.07-12.06 3.225 0 6.252 1.255 8.527 3.534A12.04 12.04 0 0128.13 16c0 6.65-5.42 12.06-12.07 12.06zm10.25-22.31C23.526 1.16 19.864-.34 16.07-.34 7.84-.34 1.13 6.37 1.13 14.6c0 2.633.69 5.205 1.997 7.476L1 32l10.124-2.65a14.84 14.84 0 005.075.92h.005c8.23 0 14.94-6.71 14.94-14.94 0-3.99-1.55-7.745-4.378-10.575z" />
  </svg>
);

export default function FloatingActions() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Right stack: Instagram (top), Facebook, WhatsApp (bottom) */}
      <div className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[60] flex flex-col items-center gap-3">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          data-testid="floating-instagram"
          aria-label="Seguinos en Instagram"
          className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110"
          style={{
            background:
              "radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
          }}
        >
          <Instagram className="w-5 h-5 md:w-6 md:h-6 text-white" strokeWidth={2} />
        </a>

        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noreferrer"
          data-testid="floating-facebook"
          aria-label="Seguinos en Facebook"
          className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#1877F2] hover:bg-[#0b6edc] flex items-center justify-center shadow-xl transition-transform hover:scale-110"
        >
          <Facebook className="w-5 h-5 md:w-6 md:h-6 text-white" fill="white" strokeWidth={0} />
        </a>

        <a
          href={waLink}
          target="_blank"
          rel="noreferrer"
          data-testid="floating-whatsapp"
          aria-label="Contactar por WhatsApp"
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] hover:bg-[#1ebe57] flex items-center justify-center shadow-2xl pulse-ring transition-transform hover:scale-110"
        >
          <WhatsAppIcon className="w-7 h-7 md:w-8 md:h-8 text-white" />
        </a>
      </div>

      {/* Mobile-only quick call - bottom left */}
      <a
        href={telLink}
        data-testid="floating-call"
        aria-label="Llamar ahora"
        className={`md:hidden fixed bottom-5 left-5 z-[60] w-14 h-14 rounded-full bg-[#FACC15] hover:bg-[#EAB308] flex items-center justify-center shadow-2xl transition-all ${
          show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <Phone className="w-6 h-6 text-[#0F172A]" strokeWidth={2.6} />
      </a>
    </>
  );
}
