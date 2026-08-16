"use client";

/**
 * Enlace de compra. Si el checkout es de widget (Hotmart checkoutMode=2),
 * lleva la clase `hotmart-fb` y NO abre pestaña nueva → el pago abre como
 * popup sobre la página (el widget lo intercepta; el href queda de fallback).
 * Da un pulso háptico al tocar en móviles compatibles.
 */
export default function CheckoutLink({
  href,
  children,
  className = "",
  id,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const widget = href.includes("checkoutMode=2");
  const haptic = () => {
    try {
      navigator.vibrate?.(12);
    } catch {}
  };
  return (
    <a
      id={id}
      href={href}
      onClick={haptic}
      className={`${widget ? "hotmart-fb " : ""}${className}`}
      {...(widget ? {} : { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}
