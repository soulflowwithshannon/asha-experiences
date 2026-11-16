"use client";

import Image from "next/image";
import { useState } from "react";
import FadeIn from "@/components/FadeIn";

/**
 * Photographs from retreats we have actually run — the headline makes that
 * claim, so nothing speculative or supplied by a venue belongs in here.
 * Deliberately a mosaic of mixed widths rather than a uniform grid, so the eye
 * moves across it instead of reading it as a contact sheet.
 *
 * The grid is 6 columns; a wide tile spans 4 and a square 2. Keep each run a
 * multiple of 6 or rows come out ragged. The first ten are 24 units (four
 * rows) and the remaining seven are 18 (three more), so both the collapsed and
 * the expanded state tile cleanly.
 */
const shots = [
  { src: "/images/group hug.jpg", alt: "Women laughing in a group hug on retreat" },
  { src: "/images/Rebecca fire.jpg", alt: "A fire ceremony on retreat", wide: true },
  { src: "/images/Shannon stretch.jpg", alt: "Morning movement on retreat" },
  { src: "/images/group at the moon.jpg", alt: "Women together at the moon sculpture in the jungle" },
  { src: "/images/Kimberley in prayer.jpg", alt: "A quiet moment in ceremony" },
  { src: "/images/ReturnToLove bracelets.jpg", alt: "Bracelets made on retreat", wide: true },
  { src: "/images/planting ceremony.jpg", alt: "A planting ceremony on retreat" },
  { src: "/images/group arm raise.jpg", alt: "Women with hands joined and raised in the jungle" },
  { src: "/images/Ashley ceremony.jpg", alt: "Ashley holding ceremony on retreat" },
  { src: "/images/group hug 2.jpg", alt: "Women embracing on retreat" },
  // ── everything below appears only once the gallery is opened ──
  { src: "/images/ReturnToLove25-357.jpg", alt: "Women together on retreat", wide: true },
  { src: "/images/ReturnToLove group hug.jpg", alt: "A group hug on retreat" },
  { src: "/images/Return to Love Waterfall.jpg", alt: "A waterfall on retreat" },
  { src: "/images/ReturnToLove yogajpg.jpg", alt: "Yoga on retreat" },
  { src: "/images/Kimberley and Ashley hug.jpg", alt: "Two women embracing on retreat" },
  { src: "/images/ReturnToLove25-401.jpg", alt: "Women on retreat", wide: true },
  { src: "/images/ReturnToLove25-396.jpg", alt: "A moment on retreat" },
];

const COLLAPSED = 10;

export default function RetreatGallery() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? shots : shots.slice(0, COLLAPSED);

  return (
    <section style={{ background: "var(--color-bg-page)", padding: "88px 32px 96px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <FadeIn>
          <p className="eyebrow-accent" style={{ textAlign: "center", marginBottom: 14 }}>
            from our retreats
          </p>
          <h2
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(26px,3.6vw,34px)",
              fontWeight: 700,
              color: "var(--color-text-headline)",
              textAlign: "center",
              marginBottom: 48,
              textWrap: "balance",
            }}
          >
            not stock photos. these are the women who came.
          </h2>
        </FadeIn>

        <div className="gallery-grid">
          {visible.map((shot, i) => (
            <FadeIn
              key={shot.src}
              // the revealed tiles stagger among themselves, so opening the
              // gallery does not re-run the first ten entrances
              delay={(i < COLLAPSED ? i % 4 : (i - COLLAPSED) % 4) * 0.06}
              className={shot.wide ? "g-wide" : "g-sq"}
            >
              <div className="gallery-tile">
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  fill
                  sizes="(max-width: 700px) 50vw, (max-width: 1000px) 33vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </FadeIn>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 36 }}>
          <button
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              letterSpacing: "0.06em",
              color: "var(--color-accent)",
              background: "none",
              border: "0.5px solid var(--color-bg-card)",
              borderRadius: 999,
              padding: "13px 28px",
              minHeight: 44,
              cursor: "pointer",
            }}
          >
            {expanded ? "show fewer" : `see all ${shots.length} photos →`}
          </button>
        </div>
      </div>

      <style>{`
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 10px;
          grid-auto-flow: dense;
        }
        /* FadeIn wraps every tile, so the span has to live on the wrapper */
        .gallery-grid > .g-sq { grid-column: span 2; }
        .gallery-grid > .g-wide { grid-column: span 4; }
        .gallery-tile {
          position: relative;
          width: 100%;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 2px;
          background: var(--color-bg-card);
        }
        .gallery-grid > .g-wide .gallery-tile { aspect-ratio: 2 / 1; }
        .gallery-tile img { transition: transform 900ms cubic-bezier(0.22, 1, 0.36, 1); }
        .gallery-tile:hover img { transform: scale(1.05); }

        @media (max-width: 700px) {
          .gallery-grid { grid-template-columns: repeat(4, 1fr); gap: 8px; }
          .gallery-grid > .g-sq,
          .gallery-grid > .g-wide { grid-column: span 2; }
          .gallery-grid > .g-wide .gallery-tile { aspect-ratio: 1 / 1; }
        }
      `}</style>
    </section>
  );
}
