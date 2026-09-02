"use client";

import FadeIn from "@/components/FadeIn";
import QuizWidget from "@/components/QuizWidget";

export default function FindYourRetreatPage() {
  return (
    <main style={{ background: "var(--color-bg-page)", minHeight: "100vh", paddingTop: 72 }}>
      {/* Masthead */}
      <section style={{ padding: "64px 24px 40px" }}>
        <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <p className="eyebrow-accent" style={{ marginBottom: 20 }}>five questions</p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h1
              style={{
                fontFamily: "var(--font-cormorant)",
                fontWeight: 300,
                fontSize: "clamp(40px,10vw,72px)",
                lineHeight: 1.02,
                color: "var(--color-text-headline)",
                marginBottom: 20,
              }}
            >
              find your retreat
            </h1>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 15,
                lineHeight: 1.8,
                color: "var(--color-text-body)",
                maxWidth: 420,
                margin: "0 auto",
              }}
            >
              there are no wrong answers. just choose whichever response pulls at you most — even if you relate to more than one.
            </p>
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
