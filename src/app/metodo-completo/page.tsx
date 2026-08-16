import type { Metadata } from "next";
import { ShieldCheck, Plus } from "lucide-react";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ComboTopBar from "@/components/combo/ComboTopBar";
import ComboHero from "@/components/combo/ComboHero";
import ComboPricing from "@/components/landing/ComboPricing";
import Comparativa from "@/components/combo/Comparativa";
import SocialProofToast from "@/components/combo/SocialProofToast";
import StickyCompra from "@/components/combo/StickyCompra";
import Onboarding from "@/components/combo/Onboarding";
import SaludoPersonal from "@/components/combo/SaludoPersonal";
import ReordenSegunObjetivo from "@/components/combo/ReordenSegunObjetivo";
import CierrePersonal from "@/components/combo/CierrePersonal";
import FlipbookBotox from "@/components/combo/FlipbookBotox";
import TrustBridge from "@/components/combo/TrustBridge";
import ComboCountdown from "@/components/combo/ComboCountdown";
import {
  ComboCapitulos,
  ComboReviews,
  ComboAutor,
} from "@/components/combo/ComboSections";
import ValueStackRegalado from "@/components/combo/ValueStackRegalado";
import Footer from "@/components/landing/Footer";
import Reveal from "@/components/ui/Reveal";
import { comboGarantia, comboFaq, comboCierre, comboLegal } from "@content/combo";
import { checkoutCombo, product, planes } from "@/config/product";

const precioCombo = planes.find((p) => p.id === "combo")!.precio;

/**
 * Orden de las secciones según lo que el usuario respondió en el onboarding.
 * Piel: primero la guía bella (flipbook) + capítulos. Salud: primero el
 * contenido/capítulos (el flipbook de belleza va al final y de hecho se
 * oculta). Ambos: primero el ahorro (value stack). Sin perfil → orden base.
 */
const ORDENES: Record<string, string[]> = {
  // Flujo de conversión: desear (qué hay adentro + recetario) → anclar
  // (comparativa) → precio → reforzar valor → prueba social → enemigo →
  // urgencia → autoridad. La oferta ya está en el hero para el comprador listo.
  default: ["capitulos", "flip", "compara", "pricing", "value", "reviews", "cierre", "count", "autor"],
  hogar: ["flip", "capitulos", "compara", "pricing", "value", "reviews", "cierre", "count", "autor"],
  reparador: ["capitulos", "compara", "pricing", "value", "reviews", "cierre", "count", "autor", "flip"],
  ambos: ["compara", "value", "pricing", "flip", "capitulos", "reviews", "cierre", "count", "autor"],
};

export const metadata: Metadata = {
  title: "The Complete Hydrogen Peroxide Method — both guides + The Master Recipe Book",
  description:
    "Both guides together (home/garden + The Repairman's Secret) plus The Master Recipe Book with the exact amounts and every bonus. One-time payment, instant access, 7-day guarantee.",
  alternates: { canonical: `${product.siteUrl}/metodo-completo` },
};

export default function MetodoCompleto() {
  return (
    <>
      <Onboarding />
      <ScrollProgress />
      <ComboTopBar />
      <SaludoPersonal />
      <main className="lienzo">
        <ComboHero />
        <TrustBridge />

        {/* Secuencia central: se reordena según el objetivo del onboarding. */}
        <ReordenSegunObjetivo ordenes={ORDENES}>
          <ComboPricing id="planes" key="pricing" />
          <Comparativa key="compara" />

          {/* Cierre conspirativo (estilo "your utility company is counting on you…") */}
          <section key="cierre" className="py-16 text-crema-50 sm:py-20">
            <div className="contenedor">
              <Reveal>
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="titulo-serif text-[1.9rem] leading-tight text-crema-50 sm:text-[2.4rem]">
                    {comboCierre.titulo}
                  </h2>
                  {comboCierre.parrafos.map((p) => (
                    <p
                      key={p}
                      className="mx-auto mt-5 max-w-prosa text-[1.08rem] leading-relaxed text-crema-200/85"
                    >
                      {p}
                    </p>
                  ))}
                  <a
                    href={checkoutCombo}
                    className="hotmart-fb boton-oro mt-8 inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-lg font-bold text-bosque shadow-libro transition-all duration-200 hover:-translate-y-0.5 active:scale-[.98]"
                  >
                    {comboCierre.cta} — ${precioCombo}
                  </a>
                </div>
              </Reveal>
            </div>
          </section>

          {/* Mirá adentro · capítulos con bloqueados */}
          <ComboCapitulos key="capitulos" />

          {/* Ver el Recetario Maestro por dentro (flipbook) */}
          <FlipbookBotox key="flip" />


          {/* Countdown grande */}
          <ComboCountdown key="count" />

          {/* Testimonios */}
          <ComboReviews key="reviews" />

          {/* Conocé al autor */}
          <ComboAutor key="autor" />

          {/* Todo lo que se lleva hoy · value stack */}
          <ValueStackRegalado key="value" />
        </ReordenSegunObjetivo>

        {/* Cierre personalizado con su nombre (solo si dejó su nombre) */}
        <CierrePersonal />

        {/* Garantía */}
        <section className="py-16 text-crema-50">
          <div className="contenedor">
            <Reveal>
              <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-2xl border border-oro/25 bg-crema-50/[0.05] p-8 text-center">
                <ShieldCheck className="h-12 w-12 text-oro-claro" aria-hidden />
                <h2 className="titulo-serif text-[1.7rem] text-crema-50">
                  {comboGarantia.titulo}
                </h2>
                <p className="max-w-prosa text-[1.05rem] leading-relaxed text-crema-200/85">
                  {comboGarantia.texto}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="preguntas" className="py-16 text-crema-50">
          <div className="contenedor">
            <Reveal>
              <h2 className="titulo-serif text-center text-[2rem] text-crema-50">
                Frequently asked questions
              </h2>
            </Reveal>
            <div className="mx-auto mt-8 max-w-2xl divide-y divide-crema-50/12">
              {comboFaq.map((f) => (
                <details key={f.q} className="group py-4">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[1.05rem] font-semibold text-crema-50">
                    {f.q}
                    <Plus
                      className="mt-1 h-5 w-5 flex-none text-oro-claro transition-transform group-open:rotate-45"
                      aria-hidden
                    />
                  </summary>
                  <p className="mt-3 max-w-prosa text-[0.98rem] leading-relaxed text-crema-200/80">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Disclaimer legal */}
        <section className="pb-14 pt-4 text-crema-50">
          <div className="contenedor">
            <p className="mx-auto max-w-3xl text-center text-[0.8rem] italic leading-relaxed text-crema-200/50">
              {comboLegal}
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <SocialProofToast />
      <StickyCompra />
    </>
  );
}
