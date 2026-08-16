"use client";

import { useEffect, useState } from "react";

export type Perfil = { nombre: string; edad?: string; obj?: string };

const KEY = "federer_perfil";

/** Lee el perfil del onboarding (localStorage) y se actualiza al completarlo. */
export function usePerfil() {
  const [perfil, setPerfil] = useState<Perfil | null>(null);

  useEffect(() => {
    const leer = () => {
      try {
        const raw = localStorage.getItem(KEY);
        setPerfil(raw ? (JSON.parse(raw) as Perfil) : null);
      } catch {
        setPerfil(null);
      }
    };
    leer();
    window.addEventListener("perfil", leer);
    window.addEventListener("storage", leer);
    return () => {
      window.removeEventListener("perfil", leer);
      window.removeEventListener("storage", leer);
    };
  }, []);

  return perfil;
}

export function objetivoTexto(obj?: string) {
  if (obj === "hogar") return "dejar su casa y su jardín impecables con casi nada";
  if (obj === "reparador") return "ahorrar cientos en reparaciones y en productos";
  if (obj === "ambos") return "una casa impecable y ahorrar en todo, con una sola botella";
  return "resolver casi todo con una botella de $1";
}
