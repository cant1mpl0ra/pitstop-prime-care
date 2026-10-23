/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { decide, demoEstimate, estimateTotals, formatSpanishDate, initialDemoState, parseDemoState, setStage } from "./demo-app";

describe("client app demo", () => {
  test("approving moves tracking to 'En reparación' and records the date", () => {
    const s = decide(initialDemoState, "approved", new Date("2026-10-23T09:30:00Z"));
    expect(s.decision).toBe("approved");
    expect(s.stage).toBe(4);
    expect(s.decidedAt).toBe("2026-10-23T09:30:00.000Z");
  });
  test("rejecting keeps tracking at authorisation and cannot advance to repair", () => {
    const s = decide(initialDemoState, "rejected", new Date());
    expect(setStage(s, 5).stage).toBe(3);
  });
  test("decision survives a storage round-trip", () => {
    const s = decide(initialDemoState, "clarification", new Date("2026-10-23T09:30:00Z"));
    expect(parseDemoState(JSON.stringify(s))).toEqual(s);
  });
  test("corrupt storage resets to the pending demo", () => {
    expect(parseDemoState("{bad")).toEqual(initialDemoState);
    expect(parseDemoState(JSON.stringify({ decision: "hacked", stage: 9 }))).toEqual(initialDemoState);
  });
  test("totals add labour, parts and 21% VAT", () => {
    const t = estimateTotals(demoEstimate.lines, 0.21);
    expect(t.base).toBe(14700);
    expect(t.vat).toBe(3087);
    expect(t.total).toBe(17787);
  });
  test("decision date is shown in Spanish", () => {
    expect(formatSpanishDate("2026-10-23T09:30:00Z")).toContain("octubre de 2026");
  });
});
