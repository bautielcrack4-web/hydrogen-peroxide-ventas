import Reveal from "./Reveal";
import Marcado from "./Marcado";

type Tono = "crema" | "papel" | "banda" | "bosque";

type Props = {
  id?: string;
  etiqueta?: string;
  titulo?: string;
  /** Trozo del título que va en color acento (debe existir dentro de `titulo`). */
  acento?: string;
  bajada?: string;
  children: React.ReactNode;
  className?: string;
  tono?: Tono;
  centrado?: boolean;
};

const fondos: Record<Tono, string> = {
  crema: "bg-crema",
  papel: "bg-crema-50",
  banda: "bg-crema-100",
  bosque: "bg-[#0c0c0f] text-crema-100",
};

/** Título con una parte en color acento. */
export function TituloAcento({
  texto,
  acento,
  className = "",
  oscuro = false,
}: {
  texto: string;
  acento?: string;
  className?: string;
  oscuro?: boolean;
}) {
  if (!acento || !texto.includes(acento)) {
    return (
      <h2 className={`titulo-serif ${oscuro ? "text-white" : ""} ${className}`}>
        {texto}
      </h2>
    );
  }
  const [antes, despues] = texto.split(acento);
  return (
    <h2 className={`titulo-serif ${oscuro ? "text-white" : ""} ${className}`}>
      {antes}
      <span className={oscuro ? "text-oro-claro" : "acento"}>{acento}</span>
      {despues}
    </h2>
  );
}

export default function Section({
  id,
  etiqueta,
  titulo,
  acento,
  bajada,
  children,
  className = "",
  tono = "crema",
  centrado = false,
}: Props) {
  const oscuro = tono === "bosque";
  const hayEncabezado = Boolean(etiqueta || titulo || bajada);

  return (
    <section id={id} className={`${fondos[tono]} py-16 sm:py-24 ${className}`}>
      <div className="contenedor">
        {hayEncabezado && (
          <Reveal>
            <div className={centrado ? "mx-auto max-w-2xl text-center" : ""}>
              {etiqueta && (
                <p className={`etiqueta ${oscuro ? "!text-oro-claro" : ""}`}>
                  {etiqueta}
                </p>
              )}
              {titulo && (
                <TituloAcento
                  texto={titulo}
                  acento={acento}
                  oscuro={oscuro}
                  className="mt-3 text-[2rem] sm:text-[2.6rem]"
                />
              )}
              {bajada && (
                <p
                  className={`mt-4 text-lg ${
                    oscuro ? "text-crema-200/80" : "text-tinta/70"
                  } ${centrado ? "mx-auto max-w-prosa" : "max-w-prosa"}`}
                >
                  <Marcado texto={bajada} />
                </p>
              )}
            </div>
          </Reveal>
        )}
        <div className={hayEncabezado ? "mt-12" : ""}>{children}</div>
      </div>
    </section>
  );
}
