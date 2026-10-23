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
  background = "var(--color-bg-surface)",
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
    <section style={{ background, padding: "80px 32px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <p className="eyebrow-accent" style={{ marginBottom: 14, textAlign: "center" }}>how it works</p>
          <h2
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(26px,3.6vw,32px)",
              color: "var(--color-text-headline)",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: 56,
            }}
          >
            what happens after you say yes
          </h2>
        </FadeIn>

        <div className="how-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {steps.map((step, i) => (
            <FadeIn key={step.title} delay={i * 0.1}>
              <div className="how-step" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                <div
                  className="how-numeral"
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
                    marginBottom: 20,
                  }}
                >
                  {i + 1}
                </div>
                <div className="how-copy">
                  <h3
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: 19,
                      color: "var(--color-text-headline)",
                      fontWeight: 700,
                      marginBottom: 10,
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 14,
                      lineHeight: 1.8,
                      color: "var(--color-text-body)",
                      maxWidth: 260,
                      margin: "0 auto",
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .how-grid { grid-template-columns: 1fr !important; gap: 28px !important; max-width: 420px; margin: 0 auto; }
          .how-step { flex-direction: row !important; align-items: flex-start !important; text-align: left !important; gap: 18px; }
          .how-numeral { margin-bottom: 0 !important; width: 44px !important; height: 44px !important; font-size: 20px !important; }
          .how-copy p { margin: 0 !important; max-width: none !important; }
        }
      `}</style>
    </section>
  );
}
