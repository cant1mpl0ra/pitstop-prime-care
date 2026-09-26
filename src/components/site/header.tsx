import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Brand } from "./brand";
const links = [["/servicios","Servicios"],["/como-trabajamos","Cómo trabajamos"],["/presupuesto-digital","Presupuesto digital"],["/seguimiento","Seguimiento"],["/opiniones","Opiniones"],["/contacto","Contacto"]] as const;
export function SiteHeader() {
 const [open,setOpen]=useState(false);
 return <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl"><div className="mx-auto grid h-18 max-w-[1500px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:px-8"><Brand /><nav className="hidden items-center gap-5 xl:flex" aria-label="Navegación principal">{links.map(([to,label])=><Link key={to} to={to} className="text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground" activeProps={{className:"text-primary"}}>{label}</Link>)}</nav><div className="hidden items-center gap-2 sm:flex"><Button variant="ghost" size="sm" asChild><Link to="/mi-cuenta"><UserRound /> Mi cuenta</Link></Button><Button size="sm" asChild><Link to="/pedir-cita">Pedir cita</Link></Button></div><Button variant="ghost" size="icon" className="sm:hidden" onClick={()=>setOpen(!open)} aria-label={open?"Cerrar menú":"Abrir menú"}>{open?<X/>:<Menu/>}</Button></div>{open&&<div className="border-t border-border bg-background px-5 py-5 sm:hidden"><nav className="grid gap-1">{links.map(([to,label])=><Link key={to} to={to} onClick={()=>setOpen(false)} className="border-b border-border py-3 text-sm font-semibold">{label}</Link>)}<Link to="/mi-cuenta" onClick={()=>setOpen(false)} className="py-3 text-sm font-semibold">Mi cuenta</Link><Button className="mt-3" asChild><Link to="/pedir-cita" onClick={()=>setOpen(false)}>Pedir cita</Link></Button></nav></div>}</header>;
}
