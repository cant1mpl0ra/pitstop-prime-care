import type { ReactNode } from "react";
import { SiteHeader } from "./header"; import { SiteFooter } from "./footer";
export function SiteLayout({children}:{children:ReactNode}){return <div className="min-h-screen bg-background text-foreground"><SiteHeader/><main>{children}</main><SiteFooter/></div>}
export function Eyebrow({children}:{children:ReactNode}){return <div className="eyebrow"><span/> {children}</div>}
export function PageIntro({kicker,title,copy}:{kicker:string;title:string;copy:string}){return <section className="page-intro"><div className="page-grid" aria-hidden/><div className="relative mx-auto max-w-[1500px] px-5 pb-16 pt-36 lg:px-8 lg:pb-24 lg:pt-44"><Eyebrow>{kicker}</Eyebrow><h1 className="mt-6 max-w-5xl font-display text-5xl font-black leading-[.94] tracking-normal sm:text-7xl lg:text-8xl">{title}</h1><p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">{copy}</p></div></section>}
