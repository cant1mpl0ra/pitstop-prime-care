import { Activity, CarFront, CircleGauge, Disc3, Fan, HelpCircle, Search, Wrench } from "lucide-react";

export const services = [
  { code: "oil_filter", name: "Aceite + filtro", short: "Lubricación y filtrado precisos para proteger el motor.", icon: Activity },
  { code: "full_service", name: "Revisión completa", short: "Control exhaustivo de los puntos clave de tu vehículo.", icon: Search },
  { code: "tyres", name: "Neumáticos", short: "Estado, presión, desgaste y sustitución profesional.", icon: Disc3 },
  { code: "brakes", name: "Frenos", short: "Comprobación y mantenimiento del sistema de frenado.", icon: CircleGauge },
  { code: "diagnosis", name: "Diagnosis", short: "Lectura técnica para localizar el origen de la incidencia.", icon: Wrench },
  { code: "aircon", name: "Aire acondicionado", short: "Climatización eficiente, limpia y fiable todo el año.", icon: Fan },
  { code: "pre_itv", name: "Pre-ITV", short: "Revisión preventiva para llegar a la inspección con confianza.", icon: CarFront },
  { code: "unknown", name: "No sé qué le pasa", short: "Cuéntanos los síntomas. Nosotros empezamos por escuchar.", icon: HelpCircle },
] as const;

export type ServiceCode = (typeof services)[number]["code"];
export const schedule = { weekdays: "L–V 08:30–19:00", saturday: "Sábado 09:00–13:00" };
export const editableContact = {
  phone: "Teléfono pendiente de configurar",
  email: "Email pendiente de configurar",
  address: "Dirección exacta pendiente de configurar · Lleida",
  whatsapp: "WhatsApp pendiente de configurar",
};
export const processSteps = ["Reserva", "Recepción", "Diagnóstico", "Presupuesto digital", "Autorización", "Reparación", "Control de calidad", "Vehículo listo"];
export const trackingSteps = ["Vehículo recibido", "Diagnóstico", "Presupuesto enviado", "Autorizado", "Reparación", "Control de calidad", "Listo para recoger"];

export const serviceFamilies = [
  { name: "Mantenimiento", short: "Aceite, filtros y revisiones para que el coche siga haciendo bien su trabajo.", bookingCode: "full_service" as ServiceCode },
  { name: "Frenos", short: "Comprobación, desgaste y mantenimiento del sistema de frenado.", bookingCode: "brakes" as ServiceCode },
  { name: "Neumáticos", short: "Estado, presión, desgaste y sustitución con criterio.", bookingCode: "tyres" as ServiceCode },
  { name: "Diagnosis", short: "Localizamos el origen de la incidencia antes de proponer una reparación.", bookingCode: "diagnosis" as ServiceCode },
  { name: "Suspensión", short: "Revisamos estabilidad, confort y respuesta del vehículo.", bookingCode: "unknown" as ServiceCode },
  { name: "Aire acondicionado", short: "Climatización eficiente y fiable durante todo el año.", bookingCode: "aircon" as ServiceCode },
] as const;

export const homeProcessSteps = ["Reserva", "Recibimos tu vehículo", "Diagnóstico", "Tú decides", "Reparamos", "Control final", "Listo"] as const;

export const primaryNavigation = [
  { to: "/servicios", label: "Servicios" },
  { to: "/neumaticos", label: "Neumáticos" },
  { to: "/ofertas", label: "Ofertas" },
  { to: "/como-trabajamos", label: "Cómo trabajamos" },
  { to: "/sobre-nosotros", label: "Sobre nosotros" },
  { to: "/mi-cuenta", label: "Mi cuenta" },
] as const;

export const secondaryNavigation = [
  { to: "/presupuesto-digital", label: "Presupuesto digital" },
  { to: "/seguimiento", label: "Seguimiento" },
  { to: "/opiniones", label: "Opiniones" },
  { to: "/contacto", label: "Contacto" },
] as const;

