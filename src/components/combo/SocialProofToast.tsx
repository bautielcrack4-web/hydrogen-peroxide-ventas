"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { comboAvisos } from "@content/combo";

/**
 * Notificación flotante de prueba social ("X de tal lugar acaba de llevarse…").
 * Rota entre avisos, apareciendo y desapareciendo cada pocos segundos.
 */
export default function SocialProofToast() {
  const [i, setI] = useState(0);
  const [visible, setVisible] = useState(false);
  const [mins, setMins] = useState(9);

  useEffect(() => {
    let idx = 0;
    const ciclo = () => {
      idx = (idx + 1) % comboAvisos.length;
      setI(idx);
      setMins(2 + ((idx * 7) % 22)); // "hace N min" pseudo-variable, sin random
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    };
    const primero = setTimeout(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 5000);
    }, 3500);
    const t = setInterval(ciclo, 9000);
    return () => {
      clearTimeout(primero);
      clearInterval(t);
    };
  }, []);

  const aviso = comboAvisos[i];

  return (
    <div
      aria-hidden
      className={`fixed bottom-24 left-4 z-30 max-w-[17rem] rounded-xl border border-oro/20 bg-teal-abismo/95 px-4 py-3 text-crema-50 shadow-libro backdrop-blur transition-all duration-500 sm:bottom-24 sm:max-w-[19rem] ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-oro-claro">
          <Check className="h-4 w-4 text-bosque" aria-hidden />
        </span>
        <p className="text-[0.85rem] leading-snug">
          <b>{aviso.nombre}</b> from {aviso.lugar} just grabbed{" "}
          {aviso.producto}
          <span className="mt-0.5 block text-[0.72rem] text-crema-200/55">
            {mins} min ago
          </span>
        </p>
      </div>
    </div>
  );
}
