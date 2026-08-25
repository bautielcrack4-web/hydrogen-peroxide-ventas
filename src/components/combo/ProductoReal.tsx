import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

/**
 * El producto EXISTIENDO en una cocina real.
 *
 * Es la pieza que más levanta la percepción de calidad en un infoproducto y
 * era justo la que faltaba: la página vendía tres JPG flotando sobre negro.
 * La foto va sola, sin sellos ni badges encima — cualquier adorno sobre una
 * foto buena la vuelve un banner.
 *
 * El pie aclara que lo que se compra es el PDF: la foto es un mockup del
 * ejemplar impreso y decirlo explícitamente suma más confianza de la que resta.
 */
export default function ProductoReal() {
  return (
    <section className="py-24 text-crema-50 sm:py-32">
      <div className="contenedor">
        <Reveal>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/[0.07]">
            <Image
              src="/img/producto_mesada_a.jpg"
              alt="The Complete Peroxide Method on a kitchen counter, next to a bottle of hydrogen peroxide and a cloth"
              width={1536}
              height={1024}
              sizes="(max-width: 768px) 100vw, 768px"
              quality={86}
              className="block h-auto w-full"
            />
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mx-auto mt-10 max-w-xl text-center">
            <p className="text-[1.0625rem] leading-[1.7] text-crema-200">
              Everything organized room by room, with the exact amount for each
              trick and the chart of what you must never mix.
            </p>
            <p className="mt-4 text-[0.85rem] text-crema-200/55">
              Delivered as PDFs — read them on your phone, or print them and
              keep them in the kitchen like the copy above.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
