import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
export function Brand({ compact = false }: { compact?: boolean }) {
  return <Link to="/" className="group flex min-w-0 items-center" aria-label="PIT STOP motors — Inicio">
    <span className={cn("flex h-10 items-center border-l-[3px] border-primary pl-3 font-sans font-extrabold leading-none tracking-normal text-foreground", compact ? "text-sm" : "text-base")}>
      <span>PIT STOP</span><span className="ml-1.5 font-medium text-primary">motors</span>
    </span>
  </Link>;
}
