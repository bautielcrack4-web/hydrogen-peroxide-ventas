/**
 * SELLO DE GARANTÍA — estampa circular con texto curvo.
 *
 * Reemplaza al icono suelto de escudo: un sello con texto alrededor lee como
 * una marca de certificación y no como un pictograma de librería. Va en
 * `currentColor`, así que hereda el color del bloque donde se use.
 */
export default function SelloGarantia({
  size = 132,
  dias = 7,
  className = "",
}: {
  size?: number;
  dias?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={`${dias}-day money-back guarantee`}
    >
      <defs>
        {/* MEDIOS arcos explícitos, ambos de izquierda a derecha, para que
            los dos textos se lean derechos. Con círculos completos y
            startOffset el texto de abajo salía invertido y fuera del canto:
            la diferencia está en el sweep-flag (1 = por arriba, 0 = por
            abajo), no en el offset. */}
        <path id="sello-arco-arriba" d="M 30,100 A 70,70 0 0,1 170,100" fill="none" />
        <path id="sello-arco-abajo" d="M 32,100 A 68,68 0 0,0 168,100" fill="none" />
      </defs>

      {/* Anillos */}
      <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".28" />
      <circle cx="100" cy="100" r="85" fill="none" stroke="currentColor" strokeWidth="3" opacity=".55" />
      <circle cx="100" cy="100" r="57" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".28" />

      {/* Muescas del canto, como una moneda */}
      {Array.from({ length: 48 }).map((_, i) => {
        const a = (i / 48) * Math.PI * 2;
        const r1 = 89.5;
        const r2 = 93.5;
        return (
          <line
            key={i}
            x1={100 + Math.cos(a) * r1}
            y1={100 + Math.sin(a) * r1}
            x2={100 + Math.cos(a) * r2}
            y2={100 + Math.sin(a) * r2}
            stroke="currentColor"
            strokeWidth="1.6"
            opacity=".3"
          />
        );
      })}

      {/* Texto curvo */}
      <text
        fill="currentColor"
        fontSize="12.5"
        fontWeight="700"
        letterSpacing="2.4"
        style={{ textTransform: "uppercase" }}
      >
        <textPath href="#sello-arco-arriba" startOffset="50%" textAnchor="middle">
          Money-back guarantee
        </textPath>
      </text>
      <text
        fill="currentColor"
        fontSize="9.5"
        fontWeight="600"
        letterSpacing="2.6"
        opacity=".72"
        style={{ textTransform: "uppercase" }}
      >
        <textPath href="#sello-arco-abajo" startOffset="50%" textAnchor="middle">
          Hydrogen Peroxide Tricks
        </textPath>
      </text>

      {/* Núcleo */}
      <text
        x="100"
        y="94"
        textAnchor="middle"
        fill="currentColor"
        fontSize="52"
        fontWeight="900"
        letterSpacing="-2"
      >
        {dias}
      </text>
      <text
        x="100"
        y="118"
        textAnchor="middle"
        fill="currentColor"
        fontSize="14"
        fontWeight="700"
        letterSpacing="4"
        opacity=".8"
        style={{ textTransform: "uppercase" }}
      >
        Days
      </text>
      {/* Filete bajo el núcleo */}
      <line x1="80" y1="128" x2="120" y2="128" stroke="currentColor" strokeWidth="1.5" opacity=".35" />
    </svg>
  );
}
