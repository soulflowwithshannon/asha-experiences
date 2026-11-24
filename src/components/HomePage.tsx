"use client";

// The home page (/). Rendered by src/app/page.tsx, which holds the metadata.
// Order (Nov 2026): hero → proof strip → Kenya card → in their words →
// pillars → the two of us → a moment from retreat → photos → what's next →
// closing.
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useSyncExternalStore } from "react";
import FadeIn, { SafeReveal } from "@/components/FadeIn";
import VideoPair from "@/components/VideoPair";
import RetreatGallery from "@/components/RetreatGallery";
import InTheirWords from "@/components/InTheirWords";
import { SPOTS_LEFT, PAYMENT_PLAN_CLOSES } from "@/lib/kenya";

const primaryBtn: React.CSSProperties = {
  display: "inline-block",
  padding: "12px 32px",
  background: "#C39E88",
  border: "1px solid #C39E88",
  color: "#2D2521",
  fontFamily: "var(--font-dm-sans)",
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: "0.04em",
  textDecoration: "none",
  textAlign: "center",
  transition: "background 0.3s ease",
};

const secondaryBtn: React.CSSProperties = {
  display: "inline-block",
  padding: "12px 32px",
  background: "rgba(45,37,33,0.3)",
  border: "1px solid #E8D5BC",
  color: "#F1F0E5",
  fontFamily: "var(--font-dm-sans)",
  fontSize: 13,
  fontWeight: 500,
  letterSpacing: "0.04em",
  textDecoration: "none",
  textAlign: "center",
  transition: "background 0.3s ease",
};

