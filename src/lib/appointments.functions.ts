import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { services } from "@/content/site";

const endpoint = "https://uncucugrxoumrthqmirs.supabase.co/functions/v1/appointments-public";
const codes = services.map((service) => service.code) as [string, ...string[]];
const availabilitySchema = z.object({ date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), service: z.enum(codes) });
const bookingSchema = z.object({
  full_name: z.string().trim().min(2).max(100), phone: z.string().trim().min(6).max(30),
  email: z.string().trim().email().max(255), plate: z.string().trim().min(3).max(15).regex(/^[A-Za-z0-9 -]+$/),
  vehicle_model: z.string().trim().max(100).optional(), service_code: z.enum(codes),
  current_km: z.number().int().min(0).max(2_000_000),
  starts_at: z.string().datetime({ offset: true }), notes: z.string().trim().max(1000).optional(),
});

export const getAvailability = createServerFn({ method: "GET" })
  .inputValidator((input) => availabilitySchema.parse(input))
  .handler(async ({ data }) => {
    const response = await fetch(`${endpoint}?date=${encodeURIComponent(data.date)}&service=${encodeURIComponent(data.service)}`, { headers: { Accept: "application/json" } });
    if (!response.ok) return { ok: false as const, slots: [], message: "No hemos podido consultar la agenda." };
    const payload = await response.json() as { slots?: Array<{ starts_at: string; local_time: string; available_capacity: number }> };
    return { ok: true as const, slots: (payload.slots ?? []).filter((slot) => slot.available_capacity > 0), message: "" };
  });

export const createAppointment = createServerFn({ method: "POST" })
  .inputValidator((input) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const response = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
    const payload = await response.json().catch(() => ({})) as { error?: string; id?: string; appointment_id?: string };
    if (!response.ok) {
      const occupied = response.status === 409 || payload.error?.includes("slot") || payload.error?.includes("capacity");
      return { ok: false as const, occupied: Boolean(occupied), message: occupied ? "Ese hueco acaba de ocuparse. Elige otro disponible." : "No hemos podido confirmar la cita. Revisa los datos e inténtalo de nuevo." };
    }
    return { ok: true as const, reference: payload.appointment_id ?? payload.id ?? null };
  });
