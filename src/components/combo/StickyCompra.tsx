"use client";

import { useEffect, useState } from "react";
import CheckoutLink from "@/components/ui/CheckoutLink";
import CtaLabel from "@/components/ui/CtaLabel";
import { checkoutCombo, planes } from "@/config/product";

const combo = planes.find((p) => p.id === "combo")!;

/** Barra de compra fija al pie del combo, aparece tras pasar el hero. */
export default function StickyCompra() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 450);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`glass fixed inset-x-0 bottom-0 z-40 border-t border-arena transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="contenedor flex items-center justify-between gap-3 py-3">
        <div className="leading-tight">
          <p className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-extrabold text-teal sm:text-2xl">
              ${combo.precio}
            </span>
            <span className="text-sm text-tinta/40 line-through">
              ${combo.precioAnterior}
            </span>
          </p>
          <p className="text-[0.7rem] leading-tight text-tinta/60 sm:text-xs">
            <span className="font-bold text-teal">Save $133</span> · 7-day guarantee
          </p>
        </div>
        <CheckoutLink
          href={checkoutCombo}
          className="boton-oro flex-none whitespace-nowrap rounded-full px-5 py-3 text-[0.85rem] font-bold text-bosque shadow-tarjeta transition active:translate-y-px sm:px-7 sm:text-[0.95rem]"
        >
          <CtaLabel base="I want the complete method" />
        </CheckoutLink>
      </div>
    </div>
  );
}
