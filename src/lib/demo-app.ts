// Client app demo state. Everything here lives only in the visitor's browser
// (localStorage); nothing is sent to the workshop.

export type Decision = "pending" | "approved" | "rejected" | "clarification";
export type DemoState = { decision: Decision; decidedAt: string | null; stage: number };

export const DEMO_STORAGE_KEY = "pitstop-app-demo-v1";

export const demoVehicle = {
  plate: "0000 DEMO",
  model: "Vehículo de demostración",
  km: 86_400,
};

export const trackingStages = [
  "Recepcionado",
  "Diagnóstico",
  "Presupuesto",
  "Autorización",
  "En reparación",
  "Listo para recoger",
] as const;
export const AUTH_STAGE = 3;
export const REPAIR_STAGE = 4;
export const READY_STAGE = 5;

export type EstimateLine = {
  id: string; title: string; priority: "necesario" | "recomendado";
  reason: string; labor: number; parts: number;
};
// Amounts in euro cents. Demonstration figures only, not workshop prices.
export const demoEstimate = {
  reference: "DEMO-0001",
  mechanicNote: "Al recibir el coche notamos ruido metálico al frenar. Las pastillas delanteras están al límite de desgaste. Los discos aún están dentro de tolerancia, pero conviene revisarlos en el próximo mantenimiento.",
  vatRate: 0.21,
  lines: [
    { id: "pads", title: "Pastillas de freno delanteras", priority: "necesario", reason: "Desgaste al límite; afecta a la distancia de frenado.", labor: 4500, parts: 6500 },
    { id: "fluid", title: "Sustitución de líquido de frenos", priority: "recomendado", reason: "Líquido con humedad por encima de lo aconsejable.", labor: 2500, parts: 1200 },
  ] satisfies EstimateLine[],
};

export function estimateTotals(lines: readonly EstimateLine[], vatRate: number) {
  const labor = lines.reduce((s, l) => s + l.labor, 0);
  const parts = lines.reduce((s, l) => s + l.parts, 0);
  const base = labor + parts;
  const vat = Math.round(base * vatRate);
  return { labor, parts, base, vat, total: base + vat };
}

export const initialDemoState: DemoState = { decision: "pending", decidedAt: null, stage: AUTH_STAGE };

export function decide(state: DemoState, decision: Exclude<Decision, "pending">, now: Date): DemoState {
  const stage = decision === "approved" ? REPAIR_STAGE : AUTH_STAGE;
  return { ...state, decision, decidedAt: now.toISOString(), stage };
}

export function maxStage(state: DemoState) {
  return state.decision === "approved" ? READY_STAGE : AUTH_STAGE;
}

export function setStage(state: DemoState, stage: number): DemoState {
  return { ...state, stage: Math.max(0, Math.min(stage, maxStage(state))) };
}

export function parseDemoState(raw: string | null): DemoState {
  if (!raw) return initialDemoState;
  try {
    const v = JSON.parse(raw) as Partial<DemoState>;
    const decisions: Decision[] = ["pending", "approved", "rejected", "clarification"];
    if (!v || !decisions.includes(v.decision as Decision) || typeof v.stage !== "number") return initialDemoState;
    const state: DemoState = { decision: v.decision as Decision, decidedAt: typeof v.decidedAt === "string" ? v.decidedAt : null, stage: v.stage };
    return setStage(state, state.stage);
  } catch {
    return initialDemoState;
  }
}

export function formatSpanishDate(iso: string) {
  return new Intl.DateTimeFormat("es-ES", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Europe/Madrid" }).format(new Date(iso));
}

export function formatEuros(cents: number) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(cents / 100);
}

export const decisionLabels: Record<Decision, string> = {
  pending: "Pendiente de tu decisión",
  approved: "Aprobado",
  rejected: "Rechazado",
  clarification: "Aclaración solicitada",
};