export const aboutContent = {
  title: "UN TALLER NUEVO. UNA FORMA DIFERENTE DE HACER LAS COSAS.",
  intro: "PIT STOP motors nace en Lleida con una idea sencilla: hacer que cuidar del coche sea más fácil, más claro y más rápido.",
  paragraphs: [
    "Somos un taller de nueva creación especializado en mecánica rápida y neumáticos, construido desde el principio alrededor de lo que creemos que debería esperar hoy un cliente de su taller: buena atención, información clara, rapidez y transparencia antes de tomar una decisión.",
    "Somos una empresa joven, con ganas de crecer y con una visión de largo plazo. No queremos limitarnos a reparar vehículos. Queremos construir una marca de automoción en la que el cliente sepa qué necesita su coche, cuánto va a costar y en qué punto se encuentra la reparación.",
    "Por eso combinamos el trabajo en taller con herramientas digitales que nos permiten mejorar la comunicación, mostrar el estado del vehículo y facilitar la autorización de los trabajos.",
  ],
  specialties: [
    { title: "Mecánica rápida", description: "Mantenimiento, revisiones, frenos, baterías, suspensión, diagnosis y operaciones habituales de mantenimiento y reparación." },
    { title: "Neumáticos", description: "Venta, montaje, equilibrado, reparación y mantenimiento del neumático, con distintas alternativas según vehículo, uso y presupuesto." },
  ],
  values: [
    { title: "Claridad", description: "Te explicamos qué necesita el coche." },
    { title: "Rapidez", description: "Organizamos el trabajo para reducir tiempos innecesarios." },
    { title: "Transparencia", description: "No hacemos trabajos adicionales sin tu aprobación." },
    { title: "Evolución", description: "Estamos construyendo PIT STOP para crecer junto a nuestros clientes." },
  ],
  closing: "ESTAMOS EMPEZANDO. PERO SABEMOS HACIA DÓNDE VAMOS.",
};

export type LocationStage = "current" | "planning" | "opening-soon";
export type WorkshopLocation = { id: string; name: string; stage: LocationStage; specialty: string; description: string };
export const locationStageLabels: Record<LocationStage, string> = { current: "Ahora", planning: "En planificación", "opening-soon": "Próxima apertura" };
export const workshopLocations: WorkshopLocation[] = [
  { id: "lleida", name: "PIT STOP motors · Lleida", stage: "current", specialty: "Mecánica rápida · Neumáticos · Mantenimiento · Diagnosis", description: "Nuestro punto de partida: un taller construido desde cero alrededor de una experiencia moderna." },
  { id: "industrial-lleida", name: "PIT STOP motors · Área industrial de Lleida", stage: "planning", specialty: "Proyecto de futura instalación", description: "Una nave de mayor capacidad orientada a trabajos de mecánica más compleja, vehículos de mayor tamaño y operaciones que requieren más espacio, equipamiento y tiempo de taller." },
];

export const indicativeTimes = [
  { service: "Batería", minutes: 45 },
  { service: "Pastillas de freno", minutes: 70 },
  { service: "Pastillas + discos", minutes: 120 },
  { service: "Amortiguadores delanteros", minutes: 120 },
] as const;
export const timingDisclaimer = "Tiempo orientativo. Puede variar según el vehículo, el diagnóstico y el alcance del trabajo. No constituye un plazo garantizado.";

export type Offer = {
  id: string; title: string; image: string | null; description: string;
  startDate: string | null; endDate: string | null; conditions: string | null;
  cta: "Pedir cita"; serviceCode: ServiceCode; active: boolean; placeholder: boolean;
};
export const offers: Offer[] = [
  { id: "launch", title: "Lanzamiento PIT STOP", image: null, description: "Promoción de lanzamiento pendiente de definir.", startDate: null, endDate: null, conditions: null, cta: "Pedir cita", serviceCode: "full_service", active: false, placeholder: true },
  { id: "tyres", title: "Neumáticos", image: null, description: "Próxima campaña de neumáticos. Detalles pendientes de definir.", startDate: null, endDate: null, conditions: null, cta: "Pedir cita", serviceCode: "tyres", active: false, placeholder: true },
  { id: "maintenance", title: "Mantenimiento", image: null, description: "Próxima campaña de mantenimiento. Detalles pendientes de definir.", startDate: null, endDate: null, conditions: null, cta: "Pedir cita", serviceCode: "full_service", active: false, placeholder: true },
];
export type OfferStatus = "active" | "upcoming" | "ended" | "inactive";
export function getOfferStatus(offer: Offer, today: string): OfferStatus {
  if (offer.placeholder) return "upcoming";
  if (!offer.active) return "inactive";
  if (offer.endDate && offer.endDate < today) return "ended";
  if (offer.startDate && offer.startDate > today) return "upcoming";
  return "active";
}
export function getHomeOffers(items: Offer[], today: string) {
  return items.filter(offer => ["active", "upcoming"].includes(getOfferStatus(offer, today))).slice(0, 3);
}

export const tyreContent = {
  title: "¿NECESITAS NEUMÁTICOS?",
  intro: "Encuentra la opción adecuada para tu coche.",
  description: "No todos los vehículos ni todos los recorridos necesitan lo mismo. Revisamos medidas, uso y presupuesto antes de proponerte una alternativa.",
  services: ["Venta y montaje", "Equilibrado", "Reparación", "Mantenimiento del neumático"],
};
