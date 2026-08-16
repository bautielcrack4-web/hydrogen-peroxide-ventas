import { ArrowRight } from "lucide-react";
import { product, precioFormateado } from "@/config/product";

type Props = {
  children: React.ReactNode;
  variant?: "primario" | "suave" | "oro";
  className?: string;
  /** Muestra el precio dentro del botón (ej: "Quiero la guía · $27") */
  conPrecio?: boolean;
  id?: string;
};

/** Botón que siempre lleva al checkout configurado (una sola acción principal). */
export default function CTAButton({
  children,
  variant = "primario",
  className = "",
  conPrecio = true,
  id,
}: Props) {
  const base =
    "group inline-flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-center text-lg font-bold leading-tight transition-all duration-200 active:scale-[.98]";

  const estilos = {
    primario:
      "bg-teal text-crema-50 shadow-suave hover:bg-teal-dark hover:-translate-y-0.5",
    suave:
      "bg-crema-50 text-teal ring-2 ring-inset ring-teal/25 hover:bg-white hover:ring-teal/45",
    oro: "bg-oro-claro text-bosque shadow-libro hover:bg-white hover:-translate-y-0.5",
  }[variant];

  return (
    <a
      id={id}
      href={product.checkoutUrl}
      className={`hotmart-fb ${base} ${estilos} ${className}`}
    >
      <span>
        {children}
        {conPrecio && (
          <span className="whitespace-nowrap">
            {" "}
            · {precioFormateado(product.precio)}
          </span>
        )}
      </span>
      <ArrowRight
        className="h-5 w-5 flex-none transition-transform group-hover:translate-x-1"
        aria-hidden
      />
    </a>
  );
}
