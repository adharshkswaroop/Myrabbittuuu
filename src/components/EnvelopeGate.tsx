import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { KeyRound, HelpCircle, Unlock, Sparkles } from "lucide-react";
import { CONFIG } from "../config";

interface EnvelopeGateProps {
  onUnlock: () => void;
}

function ButterflySvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M24 20C18 10 6 4 4 12C2.5 18 11 22 20 21C12 24 8 32 14 35C19 37 23 29 24 22Z"
        className="fill-pink-400/55 dark:fill-pink-300/45 stroke-fuchsia-700/45 dark:stroke-violet-200/50"
        strokeWidth="1"
      />
      <path
        d="M24 20C30 10 42 4 44 12C45.5 18 37 22 28 21C36 24 40 32 34 35C29 37 25 29 24 22Z"
        className="fill-violet-400/55 dark:fill-violet-300/45 stroke-fuchsia-700/45 dark:stroke-violet-200/50"
        strokeWidth="1"
      />
      <line
        x1="24"
        y1="12"
        x2="24"
        y2="30"
        className="stroke-fuchsia-950/70 dark:stroke-pink-100/70"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

const SPARKLES = Array.from({ length: 18 }, (_, i) => {
  const angle = (i / 18) * Math.PI * 2;
  const dist = 65 + (i % 3) * 32;
  return {
    id: i,
    x: Math.cos(angle) * dist,
    y: Math.sin(angle) * dist,
    size: 4 + (i % 3) * 2,
    delay: (i % 4) * 0.03,
  };
});

