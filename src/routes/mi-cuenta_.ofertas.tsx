import { createFileRoute, Link } from "@tanstack/react-router";
import { ClientHeading, ClientLayout } from "@/components/site/client-layout";
import { useCommercialDate } from "@/components/site/commercial-blocks";
import { Button } from "@/components/ui/button";
import { getClientOffers, offers } from "@/content/site";

export const Route = createFileRoute("/mi-cuenta_/ofertas")({
  head: () => ({ meta: [
    { title: "Ofertas para clientes | PIT STOP motors" },
    { name: "description", content: "Ofertas disponibles para reservar servicios de PIT STOP motors, con vigencia y condiciones visibles." },
    { property: "og:title", content: "Ofertas para clientes | PIT STOP motors" },
    { property: "og:description", content: "Consulta las campañas disponibles y solicita cita para tu vehículo." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: ClientOffersPage,
});

function ClientOffersPage() {
  const today = useCommercialDate();
  const available = today ? getClientOffers(offers, today) : [];
  return <ClientLayout>
    <ClientHeading title="Ofertas" copy="Campañas del taller, con sus fechas y condiciones." />
    <section className="mx-auto max-w-[1500px] px-5 py-10 sm:py-14 lg:px-8" aria-live="polite">
      {!today ? <p className="text-sm text-muted-foreground">Consultando ofertas…</p> : available.length === 0 ?
        <div className="border-y border-border py-12 sm:py-16">
          <p className="text-[11px] font-bold uppercase text-primary">Sin campañas vigentes</p>
          <h2 className="mt-5 font-display text-2xl font-semibold sm:text-3xl">No hay ofertas activas ahora.</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">Puedes pedir cita para el mantenimiento o la revisión de tu coche sin esperar a una promoción.</p>
          <Button className="mt-7" asChild><Link to="/pedir-cita">Pedir cita</Link></Button>
        </div> :
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{available.map(offer => <article key={offer.id} className="flex min-w-0 flex-col border border-border bg-card p-6">
          {offer.image && <img src={offer.image} alt={offer.title} loading="lazy" className="mb-6 aspect-[3/2] w-full object-cover" />}
          <p className="text-[11px] font-bold uppercase text-primary">Oferta activa</p>
          <h2 className="mt-4 font-display text-2xl font-semibold">{offer.title}</h2>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">{offer.description}</p>
          {(offer.priceLabel || offer.discountLabel) && <p className="mt-5 text-xl font-semibold text-primary">{[offer.discountLabel, offer.priceLabel].filter(Boolean).join(" · ")}</p>}
          <dl className="mt-6 border-t border-border pt-4 text-xs leading-6 text-muted-foreground">
            <dt className="font-semibold text-foreground">Vigencia</dt><dd>{offer.startDate ? `Desde ${offer.startDate}` : "Sin fecha de inicio indicada"}{offer.endDate ? ` · Hasta ${offer.endDate}` : " · Sin fecha de fin indicada"}</dd>
            <dt className="mt-3 font-semibold text-foreground">Condiciones</dt><dd>{offer.conditions || "Sin condiciones adicionales indicadas."}</dd>
          </dl>
          <Button className="mt-7 self-start" asChild><Link to="/pedir-cita" search={{ service: offer.serviceCode }}>{offer.cta}</Link></Button>
        </article>)}</div>}
    </section>
  </ClientLayout>;
}