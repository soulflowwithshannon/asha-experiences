import Link from "next/link";

/* Three placements, one component:
   band   — full-width strip on the journal index
   inline — dropped mid-article via the __QUIZ_CTA__ token
   end    — closes every blog post, above the retreat links   */
export default function QuizCTA({
  variant = "end",
  heading = "not sure where you’re at?",
  body = "five questions and we’ll help you find what you need right now based on your archetype",
}: {
  variant?: "band" | "inline" | "end";
  heading?: string;
  body?: string;
}) {
  const band = variant === "band";

  const card = (
    <div
      style={{
        background: band ? "var(--color-bg-surface)" : "var(--color-bg-surface)",
        border: "0.5px solid var(--color-bg-card)",
        borderRadius: 6,
        padding: band ? "36px 32px" : "28px 26px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: 10,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "var(--color-accent)",
          marginBottom: 14,
        }}
      >
        the quiz
      </p>
      <p
        style={{
          fontFamily: "var(--font-fraunces)",
          fontWeight: 700,
          fontSize: band ? "clamp(22px,3.4vw,28px)" : "clamp(19px,2.6vw,23px)",
          lineHeight: 1.25,
          color: "var(--color-text-headline)",
          marginBottom: 12,
          textWrap: "balance",
        }}
      >
        {heading}
      </p>
      <p
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: 14,
          lineHeight: 1.7,
          color: "var(--color-text-body)",
          maxWidth: 440,
          margin: "0 auto 22px",
          textWrap: "balance",
        }}
      >
        {body}
      </p>
      <Link
        href="/find-your-retreat"
        style={{
          display: "inline-block",
          padding: "13px 28px",
          background: "var(--color-accent)",
          border: "1px solid var(--color-accent)",
          color: "#FFFCF5",
          fontFamily: "var(--font-dm-sans)",
          fontSize: 12,
          letterSpacing: "0.04em",
          textDecoration: "none",
        }}
      >
        find your archetype →
      </Link>
    </div>
  );

  if (band) {
    return (
      <section style={{ maxWidth: 1200, margin: "48px auto 0", padding: "0 48px" }}>
        {card}
      </section>
    );
  }

  if (variant === "inline") {
    return <div style={{ maxWidth: 720, margin: "40px auto", padding: "0 32px" }}>{card}</div>;
  }

  return <div style={{ maxWidth: 720, margin: "8px auto 40px", padding: "0 32px" }}>{card}</div>;
}
