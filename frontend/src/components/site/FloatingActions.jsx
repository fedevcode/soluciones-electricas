import { useEffect, useState } from "react";
import { MessageCircle, Phone, Facebook, Instagram } from "lucide-react";
import { waLink, telLink } from "@/lib/site";

const FACEBOOK_URL = "https://www.facebook.com/share/17F15bNGSa/";
const INSTAGRAM_URL = "https://www.instagram.com/electricidad_se";

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
          <MessageCircle
            className="w-7 h-7 md:w-8 md:h-8 text-white"
            fill="white"
            stroke="#25D366"
            strokeWidth={1.5}
          />
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
