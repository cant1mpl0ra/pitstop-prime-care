import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TyreEnquiry() {
  const [mode, setMode] = useState<"plate" | "size">("plate");
  const [summary, setSummary] = useState<string | null>(null);
  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSummary(mode === "plate" ? `Matrícula: ${String(data.get("plate")).toUpperCase()}` : `Medida: ${data.get("width")}/${data.get("profile")} R${data.get("rim")}`);
  }
  return <div className="border-y border-border py-8"><h2 className="font-display text-2xl font-semibold">Tu coche. La medida adecuada.</h2><div className="mt-6 inline-flex border border-border" role="group" aria-label="Datos del neumático"><Button variant={mode === "plate" ? "default" : "ghost"} type="button" aria-pressed={mode === "plate"} onClick={() => { setMode("plate"); setSummary(null); }}>Matrícula</Button><Button variant={mode === "size" ? "default" : "ghost"} type="button" aria-pressed={mode === "size"} onClick={() => { setMode("size"); setSummary(null); }}>Medidas</Button></div><form onSubmit={prepare} className="mt-7">
    {mode === "plate" ? <div><Label htmlFor="tyre-plate">Matrícula</Label><Input id="tyre-plate" name="plate" required maxLength={15} pattern="[A-Za-z0-9 -]{3,15}" className="mt-2 h-12 uppercase" autoComplete="off" /></div> : <div className="grid grid-cols-3 gap-3">{[{ name: "width", label: "Ancho", values: [135,145,155,165,175,185,195,205,215,225,235,245,255,265,275,285,295,305,315,325,335] }, { name: "profile", label: "Perfil", values: [25,30,35,40,45,50,55,60,65,70,75,80,85] }, { name: "rim", label: "Llanta", values: [12,13,14,15,16,17,18,19,20,21,22,23,24] }].map(field => <div key={field.name}><Label htmlFor={`tyre-${field.name}`}>{field.label}</Label><select id={`tyre-${field.name}`} name={field.name} required className="form-control mt-2"><option value="">—</option>{field.values.map(value => <option key={value} value={value}>{value}</option>)}</select></div>)}</div>}
    <Button type="submit" className="mt-6">Solicitar precio</Button><p className="mt-4 text-xs leading-5 text-muted-foreground">Consulta online de precios y disponibilidad pendiente de habilitar. Por ahora puedes pedir cita para revisar los neumáticos.</p>
  </form>{summary && <div role="status" className="mt-6 border-t border-border pt-6"><p className="text-sm font-semibold">{summary}</p><p className="mt-2 text-sm leading-6 text-muted-foreground">No se ha enviado ninguna solicitud. Para consultar alternativas, pide cita y añade estos datos en las notas.</p><Button variant="outline" className="mt-4" asChild><Link to="/pedir-cita" search={{ service: "tyres" }}>Pedir cita</Link></Button></div>}</div>;
}