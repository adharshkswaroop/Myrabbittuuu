import React from "react";

const PETALS = [
  { left: "6%", delay: "0s", duration: "16s", driftX: "42px", rot: "210deg", size: 14, tone: "pink" },
  { left: "19%", delay: "3.5s", duration: "19s", driftX: "-36px", rot: "310deg", size: 11, tone: "lavender" },
  { left: "34%", delay: "7s", duration: "15s", driftX: "52px", rot: "240deg", size: 13, tone: "pink" },
  { left: "51%", delay: "1.8s", duration: "18s", driftX: "-44px", rot: "195deg", size: 15, tone: "lavender" },
  { left: "68%", delay: "5.2s", duration: "17s", driftX: "34px", rot: "280deg", size: 12, tone: "pink" },
  { left: "82%", delay: "2.4s", duration: "20s", driftX: "-48px", rot: "225deg", size: 14, tone: "lavender" },
  { left: "92%", delay: "8.1s", duration: "16s", driftX: "-28px", rot: "260deg", size: 11, tone: "pink" },
];

const MOTES = [
  { left: "12%", top: "24%", delay: "0s", duration: "6.5s", mx: "16px", my: "-26px", size: 5 },
  { left: "26%", top: "68%", delay: "1.4s", duration: "8s", mx: "-14px", my: "-34px", size: 4 },
  { left: "44%", top: "18%", delay: "2.8s", duration: "7.2s", mx: "12px", my: "-22px", size: 5 },
  { left: "62%", top: "76%", delay: "0.9s", duration: "6.8s", mx: "-18px", my: "-30px", size: 4 },
  { left: "78%", top: "32%", delay: "3.6s", duration: "7.8s", mx: "14px", my: "-28px", size: 5 },
  { left: "88%", top: "58%", delay: "1.9s", duration: "8.5s", mx: "-12px", my: "-24px", size: 4 },
  { left: "33%", top: "45%", delay: "4.1s", duration: "7.4s", mx: "10px", my: "-20px", size: 4 },
  { left: "71%", top: "15%", delay: "2.1s", duration: "6.9s", mx: "-15px", my: "-26px", size: 5 },
];

function FiligreeCorner({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      aria-hidden="true"
      className={`pointer-events-none fixed z-10 h-14 w-14 sm:h-20 sm:w-20 text-pink-500/35 dark:text-pink-300/30 transition-colors duration-500 ${className}`}
    >
      <path
        d="M4 74V16C4 9.37258 9.37258 4 16 4H74"
        stroke="currentColor"
        strokeWidth="1.15"
      />
      <path
        d="M12 60V20C12 15.5817 15.5817 12 20 12H60"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="2 3"
      />
      <path
        d="M12 28C19 28 24 22 24 14C24 20 30 24 36 22C29 25 25 30 25 38C22 31 18 28 12 28Z"
        stroke="currentColor"
        strokeWidth="0.9"
        fill="currentColor"
        fillOpacity="0.12"
      />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" fillOpacity="0.5" />
    </svg>
  );
}

export const AmbientTableLayer: React.FC = () => {
  return (
    <>
      {/* Subtle rose-lavender filigree frame corners */}
      <FiligreeCorner className="top-14 left-3 sm:left-5" />
      <FiligreeCorner className="top-14 right-3 sm:right-5 rotate-90" />
      <FiligreeCorner className="bottom-3 sm:bottom-5 left-3 sm:left-5 -rotate-90" />
      <FiligreeCorner className="bottom-3 sm:bottom-5 right-3 sm:right-5 rotate-180" />

      {/* Soft twilight vignette in dark mode */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-0 dark:opacity-100 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, transparent 40%, rgba(16, 8, 24, 0.55) 100%)",
        }}
      />

      {/* Drifting baby-pink & lavender petals + glowing pearl dust motes */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
      >
        {PETALS.map((petal, idx) => (
          <div
            key={`petal-${idx}`}
            className="animate-petal absolute -top-10"
            style={
              {
                left: petal.left,
                "--petal-delay": petal.delay,
                "--petal-duration": petal.duration,
                "--drift-x": petal.driftX,
                "--drift-rot": petal.rot,
              } as React.CSSProperties
            }
          >
            <svg
              width={petal.size}
              height={petal.size * 1.25}
              viewBox="0 0 20 26"
              fill="none"
            >
              <path
                d="M10 1C15.5 5 19 11.5 17 18.5C15.2 24.5 9.5 25.5 6 22C2 18 1.5 10.5 6 5C7.4 3.3 8.8 2 10 1Z"
                className={
                  petal.tone === "pink"
                    ? "fill-pink-400/50 dark:fill-pink-300/35"
                    : "fill-violet-400/45 dark:fill-violet-300/35"
                }
              />
              <path
                d="M10 3C12 8 11.5 15 8.5 21"
                className="stroke-fuchsia-900/20 dark:stroke-pink-100/20"
                strokeWidth="0.7"
              />
            </svg>
          </div>
        ))}

        {MOTES.map((mote, idx) => (
          <div
            key={`mote-${idx}`}
            className={`animate-mote absolute rounded-full blur-[0.5px] ${
              idx % 2 === 0
                ? "bg-pink-400/45 dark:bg-pink-300/55"
                : "bg-violet-400/45 dark:bg-violet-300/55"
            }`}
            style={
              {
                left: mote.left,
                top: mote.top,
                width: `${mote.size}px`,
                height: `${mote.size}px`,
                boxShadow: "0 0 8px rgba(244, 168, 224, 0.6)",
                "--mote-delay": mote.delay,
                "--mote-duration": mote.duration,
                "--mote-x": mote.mx,
                "--mote-y": mote.my,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </>
  );
};
