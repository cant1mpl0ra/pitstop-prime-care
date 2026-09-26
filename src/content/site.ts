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
