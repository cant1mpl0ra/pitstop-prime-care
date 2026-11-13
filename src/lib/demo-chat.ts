export const CHAT_STORAGE_KEY = "pitstop-app-questions-demo-v1";

export type DemoQuestion = {
  id: string;
  text: string;
  createdAt: string;
  delivery: "not-sent";
};

export function createDemoQuestion(text: string, id: string, now: Date): DemoQuestion | null {
  const trimmed = text.trim();
  if (!trimmed) return null;
  return { id, text: trimmed, createdAt: now.toISOString(), delivery: "not-sent" };
}

export function parseDemoQuestions(raw: string | null): DemoQuestion[] {
  if (!raw) return [];
  try {
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) return [];
    return value.filter((item): item is DemoQuestion =>
      typeof item === "object" && item !== null &&
      typeof item.id === "string" && typeof item.text === "string" && item.text.trim().length > 0 &&
      typeof item.createdAt === "string" && Number.isFinite(Date.parse(item.createdAt)) &&
      item.delivery === "not-sent",
    );
  } catch {
    return [];
  }
}