function Hero() {
  return (
    <section
      className="section-dark hero-section"
      style={{
        position: "relative",
        /* The hero video is 16:9; matching its ratio shows the whole frame.
           Phones are too narrow for that, so they get a tall box instead. */
        aspectRatio: "16 / 9",
        minHeight: 520,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .hero-section { aspect-ratio: auto !important; min-height: 82vh !important; }
        }
        @media (max-width: 560px) {
          .home-hero-btns { flex-direction: column !important; align-items: stretch !important; max-width: 300px; margin-left: auto; margin-right: auto; }
        }
      `}</style>

      <div style={{ position: "absolute", inset: 0 }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, rgba(60,40,25,0.45), rgba(50,30,15,0.75))",
            position: "absolute",
            inset: 0,
            zIndex: 1,
          }}
        />
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-video-poster.jpg"
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block", position: "absolute", inset: 0 }}
        >
          {/* Phones get a 720p, ~3 MB cut */}
          <source src="/videos/ASHA hero video mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/videos/ASHA hero video.mp4" type="video/mp4" />
        </video>
      </div>

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", padding: "96px 24px 48px" }}>
        <h1
          className="hero-rise"
          style={{
            animationDuration: "1s",
            fontFamily: "var(--font-cormorant)",
            fontStyle: "italic",
            fontSize: "clamp(34px,6vw,64px)",
            color: "#F1F0E5",
            fontWeight: 400,
            width: "90%",
            maxWidth: 1100,
            whiteSpace: "normal",
            wordWrap: "break-word",
            margin: "0 auto 20px",
            lineHeight: 1.1,
          }}
        >
          {/* two lines, and neither phrase ever breaks in the middle */}
          <span style={{ whiteSpace: "nowrap" }}>far from home.</span><br />
          <span style={{ whiteSpace: "nowrap" }}>closer to yourself.</span>
        </h1>
        <p
          className="hero-rise"
          style={{
            animationDuration: "1s",
            animationDelay: "0.15s",
            fontFamily: "var(--font-dm-sans)",
            fontSize: "clamp(15px,1.6vw,18px)",
            lineHeight: 1.6,
            color: "#E8D5BC",
            maxWidth: 520,
            margin: "0 auto 36px",
            textWrap: "balance",
          }}
        >
          small-group retreats for women around the world, hosted start to finish by Ashley and Shannon.
        </p>

        <div className="hero-rise home-hero-btns" style={{ animationDuration: "1s", animationDelay: "0.3s", display: "flex", gap: 14, justifyContent: "center", alignItems: "center" }}>
          <Link
            href="/retreats/kenya"
            style={primaryBtn}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#b08d78")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#C39E88")}
          >
            see the Kenya retreat
          </Link>
          <Link
            href="/retreats"
            style={secondaryBtn}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(45,37,33,0.55)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(45,37,33,0.3)")}
          >
            all retreats
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProofStrip() {
  const items = ["ten women, no more", "both of us on the ground all week", "most women come solo"];
  return (
    <section style={{ background: "var(--color-bg-page)", borderBottom: "0.5px solid var(--color-border)", padding: "18px 24px" }}>
      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", color: "var(--color-text-body)", textAlign: "center", lineHeight: 1.8, maxWidth: 900, margin: "0 auto" }}>
        {/* real spaces around each dot, so a phone can wrap between items */}
        {items.map((item, i) => (
          <span key={item}>
            {i > 0 && <>{" "}<span aria-hidden="true" className="proof-dot" style={{ color: "var(--color-accent)", margin: "0 6px" }}>·</span>{" "}</>}
            <span className="proof-item" style={{ whiteSpace: "nowrap" }}>{item}</span>
          </span>
        ))}
      </p>
      {/* phones: one item per line, no dots left dangling at line ends */}
      <style>{`@media(max-width:600px){.proof-dot{display:none}.proof-item{display:block}}`}</style>
    </section>
  );
}

function KenyaCard() {
  // shows until the end of Dec 31, 2026 in New York, then hides itself.
  // The static HTML always includes it; the browser checks the real date.
  const planOpen = useSyncExternalStore(
    () => () => {},
    () => Date.now() < PAYMENT_PLAN_CLOSES.getTime(),
    () => true,
  );

  return (
    <section style={{ background: "var(--color-bg-page)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "60% 40%", minHeight: 600 }} className="split-grid">
        <div style={{ position: "relative", minHeight: 500, height: "100%" }} className="kenya-card-img">
          <Image
            src="/images/Into the Wild Hero.jpg"
            alt="Into the Wild — Kenya retreat"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="(max-width: 768px) 100vw, 60vw"
          />
        </div>

        <div style={{ padding: "80px 60px", display: "flex", flexDirection: "column", justifyContent: "center" }} className="kenya-card-copy">
          <FadeIn>
            <p className="eyebrow-accent" style={{ marginBottom: 16 }}>NOW BOOKING — KENYA 2027</p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 12 }}>
              Into the Wild
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, fontStyle: "italic", color: "var(--color-text-muted)", marginBottom: 24 }}>
              Ol Pejeta Conservancy, Kenya · <span style={{ whiteSpace: "nowrap" }}>Nov 28 – Dec 4, 2027</span>
            </p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.8, maxWidth: 380, marginBottom: 20 }}>
              sunrise game drives, circles under open sky, and a week on 90,000 acres at the foot of Mount Kenya.
            </p>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, fontWeight: 600, color: "var(--color-text-headline)", marginBottom: 6 }}>
              $6,900{SPOTS_LEFT ? ` · ${SPOTS_LEFT} of 10 spots left` : ""}
            </p>
            {planOpen && (
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, fontStyle: "italic", color: "var(--color-text-body)", marginBottom: 0 }}>
                11-month payment plan closes december 31
              </p>
            )}
            <div style={{ marginTop: 32 }}>
              <Link href="/retreats/kenya" className="ghost-btn" style={{ alignSelf: "flex-start" }}>
                see the Kenya retreat
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
      <style>{`@media(max-width:768px){.split-grid{grid-template-columns:1fr!important}.kenya-card-img{min-height:300px!important}.kenya-card-copy{padding:48px 28px 64px!important}}`}</style>
    </section>
  );
}

const pillars = [
  { num: "01", name: "land-based ceremony", caption: "rituals rooted in the place, led by local wisdom keepers.", img: "/images/ceremony.jpeg" },
  { num: "02", name: "movement & somatic practice", caption: "yoga, dance, sound healing. no experience needed.", img: "/images/somatic practices.jpg" },
  { num: "03", name: "nourishing cuisine", caption: "local, seasonal meals at long shared tables.", img: "/images/cuisine.jpeg" },
  { num: "04", name: "integration & circle work", caption: "women's circles, journaling, and a group that stays in touch after you're home.", img: "/images/circle.jpeg" },
];

function Pillars() {
  return (
    <section style={{ background: "var(--color-bg-surface)", padding: "80px 32px 56px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 600, color: "var(--color-accent)", letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center", marginBottom: 16 }}>what every retreat holds</p>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px, 4vw, 40px)", color: "var(--color-text-headline)", textAlign: "center", fontWeight: 700, marginBottom: 48 }}>
            the pillars of ASHA
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="pillars-grid">
          {pillars.map((pillar, i) => (
            <FadeIn key={pillar.num} delay={i * 0.08}>
              <div>
                <motion.div
                  whileHover={{ scale: 1.04, filter: "brightness(1.05)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  style={{ position: "relative", aspectRatio: "3/2", background: "var(--color-bg-card)", overflow: "hidden" }}
                >
                  <Image src={pillar.img} alt={pillar.name} fill style={{ objectFit: "cover", objectPosition: "center" }} sizes="(max-width: 640px) 100vw, 50vw" />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "60px 24px 24px", background: "linear-gradient(to top, rgba(45,37,33,0.85) 0%, transparent 100%)" }}>
                    <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 20, color: "#F1F0E5", fontWeight: 400 }}>
                      {pillar.num} / {pillar.name}
                    </p>
                  </div>
                </motion.div>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", lineHeight: 1.7, marginTop: 16, textAlign: "center" }}>
                  {pillar.caption}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <style>{`@media(max-width:640px){.pillars-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

// photos are the ones the About page uses
const hosts = [
  {
    name: "Ashley",
    photo: "/images/3.png",
    bio: "reiki healer, sound bath DJ and life coach. she came to this work after a hard chapter that left her disconnected from herself. reiki was where she started finding her way back, and she's been holding that space for women since.",
  },
  {
    name: "Shannon",
    photo: "/images/4.png",
    bio: "somatic guide and circle facilitator with a background in psychology. a few years ago she hit a low point and finally asked for help. now she brings both the science and the body work to every circle.",
  },
];

function TwoOfUs() {
  return (
    <section style={{ background: "var(--color-bg-page)", padding: "48px 32px 56px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px,4vw,40px)", color: "var(--color-text-headline)", textAlign: "center", fontWeight: 700, marginBottom: 48 }}>
            the two of us
          </h2>
        </FadeIn>
        <div className="hosts-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40 }}>
          {hosts.map((h, i) => (
            <FadeIn key={h.name} delay={i * 0.1}>
              <div>
                <div style={{ position: "relative", aspectRatio: "4/5", background: "var(--color-bg-page)", marginBottom: 24 }}>
                  <Image src={h.photo} alt={h.name} fill style={{ objectFit: "contain", objectPosition: "center" }} sizes="(max-width: 760px) 100vw, 520px" />
                </div>
                <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px,4vw,44px)", lineHeight: 1, color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 16 }}>
                  {h.name}
                </h3>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.8, color: "var(--color-text-body)", maxWidth: 460 }}>
                  {h.bio}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div style={{ textAlign: "center", marginTop: 56 }}>
            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(20px,2.6vw,26px)", color: "var(--color-text-headline)", lineHeight: 1.35, maxWidth: 620, margin: "0 auto 20px", textWrap: "balance" }}>
              there&apos;s no team. we answer the emails, plan the week, and we&apos;re with you on the ground the whole time.
            </p>
            <Link href="/about" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 600, color: "var(--color-accent)", textDecoration: "none" }}>
              read our story →
            </Link>
          </div>
        </FadeIn>
      </div>
      <style>{`@media(max-width:760px){.hosts-grid{grid-template-columns:1fr!important;gap:56px!important;max-width:460px;margin:0 auto}}`}</style>
    </section>
  );
}

function WhatsNext() {
  const card: React.CSSProperties = {
    display: "block",
    height: "100%",
    boxSizing: "border-box",
    padding: "24px 26px",
    border: "0.5px solid var(--color-bg-card)",
    borderRadius: 4,
    background: "var(--color-bg-page)",
    textDecoration: "none",
  };
  const label: React.CSSProperties = { fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 8 };
  const title: React.CSSProperties = { fontFamily: "var(--font-heading)", fontSize: 22, color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 8 };
  const line: React.CSSProperties = { fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.6, color: "var(--color-text-body)", marginBottom: 14 };
  const cta: React.CSSProperties = { fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 600, color: "var(--color-accent)" };
  return (
    <section style={{ background: "var(--color-bg-surface)", padding: "56px 24px 64px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-text-body)", textAlign: "center", marginBottom: 24 }}>what&apos;s next</p>
        </FadeIn>
        <div className="next-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <FadeIn>
            <Link href="/retreats/spain-waitlist" style={card}>
              <p style={label}>Spain, June 2027</p>
              <p style={title}>Casa Amor</p>
              <span style={cta}>join the Spain list →</span>
            </Link>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Link href="/retreats/custom" style={card}>
              <p style={title}>your own retreat</p>
              <p style={line}>for your friends, your team or your community.</p>
              <span style={cta}>design yours →</span>
            </Link>
          </FadeIn>
        </div>
      </div>
      <style>{`@media(max-width:600px){.next-grid{grid-template-columns:1fr!important}}`}</style>
    </section>
  );
}

function Closing() {
  const btn: React.CSSProperties = { display: "inline-block", padding: "12px 32px", border: "1px solid #C39E88", background: "rgba(195,158,136,0.25)", color: "#F1F0E5", fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 500, letterSpacing: "0.04em", textDecoration: "none", transition: "background 0.3s ease" };
  return (
    <section style={{ position: "relative", padding: "180px 32px", background: "#2D2521", textAlign: "center", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <Image src="/images/ReturnToLove girls group 2.jpg" alt="Return to Love girls group" fill style={{ objectFit: "cover", objectPosition: "center 38%" }} sizes="100vw" />
        <div style={{ position: "absolute", inset: 0, background: "rgba(45,37,33,0.45)" }} />
      </div>
      <div style={{ position: "relative", zIndex: 1 }}>
        <FadeIn>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(28px,4vw,40px)", color: "#F1F0E5", fontWeight: 700, marginBottom: 40, textWrap: "balance" }}>
            your next chapter starts here
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/retreats" style={btn} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(195,158,136,0.45)")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(195,158,136,0.25)")}>
              see all retreats
            </Link>
            <a href="https://instagram.com/asha_experiences" target="_blank" rel="noopener noreferrer" style={btn} onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(195,158,136,0.45)")} onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(195,158,136,0.25)")}>
              follow along @asha_experiences →
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <SafeReveal>
      <main>
        {/* 1 — hero */}
        <Hero />
        {/* 2 — proof strip */}
        <ProofStrip />
        {/* 3 — Kenya */}
        <KenyaCard />
        {/* 4 — in their words (same band as /retreats/kenya) */}
        <InTheirWords heading="in their words" eyebrow="" compact />
        {/* 5 — what every retreat holds */}
        <Pillars />
        {/* 6 — the two of us */}
        <TwoOfUs />
        {/* a moment from retreat: different clips from the hero video, so kept */}
        <VideoPair
          headline="a moment from retreat"
          orientation="vertical"
          background="var(--color-bg-surface)"
          padding="48px 32px 56px"
          clips={[
            { file: "Ashley moment from retreat.MOV", label: "ashley" },
            { file: "Shannon moment from retreat.MOV", label: "shannon", posterTime: 3.6 },
          ]}
        />
        {/* 7 — photos */}
        <RetreatGallery />
        {/* 8 — what's next */}
        <WhatsNext />
        {/* 9 — closing */}
        <Closing />
      </main>
    </SafeReveal>
  );
}
