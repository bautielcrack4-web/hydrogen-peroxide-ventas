"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, ChevronDown, BadgeCheck, Youtube, Quote } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Estrellas from "@/components/ui/Estrellas";
import { resenasCopy } from "@content/landing";
import type { Resena } from "@content/types";
import resenasRaw from "@content/reviews.json";

// Las reseñas con foto primero: lideran el muro visual.
const resenas = [...(resenasRaw as Resena[])].sort(
  (a, b) => (b.foto ? 1 : 0) - (a.foto ? 1 : 0)
);

const INICIAL = 6;

function Sello({ origen }: { origen?: Resena["origen"] }) {
  if (origen === "youtube") {
    return (
      <span className="inline-flex items-center gap-1 font-semibold text-vino">
        <Youtube className="h-4 w-4" aria-hidden /> YouTube comment
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 font-semibold text-teal">
      <BadgeCheck className="h-4 w-4" aria-hidden /> Verified purchase
    </span>
  );
}

function Tarjeta({ r }: { r: Resena }) {
  const foto = r.foto ? `/images/reviews/${r.foto}` : null;
  return (
    <figure className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-arena bg-crema-50 shadow-tarjeta transition-transform duration-200 hover:-translate-y-1">
      {foto && (
        <div className="relative aspect-[4/5] w-full bg-crema-100">
          <Image
            src={foto}
            alt={`${r.nombre || "Reader"} with their printed copy of the guide`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <Estrellas />
          {!foto && <Quote className="h-6 w-6 text-teal/35" aria-hidden />}
        </div>
        <blockquote className="mt-3 text-[1.05rem] font-medium leading-relaxed text-tinta/90">
          “{r.texto}”
        </blockquote>
        <figcaption className="mt-4 border-t border-arena/70 pt-3">
          <p className="truncate font-bold text-tinta">{r.nombre || "Reader"}</p>
          <p className="flex flex-wrap items-center gap-x-3 text-sm text-tinta/60">
            <Sello origen={r.origen} />
            {r.pais && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" aria-hidden /> {r.pais}
              </span>
            )}
          </p>
        </figcaption>
      </div>
    </figure>
  );
}

export default function Reviews() {
  const [todas, setTodas] = useState(false);

  // Sin reseñas cargadas todavía, la sección no se renderiza:
  // mejor ninguna prueba social que una inventada.
  if (resenas.length === 0) return null;

  const visibles = todas ? resenas : resenas.slice(0, INICIAL);

  return (
    <section id="resenas" className="bg-crema-100 py-16 sm:py-24">
      <div className="contenedor">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="etiqueta">{resenasCopy.etiqueta}</p>
            <h2 className="titulo-serif mt-3 text-[2rem] sm:text-[2.6rem]">
              {resenasCopy.titulo}
            </h2>
            <div className="mt-4 flex items-center justify-center gap-3">
              <Estrellas />
              <span className="font-bold text-tinta">
                {resenas.length} reviews from real readers
              </span>
            </div>
            <p className="mt-3 text-lg text-tinta/70">{resenasCopy.bajada}</p>
          </div>
        </Reveal>

        <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
          {visibles.map((r, i) => (
            <Tarjeta key={`${r.nombre}-${i}`} r={r} />
          ))}
        </div>

        {resenas.length > INICIAL && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => setTodas((v) => !v)}
              aria-expanded={todas}
              className="inline-flex items-center gap-2 rounded-full border-2 border-teal/25 bg-crema-50 px-7 py-3.5 text-lg font-bold text-teal transition hover:bg-white hover:border-teal/45"
            >
              {todas ? "Show less" : `See all ${resenas.length} reviews`}
              <ChevronDown
                className={`h-5 w-5 transition-transform ${todas ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
