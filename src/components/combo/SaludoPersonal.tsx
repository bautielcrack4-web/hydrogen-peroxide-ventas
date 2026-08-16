"use client";

import { Sparkles } from "lucide-react";
import { usePerfil } from "@/components/ui/usePerfil";

const ANGULO: Record<string, string> = {
  hogar: "to get your home and garden spotless for next to nothing",
  reparador: "to stop overpaying on repairs and cleaning",
  ambos: "to handle the whole house with one cheap bottle",
};

/** Banda de saludo/ángulo personalizado según el objetivo del onboarding. */
export default function SaludoPersonal() {
  const perfil = usePerfil();
  if (!perfil?.nombre) return null;
  const angulo = ANGULO[perfil.obj || ""] || "made to help you around the house";

  return (
    <div className="border-b border-oro/15 bg-teal/[0.06] text-teal">
      <div className="contenedor flex items-center justify-center gap-2 py-2.5 text-center text-[0.9rem] font-semibold">
        <Sparkles className="h-4 w-4 flex-none text-oro" aria-hidden />
        <span>
          Hi <strong className="text-teal">{perfil.nombre}</strong> — we put this together{" "}
          <strong className="text-teal">{angulo}</strong>.
        </span>
      </div>
    </div>
  );
}
