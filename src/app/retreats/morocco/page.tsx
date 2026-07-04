"use client";

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
    blurb: "the desert receives you. you don't have to do anything yet.",
    items: [
      "private airport transfer to Atlas Kasbah",
      "settle in, meet the women you'll share the week with",
      "welcome ceremony and opening circle",
    ],
  },
  {
    day: "02",
    title: "roots",
    blurb: "before you can open up, you have to land somewhere. this is where you land.",
    items: [
      "morning yoga and somatic movement",
      "grounding workshop — why you're really here",
      "sunset in the Atlas foothills",
    ],
  },
  {
    day: "03",
    title: "open sands",
    blurb: "nothing to perform out here. just space, and what rises to fill it.",
    items: [
      "cultural immersion in Agadir",
      "souk visit and medina exploration",
      "guided journaling as the light changes",
    ],
  },
  {
    day: "04",
    title: "into the depths",
    blurb: "the day the retreat is named for. this is the deep end.",
    items: [
      "powerful ceremony and guided women's circle",
      "sound healing with Ashley",
      "a fire, and whatever needs to be said around it",
    ],
  },
  {
    day: "05",
    title: "still water",
    blurb: "after the deep end, you float. integration, not another lesson.",
    items: [
      "slower morning, gentle movement",
      "reiki and subconscious rewiring sessions",
      "rest built into the day on purpose",
    ],
  },
  {
    day: "06",
    title: "the fire",
    blurb: "the week starts to close, and everyone can feel it.",
    items: [
      "group excursion — coastal or mountain, based on the group",
      "traditional Moroccan dinner with your hosts",
      "closing ceremony and circle",
    ],
  },
  {
    day: "07",
    title: "carry it home",
    blurb: "not an ending. just the part where you take it with you.",
    items: [
      "sunrise farewell",
      "private transport back to the airport",
      "the version of you that arrives home is not the one who left",
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

function MoroccoHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <motion.div style={{ position: "absolute", inset: "-20%", y }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(45,37,33,0.3), rgba(45,37,33,0.6))", zIndex: 1 }} />
        <Image
          src="/images/📍Morocco.jpeg"
          alt="Sacred Sands — Atlas Kasbah, Morocco"
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
          November 29 – December 5, 2026
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: "easeInOut" }}
          style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(52px,8vw,80px)", color: "#F1F0E5", fontWeight: 700, marginBottom: 16 }}
        >
          Sacred Sands
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeInOut" }}
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(22px,3vw,34px)", color: "#F1F0E5", fontWeight: 700, fontStyle: "italic", marginBottom: 28, marginTop: -6 }}
        >
          Atlas Kasbah, Agadir, Morocco
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: 17, color: "#E8D5BC", maxWidth: 520, margin: "80px auto 0", lineHeight: 1.7 }}
        >
          seven days in one of the most extraordinary places on earth.
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
    question: "is Morocco safe?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>Morocco is a well-traveled destination known for its rich culture, deep spirituality, and warm hospitality.</p>
        <p style={{ marginBottom: 12 }}>Agadir, in particular, is a relaxed coastal city — chosen specifically for its safety, ease, and peaceful atmosphere. we&apos;ve done our homework on this.</p>
        <p>all transportation is pre-arranged with trusted, private drivers. we move together as a group for all excursions, and there&apos;s on-site support at Atlas Kasbah throughout the retreat.</p>
      </div>
    ),
  },
  {
    question: "what do I need for traveling to Morocco?",
    answer: (
      <div>
        <p style={{ marginBottom: 24 }}>here&apos;s a quick overview — we&apos;ll send you a full pre-travel guide once you&apos;re booked.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>Visa</p>
            <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>US citizens do not need a visa for stays under 90 days. most other western passport holders are also visa-free — we&apos;ll confirm your specific situation.</li>
            </ul>
          </div>
          <div>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>Passport</p>
            <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>ensure your passport is valid for at least 6 months beyond your travel dates.</li>
            </ul>
          </div>
          <div>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>Currency</p>
            <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>Moroccan Dirham (MAD). exchange at the airport or in the city — ATMs are widely available in Agadir.</li>
            </ul>
          </div>
          <div>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>Travel Insurance</p>
            <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>not required but highly recommended.</li>
              <li>we suggest World Nomads or SafetyWing — both cover medical emergencies and trip interruptions.</li>
              <li>cost is typically $50–100 for the duration of the trip.</li>
            </ul>
          </div>
          <div>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>Vaccinations</p>
            <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>no vaccinations are required for entry into Morocco. as always, consult your healthcare provider for personal recommendations.</li>
            </ul>
          </div>
        </div>
      </div>
    ),
  },
  {
    question: "how do I get to the retreat?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>there are two airport options:</p>
        <ul style={{ listStyle: "disc", paddingLeft: 20, margin: "0 0 16px", display: "flex", flexDirection: "column", gap: 6 }}>
          <li><strong>Agadir–Al Massira Airport (AGA)</strong> — closest, direct flights from many European hubs</li>
          <li><strong>Marrakech Menara Airport (RAK)</strong> — approximately 3 hours from Atlas Kasbah, more international connections</li>
        </ul>
        <p style={{ marginBottom: 8 }}><strong>Arrive:</strong> aim to be at Atlas Kasbah by 3pm on November 29th. private airport transfers are included and pre-arranged.</p>
        <p><strong>Depart:</strong> December 5th. group transport back to the airport is provided.</p>
      </div>
    ),
  },
  {
    question: "can dietary restrictions be accommodated?",
    answer: <p>absolutely. our private chef can customize meals around your needs — whether you&apos;re plant-based, gluten-free, dairy-free, or managing specific health conditions. we&apos;ll ask for your dietary needs after booking.</p>,
  },
  {
    question: "what's the vibe of the group?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>intimate. we keep it small on purpose.</p>
        <p style={{ marginBottom: 12 }}>you&apos;ll find a mix of women — late 20s to 50s, all at different crossroads. some are mid-heartbreak, some are pivoting careers, some are deep in motherhood, some just need a few days that are entirely their own. there&apos;s always the same thing underneath — a readiness to actually show up for themselves.</p>
        <p>by day two, you&apos;d never guess they were strangers.</p>
      </div>
    ),
  },
  {
    question: "do I have to come with someone?",
    answer: <p>not at all. most women come solo — and many say the sisterhood they found was the most unexpected gift. this space is designed to make you feel safe, welcome, and deeply connected from day one.</p>,
  },
  {
    question: "will there be free time?",
    answer: <p>absolutely. this retreat blends guided experiences with spaciousness so you can rest, reflect, or connect as you need. your energy is honored every step of the way.</p>,
  },
  {
    question: "can I arrive early or stay longer?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>yes — and if you&apos;ve never been to Morocco, we highly recommend it. Marrakech, the Atlas Mountains, and the Sahara are all worth exploring.</p>
        <p>the official retreat runs November 29 – December 5. if you want to arrive early or stay after, just reach out and we&apos;ll help coordinate.</p>
      </div>
    ),
  },
  {
    question: "do you offer payment plans?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>yes. you can secure your spot with a $1,000 deposit today. we&apos;ll work out a flexible payment plan spread over the coming months.</p>
        <p>on the payment page, simply choose the deposit option instead of paying in full.</p>
      </div>
    ),
  },
  {
    question: "what's the cancellation policy?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>the $1,000 deposit is non-refundable, as it secures your spot and covers upfront retreat costs. if you need to cancel after paying more, additional payments may be transferable if we can fill your spot.</p>
        <p>we highly recommend travel insurance to protect your investment. if something comes up, reach out to us as soon as possible.</p>
      </div>
    ),
  },
];

