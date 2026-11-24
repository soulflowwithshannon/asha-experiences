"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";

/* Retreat pages: replaces the old "talk to us before you book" blocks.
   Points her at what's already on the page, and at /contact for anything left. */
export default function StillDeciding({
  background = "var(--color-bg-page)",
  padding = "56px 32px",
}: {
  background?: string;
  padding?: string;
}) {
  const body: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans)",
    fontSize: 15,
    color: "var(--color-text-body)",
    lineHeight: 1.8,
    maxWidth: 520,
    margin: "0 auto",
  };
  return (
    <section style={{ background, padding }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <h2 style={{
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: "clamp(26px,3.4vw,32px)",
            color: "var(--color-text-headline)",
            lineHeight: 1.2,
            marginBottom: 20,
          }}>
            still deciding?
          </h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{ ...body, marginBottom: 16 }}>
            that&apos;s fair, it&apos;s a big trip. here&apos;s what usually helps: read the day-by-day above, read what the women who came said, and check the questions below. if you&apos;d like to hear it from someone who&apos;s been, we&apos;ll connect you with a past guest.
          </p>
          <p style={body}>
            if there&apos;s one specific thing we haven&apos;t answered,{" "}
            <Link
              href="/contact"
              style={{ color: "var(--color-accent)", fontWeight: 600, textDecoration: "underline", textDecorationThickness: "0.5px", textUnderlineOffset: 3 }}
            >
              ask us here
            </Link>{" "}
            and one of us will write back within a day.
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
