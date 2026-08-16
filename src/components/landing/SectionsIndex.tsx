import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { secciones } from "@content/landing";

/** Índice editorial de la guía, con guía de puntos como en un libro real. */
export default function SectionsIndex() {
  return (
    <Section
      id="secciones"
      tono="crema"
      etiqueta={secciones.etiqueta}
      titulo={secciones.titulo}
      bajada={secciones.bajada}
      centrado
    >
      <Reveal>
        <ol className="mx-auto max-w-4xl columns-1 gap-x-12 md:columns-2">
          {secciones.items.map((s, i) => (
            <li
              key={s.titulo}
              className="flex break-inside-avoid flex-wrap items-baseline gap-x-3 border-b border-arena/70 py-3.5"
            >
              <span className="w-8 flex-none font-serif text-lg font-bold italic text-oro">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-semibold text-tinta">{s.titulo}</span>
              {/* La guía de puntos solo tiene sentido cuando entran en una línea */}
              <span
                className="hidden min-w-4 flex-1 translate-y-[-0.3rem] border-b border-dotted border-arena sm:block"
                aria-hidden
              />
              <span className="ml-11 w-full text-[0.95rem] italic text-tinta/60 sm:ml-0 sm:w-auto sm:text-right">
                {s.detalle}
              </span>
            </li>
          ))}
        </ol>
      </Reveal>
    </Section>
  );
}
