"use client";

import FadeIn from "@/components/FadeIn";

export type Quote = { text: string; name: string };

export const quotes: Quote[] = [
  {
    text: "I'm so grateful for the community that was created from the group and it helped me not feel so alone. thank you for creating a space where I felt safe enough to let go of the thoughts and chains that were holding me back.",
    name: "M'Lyn",
  },
  {
    text: "I felt like I would do the work alone, and when I went out into the real world it would all fly out the window. but being in community with all these other women and actually practicing expressing my truth and vulnerability has helped me integrate this into my daily life.",
    name: "Alani",
  },
  {
    text: "in just 6 days I learned the importance of having community who can share openly and vulnerably — and I learned to see the light I see in others in myself too.",
    name: "Jess",
  },
  {
    text: "Ashley is an amazing healer. I've had several Reiki sessions before with other healers but she's different. I felt tingles throughout my body and she shared insight that really resonated with me. she is truly gifted and a beautiful soul.",
    name: "Sarah",
  },
  {
    text: "I saw Ashley for Reiki and sound bath. I had terrible anxiety and was in so much pain physically and mentally. it helped me so much. she has a calming, nurturing energy.",
    name: "Anna",
  },
  {
    text: "thank you so much for this session Shannon, and connecting me with incredible women who carry so much strength, vulnerability, and courage.",
    name: "Amber",
  },
];

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
    <div style={{ maxWidth, margin }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          alignItems: "start",
        }}
        className="testimonial-grid"
      >
        {items.map((q, i) => (
          <FadeIn key={q.name + i} delay={0.05 * i}>
            <blockquote
              style={{
                margin: 0,
                borderLeft: "2px solid var(--color-accent)",
                padding: "4px 0 4px 20px",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontStyle: "italic",
                  fontSize: 17,
                  lineHeight: 1.5,
                  color: "var(--color-text-headline)",
                  margin: "0 0 12px",
                }}
              >
                &ldquo;{q.text}&rdquo;
              </p>
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
          </FadeIn>
        ))}
      </div>
      <style>{`
        @media (max-width: 900px) { .testimonial-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 600px) { .testimonial-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
