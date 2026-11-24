"use client";

// Home page: "from our retreats". Ashley's and Shannon's clips as silent,
// looping previews either side of four photos; tapping a clip restarts it
// with sound and controls. Only one clip plays with sound at a time.
// "see all 21 photos" opens the full mosaic underneath.
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import { galleryShots, GalleryMosaic } from "@/components/RetreatGallery";

// Videos live in Cloudflare R2 (see VideoPair). Two separate files.
const R2_BASE = "https://pub-2741403aca194491b445876d4a738ef8.r2.dev/videos/";

const clips = [
  { id: "ashley", file: "Ashley moment from retreat.MOV", caption: "ashley · dancing together on the last night" },
  { id: "shannon", file: "Shannon moment from retreat.MOV", caption: "shannon · a mayan fire ceremony and cacao circle" },
];

// [TODO: Shannon to pick final 4] — the first four photos of the gallery for now
const featured = galleryShots.slice(0, 4);

function MomentVideo({
  clip,
  active,
  onActivate,
  onDeactivate,
  className,
}: {
  clip: (typeof clips)[number];
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [src, setSrc] = useState<string | undefined>(undefined);

  // lazy: only attach the file once the tile is near the screen
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const load = () => setSrc(R2_BASE + encodeURIComponent(clip.file));
    if (!("IntersectionObserver" in window)) {
      load();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [clip.file]);

  // back to a silent looping preview whenever this clip isn't the one with sound
  useEffect(() => {
    const v = ref.current;
    if (!v || !src || active) return;
    v.muted = true;
    v.loop = true;
    v.play().catch(() => {});
  }, [active, src]);

  // sound has to start inside the tap itself (iOS refuses it later)
  const playWithSound = () => {
    const v = ref.current;
    if (v) {
      if (!src) setSrc(R2_BASE + encodeURIComponent(clip.file));
      v.muted = false;
      v.loop = false;
      v.currentTime = 0;
      v.play().catch(() => {});
    }
    onActivate();
  };

  return (
    <figure className={className} style={{ margin: 0, display: "flex", flexDirection: "column" }}>
      <div className="moment-tile" style={{ position: "relative", flex: 1, borderRadius: 6, overflow: "hidden", background: "var(--color-bg-card)" }}>
        <video
          ref={ref}
          src={src}
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          controls={active}
          onEnded={onDeactivate}
          aria-label={clip.caption}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {!active && (
          <button
            type="button"
            onClick={playWithSound}
            aria-label={`play ${clip.id}'s story with sound`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", padding: 0, background: "linear-gradient(to top, rgba(45,37,33,0.55), rgba(45,37,33,0) 45%)", cursor: "pointer", display: "flex", alignItems: "flex-end", justifyContent: "flex-start" }}
          >
            <span style={{ margin: 12, padding: "6px 12px", borderRadius: 999, background: "rgba(255,252,245,0.92)", color: "#2D2521", fontFamily: "var(--font-dm-sans)", fontSize: 12, fontWeight: 600, letterSpacing: "0.02em", whiteSpace: "nowrap" }}>
              ▶ hear the story
            </span>
          </button>
        )}
      </div>
      <figcaption style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, lineHeight: 1.5, color: "var(--color-text-body)", marginTop: 10 }}>
        {clip.caption}
      </figcaption>
    </figure>
  );
}

export default function RetreatMoments() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

  const video = (i: number, className: string) => (
    <MomentVideo
      clip={clips[i]}
      className={className}
      active={playing === clips[i].id}
      onActivate={() => setPlaying(clips[i].id)}
      onDeactivate={() => setPlaying((p) => (p === clips[i].id ? null : p))}
    />
  );

  return (
    <section style={{ background: "var(--color-bg-page)", padding: "72px 32px 64px" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <FadeIn>
          <p className="eyebrow-accent" style={{ textAlign: "center", marginBottom: 14 }}>FROM OUR RETREATS</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px,3.6vw,34px)", fontWeight: 700, color: "var(--color-text-headline)", textAlign: "center", marginBottom: 44, textWrap: "balance" }}>
            the moments we still talk about
          </h2>
        </FadeIn>

        <FadeIn>
          <div className="moments-grid">
            {video(0, "moment-a")}
            <div className="moment-photos">
              {featured.map((shot) => (
                <div key={shot.src} style={{ position: "relative", aspectRatio: "1 / 1", borderRadius: 6, overflow: "hidden", background: "var(--color-bg-card)" }}>
                  <Image src={shot.src} alt={shot.alt} fill loading="lazy" sizes="(max-width: 700px) 50vw, (max-width: 1000px) 45vw, 300px" style={{ objectFit: "cover" }} />
                </div>
              ))}
            </div>
            {video(1, "moment-b")}
          </div>
        </FadeIn>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <button
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.06em", color: "var(--color-accent)", background: "none", border: "0.5px solid var(--color-bg-card)", borderRadius: 999, padding: "13px 28px", minHeight: 44, cursor: "pointer" }}
          >
            {showAll ? "show fewer" : `see all ${galleryShots.length} photos →`}
          </button>
        </div>

        {showAll && (
          <div style={{ marginTop: 36 }}>
            <GalleryMosaic />
          </div>
        )}
      </div>

      <style>{`
        /* desktop: tall clip | 2x2 photos | tall clip, clips as tall as the grid */
        .moments-grid {
          display: grid;
          grid-template-columns: 9fr 16fr 9fr;
          gap: 16px;
          align-items: stretch;
        }
        .moment-a { grid-column: 1; grid-row: 1; }
        .moment-photos { grid-column: 2; grid-row: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .moment-b { grid-column: 3; grid-row: 1; }
        .moment-tile { min-height: 200px; }

        /* tablet: both clips side by side on top, photos below */
        @media (max-width: 1000px) {
          .moments-grid { grid-template-columns: 1fr 1fr; max-width: 720px; margin: 0 auto; }
          .moment-a { grid-column: 1; grid-row: 1; }
          .moment-b { grid-column: 2; grid-row: 1; }
          .moment-photos { grid-column: 1 / -1; grid-row: 2; }
          .moment-tile { flex: none !important; aspect-ratio: 9 / 16; }
        }
        @media (max-width: 600px) {
          .moments-grid { gap: 10px; }
          .moment-photos { gap: 8px; }
        }
      `}</style>
    </section>
  );
}
