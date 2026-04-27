# Soluciones Eléctricas — PRD

## Original Problem Statement
Diseñar y desarrollar un sitio web profesional, moderno y confiable para una empresa de servicios eléctricos en Buenos Aires llamada **Soluciones Eléctricas**. Enfoque en conversión: solicitudes de presupuesto y contacto rápido. Estilo corporativo (azul oscuro #0F172A + amarillo eléctrico #FACC15), tipografía moderna, responsive, SEO local CABA.

## User Choices
- Formulario de contacto: envío por email (Resend)
- WhatsApp: 011 5152-7707 (mismo número que teléfono)
- Email destino: lucianaklein17@gmail.com
- Imágenes: stock temporal (Unsplash/Pexels) hasta que el cliente provea las propias
- Paleta: azul oscuro #0F172A + amarillo eléctrico #FACC15

## Architecture
- **Backend**: FastAPI + MongoDB (motor) + Resend SDK (asyncio.to_thread for non-blocking)
- **Frontend**: React 19 + Tailwind + Shadcn UI + Sonner (toasts) + Lucide icons
- **Fonts**: Montserrat (display/headings) + Inter (body)
- **Routing**: react-router-dom (single landing page at `/`)
- **API**: `/api/health`, `/api/contact` (POST/GET)

## Personas
- Vecinos CABA con problemas eléctricos en hogar
- Dueños de comercios que necesitan instalación/mantenimiento
- Administradores de edificios

## Implemented (April 2026)
- Landing page completa en español con 9 secciones: Navbar fijo, Hero con CTAs, Trust Banner overlapping, Sobre Nosotros con stats, 8 Servicios, Testimonios, Contacto (info + mapa Google Maps embed + formulario), CTA Final, Footer
- Botón flotante de WhatsApp (pulse-ring) + botón flotante de llamada (mobile)
- Formulario de presupuesto enviando email real vía Resend a lucianaklein17@gmail.com
- Persistencia de consultas en MongoDB (colección `contact_requests`)
- SEO básico: title + meta description en español
- Responsive mobile/tablet/desktop, mobile menu hamburguesa
- Todos los elementos interactivos con `data-testid`
- Tested: 100% backend, 95% frontend (única observación menor: validación HTML5 vs toast en form vacío — UX aceptable)

## Backlog
**P1**
- Reemplazar imágenes de stock por fotos reales del cliente (cuando las provea)
- Verificar dominio en Resend para enviar desde `@soluciones-electricas.com.ar` (actualmente usa `onboarding@resend.dev`)
- Panel admin simple para listar consultas

**P2**
- Galería de trabajos realizados
- Blog/SEO con artículos ("Cómo elegir un electricista", etc.)
- Integración Google Reviews (mostrar las 36 opiniones reales)
- Formulario WhatsApp con prefill de servicio seleccionado
- Schema.org LocalBusiness markup
- Analytics (GA4 / Meta Pixel)
- Multi-idioma (no aplica a este caso, mercado local)

**P3**
- Calculadora de presupuesto orientativo
- Sistema de turnos / agendamiento online
- Chat en vivo
