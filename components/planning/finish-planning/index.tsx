"use client";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export default function FinishButton() {
  return (
    <div className="flex flex-row justify-center items-center pt-1">
      <Button
        size="lg"
        className="cta-button group relative h-12 px-8 gap-2 rounded-xl text-white shadow-[0_14px_32px_rgba(0,0,0,0.12)] ring-1 ring-[color-mix(in_srgb,var(--color-primary)_45%,#ffffff_55%)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.16)] active:translate-y-0"
      >
        <span className="cta-button__glow" aria-hidden />
        <CheckCircle2
          size={22}
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <span className="text-lg font-semibold">Inicia previsão</span>
        <span className="cta-button__shine" aria-hidden />
      </Button>
      <style jsx>{`
        .cta-button {
          background: linear-gradient(
              135deg,
              color-mix(in srgb, var(--color-highlight) 70%, #ffffff 30%) 0%,
              color-mix(in srgb, var(--color-primary) 55%, #ffffff 45%) 50%,
              color-mix(in srgb, var(--color-primaryStrong) 36%, #e7f7ff 64%)
                100%
            ),
            radial-gradient(
              circle at 24% 32%,
              color-mix(in srgb, var(--color-primaryStrong) 20%, #b2ecff 80%),
              transparent 48%
            );
          color: #fdfefe;
          overflow: hidden;
        }

        .cta-button__glow {
          position: absolute;
          inset: -55% -45%;
          background: radial-gradient(
            circle,
            color-mix(in srgb, var(--color-highlight) 68%, #ffffff 32%) 0%,
            transparent 60%
          );
          filter: blur(18px);
          opacity: 0.35;
          animation: pulseGlow 5s ease-in-out infinite;
          z-index: 0;
        }

        .cta-button__shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.35) 45%,
            rgba(255, 255, 255, 0.1) 60%,
            transparent 100%
          );
          transform: translateX(-120%);
          animation: shimmer 2.8s ease-in-out infinite;
          opacity: 0.6;
          pointer-events: none;
          z-index: 0;
        }

        .cta-button > :global(svg),
        .cta-button > span:not(.cta-button__glow):not(.cta-button__shine) {
          position: relative;
          z-index: 1;
        }

        @keyframes pulseGlow {
          0% {
            transform: scale(0.9);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.7;
          }
          100% {
            transform: scale(0.95);
            opacity: 0.35;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }

        .fish-scroll {
          scrollbar-width: thin;
          scrollbar-color: color-mix(
              in srgb,
              var(--color-primary) 40%,
              var(--color-border)
            )
            color-mix(
              in srgb,
              var(--color-surface) 88%,
              var(--color-highlight) 12%
            );
        }

        .fish-scroll::-webkit-scrollbar {
          width: 10px;
        }

        .fish-scroll::-webkit-scrollbar-track {
          background: color-mix(
            in srgb,
            var(--color-surface) 88%,
            var(--color-highlight) 12%
          );
          border-radius: 9999px;
        }

        .fish-scroll::-webkit-scrollbar-thumb {
          background: color-mix(
            in srgb,
            var(--color-primary) 46%,
            var(--color-border)
          );
          border: 2px solid
            color-mix(
              in srgb,
              var(--color-surface) 85%,
              var(--color-highlight) 15%
            );
          border-radius: 9999px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }

        .fish-scroll::-webkit-scrollbar-thumb:hover {
          background: color-mix(
            in srgb,
            var(--color-primaryStrong) 55%,
            var(--color-primary)
          );
        }
      `}</style>
    </div>
  );
}
