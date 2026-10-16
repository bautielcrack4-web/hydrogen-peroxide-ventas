"use client";

import { useEffect, useState } from "react";
import CheckoutLink from "@/components/ui/CheckoutLink";
import { checkoutCombo, planes } from "@/config/product";
import { Precio } from "@/components/ui/Dsc";

const combo = planes.find((p) => p.id === "combo")!;

/** Barra de compra fija al pie: precio + una accion. Nada mas. */
export default function StickyCompra() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`glass-dark fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.07] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="contenedor flex items-center justify-between gap-4 py-3">
        <div className="leading-tight">
          <p className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-extrabold tracking-display text-crema-50 sm:text-2xl">
              <Precio />
            </span>
            <s className="text-sm text-crema-200/60">${combo.precioAnterior}</s>
          </p>
          <p className="text-[0.72rem] leading-tight text-crema-200">
            Save <Precio k={1} /> &middot; 7-day guarantee
          </p>
        </div>
        <CheckoutLink
          href={checkoutCombo}
          className="boton-oro flex-none whitespace-nowrap rounded-[8px] px-5 py-3 text-[0.875rem] font-semibold sm:px-7 sm:text-[0.95rem]"
        >
          Get the complete method
        </CheckoutLink>
      </div>
    </div>
  );
}
