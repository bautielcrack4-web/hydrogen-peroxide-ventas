import { Fragment } from "react";

/**
 * Renderiza los `**negritas**` del copy de content/landing.ts.
 * Así el texto vive en un solo lugar y no hay JSX mezclado con la redacción.
 */
export default function Marcado({
  texto,
  claseFuerte = "font-bold text-tinta",
}: {
  texto: string;
  claseFuerte?: string;
}) {
  const partes = texto.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {partes.map((parte, i) =>
        i % 2 === 1 ? (
          <strong key={i} className={claseFuerte}>
            {parte}
          </strong>
        ) : (
          <Fragment key={i}>{parte}</Fragment>
        )
      )}
    </>
  );
}
