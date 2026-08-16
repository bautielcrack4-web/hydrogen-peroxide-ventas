"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Devuelve [ref, enVista]. Se dispara una sola vez cuando el elemento
 * entra en el viewport. Respeta prefers-reduced-motion (arranca visible).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  margin = "0px 0px -12% 0px",
  threshold = 0.15
) {
  const ref = useRef<T>(null);
  const [enVista, setEnVista] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setEnVista(true);
      return;
    }
    // Salvaguarda (igual que Reveal): si ya está en/cerca del viewport al
    // montar, mostrar de una — así nada queda invisible si el scroll no dispara.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      setEnVista(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setEnVista(true);
            io.disconnect();
          }
        });
      },
      { threshold, rootMargin: margin }
    );
    io.observe(el);
    return () => io.disconnect();
    // margin/threshold son constantes por instancia: el observer se arma una
    // sola vez al montar. Deps vacías = tamaño de array siempre constante.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, enVista] as const;
}
