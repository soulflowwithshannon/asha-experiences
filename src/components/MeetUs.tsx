"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const CALENDAR_URL = "https://calendar.app.google/Yt1VUQGEuhhEipt59";
const INSTAGRAM_URL = "https://instagram.com/asha_experiences";

const hosts = [
  { name: "Ashley", src: "/images/Ashley (new).JPG", alt: "Ashley Scully" },
  { name: "Shannon", src: "/images/Shannon (new).JPG", alt: "Shannon Tomascak" },
];

export default function MeetUs({
  headline = "let's talk it through first",
  body = "most women talk to us before they book. no pressure and no pitch — just an honest conversation about whether this is your year.",
  spaceAbove = 0,
}: {
  headline?: string;
  body?: string;
  spaceAbove?: number;
}) {
  return (
    <section style={{ background: "var(--color-bg-page)", padding: `${spaceAbove}px 32px 80px` }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p className="eyebrow-accent" style={{ marginBottom: 20 }}>before you book</p>
        </FadeIn>

        <FadeIn delay={0.05}>
          <p style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "clamp(24px,3vw,30px)",
            color: "var(--color-text-headline)",
            lineHeight: 1.4,
            marginBottom: 32,
          }}>
            {headline}
          </p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ display: "flex", gap: 20, justifyContent: "center", marginBottom: 28 }}>
            {hosts.map((h) => (
              <div key={h.name} style={{ textAlign: "center" }}>
                <div style={{
                  position: "relative",
                  width: 120,
                  aspectRatio: "4/5",
                  borderRadius: 3,
                  overflow: "hidden",
                  marginBottom: 10,
                }}>
                  <Image
                    src={h.src}
                    alt={h.alt}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    sizes="120px"
                  />
                </div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-headline)" }}>
                  {h.name}
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 14,
            color: "var(--color-text-body)",
            lineHeight: 1.8,
            maxWidth: 440,
            margin: "0 auto 28px",
          }}>
            {body}
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a
              href={CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "12px 26px",
                background: "var(--color-accent)",
                border: "1px solid var(--color-accent)",
                color: "#FFFCF5",
                fontFamily: "var(--font-dm-sans)",
                fontSize: 12,
                letterSpacing: "0.04em",
                textDecoration: "none",
                transition: "opacity 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              book a call with us →
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "12px 26px",
                background: "transparent",
                border: "0.5px solid var(--color-accent)",
                color: "var(--color-accent)",
                fontFamily: "var(--font-dm-sans)",
                fontSize: 12,
                letterSpacing: "0.04em",
                textDecoration: "none",
                transition: "background 0.2s ease, transform 0.2s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "color-mix(in srgb, var(--color-accent) 10%, transparent)"; e.currentTarget.style.transform = "scale(1.02)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              message us on Instagram →
            </a>
          </div>
        </FadeIn>

        <FadeIn delay={0.25}>
          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 11,
            fontStyle: "italic",
            color: "var(--color-text-body)",
            marginTop: 16,
          }}>
            we both manage @asha_experiences, so you&apos;ll always be talking to Ashley or Shannon — never an assistant.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
