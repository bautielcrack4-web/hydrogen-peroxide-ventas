"use client";

import Image from "next/image";
import { useRef, useMemo } from "react";
import { Star, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import comboWall from "@content/combo-reviews.json";
import { usePerfil } from "@/components/ui/usePerfil";

type Reseña = {
  texto: string;
  nombre: string;
  pais: string;
  foto: string;
  origen?: string;
};
const BASE = (comboWall as Reseña[]).filter((r) => r.foto);

export default function ReviewsCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const perfil = usePerfil();

  // Ordena las reseñas según el objetivo del onboarding: primero las del tema
  // que le importa (piel / salud / combo). Sin perfil, orden por defecto.
  const RESENAS = useMemo(() => {
    const obj = perfil?.obj;
    if (!obj) return BASE;
    const primero =
      obj === "hogar" ? "hogar" : obj === "reparador" ? "reparador" : "combo";
    const rank = (r: Reseña) => (r.origen === primero ? 0 : 1);
    return [...BASE].sort((a, b) => rank(a) - rank(b));
  }, [perfil]);
  const scroll = (dir: number) =>
    ref.current?.scrollBy({ left: dir * 340, behavior: "smooth" });

  return (
    <div className="relative">
      {/* Pista del carrusel */}
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {RESENAS.map((r) => (
          <figure
            key={r.nombre + r.texto.slice(0, 12)}
            className="w-[17rem] shrink-0 snap-start sm:w-[19rem]"
          >
            {/* Foto UGC grande, protagonista */}
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl shadow-libro ring-1 ring-crema-50/10">
              <Image
                src={r.foto}
                alt={`${r.nombre} with their guide`}
                fill
                sizes="(max-width:640px) 70vw, 19rem"
                className="object-cover"
              />
              {/* Sello verificado arriba */}
              <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-teal-abismo/85 px-2.5 py-1 text-[0.68rem] font-bold text-crema-50 backdrop-blur">
                <BadgeCheck className="h-3.5 w-3.5 text-oro-claro" aria-hidden />
                Verified purchase
              </span>
              {/* Nombre sobre gradiente abajo */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-10">
                <div className="mb-1 flex gap-0.5 text-oro-claro">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-oro-claro" aria-hidden />
                  ))}
                </div>
                <p className="text-[0.95rem] font-bold text-white">
                  {r.nombre}
                  {r.pais ? (
                    <span className="font-normal text-white/70"> · {r.pais}</span>
                  ) : null}
                </p>
              </div>
            </div>
            {/* Testimonio debajo */}
            <blockquote className="mt-3 rounded-xl bg-crema-50 p-4 text-[0.9rem] leading-relaxed text-tinta/85 shadow-tarjeta">
              {r.texto}
            </blockquote>
          </figure>
        ))}
      </div>

      {/* Flechas (desktop) */}
      <button
        type="button"
        onClick={() => scroll(-1)}
        aria-label="Previous"
        className="absolute -left-3 top-[28%] hidden h-11 w-11 items-center justify-center rounded-full bg-crema-50 text-teal shadow-libro transition hover:bg-white sm:flex"
      >
        <ChevronLeft className="h-6 w-6" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => scroll(1)}
        aria-label="Next"
        className="absolute -right-3 top-[28%] hidden h-11 w-11 items-center justify-center rounded-full bg-crema-50 text-teal shadow-libro transition hover:bg-white sm:flex"
      >
        <ChevronRight className="h-6 w-6" aria-hidden />
      </button>

      <p className="mt-2 text-center text-[0.8rem] text-crema-200/50 sm:hidden">
        Swipe to see more →
      </p>
    </div>
  );
}
