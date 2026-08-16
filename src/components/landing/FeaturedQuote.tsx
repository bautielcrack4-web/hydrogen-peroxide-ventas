import Image from "next/image";
import { Quote } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Estrellas from "@/components/ui/Estrellas";
import type { Resena } from "@content/types";
import resenas from "@content/reviews.json";

/** Frase de un lector, a pantalla ancha, para cortar el ritmo del argumento. */
export default function FeaturedQuote({ nombre }: { nombre?: string }) {
  const lista = resenas as Resena[];
  const r = (nombre && lista.find((x) => x.nombre === nombre)) || lista[0];
  if (!r) return null;

  return (
    <section className="bg-crema-100 py-14 sm:py-20">
      <div className="contenedor">
        <Reveal>
          <figure className="mx-auto flex max-w-3xl flex-col items-center gap-7 text-center sm:flex-row sm:text-left">
            {r.foto && (
              <div className="relative h-32 w-32 flex-none overflow-hidden rounded-full border-4 border-crema-50 shadow-tarjeta">
                <Image
                  src={`/images/reviews/${r.foto}`}
                  alt={`${r.nombre || "Reader"} with their printed copy of the guide`}
                  fill
                  sizes="128px"
                  className="object-cover object-top"
                />
              </div>
            )}
            <div>
              <Quote
                className="mx-auto h-7 w-7 text-teal/30 sm:mx-0"
                aria-hidden
              />
              <blockquote className="mt-3 font-serif text-[1.35rem] italic leading-snug text-tinta sm:text-[1.6rem]">
                “{r.texto}”
              </blockquote>
              <figcaption className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-start">
                <Estrellas />
                <span className="font-bold text-tinta">{r.nombre}</span>
                {r.pais && (
                  <span className="text-tinta/60">· {r.pais}</span>
                )}
              </figcaption>
            </div>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
