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

// Build a wa.me link with arbitrary text
export const buildWaLink = (text) =>
  `https://wa.me/${COMPANY.whatsappNumber}?text=${encodeURIComponent(text)}`;

// Default link
export const waLink = buildWaLink(COMPANY.whatsappText);

// Service-specific WhatsApp link (used in Services cards)
export const waLinkForService = (service) =>
  buildWaLink(
    `Hola, vi su sitio web y quisiera consultar por el servicio de *${service}*. ¿Me podrían pasar información y presupuesto? Gracias.`
  );

// Quote request WhatsApp link (used in contact form)
export const waLinkForQuote = ({ name, email, phone, service, message }) => {
  const lines = [
    "Hola, quisiera *solicitar un presupuesto*. Estos son mis datos:",
    "",
    `*Nombre:* ${name || "-"}`,
    `*Teléfono:* ${phone || "-"}`,
    `*Email:* ${email || "-"}`,
    `*Servicio:* ${service || "Consulta general"}`,
    "",
    "*Detalle:*",
    message || "-",
  ];
  return buildWaLink(lines.join("\n"));
};

export const telLink = `tel:${COMPANY.phoneTel}`;

export const mapEmbed =
  "https://www.google.com/maps?q=Cid+Campeador+CABA+Buenos+Aires&output=embed";

export const mapLink = "https://maps.google.com/?q=9HR3%2BVM+Buenos+Aires";

export { Zap, Phone, MessageCircle };
