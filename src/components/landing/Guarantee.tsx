import Reveal from "@/components/ui/Reveal";
import { garantia } from "@content/landing";
import { product } from "@/config/product";

export default function Guarantee() {
  return (
    <section className="bg-crema-100 py-16 sm:py-20">
      <div className="contenedor">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-7 rounded-2xl border-2 border-dashed border-teal/35 bg-crema-50 p-8 text-center shadow-tarjeta sm:flex-row sm:p-10 sm:text-left">
            <div
              className="flex h-28 w-28 flex-none flex-col items-center justify-center rounded-full border-4 border-double border-oro bg-crema text-teal"
              aria-hidden
            >
              <span className="font-serif text-4xl font-extrabold leading-none">
                {product.garantiaDias}
              </span>
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.2em]">
                days
              </span>
            </div>
            <div>
              <p className="etiqueta">No risk</p>
              <h2 className="titulo-serif mt-1.5 text-2xl sm:text-3xl">
                {garantia.titulo}
              </h2>
              <p className="mt-3 text-[1.08rem] leading-relaxed text-tinta/80">
                {garantia.texto}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
