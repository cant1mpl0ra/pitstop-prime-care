import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Eyebrow, PageIntro, SiteLayout } from "@/components/site/layout";
import { GrowthSection } from "@/components/site/commercial-blocks";
import { aboutContent } from "@/content/site";
import workshopImage from "@/assets/pit-stop-hero.jpg";

export const Route = createFileRoute("/sobre-nosotros")({
  head: () => ({ meta: [
    { title: "Sobre nosotros | PIT STOP motors, un nuevo taller en Lleida" },
    { name: "description", content: "PIT STOP motors nace en Lleida como un nuevo taller de mecánica rápida y neumáticos, con claridad, rapidez y transparencia." },
    { property: "og:title", content: "Un taller nuevo. Una forma diferente | PIT STOP motors" },
    { property: "og:description", content: "Mecánica rápida, neumáticos y una visión de largo plazo. Conoce nuestro punto de partida y la siguiente fase en planificación." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ], links: [{ rel: "canonical", href: "/sobre-nosotros" }] }),
  component: AboutPage,
});
function AboutPage() {
  return <SiteLayout><PageIntro kicker="Sobre nosotros" title={aboutContent.title} copy={aboutContent.intro} />
    <section className="section"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><Eyebrow>Construido desde cero</Eyebrow><h2 className="mt-6 font-display text-3xl font-semibold uppercase leading-tight sm:text-4xl">No heredamos una forma de trabajar.<br />Estamos construyendo la nuestra.</h2></div><div className="space-y-7">{aboutContent.paragraphs.map(paragraph => <p key={paragraph} className="max-w-3xl text-base leading-8 text-muted-foreground">{paragraph}</p>)}</div></div><figure className="relative mt-14"><img src={workshopImage} width={1536} height={1024} loading="lazy" alt="Imagen ilustrativa de taller, pendiente de sustituir por la fotografía real de PIT STOP motors" className="aspect-[4/3] w-full object-cover md:aspect-[21/8]" /><figcaption className="mt-3 text-xs text-muted-foreground">Imagen temporal · fotografía real del taller pendiente.</figcaption></figure></section>
    <section className="border-y border-border bg-surface-strong"><div className="section"><Eyebrow>Nuestra especialidad</Eyebrow><h2 className="section-title">Mecánica rápida.<br />Neumáticos.</h2><div className="mt-12 grid border-t border-border md:grid-cols-2">{aboutContent.specialties.map((item, index) => <article key={item.title} className="border-b border-border py-8 md:first:border-r md:first:pr-10 md:last:pl-10"><span className="font-mono text-xs text-primary">0{index + 1}</span><h3 className="mt-6 font-display text-3xl font-semibold uppercase">{item.title}</h3><p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">{item.description}</p><Link to={index === 0 ? "/servicios" : "/neumaticos"} className="mt-7 inline-block text-xs font-bold uppercase text-primary">{index === 0 ? "Ver servicios" : "Ver neumáticos"} →</Link></article>)}</div></div></section>
    <section className="section"><Eyebrow>Lo que nos mueve</Eyebrow><h2 className="section-title">Te explicamos.<br />Tú decides.</h2><div className="mt-12 grid border-t border-border md:grid-cols-2">{aboutContent.values.map(item => <div key={item.title} className="border-b border-border py-8 md:odd:border-r md:odd:pr-8 md:even:pl-8"><h3 className="text-xs font-bold uppercase text-primary">{item.title}</h3><p className="mt-5 text-lg leading-7">{item.description}</p></div>)}</div><p className="section-copy mt-8">Ves qué necesita tu coche. Ves las fotos. Autorizas el presupuesto. Sigues la reparación. Te explicamos qué necesita tu coche; tú decides qué autorizas.</p></section>
    <GrowthSection />
    <section className="bg-foreground text-background"><div className="section"><p className="text-xs font-bold uppercase text-background/70">PIT STOP motors</p><h2 className="mt-7 max-w-5xl font-display text-4xl font-semibold uppercase leading-tight sm:text-6xl">{aboutContent.closing}</h2><Button variant="inverted" className="mt-10" size="lg" asChild><Link to="/pedir-cita">Pedir cita</Link></Button></div></section>
  </SiteLayout>;
}
