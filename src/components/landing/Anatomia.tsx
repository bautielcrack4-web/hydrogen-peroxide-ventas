import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { anatomia } from "@content/landing";

export default function Anatomia() {
  return (
    <Section
      tono="crema"
      etiqueta={anatomia.etiqueta}
      titulo={anatomia.titulo}
      centrado
    >
      <ol className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {anatomia.items.map((item, i) => (
          <Reveal key={item.numero} delay={i * 60}>
            <li className="h-full rounded-2xl border border-arena bg-crema-50 p-6 shadow-tarjeta">
              <span className="font-serif text-3xl font-extrabold italic leading-none text-oro">
                {item.numero}
              </span>
              <h3 className="mt-3 font-serif text-xl font-bold leading-snug text-tinta">
                {item.titulo}
              </h3>
              <p className="mt-2 leading-relaxed text-tinta/75">{item.detalle}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
