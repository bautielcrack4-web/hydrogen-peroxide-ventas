/**
 * Etiqueta de CTA. Antes cambiaba el texto segun el perfil del onboarding
 * (y con un perfil viejo en localStorage inyectaba espanol en una pagina en
 * ingles). Ahora hay UN solo CTA en toda la pagina: variar el texto del boton
 * entre secciones diluye la accion.
 */
export default function CtaLabel({ base }: { base: string }) {
  return <>{base}</>;
}
