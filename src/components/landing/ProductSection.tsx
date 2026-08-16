import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import CTAButton from "@/components/ui/CTAButton";
import { TituloAcento } from "@/components/ui/Section";
import { producto, hero } from "@content/landing";
import { product, precioFormateado } from "@/config/product";

export default function ProductSection() {
  return (
    <section id="la-guia" className="bg-crema-100 py-16 sm:py-24">
      <div className="contenedor grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <div className="relative mx-auto w-full max-w-[21rem]">
            <div
              className="absolute -inset-3 rotate-[-1.5deg] rounded-2xl bg-[#0c0c0f]/10"
              aria-hidden
            />
            <Image
              src={product.portada}
              alt={`${product.nombre} cover`}
              width={900}
              height={1350}
              sizes="(max-width: 1024px) 70vw, 21rem"
              className="relative h-auto w-full rounded-xl shadow-libro"
            />
          </div>
        </Reveal>

        <Reveal delay={90}>
          <p className="etiqueta regla-corta">{producto.etiqueta}</p>
          <TituloAcento
            texto={producto.titulo}
            acento={producto.tituloAcento}
            className="mt-3 text-[2rem] sm:text-[2.5rem]"
          />
          <div className="mt-6 space-y-5">
            {producto.parrafos.map((p) => (
              <p key={p.slice(0, 24)} className="prosa">
                {p}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-t border-arena pt-6">
            <span className="font-serif text-5xl font-extrabold leading-none text-teal">
              {precioFormateado(product.precio)}
            </span>
            {product.mostrarPrecioAnterior && (
              <span className="text-xl text-vino/70 line-through">
                {precioFormateado(product.precioAnterior)}
              </span>
            )}
            <span className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-tinta/55">
              Launch price
            </span>
          </div>

          <CTAButton className="mt-6">{hero.cta}</CTAButton>
        </Reveal>
      </div>
    </section>
  );
}
