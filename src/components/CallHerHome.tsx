"use client";

import Image from "next/image";
import { ReactNode } from "react";
import FadeIn from "@/components/FadeIn";

export interface HomeStep {
  /** Photo for this step. */
  img: string;
  /** Focal point, when the subject is not in the middle of the frame. */
  imgPosition?: string;
  title: string;
  body: ReactNode;
  /** The concrete practices behind the promise, e.g. "sunrise yoga · breathwork". */
  practices: string;
}

/**
 * The "how do we call her home" section on the retreat pages.
 *
 * Alternating editorial rows rather than a grid of cards: each step gets a
 * large photo on one side and its copy on the other, flipping every row, so
 * the eye zigzags down the page instead of scanning six identical boxes.
 */
export default function CallHerHome({
  steps,
  intro,
  headline = (
    <>
      how do we<span className="chh-break"> </span>call her home?
    </>
  ),
}: {
  steps: HomeStep[];
  intro?: ReactNode;
  headline?: ReactNode;
}) {
  return (
    <section style={{ background: "var(--color-bg-surface)", padding: "80px 32px 88px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <FadeIn>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(28px,4vw,40px)",
              fontWeight: 700,
              color: "var(--color-text-headline)",
              textAlign: "center",
              marginBottom: intro ? 24 : 72,
              textWrap: "balance",
            }}
          >
            {headline}
          </h2>
          {intro && (
            <p
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 16,
                color: "var(--color-text-body)",
                textAlign: "center",
                maxWidth: 620,
                margin: "0 auto 72px",
                lineHeight: 1.8,
                textWrap: "balance",
              }}
            >
              {intro}
            </p>
          )}
        </FadeIn>

        {steps.map((step, i) => {
          const flip = i % 2 === 1;
          return (
            <FadeIn key={step.title} delay={0.05}>
              <div className={flip ? "chh-row chh-flip" : "chh-row"} style={{ marginBottom: i === steps.length - 1 ? 0 : 72 }}>
                <div
                  className="chh-photo"
                  style={{
                    position: "relative",
                    aspectRatio: "4/3",
                    borderRadius: 2,
                    overflow: "hidden",
                    background: "var(--color-bg-card)",
                    order: flip ? 2 : 1,
                  }}
                >
                  <Image
                    src={step.img}
                    alt={step.title}
                    fill
                    sizes="(max-width: 860px) 100vw, 54vw"
                    style={{ objectFit: "cover", objectPosition: step.imgPosition ?? "center" }}
                  />
                </div>

                <div className="chh-text" style={{ order: flip ? 1 : 2 }}>
                  <span
                    aria-hidden="true"
                    style={{
                      fontFamily: "var(--font-cormorant)",
                      fontSize: 15,
                      letterSpacing: "0.22em",
                      color: "var(--color-accent)",
                      display: "block",
                      marginBottom: 14,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: "clamp(21px,2.6vw,27px)",
                      fontWeight: 700,
                      color: "var(--color-text-headline)",
                      lineHeight: 1.25,
                      marginBottom: 16,
                      textWrap: "balance",
                    }}
                  >
                    {step.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 15,
                      color: "var(--color-text-body)",
                      lineHeight: 1.85,
                      marginBottom: 22,
                    }}
                  >
                    {step.body}
                  </p>

                  {/* the promise above is abstract; this is what it actually looks like */}
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 12.5,
                      letterSpacing: "0.07em",
                      textTransform: "lowercase",
                      color: "var(--color-accent)",
                      borderTop: "0.5px solid var(--color-border)",
                      paddingTop: 16,
                      margin: 0,
                    }}
                  >
                    {step.practices}
                  </p>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>

      <style>{`
        /* lets the headline break onto two lines on a narrow screen */
        .chh-break { display: inline; }
        @media (max-width: 640px) { .chh-break { display: block; } }
        .chh-row {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 56px;
          align-items: center;
        }
        .chh-row.chh-flip { grid-template-columns: 1fr 1.15fr; }
        @media (max-width: 860px) {
          /* stacked, photo always first — the number and copy read under it */
          .chh-row { grid-template-columns: 1fr !important; gap: 24px !important; margin-bottom: 56px !important; }
          .chh-photo { order: 1 !important; }
          .chh-text { order: 2 !important; }
        }
      `}</style>
    </section>
  );
}
