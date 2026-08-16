// Chispitas doradas MUY suaves que dan sensación de vida y premium.
// Posiciones fijas (no aleatorias) para no romper la hidratación.

const CHISPAS = [
  { l: "8%", t: "18%", s: 6, d: 0, dur: 4.5 },
  { l: "18%", t: "62%", s: 4, d: 1200, dur: 5.5 },
  { l: "27%", t: "34%", s: 5, d: 600, dur: 4.8 },
  { l: "38%", t: "78%", s: 3, d: 1800, dur: 6 },
  { l: "46%", t: "14%", s: 5, d: 900, dur: 5 },
  { l: "58%", t: "70%", s: 4, d: 300, dur: 5.2 },
  { l: "66%", t: "28%", s: 6, d: 1500, dur: 4.6 },
  { l: "74%", t: "58%", s: 3, d: 700, dur: 6.2 },
  { l: "83%", t: "22%", s: 5, d: 1100, dur: 5 },
  { l: "90%", t: "48%", s: 4, d: 400, dur: 4.9 },
  { l: "13%", t: "44%", s: 3, d: 2000, dur: 5.8 },
  { l: "52%", t: "42%", s: 4, d: 1300, dur: 5.4 },
  { l: "70%", t: "82%", s: 5, d: 500, dur: 4.7 },
  { l: "34%", t: "54%", s: 3, d: 1700, dur: 6.1 },
  { l: "88%", t: "72%", s: 4, d: 800, dur: 5.3 },
  { l: "22%", t: "10%", s: 4, d: 1000, dur: 5 },
];

export default function Sparkles({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {CHISPAS.map((c, i) => (
        <span
          key={i}
          className="anim-chispa absolute"
          style={{
            left: c.l,
            top: c.t,
            width: c.s,
            height: c.s,
            animationDelay: `${c.d}ms`,
            animationDuration: `${c.dur}s`,
            background:
              "linear-gradient(135deg, #FFD9D5, #FF3B2E)",
            boxShadow: "0 0 6px 1px rgba(255,59,46,.6)",
          }}
        />
      ))}
    </div>
  );
}
