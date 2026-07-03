import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import FadeIn from "./FadeIn";

const guides: { name: string; role: string; handle: string; bio: ReactNode[]; photo: string; delay: number }[] = [
  {
    name: "Shannon Tomascak",
    role: "somatics & movement",
    handle: "@soulflowwithshannon",
    bio: [
      <><strong>Shannon</strong> is a women&apos;s guide and circle facilitator, working at the intersection of somatic healing and subconscious rewiring.</>,
      <>her path here wasn&apos;t linear — <em>more a spiral of unraveling, questioning, and slowly remembering who she is deep down.</em></>,
      "now she holds that same space for women to come back to themselves, with softness, strength, and soul.",
    ],
    photo: "/images/Shannon (new).JPG",
    delay: 0,
  },
  {
    name: "Ashley Scully",
    role: "healing & energetics",
    handle: "@ashleyscully_",
    bio: [
      <><strong>Ashley</strong> is a dj, sound healer, reiki practitioner, and spiritual life coach.</>,
      <>she works in frequency and energy — <em>sound baths, reiki, intuitive guidance</em> — helping the body do what it&apos;s been holding off on: <strong>exhale.</strong></>,
      "her sessions hold both stillness and joy at once, giving women room to feel what they've been outrunning, and land somewhere steadier.",
    ],
    photo: "/images/Ashley (new).JPG",
    delay: 0.15,
  },
];

export default function GuidesCompact({ darkQuote = false }: { darkQuote?: boolean }) {
  return (
    <section style={{ background: "var(--color-bg-surface)", paddingBottom: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 32px 32px" }}>
        <FadeIn>
          <h2
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(26px, 4vw, 32px)",
              color: "var(--color-text-headline)",
              textAlign: "center",
              fontWeight: 700,
              marginBottom: 64,
            }}
          >
            who&apos;s holding the space
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="guides-grid">
          {guides.map((guide) => (
            <FadeIn key={guide.name} delay={guide.delay}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    maxWidth: 340,
                    aspectRatio: "4/5",
                    marginBottom: 24,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={guide.photo}
                    alt={guide.name}
                    fill
                    style={{ objectFit: "cover", objectPosition: "top" }}
                    sizes="(max-width: 640px) 100vw, 340px"
                  />
                </div>

                <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: 22, color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 6 }}>
                  {guide.name}
                </h3>
                <p className="eyebrow" style={{ marginBottom: 6 }}>{guide.role}</p>
                <a
                  href={`https://instagram.com/${guide.handle.replace("@", "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--color-accent)", marginBottom: 16, display: "block", textDecoration: "none" }}
                >
                  {guide.handle}
                </a>
                <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-text-body)", lineHeight: 1.7, maxWidth: 280, textAlign: "center" }}>
                  {guide.bio.map((para, i) => (
                    <p key={i} style={{ marginBottom: i < guide.bio.length - 1 ? 12 : 0 }}>{para}</p>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <FadeIn delay={0.2}>
        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link
            href="/about"
            className="guides-cta-btn"
            style={{ display: "inline-block", padding: "12px 32px", border: "1px solid var(--color-accent)", background: "var(--color-accent)", color: "#2D2521", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textDecoration: "none", fontWeight: 700, transition: "background 0.3s ease, transform 0.3s ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "#B8864A"; e.currentTarget.style.transform = "scale(1.02)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "var(--color-accent)"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            learn more about our story and why we created ASHA →
          </Link>
        </div>
      </FadeIn>

      <style>{`
        @media (max-width: 640px) {
          .guides-grid { grid-template-columns: 1fr !important; }
          .guides-cta-btn { max-width: 300px; text-align: center; padding: 12px 20px !important; }
        }
      `}</style>
    </section>
  );
}
