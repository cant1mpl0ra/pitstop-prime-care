import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { CalendarDays, FileText, Home, LoaderCircle, Route as RouteIcon, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useCommercialDate } from "@/components/site/commercial-blocks";
import { getClientOffers, offers, schedule, services, type ServiceCode } from "@/content/site";
import { createAppointment, getAvailability } from "@/lib/appointments.functions";
import { DEMO_STORAGE_KEY, decide, decisionLabels, demoEstimate, demoVehicle, estimateTotals, formatEuros, formatSpanishDate, initialDemoState, maxStage, parseDemoState, setStage, trackingStages, type Decision, type DemoState } from "@/lib/demo-app";

const tabs = [
  { id: "inicio", label: "Inicio", icon: Home },
  { id: "citas", label: "Citas", icon: CalendarDays },
  { id: "presupuestos", label: "Presupuestos", icon: FileText },
  { id: "seguimiento", label: "Seguimiento", icon: RouteIcon },
  { id: "ofertas", label: "Ofertas", icon: Tag },
] as const;
type Tab = (typeof tabs)[number]["id"];

export const Route = createFileRoute("/app")({
  validateSearch: (s: Record<string, unknown>): { tab?: Tab | undefined } => ({ tab: tabs.some(t => t.id === s["tab"]) ? s["tab"] as Tab : undefined }),
  head: () => ({ meta: [
    { title: "App de clientes | PIT STOP motors" },
    { name: "description", content: "App de clientes de PIT STOP motors: citas, presupuestos, seguimiento del vehículo y ofertas. Demostración pública." },
    { property: "og:title", content: "App de clientes | PIT STOP motors" },
    { property: "og:description", content: "Prueba la app: reserva, aprueba presupuestos y sigue la reparación." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary" },
    { name: "robots", content: "noindex" },
  ] }),
  component: ClientApp,
});

function useDemoState() {
  const [state, setState] = useState<DemoState>(initialDemoState);
  const [ready, setReady] = useState(false);
  useEffect(() => { setState(parseDemoState(window.localStorage.getItem(DEMO_STORAGE_KEY))); setReady(true); }, []);
  useEffect(() => { if (ready) window.localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(state)); }, [state, ready]);
  return [state, setState] as const;
}

function ClientApp() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const tab: Tab = search.tab ?? "inicio";
  const go = (t: Tab) => { void navigate({ search: { tab: t === "inicio" ? undefined : t }, replace: true }); window.scrollTo({ top: 0 }); };
  const [state, setState] = useDemoState();

  return <div className="min-h-dvh bg-surface-strong sm:py-8">
    <div className="relative mx-auto flex min-h-dvh w-full max-w-[430px] flex-col bg-background sm:min-h-[820px] sm:border sm:border-border sm:shadow-xl">
      <header className="sticky top-0 z-20 border-b border-border bg-background/95 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="flex h-14 items-center justify-between px-5">
          <span className="flex items-center border-l-[3px] border-primary pl-2.5 text-sm font-extrabold leading-none">PIT STOP<span className="ml-1 font-medium text-primary">motors</span></span>
          <span className="border border-primary px-2 py-1 text-[10px] font-bold uppercase text-primary">Demo</span>
        </div>
      </header>
      <p className="bg-surface-blue px-5 py-2 text-[11px] leading-4 text-muted-foreground" role="note">Modo demostración: ninguna decisión se envía al taller.</p>
      <main className="flex-1 px-5 pb-28 pt-6" aria-live="polite">
        {tab === "inicio" && <HomeTab state={state} go={go} />}
        {tab === "citas" && <BookingTab />}
        {tab === "presupuestos" && <EstimateTab state={state} setState={setState} />}
        {tab === "seguimiento" && <TrackingTab state={state} setState={setState} go={go} />}
        {tab === "ofertas" && <OffersTab go={go} />}
      </main>
      <nav aria-label="Navegación de la app" className="fixed inset-x-0 bottom-0 z-30 mx-auto w-full max-w-[430px] border-t border-border bg-background pb-[env(safe-area-inset-bottom)] sm:absolute">
        <ul className="grid grid-cols-5">{tabs.map(({ id, label, icon: Icon }) => <li key={id}>
          <button type="button" onClick={() => go(id)} aria-current={tab === id ? "page" : undefined}
            className={`flex h-16 w-full flex-col items-center justify-center gap-1 text-[10px] font-semibold focus-visible:outline-2 focus-visible:outline-ring ${tab === id ? "text-primary" : "text-muted-foreground"}`}>
            <Icon className="size-5" aria-hidden />{label}
          </button></li>)}</ul>
      </nav>
    </div>
  </div>;
}