export const EnvelopeGate: React.FC<EnvelopeGateProps> = ({ onUnlock }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const triggerUnlock = () => {
    if (isOpening) return;
    setError("");
    setIsOpening(true);
    window.setTimeout(() => {
      onUnlock();
    }, 1100);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const normalizedInput = input.trim().toLowerCase().replace(/\s+/g, " ");
    const normalizedSecret = CONFIG.password.trim().toLowerCase().replace(/\s+/g, " ");

    if (normalizedInput === normalizedSecret) {
      triggerUnlock();
    } else {
      setError("Not quite our secret phrase — try our hint below.");
    }
  };

  const handleAutoUnlock = () => {
    setInput(CONFIG.password);
    setError("");
    triggerUnlock();
  };

  return (
    <section className="relative mx-auto w-full max-w-5xl px-4 py-4 sm:py-8">
      <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Left / Top: Baby Pink & Lavender Luxury Envelope */}
        <div className="relative flex justify-center lg:col-span-7">
          {/* Gentle floating butterflies */}
          <motion.div
            animate={{ y: [-5, 6, -5], x: [-3, 4, -3], rotate: [-4, 6, -4] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="pointer-events-none absolute -top-5 left-4 sm:left-10 z-20"
          >
            <ButterflySvg className="h-9 w-11 opacity-90" />
          </motion.div>
          <motion.div
            animate={{ y: [5, -6, 5], x: [4, -4, 4], rotate: [5, -5, 5] }}
            transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
            className="pointer-events-none absolute -bottom-4 right-4 sm:right-10 z-20"
          >
            <ButterflySvg className="h-8 w-10 opacity-80" />
          </motion.div>

          {/* Luxury Envelope Container */}
          <div className="perspective-1200 relative w-full max-w-md">
            <motion.div
              animate={isOpening ? { y: -8, scale: 1.02 } : { y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/3] w-full rounded-xl border border-pink-400/35 dark:border-pink-300/20 bg-gradient-to-br from-[#FDE7F3] via-[#F7DCFA] to-[#EBDDFD] dark:from-[#2E1A3B] dark:via-[#261634] dark:to-[#1E122B] shadow-[0_24px_60px_rgba(147,51,234,0.18)] dark:shadow-[0_28px_70px_rgba(0,0,0,0.75)] overflow-hidden"
            >
              {/* Subtle silk shimmer dot texture */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-25 dark:opacity-15"
                style={{
                  backgroundImage:
                    "radial-gradient(rgba(190, 24, 93, 0.22) 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              />

              {/* Birthday postmark in top-right corner */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-4 top-4 z-10 text-right opacity-75"
              >
                <p className="font-ui text-[10px] tracking-[0.2em] uppercase text-fuchsia-900/80 dark:text-pink-200/80">
                  {CONFIG.birthdayDate}
                </p>
              </div>

              {/* Inner letter peeking up when unlocked */}
              <motion.div
                initial={{ y: 24, opacity: 0.4 }}
                animate={isOpening ? { y: -34, opacity: 1 } : { y: 24, opacity: 0.4 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="parchment-card absolute inset-x-5 top-6 bottom-5 rounded-md border border-pink-300/50 p-5 shadow-md"
              >
                <p className="font-editorial text-center text-sm italic text-fuchsia-950">
                  For my {CONFIG.favoriteNickname} — a birthday letter &amp; 8 keepsake moments await…
                </p>
              </motion.div>

              {/* Bottom & Side Envelope Pocket Flaps */}
              <svg
                viewBox="0 0 400 300"
                preserveAspectRatio="none"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <polygon
                  points="0,0 205,155 0,300"
                  className="fill-[#FADDF0]/95 dark:fill-[#2A1838]/95"
                />
                <polygon
                  points="400,0 195,155 400,300"
                  className="fill-[#EFE0FD]/95 dark:fill-[#241432]/95"
                />
                <polygon
                  points="0,300 200,138 400,300"
                  className="fill-[#FBE8F5] dark:fill-[#311C42]"
                />
                <polyline
                  points="0,300 200,138 400,300"
                  fill="none"
                  className="stroke-pink-500/35 dark:stroke-pink-300/25"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Animated Top Flap */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={isOpening ? { rotateX: 165 } : { rotateX: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "top center" }}
                className="preserve-3d pointer-events-none absolute inset-x-0 top-0 z-10 h-[56%]"
              >
                <svg
                  viewBox="0 0 400 168"
                  preserveAspectRatio="none"
                  className="h-full w-full drop-shadow-[0_6px_14px_rgba(131,24,67,0.16)]"
                >
                  <polygon
                    points="0,0 400,0 200,162"
                    className="fill-[#F7D7EC] dark:fill-[#38214A]"
                  />
                  <polyline
                    points="0,0 200,162 400,0"
                    fill="none"
                    className="stroke-pink-500/40 dark:stroke-pink-300/35"
                    strokeWidth="1.3"
                  />
                </svg>
              </motion.div>

              {/* Rose-Berry Wax Seal + Sparkle Burst */}
              <div className="absolute left-1/2 top-[53%] z-20 -translate-x-1/2 -translate-y-1/2">
                <AnimatePresence>
                  {isOpening &&
                    SPARKLES.map((s) => (
                      <motion.span
                        key={s.id}
                        initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                        animate={{ x: s.x, y: s.y, scale: [0, 1.3, 0], opacity: [1, 1, 0] }}
                        transition={{ duration: 0.85, delay: s.delay, ease: "easeOut" }}
                        className={`pointer-events-none absolute left-1/2 top-1/2 rounded-full shadow-[0_0_10px_rgba(244,114,182,0.85)] ${
                          s.id % 2 === 0 ? "bg-pink-300" : "bg-violet-300"
                        }`}
                        style={{ width: s.size, height: s.size }}
                      />
                    ))}
                </AnimatePresence>

                <motion.div
                  animate={
                    isOpening
                      ? { scale: 1.28, opacity: 0, rotate: 18 }
                      : { scale: 1, opacity: 1, rotate: 0 }
                  }
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-pink-200/70 bg-gradient-to-br from-[#C83E7B] via-[#A42764] to-[#6B21A8] shadow-[0_8px_22px_rgba(131,24,67,0.45)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-pink-100/40">
                    <span className="font-editorial text-sm font-semibold tracking-wider text-pink-50">
                      N &amp; C
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Recipient Address Label */}
              <div className="pointer-events-none absolute inset-x-5 bottom-4 z-10 text-center">
                <p className="font-handwritten text-xl sm:text-2xl text-fuchsia-950 dark:text-pink-100">
                  {CONFIG.recipientHeader}
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right / Bottom: Curiosity Password Gate */}
        <div className="lg:col-span-5">
          <div className="mx-auto max-w-md rounded-2xl border border-pink-300/45 dark:border-pink-300/20 bg-white/80 dark:bg-[#231533]/85 p-6 sm:p-8 backdrop-blur-md shadow-[0_16px_44px_rgba(147,51,234,0.12)] dark:shadow-[0_22px_54px_rgba(0,0,0,0.58)]">
            <p className="font-ui text-xs tracking-[0.18em] uppercase text-fuchsia-800/80 dark:text-pink-300/85">
              {CONFIG.birthdayDate} · Birthday Keepsake
            </p>
            <h1
              className="font-editorial mt-2 text-3xl sm:text-4xl font-semibold leading-tight text-fuchsia-950 dark:text-pink-50"
              style={{ textWrap: "balance" }}
            >
              A Secret Awaits My {CONFIG.favoriteNickname}
            </h1>
            <p className="font-ui mt-3 text-sm leading-relaxed text-fuchsia-950/75 dark:text-violet-200/85">
              Before breaking the seal, enter our secret password to unwrap your November 20th surprise.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="secret-password"
                  className="font-ui block text-xs font-medium text-fuchsia-950/85 dark:text-pink-100/90"
                >
                  Secret Password
                </label>
                <div className="relative mt-1.5">
                  <KeyRound
                    className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-pink-600/75 dark:text-pink-300/75"
                    aria-hidden="true"
                  />
                  <input
                    id="secret-password"
                    type="text"
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Type our secret phrase..."
                    autoComplete="off"
                    className="min-h-[46px] w-full rounded-xl border border-pink-300/60 dark:border-violet-400/25 bg-white/95 dark:bg-[#170E22]/90 pl-10 pr-4 text-sm text-fuchsia-950 dark:text-pink-50 placeholder:text-fuchsia-900/40 dark:placeholder:text-violet-300/45 focus:border-pink-500 dark:focus:border-pink-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/40"
                  />
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="text-xs font-medium text-rose-700 dark:text-rose-300"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={isOpening}
                className="flex min-h-[46px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C03978] via-[#A9358A] to-[#7C4DFF] px-5 py-2.5 text-sm font-medium text-white shadow-md transition-transform duration-150 hover:brightness-110 active:scale-[0.98] disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              >
                {isOpening ? (
                  <>
                    <Sparkles className="h-4 w-4 animate-spin" aria-hidden="true" />
                    <span>Opening Your Envelope…</span>
                  </>
                ) : (
                  <>
                    <Unlock className="h-4 w-4" aria-hidden="true" />
                    <span>Break Wax Seal &amp; Open</span>
                  </>
                )}
              </button>
            </form>

            {/* Hint & Auto-unlock helper row */}
            <div className="mt-5 border-t border-pink-300/35 dark:border-violet-300/15 pt-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => setShowHint((prev) => !prev)}
                  className="inline-flex min-h-[44px] items-center gap-1.5 text-xs font-medium text-fuchsia-800 dark:text-pink-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/40 rounded-md px-1"
                >
                  <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{showHint ? "Hide Hint" : "Need a Hint?"}</span>
                </button>

                <button
                  type="button"
                  onClick={handleAutoUnlock}
                  disabled={isOpening}
                  className="inline-flex min-h-[44px] items-center text-xs font-medium text-fuchsia-900/70 dark:text-violet-300/80 hover:text-fuchsia-950 dark:hover:text-pink-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/40 rounded-md px-1"
                >
                  Auto-unlock for me →
                </button>
              </div>

              <AnimatePresence>
                {showHint && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="mt-1 rounded-lg bg-pink-500/10 dark:bg-violet-500/15 px-3 py-2 text-xs italic text-fuchsia-950 dark:text-pink-200"
                  >
                    {CONFIG.passwordHint}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
