"use client";
import ListIcon from "@/components/ListIcon";
import { IdentificationCard, Syringe, ShieldCheck, Airplane, Shower, Drop, Sparkle, Jar, PlugCharging, WifiMedium, Binoculars } from "@phosphor-icons/react";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, ReactNode } from "react";
import FadeIn from "@/components/FadeIn";
import CallHerHome from "@/components/CallHerHome";
import VideoPair from "@/components/VideoPair";
import { CALENDAR_URL } from "@/components/MeetUs";
import FaqJsonLd from "@/components/FaqJsonLd";
import StillDeciding from "@/components/StillDeciding";
import { SplitHeadline, StaggerBlock, StaggerChild } from "@/components/AnimatedText";

const daysData = [
  {
    day: "01",
    description: "private transport in from Nairobi, then you settle in and meet the women you'll spend the week with. welcome dinner under the stars, and our first circle.",
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
    description: "yoga and journaling overlooking the plains, then a grounding workshop on why you're really here. the day ends with a sunset safari drive.",
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
    description: "a full day out in Ol Pejeta with the wildlife, including the Northern White Rhino Sanctuary. guided journaling as the light changes.",
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
    description: "the deep end: a ceremony and guided women's circle, a sunset safari drive, then a fire and whatever needs to be said around it.",
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
    description: "a slower morning with gentle movement, and a visit to Spinners and Weavers. rest is built into the day on purpose.",
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
    description: "a picnic in the wild, a traditional Kenyan cooking class with your hosts, then the closing ceremony and circle.",
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
    description: "a sunrise farewell, then private transport back to Nairobi.",
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
          <div style={{ flexShrink: 0, width: 180, height: "100%", boxSizing: "border-box", border: "1px solid var(--color-border)", borderRadius: 8, padding: "28px 24px", textAlign: "center", cursor: "default", transition: "background 0.2s ease", background: hovered === i ? "#EDE4D0" : "var(--color-bg-surface)" }}>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.1em", color: "var(--color-accent)", textTransform: "uppercase", marginBottom: 8 }}>DAY {d.day}</p>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 20, color: "var(--color-text-headline)" }}>{d.title}</p>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12.5, lineHeight: 1.55, color: "var(--color-text-body)", marginTop: 10 }}>{d.description}</p>
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

// activities come from the itinerary and included list; times are loose on
// purpose until the real schedule is confirmed
const typicalDay = [
  { time: "sunrise", what: "game drive with your guides" },
  { time: "after the drive", what: "breakfast" },
  { time: "mid-morning", what: "yoga, meditation and journaling overlooking the plains" },
  { time: "late morning", what: "a workshop, ceremony or women's circle" },
  { time: "midday", what: "lunch" },
  { time: "late afternoon", what: "sunset game drive" },
  { time: "evening", what: "a long dinner, and the fireside" },
];

function TypicalDay() {
  return (
    <section style={{ background: "var(--color-bg-page)", padding: "0 32px 88px" }}>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <FadeIn>
          <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(24px,3.4vw,32px)", color: "var(--color-text-headline)", textAlign: "center", fontWeight: 700, marginBottom: 32 }}>
            a typical day
          </h3>
        </FadeIn>
        <FadeIn delay={0.1}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "0.5px solid var(--color-border)" }}>
            {typicalDay.map((row, i) => (
              <li key={i} className="typical-row" style={{ display: "grid", gridTemplateColumns: "130px 1fr", gap: 16, padding: "14px 0", borderBottom: "0.5px solid var(--color-border)", fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.6, color: "var(--color-text-body)" }}>
                <span style={{ color: "var(--color-accent)", fontWeight: 600 }}>{row.time}</span>
                <span>{row.what}</span>
              </li>
            ))}
          </ul>
          <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 20, color: "var(--color-text-headline)", textAlign: "center", marginTop: 28 }}>
            afternoons are mostly yours.
          </p>
        </FadeIn>
      </div>
      <style>{`@media(max-width:520px){.typical-row{grid-template-columns:1fr!important;gap:2px!important}}`}</style>
    </section>
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
        <p
          className="hero-rise-sm"
          style={{ animationDuration: "0.8s", animationDelay: "0s", fontFamily: "var(--font-cormorant)", fontSize: "clamp(22px,3vw,34px)", color: "#E8B88A", fontWeight: 400, marginBottom: 20 }}
        >
          November 28 – December 4, 2027
        </p>
        <h1
          className="hero-rise"
          style={{ animationDuration: "1s", animationDelay: "0.1s", fontFamily: "var(--font-heading)", fontSize: "clamp(52px,8vw,80px)", color: "#F1F0E5", fontWeight: 700, marginBottom: 16 }}
        >
          Into the Wild
        </h1>
        <p
          className="hero-rise-sm"
          style={{ animationDuration: "0.8s", animationDelay: "0.15s", fontFamily: "var(--font-cormorant)", fontSize: "clamp(22px,3vw,34px)", color: "#F1F0E5", fontWeight: 700, fontStyle: "italic", marginBottom: 28, marginTop: -6 }}
        >
          Ol Pejeta Conservancy, Kenya
        </p>
        <p
          className="hero-rise"
          style={{ animationDuration: "1s", animationDelay: "0.2s", fontFamily: "var(--font-dm-sans)", fontSize: "clamp(15px,2.2vw,22px)", color: "#E8D5BC", maxWidth: 900, margin: "80px auto 0", lineHeight: 1.7, fontWeight: 700, textShadow: "0 2px 12px rgba(0,0,0,0.5)", textAlign: "center" }}
        >
          seven days in one of the most<span className="kenya-hero-break"> </span>extraordinary places on earth.
        </p>
        <div className="hero-rise" style={{ animationDuration: "1s", animationDelay: "0.3s", marginTop: 60 }}>
          <a
            href="#week"
            style={{ display: "inline-block", padding: "14px 36px", background: "rgba(195,158,136,0.85)", border: "1px solid #C39E88", color: "#2D2521", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textDecoration: "none", fontWeight: 500, transition: "background 0.3s ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#C39E88")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(195,158,136,0.85)")}
          >
            see the week ↓
          </a>
        </div>
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
    question: "I've never done a retreat before — is that a problem?",
    answer: <p>most women who show up at our retreats haven&apos;t either. you don&apos;t need retreat experience. you need enough curiosity to say yes before you feel ready.</p>,
  },
  {
    question: "I'm in the middle of something really hard right now — a breakup, a loss, a big change. is this the right time, or should I wait until I'm more \"together\"?",
    answer: <p>this is usually exactly the right time. most women don&apos;t come to us after they&apos;ve healed — they come while they&apos;re still in it. you don&apos;t need to arrive with it figured out. that&apos;s not the prerequisite. showing up is.</p>,
  },
  {
    question: "I don't really \"do\" vulnerability. do I have to share personal stuff?",
    answer: <p>no. some women arrive ready to go deep on day one. others need the first day or two just to watch and feel safe before they open up, if they open up at all. both are welcome. nothing here is mandatory.</p>,
  },
  {
    question: "I never take time for myself. how do I even justify this?",
    answer: <p>we hear this from almost every woman who books. the ones who feel like they can&apos;t afford to take a week for themselves are usually the ones who need it most. this isn&apos;t selfish — it&apos;s the thing that lets you keep showing up for everyone else without running yourself empty.</p>,
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
    question: "is it safe for a woman traveling on her own?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>Nairobi is a big city, so treat it like one: stay at a hotel we recommend, use cars the hotel arranges, and keep valuables out of sight.</p>
        <p style={{ marginBottom: 12 }}>Ol Pejeta is a different world: 90,000 acres of conservancy, and whenever you&apos;re out on the land you&apos;re with expert guides. from the moment group transport leaves Nairobi, you&apos;re with us and the conservancy&apos;s guides the whole week.</p>
        <p>we meet you in Nairobi, and Ashley and Shannon are with you all week. if anything goes wrong, Ol Pejeta runs its own security and emergency response teams around the clock, and Nanyuki, the nearest town, has private hospital care within an hour of Ol Pejeta Safari Cottages. we strongly recommend travel insurance that covers medical evacuation.</p>
      </div>
    ),
  },
  {
    question: "what if my flight is late, or I've never been to Nairobi?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>land in Nairobi at least a day early. group transport to Ol Pejeta leaves the morning of November 28th, and an extra night gives a late flight room to be late.</p>
        <p>we&apos;ll recommend a hotel in Nairobi where we&apos;ll all stay together the night before. and if your flight is late and you miss the morning departure, another safe, secure shuttle will be waiting to bring you to Ol Pejeta.</p>
      </div>
    ),
  },
  {
    question: "I'll be sharing a room. how does that work?",
    answer: <p>two women to a bedroom, four to a cottage, each bedroom with its own bathroom. come with a friend, or meet someone before you go: we hold a Zoom call before the retreat so everyone can meet. otherwise, we&apos;ll pair you with a like-minded woman, based on the form you fill out when you book. solo rooms aren&apos;t available on this one.</p>,
  },
  {
    question: "how fit do I need to be?",
    answer: <p>you don&apos;t need to be especially fit. most of the week happens in safari vehicles, on the verandah and in circle, and the movement is yoga and gentle practice. Ol Pejeta sits at high elevation, so go easy on the first day.</p>,
  },
  {
    question: "what happens when I get home?",
    answer: <p>this is the part most retreats skip. we&apos;re building a community to keep you in touch with each other. every retreat has its own group chat, we schedule a follow-up Zoom call once everyone&apos;s home, and most women stay in touch on their own.</p>,
  },
  {
    question: "why does Kenya cost more than Morocco?",
    answer: <p>because it&apos;s a safari as well as a retreat. the price covers sunrise and sunset game drives every day with expert guides, conservancy fees that go back into Ol Pejeta&apos;s conservation work, a week at Ol Pejeta Safari Cottages, and private transport to and from Nairobi.</p>,
  },
  {
    question: "what do I need for traveling to Kenya?",
    answer: (
      <div>
        <p style={{ marginBottom: 24 }}>here&apos;s a quick overview — we&apos;ll send you a full pre-travel guide once you&apos;re booked.</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Visa */}
          <div>
            <p style={{ fontWeight: 600, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}><IdentificationCard aria-hidden="true" size={18} weight="light" color="var(--color-accent)" />Visa</p>
            <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>most travelers need a Kenyan evisa, applied for online — simple process, around $50. we&apos;ll walk you through it step by step.</li>
            </ul>
          </div>

          {/* Vaccines & Mosquitoes */}
          <div>
            <p style={{ fontWeight: 600, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}><Syringe aria-hidden="true" size={18} weight="light" color="var(--color-accent)" />Vaccines & Mosquitoes</p>
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
            <p style={{ fontWeight: 600, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}><ShieldCheck aria-hidden="true" size={18} weight="light" color="var(--color-accent)" />Travel Insurance</p>
            <ul style={{ listStyle: "disc", paddingLeft: 20, margin: 0, display: "flex", flexDirection: "column", gap: 6 }}>
              <li>not required but highly recommended.</li>
              <li>we suggest World Nomads or SafetyWing — both cover medical emergencies and trip interruptions.</li>
              <li>cost is typically $50–100 for the duration of the trip.</li>
            </ul>
          </div>

          {/* Passport */}
          <div>
            <p style={{ fontWeight: 600, marginBottom: 8, display: "flex", alignItems: "center", gap: 8 }}><Airplane aria-hidden="true" size={18} weight="light" color="var(--color-accent)" />Passport</p>
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
        <p style={{ marginBottom: 12 }}><strong style={{ fontWeight: 600 }}>Depart:</strong> group transport back to Nairobi is provided on December 4th.</p>
        <p>want to arrive a few days early to explore Nairobi or ease into the time difference, or stay on and extend your trip? just reach out and we&apos;ll plan it with you.</p>
      </div>
    ),
  },
  {
    question: "do you offer payment plans?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}>yes. hold your spot with a $1,000 deposit, then pay the remaining $5,900 over 11 monthly payments: ten payments of $536 and a final payment of $540. the full balance is due 30 days before the retreat (October 29, 2027), so the 11-month plan is for women who book by December 31, 2026. book later and we&apos;ll split the balance evenly over the months that are left.</p>
        <p>on the payment page, choose the deposit option and we&apos;ll set up your plan from there.</p>
      </div>
    ),
  },
  {
    question: "what's the cancellation policy?",
    answer: (
      <div>
        <p style={{ marginBottom: 12 }}><strong>all payments are non-refundable</strong> — including the $1,000 deposit and any balance paid. this covers accommodation, facilitators, and logistics we commit to well in advance on your behalf.</p>
        <p style={{ marginBottom: 12 }}>if your plans change, you can transfer your spot to another woman, or to a future ASHA retreat, up to 4 months before the retreat starts. just email us.</p>
        <p>we strongly recommend travel insurance to protect your investment.</p>
      </div>
    ),
  },

];

