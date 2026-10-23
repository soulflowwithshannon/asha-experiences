"use client";

import FadeIn from "@/components/FadeIn";

/**
 * The three steps between "I think I want this" and "I'm there".
 * Every claim here is one the retreat pages already make: checkout is pay in
 * full and non-refundable, airport transfers are included, and there are two
 * of us and no assistants.
 */
export default function HowItWorks({
  arrival = "from the airport",
  background = "var(--color-bg-page)",
}: {
  /** e.g. "from Nairobi" — the transfer each page already lists as included. */
  arrival?: string;
  background?: string;
}) {
  const steps = [
    {
      title: "reserve your spot",
      body: "pick your room and pay through our checkout. all payments are non-refundable, so take whatever time you need before this part.",
    },
    {
      title: "you hear from us",
      body: "no agency, no assistant. Ashley and Shannon answer the emails, and we're in touch with you well before you fly.",
    },
    {
      title: "we meet you there",
      body: `group transport ${arrival} is included, and the two of us are on the ground with you for the whole week.`,
    },
  ];

  return (
    <section style={{ background, borderTop: "0.5px solid var(--color-border)", padding: "80px 32px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
            <span style={{ width: 36, height: 1, background: "var(--color-accent)", flexShrink: 0 }} />
            <p className="eyebrow-accent" style={{ margin: 0 }}>how it works</p>
          </div>
          <h2
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(28px,4vw,38px)",
              color: "var(--color-text-headline)",
              fontWeight: 700,
              lineHeight: 1.15,
              marginBottom: 48,
            }}
          >
            what happens{" "}
            <em style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 500, color: "var(--color-accent)" }}>
              after you say yes
            </em>
          </h2>
        </FadeIn>

        {steps.map((step, i) => {
          const last = i === steps.length - 1;
          return (
            <FadeIn key={step.title} delay={i * 0.1}>
              <div style={{ display: "flex", gap: 24, alignItems: "stretch" }}>
                {/* numeral + connector */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: "50%",
                      background: "var(--color-accent)",
                      color: "#FFFCF5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "var(--font-cormorant)",
                      fontSize: 24,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  {!last && <div style={{ flex: 1, width: 1, background: "var(--color-accent)", opacity: 0.45, marginTop: 8 }} />}
                </div>

                <div style={{ paddingTop: 6, paddingBottom: last ? 0 : 36 }}>
                  <h3
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: "clamp(19px,2.4vw,23px)",
                      color: "var(--color-text-headline)",
                      fontWeight: 700,
                      marginBottom: 8,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 15,
                      lineHeight: 1.8,
                      color: "var(--color-text-body)",
                      maxWidth: 480,
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
