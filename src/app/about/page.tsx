"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import FadeIn from "@/components/FadeIn";
import { SplitHeadline } from "@/components/AnimatedText";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function StoryBlock({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUpVariant}
      transition={{ duration: 0.8, ease: "easeInOut", delay }}
      style={{ maxWidth: 900, margin: "0 auto 80px" }}
    >
      {children}
    </motion.div>
  );
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 auto 48px", maxWidth: 480 }}>
      <div style={{ flex: 1, height: "0.5px", background: "var(--color-border)" }} />
      <span style={{ color: "#A67C52", fontSize: 14 }}>✦</span>
      <div style={{ flex: 1, height: "0.5px", background: "var(--color-border)" }} />
    </div>
  );
}

// Squiggly connector — travels diagonally from beneath one stop's photo to the next stop's photo
// fromLeft=true means the current stop has its photo on the left, so squiggle starts left and ends right
// SVG is 800px wide matching the container; photo centers are at ~160 (left) and ~640 (right)
function Squiggle({ fromLeft }: { fromLeft: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  // fromLeft: starts at left photo center (160), curves to right photo center (640)
  // fromRight: starts at right photo center (640), curves to left photo center (160)
  const path = fromLeft
    ? "M 160 0 C 120 50, 360 50, 380 100 C 400 150, 620 150, 640 200"
    : "M 640 0 C 680 50, 440 50, 420 100 C 400 150, 180 150, 160 200";
  return (
    <div ref={ref} style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px" }}>
      <svg width="100%" viewBox="0 0 800 200" fill="none" style={{ overflow: "visible", display: "block" }}>
        <motion.path
          d={path}
          stroke="#C9B89A"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}

const timelineStops = [
  {
    photo: "/images/little girls.png",
    alt: "Childhood photo",
    text: "once, we were little girls who played outside and believed in magic.",
    isRealPhoto: true,
    placeholder: null,
  },
  {
    photo: "/images/makeup.png",
    alt: "Teenage years",
    text: "then the world taught us to tone it down.\ntoughen up.\nfit in.\n\nso we did.",
    isRealPhoto: true,
    placeholder: null,
  },
  {
    photo: "/images/partying.png",
    alt: "Early twenties",
    text: "we chased love in all the wrong places.\npartied to escape our pain.\nlaughed loudly while quietly unraveling.",
    isRealPhoto: true,
    placeholder: null,
  },
  {
    photo: "/images/degrees.png",
    alt: "Degrees",
    text: "we did everything society told us to do.\nwe even got masters degrees.\n\nbut inside, we felt lost and unworthy.",
    isRealPhoto: true,
    placeholder: null,
  },
  {
    photo: "/images/floral.png",
    alt: "Pain",
    text: "we felt the heartbreak.\nthe shame.\nthe constant need to prove and please.\n\nwe learned to wear masks before we even knew our true face.",
    isRealPhoto: true,
    placeholder: null,
  },
  {
    photo: "/images/travel.png",
    alt: "Pain 2",
    text: "eventually, the pretending got too heavy.\n\nand the pain cracked us open.",
    isRealPhoto: true,
    placeholder: null,
  },
  {
    photo: "/images/france.png",
    alt: "Early somatic work",
    text: "we chose the path of healing.\n\nwe met our shadows, our shame,\nand chose love.\n\nover and over again.",
    isRealPhoto: true,
    placeholder: null,
  },
  {
    photo: "/images/healing 1.png",
    alt: "Deeper work",
    text: "that's when the real work began.\n\nbreath by breath.\nchoice by choice.\n\nwe came home to ourselves.",
    isRealPhoto: true,
    placeholder: null,
  },
  {
    // PLACEHOLDER COPY — swap with real version later
    photo: "/images/healing 2.png",
    alt: "Healing",
    text: "we became the women we once needed.\n\nand now, we guide others home too.",
    isRealPhoto: true,
    placeholder: null,
  },
];

function TimelineStop({ stop, index }: { stop: typeof timelineStops[0]; index: number }) {
  const isLeft = index % 2 === 0; // even index = photo left; odd index = photo right
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: "easeInOut" }}
      className="timeline-stop"
      style={{
        display: "flex",
        flexDirection: isLeft ? "row" : "row-reverse",
        alignItems: "center",
        gap: 64,
        maxWidth: 800,
        margin: "0 auto",
        padding: "0 32px",
      }}
    >
      {/* Photo */}
      <div style={{ flexShrink: 0, width: 320, height: 380, borderRadius: 12, overflow: "hidden", background: "var(--color-bg-card)", position: "relative" }}>
        {stop.photo ? (
          <img src={stop.photo} alt={stop.alt} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-muted)", letterSpacing: "0.03em", textAlign: "center", padding: 16 }}>
              [PLACEHOLDER: {stop.placeholder}]
            </span>
          </div>
        )}
      </div>
      {/* Text */}
      <p
        className="timeline-text"
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: 14,
          color: "var(--color-text-body)",
          lineHeight: 1.7,
          flex: "1 1 0",
          minWidth: 0,
          textAlign: isLeft ? "left" : "right",
          whiteSpace: "pre-line",
        }}
      >
        {stop.text}
      </p>
    </motion.div>
  );
}

