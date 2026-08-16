/** Chispas doradas que titilan (posiciones fijas, sin hydration mismatch). */
const PUNTOS: [number, number, number, number][] = [
  // x%, y%, delay(s), size(px)
  [8, 18, 0, 5],
  [22, 70, 0.9, 4],
  [38, 30, 1.6, 6],
  [54, 78, 0.5, 4],
  [70, 22, 1.2, 5],
  [86, 60, 0.3, 6],
  [92, 32, 1.9, 4],
  [16, 46, 2.2, 5],
  [64, 50, 0.7, 4],
  [46, 12, 1.4, 5],
];

export default function Chispas({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      {PUNTOS.map(([x, y, d, s], i) => (
        <span
          key={i}
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            width: s,
            height: s,
            borderRadius: "50%",
            background: "radial-gradient(circle, #fff 0%, #f4e0a1 40%, #cda24a 100%)",
            boxShadow: "0 0 6px 1px rgba(205,162,74,.8)",
            animation: `titilar 2.6s ease-in-out ${d}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
