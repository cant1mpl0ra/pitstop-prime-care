# Pitstop Prime Care

Crea la web corporativa premium y profesional de PIT STOP MOTOR, un taller mecánico moderno en Lleida. Debe parecer la web de una marca de automoción seria y tecnológica, no una plantilla genérica ni un taller de barrio.

IDENTIDAD
- Marca: PIT STOP MOTOR
- Slogan principal: “CADA SEGUNDO CUENTA.”
- Estética: premium, técnica, deportiva y limpia.
- Paleta: negro/antracita como base, blanco, rojo y azul como acentos. Evitar exceso de neón.
- Tipografía contundente y moderna, excelente legibilidad.
- Sensación visual: precisión, velocidad, confianza, transparencia y tecnología.
- Diseño responsive impecable en iPhone, móvil, tablet y escritorio.
- Animaciones sutiles y elegantes, no recargadas.
- No inventar precios, promociones, premios ni reseñas reales.

OBJETIVO DE NEGOCIO
La web debe convertir visitantes en citas, transmitir confianza y diferenciar PIT STOP MOTOR mediante transparencia digital. No quiero una web solo bonita: quiero una herramienta comercial.

ESTRUCTURA
1. Header fijo y elegante con logo editable, Inicio, Servicios, Cómo trabajamos, Presupuesto digital, Seguimiento, Opiniones, Contacto, “Pedir cita” y “Mi cuenta”.
2. Hero impactante a pantalla completa:
   - PIT STOP MOTOR
   - “CADA SEGUNDO CUENTA.”
   - texto breve sobre rapidez, transparencia y mantenimiento profesional
   - CTA principal “Pedir cita”
   - CTA secundario “Ver servicios”
   - fotografía/visual automoción premium oscura, sin look de stock barato.
3. Bloque de confianza con mensajes breves sobre diagnóstico claro, autorización previa y seguimiento.
4. Servicios:
   - Aceite + filtro
   - Revisión completa
   - Neumáticos
   - Frenos
   - Diagnosis
   - Aire acondicionado
   - Pre-ITV
   - “No sé qué le pasa”
   Cada servicio con icono sobrio, descripción breve y CTA para reservar.
5. “Cómo trabajamos” en pasos visuales: reserva → recepción → diagnóstico → presupuesto digital → autorización → reparación → control de calidad → vehículo listo.
6. Sección diferencial “Presupuesto digital”:
   - explicar qué se cambia y por qué
   - imagen/vídeo explicativo genérico de la reparación
   - fotos reales del coche del cliente y nota del mecánico
   - trabajos necesarios y recomendados
   - autorización digital del importe
   - mockup visual premium tipo móvil.
7. Sección “Sigue tu reparación” con estados: vehículo recibido, diagnóstico, presupuesto enviado, autorizado, reparación, control de calidad, listo para recoger. Añadir mockup elegante de app/área cliente.
8. Sección “Por qué PIT STOP MOTOR”: transparencia, rapidez, tecnología, profesionalidad, comunicación.
9. Opiniones: usar únicamente tarjetas de demostración claramente marcadas como ejemplos, sin inventar reseñas reales.
10. Contacto:
   - Lleida
   - horario L-V 08:30–19:00, sábado 09:00–13:00
   - teléfono/email/dirección exacta/WhatsApp como campos editables o placeholders claramente identificados, sin inventarlos.
   - CTA “Pedir cita”.
11. Footer profesional con marca, navegación, horario, legal y redes como placeholders editables.

RESERVA REAL
Integra una sección/página “Pedir cita” conectada al backend real existente mediante este endpoint público:
https://uncucugrxoumrthqmirs.supabase.co/functions/v1/appointments-public

La matrícula es obligatoria. Permitir reservar sin crear cuenta.
Datos de invitado: nombre, teléfono, email, matrícula obligatoria, modelo opcional, servicio, fecha, hora y notas.
Consultar disponibilidad real con GET ?date=YYYY-MM-DD&service=<service_code>.
Crear cita con POST JSON.
Servicios visibles para reserva:
- oil_filter = Aceite + filtro
- full_service = Revisión completa
- tyres = Neumáticos
- brakes = Frenos
- diagnosis = Diagnosis
- aircon = Aire acondicionado
- pre_itv = Pre-ITV
- unknown = No sé qué le pasa
No ofrecer distribución ni embrague como reserva directa.
Mostrar horario L-V 08:30–19:00 y sábado 09:00–13:00.
UX de reserva clara, profesional, con selector de fecha y huecos disponibles. Estados de carga, éxito, error y slot ocupado. No mostrar datos de otros clientes.

EDICIÓN FUTURA
Diseña la arquitectura pensando en un futuro PIT STOP ADMIN para que el propietario pueda editar textos, fotos, servicios, horarios, contacto, WhatsApp, FAQ, logo y contenido sin tocar código. En esta primera versión crea una ruta/pantalla visual /admin como prototipo privado/no público, sin fingir que ya tiene autenticación funcional si aún no la implementas.

SEO Y CALIDAD
- SEO técnico básico correcto: title, meta description, headings, Open Graph, estructura semántica.
- Preparar textos pensando en “taller mecánico en Lleida” sin keyword stuffing.
- Carga rápida y accesibilidad cuidada.
- No usar lorem ipsum.
- No hacer una landing excesivamente larga sin jerarquía: debe sentirse editorial y premium.
- Componentes reutilizables y diseño coherente.

El resultado tiene que transmitir que PIT STOP MOTOR puede competir visualmente con cadenas y marcas de automoción grandes. Construye una primera versión completa y funcional, incluyendo la reserva real.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://pitstop-prime-care.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8f2859e4-7253-41cf-abb5-921c2741ecab).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
