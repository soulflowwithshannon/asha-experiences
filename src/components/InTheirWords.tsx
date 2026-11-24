"use client";

// Dark testimonial band: the Jess quote and the testimonial video behind a
// play button. Used on /retreats/kenya and the home page.
import { ReactNode, useState } from "react";
import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const TESTIMONIAL_VIDEO = "https://pub-2741403aca194491b445876d4a738ef8.r2.dev/videos/Testimonials.mp4";

function TestimonialVideo() {
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {playing ? (
        <video controls autoPlay playsInline style={{ width: "100%", display: "block", borderRadius: 8 }}>
          <source src={TESTIMONIAL_VIDEO} type="video/mp4" />
        </video>
      ) : (
        <button onClick={() => setPlaying(true)} aria-label="play the testimonial video" style={{ position: "relative", display: "block", width: "100%", aspectRatio: "16/9", border: "none", padding: 0, borderRadius: 8, overflow: "hidden", cursor: "pointer", background: "#2D2521" }}>
          <Image src="/images/ReturnToLove group hug.jpg" alt="" fill sizes="720px" style={{ objectFit: "cover", opacity: 0.8 }} />
          <span style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: "linear-gradient(to top, rgba(45,37,33,0.65), rgba(45,37,33,0.1))" }}>
            <span style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--color-accent)", color: "#FFFCF5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, paddingLeft: 4 }}>▶</span>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 600, color: "#FFFCF5", letterSpacing: "0.04em" }}>hear it from them</span>
          </span>
        </button>
      )}
    </div>
  );
}

export default function InTheirWords({
  heading,
  eyebrow = "in their words",
  compact = false,
  id,
}: {
  heading: ReactNode;
  /** small caps line above the heading; pass "" to hide it */
  eyebrow?: string;
  /** smaller heading and quote on desktop (home page); phone sizes unchanged */
  compact?: boolean;
  /** anchor so other sections can link here */
  id?: string;
}) {
  return (
    /* dark band so it reads as its own moment */
    <section id={id} style={{ position: "relative", background: "#2D2521", padding: "110px 32px 120px", overflow: "hidden", scrollMarginTop: 72 }}>
      {/* oversized quote mark as texture */}
      <span aria-hidden="true" style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-cormorant)", fontSize: 420, lineHeight: 1, color: "rgba(195,158,136,0.08)", pointerEvents: "none", userSelect: "none" }}>&ldquo;</span>
      <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          {eyebrow && (
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C5AA9B", textAlign: "center", marginBottom: 18 }}>{eyebrow}</p>
          )}
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: compact ? "clamp(30px,3.2vw,38px)" : "clamp(30px,4.5vw,48px)", color: "#F1F0E5", textAlign: "center", fontWeight: 700, marginBottom: 40 }}>
            {heading}
          </h2>
        </FadeIn>
        {/* one featured line, set big */}
        <FadeIn delay={0.1}>
          <figure style={{ maxWidth: 760, margin: "0 auto 64px", textAlign: "center" }}>
            <blockquote style={{ margin: 0, fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: compact ? "clamp(26px,2.6vw,32px)" : "clamp(26px,3.6vw,40px)", lineHeight: 1.3, color: "#E8D5BC", textWrap: "balance" }}>
              &ldquo;I learned to see the light I see in others in myself too.&rdquo;
            </blockquote>
            <figcaption style={{ marginTop: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C5AA9B" }}>
              <span style={{ width: 32, height: "0.5px", background: "#C5AA9B" }} />Jess<span style={{ width: 32, height: "0.5px", background: "#C5AA9B" }} />
            </figcaption>
          </figure>
        </FadeIn>
        <FadeIn delay={0.1}>
          <TestimonialVideo />
        </FadeIn>
      </div>
    </section>
  );
}