export default function AboutPage() {
  return (
    <main>
      {/* SECTION 1 — HERO */}
      <section style={{ position: "relative", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#2D2521", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image src="/images/shannonandashley.jpg" alt="Shannon and Ashley" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="100vw" priority />
        </div>
        <div style={{ position: "absolute", inset: 0, background: "rgba(45,37,33,0.3)" }} />
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px", maxWidth: 700, margin: "0 auto" }}>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(36px,6vw,56px)", color: "#F1F0E5", fontWeight: 700, marginBottom: 16, lineHeight: 1.15 }}
          >
            we became the women<br />we once needed.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeInOut" }}
            style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "#BAAB92", marginTop: 16, lineHeight: 1.7 }}
          >
            and now we guide others home too.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2 — THE SHARED STORY (timeline) */}
      <section style={{ background: "var(--color-bg-page)", padding: "80px 32px 80px" }}>
        <FadeIn>
          <p style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(26px,4vw,36px)", fontWeight: 700, color: "var(--color-text-headline)", textAlign: "center", marginBottom: 64 }}>
            how we got here
          </p>
        </FadeIn>

        {timelineStops.map((stop, i) => (
          <div key={i}>
            <TimelineStop stop={stop} index={i} />
            {i < timelineStops.length - 1 && (
              // fromLeft=true when current stop has photo on left (even index), squiggle travels right toward next photo
              <Squiggle fromLeft={i % 2 === 0} />
            )}
          </div>
        ))}

      </section>

      {/* DARK BRIDGE BAR */}
      <div style={{ background: "#2D2521", height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(18px,2.5vw,24px)", color: "#EFE6D3", textAlign: "center" }}>
          if this story feels like yours — you&apos;re exactly where you&apos;re supposed to be.
        </p>
      </div>

      {/* CLOSING PHOTO */}
      <section style={{ background: "var(--color-bg-page)", padding: "80px 32px" }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <div style={{ position: "relative", width: "100%", maxWidth: 560, margin: "0 auto", aspectRatio: "16/9", borderRadius: 8, overflow: "hidden" }}>
            <Image src="/images/Tezza-8936.JPG" alt="Retreat circle" fill style={{ objectFit: "cover", objectPosition: "center 61%" }} sizes="(max-width: 640px) 100vw, 560px" />
          </div>
        </motion.div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .timeline-stop { flex-direction: column !important; gap: 24px !important; padding: 0 16px !important; }
          .timeline-text { text-align: left !important; width: 100% !important; }
        }
        /* NOTE: mobile layout needs real device check — squiggles and alternating layout may need further tuning */
      `}</style>

      {/* SECTION 3 — SHANNON */}
      <section style={{ background: "var(--color-bg-surface)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "45% 55%", minHeight: 600 }} className="shannon-grid">
          <div style={{ position: "relative", minHeight: 500, background: "var(--color-bg-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image src="/images/4.png" alt="Shannon" fill style={{ objectFit: "cover", objectPosition: "center top" }} sizes="45vw" />
          </div>
          <div style={{ padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <FadeIn>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--color-accent)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>meet shannon</p>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: 48, color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 8 }}>Shannon</h2>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-muted)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 4 }}>somatic guide · women&apos;s circle facilitator · retreat host</p>
              <a href="https://instagram.com/soulflowwithshannon" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--color-accent)", textDecoration: "none", display: "block", marginBottom: 32 }}>@soulflowwithshannon</a>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.85, maxWidth: 460, display: "flex", flexDirection: "column", gap: 20 }}>
                <p>shannon is based in bali — which tells you something about how she moves through the world. toward beauty. toward depth. toward the places that make ordinary life feel like a memory.</p>
                <p>her background is in psychology, and it shows — not in a clinical way, but in the way she can hold a room full of women falling apart and make every single one of them feel safe.</p>
                <p>in 2020, everything cracked open. drinking too much. depressed. anxious. carrying shame she&apos;d been lugging around for years and pretending didn&apos;t exist.</p>
                <p>she finally got help.</p>
                <p>and that decision — that one moment of choosing herself over the performance — became the foundation of everything she does now.</p>
                <p>through somatic work, yoga, breathwork, and women&apos;s circles, she guides women back to the version of themselves that existed before the world told them to be smaller.</p>
                <p>when she&apos;s not leading retreats, you&apos;ll find her upside down on an aerial hoop, talking to her cat, or convincing someone to move to bali.</p>
              </div>
            </FadeIn>
          </div>
        </div>
        <style>{`@media(max-width:768px){.shannon-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* SECTION 4 — ASHLEY */}
      <section style={{ background: "var(--color-bg-page)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "55% 45%", minHeight: 600 }} className="ashley-grid">
          <div style={{ padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <FadeIn>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--color-accent)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>meet ashley</p>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: 48, color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 8 }}>Ashley</h2>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-muted)", letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 4 }}>reiki healer · sound bath dj · life coach · retreat host</p>
              <a href="https://instagram.com/ashleyscully_" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--color-accent)", textDecoration: "none", display: "block", marginBottom: 32 }}>@ashleyscully_</a>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.85, maxWidth: 460, display: "flex", flexDirection: "column", gap: 20 }}>
                <p>ashley&apos;s journey didn&apos;t start in peace. it started in chaos.</p>
                <p>in 2020, she was coming out of an abusive relationship — completely disconnected from herself, stuck in the same painful patterns, wanting to heal not just from him, but from her.</p>
                <p>that&apos;s when she found reiki.</p>
                <p>her first session cracked her open. she could feel energy move through her body for the first time — like remembering who she was. then came sound healing. and the first time she heard a singing bowl, her anxious brain finally went quiet.</p>
                <p>it became the medicine she didn&apos;t know she needed.</p>
                <p>today she leads sound baths at equinox and hush, holds reiki sessions, coaches women through heartbreak and rebuilding, and hosts retreats that take women across the world and back to themselves.</p>
                <p>she&apos;s also a total animal lover, dog mom, future animal sanctuary dreamer, writer of poetry, discoverer of house music, and the kind of person who ends up eating brooklyn pizza at 3am with sparkles on her face after a rave.</p>
                <p>the girl who once felt broken now helps others rise. with grace, wisdom, and sound.</p>
              </div>
            </FadeIn>
          </div>
          <div style={{ position: "relative", minHeight: 500, background: "var(--color-bg-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image src="/images/3.png" alt="Ashley" fill style={{ objectFit: "cover", objectPosition: "center top" }} sizes="45vw" />
          </div>
        </div>
        <style>{`@media(max-width:768px){.ashley-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* SECTION 5 — THE ORIGIN MOMENT */}
      <section style={{ background: "#2D2521", padding: "100px 32px", textAlign: "center" }}>
        <FadeIn>
          <div style={{ maxWidth: 600, margin: "0 auto", borderRadius: 12, overflow: "hidden" }}>
            <Image
              src="/images/Asha created.png"
              alt="ASHA created"
              width={0}
              height={0}
              sizes="(max-width: 640px) 100vw, 600px"
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 20, color: "#F1F0E5", maxWidth: 520, margin: "48px auto 0", lineHeight: 1.8 }}>
            &ldquo;we met in a women&apos;s circle — two strangers who turned out to want the exact same thing. healing, travel, and community.&rdquo;
          </p>
        </FadeIn>
      </section>

      {/* SECTION 6 — WHAT WE BELIEVE */}
      <section style={{ background: "var(--color-bg-surface)", padding: "100px 32px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 56 }}>
              what we believe
            </h2>
          </FadeIn>

          {[
            {
              statement: "that healing doesn't have to be heavy.",
              body: "it can look like dancing until midnight, laughing until your stomach hurts, and waking up to coffee on a veranda while the sun comes up over the savannah.",
            },
            {
              statement: "that the right environment changes everything.",
              body: "you can do all the work at home. but something about being somewhere extraordinary — truly outside your ordinary life — cracks open what nothing else could reach.",
            },
            {
              statement: "that women need each other.",
              body: "not in a performative way. in a real way. the kind that happens when the masks come off and someone finally sees you without the roles.",
            },
            {
              statement: "that you already know what you need.",
              body: "you don't need to be fixed. you don't need someone to tell you who to be. you just need somewhere safe enough to remember.",
            },
          ].map((belief, i, arr) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ marginBottom: i < arr.length - 1 ? 48 : 0 }}>
                <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 22, color: "var(--color-text-headline)", marginBottom: 8 }}>
                  {belief.statement}
                </p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-text-body)", maxWidth: 480, margin: "0 auto", lineHeight: 1.8 }}>
                  {belief.body}
                </p>
              </div>
              {i < arr.length - 1 && <Divider />}
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SECTION 7 — CLOSING CTA */}
      <section style={{ position: "relative", padding: "160px 32px", background: "#2D2521", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/images/Return to Love group sunset.jpg"
            alt="Return to Love group sunset"
            fill
            style={{ objectFit: "cover", objectPosition: "center 65%" }}
            sizes="100vw"
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(45,37,33,0.45)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <SplitHeadline
            text="you were made for more than just surviving"
            as="h2"
            style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(26px,4vw,36px)", color: "#F1F0E5", fontWeight: 700, marginBottom: 40 }}
          />
          <FadeIn delay={0.4}>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="/retreats/kenya" style={{ display: "inline-block", padding: "12px 32px", border: "1px solid #C39E88", background: "rgba(195,158,136,0.25)", color: "#F1F0E5", fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textDecoration: "none", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(195,158,136,0.45)")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(195,158,136,0.25)")}>
                explore retreats
              </a>
              <a href="https://instagram.com/asha_experiences" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "12px 32px", border: "1px solid #C39E88", background: "rgba(195,158,136,0.25)", color: "#F1F0E5", fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textDecoration: "none", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(195,158,136,0.45)")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(195,158,136,0.25)")}>
                follow along @asha_experiences →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
