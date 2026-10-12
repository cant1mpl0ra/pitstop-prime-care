import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, Eyebrow } from "@/components/site/layout";
import { TyreEnquiry } from "@/components/site/tyre-enquiry";
import { tyreContent } from "@/content/site";
import tyres from "@/assets/tyres-editorial.jpg";

export const Route = createFileRoute("/neumaticos")({
  head: () => ({ meta: [{ title: "Neumáticos en Lleida | PIT STOP motors" }, { name: "description", content: "Montaje, equilibrado, reparación y mantenimiento de neumáticos en Lleida. Consulta alternativas por matrícula o medidas." }, { property: "og:title", content: "Neumáticos | PIT STOP motors" }, { property: "og:description", content: "La opción adecuada para tu vehículo, tu uso y tu presupuesto." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }),
  component: TyresPage,
});
function TyresPage() {
  return <SiteLayout><section className="section pb-14 pt-16 lg:pb-20 lg:pt-20"><div className="grid items-start gap-12 lg:grid-cols-[1fr_.85fr]"><div><Eyebrow>Una especialidad principal</Eyebrow><h1 className="mt-7 font-display text-4xl font-semibold uppercase leading-tight sm:text-6xl">{tyreContent.title}</h1><p className="mt-7 text-xl">{tyreContent.intro}</p><p className="section-copy mt-5">{tyreContent.description}</p><img src={tyres} width={1536} height={1024} alt="Tres neumáticos sin marca, fotografía ilustrativa" className="mt-8 aspect-[3/2] w-full object-cover" /></div><TyreEnquiry /></div></section><section className="border-y border-border bg-surface-strong"><div className="section py-16 lg:py-20"><Eyebrow>Neumáticos con criterio</Eyebrow><div className="mt-8 grid border-t border-border sm:grid-cols-2 lg:grid-cols-4">{tyreContent.services.map((service, index) => <div key={service} className="border-b border-border py-7 pr-6"><span className="font-mono text-xs text-primary">0{index + 1}</span><h2 className="mt-5 font-display text-xl font-semibold">{service}</h2></div>)}</div><p className="section-copy mt-8">Revisamos el desgaste y el estado del neumático. Te explicamos las alternativas antes de que autorices el trabajo.</p></div></section></SiteLayout>;
}