import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { autor } from "@content/landing";

export default function AuthorSection() {
  return (
    <section id="autor" className="bg-crema py-16 sm:py-24">
      <div className="contenedor grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal>
          <div className="relative mx-auto max-w-[19rem]">
            <div
              className="absolute -inset-2.5 -rotate-2 rounded-2xl bg-teal/10"
              aria-hidden
            />
            <Image
              src="/img/hero.jpg"
              alt={autor.imagenAlt}
              width={1050}
              height={1400}
              sizes="(max-width: 1024px) 70vw, 19rem"
              className="relative h-auto w-full rounded-2xl border border-arena object-cover shadow-tarjeta"
            />
          </div>
        </Reveal>

        <Reveal delay={90}>
          <p className="etiqueta regla-corta">{autor.etiqueta}</p>
          <h2 className="titulo-serif mt-3 text-[2rem] sm:text-[2.5rem]">
            {autor.titulo}
          </h2>
          <div className="mt-6 space-y-5">
            {autor.parrafos.map((p) => (
              <p key={p.slice(0, 24)} className="prosa">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-6 font-serif text-xl italic text-teal">
            {autor.firma}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
