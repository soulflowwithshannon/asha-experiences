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
    blurb: "the plane lands, the noise falls away, and something in your shoulders finally drops.",
    items: [
      "private transport in from Nairobi",
      "settle into camp, meet the women you'll spend the week with",
      "welcome dinner under the stars, first circle",
    ],
  },
  {
    day: "02",
    title: "roots",
    blurb: "before you can open up, you have to land somewhere. this is where you land.",
    items: [
      "yoga and journaling overlooking the plains",
      "grounding workshop — why you're really here",
      "sunset safari drive",
    ],
  },
  {
    day: "03",
    title: "open plains",
    blurb: "nothing to perform out here. just space, and what rises to fill it.",
    items: [
      "full day in Ol Pejeta, wildlife encounters",
      "visit to the Northern White Rhino Sanctuary",
      "guided journaling as the light changes",
    ],
  },
  {
    day: "04",
    title: "into the wild",
    blurb: "the day the retreat is named for. this is the deep end.",
    items: [
      "powerful ceremony and guided women's circle",
      "sunset safari drive",
      "a fire, and whatever needs to be said around it",
    ],
  },
  {
    day: "05",
    title: "still water",
    blurb: "after the deep end, you float. integration, not another lesson.",
    items: [
      "slower morning, gentle movement",
      "visit to Spinners and Weavers",
      "rest built into the day on purpose",
    ],
  },
  {
    day: "06",
    title: "the fire",
    blurb: "the week starts to close, and everyone can feel it.",
    items: [
      "picnic in the wild",
      "traditional Kenyan cooking class with your hosts",
      "closing ceremony and circle",
    ],
  },
  {
    day: "07",
    title: "carry it home",
    blurb: "not an ending. just the part where you take it with you.",
    items: [
      "sunrise farewell",
      "private transport back to Nairobi",
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

function ExpandableCard({ img, title, body }: { img: string; title: string; body: ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div style={{ background: "var(--color-bg-page)", border: "0.5px solid var(--color-border)", borderRadius: 10, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
      <div style={{ position: "relative", aspectRatio: "4/3", flexShrink: 0, overflow: "hidden" }}>
        <Image src={img} alt={title} fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      <div style={{ padding: "20px 24px 24px", textAlign: "center", display: "flex", flexDirection: "column", flex: 1 }}>
        <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 18, color: "var(--color-text-headline)", marginBottom: 10 }}>{title}</p>
        <p style={{
          fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-text-body)", lineHeight: 1.8,
          display: "-webkit-box", WebkitLineClamp: expanded ? "unset" : 4, WebkitBoxOrient: "vertical" as const, overflow: expanded ? "visible" : "hidden",
        }}>{body}</p>
        <button onClick={() => setExpanded(!expanded)} style={{ marginTop: 8, background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--color-accent)", letterSpacing: "0.03em", padding: 0, alignSelf: "center" }}>
          {expanded ? "read less →" : "read more →"}
        </button>
      </div>
    </div>
  );
}

function KenyaHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section ref={ref} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
      <motion.div style={{ position: "absolute", inset: "-20%", y }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(45,37,33,0.3), rgba(45,37,33,0.6))", zIndex: 1 }} />
        <Image
          src="/images/Into the Wild Hero.jpg"
          alt="Into the Wild — Ol Pejeta Conservancy, Kenya"
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
          November 28 – December 4, 2027
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: "easeInOut" }}
          style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(52px,8vw,80px)", color: "#F1F0E5", fontWeight: 700, marginBottom: 16 }}
        >
          Into the Wild
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeInOut" }}
          style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(22px,3vw,34px)", color: "#F1F0E5", fontWeight: 700, fontStyle: "italic", marginBottom: 28, marginTop: -6 }}
        >
          Ol Pejeta Conservancy, Kenya
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
          style={{ fontFamily: "var(--font-dm-sans)", fontSize: "clamp(15px,2.2vw,22px)", color: "#E8D5BC", maxWidth: 900, margin: "80px auto 0", lineHeight: 1.7, fontWeight: 700, textShadow: "0 2px 12px rgba(0,0,0,0.5)", textAlign: "center" }}
        >
          seven days in one of the most<span className="kenya-hero-break"> </span>extraordinary places on earth.
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

const b = (text: string) => <strong style={{ fontWeight: 600 }}>{text}</strong>;