function Title({ kicker, children }: { kicker: string; children: ReactNode }) {
  return <div className="mb-6"><p className="text-[11px] font-bold uppercase text-primary">{kicker}</p><h1 className="mt-2 font-display text-2xl font-semibold">{children}</h1></div>;
}
function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`border border-border bg-card p-5 ${className}`}>{children}</section>;
}

function VehicleCard() {
  return <Card>
    <div className="flex items-start justify-between"><p className="text-[11px] font-bold uppercase text-muted-foreground">Mi vehículo</p><span className="text-[10px] font-bold uppercase text-primary">Datos demo</span></div>
    <p className="mt-3 inline-block border-2 border-foreground px-2 py-0.5 font-mono text-lg font-bold">{demoVehicle.plate}</p>
    <p className="mt-2 text-sm text-muted-foreground">{demoVehicle.model}</p>
    <p className="mt-4 text-[11px] uppercase text-muted-foreground">Kilometraje actual</p>
    <p className="font-display text-3xl font-semibold tabular-nums">{demoVehicle.km.toLocaleString("es-ES")} <span className="text-base text-muted-foreground">km</span></p>
  </Card>;
}

function HomeTab({ state, go }: { state: DemoState; go: (t: Tab) => void }) {
  return <>
    <Title kicker="Hola">Tu coche, de un vistazo.</Title>
    <div className="space-y-4">
      <VehicleCard />
      <Card>
        <p className="text-[11px] font-bold uppercase text-muted-foreground">Próxima cita</p>
        <p className="mt-2 text-sm">No tienes citas reservadas.</p>
        <Button size="sm" className="mt-4" onClick={() => go("citas")}>Pedir cita</Button>
      </Card>
      <Card className={state.decision === "pending" ? "border-primary" : ""}>
        <p className="text-[11px] font-bold uppercase text-muted-foreground">Presupuesto {demoEstimate.reference}</p>
        <p className="mt-2 font-semibold">{decisionLabels[state.decision]}</p>
        {state.decidedAt && <p className="text-xs text-muted-foreground">Decisión: {formatSpanishDate(state.decidedAt)}</p>}
        <p className="mt-1 text-sm text-muted-foreground">Total {formatEuros(estimateTotals(demoEstimate.lines, demoEstimate.vatRate).total)} (importe demo)</p>
        <Button size="sm" variant={state.decision === "pending" ? "default" : "outline"} className="mt-4" onClick={() => go("presupuestos")}>{state.decision === "pending" ? "Revisar y decidir" : "Ver presupuesto"}</Button>
      </Card>
      <Card>
        <p className="text-[11px] font-bold uppercase text-muted-foreground">Reparación en curso</p>
        <p className="mt-2 font-semibold">{trackingStages[state.stage]}</p>
        <Progress stage={state.stage} />
        <Button size="sm" variant="outline" className="mt-4" onClick={() => go("seguimiento")}>Ver seguimiento</Button>
      </Card>
    </div>
  </>;
}

function Progress({ stage }: { stage: number }) {
  return <div className="mt-3 flex gap-1" role="progressbar" aria-valuemin={1} aria-valuemax={trackingStages.length} aria-valuenow={stage + 1} aria-label="Progreso de la reparación">
    {trackingStages.map((s, i) => <span key={s} className={`h-1 flex-1 ${i <= stage ? "bg-primary" : "bg-border"}`} />)}
  </div>;
}

const confirmCopy: Record<Exclude<Decision, "pending">, { title: string; body: string; action: string }> = {
  approved: { title: "¿Aprobar el presupuesto?", body: "En la demo, el seguimiento pasará a «En reparación». No se envía nada al taller.", action: "Aprobar" },
  rejected: { title: "¿Rechazar el presupuesto?", body: "En la demo, el trabajo no se realizará. No se envía nada al taller.", action: "Rechazar" },
  clarification: { title: "¿Solicitar aclaración?", body: "En la demo se marca que quieres hablar con el mecánico antes de decidir. No se envía nada al taller.", action: "Solicitar aclaración" },
};

