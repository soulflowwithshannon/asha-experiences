"use client";

import FadeIn from "@/components/FadeIn";

export type Quote = { text: string; name: string; emphasis?: string };

export const quotes: Quote[] = [
  {
    text: "I'm so grateful for the community that was created from the group and it helped me not feel so alone. thank you for creating a space where I felt safe enough to let go of the thoughts and chains that were holding me back.",
    emphasis: "it helped me not feel so alone",
    name: "M'Lyn",
  },
  {
    text: "I felt like I would do the work alone, and when I went out into the real world it would all fly out the window. but being in community with all these other women has helped me integrate this into my daily life.",
    emphasis: "helped me integrate this into my daily life",
    name: "Alani",
  },
  {
    text: "in just 6 days I learned the importance of having community who can share openly and vulnerably — and I learned to see the light I see in others in myself too.",
    emphasis: "I learned to see the light I see in others in myself too",
    name: "Jess",
  },
  {
    text: "Ashley is an amazing healer. I've had several Reiki sessions before with other healers but she's different. she shared insight that really resonated with me. she is truly gifted and a beautiful soul.",
    emphasis: "she is truly gifted and a beautiful soul",
    name: "Sarah",
  },
  {
    text: "I saw Ashley for Reiki and sound bath. I had terrible anxiety and was in so much pain physically and mentally. it helped me so much. she has a calming, nurturing energy.",
    emphasis: "she has a calming, nurturing energy",
    name: "Anna",
  },
  {
    text: "thank you so much for this session Shannon, and connecting me with incredible women who carry so much strength, vulnerability, and courage.",
    emphasis: "strength, vulnerability, and courage",
    name: "Amber",
  },
];

function Stars() {
  return (
    <p
      aria-label="five stars"
      style={{
        fontSize: 11,
        letterSpacing: "0.18em",
        color: "var(--color-accent)",
        margin: "0 0 12px",
        lineHeight: 1,
      }}
    >
      <span aria-hidden="true">★★★★★</span>
    </p>
  );
}

function Body({ text, emphasis }: Quote) {
  const style: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans)",
    fontSize: 14,
    lineHeight: 1.65,
    color: "var(--color-text-body)",
    margin: "0 0 16px",
    flex: 1,
  };
  if (!emphasis || !text.includes(emphasis)) {
    return <p style={style}>&ldquo;{text}&rdquo;</p>;
  }
  const [before, after] = text.split(emphasis);
  return (
    <p style={style}>
      &ldquo;{before}
      <strong style={{ color: "var(--color-text-headline)", fontWeight: 500 }}>{emphasis}</strong>
      {after}&rdquo;
    </p>
  );
}

export default function Testimonials({
  items = quotes,
  maxWidth = 1100,
  margin = "0 auto 48px",
}: {
  items?: Quote[];
  maxWidth?: number;
  margin?: string;
}) {
  return (
    <FadeIn>
      <div style={{ maxWidth, margin }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            alignItems: "stretch",
          }}
          className="testimonial-grid"
        >
          {items.map((q, i) => (
            <blockquote
              key={q.name + i}
              style={{
                margin: 0,
                height: "100%",
                boxSizing: "border-box",
                background: "var(--color-bg-surface)",
                border: "0.5px solid var(--color-border)",
                borderRadius: 4,
                padding: "22px 22px 20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Stars />
              <Body {...q} />
              <footer
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 10,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                }}
              >
                {q.name}
              </footer>
            </blockquote>
          ))}
        </div>
        <style>{`
          @media (max-width: 900px) { .testimonial-grid { grid-template-columns: 1fr 1fr !important; } }
          @media (max-width: 600px) { .testimonial-grid { grid-template-columns: 1fr !important; } }
        `}</style>
      </div>
    </FadeIn>
  );
}
