/// <reference types="bun" />
import { expect, test } from "bun:test";
import { createDemoQuestion, parseDemoQuestions } from "./demo-chat";

test("demo questions are never marked delivered to the workshop", () => {
  const question = createDemoQuestion("¿Qué incluye el presupuesto?", "question-1", new Date("2026-11-13T07:55:00Z"));
  expect(question?.delivery).toBe("not-sent");
});

test("question history survives a local storage round trip", () => {
  const question = createDemoQuestion("¿Puedo ver las piezas?", "question-2", new Date("2026-11-13T07:55:00Z"));
  if (!question) throw new Error("Expected a non-empty question");
  expect(parseDemoQuestions(JSON.stringify([question]))).toEqual([question]);
});

test("empty questions cannot be added", () => {
  expect(createDemoQuestion("   ", "empty", new Date())).toBeNull();
});

test("invalid or delivered records are not restored as demo questions", () => {
  expect(parseDemoQuestions("{bad")).toEqual([]);
  expect(parseDemoQuestions(JSON.stringify([{ id: "x", text: "hello", createdAt: "2026-11-13", delivery: "sent" }]))).toEqual([]);
});