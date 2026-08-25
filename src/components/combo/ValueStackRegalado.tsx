"use client";

import { Check, Gift } from "lucide-react";
import Anim from "@/components/ui/Anim";
import CountUp from "@/components/ui/CountUp";
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
    <section className="cv-auto py-24 text-crema-50 sm:py-32">
      <div className="contenedor">
        <Anim>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="display-seccion">
              {comboValueStack.titulo}
            </h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-crema-200">
              Add up what each piece is worth on its own. Then look at what you pay today.
            </p>
          </div>
        </Anim>

        <div
          ref={ref}
          className="relative mx-auto mt-12 max-w-xl rounded-2xl bg-crema-50 p-7 text-tinta shadow-libro sm:p-10"
        >
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
                  className="h-full rounded-full bg-oro transition-[width] duration-[1400ms] ease-out"
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
                <span className="font-serif text-[3.75rem] font-extrabold leading-none tracking-display text-tinta">
                  ${HOY}
                </span>
              )}
            </p>
            <span className="inline-flex items-center gap-2 rounded-full bg-oro px-4 py-1.5 text-[0.88rem] font-semibold text-white">
              <Gift className="h-4 w-4" aria-hidden /> Save ${AHORRO} · {PCT}% off
            </span>
          </div>

          <CheckoutLink
            href={checkoutCombo}
            className="boton-oro mt-8 inline-flex w-full items-center justify-center rounded-[10px] px-6 py-4 text-[1.0625rem] font-semibold tracking-[-0.01em]"
          >
            Get the complete method · ${HOY}
          </CheckoutLink>
          <p className="mt-3 text-center text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-tinta/50">
            One-time payment · instant access · 7-day guarantee
          </p>
        </div>
      </div>
    </section>
  );
}
