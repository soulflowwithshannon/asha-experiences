"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import FadeIn from "@/components/FadeIn";

/**
 * Three slots that cycle through the retreat photographs, one per side of a
 * retreat: the practice, the ceremony, and the women. Each slot keeps its own
 * pool so the trio always reads as a whole week rather than three of the same
 * kind of picture.
 *
 * Every frame here is from a retreat we have actually run.
 */
const pools: { label: string; shots: { src: string; alt: string; pos?: string }[] }[] = [
  {
    label: "the practice",
    shots: [
      { src: "/images/Shannon stretch.jpg", alt: "Morning movement on retreat" },
      { src: "/images/ReturnToLove yogajpg.jpg", alt: "Yoga on retreat" },
      { src: "/images/Return to Love Waterfall.jpg", alt: "A waterfall on retreat" },
    ],
  },
  {
    label: "the ceremony",
    shots: [
      { src: "/images/Rebecca fire.jpg", alt: "A fire ceremony on retreat", pos: "center 40%" },
      { src: "/images/Kimberley in prayer.jpg", alt: "A quiet moment in ceremony" },
      { src: "/images/Ashley ceremony.jpg", alt: "Ashley holding ceremony on retreat" },
      { src: "/images/planting ceremony.jpg", alt: "A planting ceremony on retreat" },
    ],
  },
  {
    label: "the women",
    shots: [
      { src: "/images/group hug 2.jpg", alt: "Women embracing on retreat" },
      { src: "/images/ReturnToLove girls group.jpg", alt: "The group together on retreat" },
      { src: "/images/ReturnToLove group hug.jpg", alt: "A group hug on retreat" },
      { src: "/images/Kimberley and Ashley hug.jpg", alt: "Two women embracing on retreat" },
    ],
  },
];

// one beat per slot: the tick runs at a third of the dwell time so each
// photo holds for DWELL and the three change 1/3 of a beat apart
const SLOTS = 3;
const DWELL = 4800;

export default function RotatingTrio() {
  // starts at 0 on both server and client, then advances from an effect, so
  // there is nothing for hydration to disagree about
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setTick((t) => t + 1), DWELL / SLOTS);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className="custom-strip" style={{ maxWidth: 1080, margin: "56px auto 0" }}>
        {pools.map((pool, slot) => {
          // staggered so the three never change on the same beat
          const active = Math.floor(Math.max(0, tick - slot) / SLOTS) % pool.shots.length;
          return (
            <FadeIn key={pool.label} delay={slot * 0.08}>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
                  borderRadius: 2,
                  overflow: "hidden",
                  background: "var(--color-bg-card)",
                }}
              >
                {pool.shots.map((shot, i) => (
                  <Image
                    key={shot.src}
                    src={shot.src}
                    alt={shot.alt}
                    fill
                    sizes="(max-width: 760px) 50vw, 33vw"
                    style={{
                      objectFit: "cover",
                      objectPosition: shot.pos ?? "center",
                      opacity: i === active ? 1 : 0,
                      transition: "opacity 1100ms ease",
                    }}
                  />
                ))}
                <span
                  style={{
                    position: "absolute",
                    left: 14,
                    bottom: 12,
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "#F1F0E5",
                    textShadow: "0 1px 10px rgba(45,37,33,0.65)",
                  }}
                >
                  {pool.label}
                </span>
              </div>
            </FadeIn>
          );
        })}
      </div>
      <style>{`
        .custom-strip { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        @media (max-width: 760px) {
          /* the third would sit alone on a phone, so it carries the full width */
          .custom-strip { grid-template-columns: 1fr 1fr; gap: 8px; }
          .custom-strip > *:last-child { grid-column: span 2; }
          .custom-strip > *:last-child > div { aspect-ratio: 16/9 !important; }
        }
      `}</style>
    </>
  );
}
