import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageIntro, Eyebrow } from "@/components/site/layout";
import { OfferGrid, useCommercialDate } from "@/components/site/commercial-blocks";
import { getOfferStatus, offers } from "@/content/site";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/ofertas")({
  head: () => ({ meta: [{ title: "Ofertas y próximas campañas | PIT STOP motors" }, { name: "description", content: "Consulta las ofertas de PIT STOP motors en Lleida. Las promociones de lanzamiento están pendientes de definir." }, { property: "og:title", content: "Ofertas PIT STOP motors" }, { property: "og:description", content: "Campañas claras, con condiciones visibles cuando estén disponibles." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: OffersPage,
});
function OffersPage() {
  const today = useCommercialDate();
  const active = today ? offers.filter(offer => getOfferStatus(offer, today) === "active") : [];
  const upcoming = today ? offers.filter(offer => getOfferStatus(offer, today) === "upcoming") : [];
  const ended = today ? offers.filter(offer => getOfferStatus(offer, today) === "ended") : [];
  return <SiteLayout><PageIntro kicker="Ofertas" title="OFERTAS PIT STOP." copy="Promociones claras. Sin letra pequeña escondida. Publicaremos cada campaña con sus fechas y condiciones cuando esté definida." /><section className="section py-14 lg:py-20"><Eyebrow>Ahora</Eyebrow><h2 className="mt-5 font-display text-3xl font-semibold uppercase">Ofertas activas</h2>{today && active.length > 0 ? <OfferGrid items={active} today={today} /> : <div className="mt-8 border-y border-border py-8"><p className="text-lg">Todavía no hay promociones activas.</p><p className="mt-3 text-sm text-muted-foreground">Puedes reservar los servicios del taller sin esperar a una campaña.</p><Button variant="outline" className="mt-6" asChild><Link to="/pedir-cita">Pedir cita</Link></Button></div>}</section><section className="border-y border-border bg-surface-strong"><div className="section py-14 lg:py-20"><Eyebrow>Próximamente</Eyebrow><h2 className="mt-5 font-display text-3xl font-semibold uppercase">Las primeras campañas.</h2><p className="section-copy mt-5 mb-7">Promociones de lanzamiento pendientes de definir. Estas fichas no son ofertas vigentes.</p>{today && <OfferGrid items={upcoming} today={today} />}</div></section>{today && ended.length > 0 && <section className="section"><h2 className="font-display text-3xl font-semibold uppercase">Finalizadas</h2><OfferGrid items={ended} today={today} /></section>}</SiteLayout>;
}