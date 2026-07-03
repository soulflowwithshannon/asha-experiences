"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, ReactNode } from "react";
import FadeIn from "@/components/FadeIn";
import GuidesCompact from "@/components/GuidesCompact";
import { SplitHeadline, StaggerBlock, StaggerChild } from "@/components/AnimatedText";

const daysData = [
  {
    day: "01",
    title: "arrive & exhale",
    blurb: "the jungle receives you. you don't have to do anything yet.",
    items: [
      "arrive at Lunita, settle into your space",
      "meet the women you'll spend the week with",
      "welcome ceremony and opening circle",
    ],
  },
  {
    day: "02",
    title: "shed",
    blurb: "you didn't come here to carry what you've been carrying. this is where you put it down.",
    items: [
      "morning yoga and somatic movement",
      "grounding workshop — what you're letting go of",
      "sound bath with Ashley in the evening",
    ],
  },
  {
    day: "03",
    title: "into the underworld",
    blurb: "day of the dead. the veil is thin. what's been waiting to be released, releases.",
    items: [
      "altar-building and Day of the Dead ceremony",
      "guided ritual — burying the old version of you",
      "fire circle and sisterhood sharing",
    ],
  },
  {
    day: "04",
    title: "rebirth",
    blurb: "you buried her. now you get to meet who you actually are.",
    items: [
      "cenote visit — a sacred swim",
      "tree-planting ceremony",
      "body art and blessing ritual",
    ],
  },
  {
    day: "05",
    title: "carry her home",
    blurb: "not an ending. the beginning of a life you stop apologizing for.",
    items: [
      "integration morning, gentle movement",
      "closing circle and sending-off ritual",
      "depart as someone new",
    ],
  },
];

function DaysGrid() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div style={{ overflowX: "auto", scrollbarWidth: "none", paddingBottom: 220, marginBottom: -220 }}>
      <div style={{ display: "flex", gap: 16, paddingBottom: 8 }}>
      {daysData.map((d, i) => (
        <div key={d.day} style={{ position: "relative" }} onMouseEnter={() => setHovered(i)} onMouseLeave={() => setHovered(null)}>
          <div style={{ flexShrink: 0, width: 180, border: "1px solid var(--color-border)", borderRadius: 8, padding: "28px 24px", textAlign: "center", cursor: "default", transition: "background 0.2s ease", background: hovered === i ? "#EDE4D0" : "var(--color-bg-surface)" }}>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.1em", color: "var(--color-accent)", textTransform: "uppercase", marginBottom: 8 }}>DAY {d.day}</p>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 20, color: "var(--color-text-headline)" }}>{d.title}</p>
          </div>
          <AnimatePresence>
            {hovered === i && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", top: "calc(100% + 12px)", width: 280, background: "#2B241D", color: "#EFE6D3", borderRadius: 8, padding: 20, zIndex: 20, boxShadow: "0 8px 32px rgba(0,0,0,0.25)" }}
              >
                <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 15, marginBottom: 12, lineHeight: 1.6 }}>{d.blurb}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                  {d.items.map((item, idx) => (
                    <li key={idx} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "#B3A488", display: "flex", gap: 8 }}>
                      <span>—</span><span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
      </div>
    </div>
  );
}

function MexicoHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <motion.div style={{ position: "absolute", inset: "-20%", y }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(45,37,33,0.3), rgba(45,37,33,0.6))", zIndex: 1 }} />
        <Image
          src="/images/Mexico hero.jpeg"
          alt="Becoming HER — Lunita Jungle Retreat, Mexico"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
          priority
        />
      </motion.div>

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "0 24px" }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(22px,3vw,34px)", color: "#E8B88A", fontWeight: 400, marginBottom: 20 }}
        >
          October 27 – 31, 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: "easeInOut" }}
          style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(52px,8vw,80px)", color: "#F1F0E5", fontWeight: 700, marginBottom: 16 }}
        >
          Becoming HER
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeInOut" }}
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(22px,3vw,34px)", color: "#F1F0E5", fontWeight: 700, fontStyle: "italic", marginBottom: 28, marginTop: -6 }}
        >
          Lunita Jungle Retreat, Mexico
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: 17, color: "#E8D5BC", maxWidth: 520, margin: "80px auto 0", lineHeight: 1.7 }}
        >
          five days in the jungle to bury who you were and become who you are.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: "easeInOut" }} style={{ marginTop: 60 }}>
          <a
            href="#invitation"
            style={{ display: "inline-block", padding: "14px 36px", background: "rgba(195,158,136,0.85)", border: "1px solid #C39E88", color: "#2D2521", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textDecoration: "none", fontWeight: 500, transition: "background 0.3s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#C39E88")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(195,158,136,0.85)")}
          >
            journey with us ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }: { question: string; answer: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "0.5px solid var(--color-border)" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
      >
        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-headline)", fontWeight: 500 }}>
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{ color: "var(--color-accent)", flexShrink: 0, marginLeft: 24, fontFamily: "var(--font-cormorant)", fontSize: 20, lineHeight: 1, display: "inline-block" }}
        >
          ↓
        </motion.span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{ overflow: "hidden" }}
      >
        <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.8, paddingBottom: 24 }}>
          {answer}
        </div>
      </motion.div>
    </div>
  );
}

