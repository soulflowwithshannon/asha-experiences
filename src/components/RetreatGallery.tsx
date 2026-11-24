"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";

/**
 * Photographs from retreats we have actually run — the headline makes that
 * claim, so nothing speculative or supplied by a venue belongs in here.
 * Deliberately a mosaic of mixed widths rather than a uniform grid, so the eye
 * moves across it instead of reading it as a contact sheet.
 *
 * The grid is 6 columns; a wide tile spans 4 and a square 2. Keep each run a
 * multiple of 6 or rows come out ragged. The first ten are 24 units and the
 * remaining eleven are another 24, so both the collapsed and the expanded
 * state tile into full rows. New photos are interleaved rather than appended,
 * so the two shoots read as one body of work.
 */
export const galleryShots = [
  { src: "/images/group hug.jpg", alt: "Women laughing in a group hug on retreat" },
  { src: "/images/ReturnToLove bracelets.jpg", alt: "Bracelets made on retreat", wide: true },
  { src: "/images/Shannon stretch.jpg", alt: "Morning movement on retreat" },
  { src: "/images/ReturnToLove girls group.jpg", alt: "The group together on retreat" },
  { src: "/images/Kimberley in prayer.jpg", alt: "A quiet moment in ceremony" },
  { src: "/images/ReturnToLove25-357.jpg", alt: "Women together on retreat", wide: true },
  { src: "/images/planting ceremony.jpg", alt: "A planting ceremony on retreat" },
  { src: "/images/Return to Love group sunset.jpg", alt: "The group at sunset on retreat" },
  { src: "/images/group arm raise.jpg", alt: "Women with hands joined and raised in the jungle" },
  { src: "/images/ReturnToLove circle.jpg", alt: "A women's circle on retreat" },
  // ── everything below appears only once the gallery is opened ──
  { src: "/images/Rebecca fire.jpg", alt: "A fire ceremony on retreat", wide: true },
  { src: "/images/ReturnToLove group hug.jpg", alt: "A group hug on retreat" },
  { src: "/images/Bre ceremony.jpg", alt: "A woman receiving a blessing in ceremony" },
  { src: "/images/ReturnToLove yogajpg.jpg", alt: "Yoga on retreat" },
  { src: "/images/group at the moon.jpg", alt: "Women together at the moon sculpture in the jungle" },
  { src: "/images/ReturnToLove25-401.jpg", alt: "Women on retreat" },
  { src: "/images/group hug 2.jpg", alt: "Women embracing on retreat" },
  { src: "/images/Return to Love Waterfall.jpg", alt: "A waterfall on retreat" },
  { src: "/images/Kimberley and Ashley hug.jpg", alt: "Two women embracing on retreat" },
  { src: "/images/ReturnToLove25-396.jpg", alt: "A moment on retreat" },
  { src: "/images/ReturnToLove girls group 2.jpg", alt: "The group together on retreat" },
];


/** The full mosaic of every photo. Opened from "see all 21 photos" in the
    home page's moments section (RetreatMoments). */
export function GalleryMosaic() {
  return (
    <>
      <div className="gallery-grid">
        {galleryShots.map((shot, i) => (
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
          border-radius: 6px;
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
    </>
  );
}
