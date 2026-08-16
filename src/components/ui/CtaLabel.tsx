"use client";

import { usePerfil } from "@/components/ui/usePerfil";

/** Texto de CTA que habla de la meta del usuario (piel / salud / ambos). */
const CTA: Record<string, string> = {
  hogar: "Quiero los 300 trucos",
  reparador: "Quiero ahorrar en reparaciones",
  ambos: "Quiero el método completo",
};

export default function CtaLabel({ base }: { base: string }) {
  const perfil = usePerfil();
  return <>{(perfil?.obj && CTA[perfil.obj]) || base}</>;
}