export default function MoroccoPage() {
  return (
    <main>
      {/* SECTION 1 — HERO */}
      <MoroccoHero />

      {/* SECTION 2 — INVITATION */}
      <section id="invitation" style={{ background: "var(--color-bg-page)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center", fontFamily: "var(--font-dm-sans)", fontSize: 16, color: "var(--color-text-body)", lineHeight: 1.9 }}>
          <StaggerBlock>
            <StaggerChild>
              <p style={{ marginBottom: 28 }}>
                there is a part of you<br />
                that has always been whole.<br /><br />
                <em>not the part that performs.</em><br />
                not the part that holds it together.<br />
                not the version that knows exactly<br />
                what to say in every room.<br /><br />
                the quiet part.<br />
                <strong>the one underneath it all.</strong>
              </p>
            </StaggerChild>
            <StaggerChild>
              <p style={{ marginBottom: 28 }}>
                she hasn&apos;t gone anywhere.<br />
                <em>she&apos;s just been waiting<br />for you to come back to her.</em>
              </p>
            </StaggerChild>
            <StaggerChild>
              <p style={{ marginBottom: 40 }}>
                <strong>your worth was never up for debate.</strong><br /><br />
                but somewhere along the way,<br />
                you started living like it was.
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
                <strong>Morocco doesn&apos;t care about your productivity.</strong><br /><br />
                <em>the sands have been here for thousands of years.</em><br />
                the light at dusk in the Atlas foothills<br />
                doesn&apos;t negotiate with your schedule.<br /><br />
                <u>it just is.</u><br />
                <em>and being inside that kind of beauty<br />does something to a woman.</em>
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
                because this isn&apos;t the matrix.<br />
                <em>there is no inbox. no algorithm.</em><br />
                no performance of a life that looks good<br />
                from the outside.
              </p>
            </StaggerChild>
            <StaggerChild>
              <p style={{ marginBottom: 0 }}>
                there is just <strong>ancient land, warm air, and women<br />who are done pretending</strong> —<br />
                and you, standing in the middle of it,<br />
                finally remembering<br /><br />
                <strong><u>who you are.</u></strong>
              </p>
            </StaggerChild>
          </StaggerBlock>
        </div>
      </section>

      {/* SECTION 2b — HOW WE CALL HER HOME */}
      <section style={{ background: "var(--color-bg-surface)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, color: "var(--color-text-headline)", textAlign: "center", marginBottom: 64 }}>
              how do we call her home?
            </h2>
          </FadeIn>

          {/* Row 1 — 2 cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }} className="cards-row">
            {[
              {
                ph: "yoga/movement Morocco",
                title: "step into your body, fully",
                body: <>somatic practices and gentle movement<br />that wake up what went quiet.<br /><br />your body knows how to feel alive —<br /><em>it just needs permission and space.</em></>,
              },
              {
                ph: "sound healing/reiki",
                title: "let sound do what words can't",
                body: <>ashley&apos;s sound baths, reiki, and intuitive guidance.<br /><em>frequency that reaches the layer<br />words never quite touch.</em><br /><br />subconscious rewiring sessions<br />that meet you exactly where you are.</>,
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: "var(--color-bg-page)", border: "0.5px solid var(--color-border)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ width: "100%", aspectRatio: "1 / 1", background: "var(--color-bg-card)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-muted)", letterSpacing: "0.03em", textAlign: "center", padding: 16 }}>[PLACEHOLDER: {card.ph}]</span>
                  </div>
                  <div style={{ padding: "20px 0", textAlign: "center" }}>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 18, color: "var(--color-text-headline)", marginBottom: 10 }}>{card.title}</p>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-text-body)", lineHeight: 1.8 }}>{card.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Row 2 — dark center card */}
          <FadeIn delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderRadius: 10, overflow: "hidden", marginBottom: 12, background: "#2D2521" }} className="solo-card">
              <div style={{ background: "var(--color-bg-card)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 340 }}>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-muted)", textAlign: "center", padding: 16 }}>[PLACEHOLDER: Morocco cultural experience]</span>
              </div>
              <div style={{ padding: 40, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 20, color: "#F1F0E5", marginBottom: 16 }}>sacred in every direction</p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "#C5AA9B", lineHeight: 1.8 }}>
                  a land where <strong style={{ color: "#F1F0E5" }}>ancient culture and spirituality</strong><br />
                  are still woven into everyday life.<br /><br />
                  <strong style={{ color: "#F1F0E5" }}>grounded rituals</strong> and sacred circles<br />
                  <em>held in one of the most atmospheric<br />places on earth.</em><br /><br />
                  <strong style={{ color: "#F1F0E5" }}>cultural immersion</strong> —<br />
                  <em>because beauty this old<br />does something to the soul.</em>
                </p>
              </div>
              <div style={{ background: "var(--color-bg-card)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 340 }}>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-muted)", textAlign: "center", padding: 16 }}>[PLACEHOLDER: Atlas Kasbah]</span>
              </div>
            </div>
          </FadeIn>

          {/* Row 3 — 2 cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="cards-row">
            {[
              {
                ph: "women's circle Morocco",
                title: "go underneath the surface",
                body: <>women&apos;s circles held under open sky.<br />ceremony that reaches <u>the layer<br />the everyday world never touches.</u><br /><br /><em>not therapy. not a workshop.</em><br /><strong>something older than both.</strong><br /><br />the part of you that&apos;s been waiting<br />to finally be heard.</>,
              },
              {
                ph: "sisterhood Morocco",
                title: "let yourself be found by each other",
                body: <>you will arrive not knowing anyone.<br />by day three, these women will know things<br />about you that your oldest friends don&apos;t.<br /><br /><em>that&apos;s not an accident.</em><br />that&apos;s what happens when you take<br />the performance away<br />and <strong>just let yourself be seen.</strong></>,
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div style={{ background: "var(--color-bg-page)", border: "0.5px solid var(--color-border)", borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ width: "100%", aspectRatio: "1 / 1", background: "var(--color-bg-card)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-muted)", letterSpacing: "0.03em", textAlign: "center", padding: 16 }}>[PLACEHOLDER: {card.ph}]</span>
                  </div>
                  <div style={{ padding: "20px 0", textAlign: "center" }}>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 18, color: "var(--color-text-headline)", marginBottom: 10 }}>{card.title}</p>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-text-body)", lineHeight: 1.8 }}>{card.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.15}>
            <div style={{ maxWidth: 560, margin: "80px auto 0", textAlign: "center", fontFamily: "var(--font-dm-sans)", fontSize: 16, color: "var(--color-text-body)", lineHeight: 1.9, display: "flex", flexDirection: "column", gap: 20 }}>
              <p>
                <strong>Sacred Sands gives you back what the noise took.</strong>
              </p>
              <p>
                <em>the knowing.</em><br />
                <em>the presence.</em><br />
                <em>the feeling that you were never<br />as lost as you thought.</em>
              </p>
              <p>
                you take that home.<br />
                into the ordinary days,<br />
                the world that will be exactly<br />
                as you left it.
              </p>
              <p>
                <strong>except you won&apos;t be.</strong>
              </p>
            </div>
          </FadeIn>
        </div>
        <style>{`@media(max-width:768px){.cards-row{grid-template-columns:1fr!important}.solo-card{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* SECTION 3 — THE LOCATION */}
      <section style={{ background: "var(--color-bg-surface)", padding: "80px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", maxWidth: 1280, margin: "0 auto" }} className="stay-grid">
          <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", aspectRatio: "4/5", background: "var(--color-bg-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-muted)", textAlign: "center", padding: 16 }}>[PLACEHOLDER: Atlas Kasbah video or photo]</span>
          </div>
          <div style={{ maxWidth: 512 }}>
            <FadeIn><p className="eyebrow-accent" style={{ marginBottom: 16, fontWeight: 700 }}>ATLAS KASBAH</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 24 }}>
                ancient outside.<br />held inside.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 20 }}>
                <p>
                  <strong>Agadir, Morocco</strong> — a relaxed coastal city nestled between the Atlantic Ocean and the foothills of the Anti-Atlas mountains. warm, safe, and deeply atmospheric.
                </p>
                <p>
                  <strong>Atlas Kasbah</strong> is a boutique eco-lodge with traditional Moroccan architecture, lush gardens, and the kind of stillness that starts working on you the moment you arrive.
                </p>
                <p>
                  private chef-prepared meals. a pool surrounded by palms. intimate spaces designed for gathering, resting, and going deep.
                </p>
                <p>
                  <em>a 3-hour drive from Marrakech airport, or a quick hop into Agadir directly — two easy ways in.</em>
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
        <style>{`@media(max-width:768px){.stay-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* SECTION 4 — ARC OF THE WEEK */}
      <section style={{ background: "var(--color-bg-page)", padding: "80px 32px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", textAlign: "center", fontWeight: 700, marginBottom: 12 }}>
              the arc of the week
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, fontStyle: "italic", color: "var(--color-text-muted)", textAlign: "center", marginBottom: 48 }}>
              full itinerary shared once you&apos;re booked
            </p>
          </FadeIn>
          <DaysGrid />
          <FadeIn delay={0.15}>
            <div style={{ maxWidth: 560, margin: "80px auto 0", textAlign: "center", fontFamily: "var(--font-dm-sans)", fontSize: 16, color: "var(--color-text-body)", lineHeight: 1.9, display: "flex", flexDirection: "column", gap: 20 }}>
              <p>
                <strong>the goal isn&apos;t to become someone new.</strong>
              </p>
              <p>
                <em>it&apos;s to remember who you are.</em>
              </p>
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
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="included-grid">
            <FadeIn>
              <div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-accent)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24, fontWeight: 700 }}>included</p>
                <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {([
                    <><strong>7 days / 6 nights</strong> in a castle retreat center</>,
                    <><strong>Transfer</strong> to/from Marrakech (RAK) airport</>,
                    <>3 nourishing <strong>chef-prepared meals</strong> daily</>,
                    <><strong>Daily movement therapy</strong></>,
                    <><strong>Sound healing journeys</strong></>,
                    <><strong>Traditional Moroccan cultural experiences</strong></>,
                    <><strong>Desert and nature adventures</strong></>,
                    <><strong>Professional goddess photoshoot</strong></>,
                    <><strong>Sister circles &amp; connections</strong></>,
                    <><strong>A return to your sacred divinity</strong></>,
                    <><em>..and so much more!</em></>,
                  ] as ReactNode[]).map((item, i) => (
                    <li key={i} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.7 }}>{item}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "#9C8E7E", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24, fontWeight: 700 }}>not included</p>
                <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {([
                    <><strong>flights</strong> to/from Morocco</>,
                    <>personal spending and souvenirs</>,
                    <><strong>travel insurance</strong> <em>(recommended but not required)</em></>,
                    <><strong>gratuities</strong> for local staff <em>(suggested and always appreciated)</em></>,
                  ] as ReactNode[]).map((item, i) => (
                    <li key={i} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.7, opacity: 0.7 }}>{item}</li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
        <style>{`@media(max-width:640px){.included-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* SECTION 6 — TESTIMONIALS */}
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

      {/* SECTION 8 — THE ROOMS */}
      <section id="rooms" style={{ background: "#FFFCF5", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <SplitHeadline
            text="your home in the desert"
            as="h2"
            style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", textAlign: "center", fontWeight: 700, marginBottom: 8 }}
          />
          <FadeIn delay={0.1}>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", textAlign: "center", maxWidth: 520, margin: "0 auto 64px", lineHeight: 1.7 }}>
              three accommodation options — each thoughtfully appointed, all fully held.
            </p>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, alignItems: "start" }} className="rooms-grid">

            {/* The Jamila */}
            <FadeIn>
              <motion.div whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(74,63,53,0.12)" }} transition={{ duration: 0.3 }} style={{ background: "var(--color-bg-card)", border: "0.5px solid var(--color-border)", borderRadius: 8, padding: 32, display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ background: "var(--color-bg-surface)", borderRadius: 6, overflow: "hidden", marginBottom: 24, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-muted)", textAlign: "center", padding: 16 }}>[PLACEHOLDER: The Jamila]</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: 24, color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 8 }}>The Jamila</h3>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-accent)", letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>private tower room · 1 available</p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-text-body)", lineHeight: 1.7, marginBottom: 24 }}>
                  the most private option. your own tower room at Atlas Kasbah — a space that is entirely yours.
                </p>
                <div style={{ marginTop: "auto" }}>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 32, color: "var(--color-accent)", fontWeight: 400, marginBottom: 4 }}>$4,000</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-body)", marginBottom: 24 }}>per person / private occupancy</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <a href="https://buy.stripe.com/fZu9AU5nG0hf8P88Dc0sU06" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "12px 24px", background: "#C39E88", color: "#2D2521", fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", textDecoration: "none", textAlign: "center", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#b08d78")} onMouseLeave={(e) => (e.currentTarget.style.background = "#C39E88")}>
                      reserve my spot →
                    </a>
                    <a href="https://buy.stripe.com/3cI5kEeYg1lje9s6v40sU07" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "12px 24px", border: "1px solid var(--color-accent)", color: "var(--color-accent)", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textDecoration: "none", textAlign: "center", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--color-accent) 10%, transparent)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      reserve with $1,000 deposit →
                    </a>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-body)", textAlign: "center", marginTop: 8, fontStyle: "italic" }}>*balance to be paid in full 30 days prior to retreat start date</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* The Amani */}
            <FadeIn delay={0.1}>
              <motion.div whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(74,63,53,0.12)" }} transition={{ duration: 0.3 }} style={{ background: "var(--color-bg-card)", border: "0.5px solid var(--color-border)", borderRadius: 8, padding: 32, display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ background: "var(--color-bg-surface)", borderRadius: 6, overflow: "hidden", marginBottom: 24, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-muted)", textAlign: "center", padding: 16 }}>[PLACEHOLDER: The Amani]</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: 24, color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 8 }}>The Amani</h3>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-accent)", letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>private room · 1 available</p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-text-body)", lineHeight: 1.7, marginBottom: 24 }}>
                  a beautiful private room in the main kasbah — privacy with the warmth of being close to the group.
                </p>
                <div style={{ marginTop: "auto" }}>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 32, color: "var(--color-accent)", fontWeight: 400, marginBottom: 4 }}>$3,700</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-body)", marginBottom: 24 }}>per person / private occupancy</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <a href="https://buy.stripe.com/6oU8wQ6rK5Bz9TcaLk0sU08" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "12px 24px", background: "#C39E88", color: "#2D2521", fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", textDecoration: "none", textAlign: "center", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#b08d78")} onMouseLeave={(e) => (e.currentTarget.style.background = "#C39E88")}>
                      reserve my spot →
                    </a>
                    <a href="https://buy.stripe.com/5kQ9AU7vO2pn2qK7z80sU09" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "12px 24px", border: "1px solid var(--color-accent)", color: "var(--color-accent)", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textDecoration: "none", textAlign: "center", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--color-accent) 10%, transparent)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      reserve with $1,000 deposit →
                    </a>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-body)", textAlign: "center", marginTop: 8, fontStyle: "italic" }}>*balance to be paid in full 30 days prior to retreat start date</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* The Salima */}
            <FadeIn delay={0.2}>
              <motion.div whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(74,63,53,0.12)" }} transition={{ duration: 0.3 }} style={{ background: "var(--color-bg-card)", border: "0.5px solid var(--color-border)", borderRadius: 8, padding: 32, display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ background: "var(--color-bg-surface)", borderRadius: 6, overflow: "hidden", marginBottom: 24, aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-muted)", textAlign: "center", padding: 16 }}>[PLACEHOLDER: The Salima]</span>
                </div>
                <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: 24, color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 8 }}>The Salima</h3>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-accent)", letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>shared 2-bedroom · 2 spaces available</p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-text-body)", lineHeight: 1.7, marginBottom: 24 }}>
                  the most connected option — a shared 2-bedroom suite. book with a friend or be paired with a like-minded woman in the group.
                </p>
                <div style={{ marginTop: "auto" }}>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 32, color: "var(--color-accent)", fontWeight: 400, marginBottom: 4 }}>$3,200</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-body)", marginBottom: 24 }}>per person / shared occupancy</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <a href="https://buy.stripe.com/00wfZi4jCggdfdw3iS0sU0a" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "12px 24px", background: "#C39E88", color: "#2D2521", fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 700, letterSpacing: "0.04em", textDecoration: "none", textAlign: "center", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "#b08d78")} onMouseLeave={(e) => (e.currentTarget.style.background = "#C39E88")}>
                      reserve my spot →
                    </a>
                    <a href="https://buy.stripe.com/eVq5kE9DW8NL8P8g5E0sU0b" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "12px 24px", border: "1px solid var(--color-accent)", color: "var(--color-accent)", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textDecoration: "none", textAlign: "center", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--color-accent) 10%, transparent)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      reserve with $1,000 deposit →
                    </a>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-body)", textAlign: "center", marginTop: 8, fontStyle: "italic" }}>*balance to be paid in full 30 days prior to retreat start date</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

          </div>
        </div>
        <style>{`@media(max-width:900px){.rooms-grid{grid-template-columns:1fr!important}} @media(max-width:640px){.mobile-break{display:block}}`}</style>
      </section>

      {/* SECTION 9 — FAQ */}
      <section style={{ background: "#F5F1E6", padding: "80px 32px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-accent)", letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center", marginBottom: 16 }}>everything you need to know</p>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", textAlign: "center", fontWeight: 700, marginBottom: 56 }}>
              Questions
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ borderTop: "0.5px solid var(--color-border)" }}>
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </FadeIn>
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

      {/* SECTION 10 — CLOSING CTA */}
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
              seven days.<br />one ancient land.<br />the version of you<br />you&apos;ve been waiting to meet.
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
