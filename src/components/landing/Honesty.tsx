import Reveal from "@/components/ui/Reveal";
import Ornamento from "@/components/ui/Ornamento";
import { TituloAcento } from "@/components/ui/Section";
import { honestidad } from "@content/landing";

export default function Honesty() {
  return (
    <section className="bg-crema py-16 sm:py-20">
      <div className="contenedor">
        <Reveal>
          <div className="mx-auto max-w-2xl">
            <Ornamento className="mb-8" />
            <p className="etiqueta">{honestidad.etiqueta}</p>
            <TituloAcento
              texto={honestidad.titulo}
              acento={honestidad.tituloAcento}
              className="mt-3 text-[1.8rem] sm:text-[2.2rem]"
            />
            <div className="mt-5 space-y-4">
              {honestidad.parrafos.map((p) => (
                <p key={p.slice(0, 24)} className="prosa">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
