"use client";

import { usePerfil } from "@/components/ui/usePerfil";

/**
 * Muestra el contenido solo para ciertos objetivos del onboarding.
 * Si el usuario NO hizo el quiz (sin perfil), muestra por defecto.
 * Ej: envolver la sección de belleza para ocultarla a quien eligió "salud".
 */
export default function MostrarSegunObjetivo({
  mostrarEn,
  children,
}: {
  mostrarEn: string[];
  children: React.ReactNode;
}) {
  const perfil = usePerfil();
  if (perfil?.obj && !mostrarEn.includes(perfil.obj)) return null;
  return <>{children}</>;
}
