"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";

/* Retreat pages: replaces the old "talk to us before you book" blocks.
   Points her at what's already on the page, and at the /contact form (not the
   call button above it) for anything left. */
export default function StillDeciding({
  retreat,
  weekLine = "read the day-by-day above",
  weekHref,
  storiesHref,
  background = "var(--color-bg-page)",
  padding = "56px 32px",
}: {
  /** "Kenya" / "Morocco": prefills the contact message. */
  retreat: string;
  /** Morocco has a single day's timetable, not a day-by-day. */
  weekLine?: string;
  /** in-page anchors: when set, the week line and the testimonials line link there */
  weekHref?: string;
  storiesHref?: string;
  background?: string;
  padding?: string;
}) {
  const link: React.CSSProperties = { color: "var(--color-accent)", fontWeight: 600, textDecoration: "underline", textDecorationThickness: "0.5px", textUnderlineOffset: 3, whiteSpace: "nowrap" };
  const r = encodeURIComponent(retreat);
  const body: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans)",
    fontSize: 15,
    color: "var(--color-text-body)",
    lineHeight: 1.8,
    maxWidth: 520,
    margin: "0 auto",
    textWrap: "pretty",
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
            marginBottom: 2,
          }}>
            still deciding?
          </h2>
          {/* sits right under the heading, then a gap before the advice */}
          <p style={{ ...body, marginBottom: 20 }}>
            that&apos;s fair, it&apos;s a big trip.
          </p>
        </FadeIn>
        <FadeIn delay={0.1}>
          {/* short paragraphs, links kept on one line so they never split */}
          <p style={{ ...body, marginBottom: 16 }}>
            here&apos;s what usually helps:{" "}
            {weekHref ? <a href={weekHref} style={link}>{weekLine}</a> : weekLine},{" "}
            {storiesHref ? <a href={storiesHref} style={link}>hear what the women who came said</a> : "read what the women who came said"}, and check the questions below.
          </p>
          <p style={{ ...body, marginBottom: 16 }}>
            if you&apos;d like to hear it from someone who&apos;s been,<br className="sd-break" />{" "}
            <Link href={`/contact?about=past-guest&retreat=${r}#send`} style={link}>
              we&apos;ll connect you with a past guest
            </Link>.
          </p>
          <p style={body}>
            if there&apos;s one thing we haven&apos;t answered,<br />
            <Link href={`/contact?retreat=${r}#send`} style={link}>
              ask us here
            </Link>{" "}
            and one of us will write back <span style={{ whiteSpace: "nowrap" }}>within a day.</span>
          </p>
          <style>{`.sd-break{display:none}@media(max-width:600px){.sd-break{display:inline}}`}</style>
        </FadeIn>
      </div>
    </section>
  );
}
