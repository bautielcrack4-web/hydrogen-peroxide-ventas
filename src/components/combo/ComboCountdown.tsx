"use client";

import { useEffect, useState } from "react";
import { comboCountdown } from "@content/combo";

const PROMO_HORAS = 6;
const dos = (n: number) => String(n).padStart(2, "0");

export default function ComboCountdown() {
  const [r, setR] = useState<number | null>(null);

  useEffect(() => {
    const KEY = "combo_promo_deadline";
    let deadline = Number(localStorage.getItem(KEY));
    const ahora = Date.now();
    if (!deadline || deadline < ahora) {
      deadline = ahora + PROMO_HORAS * 3600 * 1000;
      localStorage.setItem(KEY, String(deadline));
    }
    const tick = () => setR(Math.max(0, deadline - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const h = r != null ? Math.floor(r / 3600000) : 6;
  const m = r != null ? Math.floor((r % 3600000) / 60000) : 0;
  const s = r != null ? Math.floor((r % 60000) / 1000) : 0;

  const Bloque = ({ val, lbl }: { val: number; lbl: string }) => (
    <div className="flex flex-col items-center">
      <span
        className="min-w-[3.4rem] rounded-xl bg-crema-50/[0.08] px-3 py-2 text-center font-serif text-3xl font-extrabold text-oro-claro ring-1 ring-oro/30 sm:text-4xl"
        suppressHydrationWarning
      >
        {dos(val)}
      </span>
      <span className="mt-1.5 text-[0.7rem] uppercase tracking-widest text-crema-200/60">
        {lbl}
      </span>
    </div>
  );

  return (
    <section className="py-12 text-crema-50">
      <div className="contenedor text-center">
        <p className="text-[0.8rem] font-bold uppercase tracking-[0.18em] text-oro-claro">
          {comboCountdown.titulo}
        </p>
        <div className="mt-5 flex items-start justify-center gap-3 sm:gap-5">
          <Bloque val={h} lbl="Hours" />
          <span className="pt-1 font-serif text-3xl text-oro-claro sm:text-4xl">:</span>
          <Bloque val={m} lbl="Min" />
          <span className="pt-1 font-serif text-3xl text-oro-claro sm:text-4xl">:</span>
          <Bloque val={s} lbl="Sec" />
        </div>
        <p className="mt-5 text-[0.9rem] italic text-crema-200/70">
          {comboCountdown.nota}
        </p>
      </div>
    </section>
  );
}
