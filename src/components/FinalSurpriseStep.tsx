import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Gift, Heart, RotateCcw, Sparkles, Check } from "lucide-react";
import { CONFIG, TreatItem } from "../config";

interface FinalSurpriseStepProps {
  onReplay: () => void;
}

interface FloatingHeart {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  tone: "pink" | "lavender";
}

export const FinalSurpriseStep: React.FC<FinalSurpriseStepProps> = ({ onReplay }) => {
  const treats = CONFIG.treats;

  // Roulette state
  const [wheelRotation, setWheelRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [wonTreat, setWonTreat] = useState<TreatItem | null>(null);

  // Mystery gift cards state
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  // Hug heart-shower state
  const [hugCount, setHugCount] = useState(0);
  const [heartShower, setHeartShower] = useState<FloatingHeart[]>([]);
  const hugTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (hugTimeoutRef.current !== null) {
        window.clearTimeout(hugTimeoutRef.current);
      }
    };
  }, []);

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const chosenIndex = Math.floor(Math.random() * treats.length);
    const sliceCenter = chosenIndex * 120 + 60;
    const targetRemainder = (360 - sliceCenter) % 360;
    const currentRemainder = wheelRotation % 360;
    const extraSpins = 360 * 5;
    const delta = extraSpins + ((targetRemainder - currentRemainder + 360) % 360);

    setWheelRotation((prev) => prev + delta);

    window.setTimeout(() => {
      const selected = treats[chosenIndex];
      setWonTreat(selected);
      setRevealedIds((prev) => ({ ...prev, [selected.id]: true }));
      setIsSpinning(false);
    }, 3400);
  };

  const handleToggleCard = (id: string) => {
    setRevealedIds((prev) => ({ ...prev, [id]: true }));
  };

  const handleSendHug = () => {
    setHugCount((c) => c + 1);
    if (hugTimeoutRef.current !== null) {
      window.clearTimeout(hugTimeoutRef.current);
    }
    const batchBase = Date.now();
    const newHearts: FloatingHeart[] = Array.from({ length: 24 }, (_, i) => ({
      id: batchBase + i,
      left: `${6 + ((i * 4.1) % 88)}%`,
      size: 16 + (i % 4) * 6,
      duration: 2.1 + (i % 5) * 0.35,
      delay: (i % 6) * 0.08,
      drift: (i % 2 === 0 ? 1 : -1) * (18 + (i % 4) * 10),
      tone: i % 2 === 0 ? "pink" : "lavender",
    }));
    setHeartShower(newHearts);
    hugTimeoutRef.current = window.setTimeout(() => {
      setHeartShower([]);
    }, 3400);
  };

  return (
    <section className="relative mx-auto w-full max-w-5xl px-4 py-4 sm:py-8">
      {/* Celebratory Baby Pink & Lavender Heart Shower Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      >
        <AnimatePresence>
          {heartShower.map((h) => (
            <motion.div
              key={h.id}
              initial={{ y: "100vh", x: 0, opacity: 0, scale: 0.5 }}
              animate={{
                y: "-12vh",
                x: h.drift,
                opacity: [0, 1, 1, 0],
                scale: [0.6, 1.15, 1],
              }}
              transition={{ duration: h.duration, delay: h.delay, ease: "easeOut" }}
              style={{ left: h.left }}
              className="absolute bottom-0"
            >
              <Heart
                style={{ width: h.size, height: h.size }}
                className={
                  h.tone === "pink"
                    ? "fill-pink-400 text-pink-300 drop-shadow-[0_2px_10px_rgba(244,114,182,0.65)]"
                    : "fill-violet-400 text-violet-300 drop-shadow-[0_2px_10px_rgba(167,139,250,0.65)]"
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Final Surprise Container */}
      <div className="rounded-3xl border border-pink-300/50 dark:border-pink-300/20 bg-white/80 dark:bg-[#231533]/85 p-6 sm:p-10 backdrop-blur-md shadow-[0_24px_65px_rgba(147,51,234,0.14)] dark:shadow-[0_28px_80px_rgba(0,0,0,0.68)]">
        <div className="text-center">
          <p className="font-ui text-xs tracking-[0.2em] uppercase text-fuchsia-800/80 dark:text-pink-300/85">
            {CONFIG.birthdayDate} · Keepsake Surprise for {CONFIG.favoriteNickname}
          </p>
          <h2
            className="font-editorial mt-2 text-3xl sm:text-4xl font-semibold text-fuchsia-950 dark:text-pink-50"
            style={{ textWrap: "balance" }}
          >
            Spin for Your Birthday Treat
          </h2>
          <p className="font-editorial mx-auto mt-2 max-w-xl text-lg italic text-fuchsia-950/80 dark:text-violet-100/80">
            Spin the Love Roulette wheel — or tap every mystery card below to unwrap all of Nanna’s birthday promises to my {CONFIG.favoriteNickname}.
          </p>
        </div>

        {/* Interactive Roulette Wheel + Active Voucher Showcase */}
        <div className="mt-8 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          {/* Roulette Wheel */}
          <div className="flex flex-col items-center lg:col-span-5">
            <div className="relative flex h-64 w-64 items-center justify-center sm:h-72 sm:w-72">
              {/* Top Pearl-Pink Pointer */}
              <div
                aria-hidden="true"
                className="absolute -top-2.5 left-1/2 z-20 -translate-x-1/2"
              >
                <svg width="26" height="28" viewBox="0 0 26 28" fill="none">
                  <path
                    d="M13 26L2 5C1.5 3.5 2.5 2 4 2H22C23.5 2 24.5 3.5 24 5L13 26Z"
                    fill="#F9A8D4"
                    stroke="#701A51"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>

              {/* Spinning SVG Wheel */}
              <div
                style={{
                  transform: `rotate(${wheelRotation}deg)`,
                  transition: "transform 3.4s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
                className="h-full w-full rounded-full border-4 border-pink-300/80 shadow-[0_14px_38px_rgba(147,51,234,0.28)]"
              >
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  {/* Slice 1: 0° to 120° (Baby Berry Pink) */}
                  <path
                    d="M100,100 L100,0 A100,100 0 0,1 186.6,150 Z"
                    fill="#DB5B96"
                  />
                  {/* Slice 2: 120° to 240° (Soft Lavender) */}
                  <path
                    d="M100,100 L186.6,150 A100,100 0 0,1 13.4,150 Z"
                    fill="#9D78E8"
                  />
                  {/* Slice 3: 240° to 360° (Deep Plum-Rose) */}
                  <path
                    d="M100,100 L13.4,150 A100,100 0 0,1 100,0 Z"
                    fill="#8A2464"
                  />

                  {/* Subtle pearl slice dividers */}
                  <line x1="100" y1="100" x2="100" y2="0" stroke="#FDF2F8" strokeWidth="1.4" />
                  <line x1="100" y1="100" x2="186.6" y2="150" stroke="#FDF2F8" strokeWidth="1.4" />
                  <line x1="100" y1="100" x2="13.4" y2="150" stroke="#FDF2F8" strokeWidth="1.4" />

                  {/* Slice Labels */}
                  <text
                    x="138"
                    y="66"
                    textAnchor="middle"
                    fill="#FFF7FB"
                    fontSize="10"
                    fontWeight="600"
                    transform="rotate(60 138 66)"
                  >
                    Forehead Kisses
                  </text>
                  <text
                    x="100"
                    y="156"
                    textAnchor="middle"
                    fill="#FFFDF7"
                    fontSize="10"
                    fontWeight="600"
                  >
                    Rainy Bike Ride
                  </text>
                  <text
                    x="62"
                    y="66"
                    textAnchor="middle"
                    fill="#FFF7FB"
                    fontSize="10"
                    fontWeight="600"
                    transform="rotate(-60 62 66)"
                  >
                    Movie + No Roast
                  </text>
                </svg>
              </div>

              {/* Center Spin Button */}
              <button
                type="button"
                onClick={handleSpin}
                disabled={isSpinning}
                className="absolute z-20 flex h-16 w-16 items-center justify-center rounded-full border-2 border-pink-200 bg-[#3B1537] text-xs font-semibold tracking-wider uppercase text-pink-50 shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              >
                {isSpinning ? "…" : "Spin"}
              </button>
            </div>

            <button
              type="button"
              onClick={handleSpin}
              disabled={isSpinning}
              className="mt-5 inline-flex min-h-[46px] items-center gap-2 rounded-xl bg-gradient-to-r from-[#C03978] via-[#A9358A] to-[#7C4DFF] px-6 py-2.5 text-sm font-medium text-white shadow-md transition-transform duration-150 hover:brightness-110 active:scale-[0.98] disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            >
              <Sparkles className="h-4 w-4 text-pink-100" aria-hidden="true" />
              <span>{isSpinning ? "Spinning Wheel…" : "Spin for Your Treat"}</span>
            </button>
          </div>

          {/* Right: Keepsake Voucher Result + 3 Tap-to-Reveal Mystery Gift Cards */}
          <div className="space-y-4 lg:col-span-7">
            <AnimatePresence mode="wait">
              {wonTreat && (
                <motion.div
                  key={wonTreat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="parchment-card rounded-2xl border border-pink-400/50 p-5 text-[#35182F] shadow-md"
                >
                  <div className="flex items-center justify-between gap-2 text-xs text-fuchsia-900/75">
                    <span className="font-ui tracking-widest uppercase">{wonTreat.voucherCode}</span>
                    <span className="inline-flex items-center gap-1 font-medium text-pink-700">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" /> Unlocked by Wheel
                    </span>
                  </div>
                  <h3 className="font-editorial mt-1.5 text-2xl font-semibold text-[#701A51]">
                    {wonTreat.title}
                  </h3>
                  <p className="font-ui mt-1 text-xs leading-relaxed text-fuchsia-950/75">
                    {wonTreat.promiseDetail}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <p className="font-ui mb-2.5 text-xs font-medium tracking-wider uppercase text-fuchsia-900/70 dark:text-violet-300/80">
                Mystery Keepsake Vouchers (Tap to Unwrap)
              </p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                {treats.map((treat) => {
                  const isRevealed = Boolean(revealedIds[treat.id]);
                  return (
                    <button
                      key={treat.id}
                      type="button"
                      onClick={() => handleToggleCard(treat.id)}
                      className={`group flex min-h-[146px] flex-col justify-between rounded-2xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                        isRevealed
                          ? "parchment-card border-pink-400/50 text-[#35182F] shadow-sm"
                          : "border-pink-300/50 dark:border-violet-300/20 bg-pink-50/70 dark:bg-[#2B1B3E] text-fuchsia-950 dark:text-pink-100 hover:border-pink-400"
                      }`}
                    >
                      {isRevealed ? (
                        <>
                          <span className="font-ui text-[10px] tracking-widest uppercase text-fuchsia-900/70">
                            {treat.voucherCode}
                          </span>
                          <div>
                            <p className="font-editorial text-lg font-semibold leading-snug text-[#701A51]">
                              {treat.title}
                            </p>
                            <p className="font-ui mt-1.5 text-[11px] leading-relaxed text-fuchsia-950/70">
                              {treat.subtitle}
                            </p>
                          </div>
                        </>
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center py-4 text-center">
                          <Gift
                            className="h-6 w-6 text-pink-600 dark:text-pink-300 transition-transform group-hover:scale-110"
                            aria-hidden="true"
                          />
                          <span className="font-editorial mt-2 text-base font-medium">
                            Mystery Gift
                          </span>
                          <span className="font-ui mt-0.5 text-[11px] text-fuchsia-900/60 dark:text-violet-300/75">
                            Tap to reveal
                          </span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Final Emotional Closing Actions */}
        <div className="mt-10 border-t border-pink-300/40 dark:border-violet-300/15 pt-8 text-center">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleSendHug}
              className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C03978] via-[#A9358A] to-[#7C4DFF] px-7 py-3 text-sm font-medium text-white shadow-lg transition-transform duration-150 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            >
              <Heart className="h-4 w-4 fill-pink-100/80 text-pink-50" aria-hidden="true" />
              <span>Tap to Send a Hug Back to Nanna ❤️</span>
            </button>

            <button
              type="button"
              onClick={onReplay}
              className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-pink-300/60 dark:border-violet-300/25 px-6 py-3 text-sm font-medium text-fuchsia-950 dark:text-pink-100 transition-colors hover:bg-pink-500/10 dark:hover:bg-violet-400/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>Replay Gift</span>
            </button>
          </div>

          <AnimatePresence>
            {hugCount > 0 && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-handwritten mt-4 text-2xl text-[#831843] dark:text-pink-200"
              >
                Hug received by Nanna! Wrapped tightly around my {CONFIG.favoriteNickname} forever.
                {hugCount > 1 ? ` (${hugCount} hugs sent!)` : ""}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
