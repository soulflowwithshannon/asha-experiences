"use client";

import Image from "next/image";
import FadeIn from "@/components/FadeIn";
import QuizWidget from "@/components/QuizWidget";

export default function FindYourRetreatPage() {
  return (
    <main style={{ background: "var(--color-bg-page)", minHeight: "100vh", paddingTop: 72 }}>
      {/* Masthead */}
      <section style={{ padding: "64px 24px 40px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <FadeIn delay={0.05}>
            <h1
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 700,
                fontSize: "clamp(30px,6.5vw,52px)",
                lineHeight: 1.05,
                color: "var(--color-text-headline)",
                marginBottom: 0,
                textWrap: "balance",
              }}
            >
              find your ASHA experience archetype
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="quiz-strip" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 36 }}>
              {[
                { src: "/images/group arm raise.jpg", alt: "Women with hands raised on retreat", pos: "center 36%" },
                { src: "/images/kenya-yoga-zebras.JPG", alt: "Yoga on the plains in Kenya", pos: "center" },
                { src: "/images/Morocco lounge.jpeg", alt: "A rooftop at dusk in Morocco", pos: "center" },
              ].map((shot) => (
                <div key={shot.src} style={{ position: "relative", aspectRatio: "1/1", borderRadius: 2, overflow: "hidden", background: "var(--color-bg-card)" }}>
                  <Image src={shot.src} alt={shot.alt} fill sizes="(max-width: 640px) 33vw, 200px" style={{ objectFit: "cover", objectPosition: shot.pos }} />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Quiz */}
      <section style={{ padding: "0 24px 100px" }}>
        <QuizWidget />
      </section>
    </main>
  );
}
