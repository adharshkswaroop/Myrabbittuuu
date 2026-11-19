/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * ============================================================================
 *  QUICK CUSTOMIZATION:
 *  Open `src/config.ts` to edit the `CONFIG` object with:
 *   - Your full multi-paragraph Love Letter
 *   - Image URLs/filenames for all 8 Polaroid Moments
 *   - Your YouTube song link or MP3 link for background music
 * ============================================================================
 */

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun, Music, VolumeX, ExternalLink } from "lucide-react";
import { CONFIG } from "./config";
import { romanticAudio } from "./utils/romanticAudio";
import { AmbientTableLayer } from "./components/AmbientTableLayer";
import { EnvelopeGate } from "./components/EnvelopeGate";
import { BirthdayCakeStep } from "./components/BirthdayCakeStep";
import { LoveLetterStep } from "./components/LoveLetterStep";
import { MomentsDeckStep } from "./components/MomentsDeckStep";
import { FinalSurpriseStep } from "./components/FinalSurpriseStep";

export { CONFIG };

type GiftStep = "envelope" | "cake" | "letter" | "moments" | "surprise";

const STEP_ORDER: { id: GiftStep; label: string }[] = [
  { id: "envelope", label: "Seal" },
  { id: "cake", label: "Wish" },
  { id: "letter", label: "Letter" },
  { id: "moments", label: "8 Moments" },
  { id: "surprise", label: "Surprise" },
];