function EstimateTab({ state, setState }: { state: DemoState; setState: (s: DemoState) => void }) {
  const [pending, setPending] = useState<Exclude<Decision, "pending"> | null>(null);
  const t = estimateTotals(demoEstimate.lines, demoEstimate.vatRate);
  const decided = state.decision === "approved" || state.decision === "rejected";
  return <>
    <Title kicker={`Presupuesto ${demoEstimate.reference}`}>Revisa y decide.</Title>
    <div className="space-y-4">
      <Card className={state.decision === "pending" ? "border-primary" : ""}>
        <p className="text-[11px] font-bold uppercase text-muted-foreground">Estado</p>
        <p className="mt-1 font-semibold">{decisionLabels[state.decision]}</p>
        {state.decidedAt && <p className="text-xs text-muted-foreground">Registrado el {formatSpanishDate(state.decidedAt)} (solo en este dispositivo)</p>}
      </Card>
      <Card>
        <p className="text-[11px] font-bold uppercase text-muted-foreground">Intervenciones</p>
        <ul className="mt-3 divide-y divide-border">{demoEstimate.lines.map(l => <li key={l.id} className="py-3">
          <div className="flex items-start justify-between gap-3"><p className="text-sm font-semibold">{l.title}</p>
            <span className={`shrink-0 border px-1.5 py-0.5 text-[10px] font-bold uppercase ${l.priority === "necesario" ? "border-foreground text-foreground" : "border-border text-muted-foreground"}`}>{l.priority}</span></div>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{l.reason}</p>
          <p className="mt-1 text-xs text-muted-foreground">Mano de obra {formatEuros(l.labor)} · Recambios {formatEuros(l.parts)}</p>
        </li>)}</ul>
        <dl className="mt-2 space-y-1 border-t border-border pt-3 text-sm">
          <Row k="Mano de obra" v={formatEuros(t.labor)} /><Row k="Recambios" v={formatEuros(t.parts)} />
          <Row k="IVA (21 %)" v={formatEuros(t.vat)} />
          <div className="flex justify-between pt-2 text-lg font-semibold"><dt>Total</dt><dd className="tabular-nums">{formatEuros(t.total)}</dd></div>
        </dl>
        <p className="mt-2 text-[11px] text-muted-foreground">Importes de demostración, no son precios del taller.</p>
      </Card>
      <Card>
        <p className="text-[11px] font-bold uppercase text-muted-foreground">Nota del mecánico</p>
        <p className="mt-2 text-sm leading-6">{demoEstimate.mechanicNote}</p>
      </Card>
      <Card>
        <p className="text-[11px] font-bold uppercase text-muted-foreground">Qué se cambia</p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">Las pastillas presionan el disco para frenar. Cuando el material se gasta, el coche necesita más distancia para detenerse y puede dañar el disco.</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Placeholder>Imagen explicativa pendiente</Placeholder><Placeholder>Vídeo explicativo pendiente</Placeholder>
        </div>
      </Card>
      {!decided ? <div className="grid gap-2">
        <Button size="lg" onClick={() => setPending("approved")}>Aprobar</Button>
        <Button size="lg" variant="outline" onClick={() => setPending("rejected")}>Rechazar</Button>
        {state.decision !== "clarification" && <Button variant="ghost" onClick={() => setPending("clarification")}>Solicitar aclaración</Button>}
      </div> : <p className="text-sm text-muted-foreground">Ya has decidido sobre este presupuesto. Puedes restablecer la demo para volver a probar.</p>}
      <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={() => setState(initialDemoState)}>Restablecer demo</Button>
    </div>
    <AlertDialog open={pending !== null} onOpenChange={o => !o && setPending(null)}>
      {pending && <AlertDialogContent>
        <AlertDialogHeader><AlertDialogTitle>{confirmCopy[pending].title}</AlertDialogTitle><AlertDialogDescription>{confirmCopy[pending].body}</AlertDialogDescription></AlertDialogHeader>
        <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => { setState(decide(state, pending, new Date())); setPending(null); }}>{confirmCopy[pending].action}</AlertDialogAction></AlertDialogFooter>
      </AlertDialogContent>}
    </AlertDialog>
  </>;
}
function Row({ k, v }: { k: string; v: string }) { return <div className="flex justify-between text-muted-foreground"><dt>{k}</dt><dd className="tabular-nums">{v}</dd></div>; }
function Placeholder({ children }: { children: ReactNode }) {
  return <div className="flex aspect-[4/3] items-center justify-center border border-dashed border-border bg-surface-strong p-3 text-center text-[11px] text-muted-foreground">{children}</div>;
}

