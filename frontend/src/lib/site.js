import { Zap, Phone, MessageCircle } from "lucide-react";

export const COMPANY = {
  name: "Soluciones Eléctricas",
  tagline: "Servicio profesional de electricidad para hogares, comercios y empresas",
  phoneDisplay: "011 5152-7707",
  phoneTel: "+541151527707",
  whatsappNumber: "541151527707",
  whatsappText:
    "Hola, vi su sitio web y quisiera solicitar un presupuesto para un servicio eléctrico.",
  website: "soluciones-electricas.com.ar",
  address: "Cid Campeador, C1405, Cdad. Autónoma de Buenos Aires",
  plusCode: "9HR3+VM Buenos Aires",
  rating: "5.0",
  reviews: 36,
  hours: [
    { day: "Lunes a Sábado", time: "9:00 a 17:00 hs" },
    { day: "Domingo", time: "Cerrado" },
  ],
};

export const waLink = `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(
  COMPANY.whatsappText
)}`;

export const telLink = `tel:${COMPANY.phoneTel}`;

export const mapEmbed =
  "https://www.google.com/maps?q=Cid+Campeador+CABA+Buenos+Aires&output=embed";

export const mapLink = "https://maps.google.com/?q=9HR3%2BVM+Buenos+Aires";

export { Zap, Phone, MessageCircle };
