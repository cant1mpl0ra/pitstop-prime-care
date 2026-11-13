export const CHAT_STORAGE_KEY = "pitstop-app-questions-demo-v1";

export type DemoQuestion = {
  id: string;
  text: string;
  createdAt: string;
  delivery: "not-sent";
  photos?: DemoPhoto[];
};

export type DemoPhoto = { id: string; name: string; originalSize: number; blob: Blob };
export const MAX_PHOTOS = 5;
export const MAX_ORIGINAL_BYTES = 5 * 1024 * 1024;

export function validatePhoto(file: Pick<File, "type" | "size">, count: number): string | null {
  if (count >= MAX_PHOTOS) return "Máximo 5 fotos por consulta.";
  if (!file.type.startsWith("image/")) return "Selecciona un archivo de imagen.";
  if (file.size > MAX_ORIGINAL_BYTES) return "Cada foto original debe ocupar como máximo 5 MB.";
  return null;
}

export function removePhoto(photos: DemoPhoto[], id: string) {
  return photos.filter(photo => photo.id !== id);
}

export function createDemoQuestion(text: string, id: string, now: Date, photos: DemoPhoto[] = []): DemoQuestion | null {
  const trimmed = text.trim();
  if (!trimmed && photos.length === 0) return null;
  if (photos.length > MAX_PHOTOS) return null;
  return { id, text: trimmed, createdAt: now.toISOString(), delivery: "not-sent", ...(photos.length ? { photos } : {}) };
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