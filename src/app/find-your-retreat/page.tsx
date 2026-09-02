"use client";

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
                fontFamily: "var(--font-fraunces)",
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
        </div>
      </section>

      {/* Quiz */}
      <section style={{ padding: "0 24px 100px" }}>
        <QuizWidget />
      </section>
    </main>
  );
}
