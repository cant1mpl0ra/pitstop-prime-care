import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { SiteLayout } from "./layout";
import { clientNavigation } from "@/content/site";

export function ClientLayout({ children }: { children: ReactNode }) {
  return <SiteLayout>
    <div className="border-b border-border bg-background">
      <nav aria-label="Navegación de clientes" className="mx-auto grid max-w-[1500px] grid-cols-3 px-5 sm:flex sm:gap-6 lg:px-8">
        {clientNavigation.map(({ to, label }) => <Link key={to} to={to}
          className="min-w-0 border-b-2 border-transparent px-1 py-4 text-center text-[11px] font-bold text-muted-foreground transition-colors hover:text-primary sm:text-xs"
          activeProps={{ className: "border-primary text-primary" }} activeOptions={{ exact: true }}>{label}</Link>)}
      </nav>
    </div>
    {children}
  </SiteLayout>;
}

export function ClientHeading({ title, copy }: { title: string; copy: string }) {
  return <header className="border-b border-border">
    <div className="mx-auto max-w-[1500px] px-5 py-10 sm:py-14 lg:px-8">
      <p className="text-[11px] font-bold uppercase text-primary">Área cliente</p>
      <h1 className="mt-5 font-display text-3xl font-semibold uppercase sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">{copy}</p>
    </div>
  </header>;
}