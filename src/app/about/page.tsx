"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import FadeIn from "@/components/FadeIn";
import { SplitHeadline } from "@/components/AnimatedText";
import VideoPair from "@/components/VideoPair";

/* The nine beats of the shared story, read one at a time rather than scrolled. */
const chapters = [
  { photo: "/images/little girls.png", alt: "Childhood", text: "once, we were little girls who played outside and believed in magic." },
  { photo: "/images/makeup.png", alt: "Teenage years", text: "then the world taught us to tone it down.\ntoughen up.\nfit in.\n\nso we did." },
  { photo: "/images/partying.png", alt: "Early twenties", text: "we chased love in all the wrong places.\npartied to escape our pain.\nlaughed loudly while quietly unraveling." },
  { photo: "/images/degrees.png", alt: "Degrees", text: "we did everything society told us to do.\nwe even got masters degrees.\n\nbut inside, we felt lost and unworthy." },
  { photo: "/images/floral.png", alt: "The weight of it", text: "we felt the heartbreak.\nthe shame.\nthe constant need to prove and please.\n\nwe learned to wear masks before we even knew our true face." },
  { photo: "/images/travel.png", alt: "Breaking open", text: "eventually, the pretending got too heavy.\n\nand the pain cracked us open." },
  { photo: "/images/france.png", alt: "Choosing the work", text: "we chose the path of healing.\n\nwe met our shadows, our shame,\nand chose love.\n\nover and over again." },
  { photo: "/images/healing 1.png", alt: "The real work", text: "that's when the real work began.\n\nbreath by breath.\nchoice by choice.\n\nwe came home to ourselves." },
  { photo: "/images/healing 2.png", alt: "Now", text: "we became the women we once needed.\n\nand now, we guide others home too." },
];

const guides = [
  {
    name: "Ashley",
    photo: "/images/3.png",
    role: "reiki healer · sound bath dj · life coach · retreat host",
    handle: "@ashleyscully_",
    href: "https://instagram.com/ashleyscully_",
    lead: [
      "ashley's journey didn't start in peace. it started in chaos.",
      "in 2020, she was coming out of an abusive relationship — completely disconnected from herself, stuck in the same painful patterns, wanting to heal not just from him, but from her.",
      "that's when she found reiki. her first session cracked her open.",
    ],
    rest: [
      "she could feel energy move through her body for the first time — like remembering who she was. then came sound healing. and the first time she heard a singing bowl, her anxious brain finally went quiet.",
      "it became the medicine she didn't know she needed.",
      "today she leads sound baths at equinox and hush, holds reiki sessions, coaches women through heartbreak and rebuilding, and hosts retreats that take women across the world and back to themselves.",
      "she's also a total animal lover, dog mom, future animal sanctuary dreamer, writer of poetry, discoverer of house music, and the kind of person who ends up eating brooklyn pizza at 3am with sparkles on her face after a rave.",
      "the girl who once felt broken now helps others rise. with grace, wisdom, and sound.",
    ],
  },
  {
    name: "Shannon",
    photo: "/images/4.png",
    role: "somatic guide · women's circle facilitator · retreat host",
    handle: "@soulflowwithshannon",
    href: "https://instagram.com/soulflowwithshannon",
    lead: [
      "shannon is based in bali — which tells you something about how she moves through the world. toward beauty. toward depth. toward the places that make ordinary life feel like a memory.",
      "in 2020, everything cracked open. drinking too much. depressed. anxious. carrying shame she'd been lugging around for years and pretending didn't exist.",
      "she finally got help.",
    ],
    rest: [
      "and that decision — that one moment of choosing herself over the performance — became the foundation of everything she does now.",
      "her background is in psychology, and it shows — not in a clinical way, but in the way she can hold a room full of women falling apart and make every single one of them feel safe.",
      "through somatic work, yoga, breathwork, and women's circles, she guides women back to the version of themselves that existed before the world told them to be smaller.",
      "when she's not leading retreats, you'll find her upside down on an aerial hoop, talking to her cat, or convincing someone to move to bali.",
    ],
  },
];

