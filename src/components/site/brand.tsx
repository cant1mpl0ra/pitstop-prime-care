import { Link } from "@tanstack/react-router";
import { Gauge } from "lucide-react";
import { cn } from "@/lib/utils";
export function Brand({ compact = false }: { compact?: boolean }) {
  return <Link to="/" className="group flex min-w-0 items-center gap-3" aria-label="PIT STOP MOTOR — Inicio">
    <span className="grid size-10 shrink-0 place-items-center border border-primary bg-primary text-primary-foreground transition-transform group-hover:-skew-x-6"><Gauge className="size-5" /></span>
    <span className={cn("min-w-0 font-display font-black leading-none tracking-normal", compact ? "text-base" : "text-lg")}><span className="text-foreground">PIT STOP</span><span className="text-primary"> MOTOR</span></span>
  </Link>;
}
