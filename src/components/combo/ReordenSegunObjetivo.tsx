"use client";

import { Children, isValidElement } from "react";
import type { ReactNode } from "react";
import { usePerfil } from "@/components/ui/usePerfil";

/**
 * Reordena las secciones de la página según el objetivo del onboarding,
 * usando CSS `order` (no re-monta nada: cada hijo va en un wrapper flex y
 * solo cambia su orden). Cada hijo debe llevar `key`. Sin perfil, orden
 * de origen (la secuencia `default`).
 */
type Ordenes = Record<string, string[]>;

export default function ReordenSegunObjetivo({
  ordenes,
  children,
}: {
  ordenes: Ordenes;
  children: ReactNode;
}) {
  const perfil = usePerfil();
  const seq = (perfil?.obj && ordenes[perfil.obj]) || ordenes.default;

  return (
    <div className="flex flex-col">
      {Children.map(children, (child, i) => {
        const key =
          isValidElement(child) && child.key != null ? String(child.key) : null;
        const idx = key ? seq.indexOf(key) : -1;
        // Los que no están en la secuencia quedan al final, en orden de origen.
        const order = idx >= 0 ? idx : seq.length + i;
        return <div style={{ order }}>{child}</div>;
      })}
    </div>
  );
}
