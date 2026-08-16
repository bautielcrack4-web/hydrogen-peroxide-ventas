import Image from "next/image";
import { Star, Lock, Zap, ShieldCheck, Download } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import CTAButton from "@/components/ui/CTAButton";
import { oferta } from "@content/landing";
import { product, precioFormateado } from "@/config/product";

const badges = [
  { icono: Lock, texto: "100% secure payment" },
  { icono: Zap, texto: "Instant access" },
  { icono: ShieldCheck, texto: `${product.garantiaDias}-day guarantee` },
  { icono: Download, texto: "Instant download" },
];

export default function Offer() {
  return (
    <section id="comprar" className="bg-crema py-16 sm:py-24">
      <div className="contenedor">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="etiqueta">{oferta.etiqueta}</p>
            <h2 className="titulo-serif mt-3 text-[2rem] sm:text-[2.6rem]">
              {oferta.titulo}
            </h2>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border-2 border-teal/25 bg-crema-50 shadow-suave">
            {/* Stack de valor */}
            <ul className="px-6 pt-6 sm:px-9 sm:pt-9">
              {oferta.items.map((item) => (
                <li
                  key={item.titulo}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-dotted border-arena py-4"
                >
                  <span className="min-w-0 flex-1">
                    <span
                      className={`flex items-baseline gap-2 text-[1.1rem] font-bold ${
                        item.estrella ? "text-teal" : "text-tinta"
                      }`}
                    >
                      {item.estrella && (
                        <Star
                          className="h-4 w-4 flex-none fill-oro text-oro"
                          aria-hidden
                        />
                      )}
                      {item.titulo}
                    </span>
                    <span className="mt-1 block text-[0.95rem] italic leading-snug text-tinta/60">
                      {item.detalle}
                    </span>
                  </span>
                  <span className="whitespace-nowrap font-serif text-lg text-tinta/50">
                    {item.valor}
                  </span>
                </li>
              ))}
            </ul>

            <div className="px-6 sm:px-9">
              <div className="flex items-baseline justify-between py-4 font-serif text-xl font-bold text-tinta">
                <span>Total value</span>
                <span className="line-through decoration-vino/60 decoration-2">
                  {oferta.valorTotal}
                </span>
              </div>
            </div>

            {/* Precio de hoy */}
            <div className="mx-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-arena bg-crema-100 px-6 py-5 sm:mx-9">
              <div className="flex items-center gap-4">
                <Image
                  src={product.portada}
                  alt={`${product.nombre} cover`}
                  width={900}
                  height={1350}
                  sizes="76px"
                  className="h-auto w-[4.75rem] rounded-md shadow-tarjeta"
                />
                <span className="font-serif text-xl italic text-teal">
                  Today you pay
                </span>
              </div>
              <span className="font-serif text-5xl font-extrabold leading-none text-teal">
                {precioFormateado(product.precio)}
              </span>
            </div>

            <div className="px-6 pb-8 pt-6 sm:px-9">
              <CTAButton className="w-full text-xl">{oferta.cta}</CTAButton>
              <p className="mt-4 text-center text-[0.72rem] font-bold uppercase tracking-[0.16em] text-tinta/55">
                {oferta.microtrust}
              </p>

              <ul className="mt-6 grid grid-cols-2 gap-3 border-t border-arena pt-6 sm:grid-cols-4">
                {badges.map(({ icono: Icono, texto }) => (
                  <li
                    key={texto}
                    className="flex flex-col items-center gap-1.5 text-center"
                  >
                    <Icono className="h-5 w-5 text-teal" aria-hidden />
                    <span className="text-[0.8rem] font-semibold leading-tight text-tinta/70">
                      {texto}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