/* ---------- back half, consolidated (Nov 2026) ----------
   proof → the cottage (+ booking steps) → meet us (+ videos + call)
   → questions → closing, plus a sticky booking bar on phones. */

const TESTIMONIAL_VIDEO = "https://pub-2741403aca194491b445876d4a738ef8.r2.dev/videos/Testimonials.mp4";

function TestimonialVideo() {
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      {playing ? (
        <video controls autoPlay playsInline style={{ width: "100%", display: "block", borderRadius: 8 }}>
          <source src={TESTIMONIAL_VIDEO} type="video/mp4" />
        </video>
      ) : (
        <button onClick={() => setPlaying(true)} aria-label="play the testimonial video" style={{ position: "relative", display: "block", width: "100%", aspectRatio: "16/9", border: "none", padding: 0, borderRadius: 8, overflow: "hidden", cursor: "pointer", background: "#2D2521" }}>
          <Image src="/images/ReturnToLove group hug.jpg" alt="" fill sizes="720px" style={{ objectFit: "cover", opacity: 0.8 }} />
          <span style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: "linear-gradient(to top, rgba(45,37,33,0.65), rgba(45,37,33,0.1))" }}>
            <span style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--color-accent)", color: "#FFFCF5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, paddingLeft: 4 }}>▶</span>
            <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 600, color: "#FFFCF5", letterSpacing: "0.04em" }}>hear it from them</span>
          </span>
        </button>
      )}
    </div>
  );
}

