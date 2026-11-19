import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Flame } from "lucide-react";
import { CONFIG } from "../config";

interface BirthdayCakeStepProps {
  onContinue: () => void;
}

const CONFETTI_PIECES = Array.from({ length: 28 }, (_, idx) => {
  const angle = -Math.PI / 2 + ((idx - 14) / 14) * 1.25;
  const velocity = 110 + (idx % 5) * 34;
  return {
    id: idx,
    x: Math.cos(angle) * velocity,
    y: Math.sin(angle) * velocity - 35,
    rotate: (idx % 2 === 0 ? 1 : -1) * (140 + idx * 18),
    color:
      idx % 3 === 0
        ? "bg-pink-400"
        : idx % 3 === 1
        ? "bg-violet-400"
        : "bg-amber-200",
    width: idx % 2 === 0 ? 8 : 6,
    height: idx % 2 === 0 ? 12 : 6,
    delay: (idx % 6) * 0.04,
  };
});

export const BirthdayCakeStep: React.FC<BirthdayCakeStepProps> = ({ onContinue }) => {
  const [isLit, setIsLit] = useState(true);
  const [justBlown, setJustBlown] = useState(false);

  const handleBlowOut = () => {
    if (!isLit) return;
    setIsLit(false);
    setJustBlown(true);
  };

  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-4 sm:py-8">
      <div className="relative rounded-3xl border border-pink-300/45 dark:border-pink-300/20 bg-white/80 dark:bg-[#231533]/85 px-6 py-10 sm:px-12 sm:py-14 text-center backdrop-blur-md shadow-[0_20px_60px_rgba(147,51,234,0.12)] dark:shadow-[0_26px_70px_rgba(0,0,0,0.6)] overflow-hidden">
        <p className="font-ui text-xs tracking-[0.2em] uppercase text-fuchsia-800/80 dark:text-pink-300/85">
          {CONFIG.birthdayDate} · Birthday Wish
        </p>

        <h2
          className="font-editorial mt-3 text-3xl sm:text-4xl font-semibold text-fuchsia-950 dark:text-pink-50"
          style={{ textWrap: "balance" }}
        >
          {isLit
            ? `Before You Read Your Letter, ${CONFIG.favoriteNickname}…`
            : `Happy Birthday, My ${CONFIG.favoriteNickname}!`}
        </h2>

        <p className="font-editorial mx-auto mt-3 max-w-lg text-lg sm:text-xl italic text-fuchsia-950/80 dark:text-violet-100/85">
          {isLit ? CONFIG.cakePrompt : CONFIG.cakeWishGrantedText}
        </p>

        {/* Interactive Minimalist 3D-Style Baby Pink & Lavender Cake */}
        <div className="relative mx-auto mt-10 mb-8 flex h-64 w-64 items-end justify-center">
          {/* Warm ambient candle halo */}
          <motion.div
            animate={isLit ? { opacity: [0.55, 0.85, 0.55], scale: [0.96, 1.05, 0.96] } : { opacity: 0 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden="true"
            className="pointer-events-none absolute top-2 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-pink-400/25 blur-2xl"
          />

          {/* Confetti burst when blown out */}
          <AnimatePresence>
            {justBlown &&
              CONFETTI_PIECES.map((c) => (
                <motion.span
                  key={c.id}
                  initial={{ x: 0, y: -110, opacity: 1, scale: 0.6, rotate: 0 }}
                  animate={{
                    x: c.x,
                    y: [-110, c.y, c.y + 130],
                    opacity: [1, 1, 0],
                    scale: [0.7, 1.1, 0.85],
                    rotate: c.rotate,
                  }}
                  transition={{ duration: 1.75, delay: c.delay, ease: [0.16, 1, 0.3, 1] }}
                  className={`pointer-events-none absolute left-1/2 top-1/2 rounded-xs ${c.color}`}
                  style={{ width: c.width, height: c.height }}
                />
              ))}
          </AnimatePresence>

          {/* Interactive Candle Hit Target Button */}
          <button
            type="button"
            onClick={handleBlowOut}
            aria-label={isLit ? "Tap the candle flame to blow it out" : "Candle blown out"}
            disabled={!isLit}
            className="group relative flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded-2xl p-2 cursor-pointer disabled:cursor-default"
          >
            {/* Flame or Smoke */}
            <div className="relative flex h-16 w-16 items-end justify-center">
              {isLit ? (
                <div className="animate-flame relative flex items-center justify-center">
                  <div className="absolute -inset-2 rounded-full bg-amber-300/40 blur-md transition-transform group-hover:scale-125" />
                  <svg width="26" height="40" viewBox="0 0 26 40" fill="none">
                    <path
                      d="M13 2C13 2 24 16 24 25C24 31.6 19.1 37 13 37C6.9 37 2 31.6 2 25C2 16 13 2 13 2Z"
                      fill="url(#flameOuterPink)"
                    />
                    <path
                      d="M13 13C13 13 18.5 21.5 18.5 26.8C18.5 30.3 16 33 13 33C10 33 7.5 30.3 7.5 26.8C7.5 21.5 13 13 13 13Z"
                      fill="#FFF7D6"
                    />
                    <defs>
                      <linearGradient id="flameOuterPink" x1="13" y1="2" x2="13" y2="37" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FFF0A8" />
                        <stop offset="0.55" stopColor="#F59E0B" />
                        <stop offset="1" stopColor="#EC4899" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              ) : (
                <div className="relative flex items-end justify-center">
                  <span className="animate-smoke absolute bottom-1 h-6 w-3 rounded-full bg-violet-200/70 dark:bg-violet-300/40 blur-[3px]" />
                  <span
                    className="animate-smoke absolute bottom-2 -left-2 h-5 w-2.5 rounded-full bg-pink-200/60 dark:bg-pink-300/35 blur-[3px]"
                    style={{ animationDelay: "0.28s" }}
                  />
                </div>
              )}
            </div>

            {/* Candle Wick & Pastel Striped Body */}
            <div className="h-2.5 w-0.5 rounded-full bg-fuchsia-900 dark:bg-pink-200" />
            <div className="h-12 w-3.5 rounded-t-sm bg-gradient-to-b from-pink-200 via-violet-100 to-pink-300 shadow-sm border-x border-pink-300/60" />

            {/* Minimalist 3D Layered Baby Pink & Lavender Cake SVG */}
            <svg
              width="210"
              height="122"
              viewBox="0 0 210 122"
              fill="none"
              className="-mt-1 drop-shadow-[0_14px_24px_rgba(131,24,67,0.22)]"
            >
              {/* Pearl-lavender pedestal */}
              <ellipse cx="105" cy="112" rx="92" ry="8" fill="#8B5CF6" fillOpacity="0.22" />
              <ellipse cx="105" cy="107" rx="88" ry="10" fill="url(#plateLavender)" />
              <ellipse cx="105" cy="104" rx="84" ry="8" fill="#FCE7F3" fillOpacity="0.6" />

              {/* Bottom tier: Baby Pink */}
              <path d="M35 66H175V99C175 104 143 108 105 108C67 108 35 104 35 99V66Z" fill="url(#tierBottomPink)" />
              <ellipse cx="105" cy="66" rx="70" ry="11" fill="#FFF5FA" />
              {/* Cream drip frosting */}
              <path
                d="M35 66C35 72 44 77 50 73C56 69 59 81 67 81C75 81 78 72 86 74C94 76 98 83 106 83C114 83 118 74 126 74C134 74 139 81 146 79C153 77 158 70 164 73C170 76 175 71 175 66Z"
                fill="#FDF7FF"
              />

              {/* Top tier: Soft Lavender */}
              <path d="M55 34H155V63C155 67.5 132.5 71 105 71C77.5 71 55 67.5 55 63V34Z" fill="url(#tierTopLavender)" />
              <ellipse cx="105" cy="34" rx="50" ry="8.5" fill="#FFF9FE" />

              {/* Pearl & Berry accents */}
              <circle cx="72" cy="34" r="3" fill="#F472B6" />
              <circle cx="138" cy="34" r="3" fill="#F472B6" />
              <circle cx="88" cy="37" r="3.4" fill="#9D174D" />
              <circle cx="122" cy="37" r="3.4" fill="#9D174D" />
              <circle cx="105" cy="38" r="2.6" fill="#C084FC" />

              <defs>
                <linearGradient id="plateLavender" x1="17" y1="107" x2="193" y2="107" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#C4B5FD" />
                  <stop offset="0.5" stopColor="#FCE7F3" />
                  <stop offset="1" stopColor="#C4B5FD" />
                </linearGradient>
                <linearGradient id="tierBottomPink" x1="35" y1="84" x2="175" y2="84" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#F4B4D4" />
                  <stop offset="0.5" stopColor="#FAD5E8" />
                  <stop offset="1" stopColor="#E99AC2" />
                </linearGradient>
                <linearGradient id="tierTopLavender" x1="55" y1="52" x2="155" y2="52" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#D6C4FA" />
                  <stop offset="0.5" stopColor="#ECE3FE" />
                  <stop offset="1" stopColor="#C4B0F6" />
                </linearGradient>
              </defs>
            </svg>
          </button>
        </div>

        {/* Action area */}
        <div className="flex flex-col items-center justify-center gap-3">
          {isLit ? (
            <button
              type="button"
              onClick={handleBlowOut}
              className="inline-flex min-h-[46px] items-center gap-2 rounded-xl border border-pink-400/50 dark:border-pink-300/35 bg-pink-500/10 dark:bg-pink-400/15 px-6 py-2.5 text-sm font-medium text-fuchsia-950 dark:text-pink-100 transition-colors hover:bg-pink-500/20 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            >
              <Flame className="h-4 w-4 text-pink-600 dark:text-pink-300" aria-hidden="true" />
              <span>Tap Here or the Flame to Blow It Out</span>
            </button>
          ) : (
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              onClick={onContinue}
              className="inline-flex min-h-[48px] items-center gap-2.5 rounded-xl bg-gradient-to-r from-[#C03978] via-[#A9358A] to-[#7C4DFF] px-7 py-3 text-sm font-medium text-white shadow-lg transition-transform duration-150 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            >
              <span>Open Your Letter &amp; 8 Moments</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
};
