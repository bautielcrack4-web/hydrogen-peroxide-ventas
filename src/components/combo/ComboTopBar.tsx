"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { checkoutCombo } from "@/config/product";
import { comboBarra } from "@content/combo";

const PROMO_HORAS = 6;

function dos(n: number) {
  return String(n).padStart(2, "0");
}

export default function ComboTopBar() {
  const [restante, setRestante] = useState<number | null>(null);
  const [leyendo, setLeyendo] = useState(comboBarra.leyendoAhora);

  useEffect(() => {
    // Deadline persistente por navegador: 6 h desde la primera visita.
    const KEY = "combo_promo_deadline";
    let deadline = Number(localStorage.getItem(KEY));
    const ahora = Date.now();
    if (!deadline || deadline < ahora) {
      deadline = ahora + PROMO_HORAS * 3600 * 1000;
      localStorage.setItem(KEY, String(deadline));
    }
    const tick = () => setRestante(Math.max(0, deadline - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    // "N leyendo ahora" con leve oscilación para dar sensación de vida.
    const t = setInterval(() => {
      setLeyendo((n) => {
        const delta = Math.floor((Math.sin(Date.now() / 9000) * 6));
        return Math.max(60, comboBarra.leyendoAhora + delta);
      });
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const h = restante != null ? Math.floor(restante / 3600000) : null;
  const m = restante != null ? Math.floor((restante % 3600000) / 60000) : null;
  const s = restante != null ? Math.floor((restante % 60000) / 1000) : null;

  return (
    <div className="glass-dark sticky top-0 z-50 border-b border-oro/20 text-crema-50">
      <div className="contenedor flex h-14 items-center justify-between gap-3">
        <span className="hidden font-serif text-[0.95rem] font-bold text-oro-claro sm:block">
          {comboBarra.marca}
        </span>

        <div className="flex flex-1 items-center justify-center gap-3 text-[0.8rem] sm:gap-5 sm:text-[0.85rem]">
          <span className="hidden items-center gap-1.5 text-crema-200/80 sm:flex">
            <span className="h-2 w-2 animate-pulse rounded-full bg-alerta" />
            {leyendo} viewing now
          </span>
          <span className="flex items-center gap-1.5 font-semibold">
            <AlertTriangle className="h-4 w-4 text-oro-claro" aria-hidden />
            <span className="hidden xs:inline">{comboBarra.aviso}</span>
            <span
              className="tabular-nums rounded-md bg-oro px-2 py-0.5 font-bold text-bosque"
              suppressHydrationWarning
            >
              {h != null ? `${dos(h)}:${dos(m!)}:${dos(s!)}` : "06:00:00"}
            </span>
          </span>
        </div>

        <a
          href={checkoutCombo}
          className="hotmart-fb whitespace-nowrap rounded-full bg-oro-claro px-4 py-2 text-[0.85rem] font-bold text-bosque shadow-tarjeta transition hover:bg-white"
        >
          {comboBarra.cta}
        </a>
      </div>
    </div>
  );
}