const bookingSteps = [
  { title: "reserve your spot", body: "pay in full, or hold your spot with a $1,000 deposit." },
  { title: "you hear from us", body: "Ashley and Shannon reach out personally, ask about dietary needs and send your pre-travel guide." },
  { title: "we meet you in Nairobi", body: "group transport to Ol Pejeta is included, and we're with you all week." },
];

function BookingSteps() {
  return (
    <ol className="kenya-steps" style={{ listStyle: "none", padding: 0, margin: "48px auto 0", maxWidth: 1000, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
      {bookingSteps.map((st, i) => (
        <li key={st.title} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
          <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: "50%", border: "1px solid var(--color-accent)", color: "var(--color-accent)", fontFamily: "var(--font-cormorant)", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>{i + 1}</span>
          <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13.5, lineHeight: 1.6, color: "var(--color-text-body)" }}>
            <strong style={{ display: "block", color: "var(--color-text-headline)", fontSize: 14.5, fontWeight: 600 }}>{st.title}</strong>
            {st.body}
          </span>
        </li>
      ))}
      <style>{`@media(max-width:760px){.kenya-steps{grid-template-columns:1fr!important;max-width:440px!important}}`}</style>
    </ol>
  );
}

const guideIntros = [
  { name: "Ashley", photo: "/images/Ashley (new).JPG", role: "sound healer, reiki practitioner & dj", line: "she helps your body do what it's been holding off on: exhale." },
  { name: "Shannon", photo: "/images/Shannon (new).JPG", role: "somatic guide & circle facilitator", line: "she holds space for women to come back to themselves, with softness, strength and soul." },
];

