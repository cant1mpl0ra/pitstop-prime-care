import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { primaryNavigation, secondaryNavigation } from "@/content/site";
import { Brand } from "./brand";
export function SiteHeader() {
 const [open,setOpen]=useState(false);
 const menuLinks=[...primaryNavigation,...secondaryNavigation];
  return <header className="sticky inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-xl"><div className="mx-auto grid h-20 max-w-[1500px] grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:px-8"><Brand /><nav className="hidden min-w-0 items-center justify-end gap-4 lg:flex xl:gap-6" aria-label="Navegación principal">{primaryNavigation.map(({to,label})=><Link key={to} to={to} className="whitespace-nowrap text-[11px] font-bold uppercase text-muted-foreground transition-colors hover:text-foreground" activeProps={{className:"text-primary"}}>{label}</Link>)}</nav><Button className="hidden shrink-0 lg:inline-flex" size="sm" asChild><Link to="/pedir-cita">Pedir cita</Link></Button><Button variant="ghost" size="icon" className="shrink-0 lg:hidden" onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="site-menu" aria-label={open?"Cerrar menú":"Abrir menú"}>{open?<X/>:<Menu/>}</Button></div>{open&&<div id="site-menu" className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-border bg-background px-5 py-5 lg:hidden"><nav className="mx-auto grid max-w-[1500px]" aria-label="Menú principal">{menuLinks.map(({to,label})=><Link key={to} to={to} onClick={()=>setOpen(false)} className="border-b border-border py-3 text-sm font-semibold text-muted-foreground" activeProps={{className:"text-primary"}}>{label}</Link>)}<Button className="mt-5" asChild><Link to="/pedir-cita" onClick={()=>setOpen(false)}>Pedir cita</Link></Button></nav></div>}</header>;
}
