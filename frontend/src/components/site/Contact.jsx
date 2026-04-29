import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Phone, MessageCircle, MapPin, Clock, Mail, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMPANY, telLink, waLink, waLinkForQuote } from "@/lib/site";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SERVICES = [
  "Urgencias eléctricas",
  "Aire acondicionado",
  "Instalaciones eléctricas",
  "Reparaciones eléctricas",
  "Mantenimiento preventivo",
  "Tableros eléctricos",
  "Iluminación interior y exterior",
  "Diagnóstico y detección de fallas",
  "Servicio para hogares",
  "Servicio para comercios",
  "Otro / Consulta general",
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    service: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: typeof e === "string" ? e : e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    if (!form.name || !form.message) {
      toast.error("Completá los campos obligatorios.");
      return;
    }

    setLoading(true);
    const payload = {
      name: form.name,
      email: "no-aportado@soluciones-electricas.com.ar",
      phone: "No aportado",
      service: form.service || "Consulta general",
      message: form.message,
    };

    // 1) Open WhatsApp with the prefilled message (primary delivery channel)
    const waUrl = waLinkForQuote(payload);
    const waWindow = window.open(waUrl, "_blank", "noopener,noreferrer");
    if (!waWindow) {
      window.location.href = waUrl;
    }

    // 2) Save to backend in the background (non-blocking for UX)
    try {
      await axios.post(`${API}/contact`, payload);
    } catch (err) {
      console.error("Backend save failed:", err);
    }

    toast.success("¡Listo! Te redirigimos a WhatsApp con tu consulta.");
    setForm({ name: "", service: "", message: "" });
    setLoading(false);
  };

  return (
    <section
      id="contacto"
      data-testid="contact-section"
      className="py-24 md:py-32 bg-[#F8FAFC]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
            Contacto rápido
          </span>
          <h2 className="mt-3 font-display font-black text-3xl md:text-5xl text-[#0F172A] leading-tight tracking-tight">
            Pedinos un presupuesto sin cargo.
          </h2>
          <p className="mt-5 text-base md:text-lg text-slate-600 leading-relaxed">
            Respondemos dentro del horario comercial. También podés llamarnos o
            escribirnos por WhatsApp para una atención inmediata.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-5 gap-8">
          {/* Info column */}
          <div className="lg:col-span-2 space-y-4">
            <InfoCard
              icon={Phone}
              title="Teléfono"
              text={COMPANY.phoneDisplay}
              href={telLink}
              cta="Llamar ahora"
              testid="info-phone"
              dark
            />
            <InfoCard
              icon={MessageCircle}
              title="WhatsApp"
              text={COMPANY.phoneDisplay}
              href={waLink}
              external
              cta="Enviar mensaje"
              testid="info-whatsapp"
              accent
            />
            <InfoCard
              icon={MapPin}
              title="Zona de trabajo"
              text={
                <span>
                  Trabajamos en toda{" "}
                  <strong className="text-[#0F172A]">CABA y GBA</strong> — Capital
                  Federal y Gran Buenos Aires.
                </span>
              }
              testid="info-address"
            />
            <InfoCard
              icon={Clock}
              title="Horarios de atención"
              text={
                <>
                  {COMPANY.hours.map((h) => (
                    <div key={h.day} className="flex justify-between gap-4 text-sm">
                      <span className="text-slate-600">{h.day}</span>
                      <span className="font-semibold text-[#0F172A]">{h.time}</span>
                    </div>
                  ))}
                </>
              }
              testid="info-hours"
              tag="Respuesta dentro del horario comercial"
            />
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={onSubmit}
              data-testid="quote-form"
              className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 md:p-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" fill="white" stroke="#25D366" strokeWidth={1.5} />
                </span>
                <div>
                  <h3 className="font-display font-bold text-xl text-[#0F172A]">
                    Solicitar Presupuesto por WhatsApp
                  </h3>
                  <p className="text-sm text-slate-500">Sin cargo · Respuesta directa por WhatsApp</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <FormField label="Nombre completo" required className="sm:col-span-2">
                  <Input
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Juan Pérez"
                    data-testid="form-name"
                    required
                  />
                </FormField>
                <FormField label="Tipo de servicio" className="sm:col-span-2">
                  <Select value={form.service} onValueChange={update("service")}>
                    <SelectTrigger data-testid="form-service">
                      <SelectValue placeholder="Seleccioná un servicio" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((s) => (
                        <SelectItem key={s} value={s} data-testid={`service-option-${s}`}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormField>
                <FormField label="Mensaje" required className="sm:col-span-2">
                  <Textarea
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Contanos brevemente qué necesitás (zona, urgencia, detalles)..."
                    rows={5}
                    data-testid="form-message"
                    required
                  />
                </FormField>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <p className="text-xs text-slate-500 flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  Tu consulta se envía por WhatsApp para una respuesta más rápida.
                </p>
                <Button
                  type="submit"
                  disabled={loading}
                  data-testid="form-submit-btn"
                  className="bg-[#25D366] text-white hover:bg-[#1ebe57] font-bold rounded-full h-12 px-7 shadow-md hover:shadow-lg transition-all"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" /> Abriendo WhatsApp...
                    </>
                  ) : (
                    <>
                      Enviar por WhatsApp <MessageCircle className="w-4 h-4 ml-2" fill="white" stroke="#25D366" strokeWidth={1.5} />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({ label, required, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <Label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label} {required && <span className="text-[#FACC15]">*</span>}
      </Label>
      {children}
    </div>
  );
}

function InfoCard({ icon: Icon, title, text, href, external, cta, testid, dark, accent, tag }) {
  const className = `rounded-2xl border p-5 transition-colors ${
    dark
      ? "bg-[#0F172A] border-[#0F172A] text-white"
      : accent
      ? "bg-[#FACC15] border-[#FACC15] text-[#0F172A]"
      : "bg-white border-slate-200 text-[#0F172A] hover:border-[#FACC15]"
  }`;
  return (
    <div className={className} data-testid={testid}>
      <div className="flex items-start gap-3">
        <span
          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
            dark ? "bg-[#FACC15] text-[#0F172A]" : accent ? "bg-[#0F172A] text-[#FACC15]" : "bg-[#0F172A] text-[#FACC15]"
          }`}
        >
          <Icon className="w-5 h-5" />
        </span>
        <div className="flex-1 min-w-0">
          <div className={`text-xs font-semibold uppercase tracking-widest ${dark ? "text-[#FACC15]" : accent ? "text-[#0F172A]/80" : "text-slate-500"}`}>
            {title}
          </div>
          <div className={`mt-1 font-semibold ${dark || accent ? "" : "text-[#0F172A]"}`}>
            {text}
          </div>
          {tag && (
            <div className="mt-2 inline-block text-xs font-medium px-2 py-0.5 rounded-full bg-[#FACC15]/20 text-[#0F172A] border border-[#FACC15]/40">
              {tag}
            </div>
          )}
          {href && cta && (
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className={`mt-3 inline-flex items-center text-xs font-bold underline-offset-4 hover:underline ${
                dark ? "text-[#FACC15]" : accent ? "text-[#0F172A]" : "text-[#0F172A]"
              }`}
            >
              {cta} →
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
