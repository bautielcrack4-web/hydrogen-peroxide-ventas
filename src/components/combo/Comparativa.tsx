import { Check, Lock, Minus, ArrowRight, Crown } from "lucide-react";
import Anim from "@/components/ui/Anim";
import CheckoutLink from "@/components/ui/CheckoutLink";
import { checkoutHogar, checkoutReparador, checkoutCombo } from "@/config/product";

type Fila = { t: string; v: [boolean, boolean, boolean]; excl?: boolean };

const filas: Fila[] = [
  { t: "Hydrogen Peroxide at Home (300 cleaning & garden tricks)", v: [true, false, true] },
  { t: "The Repairman's Secret (appliances, AC, car, drains)", v: [false, true, true] },
  { t: "The Master Recipe Book: the EXACT amounts for every trick", v: [false, false, true], excl: true },
  { t: "The “never mix” chart (safety)", v: [false, false, true], excl: true },
  { t: "Bonuses: 7-Day Challenge, printable dilutions & more", v: [false, false, true], excl: true },
  { t: "Lifetime updates", v: [true, true, true] },
];

const cols = [
  { n: "At Home", sub: "guide", precio: "27" },
  { n: "Repairman", sub: "guide", precio: "29" },
  { n: "Complete", sub: "both + recipe book", precio: "47", destacado: true },
];

function Celda({
  ok,
  excl,
  destacado,
  delay,
}: {
  ok: boolean;
  excl?: boolean;
  destacado?: boolean;
  delay: number;
}) {
  return (
    <td className={`px-1 py-3.5 text-center sm:px-4 ${destacado ? "bg-oro-claro/20" : ""}`}>
      <Anim variant="scale" delay={delay} duration={450} className="inline-flex">
        {ok ? (
          <span
            className={`inline-flex h-6 w-6 items-center justify-center rounded-full ${
              destacado ? "bg-oro text-white" : "bg-teal/15 text-teal"
            }`}
          >
            <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
          </span>
        ) : excl ? (
          <Lock className="mx-auto h-4 w-4 text-tinta/25" aria-hidden />
        ) : (
          <Minus className="mx-auto h-4 w-4 text-tinta/20" aria-hidden />
        )}
      </Anim>
    </td>
  );
}

export default function Comparativa() {
  return (
    <section className="py-16 text-crema-50 sm:py-24">
      <div className="contenedor">
        <Anim>
          <div className="mx-auto max-w-2xl text-center">
            <p className="etiqueta !text-oro-claro">Honest comparison</p>
            <h2 className="titulo-serif mt-3 text-[1.9rem] text-crema-50 sm:text-[2.5rem]">
              See the difference at a glance.
            </h2>
            <p className="mt-3 text-[1rem] text-crema-200/75 sm:text-[1.1rem]">
              For the same price as a single guide, you get{" "}
              <strong className="text-oro-claro">both — plus everything exclusive</strong>.
            </p>
          </div>
        </Anim>

        <Anim delay={80}>
          {/* pt-6: deja aire arriba para que el badge "Más elegido" (que sale
              del borde superior del th) no lo recorte el overflow del scroll. */}
          <div className="mx-auto mt-12 max-w-3xl overflow-x-auto rounded-2xl border border-arena bg-white pt-6 shadow-tarjeta">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="w-[38%] px-2.5 py-4 text-left align-bottom sm:px-5" />
                  {cols.map((c) => (
                    <th
                      key={c.n}
                      className={`relative px-1 py-4 text-center align-bottom sm:px-4 ${
                        c.destacado ? "bg-oro-claro/20" : ""
                      }`}
                    >
                      {c.destacado && (
                        <span className="absolute left-1/2 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap rounded-full bg-oro px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-bosque shadow-tarjeta">
                          <Crown className="h-3 w-3" aria-hidden /> Most chosen
                        </span>
                      )}
                      <span
                        className={`block font-serif text-[0.95rem] font-extrabold sm:text-[1.1rem] ${
                          c.destacado ? "text-teal" : "text-tinta"
                        }`}
                      >
                        {c.n}
                      </span>
                      <span className="block text-[0.66rem] uppercase tracking-wide text-tinta/50">
                        {c.sub}
                      </span>
                      <span
                        className={`mt-1 block font-serif text-lg font-bold ${
                          c.destacado ? "text-teal" : "text-tinta/70"
                        }`}
                      >
                        ${c.precio}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filas.map((f, ri) => (
                  <tr key={f.t} className="border-t border-arena/60">
                    <td className="px-2.5 py-3.5 text-left text-[0.8rem] leading-snug text-tinta/85 sm:px-5 sm:text-[0.95rem]">
                      {f.t}
                      {f.excl && (
                        <span className="ml-1.5 hidden rounded bg-oro-claro/30 px-1.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-oro sm:inline-block">
                          Exclusive
                        </span>
                      )}
                    </td>
                    {f.v.map((ok, ci) => (
                      <Celda
                        key={ci}
                        ok={ok}
                        excl={f.excl}
                        destacado={cols[ci].destacado}
                        delay={ri * 70 + ci * 40}
                      />
                    ))}
                  </tr>
                ))}
                <tr className="border-t border-arena">
                  <td className="px-2.5 py-4 sm:px-5" />
                  <td className="px-1 py-4 text-center sm:px-4">
                    <CheckoutLink
                      href={checkoutHogar}
                      className="inline-block rounded-full border border-teal/40 px-2.5 py-1.5 text-[0.72rem] font-bold text-teal transition-colors hover:bg-teal hover:text-crema-50"
                    >
                      $27
                    </CheckoutLink>
                  </td>
                  <td className="px-1 py-4 text-center sm:px-4">
                    <CheckoutLink
                      href={checkoutReparador}
                      className="inline-block rounded-full border border-teal/40 px-2.5 py-1.5 text-[0.72rem] font-bold text-teal transition-colors hover:bg-teal hover:text-crema-50"
                    >
                      $29
                    </CheckoutLink>
                  </td>
                  <td className="bg-oro-claro/20 px-1 py-4 text-center sm:px-4">
                    <CheckoutLink
                      href={checkoutCombo}
                      className="boton-oro inline-block rounded-full px-3 py-2 text-[0.75rem] font-bold text-bosque shadow-tarjeta"
                    >
                      $47
                    </CheckoutLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Anim>

        <Anim delay={120}>
          <div className="mt-9 text-center">
            <CheckoutLink
              href={checkoutCombo}
              className="boton-oro barrido group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-9 py-4 text-[1.05rem] font-bold text-bosque shadow-libro transition-all duration-200 hover:-translate-y-0.5 active:scale-[.98]"
            >
              Get the complete method · $47
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </CheckoutLink>
          </div>
        </Anim>
      </div>
    </section>
  );
}
