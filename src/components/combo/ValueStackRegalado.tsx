"use client";

import { Check, ArrowRight, Gift } from "lucide-react";
import Anim from "@/components/ui/Anim";
import CountUp from "@/components/ui/CountUp";
import Confeti from "@/components/ui/Confeti";
import CheckoutLink from "@/components/ui/CheckoutLink";
import { useInView } from "@/components/ui/useInView";
import { comboValueStack } from "@content/combo";
import { checkoutCombo } from "@/config/product";

const soloNum = (s: string) => Number(String(s).replace(/[^0-9]/g, "")) || 0;

export default function ValueStackRegalado() {
  const VALOR = soloNum(comboValueStack.totalTachado);
  const HOY = soloNum(comboValueStack.hoy);
  const AHORRO = VALOR - HOY;
  const PCT = VALOR ? Math.round((AHORRO / VALOR) * 100) : 0;
  const [ref, enVista] = useInView<HTMLDivElement>();

  return (
    <section className="cv-auto py-16 text-crema-50 sm:py-20">
      <div className="contenedor">
        <Anim>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="titulo-serif texto-oro-vivo text-[1.9rem] sm:text-[2.4rem]">
              {comboValueStack.titulo}
            </h2>
            <p className="mt-3 text-[1rem] text-crema-200/80 sm:text-[1.08rem]">
              Add up what each piece is worth on its own. Then look at what you pay today.
            </p>
          </div>
        </Anim>

        <div
          ref={ref}
          className="relative mx-auto mt-8 max-w-xl rounded-2xl bg-crema-50 p-6 text-tinta shadow-libro sm:p-9"
        >
          <Confeti />
          <ul className="divide-y divide-dotted divide-arena">
            {comboValueStack.items.map((it, i) => (
              <Anim key={it.t} variant="left" delay={i * 80} as="li">
                <div className="flex items-baseline justify-between gap-4 py-3">
                  <span className="flex items-baseline gap-2 text-[0.96rem]">
                    <Check className="h-4 w-4 flex-none translate-y-0.5 text-teal" aria-hidden />
                    {it.t}
                  </span>
                  <span className="cifras whitespace-nowrap font-serif font-semibold text-tinta/45 line-through">
                    {it.v}
                  </span>
                </div>
              </Anim>
            ))}
          </ul>

          {/* Barras valor vs precio */}
          <div className="mt-7 space-y-4">
            <div>
              <div className="mb-1.5 flex items-baseline justify-between text-[0.82rem] font-semibold uppercase tracking-wide text-tinta/55">
                <span>What it's worth separately</span>
                <span className="font-serif text-lg text-tinta/50 line-through">
                  ${VALOR}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-tinta/[0.08]">
                <div
                  className="h-full rounded-full bg-tinta/25 transition-[width] duration-1000 ease-out"
                  style={{ width: enVista ? "100%" : "0%" }}
                />
              </div>
            </div>
            <div>
              <div className="mb-1.5 flex items-baseline justify-between text-[0.82rem] font-semibold uppercase tracking-wide text-teal">
                <span>What you pay today</span>
                <span className="font-serif text-lg text-teal">${HOY}</span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-tinta/[0.08]">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#E11D0F,#FF3B2E)] transition-[width] duration-[1400ms] ease-out"
                  style={{ width: enVista ? `${(HOY / VALOR) * 100}%` : "0%" }}
                />
              </div>
            </div>
          </div>

          {/* Precio final + ahorro */}
          <div className="mt-7 flex flex-col items-center gap-3 border-t-2 border-arena pt-6 text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-tinta/45">
              Today you get it all for
            </p>
            <p className="flex items-baseline gap-3">
              <span className="font-serif text-2xl text-tinta/35 line-through">
                <CountUp value={VALOR} prefix="$" />
              </span>
              {enVista && (
                <span className="precio-vivo animate-slam font-serif text-[3.6rem] font-extrabold leading-none">
                  ${HOY}
                </span>
              )}
            </p>
            <span
              className="animate-latido inline-flex items-center gap-2 rounded-full bg-[linear-gradient(95deg,#C41306,#FF3B2E_55%,#E11D0F)] px-4 py-1.5 text-[0.9rem] font-bold text-white"
              style={{ boxShadow: "0 0 20px -2px rgba(255,59,46,.7)" }}
            >
              <Gift className="h-4 w-4" aria-hidden /> Save ${AHORRO} · {PCT}% off
            </span>
          </div>

          <CheckoutLink
            href={checkoutCombo}
            className="boton-oro barrido group relative mt-7 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-full px-6 py-4 text-[1.05rem] font-bold text-bosque shadow-libro transition-all duration-200 hover:-translate-y-0.5 active:scale-[.98]"
          >
            I want the complete method · ${HOY}
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
          </CheckoutLink>
          <p className="mt-3 text-center text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-tinta/50">
            One-time payment · instant access · 7-day guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