function TrackingTab({ state, setState, go }: { state: DemoState; setState: (s: DemoState) => void; go: (t: Tab) => void }) {
  const max = maxStage(state);
  return <>
    <Title kicker="Seguimiento">{trackingStages[state.stage]}</Title>
    <div className="space-y-4">
      <Card>
        <ol className="space-y-0">{trackingStages.map((s, i) => <li key={s} className="flex gap-3">
          <div className="flex flex-col items-center"><span className={`mt-1 size-3 ${i < state.stage ? "bg-primary" : i === state.stage ? "border-2 border-primary bg-background" : "border border-border bg-background"}`} />{i < trackingStages.length - 1 && <span className={`w-px flex-1 ${i < state.stage ? "bg-primary" : "bg-border"}`} />}</div>
          <p className={`pb-5 text-sm ${i === state.stage ? "font-semibold" : i < state.stage ? "" : "text-muted-foreground"}`} aria-current={i === state.stage ? "step" : undefined}>{s}</p>
        </li>)}</ol>
        {state.stage === 3 && state.decision !== "approved" && <div className="border-t border-border pt-4 text-sm">
          <p>{state.decision === "rejected" ? "Has rechazado el presupuesto: la reparación no continúa." : "Esperando tu decisión sobre el presupuesto."}</p>
          {state.decision !== "rejected" && <Button size="sm" className="mt-3" onClick={() => go("presupuestos")}>Ir al presupuesto</Button>}
        </div>}
      </Card>
      <Card className="bg-surface-blue">
        <p className="text-[11px] font-bold uppercase text-primary">Explorar estados · demo</p>
        <p className="mt-1 text-xs text-muted-foreground">{max === 3 ? "Para avanzar más allá de Autorización, aprueba el presupuesto." : "Recorre los hitos de la reparación."}</p>
        <div className="mt-3 flex gap-2">
          <Button size="sm" variant="outline" disabled={state.stage === 0} onClick={() => setState(setStage(state, state.stage - 1))} aria-label="Estado anterior">Anterior</Button>
          <Button size="sm" disabled={state.stage >= max} onClick={() => setState(setStage(state, state.stage + 1))} aria-label="Estado siguiente">Siguiente</Button>
        </div>
      </Card>
      <Card>
        <p className="text-[11px] font-bold uppercase text-muted-foreground">Ver mi coche</p>
        <div className="mt-3"><Placeholder>Sin fotos del vehículo: demostración</Placeholder></div>
        <p className="mt-4 text-[11px] uppercase text-muted-foreground">Comentario del mecánico</p>
        <p className="mt-1 text-sm leading-6">{demoEstimate.mechanicNote}</p>
      </Card>
    </div>
  </>;
}

