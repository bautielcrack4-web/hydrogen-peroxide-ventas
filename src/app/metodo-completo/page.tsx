import type { Metadata } from "next";
import { ShieldCheck, Plus } from "lucide-react";
import ScrollProgress from "@/components/ui/ScrollProgress";
import ComboTopBar from "@/components/combo/ComboTopBar";
import ComboHero from "@/components/combo/ComboHero";
import ProductoReal from "@/components/combo/ProductoReal";
import ComboPricing from "@/components/landing/ComboPricing";
import Comparativa from "@/components/combo/Comparativa";
import StickyCompra from "@/components/combo/StickyCompra";
import ReordenSegunObjetivo from "@/components/combo/ReordenSegunObjetivo";
import FlipbookBotox from "@/components/combo/FlipbookBotox";
import TrustBridge from "@/components/combo/TrustBridge";
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
  default: ["capitulos", "flip", "compara", "pricing", "value", "reviews", "cierre", "autor"],
  hogar: ["flip", "capitulos", "compara", "pricing", "value", "reviews", "cierre", "autor"],
  reparador: ["capitulos", "compara", "pricing", "value", "reviews", "cierre", "autor", "flip"],
  ambos: ["compara", "value", "pricing", "flip", "capitulos", "reviews", "cierre", "autor"],
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
      <ScrollProgress />
      <ComboTopBar />
      <main className="lienzo">
        <ComboHero />
        <TrustBridge />
        <ProductoReal />

        {/* Secuencia central: se reordena según el objetivo del onboarding. */}
        <ReordenSegunObjetivo ordenes={ORDENES}>
          <ComboPricing id="planes" key="pricing" />
          <Comparativa key="compara" />

          {/* Cierre conspirativo (estilo "your utility company is counting on you…") */}
          <section key="cierre" className="py-24 text-crema-50 sm:py-32">
            <div className="contenedor">
              <Reveal>
                <div className="mx-auto max-w-2xl text-center">
                  <h2 className="display-seccion">
                    {comboCierre.titulo}
                  </h2>
                  {comboCierre.parrafos.map((p) => (
                    <p
                      key={p}
                      className="mx-auto mt-6 max-w-prosa text-[1.0625rem] leading-[1.7] text-crema-200"
                    >
                      {p}
                    </p>
                  ))}
                  <a
                    href={checkoutCombo}
                    className="hotmart-fb boton-oro mt-10 inline-flex items-center justify-center rounded-[10px] px-8 py-4 text-[1.0625rem] font-semibold tracking-[-0.01em]"
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


          {/* Testimonios */}
          <ComboReviews key="reviews" />

          {/* Conocé al autor */}
          <ComboAutor key="autor" />

          {/* Todo lo que se lleva hoy · value stack */}
          <ValueStackRegalado key="value" />
        </ReordenSegunObjetivo>

        {/* Garantía */}
        <section className="py-24 text-crema-50 sm:py-28">
          <div className="contenedor">
            <Reveal>
              <div className="mx-auto flex max-w-2xl flex-col items-center gap-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-10 text-center">
                <ShieldCheck className="h-10 w-10 text-crema-200" aria-hidden />
                <h2 className="titulo-serif text-[1.6rem]">
                  {comboGarantia.titulo}
                </h2>
                <p className="max-w-prosa text-[1.0625rem] leading-[1.7] text-crema-200">
                  {comboGarantia.texto}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* FAQ */}
        <section id="preguntas" className="py-24 text-crema-50 sm:py-28">
          <div className="contenedor">
            <Reveal>
              <h2 className="display-seccion text-center">
                Frequently asked questions
              </h2>
            </Reveal>
            <div className="mx-auto mt-12 max-w-2xl divide-y divide-white/[0.07]">
              {comboFaq.map((f) => (
                <details key={f.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-[1.0625rem] font-medium text-crema-50">
                    {f.q}
                    <Plus
                      className="mt-1 h-5 w-5 flex-none text-crema-200 transition-transform group-open:rotate-45"
                      aria-hidden
                    />
                  </summary>
                  <p className="mt-4 max-w-prosa text-[1rem] leading-[1.7] text-crema-200">
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
            <p className="mx-auto max-w-3xl text-center text-[0.8rem] leading-relaxed text-crema-200/55">
              {comboLegal}
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <StickyCompra />
    </>
  );
}
