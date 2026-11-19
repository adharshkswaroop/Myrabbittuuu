import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, RotateCw, Lock, Sparkles, Heart } from "lucide-react";
import { CONFIG } from "../config";

interface MomentsDeckStepProps {
  onComplete: () => void;
}

export const MomentsDeckStep: React.FC<MomentsDeckStepProps> = ({ onComplete }) => {
  const moments = CONFIG.moments;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [unlockedUpTo, setUnlockedUpTo] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [brokenImages, setBrokenImages] = useState<Record<number, boolean>>({});
  const touchStartX = useRef<number | null>(null);

  const currentMoment = moments[currentIndex];
  const isLastMoment = currentIndex === moments.length - 1;
  const allUnlocked = unlockedUpTo >= moments.length - 1;

  const goToIndex = (nextIdx: number) => {
    if (nextIdx < 0 || nextIdx >= moments.length) return;
    if (nextIdx > unlockedUpTo) return;
    setIsFlipped(false);
    setCurrentIndex(nextIdx);
  };

  const handleNextOrUnlock = () => {
    setIsFlipped(false);
    if (currentIndex < moments.length - 1) {
      const nextIdx = currentIndex + 1;
      if (nextIdx > unlockedUpTo) {
        setUnlockedUpTo(nextIdx);
      }
      setCurrentIndex(nextIdx);
    } else {
      onComplete();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (deltaX > 55 && currentIndex > 0) {
      goToIndex(currentIndex - 1);
    } else if (deltaX < -55) {
      if (currentIndex < unlockedUpTo) {
        goToIndex(currentIndex + 1);
      } else if (currentIndex < moments.length - 1) {
        handleNextOrUnlock();
      }
    }
  };

  return (
    <section
      className="mx-auto w-full max-w-5xl px-4 py-4 sm:py-8"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Clean Header & Chapter 1–8 Progress Strip */}
      <div className="mb-6 flex flex-col items-center text-center">
        <p className="font-ui text-xs tracking-[0.2em] uppercase text-fuchsia-800/80 dark:text-pink-300/85">
          {CONFIG.birthdayDate} · Keepsake Deck for {CONFIG.favoriteNickname}
        </p>
        <h2
          className="font-editorial mt-1.5 text-3xl sm:text-4xl font-semibold text-fuchsia-950 dark:text-pink-50"
          style={{ textWrap: "balance" }}
        >
          Our 8 Moments Together
        </h2>

        {/* Segmented 1–8 Chapter Selector */}
        <div
          role="tablist"
          aria-label="Moments 1 to 8"
          className="mt-4 flex flex-wrap items-center justify-center gap-1.5 rounded-xl border border-pink-300/50 dark:border-pink-300/20 bg-white/70 dark:bg-[#231533]/75 p-1.5 backdrop-blur-sm"
        >
          {moments.map((m, idx) => {
            const unlocked = idx <= unlockedUpTo;
            const active = idx === currentIndex;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={active}
                disabled={!unlocked}
                onClick={() => goToIndex(idx)}
                className={`flex min-h-[38px] min-w-[38px] items-center justify-center rounded-lg px-2 text-xs font-medium tabular-nums transition-colors ${
                  active
                    ? "bg-gradient-to-r from-[#C03978] to-[#8B5CF6] text-white shadow-sm"
                    : unlocked
                    ? "text-fuchsia-950 dark:text-pink-100 hover:bg-pink-500/10 dark:hover:bg-violet-400/15"
                    : "cursor-not-allowed text-fuchsia-900/35 dark:text-violet-300/30"
                }`}
                aria-label={`Moment ${idx + 1}: ${m.title}${unlocked ? "" : " (Locked)"}`}
              >
                {unlocked ? (
                  <span>0{idx + 1}</span>
                ) : (
                  <Lock className="h-3 w-3 opacity-60" aria-hidden="true" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Interactive Polaroid & Memory Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentMoment.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-pink-300/50 dark:border-pink-300/20 bg-white/80 dark:bg-[#231533]/85 p-5 sm:p-8 lg:p-10 backdrop-blur-md shadow-[0_22px_60px_rgba(147,51,234,0.14)] dark:shadow-[0_26px_75px_rgba(0,0,0,0.65)]"
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
            {/* Left: Tap-to-Flip Portrait Polaroid Print */}
            <div className="flex flex-col items-center lg:col-span-5">
              <div className="perspective-1200 w-full max-w-[320px]">
                <button
                  type="button"
                  onClick={() => setIsFlipped((f) => !f)}
                  aria-label={
                    isFlipped
                      ? "Flip Polaroid back to photograph"
                      : "Tap Polaroid to flip and read Nanna's secret note"
                  }
                  className="group relative block w-full cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded-md"
                >
                  <motion.div
                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="preserve-3d relative w-full"
                  >
                    {/* FRONT: Polaroid Photograph */}
                    <div className="backface-hidden relative rounded-sm border border-pink-200/70 bg-[#FFF9FC] p-3.5 pb-5 shadow-[0_18px_40px_rgba(112,26,81,0.18)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.5)]">
                      {/* Pastel pink-lavender washi tape accent */}
                      <div
                        aria-hidden="true"
                        className="absolute -top-3 left-1/2 h-6 w-20 -translate-x-1/2 -rotate-2 bg-gradient-to-r from-pink-200/85 to-violet-200/85 backdrop-blur-xs shadow-xs"
                      />

                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-pink-50">
                        {!brokenImages[currentMoment.id] ? (
                          <img
                            src={currentMoment.image}
                            alt={currentMoment.title}
                            referrerPolicy="no-referrer"
                            onError={() =>
                              setBrokenImages((prev) => ({ ...prev, [currentMoment.id]: true }))
                            }
                            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02] ${
                              currentMoment.imagePosition ?? "object-top"
                            }`}
                          />
                        ) : (
                          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-fuchsia-50 to-violet-100 p-6 text-center">
                            <Heart className="h-8 w-8 text-pink-600/70" aria-hidden="true" />
                            <p className="font-editorial mt-2 text-base font-medium text-fuchsia-950">
                              {currentMoment.title}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="mt-3.5 flex items-center justify-between gap-2 px-1">
                        <p className="font-handwritten text-xl leading-tight text-fuchsia-950">
                          {currentMoment.polaroidCaption}
                        </p>
                      </div>
                    </div>

                    {/* BACK: Secret Handwritten Whisper */}
                    <div
                      style={{ transform: "rotateY(180deg)" }}
                      className="backface-hidden parchment-card absolute inset-0 flex flex-col items-center justify-center rounded-sm border border-pink-300/60 p-7 text-center shadow-[0_18px_40px_rgba(112,26,81,0.18)]"
                    >
                      <Heart
                        className="h-6 w-6 fill-pink-600/80 text-pink-700"
                        aria-hidden="true"
                      />
                      <p className="font-ui mt-3 text-[11px] tracking-[0.2em] uppercase text-fuchsia-900/65">
                        Secret Note On Back
                      </p>
                      <p className="font-handwritten mt-4 text-3xl leading-snug text-[#701A51]">
                        “{currentMoment.secretWhisper}”
                      </p>
                      <p className="font-ui mt-6 text-xs text-fuchsia-900/60">
                        Tap again to see photo
                      </p>
                    </div>
                  </motion.div>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setIsFlipped((f) => !f)}
                className="mt-3 inline-flex min-h-[40px] items-center gap-1.5 text-xs font-medium text-fuchsia-800 dark:text-pink-300 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 rounded-md px-2"
              >
                <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{isFlipped ? "View Polaroid Front" : "Flip Polaroid for Secret Note"}</span>
              </button>
            </div>

            {/* Right: Memory Note & Romantic Quote */}
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                <div className="font-ui flex flex-wrap items-center gap-2 text-xs text-fuchsia-800/85 dark:text-pink-300/85">
                  <span>{currentMoment.dateLocation}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">
                    Memory {currentIndex + 1} of {moments.length}
                  </span>
                </div>

                <h3
                  className="font-editorial mt-2.5 text-3xl sm:text-4xl font-semibold leading-tight text-fuchsia-950 dark:text-pink-50"
                  style={{ textWrap: "balance" }}
                >
                  {currentMoment.title}
                </h3>

                <p className="font-editorial mt-4 text-lg sm:text-xl leading-relaxed text-fuchsia-950/85 dark:text-violet-100/90">
                  {currentMoment.memoryNote}
                </p>

                {/* Hairline-framed pull quote */}
                <blockquote className="mt-6 border-y border-pink-300/50 dark:border-pink-300/20 py-4">
                  <p className="font-editorial text-lg sm:text-xl italic text-[#831843] dark:text-pink-200">
                    {currentMoment.quote}
                  </p>
                </blockquote>
              </div>

              {/* Thumb-friendly Navigation Controls */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => goToIndex(currentIndex - 1)}
                  disabled={currentIndex === 0}
                  className="inline-flex min-h-[46px] items-center gap-1.5 rounded-xl border border-pink-300/60 dark:border-violet-300/25 px-4 py-2 text-sm font-medium text-fuchsia-950 dark:text-pink-100 transition-colors hover:bg-pink-500/10 dark:hover:bg-violet-400/15 disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={handleNextOrUnlock}
                  className="inline-flex min-h-[48px] flex-1 sm:flex-none items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#C03978] via-[#A9358A] to-[#7C4DFF] px-6 py-2.5 text-sm font-medium text-white shadow-lg transition-transform duration-150 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
                >
                  {isLastMoment ? (
                    <>
                      <Sparkles className="h-4 w-4 text-pink-100" aria-hidden="true" />
                      <span>Reveal Your Final Surprise</span>
                    </>
                  ) : currentIndex + 1 > unlockedUpTo ? (
                    <>
                      <span>Unlock Moment 0{currentIndex + 2}</span>
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  ) : (
                    <>
                      <span>Next Moment</span>
                      <ChevronRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
              </div>

              {allUnlocked && !isLastMoment && (
                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={onComplete}
                    className="min-h-[40px] text-xs font-medium text-fuchsia-800 dark:text-pink-300 hover:underline"
                  >
                    Skip to Final Surprise →
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