function OffersTab({ go }: { go: (t: Tab) => void }) {
  const today = useCommercialDate();
  const list = today ? getClientOffers(offers, today) : [];
  return <>
    <Title kicker="Ofertas">Campañas del taller.</Title>
    {!today ? <p className="text-sm text-muted-foreground">Consultando ofertas…</p> : list.length === 0 ? <Card>
      <p className="font-semibold">No hay ofertas activas ahora.</p>
      <p className="mt-2 text-sm text-muted-foreground">Puedes pedir cita para el mantenimiento de tu coche sin esperar a una promoción.</p>
      <Button className="mt-4" onClick={() => go("citas")}>Pedir cita</Button>
    </Card> : <div className="space-y-4">{list.map(o => <Card key={o.id}>
      {o.image && <img src={o.image} alt={o.title} className="mb-4 aspect-[3/2] w-full object-cover" />}
      <h2 className="font-display text-xl font-semibold">{o.title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{o.description}</p>
      {(o.discountLabel || o.priceLabel) && <p className="mt-3 font-semibold text-primary">{[o.discountLabel, o.priceLabel].filter(Boolean).join(" · ")}</p>}
      <p className="mt-3 text-xs text-muted-foreground">Vigencia: {o.startDate ?? "—"} a {o.endDate ?? "—"} · {o.conditions ?? "Sin condiciones adicionales indicadas."}</p>
      <Button className="mt-4" onClick={() => go("citas")}>{o.cta}</Button>
    </Card>)}</div>}
  </>;
}

type Slot = { starts_at: string; local_time: string; available_capacity: number };
function BookingTab() {
  const availability = useServerFn(getAvailability);
  const book = useServerFn(createAppointment);
  const [service, setService] = useState<ServiceCode | "">("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [slot, setSlot] = useState("");
  const [loading, setLoading] = useState(false);
  const [agendaDown, setAgendaDown] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [notice, setNotice] = useState<{ ok: boolean; text: string } | null>(null);
  const minDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  useEffect(() => {
    if (!service || !date) { setSlots([]); return; }
    let active = true; setLoading(true); setAgendaDown(false); setSlot("");
    availability({ data: { date, service } })
      .then(r => { if (active) { setSlots(r.slots); setAgendaDown(!r.ok); } })
      .catch(() => active && setAgendaDown(true))
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, [service, date, availability]);

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (!service || !slot) return;
    const fd = new FormData(e.currentTarget); const km = String(fd.get("current_km") ?? "");
    if (!/^\d+$/.test(km) || Number(km) > 2_000_000) { setNotice({ ok: false, text: "Indica los kilómetros actuales como número entero entre 0 y 2.000.000." }); return; }
    setSubmitting(true); setNotice(null);
    try {
      const r = await book({ data: { full_name: String(fd.get("full_name")), phone: String(fd.get("phone")), email: String(fd.get("email")), plate: String(fd.get("plate")).toUpperCase(), vehicle_model: String(fd.get("vehicle_model") ?? "") || undefined, current_km: Number(km), service_code: service, starts_at: slot, notes: String(fd.get("notes") ?? "") || undefined } });
      setNotice(r.ok ? { ok: true, text: "El taller ha registrado tu cita." } : { ok: false, text: `${r.message} No se ha reservado nada.` });
    } catch { setNotice({ ok: false, text: "No hemos podido contactar con la agenda. No se ha reservado nada." }); }
    finally { setSubmitting(false); }
  }

  return <>
    <Title kicker="Citas · reserva real">Pide tu cita.</Title>
    <p className="-mt-3 mb-5 text-xs leading-5 text-muted-foreground">Esta pestaña sí usa la agenda real del taller. {schedule.weekdays} · {schedule.saturday}. Hasta 4 vehículos por franja.</p>
    <form onSubmit={submit} className="space-y-4">
      <div><Label htmlFor="a-service">Servicio</Label>
        <select id="a-service" required value={service} onChange={e => setService(e.target.value as ServiceCode)} className="form-control mt-2"><option value="">Selecciona un servicio</option>{services.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}</select></div>
      <div><Label htmlFor="a-date">Fecha</Label><Input id="a-date" type="date" min={minDate} required value={date} onChange={e => setDate(e.target.value)} className="mt-2 h-12" /></div>
      {service && date && (loading ? <p className="flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircle className="size-4 animate-spin" />Consultando agenda</p>
        : agendaDown ? <div role="alert" className="border border-destructive p-4 text-sm">La agenda online no está disponible ahora mismo, así que no podemos mostrar huecos ni confirmar citas. Inténtalo más tarde o usa <Link to="/pedir-cita" className="font-semibold text-primary underline">la reserva de la web</Link>.</div>
        : slots.length ? <fieldset><legend className="text-sm font-medium">Hora disponible</legend><div className="mt-2 grid grid-cols-4 gap-2">{slots.map(s => <button type="button" key={s.starts_at} aria-pressed={slot === s.starts_at} onClick={() => setSlot(s.starts_at)} className={`h-11 border text-sm font-semibold ${slot === s.starts_at ? "border-primary bg-primary text-primary-foreground" : "border-border"}`}>{s.local_time.slice(0, 5)}</button>)}</div></fieldset>
        : <p className="border border-border p-4 text-sm text-muted-foreground">No hay huecos para esta fecha. Prueba otro día.</p>)}
      {slot && <>
        <F label="Nombre" name="full_name" autoComplete="name" /><F label="Teléfono" name="phone" type="tel" autoComplete="tel" /><F label="Email" name="email" type="email" autoComplete="email" />
        <F label="Matrícula" name="plate" />
        <div><Label htmlFor="a-km">Kilómetros actuales</Label><Input id="a-km" name="current_km" type="number" inputMode="numeric" min={0} max={2000000} step={1} required className="mt-2 h-12" /><p className="mt-1 text-xs text-muted-foreground">Aproximados está bien; nos ayuda a preparar el mantenimiento y revisar vencimientos.</p></div>
        <F label="Modelo (opcional)" name="vehicle_model" required={false} />
        <div><Label htmlFor="a-notes">Notas (opcional)</Label><Textarea id="a-notes" name="notes" maxLength={1000} className="mt-2" /></div>
        <Button size="lg" type="submit" className="w-full" disabled={submitting || notice?.ok === true}>{submitting ? "Enviando…" : "Confirmar cita"}</Button>
      </>}
      {notice && <p role="status" className={`border p-4 text-sm ${notice.ok ? "border-primary bg-surface-blue" : "border-destructive"}`}>{notice.text}</p>}
    </form>
  </>;
}
function F({ label, name, type = "text", required = true, autoComplete }: { label: string; name: string; type?: string; required?: boolean; autoComplete?: string }) {
  return <div><Label htmlFor={`a-${name}`}>{label}</Label><Input id={`a-${name}`} name={name} type={type} required={required} autoComplete={autoComplete} maxLength={255} className="mt-2 h-12" /></div>;
}
