import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "./layout";
import { getHomeOffers, getOfferStatus, indicativeTimes, offers, timingDisclaimer, tyreContent, workshopLocations, locationStageLabels, type Offer } from "@/content/site";
import tyres from "@/assets/tyres-editorial.jpg";

export function useCommercialDate() {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => { setToday(new Date().toISOString().slice(0, 10)); }, []);
  return today;
}

export function OfferGrid({ items, today }: { items: Offer[]; today: string }) {
  return <div className="grid gap-6 md:grid-cols-3">{items.map((offer, index) => {
    const status = getOfferStatus(offer, today);
    return <article key={offer.id} className="flex min-w-0 flex-col border-t border-border py-7">
      {offer.image && <img src={offer.image} alt={offer.title} className="mb-6 aspect-[3/2] w-full object-cover" loading="lazy" />}
      <div className="flex items-center justify-between gap-3 text-[10px] font-bold uppercase text-primary"><span>{status === "active" ? "Oferta activa" : status === "ended" ? "Finalizada" : "Próxima campaña"}</span><span className="font-mono text-muted-foreground">0{index + 1}</span></div>
      <h3 className="mt-7 font-display text-2xl font-semibold">{offer.title}</h3>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{offer.description}</p>
      {!offer.placeholder && <div className="mt-4 text-xs leading-6 text-muted-foreground">{offer.startDate && <p>Desde: {offer.startDate}</p>}{offer.endDate && <p>Hasta: {offer.endDate}</p>}{offer.conditions && <p>{offer.conditions}</p>}</div>}
      {status === "active" && <Button variant="outline" className="mt-7 self-start" asChild><Link to="/pedir-cita" search={{ service: offer.serviceCode }}>{offer.cta}</Link></Button>}
    </article>;
  })}</div>;
}

export function HomeOffers() {
  const today = useCommercialDate();
  return <section className="section py-16 lg:py-20"><div className="section-head mb-8"><div><Eyebrow>Ofertas</Eyebrow><h2 className="mt-5 font-display text-4xl font-semibold uppercase sm:text-5xl">Ofertas PIT STOP</h2></div><div><p className="section-copy">Las primeras campañas están pendientes de definir. Todavía no hay promociones activas.</p><Link to="/ofertas" className="mt-4 inline-block text-xs font-bold uppercase text-primary">Ver ofertas →</Link></div></div>{today && <OfferGrid items={getHomeOffers(offers, today)} today={today} />}</section>;
}

export function TyreTeaser() {
  return <section className="border-y border-border bg-surface-strong"><div className="section grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-20"><div><Eyebrow>Especialistas en neumáticos</Eyebrow><h2 className="mt-6 font-display text-4xl font-semibold uppercase leading-tight sm:text-5xl">{tyreContent.title}</h2><p className="mt-5 text-xl">{tyreContent.intro}</p><p className="section-copy mt-4">Por matrícula o por medidas. Revisamos tu vehículo y tu uso antes de recomendar.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild><Link to="/neumaticos">Solicitar precio</Link></Button><Button variant="outline" asChild><Link to="/pedir-cita" search={{ service: "tyres" }}>Pedir cita</Link></Button></div></div><img src={tyres} width={1536} height={1024} loading="lazy" alt="Neumáticos sin marca, imagen ilustrativa de la especialidad" className="aspect-[3/2] w-full object-cover" /></div></section>;
}

export function ServiceTimes() {
  return <div className="mt-14"><Eyebrow>Cada segundo cuenta</Eyebrow><h2 className="mt-5 font-display text-3xl font-semibold uppercase sm:text-4xl">También organizamos tu tiempo.</h2><div className="mt-8 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">{indicativeTimes.map(item => <div key={item.service} className="border-b border-border py-6 sm:pr-6"><h3 className="text-sm font-semibold">{item.service}</h3><p className="mt-4 font-display text-3xl font-semibold text-primary"><span className="text-xs font-sans font-normal text-muted-foreground">aprox. </span>{item.minutes} <span className="text-base">min</span></p></div>)}</div><p className="mt-5 max-w-2xl text-xs leading-5 text-muted-foreground">{timingDisclaimer}</p></div>;
}

export function GrowthSection() {
  return <section className="border-y border-border bg-surface-strong"><div className="section"><Eyebrow>Visión de largo plazo</Eyebrow><h2 className="section-title">El próximo PIT STOP</h2><div className="mt-12 grid border-t border-border md:grid-cols-2">{workshopLocations.map(location => <article key={location.id} className="min-w-0 border-b border-border py-8 md:first:border-r md:first:pr-10 md:last:pl-10"><p className="text-xs font-bold uppercase text-primary">{location.stage === "current" ? "Ahora" : "Siguiente fase"}</p><h3 className="mt-5 font-display text-2xl font-semibold">{location.name}</h3><p className="mt-4 text-xs font-bold uppercase text-muted-foreground">{location.specialty}</p>{location.stage !== "current" && <p className="mt-6 border-l-2 border-primary pl-3 text-sm font-semibold">{locationStageLabels[location.stage]}</p>}<p className="mt-6 max-w-lg text-sm leading-7 text-muted-foreground">{location.description}</p></article>)}</div></div></section>;
}

export function AboutTeaser() {
  const future = workshopLocations.find(location => location.stage === "planning");
  return <section className="section grid gap-10 py-16 lg:grid-cols-[1.2fr_.8fr] lg:py-20"><div><Eyebrow>Sobre nosotros</Eyebrow><h2 className="mt-5 font-display text-3xl font-semibold uppercase leading-tight sm:text-4xl">Un taller nuevo.<br />Una forma diferente de hacer las cosas.</h2><p className="section-copy mt-6">Nacemos en Lleida, especializados en mecánica rápida y neumáticos. Construimos el taller desde cero alrededor de una experiencia más clara.</p><Link to="/sobre-nosotros" className="mt-6 inline-block text-xs font-bold uppercase text-primary">Conoce PIT STOP →</Link></div>{future && <div className="border-t border-border pt-7 lg:border-l lg:border-t-0 lg:pl-10"><Eyebrow>El próximo PIT STOP</Eyebrow><h3 className="mt-5 font-display text-2xl font-semibold">Área industrial de Lleida</h3><p className="mt-3 text-xs font-bold uppercase text-primary">{locationStageLabels[future.stage]}</p><p className="mt-5 text-sm leading-7 text-muted-foreground">Una futura instalación de mayor capacidad para trabajos que requieren más espacio y equipamiento.</p><Link to="/sobre-nosotros" className="mt-6 inline-block text-xs font-bold uppercase text-primary">Nuestra siguiente fase →</Link></div>}</section>;
}