const faqs: { question: string; answer: ReactNode }[] = [
  {
    question: "what do I need for traveling to Kenya?",
    answer: (
      <div>
        <p style={{ marginBottom: 24 }}>here&apos;s a quick overview — we&apos;ll send you a full pre-travel guide once you&apos;re booked.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Visa */}
          <div>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>Visa</p>
            <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>most travelers need a Kenyan evisa, applied for online — simple process, around $50. we&apos;ll walk you through it step by step.</li>
            </ul>
          </div>

          {/* Vaccines & Mosquitoes */}
          <div>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>Vaccines & Mosquitoes</p>
            <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>if you&apos;ve traveled through certain countries in the last 6 months (even with a layover), a yellow fever vaccination card may be required.</li>
              <li>check with your healthcare provider or airline if you&apos;re unsure.</li>
              <li>no additional vaccines are required for entry into Kenya.</li>
              <li>the retreat is located at high elevation with cool, dry air — mosquitoes are not a concern and malaria is not a risk in this region.</li>
              <li>as always, consult your healthcare provider for personal recommendations.</li>
            </ul>
          </div>

          {/* Travel Insurance */}
          <div>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>Travel Insurance</p>
            <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>not required but highly recommended.</li>
              <li>we suggest World Nomads or SafetyWing — both cover medical emergencies and trip interruptions.</li>
              <li>cost is typically $50–100 for the duration of the trip.</li>
            </ul>
          </div>

          {/* Passport */}
          <div>
            <p style={{ fontWeight: 600, marginBottom: 8 }}>Passport</p>
            <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>ensure your passport is valid for at least 6 months beyond your travel dates.</li>
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
        <p style={{ marginBottom: 16 }}>fly into Jomo Kenyatta International Airport (NBO) in Nairobi, Kenya.</p>
        <p style={{ marginBottom: 8 }}><strong style={{ fontWeight: 600 }}>Arrive:</strong> group transport to Ol Pejeta Conservancy departs the morning of November 28th — we recommend arriving in Nairobi at least one day before.</p>
        <p><strong style={{ fontWeight: 600 }}>Depart:</strong> group transport back to Nairobi is provided on December 4th.</p>
      </div>
    ),
  },
  {
    question: "can dietary restrictions be accommodated?",
    answer: <p>yes. the retreat center can accommodate most dietary preferences — vegetarian, vegan, gluten-free, and dairy-free. we&apos;ll ask for your dietary needs after booking.</p>,
  },
  {
    question: "what's the vibe of the group?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>intimate. we cap it at 10 women.</p>
        <p style={{ marginBottom: 12 }}>you&apos;ll find a mix — late 20s to 50s, all coming from different places in life. some are mid-heartbreak, some are pivoting careers, some are deep in motherhood, some just need a few days that are entirely their own. there&apos;s always the same thing underneath it all — a readiness to actually show up for themselves.</p>
        <p>by day two, you&apos;d never guess they were strangers.</p>
      </div>
    ),
  },
  {
    question: "do I have to come with a friend or know someone?",
    answer: <p>not at all. most women come solo — and many say the sisterhood they found was the most unexpected gift. this space is designed to make you feel safe, welcome, and deeply connected from day one.</p>,
  },
  {
    question: "will there be free time?",
    answer: <p>absolutely. this retreat blends guided experiences with spaciousness so you can rest, reflect, or connect as you need. your energy is honored every step of the way.</p>,
  },
  {
    question: "can I arrive early or stay longer in Kenya?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>yes, and we recommend it.</p>
        <p style={{ marginBottom: 12 }}>the official retreat runs November 28 – December 4, 2027. we suggest arriving the night before (November 27) and staying in Nairobi — we&apos;ll all take transport together to the retreat on the 28th. return transport back to Nairobi on December 4 is included.</p>
        <p>want to arrive a few days early to explore Nairobi or ease into the time difference? we can coordinate that with the group. want to stay on longer or extend your trip elsewhere? just reach out — we&apos;ll figure it out together.</p>
      </div>
    ),
  },
  {
    question: "do you offer payment plans?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>yes. we want this to feel accessible and spacious.</p>
        <p style={{ marginBottom: 12 }}>you can secure your spot with a $1,000 deposit today. this officially reserves your place and gives you access to a flexible payment plan, with remaining payments spread out over the coming months.</p>
        <p>on the payment page, simply choose the deposit option instead of paying in full, and we&apos;ll work with you from there.</p>
      </div>
    ),
  },
  {
    question: "what's the cancellation policy?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>we understand that life happens — and we also need to honor the commitment and planning that goes into creating this retreat.</p>
        <p style={{ marginBottom: 12 }}>the $1,000 deposit is non-refundable, as it secures your spot and covers upfront retreat costs. if you need to cancel after paying more than the deposit, any additional payments may be transferable to another woman if you find someone to take your place (with our approval).</p>
        <p>we highly recommend purchasing travel insurance to protect your investment. if something comes up, please reach out to us as soon as possible.</p>
      </div>
    ),
  },
];

