"use client";

import FadeIn from "@/components/FadeIn";

// Videos live in Cloudflare R2, not public/videos — see AGENTS.md.
const R2_BASE = "https://pub-2741403aca194491b445876d4a738ef8.r2.dev/videos/";

export interface Clip {
  /** Filename inside the R2 videos/ folder, e.g. "Ashley ASHA.mov". */
  file: string;
  /** Caption under the video. Omit for no caption. */
  label?: string;
  /** Poster image, so the player isn't a black rectangle before play. */
  poster?: string;
}

function mimeFor(file: string) {
  return file.toLowerCase().endsWith(".mov") ? "video/quicktime" : "video/mp4";
}

export default function VideoPair({
  clips,
  headline,
  orientation = "vertical",
  background = "var(--color-bg-page)",
  padding = "80px 32px",
}: {
  clips: [Clip, Clip];
  headline?: string;
  /** "vertical" = 9:16 story clips; "horizontal" = 16:9. */
  orientation?: "vertical" | "horizontal";
  background?: string;
  padding?: string;
}) {
  const isVertical = orientation === "vertical";
  const maxWidth = isVertical ? 720 : 1100;

  return (
    <section style={{ background, padding }}>
      {headline && (
        <FadeIn>
          <p
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(26px,4vw,36px)",
              fontWeight: 700,
              color: "var(--color-text-headline)",
              textAlign: "center",
              marginBottom: 48,
            }}
          >
            {headline}
          </p>
        </FadeIn>
      )}
      <div
        className="video-pair"
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, maxWidth, margin: "0 auto" }}
      >
        {clips.map((clip, i) => (
          <FadeIn key={clip.file} delay={i * 0.1}>
            <div
              style={{
                position: "relative",
                aspectRatio: isVertical ? "9/16" : "16/9",
                borderRadius: 12,
                overflow: "hidden",
                background: "var(--color-bg-card)",
              }}
            >
              <video
                controls
                playsInline
                preload="metadata"
                poster={clip.poster}
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              >
                <source src={R2_BASE + encodeURIComponent(clip.file)} type={mimeFor(clip.file)} />
              </video>
            </div>
            {clip.label && (
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 12,
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  textAlign: "center",
                  marginTop: 12,
                }}
              >
                {clip.label}
              </p>
            )}
          </FadeIn>
        ))}
      </div>
      <style>{`@media(max-width:640px){.video-pair{grid-template-columns:1fr!important;gap:40px!important;max-width:${isVertical ? 360 : 520}px!important}}`}</style>
    </section>
  );
}
