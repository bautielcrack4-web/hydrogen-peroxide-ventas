import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Section from "@/components/ui/Section";
import { vistazo } from "@content/landing";

export default function GuidePreview() {
  return (
    <Section
      id="adentro"
      tono="banda"
      etiqueta={vistazo.etiqueta}
      titulo={vistazo.titulo}
      bajada={vistazo.bajada}
      centrado
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {vistazo.items.map((item, i) => (
          <Reveal key={item.img} delay={i * 70}>
            <figure className="h-full overflow-hidden rounded-2xl border border-arena bg-crema-50 shadow-tarjeta transition-transform duration-200 hover:-translate-y-1">
              <div className="relative aspect-square w-full bg-white">
                <Image
                  src={item.img}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
                  className="object-cover"
                />
              </div>
              <figcaption className="p-5">
                <h3 className="font-serif text-lg font-bold leading-snug text-tinta">
                  {item.titulo}
                </h3>
                <p className="mt-1.5 text-[0.95rem] leading-snug text-tinta/70">
                  {item.pie}
                </p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
