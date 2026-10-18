import { describe, expect, test } from "bun:test";
import { getClientOffers, getHomeOffers, getOfferStatus, indicativeTimes, offers, workshopLocations, type Offer } from "./site";

describe("Commercial rules", () => {
  test("client offers remain empty without real active campaigns", () => {
    expect(getClientOffers(offers, "2026-10-18")).toEqual([]);
  });
  test("clients can only book active offers within their inclusive validity dates", () => {
    const offer: Offer = { id: "test", title: "Test", image: null, description: "", startDate: "2026-10-18", endDate: "2026-10-20", conditions: null, cta: "Pedir cita", serviceCode: "tyres", active: true, placeholder: false };
    expect(getClientOffers([offer], "2026-10-18")).toEqual([offer]);
    expect(getClientOffers([offer], "2026-10-20")).toEqual([offer]);
    expect(getClientOffers([offer], "2026-10-17")).toEqual([]);
    expect(getClientOffers([offer], "2026-10-21")).toEqual([]);
    expect(getClientOffers([{ ...offer, active: false }, { ...offer, placeholder: true }], "2026-10-18")).toEqual([]);
  });
  test.each([["Batería", 45], ["Pastillas de freno", 70], ["Pastillas + discos", 120], ["Amortiguadores delanteros", 120]])("%s has the requested indicative minutes", (service, minutes) => {
    expect(indicativeTimes.find(item => item.service === service)?.minutes).toBe(minutes);
  });
  test("future industrial location is only in planning", () => {
    expect(workshopLocations.find(location => location.id === "industrial-lleida")?.stage).toBe("planning");
  });
  test("undefined launch campaigns are not active promotions", () => {
    expect(offers.every(offer => !offer.active && offer.placeholder && offer.startDate === null && offer.endDate === null && offer.conditions === null)).toBe(true);
    expect(offers.map(offer => getOfferStatus(offer, "2026-10-12"))).toEqual(["upcoming", "upcoming", "upcoming"]);
  });
  test("home shows at most three promotions", () => {
    const sample = offers[0];
    if (!sample) throw new Error("Missing sample offer");
    expect(getHomeOffers(Array.from({ length: 5 }, (_, index) => ({ ...sample, id: String(index) })), "2026-10-12")).toHaveLength(3);
  });
  test("inactive and ended promotions cannot appear on home", () => {
    const offer: Offer = { id: "sample", title: "Sample", image: null, description: "", startDate: "2026-10-01", endDate: "2026-10-10", conditions: null, cta: "Pedir cita", serviceCode: "tyres", active: true, placeholder: false };
    expect(getHomeOffers([offer, { ...offer, endDate: null, active: false }], "2026-10-12")).toEqual([]);
    expect(getOfferStatus({ ...offer, startDate: "2026-11-01", endDate: null }, "2026-10-12")).toBe("upcoming");
  });
});