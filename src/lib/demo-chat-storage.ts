import type { DemoQuestion } from "./demo-chat";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("pitstop-local-chat", 1);
    request.onupgradeneeded = () => request.result.createObjectStore("questions", { keyPath: "id" });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
    request.onblocked = () => reject(new Error("Local storage blocked"));
  });
}

export async function loadPhotoQuestions(): Promise<DemoQuestion[]> {
  const db = await openDatabase();
  try {
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction("questions", "readonly");
      const request = transaction.objectStore("questions").getAll();
      transaction.oncomplete = () => resolve(request.result as DemoQuestion[]);
      transaction.onabort = () => reject(transaction.error);
      transaction.onerror = () => reject(transaction.error);
    });
  } finally { db.close(); }
}

export async function savePhotoQuestion(question: DemoQuestion): Promise<void> {
  const db = await openDatabase();
  try {
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction("questions", "readwrite");
      transaction.objectStore("questions").add(question);
      transaction.oncomplete = () => resolve();
      transaction.onabort = () => reject(transaction.error);
      transaction.onerror = () => reject(transaction.error);
    });
  } finally { db.close(); }
}

export async function compressPhoto(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  try {
    if (bitmap.width * bitmap.height > 40_000_000) throw new Error("Imagen demasiado grande. Selecciona una foto de menor resolución.");
    const ratio = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(bitmap.width * ratio));
    canvas.height = Math.max(1, Math.round(bitmap.height * ratio));
    const context = canvas.getContext("2d");
    if (!context) throw new Error("No se puede procesar esta foto en el navegador.");
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob>((resolve, reject) => canvas.toBlob(value => value ? resolve(value) : reject(new Error("No se pudo comprimir la foto.")), "image/webp", 0.75));
    canvas.width = 0;
    canvas.height = 0;
    if (blob.size > 1024 * 1024) throw new Error("No se pudo reducir la foto a un tamaño adecuado. Elige otra imagen.");
    return blob;
  } finally { bitmap.close(); }
}