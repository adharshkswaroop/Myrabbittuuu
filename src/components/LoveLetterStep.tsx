import React from "react";
import { motion } from "motion/react";
import { Sparkles, Heart } from "lucide-react";
import { CONFIG } from "../config";

interface LoveLetterStepProps {
  onContinue: () => void;
}

export const LoveLetterStep: React.FC<LoveLetterStepProps> = ({ onContinue }) => {
  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-4 sm:py-8">
      {/* Unfolding Textured Blush-Lavender Parchment Letter */}
      <motion.article
        initial={{ opacity: 0, y: 24, scaleY: 0.9 }}
        animate={{ opacity: 1, y: 0, scaleY: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "top center" }}
        className="parchment-card relative mx-auto rounded-2xl border border-pink-300/60 px-6 py-8 sm:px-14 sm:py-12 text-[#35182F] shadow-[0_24px_65px_rgba(147,51,234,0.16)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.75)]"
      >
        {/* Inner delicate rose-lavender hairline frame */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-3 sm:inset-4 rounded-xl border border-violet-400/30"
        />

        <div className="relative mx-auto max-w-prose">
          {/* Floral / Ribbon Header Ornament */}
          <div className="flex flex-col items-center text-center">
            <svg
              width="56"
              height="24"
              viewBox="0 0 56 24"
              fill="none"
              aria-hidden="true"
              className="text-pink-600/75"
            >
              <path
                d="M28 21C28 21 22 15 22 9.5C22 6 24.7 3.5 28 3.5C31.3 3.5 34 6 34 9.5C34 15 28 21 28 21Z"
                fill="currentColor"
                fillOpacity="0.2"
                stroke="currentColor"
                strokeWidth="1.1"
              />
              <path
                d="M17 14C12 14 7 12 5 9M39 14C44 14 49 12 51 9"
                stroke="#8B5CF6"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
            <p className="font-ui mt-2 text-xs tracking-[0.18em] uppercase text-fuchsia-900/70">
              {CONFIG.loveLetter.dateLine}
            </p>
            <div className="mt-4 h-px w-24 bg-gradient-to-r from-pink-400/50 via-violet-400/60 to-pink-400/50" />
          </div>

          {/* Salutation */}
          <h2
            className="font-editorial mt-7 text-2xl sm:text-3xl font-semibold leading-snug text-[#701A51]"
            style={{ textWrap: "balance" }}
          >
            {CONFIG.loveLetter.salutation}
          </h2>

          {/* Multi-paragraph Letter Body */}
          <div className="mt-6 space-y-5 font-editorial text-lg sm:text-[1.26rem] leading-[1.82] text-[#35182F]">
            {CONFIG.loveLetter.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? "first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-editorial first-letter:text-5xl first-letter:font-bold first-letter:leading-none first-letter:text-[#9D174D]"
                    : ""
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Handwritten Signature */}
          <div className="mt-9 flex flex-col items-end border-t border-pink-300/45 pt-6">
            <p className="font-handwritten text-3xl sm:text-4xl text-[#9D174D]">
              {CONFIG.loveLetter.closing}
            </p>
          </div>

          {/* CTA to 8 Moments */}
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#C03978] via-[#A9358A] to-[#7C4DFF] px-7 py-3 text-sm font-medium text-white shadow-lg transition-transform duration-150 hover:brightness-110 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400"
            >
              <Sparkles className="h-4 w-4 text-pink-100" aria-hidden="true" />
              <span>Discover Our 8 Moments Together</span>
              <Heart className="h-4 w-4 fill-pink-100/80 text-pink-100" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.article>
    </section>
  );
};
