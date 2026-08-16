/**
 * Fondo "aurora": manchas frías/joya muy difuminadas que derivan lento.
 * Da riqueza y profundidad al fondo teal sin tapar el texto. El contenedor
 * padre debe ser relative; el contenido, relative encima.
 */
export default function AuroraFondo({
  className = "",
  intensidad = 1,
}: {
  className?: string;
  intensidad?: number;
}) {
  const o = (v: number) => Math.min(1, v * intensidad);
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {/* Fondos con radial-gradient (borde suave por sí mismos): así son
          inmunes al bug de iOS Safari que descarta filter:blur y dejaría
          un bloque sólido tapando el texto. */}
      <div
        className="aurora-blob"
        style={{
          width: 380,
          height: 380,
          left: "-8%",
          top: "-12%",
          background: "radial-gradient(circle, #8A140B 0%, rgba(15,122,111,0) 68%)",
          opacity: o(0.5),
          animation: "derivar-a 15s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          width: 320,
          height: 320,
          right: "-6%",
          top: "10%",
          background: "radial-gradient(circle, #FF3B2E 0%, rgba(255,59,46,0) 68%)",
          opacity: o(0.28),
          animation: "derivar-b 19s ease-in-out infinite",
        }}
      />
      <div
        className="aurora-blob"
        style={{
          width: 300,
          height: 300,
          left: "34%",
          bottom: "-16%",
          background: "radial-gradient(circle, #C41306 0%, rgba(0,0,0,0) 68%)",
          opacity: o(0.42),
          animation: "derivar-c 17s ease-in-out infinite",
        }}
      />
    </div>
  );
}
