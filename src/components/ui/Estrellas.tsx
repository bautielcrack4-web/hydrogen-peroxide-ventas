import { Star } from "lucide-react";

export default function Estrellas({
  size = "h-[1.05rem] w-[1.05rem]",
  className = "",
}: {
  size?: string;
  className?: string;
}) {
  return (
    <div className={`flex gap-0.5 ${className}`} aria-label="5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${size} fill-oro text-oro`} aria-hidden />
      ))}
    </div>
  );
}
