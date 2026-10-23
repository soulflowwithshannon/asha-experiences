"use client";

import { useEffect, useState } from "react";

/** One of these is chosen per visit, so the page speaks a little differently each time. */
const LINES = [
  "something in you has been asking for this for a while.",
  "the part of you that is tired of holding it together already knows.",
  "you have been circling this one longer than you would admit.",
  "whatever brought you here, it was not boredom.",
  "the timing is rarely convenient. it is still the timing.",
  "you can keep scrolling. it will still be true tomorrow.",
];

const STAR_COUNT = 34;
const DRIFT_SECONDS = 34;
const TINTS = ["#F1F0E5", "#C39E88", "#A67C52"];

/**
 * Fixed sequence rather than Math.random, so the server and the browser draw
 * the same sky. Random here would be a hydration mismatch.
 */
function seeded(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const STARS = Array.from({ length: STAR_COUNT }, (_, i) => {
  const size = 1 + Math.round(seeded(i + 101) * 1.6 * 10) / 10;
  return {
    left: `${(seeded(i + 1) * 100).toFixed(2)}%`,
    top: `${(seeded(i + 51) * 100).toFixed(2)}%`,
    size,
    tint: TINTS[i % TINTS.length],
    driftDur: (DRIFT_SECONDS + seeded(i + 151) * 18).toFixed(1),
    breatheDur: (5 + seeded(i + 201) * 7).toFixed(1),
    delay: (-seeded(i + 251) * 30).toFixed(1),
  };
});

export default function QuietNote() {
  // picked after mount: choosing during render would make the server and the
  // browser disagree about what the page says
  const [line, setLine] = useState<string | null>(null);

  useEffect(() => {
    // a timeout rather than requestAnimationFrame: rAF is paused in a
    // background tab, which would leave the line invisible until the reader
    // happened to look at it
    const id = setTimeout(() => {
      setLine(LINES[Math.floor(Math.random() * LINES.length)]);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <section
      aria-labelledby="quiet-note"
      style={{ position: "relative", background: "#2D2521", overflow: "hidden", padding: "128px 32px" }}
    >
      <div aria-hidden="true" style={{ position: "absolute", inset: "-140px 0 0 0", pointerEvents: "none" }}>
        {STARS.map((star, i) => (
          <span
            key={i}
            className="quiet-star"
            style={{
              position: "absolute",
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              borderRadius: "50%",
              background: star.tint,
              animationDuration: `${star.driftDur}s, ${star.breatheDur}s`,
              animationDelay: `${star.delay}s, ${Number(star.delay) / 2}s`,
            }}
          />
        ))}
      </div>

      <div style={{ position: "relative", maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
        <p className="eyebrow-accent" style={{ marginBottom: 26 }}>a quiet note</p>

        <h2
          id="quiet-note"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(30px,4.6vw,46px)",
            lineHeight: 1.3,
            color: "#F1F0E5",
            marginBottom: 24,
          }}
        >
          you didn&apos;t find this by accident.
        </h2>

        <p
          className="quiet-line"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 15,
            lineHeight: 1.9,
            color: "#C5AA9B",
            maxWidth: 440,
            margin: "0 auto",
            minHeight: 58,
            opacity: line ? 1 : 0,
          }}
        >
          {line ?? LINES[0]}
        </p>
      </div>

      <style>{`
        @keyframes quiet-drift {
          from { transform: translateY(0); }
          to   { transform: translateY(-120px); }
        }
        @keyframes quiet-breathe {
          0%, 100% { opacity: 0.07; }
          50%      { opacity: 0.34; }
        }
        .quiet-star {
          animation-name: quiet-drift, quiet-breathe;
          animation-timing-function: linear, ease-in-out;
          animation-iteration-count: infinite, infinite;
          will-change: transform, opacity;
        }
        .quiet-line { transition: opacity 900ms ease; }
        @media (prefers-reduced-motion: reduce) {
          .quiet-star { animation: none !important; opacity: 0.2 !important; }
          .quiet-line { transition: none !important; }
        }
      `}</style>
    </section>
  );
}