function ParallaxImage({ src, alt, height, objectPosition = "center", sizes = "100vw" }: { src: string; alt: string; height: string | number; objectPosition?: string; sizes?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  return (
    <div ref={ref} style={{ position: "relative", height, overflow: "hidden" }}>
      <motion.div style={{ position: "absolute", inset: "-15%", y }}>
        <Image src={src} alt={alt} fill style={{ objectFit: "cover", objectPosition }} sizes={sizes} />
      </motion.div>
    </div>
  );
}

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "how do I get there?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>fly into <strong>Cancun International Airport (CUN)</strong>. the retreat center is about a 40-minute drive away in Puerto Morelos.</p>
        <p style={{ marginBottom: 12 }}><strong>Arrive:</strong> aim to land by 3pm on October 27th so we can all travel together to Lunita. we'll coordinate group transport.</p>
        <p><strong>Depart:</strong> October 31st. we'll organize group transport back to the airport.</p>
      </div>
    ),
  },
  {
    question: "do I need a visa?",
    answer: <p>most travelers do not need a visa to enter Mexico for short stays. check your country's specific requirements. we'll send a full pre-travel guide once you're booked.</p>,
  },
  {
    question: "can dietary restrictions be accommodated?",
    answer: <p>yes. the retreat center can accommodate most dietary preferences — vegetarian, vegan, gluten-free, and dairy-free. we'll ask for your dietary needs after booking.</p>,
  },
  {
    question: "what's the vibe of the group?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>intimate and real. we keep it small on purpose.</p>
        <p style={{ marginBottom: 12 }}>you'll find a mix of women — late 20s to 50s, all at different crossroads. some are in the middle of a big transition. some are just tired of not feeling like themselves. there's always the same thing underneath — a readiness to stop pretending and start living.</p>
        <p>by day two, you'd never guess they were strangers.</p>
      </div>
    ),
  },
  {
    question: "do I have to come with someone?",
    answer: <p>not at all. most women come solo — and many say the sisterhood they found was the most unexpected gift. this space is designed to make you feel safe, welcome, and deeply connected from day one.</p>,
  },
  {
    question: "will there be free time?",
    answer: <p>yes. this retreat blends guided experiences with spaciousness so you can rest, reflect, or just be. your energy is honored the whole way through.</p>,
  },
  {
    question: "can I arrive early or stay longer?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>yes — and if you've never been to Mexico, we highly recommend extending your trip. Cancun, Tulum, and the Yucatán coast are worth it.</p>
        <p>the official retreat runs October 27–31. if you want to arrive early or stay after, just reach out and we'll help coordinate.</p>
      </div>
    ),
  },
  {
    question: "do you offer payment plans?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>yes. you can secure your spot with a $1,000 deposit today. we'll work out a flexible payment plan from there.</p>
        <p>on the payment page, simply choose the deposit option instead of paying in full.</p>
      </div>
    ),
  },
  {
    question: "what's the cancellation policy?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>the $1,000 deposit is non-refundable, as it secures your spot and covers upfront costs. if you need to cancel after paying more, additional payments may be transferable if we can fill your spot.</p>
        <p>we highly recommend travel insurance to protect your investment. if something comes up, reach out to us as soon as possible.</p>
      </div>
    ),
  },
];

