import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye, Gauge, ShieldCheck, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Eyebrow, PageIntro, SiteLayout } from "@/components/site/layout";
import workshopImage from "@/assets/pit-stop-hero.jpg";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({
    meta: [
      { title: "Sobre PIT STOP MOTOR | Taller mecánico en Lleida" },
      { name: "description", content: "Conoce el enfoque de PIT STOP MOTOR: precisión técnica, transparencia y comunicación clara en Lleida." },
      { property: "og:title", content: "Sobre PIT STOP MOTOR" },
      { property: "og:description", content: "Una forma más clara y precisa de cuidar tu vehículo en Lleida." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/sobre-nosotros" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const principles = [
    [Gauge, "Precisión", "Cada decisión parte de una comprobación técnica clara."],
    [Eye, "Transparencia", "Explicamos el trabajo antes de intervenir en tu vehículo."],
    [ShieldCheck, "Confianza", "Tú autorizas el alcance y conoces el estado del proceso."],
    [Wrench, "Criterio", "Mantenimiento y reparación centrados en lo que el coche necesita."],
  ] as const;

  return <SiteLayout><PageIntro kicker="Sobre nosotros" title="MECÁNICA CON CRITERIO. TRATO SIN RODEOS." copy="PIT STOP MOTOR nace con una idea clara: combinar el rigor de un taller profesional con una experiencia más transparente, ágil y conectada."/><section className="section"><div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]"><div className="relative min-h-[420px] overflow-hidden border border-border"><img src={workshopImage} alt="Zona técnica de PIT STOP MOTOR" className="absolute inset-0 h-full w-full object-cover"/><div className="hero-overlay absolute inset-0"/><div className="absolute bottom-0 left-0 border-r border-t border-hero-line bg-hero-panel/85 p-6"><span className="metric-label">PIT STOP MOTOR</span><strong className="font-display text-2xl uppercase text-hero-foreground">Lleida</strong></div></div><div><Eyebrow>Nuestra forma de trabajar</Eyebrow><h2 className="section-title">Primero entender. Después actuar.</h2><p className="section-copy mt-6">Queremos que sepas qué ocurre con tu coche, qué trabajo se propone y en qué punto está. Por eso ponemos la diagnosis, la autorización previa y el seguimiento en el centro de la experiencia.</p><Button className="mt-8" asChild><Link to="/como-trabajamos">Conoce el proceso <ArrowRight/></Link></Button></div></div></section><section className="border-y border-border bg-surface-strong"><div className="section"><div className="section-head"><div><Eyebrow>Principios</Eyebrow><h2 className="section-title">Lo que guía cada trabajo.</h2></div><p className="section-copy">Una relación profesional se construye con información clara, decisiones compartidas y atención al detalle.</p></div><div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">{principles.map(([Icon,title,copy])=><article key={title} className="bg-surface-strong p-7"><Icon className="size-6 text-primary"/><h3 className="mt-12 font-display text-2xl font-bold uppercase">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{copy}</p></article>)}</div></div></section><section className="bg-primary"><div className="section grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-center"><div><p className="text-xs font-bold uppercase text-primary-foreground/70">Tu vehículo, en buenas manos</p><h2 className="mt-3 font-display text-4xl font-black uppercase text-primary-foreground sm:text-5xl">¿Empezamos?</h2></div><Button variant="inverted" size="lg" asChild><Link to="/pedir-cita">Pedir cita <ArrowRight/></Link></Button></div></section></SiteLayout>;
}