const beliefs = [
  {
    statement: "healing doesn't have to be heavy.",
    body: "it can look like dancing until midnight, laughing until your stomach hurts, and waking up to coffee on a veranda while the sun comes up over the savannah.",
  },
  {
    statement: "the right environment changes everything.",
    body: "you can do all the work at home. but something about being somewhere extraordinary — truly outside your ordinary life — cracks open what nothing else could reach.",
  },
  {
    statement: "you already know what you need.",
    body: "you don't need to be fixed. you don't need someone to tell you who to be. you just need somewhere safe enough to remember.",
  },
];

function Guide({ guide, flip }: { guide: (typeof guides)[0]; flip: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="guide-row" style={{ display: "grid", gridTemplateColumns: flip ? "1fr 1.05fr" : "1.05fr 1fr", alignItems: "center", gap: 0 }}>
      {/* portrait, bleeding to the page edge rather than sitting in a frame */}
      <div
        className="guide-photo"
        style={{
          position: "relative",
          minHeight: 560,
          order: flip ? 2 : 1,
          background: "var(--color-bg-page)",
        }}
      >
        <Image src={guide.photo} alt={guide.name} fill style={{ objectFit: "contain", objectPosition: "center" }} sizes="(max-width: 860px) 100vw, 50vw" />
      </div>

      <div
        className="guide-text"
        style={{
          order: flip ? 1 : 2,
          padding: flip ? "80px 72px 80px 56px" : "80px 56px 80px 72px",
        }}
      >
        <FadeIn>
          <h3
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(44px,6vw,76px)",
              lineHeight: 0.95,
              color: "var(--color-text-headline)",
              fontWeight: 700,
              marginBottom: 18,
            }}
          >
            {guide.name}
          </h3>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 28 }}>
            {guide.role}
          </p>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 440 }}>
            {guide.lead.map((p) => (
              <p key={p} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.8, color: "var(--color-text-body)" }}>
                {p}
              </p>
            ))}

            {open &&
              guide.rest.map((p) => (
                <motion.p
                  key={p}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.8, color: "var(--color-text-body)" }}
                >
                  {p}
                </motion.p>
              ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 28, flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              style={{
                background: "none",
                border: "none",
                padding: "10px 0",
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans)",
                fontSize: 13,
                color: "var(--color-text-headline)",
                borderBottom: "1px solid var(--color-accent)",
                minHeight: 44,
              }}
            >
              {open ? "close" : `read ${guide.name === "Ashley" ? "her" : "her"} whole story`}
            </button>
            <a
              href={guide.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--color-accent)", textDecoration: "none" }}
            >
              {guide.handle}
            </a>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const [chapter, setChapter] = useState(0);
  const last = chapters.length - 1;

  const go = useCallback(
    (delta: number) => setChapter((c) => Math.min(last, Math.max(0, c + delta))),
    [last]
  );

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const current = chapters[chapter];

  return (
    <main>
      {/* SECTION 1 — HERO */}
      <section className="about-hero" style={{ position: "relative", minHeight: "56vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#2D2521", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/images/shannonandashley.jpg" alt="Shannon and Ashley" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="100vw" priority />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(45,37,33,0.3)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px", maxWidth: 700, margin: "0 auto" }}>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,5vw,48px)", color: "#F1F0E5", fontWeight: 700, marginBottom: 16, lineHeight: 1.15 }}
          >
            we became the women<br />we once needed.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "#BAAB92", marginTop: 16, lineHeight: 1.7 }}
          >
            <strong>and now we guide others home too.</strong>
          </motion.p>
        </div>
      </section>

      {/* SECTION 1b — WHY WE CREATED ASHA */}
      <VideoPair
        headline="why we created ASHA"
        highlightHeadline
        labelTone="brown"
        orientation="vertical"
        clips={[
          { file: "Ashley ASHA.MOV", label: "ashley" },
          { file: "Shannon ASHA.MOV", label: "shannon" },
        ]}
      />

      {/* SECTION 2 — THE STORY, ONE CHAPTER AT A TIME */}
      <section style={{ background: "#2D2521", color: "#F1F0E5", padding: "88px 0 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 48px 56px" }} className="story-intro">
          <FadeIn>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: "#C39E88", marginBottom: 22 }}>
              how we got here
            </p>
            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(24px,3.4vw,38px)", lineHeight: 1.18, color: "#F1F0E5", maxWidth: 760 }}>
              we met in a women&apos;s circle — two strangers who turned out to want the exact same thing.
            </p>
          </FadeIn>
        </div>

        {/* the chapter itself */}
        <div className="chapter" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "stretch", minHeight: 540 }}>
          <div className="chapter-photo" style={{ position: "relative", background: "#2D2521", minHeight: 560 }}>
            {chapters.map((c, i) => (
              <Image
                key={c.photo}
                src={c.photo}
                alt={c.alt}
                fill
                sizes="(max-width: 860px) 100vw, 50vw"
                style={{
                  // contain, not cover: the whole photograph shows
                  objectFit: "contain",
                  objectPosition: "center",
                  opacity: i === chapter ? 1 : 0,
                  transition: "opacity 600ms ease",
                }}
              />
            ))}
          </div>

          <div className="chapter-text" style={{ position: "relative", padding: "72px 72px 72px 64px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {/* the numeral is the decoration — no flourishes needed */}
            <span
              aria-hidden="true"
              className="chapter-num"
              style={{
                position: "absolute",
                top: 28,
                right: 56,
                fontFamily: "var(--font-cormorant)",
                fontSize: "clamp(90px,11vw,170px)",
                lineHeight: 1,
                color: "#F1F0E5",
                opacity: 0.09,
                pointerEvents: "none",
              }}
            >
              {String(chapter + 1).padStart(2, "0")}
            </span>

            {/* every chapter stays in the markup so the whole story is still readable
                to anyone — and anything — that does not run the buttons */}
            {chapters.map((c, i) => (
              <p
                key={c.photo}
                style={{
                  display: i === chapter ? "block" : "none",
                  position: "relative",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "clamp(16px,1.5vw,19px)",
                  lineHeight: 1.75,
                  minHeight: "10.5em",
                  color: "#E8D5BC",
                  whiteSpace: "pre-line",
                  maxWidth: 420,
                }}
              >
                {c.text}
              </p>
            ))}

            {/* progress: a rule and numerals, not dots */}
            <div style={{ position: "relative", marginTop: 44, maxWidth: 420 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 18 }}>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.14em", color: "#C39E88" }}>
                  {String(chapter + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
                </span>
                <span style={{ flex: 1, height: 1, background: "rgba(241,240,229,0.18)", position: "relative" }}>
                  <span
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      height: 1,
                      width: `${((chapter + 1) / chapters.length) * 100}%`,
                      background: "#C39E88",
                      transition: "width 400ms ease",
                    }}
                  />
                </span>
              </div>

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  disabled={chapter === 0}
                  aria-label="Previous chapter"
                  style={{
                    width: 52,
                    height: 44,
                    background: "none",
                    border: "1px solid rgba(241,240,229,0.3)",
                    color: "#F1F0E5",
                    cursor: chapter === 0 ? "default" : "pointer",
                    opacity: chapter === 0 ? 0.3 : 1,
                  }}
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  disabled={chapter === last}
                  aria-label="Next chapter"
                  style={{
                    width: 52,
                    height: 44,
                    background: chapter === last ? "none" : "rgba(195,158,136,0.22)",
                    border: "1px solid rgba(241,240,229,0.3)",
                    color: "#F1F0E5",
                    cursor: chapter === last ? "default" : "pointer",
                    opacity: chapter === last ? 0.3 : 1,
                  }}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>

        {chapter === last && (
          <div className="chapter-close" style={{ padding: "40px 48px 72px", textAlign: "center" }}>
            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(18px,2.4vw,24px)", color: "#C5AA9B" }}>
              if this story feels like yours — you&apos;re exactly where you&apos;re supposed to be.
            </p>
          </div>
        )}
      </section>

      {/* SECTION 3 — THE TWO OF US */}
      <section style={{ background: "var(--color-bg-page)" }}>
        <div className="two-of-us-head" style={{ maxWidth: 1240, margin: "0 auto", padding: "72px 48px 56px", textAlign: "center" }}>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(16px,2.2vw,24px)", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-accent)" }}>
              the two of us
            </p>
          </FadeIn>
        </div>
        {guides.map((g, i) => (
          <Guide key={g.name} guide={g} flip={i % 2 === 1} />
        ))}
      </section>

      {/* SECTION 4 — WHAT WE BELIEVE */}
      <section style={{ background: "var(--color-bg-surface)", padding: "96px 48px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 56 }}>
              what we believe
            </p>
          </FadeIn>

          <div className="beliefs" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 48 }}>
            {beliefs.map((b, i) => (
              <FadeIn key={b.statement} delay={i * 0.08}>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      fontSize: "clamp(20px,2.2vw,25px)",
                      lineHeight: 1.25,
                      color: "var(--color-text-headline)",
                      fontWeight: 700,
                      marginBottom: 16,
                      textWrap: "balance",
                    }}
                  >
                    {b.statement}
                  </p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.8, color: "var(--color-text-body)" }}>{b.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 — CLOSING */}
      <section style={{ position: "relative", padding: "150px 32px", background: "#2D2521", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/images/Return to Love group sunset.jpg" alt="Return to Love group sunset" fill style={{ objectFit: "cover", objectPosition: "center 65%" }} sizes="100vw" />
          <div style={{ position: "absolute", inset: 0, background: "rgba(45,37,33,0.5)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
          <SplitHeadline
            text="you were made for more than just surviving"
            as="h2"
            style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(26px,4vw,38px)", color: "#F1F0E5", fontWeight: 700, marginBottom: 22, textWrap: "balance", maxWidth: 560, marginLeft: "auto", marginRight: "auto" }}
          />
          <FadeIn delay={0.3}>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.45, color: "#E8D5BC", marginBottom: 36 }}>
              there is no team. it&apos;s the two of us — we answer the emails, we plan the itineraries, and we&apos;re the ones on the ground with you for the whole week.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/retreats/kenya" style={{ display: "inline-block", padding: "14px 32px", border: "1px solid #C39E88", background: "rgba(195,158,136,0.25)", color: "#F1F0E5", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textDecoration: "none" }}>
                explore retreats →
              </a>
              <a href="https://instagram.com/asha_experiences" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "14px 32px", border: "1px solid #C39E88", color: "#F1F0E5", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textDecoration: "none" }}>
                follow along →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) {
          .about-hero { min-height: 68vh !important; }
          .chapter { grid-template-columns: 1fr !important; }
          .chapter-photo { min-height: 0 !important; height: 125vw; }
          .chapter-num { display: none !important; }
        .chapter-text { padding: 48px 24px 0 !important; }
          /* same 36 above the label as below it, so it sits between the story
             and Ashley rather than against either one */
          .two-of-us-head { padding: 40px 24px !important; }
          .chapter-close { padding: 28px 24px 36px !important; }
          .story-intro { padding: 0 24px 40px !important; }
          .guide-row { grid-template-columns: 1fr !important; }
          .guide-photo { order: 1 !important; min-height: 0 !important; height: 125vw; }
          .guide-text { order: 2 !important; padding: 44px 24px 64px !important; }
          .beliefs { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </main>
  );
}