export default function MexicoPage() {
  return (
    <main>
      {/* SECTION 1 — HERO */}
      <MexicoHero />

      {/* SECTION 2 — INVITATION */}
      <section id="invitation" style={{ background: "var(--color-bg-page)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", fontFamily: "var(--font-dm-sans)", fontSize: 16, color: "var(--color-text-body)", lineHeight: 1.9 }}>
          <StaggerBlock>
            <StaggerChild>
              <p style={{ marginBottom: 28 }}>
                there is a version of you<br />
                that has been waiting quietly<br />
                for permission to exist.<br /><br />
                <em>not the one who holds it all together.</em><br />
                not the one who says she&apos;s fine.<br />
                the one underneath.
              </p>
            </StaggerChild>
            <StaggerChild>
              <p style={{ marginBottom: 28 }}>
                <strong>Becoming HER</strong> is a retreat for the woman<br />
                who is ready to bury an old version of herself.<br />
                <em>not with shame.</em><br />
                <strong>with reverence.</strong>
              </p>
            </StaggerChild>
            <StaggerChild>
              <p style={{ marginBottom: 40 }}>
                set in the jungle of Puerto Morelos, Mexico —<br />
                timed intentionally to coincide with<br />
                <u>Halloween, Day of the Dead, and Samhain.</u><br /><br />
                the three most powerful days of the year<br />
                to let something die.
              </p>
            </StaggerChild>

            <StaggerChild>
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 0 40px" }}>
                <div style={{ flex: 1, height: "0.5px", background: "#D4C8AA" }} />
                <span style={{ color: "#A67C52", fontSize: 14 }}>✦</span>
                <div style={{ flex: 1, height: "0.5px", background: "#D4C8AA" }} />
              </div>
            </StaggerChild>

            <StaggerChild>
              <p style={{ marginBottom: 28 }}>
                <strong>the jungle doesn&apos;t care about your to-do list.</strong><br /><br />
                <em>it just grows, and breathes, and holds.</em><br /><br />
                five days surrounded by that kind of aliveness<br />
                does something to a woman.<br /><br />
                <strong>it reminds her she is it too.</strong>
              </p>
            </StaggerChild>

            <StaggerChild>
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 0 40px" }}>
                <div style={{ flex: 1, height: "0.5px", background: "#D4C8AA" }} />
                <span style={{ color: "#A67C52", fontSize: 14 }}>✦</span>
                <div style={{ flex: 1, height: "0.5px", background: "#D4C8AA" }} />
              </div>
            </StaggerChild>

            <StaggerChild>
              <p>
                you will leave having buried the version of yourself<br />
                that was surviving.<br /><br />
                and having planted something new<br />
                in her place.<br /><br />
                <em>literally.</em>
              </p>
            </StaggerChild>
          </StaggerBlock>
        </div>
      </section>

      {/* RETRO ARROW TRANSITION */}
      <div style={{ background: "var(--color-bg-page)", display: "flex", justifyContent: "center", padding: "0 0 48px" }}>
        <Image src="/images/retro arrow.png" alt="" width={160} height={160} style={{ objectFit: "contain" }} />
      </div>

      {/* SECTION 3 — EXPERIENCE CARDS */}
      <section style={{ background: "var(--color-bg-page)", padding: "0 32px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>

          {/* Full-width image */}
          <div style={{ width: "100%", aspectRatio: "4/3", borderRadius: 10, overflow: "hidden", position: "relative" }}>
            <Image src="/images/the fire came to free you.png" alt="the fire came to free you" fill style={{ objectFit: "cover", objectPosition: "center 60%" }} sizes="100vw" />
          </div>
        </div>
      </section>

      {/* SECTION 3 — THE LOCATION */}
      <section style={{ background: "var(--color-bg-surface)", padding: "80px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", maxWidth: 1280, margin: "0 auto" }} className="stay-grid">
          <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", aspectRatio: "4/5" }}>
            <Image src="/images/retreat center.png" alt="Lunita Jungle Retreat" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="640px" />
          </div>
          <div style={{ maxWidth: 512 }}>
            <FadeIn><p className="eyebrow-accent" style={{ marginBottom: 16, fontWeight: 700 }}>LUNITA JUNGLE RETREAT</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 24 }}>
                held by the jungle.<br />held by each other.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 20 }}>
                <p>
                  <strong>Puerto Morelos, Mexico</strong> — nestled between Cancun and Tulum, 40 minutes from the airport, a world away from everything else.
                </p>
                <p>
                  <strong>Lunita Jungle Retreat</strong> is a boutique eco-sanctuary surrounded by Caribbean jungle. lush, alive, and designed to hold you — not perform for you.
                </p>
                <p>
                  open-air yoga shalas. cenotes nearby. organic meals. the kind of place that starts doing its work the moment you arrive.
                </p>
                <p>
                  <em>timed to coincide with Day of the Dead, Halloween, and Samhain — the three most powerful days of the year to let something old finally go.</em>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
        <style>{`@media(max-width:768px){.stay-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* SECTION 4 — WHAT YOUR SOUL CAN EXPECT */}
      <section style={{ background: "var(--color-bg-page)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ width: "100%", position: "relative", borderRadius: 10, overflow: "hidden" }}>
              <Image src="/images/what to expect new.png" alt="what your soul can expect in a day" width={900} height={0} style={{ width: "100%", height: "auto", display: "block" }} sizes="900px" />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 5 — WHAT'S INCLUDED */}
      <section style={{ background: "var(--color-bg-surface)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SplitHeadline
            text="what's taken care of"
            as="h2"
            style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", textAlign: "center", fontWeight: 700, marginBottom: 64 }}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="included-grid">
            <FadeIn>
              <div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-accent)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24, fontWeight: 700 }}>included</p>
                <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {([
                    <><strong>5 days / 4 nights</strong> held deep in the jungle</>,
                    <><strong>airport transfers</strong> to/from Cancún Airport</>,
                    <>nourishing, <strong>chef-prepared meals</strong> <em>made with love</em></>,
                    <><strong>daily movement + embodiment practices</strong> <em>to open &amp; release</em></>,
                    <><strong>sound healing journeys</strong> <em>to soften &amp; integrate what&apos;s rising</em></>,
                    <><strong>ceremonial experiences</strong> rooted in ancient wisdom, <em>guiding you through release, ritual, &amp; rebirth</em></>,
                    <><strong>nature excursions:</strong> cenotes, jungle walks, <em>moments that remind you how alive you are</em></>,
                    <><strong>professional photoshoot</strong> <em>to capture the woman you&apos;re becoming</em></>,
                    <><strong>sister circles</strong> + <strong>soul connection</strong></>,
                    <>a <strong>powerful passage</strong> into <em>becoming her</em></>,
                    <><em>and a few more surprises waiting for you when you arrive</em></>,
                  ] as ReactNode[]).map((item, i) => (
                    <li key={i} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-text-body)", lineHeight: 1.7 }}>{item}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "#9C8E7E", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24, fontWeight: 700 }}>not included</p>
                <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {([
                    <><strong>flights</strong> to/from Cancun, Mexico (CUN)</>,
                    <>personal spending and souvenirs</>,
                    <>travel insurance <em>(recommended but not required)</em></>,
                  ] as ReactNode[]).map((item, i) => (
                    <li key={i} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-text-body)", lineHeight: 1.7 }}>{item}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
        <style>{`@media(max-width:640px){.included-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* SECTION — TESTIMONIALS */}
      <section style={{ background: "var(--color-bg-page)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SplitHeadline
            text="women who came back different"
            as="h2"
            style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", textAlign: "center", fontWeight: 700, marginBottom: 48 }}
          />
          <FadeIn delay={0.1}>
            <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", borderRadius: 8, overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(166, 124, 82, 0.08)", mixBlendMode: "multiply", zIndex: 1, pointerEvents: "none", borderRadius: 8 }} />
              <video
                controls
                style={{ width: "100%", display: "block", borderRadius: 8, filter: "sepia(18%) saturate(90%) brightness(97%) contrast(103%)" }}
              >
                <source src="https://pub-2741403aca194491b445876d4a738ef8.r2.dev/videos/Testimonials.mp4" type="video/mp4" />
              </video>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* DIVIDER */}
      <div style={{ background: "#2D2521", height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(18px,2.5vw,24px)", color: "#EFE6D3", textAlign: "center" }}>
          ↑ this is what we created ASHA for.
        </p>
      </div>

      {/* SECTION 7 — GUIDES */}
      <GuidesCompact darkQuote />

      {/* DIVIDER */}
      <div style={{ background: "#2D2521", height: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(18px,2.5vw,24px)", color: "#EFE6D3", textAlign: "center" }}>
          now, the place that holds all of this.
        </p>
      </div>

      {/* SECTION 9 — THE ROOMS */}
      <section id="rooms" style={{ background: "#FFFCF5", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", textAlign: "center", fontWeight: 700, marginBottom: 8 }}>
              your home in the jungle
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", textAlign: "center", maxWidth: 520, margin: "0 auto 64px", lineHeight: 1.7 }}>
              two accommodation options — both fully held, both beautiful.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "start" }} className="rooms-grid">

            {/* Casa Colectiva */}
            <FadeIn>
              <div style={{ background: "var(--color-bg-card)", border: "0.5px solid var(--color-border)", borderRadius: 8, padding: 40, display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ borderRadius: 6, overflow: "hidden", marginBottom: 24, aspectRatio: "4/3", position: "relative" }}>
                  <Image src="/images/casa colectia.png" alt="Casa Colectiva" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="600px" />
                </div>
                <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: 28, color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 12 }}>Casa Colectiva</h3>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-text-body)", lineHeight: 1.7, marginBottom: 24 }}>
                  shared accommodation — the most connected way to experience the retreat. you&apos;ll share space with your fellow women, building the kind of closeness that only comes from living together.
                </p>
                <div style={{ marginTop: "auto" }}>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 36, color: "var(--color-accent)", fontWeight: 400, marginBottom: 4 }}>$2,300</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-body)", marginBottom: 8 }}>per person / shared occupancy</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--color-accent)", fontWeight: 600, marginBottom: 24 }}>4 spots available</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <a href="https://buy.stripe.com/4gM5kEeYgaVT3uO3iS0sU04" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "12px 24px", background: "#C39E88", color: "#2D2521", fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", textDecoration: "none", textAlign: "center", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#b08d78")} onMouseLeave={(e) => (e.currentTarget.style.background = "#C39E88")}>
                      reserve my spot →
                    </a>
                    <a href="https://buy.stripe.com/dRmcN6g2k3tr0iCcTs0sU05" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "12px 24px", border: "1px solid var(--color-accent)", color: "var(--color-accent)", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textDecoration: "none", textAlign: "center", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--color-accent) 10%, transparent)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      reserve with $1,000 deposit →
                    </a>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-body)", textAlign: "center", marginTop: 8, fontStyle: "italic" }}>*balance to be paid in full 30 days prior to retreat start date</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Casa Lienzo — Sold Out */}
            <FadeIn delay={0.15}>
              <div style={{ background: "var(--color-bg-card)", border: "0.5px solid var(--color-border)", borderRadius: 8, padding: 40, display: "flex", flexDirection: "column", height: "100%", opacity: 0.6 }}>
                <div style={{ borderRadius: 6, overflow: "hidden", marginBottom: 24, aspectRatio: "4/3", position: "relative" }}>
                  <Image src="/images/casa lienzo.png" alt="Casa Lienzo" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="600px" />
                </div>
                <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: 28, color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 12 }}>Casa Lienzo</h3>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-text-body)", lineHeight: 1.7, marginBottom: 24 }}>
                  a more private accommodation option at Lunita. beautiful, spacious, and fully immersed in the jungle.
                </p>
                <div style={{ marginTop: "auto" }}>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 36, color: "var(--color-text-muted)", fontWeight: 400, marginBottom: 4 }}>sold out</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 24 }}>
                    <div style={{ display: "block", padding: "12px 24px", background: "var(--color-bg-surface)", color: "var(--color-text-muted)", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textAlign: "center", borderRadius: 2 }}>
                      sold out
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
        <style>{`@media(max-width:768px){.rooms-grid{grid-template-columns:1fr!important}} @media(max-width:640px){.mobile-break{display:block}}`}</style>
      </section>

      {/* SECTION 10 — FAQ */}
      <section style={{ background: "var(--color-bg-page)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", textAlign: "center", fontWeight: 700, marginBottom: 56 }}>
              everything you need to know
            </h2>
          </FadeIn>
          <div style={{ borderTop: "0.5px solid var(--color-border)" }}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>
          <FadeIn delay={0.15}>
            <div style={{ textAlign: "center", paddingTop: 56 }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 22, color: "var(--color-text-headline)", marginBottom: 24 }}>
                still have questions?<span className="mobile-break"> </span>we&apos;d love to hear from you —
              </p>
              <a
                href="https://calendar.app.google/Yt1VUQGEuhhEipt59"
                target="_blank"
                rel="noopener noreferrer"
                className="ghost-btn"
              >
                book a call with <strong>Shannon</strong> or <strong>Ashley</strong> →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 11 — CLOSING CTA */}
      <section style={{ position: "relative", padding: "140px 32px", background: "#2D2521", textAlign: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "#2D2521" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(26px,4vw,40px)", color: "#F1F0E5", fontWeight: 700, marginBottom: 40 }}>
              something is calling you <em>here</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 17, color: "#BAAB92", maxWidth: 480, margin: "0 auto 40px" }}>
              five women.<br />five days.<br />one jungle that holds it all.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
              <a href="#rooms" style={{ display: "inline-block", padding: "12px 32px", background: "#C39E88", color: "#2D2521", fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", textDecoration: "none", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#b08d78")} onMouseLeave={(e) => (e.currentTarget.style.background = "#C39E88")}>
                reserve my spot →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
