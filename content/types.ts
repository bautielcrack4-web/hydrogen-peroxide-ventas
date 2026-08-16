export type Resena = {
  /** Texto tal cual lo escribió el lector. */
  texto: string;
  nombre?: string;
  pais?: string;
  /** Nombre del archivo dentro de /public/images/reviews (ej: "review-01.jpg"). */
  foto?: string;
  /**
   * Origen de la reseña. Cambia el sello que se muestra:
   *  - "compra"   → “Compra verificada” (lector que compró la guía)
   *  - "youtube"  → “Comentario en YouTube” (espectador del canal)
   */
  origen?: "compra" | "youtube";
};
