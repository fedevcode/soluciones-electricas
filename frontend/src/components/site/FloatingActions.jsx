import { useEffect, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { waLink, telLink } from "@/lib/site";

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
      {/* WhatsApp - always visible */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        data-testid="floating-whatsapp"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-5 right-5 md:bottom-7 md:right-7 z-[60] w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#25D366] hover:bg-[#1ebe57] flex items-center justify-center shadow-2xl pulse-ring transition-transform hover:scale-110"
      >
        <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white" fill="white" stroke="#25D366" strokeWidth={1.5} />
      </a>

      {/* Mobile-only quick call - shows after scroll */}
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
