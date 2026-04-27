import { useEffect, useState } from "react";
import { Zap, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { telLink, COMPANY } from "@/lib/site";

const links = [
  { href: "#servicios", label: "Servicios" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#contacto", label: "Contacto" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="site-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F172A]/95 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-[#0F172A]/85 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 md:h-20 flex items-center justify-between">
        <a
          href="#top"
          className="flex items-center gap-2 group"
          data-testid="logo-link"
        >
          <span className="w-9 h-9 rounded-lg bg-[#FACC15] flex items-center justify-center shadow-md group-hover:rotate-6 transition-transform">
            <Zap className="w-5 h-5 text-[#0F172A]" strokeWidth={2.6} />
          </span>
          <span className="font-display font-extrabold text-white text-lg tracking-tight">
            {COMPANY.name}
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-slate-200 hover:text-[#FACC15] transition-colors"
              data-testid={`nav-link-${l.label.toLowerCase()}`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a
            href={telLink}
            className="text-sm text-slate-200 font-semibold hover:text-[#FACC15] transition"
            data-testid="navbar-phone"
          >
            {COMPANY.phoneDisplay}
          </a>
          <Button
            asChild
            data-testid="navbar-quote-btn"
            className="bg-[#FACC15] text-[#0F172A] hover:bg-[#EAB308] font-bold rounded-full px-5"
          >
            <a href="#contacto">Solicitar Presupuesto</a>
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-white p-2"
          aria-label="Toggle menu"
          data-testid="mobile-menu-toggle"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-[#0F172A] border-t border-white/10 px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-slate-200 hover:text-[#FACC15] py-2 font-medium"
              data-testid={`mobile-nav-${l.label.toLowerCase()}`}
            >
              {l.label}
            </a>
          ))}
          <Button
            asChild
            data-testid="mobile-quote-btn"
            className="bg-[#FACC15] text-[#0F172A] hover:bg-[#EAB308] font-bold w-full"
          >
            <a href="#contacto" onClick={() => setOpen(false)}>
              Solicitar Presupuesto
            </a>
          </Button>
        </div>
      )}
    </header>
  );
}
