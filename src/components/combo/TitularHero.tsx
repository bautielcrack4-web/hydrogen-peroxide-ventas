"use client";

import { usePerfil } from "@/components/ui/usePerfil";

/**
 * Titular del hero personalizado según el objetivo del onboarding.
 * Sin perfil (o en el server) usa el titular por defecto que le pasan.
 * El acento va en dorado cursivo, como el diseño original.
 */
type Parte = { antes: string; acento: string; despues: string };

const VARIANTES: Record<string, Parte> = {
  hogar: {
    antes: "A spotless home and garden ",
    acento: "with a $1 bottle",
    despues: ".",
  },
  reparador: {
    antes: "Stop paying the repairman: ",
    acento: "a $1 bottle fixes it",
    despues: ".",
  },
  ambos: {
    antes: "What the pros ",
    acento: "don't want you to know",
    despues: ".",
  },
};

export default function TitularHero({ base }: { base: Parte }) {
  const perfil = usePerfil();
  const t = (perfil?.obj && VARIANTES[perfil.obj]) || base;
  return (
    <>
      {t.antes}
      <em className="italic text-oro-claro">{t.acento}</em>
      {t.despues}
    </>
  );
}
