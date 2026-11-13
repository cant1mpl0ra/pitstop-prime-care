/// <reference types="bun" />
import "fake-indexeddb/auto";
import { expect, test } from "bun:test";
import { createDemoQuestion, MAX_ORIGINAL_BYTES, removePhoto, validatePhoto, type DemoPhoto } from "./demo-chat";
import { loadPhotoQuestions, savePhotoQuestion } from "./demo-chat-storage";

const photo: DemoPhoto = { id: "photo-1", name: "fallo.jpg", originalSize: 3, blob: new Blob(["abc"], { type: "image/webp" }) };
test("allows five images but rejects a sixth", () => {
  expect(validatePhoto({ type: "image/jpeg", size: 10 }, 4)).toBeNull();
  expect(validatePhoto({ type: "image/jpeg", size: 10 }, 5)).not.toBeNull();
});
test("rejects non images", () => { expect(validatePhoto({ type: "text/plain", size: 10 }, 0)).not.toBeNull(); });
test("originals cannot exceed 5 MB", () => {
  expect(validatePhoto({ type: "image/png", size: MAX_ORIGINAL_BYTES }, 0)).toBeNull();
  expect(validatePhoto({ type: "image/png", size: MAX_ORIGINAL_BYTES + 1 }, 0)).not.toBeNull();
});
test("removing a selected photo preserves the others", () => {
  expect(removePhoto([photo, { ...photo, id: "photo-2" }], photo.id).map(item => item.id)).toEqual(["photo-2"]);
});
test("a photo-only question persists with its blob and is never sent", async () => {
  const question = createDemoQuestion("", "photo-question", new Date("2026-11-13T08:01:00Z"), [photo]);
  if (!question) throw new Error("Expected photo-only question");
  await savePhotoQuestion(question);
  const restored = (await loadPhotoQuestions()).find(item => item.id === question.id);
  expect(restored?.delivery).toBe("not-sent");
  expect(await restored?.photos?.[0]?.blob.text()).toBe("abc");
  expect(restored?.photos?.[0]?.name).toBe("fallo.jpg");
});
test("failed append does not delete existing history", async () => {
  const before = await loadPhotoQuestions();
  const existing = before[0];
  if (!existing) throw new Error("Expected previous saved question");
  await expect(savePhotoQuestion(existing)).rejects.toBeDefined();
  expect((await loadPhotoQuestions()).length).toBe(before.length);
});