export default function KenyaPage() {
  return (
    <main>
      {/* SECTION 1 — HERO */}
      <KenyaHero />

      {/* SECTION 2 — INVITATION */}
      <section id="invitation" style={{ background: "var(--color-bg-page)", padding: "80px 32px" }}>
        <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center", fontFamily: "var(--font-dm-sans)", fontSize: 16, color: "var(--color-text-body)", lineHeight: 1.9 }}>
          <StaggerBlock>
            <StaggerChild>
              <p style={{ marginBottom: 28 }}>
                you&apos;ve been the one <strong>holding it together</strong> for so long,<br />
                you don&apos;t even remember what it feels like to put it down.<br />
                because somewhere along the way,<br />
                letting go started to feel like losing.
              </p>
            </StaggerChild>
            <StaggerChild>
              <p style={{ marginBottom: 28 }}>
                so you plan.<br />
                you prepare.<br />
                you stay one step ahead of everything that might catch you off guard.<br /><br />
                <em>and it works.</em><br />
                <strong>until it doesn&apos;t.</strong>
              </p>
            </StaggerChild>
            <StaggerChild>
              <p style={{ marginBottom: 40 }}>
                until you&apos;re <u>exhausted by your own competence</u>{" "}and quietly starving for something you can&apos;t organize your way into.
              </p>
            </StaggerChild>

            {/* Divider 1 */}
            <StaggerChild>
              <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 0 40px" }}>
                <div style={{ flex: 1, height: "0.5px", background: "#D4C8AA" }} />
                <span style={{ color: "#A67C52", fontSize: 14 }}>✦</span>
                <div style={{ flex: 1, height: "0.5px", background: "#D4C8AA" }} />
              </div>
            </StaggerChild>

            <StaggerChild>
              <p style={{ marginBottom: 28 }}>
                <strong>kenya doesn&apos;t care about your plans.</strong>
                <br /><br />
                the lion moves when she wants to move.<br />
                the sun sets and still rises.<br />
                the land is proof that <u>the most extraordinary things on earth are not controlled by anyone.</u>
              </p>
            </StaggerChild>
            <StaggerChild>
              <p style={{ marginBottom: 40 }}>
                and something about being inside that — <em>really inside it,</em><br />
                <em>not watching it through a screen —</em> <strong>cracks something open.</strong><br />
                the need to manage.<br />
                to anticipate.<br />
                to stay ready. it just... loosens.<br />
                <em>maybe for the first time in years.</em>
              </p>
            </StaggerChild>

            {/* Divider 2 */}
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
                <em>there is no inbox.</em><br />
                <em>no algorithm.</em><br />
                no performance of a life that looks good from the outside.
              </p>
            </StaggerChild>
            <StaggerChild>
              <p style={{ marginBottom: 28 }}>
                there is just <strong>90,000 acres of open savannah</strong> and you,<br />
                standing in the middle of it,<br />
                realizing your nervous system has been waiting your whole life to feel this.
              </p>
            </StaggerChild>
            <StaggerChild>
              <p style={{ marginBottom: 0 }}>
                <strong><u>present.</u></strong><br />
                <strong><u>free.</u></strong><br />
                <strong><u>awake.</u></strong><br />
                this is what it feels like to be <em>alive outside of it all.</em>
                <br /><br />
                and once you feel it — <em>really feel it —</em> <strong>you can&apos;t unfeel it.</strong>
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
              how do we<span className="mobile-break"> </span>call her home?
            </h2>
          </FadeIn>

          {/* Row 1 — 2 cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12, alignItems: "stretch" }} className="cards-row">
            {[
              {
                img: "/images/5.png",
                title: "step into your body, fully",
                body: <>through yoga, somatic practice, and movement<br />that wakes up what went quiet.<br /><br />your body knows how to feel alive —<br />it just needs permission and space</>,
              },
              {
                img: "/images/Tanzania.jpeg",
                title: "let the land be your mirror",
                body: <>sunrise safari drives through open plains.<br />golden hour with lion trackers who&apos;ve walked<br />this land their whole lives.<br /><br /><em>wildlife that doesn&apos;t perform or pretend —<br />it just exists, fully, without apology.</em><br /><br />something about watching that<br />makes you want to do the same.</>,
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <ExpandableCard img={card.img} title={card.title} body={card.body} />
              </FadeIn>
            ))}
          </div>

          {/* Row 2 — solo dark card */}
          <FadeIn delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderRadius: 10, overflow: "hidden", marginBottom: 12, background: "#2D2521" }} className="solo-card">
              <div style={{ position: "relative", minHeight: 340 }}>
                <Image src="/images/baskets and weavers.jpg" alt="Baskets and weavers" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="33vw" />
              </div>
              <div style={{ padding: 40, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center" }}>
                <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 20, color: "#F1F0E5", marginBottom: 16 }}>be part of something that matters</p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "#C5AA9B", lineHeight: 1.8 }}>
                  a visit to the <strong style={{ color: "#F1F0E5" }}>northern white rhino sanctuary</strong> —<br />
                  <em>the only two left on earth.</em><br /><br />
                  a morning with <strong style={{ color: "#F1F0E5" }}>spinners and weavers</strong>,<br />
                  a women&apos;s cooperative that has been<br />
                  <u style={{ textDecorationColor: "#A67C52" }}>refusing to disappear since the 1970s.</u><br /><br />
                  standing beside that kind of resilience<br />
                  does something to you.<br />
                  <em>it reminds you what&apos;s actually possible<br />when you stop shrinking.</em>
                </p>
              </div>
              <div style={{ position: "relative", minHeight: 340 }}>
                <Image src="/images/rhino conservation.jpg" alt="Rhino conservation" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="33vw" />
              </div>
            </div>
          </FadeIn>

          {/* Row 3 — 2 cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, alignItems: "stretch" }} className="cards-row">
            {[
              {
                img: "/images/ReturnToLove circle.jpg",
                title: "go underneath the surface",
                body: <>ashley&apos;s sound healing and reiki.<br />women&apos;s circles held under open sky.<br />ceremony that reaches <u>the layer<br />the everyday world never touches.</u><br /><br /><em>not therapy. not a workshop.</em><br /><strong>something older than both.</strong><br /><br />the part of you that&apos;s been waiting<br />to finally be heard.</>,
              },
              {
                img: "/images/women laying down.jpeg",
                title: "let yourself be found by each other",
                body: <>you will arrive not knowing anyone.<br />by day three, these women will know things<br />about you that your oldest friends don&apos;t.<br /><br /><em>that&apos;s not an accident.</em><br />that&apos;s what happens when you take<br />the performance away<br />and <strong>just let yourself be seen.</strong><br /><br />in a place this wild,<br /><em>it happens faster than you&apos;d think.</em></>,
              },
            ].map((card, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <ExpandableCard img={card.img} title={card.title} body={card.body} />
              </FadeIn>
            ))}
          </div>

        </div>
        <style>{`@media(max-width:640px){.testimonial-break{display:block}}@media(max-width:768px){.cards-row{grid-template-columns:1fr!important}.solo-card{grid-template-columns:1fr!important}.mobile-break{display:block}.kenya-hero-break{display:block}}`}</style>
      </section>


      {/* SECTION 3 — WHERE WE'RE STAYING */}
      <section style={{ background: "var(--color-bg-surface)", padding: "80px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", maxWidth: 1280, margin: "0 auto" }} className="stay-grid">
          <div className="stay-video" style={{ position: "relative", borderRadius: 8, overflow: "hidden", aspectRatio: "4/5" }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% center", display: "block", position: "absolute", inset: 0 }}
            >
              <source src="https://pub-2741403aca194491b445876d4a738ef8.r2.dev/videos/Ol%20Pejeta%20Sizzle%20Reel.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="stay-copy" style={{ maxWidth: 512 }}>
            <FadeIn><p className="eyebrow-accent" style={{ marginBottom: 16, fontWeight: 700 }}>OL PEJETA CONSERVANCY</p></FadeIn>
            <FadeIn delay={0.1}>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 24 }}>
                wild outside. held inside.
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: 20 }}>
                <p>
                  picture <strong>90,000 acres</strong> at the base of <strong>Mount Kenya</strong>. open plains, acacia woodlands, <em>the big 5 roaming outside your door</em>, and night skies that make the rest of the world feel very far away.
                </p>
                <p>
                  <strong>Ol Pejeta</strong> is one of the most extraordinary places on earth — <em>the largest black rhino sanctuary in East Africa</em>, with an active program bringing the white rhino population back. food sourced locally, staff genuinely cared for, animals looked after the way they should be.
                </p>
                <p>
                  <strong>your money goes somewhere that matters here.</strong> <em>this is conservation done right.</em>
                </p>
                <p>
                  inside the conservancy, <strong>Ol Pejeta Safari Cottages</strong> has been recognised as one of the{" "}
                  <span style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>top 10% of hotels in the world</span>{" "}
                  by TripAdvisor — and you&apos;ll understand why the moment you arrive.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
        <style>{`@media(max-width:768px){.stay-grid{grid-template-columns:1fr!important}.stay-video{margin:0 auto;width:100%}.stay-copy{margin:0 auto;width:90%;padding:32px 24px;text-align:center}.stay-copy p,.stay-copy h2,.stay-copy div,.stay-copy span{text-align:center}}`}</style>
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
                <strong>Into the Wild gives you back what the noise took.</strong>
              </p>
              <p>
                <em>the knowing.</em><br />
                <em>the presence.</em><br />
                <em>the feeling that life is supposed<br />to feel wild and free.</em>
              </p>
              <p>
                you take that home.<br />
                into the chaos, the routine,<br />
                the world that will be exactly<br />
                as you left it.
              </p>
              <p>
                <strong>except you won&apos;t be.</strong>
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 4b — PHOTO GALLERY STRIP */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", height: 560 }}>
        {[
          { src: "/images/kenya-safari-jeep.JPG", alt: "Safari at sunset", pos: "60% center" },
          { src: "/images/kenya-elephant-plains.jpeg", alt: "Elephant on the plains", pos: "50% 80%" },
          { src: "/images/IMG_3437.JPG", alt: "Group on safari jeep", pos: "50% 40%" },
        ].map((img) => (
          <motion.div
            key={img.src}
            style={{ position: "relative", overflow: "hidden" }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover", objectPosition: img.pos, transition: "transform 0.6s ease" }} sizes="33vw" />
          </motion.div>
        ))}
      </div>

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
                    <><strong>7 days / 6 nights</strong> of luxury retreat in <em>Ol Pejeta Conservancy</em></>,
                    <>private ground transport <strong>to/from Nairobi</strong></>,
                    <>all <strong>fresh, locally sourced</strong> chef-prepared meals and beverages</>,
                    <><strong>daily sunrise and sunset safari drives</strong> with expert guides</>,
                    <>yoga, meditation, and journaling <em>overlooking the safari plains</em></>,
                    <><strong>powerful workshops, ceremonies, and guided women&apos;s circles</strong></>,
                    <>visit to the <strong>Northern White Rhino Sanctuary</strong></>,
                    <>visit to <strong>Spinners and Weavers</strong></>,
                    <><strong>traditional Kenyan cooking class</strong> with our hosts</>,
                    <><em>unforgettable wildlife encounters</em> in their natural habitat</>,
                  ] as React.ReactNode[]).map((item, i) => (
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
                    <><strong>flights</strong> to/from Nairobi, Kenya</>,
                    <>hotel stay in Nairobi before the retreat <em>(recommended — we&apos;ll share our favorites)</em></>,
                    <><strong>travel insurance</strong> <em>(recommended)</em></>,
                    <>souvenirs</>,
                    <><strong>Kenya visa</strong> <em>(around $50 USD)</em></>,
                    <><strong>gratuities</strong> for local staff + guides <em>(suggested $100–$200 total — goes a long way)</em></>,
                  ] as React.ReactNode[]).map((item, i) => (
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
          <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", textAlign: "center", fontWeight: 700, marginBottom: 48 }}>
            women who came<span className="testimonial-break"> </span>back different
          </h2>
          <FadeIn delay={0.1}>
            <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", borderRadius: 8, overflow: "hidden" }}>
              {/* Warm overlay to match site tone */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "rgba(166, 124, 82, 0.08)",
                mixBlendMode: "multiply",
                zIndex: 1,
                pointerEvents: "none",
                borderRadius: 8,
              }} />
              <video
                controls
                style={{
                  width: "100%",
                  display: "block",
                  borderRadius: 8,
                  filter: "sepia(18%) saturate(90%) brightness(97%) contrast(103%)",
                }}
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
            <div style={{ borderRadius: 8, overflow: "hidden", aspectRatio: "3/4", maxWidth: 420, margin: "0 auto 48px", position: "relative" }}>
              <Image src="/images/kenya-women-tent.JPG" alt="Shannon Tomascak and Ashley Scully at safari tent" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="700px" />
            </div>
          </FadeIn>
          <SplitHeadline
            text="your home in the wild"
            as="h2"
            style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", textAlign: "center", fontWeight: 700, marginBottom: 48 }}
          />

          <FadeIn delay={0.2}>
            <div style={{ maxWidth: 620, margin: "0 auto 48px", textAlign: "center", display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.8 }}>
                <em>while solo occupancy is not available due to limited capacity, both room options are beautifully designed and thoughtfully appointed.</em>
              </p>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.8 }}>
                <strong>book with a friend</strong> or be paired with a like-minded woman in your group.
              </p>
            </div>
          </FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }} className="rooms-grid">
            {/* One Bedroom Cottage */}
            <FadeIn>
              <motion.div whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(74,63,53,0.12)" }} transition={{ duration: 0.3 }} style={{ background: "var(--color-bg-card)", border: "0.5px solid var(--color-border)", borderRadius: 8, padding: 40, display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gridTemplateRows: "1fr 1fr", gap: 4, borderRadius: 6, overflow: "hidden", marginBottom: 24, aspectRatio: "8/5" }}>
                  <div style={{ position: "relative", gridRow: "1 / 3" }}>
                    <Image src="/images/one bedroom cottage.jpg" alt="One bedroom cottage" fill style={{ objectFit: "cover" }} sizes="400px" />
                  </div>
                  <div style={{ position: "relative" }}>
                    <Image src="/images/one bedroom cottage outside.jpg" alt="One bedroom cottage exterior" fill style={{ objectFit: "cover" }} sizes="200px" />
                  </div>
                  <div style={{ position: "relative" }}>
                    <Image src="/images/one bedroom cottage lounge.jpg" alt="One bedroom cottage lounge" fill style={{ objectFit: "cover" }} sizes="200px" />
                  </div>
                </div>
                <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: 28, color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 12 }}>the one bedroom cottage</h3>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-text-body)", lineHeight: 1.7, marginBottom: 24 }}>
                  the most private option, shared with one other woman.
                  <br /><br />
                  enjoy a cozy living and dining room, ensuite bathroom and comfortable verandah; the ideal spot to lounge on in the afternoon with a cup of tea and a good book whilst the elephants rumble through the bushes near by.
                </p>
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--color-accent)", letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>all cottages include</p>
                  <ul style={{ listStyle: "disc", paddingLeft: 18, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                    {[
                      "flexible bed arrangements (2 twin beds or king size)",
                      "ensuite bathrooms with walk-in showers",
                      "hot and cold running water",
                      "bathroom utilities — shampoo, conditioner, and fabric detergent",
                      "drinking water and water bottles",
                      "solar powered electricity to charge your devices",
                      "basic wifi",
                      "access to viewing decks for private bush meals",
                    ].map((item, i) => (
                      <li key={i} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-body)", lineHeight: 1.6 }}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: 8 }}>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 36, color: "var(--color-accent)", fontWeight: 400, marginBottom: 4 }}>$7,500</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-body)", marginBottom: 24 }}>per person / shared occupancy</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {/* STRIPE LINK: one bedroom cottage - pay in full */}
                    <a href="https://buy.stripe.com/dRm5kEg2k9RPe9s5r00sU00" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "12px 24px", border: "1px solid var(--color-accent)", color: "var(--color-accent)", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textDecoration: "none", textAlign: "center", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--color-accent) 10%, transparent)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      pay in full →
                    </a>
                    {/* STRIPE LINK: one bedroom cottage - $1,000 deposit */}
                    <a href="https://buy.stripe.com/00w3cw7vO3traXg8Dc0sU01" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "12px 24px", border: "1px solid var(--color-accent)", color: "var(--color-accent)", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textDecoration: "none", textAlign: "center", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--color-accent) 10%, transparent)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      reserve with $1,000 deposit →
                    </a>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-body)", textAlign: "center", marginTop: 8, fontStyle: "italic" }}>*balance to be paid in full 60 days prior to retreat start date</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>

            {/* Two Bedroom Cottage */}
            <FadeIn delay={0.15}>
              <motion.div whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(74,63,53,0.12)" }} transition={{ duration: 0.3 }} style={{ background: "var(--color-bg-card)", border: "0.5px solid var(--color-border)", borderRadius: 8, padding: 40, display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gridTemplateRows: "1fr 1fr", gap: 4, borderRadius: 6, overflow: "hidden", marginBottom: 24, aspectRatio: "8/5" }}>
                  <div style={{ position: "relative", gridRow: "1 / 3" }}>
                    <Image src="/images/two bedroom cottage lounge 2.jpg" alt="Two bedroom cottage lounge" fill style={{ objectFit: "cover" }} sizes="400px" />
                  </div>
                  <div style={{ position: "relative" }}>
                    <Image src="/images/two bedroom cottage.jpg" alt="Two bedroom cottage" fill style={{ objectFit: "cover" }} sizes="200px" />
                  </div>
                  <div style={{ position: "relative" }}>
                    <Image src="/images/two bedroom cottage lounge.jpg" alt="Two bedroom cottage lounge" fill style={{ objectFit: "cover" }} sizes="200px" />
                  </div>
                </div>
                <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: 28, color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 12 }}>the two bedroom cottage</h3>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-text-body)", lineHeight: 1.7, marginBottom: 24 }}>
                  the more connected option, shared with 3 other women.
                  <br /><br />
                  two bedroom cottages have spacious rooms and ensuite bathrooms flanking a large living area, dining room, and a verandah spreading across the length of the building.
                </p>
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--color-accent)", letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>all cottages include</p>
                  <ul style={{ listStyle: "disc", paddingLeft: 18, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                    {[
                      "flexible bed arrangements (2 twin beds or king size)",
                      "ensuite bathrooms with walk-in showers",
                      "hot and cold running water",
                      "bathroom utilities — shampoo, conditioner, and fabric detergent",
                      "drinking water and water bottles",
                      "solar powered electricity to charge your devices",
                      "basic wifi",
                      "access to viewing decks for private bush meals",
                    ].map((item, i) => (
                      <li key={i} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-body)", lineHeight: 1.6 }}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div style={{ marginTop: 8 }}>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 36, color: "var(--color-accent)", fontWeight: 400, marginBottom: 4 }}>$6,900</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-body)", marginBottom: 24 }}>per person / shared occupancy</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {/* STRIPE LINK: two bedroom cottage - pay in full */}
                    <a href="https://buy.stripe.com/3cIaEY03mfc9d5o4mW0sU02" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "12px 24px", border: "1px solid var(--color-accent)", color: "var(--color-accent)", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textDecoration: "none", textAlign: "center", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--color-accent) 10%, transparent)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      pay in full →
                    </a>
                    {/* STRIPE LINK: two bedroom cottage - $1,000 deposit */}
                    <a href="https://buy.stripe.com/aFa7sMdUc9RP2qK3iS0sU03" target="_blank" rel="noopener noreferrer" style={{ display: "block", padding: "12px 24px", border: "1px solid var(--color-accent)", color: "var(--color-accent)", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textDecoration: "none", textAlign: "center", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--color-accent) 10%, transparent)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      reserve with $1,000 deposit →
                    </a>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-body)", textAlign: "center", marginTop: 8, fontStyle: "italic" }}>*balance to be paid in full 60 days prior to retreat start date</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          </div>
        </div>
        <style>{`@media(max-width:768px){.rooms-grid{grid-template-columns:1fr!important}} @media(max-width:640px){.mobile-break{display:block}}`}</style>
      </section>

      {/* SECTION 8 — FAQ */}
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
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <ParallaxImage src="/images/kenya-dinner.JPG" alt="Candlelit dinner on the safari plains" height="100%" objectPosition="center" sizes="100vw" />
          <div style={{ position: "absolute", inset: 0, background: "rgba(30,22,18,0.65)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(26px,4vw,40px)", color: "#F1F0E5", fontWeight: 700, marginBottom: 40 }}>
              something is calling you <em>here</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 17, color: "#BAAB92", maxWidth: 480, margin: "0 auto 40px" }}>
              ten women.<br />seven days.<br />one place that changes everything.
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
