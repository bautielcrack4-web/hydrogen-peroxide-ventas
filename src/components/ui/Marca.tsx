/**
 * IDENTIDAD DE MARCA — Hydrogen Peroxide Tricks
 *
 * El isotipo cuenta el mecanismo del producto: una gota con burbujas de
 * oxígeno saliendo. Es lo que el peróxido HACE, así que el logo explica el
 * producto en 16px en vez de ser una inicial decorativa.
 * (Antes el favicon era una "F" en teal y dorado heredada de la plantilla
 * del Dr. Federer: otro canal, otra marca.)
 */

/** Isotipo suelto: cuadrado redondeado rojo con la gota y las burbujas. */
export function Isotipo({
  size = 28,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
      focusable="false"
    >
      <rect width="64" height="64" rx="15" fill="#D0342A" />
      {/* Gota */}
      <path
        d="M31 15c0 0-12 14.4-12 23.2A12 12 0 0 0 43 38.2C43 29.4 31 15 31 15z"
        fill="#fff"
      />
      {/* Burbuja dentro de la gota (hueco) */}
      <circle cx="35.5" cy="41" r="4.2" fill="#D0342A" />
      {/* Burbujas de oxígeno subiendo */}
      <circle cx="47" cy="20" r="3.4" fill="#fff" opacity=".95" />
      <circle cx="52.5" cy="29.5" r="2.1" fill="#fff" opacity=".7" />
    </svg>
  );
}

/** Isotipo monocromo (para el pie, sobre fondo oscuro). */
export function IsotipoLinea({
  size = 26,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden
      focusable="false"
    >
      <rect
        x="1.25"
        y="1.25"
        width="61.5"
        height="61.5"
        rx="14"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        opacity=".45"
      />
      <path
        d="M31 15c0 0-12 14.4-12 23.2A12 12 0 0 0 43 38.2C43 29.4 31 15 31 15z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <circle cx="47" cy="20" r="3" fill="currentColor" opacity=".8" />
      <circle cx="52.5" cy="29" r="1.9" fill="currentColor" opacity=".5" />
    </svg>
  );
}

/**
 * Lockup completo: isotipo + nombre. `compacto` esconde el texto (móvil).
 */
export default function Marca({
  size = 28,
  compacto = false,
  className = "",
}: {
  size?: number;
  compacto?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Isotipo size={size} className="flex-none" />
      <span
        className={`${
          compacto ? "hidden sm:flex" : "flex"
        } flex-col leading-none`}
      >
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-crema-200">
          Hydrogen Peroxide
        </span>
        <span className="mt-[3px] font-serif text-[0.95rem] font-extrabold uppercase tracking-[0.02em] text-crema-50">
          Tricks
        </span>
      </span>
    </span>
  );
}
