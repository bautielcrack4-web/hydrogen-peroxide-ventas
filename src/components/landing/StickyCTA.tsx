"use client";

import { useEffect, useState } from "react";
import { product, precioFormateado } from "@/config/product";

/** Barra de compra fija al pie, una vez que el lector pasó el hero. */
export default function StickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 760);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-arena bg-crema-50/95 backdrop-blur transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="contenedor flex items-center justify-between gap-4 py-3">
        <div className="leading-tight">
          <p className="flex items-baseline gap-2">
            <span className="font-serif text-2xl font-extrabold text-teal">
              {precioFormateado(product.precio)}
            </span>
            {product.mostrarPrecioAnterior && (
              <span className="text-sm text-vino/60 line-through">
                {precioFormateado(product.precioAnterior)}
              </span>
            )}
          </p>
          <p className="text-xs text-tinta/60">
            Instant access · {product.garantiaDias}-day guarantee
          </p>
        </div>
        <a
          href={product.checkoutUrl}
          className="hotmart-fb flex-none rounded-full bg-teal px-7 py-3.5 text-lg font-bold text-crema-50 shadow-suave transition active:scale-[.98] hover:bg-teal-dark"
        >
          I want the guide
        </a>
      </div>
    </div>
  );
}
