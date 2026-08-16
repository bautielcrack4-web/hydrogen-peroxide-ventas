/** Filete decorativo con rombo al centro — firma editorial de Archivos Federer. */
export default function Ornamento({
  className = "",
  color = "text-arena",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center gap-3 ${color} ${className}`}
      aria-hidden
    >
      <span className="h-px w-16 bg-current opacity-70" />
      <span className="text-[0.55rem]">◆</span>
      <span className="h-px w-16 bg-current opacity-70" />
    </div>
  );
}