function MeetSection() {
  return (
    <section id="meet" style={{ background: "var(--color-bg-surface)", padding: "88px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <FadeIn>
          <p className="eyebrow-accent" style={{ marginBottom: 14 }}>who&apos;s holding the space</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 40 }}>
            meet Shannon &amp; Ashley
          </h2>
        </FadeIn>
        <div className="kenya-guides" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 56 }}>
          {guideIntros.map((g) => (
            <FadeIn key={g.name}>
              <div style={{ display: "flex", alignItems: "center", gap: 18, textAlign: "left" }}>
                <div style={{ position: "relative", width: 96, height: 96, flexShrink: 0, borderRadius: "50%", overflow: "hidden", border: "1px solid var(--color-accent)" }}>
                  <Image src={g.photo} alt={g.name} fill sizes="96px" style={{ objectFit: "cover", objectPosition: "center 25%" }} />
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-heading)", fontSize: 22, color: "var(--color-text-headline)", fontWeight: 700 }}>{g.name}</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 6 }}>{g.role}</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.6, color: "var(--color-text-body)" }}>{g.line}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <VideoPair
        orientation="vertical"
        labelTone="dark"
        background="transparent"
        padding="0"
        clips={[
          { file: "Ashley women on the fence.MOV", label: "ashley" },
          { file: "Shannon to the women.MOV", label: "shannon" },
        ]}
      />

      <StillDeciding retreat="Kenya" background="transparent" padding="56px 0 0" />
      <style>{`@media(max-width:700px){.kenya-guides{grid-template-columns:1fr!important;gap:24px!important;max-width:420px;margin-left:auto;margin-right:auto}}`}</style>
    </section>
  );
}