export default function App() {
  const [step, setStep] = useState<GiftStep>("envelope");
  const [maxUnlockedStepIndex, setMaxUnlockedStepIndex] = useState(0);
  // Default to soft Baby Pink & Lavender Pastel Silk; user can toggle to Twilight Lavender
  const [isTwilight, setIsTwilight] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // Sync Tailwind v4 `.dark` class with Pastel Silk / Twilight Lavender toggle
  useEffect(() => {
    const root = document.documentElement;
    if (isTwilight) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isTwilight]);

  // Keep UI button synced with YouTube / Web Audio player state
  useEffect(() => {
    const unsubscribe = romanticAudio.subscribe(setIsMusicPlaying);
    return () => {
      unsubscribe();
      romanticAudio.stop();
    };
  }, []);

  const advanceTo = (nextStep: GiftStep) => {
    const nextIdx = STEP_ORDER.findIndex((s) => s.id === nextStep);
    setMaxUnlockedStepIndex((prev) => Math.max(prev, nextIdx));
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleToggleMusic = async () => {
    const nowPlaying = await romanticAudio.toggle();
    setIsMusicPlaying(nowPlaying);
  };

  const handleUnlockEnvelope = async () => {
    if (!isMusicPlaying) {
      try {
        await romanticAudio.start();
        setIsMusicPlaying(romanticAudio.getPlaying());
      } catch {
        // Browser autoplay policies may wait for direct music button tap
      }
    }
    advanceTo("cake");
  };

  const handleReplay = () => {
    setMaxUnlockedStepIndex(0);
    setStep("envelope");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentStepIdx = STEP_ORDER.findIndex((s) => s.id === step);

  return (
    <div
      className={`relative min-h-dvh w-full transition-colors duration-500 ${
        isTwilight ? "table-surface-twilight" : "table-surface-pastel"
      }`}
    >
      {/* Ambient Pink & Lavender Petals, Motes & Filigree Corners */}
      <AmbientTableLayer />

      {/* Compact Sticky Top Utility Bar (<= 10% mobile viewport height) */}
      <header className="sticky top-0 z-30 border-b border-pink-300/40 dark:border-pink-300/15 bg-[#FCEBF4]/80 dark:bg-[#170E22]/85 backdrop-blur-md">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between gap-3 px-4">
          {/* Left: Clean Step Breadcrumb */}
          <nav
            aria-label="Gift chapters"
            className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto"
          >
            {STEP_ORDER.map((item, idx) => {
              const unlocked = idx <= maxUnlockedStepIndex;
              const active = idx === currentStepIdx;
              return (
                <React.Fragment key={item.id}>
                  {idx > 0 && (
                    <span
                      aria-hidden="true"
                      className="text-xs text-pink-400 dark:text-violet-500 select-none"
                    >
                      ·
                    </span>
                  )}
                  <button
                    type="button"
                    disabled={!unlocked}
                    onClick={() => unlocked && setStep(item.id)}
                    className={`min-h-[36px] whitespace-nowrap shrink-0 rounded-md px-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                      active
                        ? "text-[#9D174D] dark:text-pink-200 underline underline-offset-4"
                        : unlocked
                        ? "text-fuchsia-950/75 dark:text-violet-200 hover:text-fuchsia-950 dark:hover:text-pink-100"
                        : "cursor-default text-fuchsia-900/35 dark:text-violet-400/35"
                    }`}
                  >
                    {item.label}
                  </button>
                </React.Fragment>
              );
            })}
          </nav>

          {/* Right: Ambiance Toggle & Floating Music Control */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={() => setIsTwilight((prev) => !prev)}
              aria-label={
                isTwilight ? "Switch to Pastel Silk ambiance" : "Switch to Twilight Lavender ambiance"
              }
              className="inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-pink-300/50 dark:border-pink-300/20 bg-white/75 dark:bg-[#261738]/80 px-2.5 text-xs font-medium text-fuchsia-950 dark:text-pink-100 whitespace-nowrap shrink-0 transition-colors hover:bg-white dark:hover:bg-[#311E48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            >
              {isTwilight ? (
                <>
                  <Sun className="h-3.5 w-3.5 text-pink-300" aria-hidden="true" />
                  <span className="hidden sm:inline">Pastel Silk</span>
                </>
              ) : (
                <>
                  <Moon className="h-3.5 w-3.5 text-violet-700" aria-hidden="true" />
                  <span className="hidden sm:inline">Twilight</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleToggleMusic}
              aria-label={isMusicPlaying ? "Pause birthday song" : "Play birthday song"}
              className={`inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 ${
                isMusicPlaying
                  ? "border-pink-400/50 bg-gradient-to-r from-[#C03978] to-[#8B5CF6] text-white"
                  : "border-pink-300/50 dark:border-pink-300/20 bg-white/75 dark:bg-[#261738]/80 text-fuchsia-950 dark:text-pink-100 hover:bg-white dark:hover:bg-[#311E48]"
              }`}
            >
              {isMusicPlaying ? (
                <>
                  <Music className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Music On</span>
                </>
              ) : (
                <>
                  <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
                  <span className="hidden sm:inline">Play Song</span>
                </>
              )}
            </button>

            {CONFIG.youtubeMusicUrl && (
              <a
                href={CONFIG.youtubeMusicUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open birthday song on YouTube"
                title="Open song on YouTube"
                className="inline-flex min-h-[38px] min-w-[38px] items-center justify-center rounded-lg border border-pink-300/50 dark:border-pink-300/20 bg-white/75 dark:bg-[#261738]/80 text-fuchsia-900 dark:text-pink-200 transition-colors hover:bg-white dark:hover:bg-[#311E48] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
              >
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Stage (flex-col + my-auto avoids clipping tall cards on short screens) */}
      <main className="relative z-20 flex min-h-[calc(100dvh-3.1rem)] flex-col py-4 sm:py-8">
        <div className="my-auto w-full">
          <AnimatePresence mode="wait">
            {step === "envelope" && (
              <motion.div
                key="step-envelope"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <EnvelopeGate onUnlock={handleUnlockEnvelope} />
              </motion.div>
            )}

            {step === "cake" && (
              <motion.div
                key="step-cake"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <BirthdayCakeStep onContinue={() => advanceTo("letter")} />
              </motion.div>
            )}

            {step === "letter" && (
              <motion.div
                key="step-letter"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <LoveLetterStep onContinue={() => advanceTo("moments")} />
              </motion.div>
            )}

            {step === "moments" && (
              <motion.div
                key="step-moments"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <MomentsDeckStep onComplete={() => advanceTo("surprise")} />
              </motion.div>
            )}

            {step === "surprise" && (
              <motion.div
                key="step-surprise"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <FinalSurpriseStep onReplay={handleReplay} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
