"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";

/**
 * Photographs from retreats we have actually run. Deliberately a mosaic of
 * mixed widths rather than a uniform grid, so the eye moves across it instead
 * of reading it as a contact sheet.
 *
 * The grid is 6 columns; a wide tile spans 4 and a square 2. Keep the total
 * (4 per wide + 2 per square) a multiple of 6 or the last rows come out
 * ragged — 2 wide + 8 square = 24 = four full rows.
 */
const shots = [
  { src: "/images/group hug.jpg", alt: "Women laughing in a group hug on retreat", wide: true },
  { src: "/images/Shannon stretch.jpg", alt: "Morning movement on retreat" },
  { src: "/images/Rebecca fire.jpg", alt: "A fire ceremony on retreat" },
  { src: "/images/kenya-yoga-zebras.JPG", alt: "Yoga on the plains as zebras graze in Kenya", wide: true },
  { src: "/images/group at the moon.jpg", alt: "Women together at the moon sculpture in the jungle" },
  { src: "/images/Kimberley in prayer.jpg", alt: "A quiet moment in ceremony" },
  { src: "/images/planting ceremony.jpg", alt: "A planting ceremony on retreat" },
  { src: "/images/safari group.jpeg", alt: "Women on a safari jeep at golden hour" },
  { src: "/images/Morocco lounge.jpeg", alt: "A rooftop at dusk in Morocco" },
  { src: "/images/group arm raise.jpg", alt: "Women with hands joined and raised in the jungle" },
];

export default function RetreatGallery() {
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
          {shots.map((shot, i) => (
            <FadeIn key={shot.src} delay={(i % 4) * 0.06} className={shot.wide ? "g-wide" : "g-sq"}>
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