/** Phones only: slides up once she scrolls past the hero. */
function StickyBookBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const pill: React.CSSProperties = { flex: 1, padding: "11px 10px", borderRadius: 999, fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 600, textAlign: "center", textDecoration: "none" };
  return (
    <div className="kenya-sticky" aria-hidden={!show} style={{ position: "fixed", left: 12, right: 84, bottom: 14, zIndex: 90, display: "none", gap: 8, padding: 6, borderRadius: 999, background: "rgba(45,37,33,0.94)", backdropFilter: "blur(8px)", boxShadow: "0 8px 24px rgba(0,0,0,0.25)", transform: show ? "translateY(0)" : "translateY(140%)", transition: "transform 0.35s ease" }}>
      <a href="#rooms" tabIndex={show ? 0 : -1} style={{ ...pill, background: "var(--color-accent)", color: "#FFFCF5" }}>reserve</a>
      <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" tabIndex={show ? 0 : -1} style={{ ...pill, border: "1px solid #E8D5BC", color: "#F1F0E5" }}>book a call</a>
      <style>{`@media (max-width: 760px) { .kenya-sticky { display: flex !important; } }`}</style>
    </div>
  );
}

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
                <strong>you&apos;ve been the one holding it together for so long, you don&apos;t remember what it feels like to put it down.</strong>
              </p>
            </StaggerChild>
            <StaggerChild>
              <p style={{ marginBottom: 40 }}>
                so you plan. you prepare. you stay one step ahead.<br />
                <em>and it works.</em> <strong>until it doesn&apos;t.</strong><br />
                until you&apos;re <strong>exhausted by your own competence.</strong>
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
                <strong>kenya doesn&apos;t care about your plans.</strong>
                <br /><br />
                the lion moves when she wants to move.<br />
                the sun sets and still rises.
              </p>
            </StaggerChild>
            <StaggerChild>
              <p style={{ marginBottom: 28 }}>
                no inbox. no algorithm.<br />
                just <strong>90,000 acres of open savannah</strong> and you, standing in the middle of it.
                <br /><br />
                <em>the need to manage loosens, maybe for the first time in years.</em>
              </p>
            </StaggerChild>
            <StaggerChild>
              <p style={{ marginBottom: 0 }}>
                <strong>present. free. awake.</strong><br />
                and once you feel it, <em>you can&apos;t unfeel it.</em>
              </p>
            </StaggerChild>
          </StaggerBlock>
        </div>
      </section>

      {/* SECTION 2b — HOW WE CALL HER HOME */}
      <CallHerHome
        intro={
          <>
            movement, open sky, ceremony, and the kind of land that puts everything back in
            proportion.
          </>
        }
        steps={[
          {
            img: "/images/5.png",
            title: "step into your body, fully",
            body: (
              <>
                through yoga, somatic practice, and movement that wakes up what went quiet. your
                body knows how to feel alive — it just needs permission and space.
              </>
            ),
            practices: "yoga with the plains in view · somatic practice · daily movement",
          },
          {
            img: "/images/Tanzania.jpeg",
            title: "let the land be your mirror",
            body: (
              <>
                sunrise safari drives through open plains. golden hour with lion trackers
                who&apos;ve walked this land their whole lives. <em>wildlife that doesn&apos;t
                perform or pretend — it just exists, fully, without apology.</em> something about
                watching that makes you want to do the same.
              </>
            ),
            practices: "sunrise game drives · lion trackers · golden hour · open plains",
          },
          {
            img: "/images/ReturnToLove circle.jpg",
            title: "go underneath the surface",
            body: (
              <>
                sound healing and reiki. women&apos;s circles held under open sky. ceremony that
                reaches the layer the everyday world never touches — making space for the part of
                you that&apos;s been waiting to be seen and heard.
              </>
            ),
            practices: "sound healing · reiki · circles under open sky · ceremony",
          },
          {
            img: "/images/group hug.jpg",
            title: "let yourself be found by each other",
            body: (
              <>
                you will arrive not knowing anyone. by day three, these women will know things
                about you that your oldest friends don&apos;t. <em>that&apos;s not an accident.</em>{" "}
                that&apos;s what happens when you take the performance away and{" "}
                <strong>just let yourself be seen.</strong>
              </>
            ),
            practices: "shared tents · long dinners · fireside · ten women, no more",
          },
        ]}
      />

      {/* SECTION 3b — WILDLIFE MOSAIC */}
      <section style={{ background: "#1E1612", padding: "64px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(20px,2.5vw,28px)", color: "#BAAB92", textAlign: "center", fontStyle: "italic", marginBottom: 40 }}>
              a glimpse of what&apos;s waiting
            </p>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 1fr", gridTemplateRows: "280px 280px", gap: 8 }} className="mosaic-grid">
            {/* Top left */}
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 4 }}>
              <Image src="/images/safari 1.jpeg" alt="Safari" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="30vw" />
            </div>
            {/* Large middle — spans 2 rows */}
            <div style={{ position: "relative", gridRow: "span 2", overflow: "hidden", borderRadius: 4 }}>
              <Image src="/images/rhino.png" alt="Rhino" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="40vw" />
            </div>
            {/* Top right */}
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 4 }}>
              <Image src="/images/leopard 3.png" alt="Leopard" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="30vw" />
            </div>
            {/* Bottom left */}
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 4 }}>
              <Image src="/images/lion 1.jpeg" alt="Lion" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="30vw" />
            </div>
            {/* Bottom right */}
            <div style={{ position: "relative", overflow: "hidden", borderRadius: 4 }}>
              <Image src="/images/elephant 3.jpeg" alt="Elephant" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="30vw" />
            </div>
          </div>
          <style>{`@media(max-width:768px){.mosaic-grid{grid-template-columns:1fr 1fr!important;grid-template-rows:200px 200px 200px!important}.mosaic-grid>div:first-child{grid-row:span 1!important}}`}</style>
        </div>
      </section>


      {/* SECTION 3 — WHERE WE'RE STAYING */}
      <section style={{ background: "var(--color-bg-surface)", padding: "80px 48px" }} className="stay-section">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", maxWidth: 1280, margin: "0 auto" }} className="stay-grid">
          <div className="stay-video" style={{ position: "relative", borderRadius: 8, overflow: "hidden", aspectRatio: "4/5" }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "60% center", display: "block", position: "absolute", inset: 0 }}
            >
              <source src="/videos/Ol Pejeta Sizzle Reel.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="stay-copy" style={{ maxWidth: 512, display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <FadeIn><p className="eyebrow-accent" style={{ marginBottom: 16, fontWeight: 700 }}>OL PEJETA CONSERVANCY</p></FadeIn>
              <FadeIn delay={0.1}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 24 }}>
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
                    inside the conservancy, <strong>Ol Pejeta Safari Cottages</strong> has been recognized as one of the{" "}
                    <span style={{ textDecoration: "underline", textUnderlineOffset: 3 }}>top 10% of hotels in the world</span>{" "}
                    by TripAdvisor — and you&apos;ll understand why the moment you arrive.
                  </p>
                </div>
              </FadeIn>
            </div>
            {/* Photo below text */}
            <FadeIn delay={0.3}>
              <div style={{ position: "relative", borderRadius: 8, overflow: "hidden", aspectRatio: "16/9" }} className="ol-pejeta-photo">
                <Image src="/images/kenya-elephant-plains.jpeg" alt="Elephants on the Ol Pejeta plains" fill style={{ objectFit: "cover", objectPosition: "50% 80%" }} sizes="(max-width: 768px) 90vw, 512px" />
              </div>
            </FadeIn>
            <style>{`@media(max-width:768px){.stay-section{padding:60px 16px!important}.stay-copy{width:100%!important;max-width:100%!important}.ol-pejeta-photo{aspect-ratio:4/3!important;width:100%;margin:0 auto}}`}</style>
          </div>
        </div>
        <style>{`@media(max-width:768px){.stay-grid{grid-template-columns:1fr!important}.stay-video{margin:0 auto;width:100%}.stay-copy{margin:0 auto;width:100%;padding:24px 0;text-align:center}.stay-copy p,.stay-copy h2,.stay-copy div,.stay-copy span{text-align:center}.stay-copy h2{font-size:26px!important;white-space:nowrap}}`}</style>
      </section>

      {/* SECTION 4 — ARC OF THE WEEK (hero "see the week" scrolls here) */}
      <section id="week" style={{ background: "var(--color-bg-page)", padding: "80px 32px 80px", scrollMarginTop: 72 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", textAlign: "center", fontWeight: 700, marginBottom: 12 }}>
              the arc of the week
            </h2>
          </FadeIn>
          <div style={{ height: 36 }} />
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

      {/* SECTION 4a — A TYPICAL DAY */}
      <TypicalDay />

      {/* SECTION 4b — PHOTO GALLERY STRIP */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", height: 560 }}>
        {[
          { src: "/images/lion 2.jpeg", alt: "Lion", pos: "center" },
          { src: "/images/Untitled design.png", alt: "Into the Wild", pos: "center" },
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
      <section style={{ position: "relative", padding: "80px 32px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <Image src="/images/elephant 1.jpeg" alt="An elephant on the savanna at Ol Pejeta Conservancy, Kenya" fill style={{ objectFit: "cover", objectPosition: "center 100%" }} sizes="100vw" />
          <div style={{ position: "absolute", inset: 0, background: "rgba(245,241,230,0.92)" }} />
        </div>
        <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <SplitHeadline
            text="what's taken care of"
            as="h2"
            style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", textAlign: "center", fontWeight: 700, marginBottom: 64 }}
          />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }} className="included-grid">
            <FadeIn>
              <div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-accent)", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24, fontWeight: 700 }}>included</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {([
                    <><strong>7 days / 6 nights</strong> at <strong>Ol Pejeta Safari Cottages</strong>, inside <em>Ol Pejeta Conservancy</em></>,
                    <>private ground transport <strong>to/from Nairobi</strong></>,
                    <>all <strong>fresh, locally sourced</strong> chef-prepared meals and beverages</>,
                    <><strong>daily sunrise and sunset safari drives</strong> with expert guides</>,
                    <>yoga, meditation, and journaling <em>overlooking the safari plains</em></>,
                    <><strong>workshops, ceremonies, and guided women&apos;s circles</strong></>,
                    <>visit to the <strong>Northern White Rhino Sanctuary</strong></>,
                    <>visit to <strong>Spinners and Weavers</strong></>,
                    <><strong>traditional Kenyan cooking class</strong> with our hosts</>,
                    <><em>unforgettable wildlife encounters</em> in their natural habitat</>,
                  ] as React.ReactNode[]).map((item, i) => (
                    <li key={i} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.7 , display: "flex", gap: 12}}><ListIcon kind="included" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "#9C8E7E", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 24, fontWeight: 700 }}>not included</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {([
                    <><strong>flights</strong> to/from Nairobi, Kenya</>,
                    <>hotel stay in Nairobi the night before <em>(we&apos;ll recommend one, and we all stay there together)</em></>,
                    <><strong>travel insurance</strong> <em>(recommended)</em></>,
                    <>souvenirs</>,
                    <><strong>Kenya visa</strong> <em>(around $50 USD)</em></>,
                    <><strong>gratuities</strong> for local staff + guides <em>(suggested $100–$200 total — goes a long way)</em></>,
                  ] as React.ReactNode[]).map((item, i) => (
                    <li key={i} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.7, opacity: 0.7 , display: "flex", gap: 12}}><ListIcon kind="excluded" /><span>{item}</span></li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
        <style>{`@media(max-width:640px){.included-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* SECTION 6 — TESTIMONIALS */}
      {/* dark band so it reads as its own moment, apart from the rooms below */}
      <section style={{ position: "relative", background: "#2D2521", padding: "110px 32px 120px", overflow: "hidden" }}>
        {/* oversized quote mark as texture */}
        <span aria-hidden="true" style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", fontFamily: "var(--font-cormorant)", fontSize: 420, lineHeight: 1, color: "rgba(195,158,136,0.08)", pointerEvents: "none", userSelect: "none" }}>&ldquo;</span>
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#C5AA9B", textAlign: "center", marginBottom: 18 }}>in their words</p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(30px,4.5vw,48px)", color: "#F1F0E5", textAlign: "center", fontWeight: 700, marginBottom: 40 }}>
              women who came<span className="testimonial-break"> </span>back different
            </h2>
          </FadeIn>
          {/* one featured line, set big */}
          <FadeIn delay={0.1}>
            <figure style={{ maxWidth: 760, margin: "0 auto 64px", textAlign: "center" }}>
              <blockquote style={{ margin: 0, fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(26px,3.6vw,40px)", lineHeight: 1.3, color: "#E8D5BC", textWrap: "balance" }}>
                &ldquo;I learned to see the light I see in others in myself too.&rdquo;
              </blockquote>
              <figcaption style={{ marginTop: 18, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "#C5AA9B" }}>
                <span style={{ width: 32, height: "0.5px", background: "#C5AA9B" }} />Jess<span style={{ width: 32, height: "0.5px", background: "#C5AA9B" }} />
              </figcaption>
            </figure>
          </FadeIn>
          <FadeIn delay={0.1}>
            <TestimonialVideo />
          </FadeIn>
        </div>
      </section>

      {/* SECTION 9 — THE ROOMS */}
      {/* full-bleed opener: the cottage verandah at dawn */}
      <div id="rooms" style={{ position: "relative", height: "min(78vh, 680px)", minHeight: 420, overflow: "hidden", background: "#2D2521" }}>
        <ParallaxImage src="/images/ol_pejeta_safari_cottages_mbili_view.jpg" alt="two women in robes with morning coffee on the cottage verandah, looking out over the conservancy" height="100%" objectPosition="center 50%" sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(45,37,33,0.15) 30%, rgba(45,37,33,0.75))" }} />
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 56, textAlign: "center", padding: "0 24px" }}>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#E8D5BC", marginBottom: 14 }}>where you&apos;ll wake up</p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(36px,6vw,68px)", color: "#F1F0E5", fontWeight: 700, lineHeight: 1.05, textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}>
              your home in the wild
            </h2>
          </FadeIn>
        </div>
      </div>

      <section style={{ background: "#FFFCF5", padding: "80px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {/* intro: copy beside the photo of the two of us at the tents */}
          <div className="rooms-intro" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 56, alignItems: "center", maxWidth: 980, margin: "0 auto 72px" }}>
            <FadeIn>
              <div>
                <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(24px,3vw,32px)", lineHeight: 1.3, color: "var(--color-text-headline)", marginBottom: 20 }}>
                  canvas walls, a wraparound verandah, and the plains waking up outside your door.
                </p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.8, marginBottom: 14 }}>
                  <em>while solo occupancy is not available due to limited capacity, every cottage is beautifully designed and thoughtfully appointed.</em>
                </p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.8 }}>
                  <strong>book with a friend</strong> or be paired with a like-minded woman in your group.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div style={{ position: "relative", aspectRatio: "4/5", borderRadius: 8, overflow: "hidden", transform: "rotate(1.5deg)", boxShadow: "0 18px 40px rgba(74,63,53,0.18)", border: "8px solid #fff" }}>
                <Image src="/images/kenya-women-tent.JPG" alt="Shannon Tomascak and Ashley Scully at their safari tent" fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="(max-width: 860px) 90vw, 420px" />
              </div>
            </FadeIn>
          </div>

          <div style={{ maxWidth: 1000, margin: "0 auto" }}>
            {/* The cottage — single option, laid out horizontally */}
            <FadeIn>
              <motion.div
                whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(74,63,53,0.12)" }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "var(--color-bg-card)",
                  border: "0.5px solid var(--color-border)",
                  borderRadius: 8,
                  padding: 40,
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 40,
                  alignItems: "stretch",
                }}
                className="cottage-card"
              >
                {/* Left — images */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1.7fr 1fr", gap: 6, borderRadius: 6, overflow: "hidden", height: "100%", minHeight: 460 }}>
                  <div style={{ position: "relative", gridColumn: "1 / 3" }}>
                    <Image src="/images/two bedroom cottage lounge 2.jpg" alt="Cottage lounge" fill style={{ objectFit: "cover" }} sizes="500px" />
                  </div>
                  <div style={{ position: "relative" }}>
                    <Image src="/images/two bedroom cottage.jpg" alt="Cottage bedroom" fill style={{ objectFit: "cover" }} sizes="250px" />
                  </div>
                  <div style={{ position: "relative" }}>
                    <Image src="/images/two bedroom cottage lounge.jpg" alt="Cottage verandah" fill style={{ objectFit: "cover" }} sizes="250px" />
                  </div>
                </div>

                {/* Right — details */}
                <div style={{ display: "flex", flexDirection: "column", paddingTop: 12 }}>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 34, color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 10, lineHeight: 1.1 }}>the cottage</h3>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 18 }}>
                    two bedrooms · two women per room · four per cottage
                  </p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-text-body)", lineHeight: 1.7, marginBottom: 24 }}>
                    you&apos;ll share a bedroom with one other woman, and the cottage with three. each bedroom has its own ensuite bathroom, and the living area, dining room and verandah run the full length of the building.
                  </p>
                  <div style={{ marginBottom: 28 }}>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--color-accent)", letterSpacing: "0.07em", textTransform: "uppercase", fontWeight: 600, marginBottom: 12 }}>all cottages include</p>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                      {[
                        { text: "ensuite bathrooms with walk-in showers", icon: Shower },
                        { text: "hot and cold running water", icon: Drop },
                        { text: "bathroom utilities — shampoo, conditioner, and fabric detergent", icon: Sparkle },
                        { text: "drinking water and water bottles", icon: Jar },
                        { text: "solar powered electricity to charge your devices", icon: PlugCharging },
                        { text: "basic wifi", icon: WifiMedium },
                        { text: "access to viewing decks for private bush meals", icon: Binoculars },
                      ].map((item, i) => (
                        <li key={i} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-body)", lineHeight: 1.6, display: "flex", gap: 10 }}><ListIcon icon={item.icon} /><span>{item.text}</span></li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ marginTop: "auto", paddingTop: 20, borderTop: "0.5px solid var(--color-border)" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
                      <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 40, color: "var(--color-accent)", fontWeight: 400 }}>$6,900</p>
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-body)" }}>per person · shared room</p>
                    </div>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-body)", marginTop: -12, marginBottom: 20 }}>or $1,000 today + 11 monthly payments of about $536</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }} className="cottage-buttons">
                      {/* STRIPE LINK: cottage - pay in full */}
                      <a href="https://buy.stripe.com/3cIaEY03mfc9d5o4mW0sU02" target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "100%", boxSizing: "border-box", padding: "14px 20px", background: "var(--color-accent)", border: "1px solid var(--color-accent)", color: "#FFFCF5", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textDecoration: "none", textAlign: "center", transition: "opacity 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")} onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                        pay in full →
                      </a>
                      {/* STRIPE LINK: cottage - $1,000 deposit */}
                      <a href="https://buy.stripe.com/aFa7sMdUc9RP2qK3iS0sU03" target="_blank" rel="noopener noreferrer" style={{ display: "block", width: "100%", boxSizing: "border-box", padding: "14px 20px", border: "1px solid var(--color-accent)", color: "var(--color-accent)", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textDecoration: "none", textAlign: "center", transition: "background 0.3s ease" }} onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--color-accent) 10%, transparent)")} onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                        reserve with $1,000 deposit →
                      </a>
                    </div>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-body)", textAlign: "center", marginTop: 14, fontStyle: "italic" }}>all payments are non-refundable<br />balance due 30 days prior to the retreat</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
            <BookingSteps />
          </div>
        </div>
        <style>{`@media(max-width:860px){.rooms-intro{grid-template-columns:1fr!important;gap:36px!important}}@media(max-width:860px){.cottage-card{grid-template-columns:1fr!important;gap:28px!important;padding:28px!important}} @media(max-width:640px){.mobile-break{display:block}}`}</style>
      </section>

      {/* MEET US + VIDEOS + STILL DECIDING */}
      <MeetSection />

      {/* SECTION 8 — FAQ */}
      <section style={{ background: "#F5F1E6", padding: "0 32px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          {/* hairline divider: separates the meet-us call from the questions (same background) */}
          <div aria-hidden="true" style={{ display: "flex", alignItems: "center", gap: 12, maxWidth: 520, margin: "0 auto 72px" }}>
            <div style={{ flex: 1, height: "0.5px", background: "#D4C8AA" }} />
            <span style={{ color: "#A67C52", fontSize: 14 }}>✦</span>
            <div style={{ flex: 1, height: "0.5px", background: "#D4C8AA" }} />
          </div>
          <FadeIn>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-accent)", letterSpacing: "0.12em", textTransform: "uppercase", textAlign: "center", marginBottom: 16 }}>everything you need to know</p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", textAlign: "center", fontWeight: 700, marginBottom: 56 }}>
              Questions
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div style={{ borderTop: "0.5px solid var(--color-border)" }}>
              <FaqJsonLd faqs={faqs} />
              {faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </FadeIn>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", textAlign: "center", marginTop: 36 }}>
            still wondering about something?{" "}
            <Link href="/contact?retreat=Kenya#send" style={{ color: "var(--color-accent)", fontWeight: 600, textDecoration: "none" }}>ask us here →</Link>
          </p>
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
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(20px,3vw,32px)", color: "#F1F0E5", fontWeight: 700, marginBottom: 40, whiteSpace: "nowrap" }}>
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
      <StickyBookBar />
    </main>
  );
}
