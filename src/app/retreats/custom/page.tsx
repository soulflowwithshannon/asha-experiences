"use client";

import { useState } from "react";
import Image from "next/image";
import posthog from "posthog-js";
import FadeIn from "@/components/FadeIn";

const CALENDAR_URL = "https://calendar.app.google/Yt1VUQGEuhhEipt59";

/* What we actually do on our own retreats, offered bespoke. */
const INCLUDED = [
  {
    title: "Location sourcing",
    lead: "You describe the feeling. We come back with places that match it.",
    points: ["desert, jungle, coast or somewhere unheard of", "matched to your group size, budget and pace", "vetted for how it actually runs, not how it photographs"],
  },
  {
    title: "Property booking",
    lead: "Once you choose, the venue is ours to deal with.",
    points: ["rates, contracts and deposits negotiated", "room assignments handled", "dietary needs and accessibility confirmed in writing"],
  },
  {
    title: "The arc of the week",
    lead: "A rhythm, not a packed schedule.",
    points: ["opens slowly, goes deep in the middle, lands steady", "built around the outcome you name", "free time protected on purpose"],
  },
  {
    title: "Practices led by us",
    lead: "We hold the core of the week ourselves, and bring in others when you want more.",
    points: [
      "somatic work, breathwork, yoga, sound healing and reiki — led by us",
      "local guides, shamans and ceremony leaders where you want them",
      "extra practitioners and sessions booked on request",
    ],
  },
  {
    title: "Meals, transfers, excursions",
    lead: "The logistics that would otherwise eat your evenings.",
    points: ["airport pickups both ways", "every meal, every dietary need", "the hike, the boat, the market morning"],
  },
  {
    title: "Both of us, on the ground",
    lead: "No agency. No assistants. No handover to a local coordinator.",
    points: ["with your group from the first airport run", "running the day so you don't have to", "there until the last morning"],
  },
];

/* The three kinds of client the custom offer is built for. */
const AUDIENCES = [
  {
    image: "/images/Morocco circle.jpeg",
    alt: "A candlelit long-table dinner in Morocco",
    eyebrow: "for women-led brands",
    title: "bring your community somewhere unforgettable",
    body: "a retreat that feels like your brand, lived for a week. for your customers, ambassadors, creators or the women who built it with you.",
    examples: ["community and customer retreats", "ambassador and creator trips", "launches and brand experiences"],
  },
  {
    image: "/images/Return to Love group sunset.jpg",
    alt: "A group of women together at sunset above Lake Atitlán",
    eyebrow: "for companies",
    title: "give your team more than an offsite",
    body: "time away that people actually come back changed from. built around the outcome you need, with the logistics off your plate.",
    examples: ["leadership and women's leadership offsites", "team resets and incentive trips", "employee wellbeing retreats"],
  },
  {
    image: "/images/women laying down.jpeg",
    alt: "Women resting together on retreat",
    eyebrow: "for you",
    title: "a week that is finally yours",
    body: "for the woman who holds everything together and rarely gets held. come alone, or bring the friends who get it.",
    examples: ["high-functioning women running on empty", "corporate women who need to come up for air", "moms who need a real break"],
  },
];

const LEADS = [
  {
    image: "/images/Ashley (new).JPG",
    name: "Ashley",
    role: "co-founder and lead facilitator",
    bio: "reiki practitioner, sound bath facilitator and life coach who leads the ceremony and sound work on every retreat.",
  },
  {
    image: "/images/Shannon (new).JPG",
    name: "Shannon",
    role: "co-founder and lead facilitator",
    bio: "yoga teacher and somatic guide with a background in psychology, drawing on somatics and embodiment work.",
  },
];


/* How a custom retreat comes together, from first call to last morning. */
const PROCESS = [
  { title: "let's dream together", body: "we explore your vision, your goals, your people and what you want them to take home." },
  { title: "your custom proposal", body: "we come back with up to three tailored destinations and experience concepts, each shaped around what matters to you." },
  { title: "align on the details", body: "together we refine your favorite concept, the scope, the logistics and the investment." },
  { title: "make it official", body: "once you approve, a deposit secures your dates and we start bringing it to life." },
  { title: "we handle the rest", body: "biweekly check-ins or fully hands-off. we plan, coordinate and facilitate from start to finish." },
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "0.5px solid var(--color-border)",
  background: "var(--color-bg-page)",
  color: "var(--color-text-headline)",
  fontFamily: "var(--font-dm-sans)",
  fontSize: 14,
  borderRadius: 2,
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans)",
  fontSize: 12,
  letterSpacing: "0.06em",
  color: "var(--color-text-body)",
};

export default function CustomRetreatPage() {
  const [stage, setStage] = useState<"start" | "details" | "done">("start");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [who, setWho] = useState("");
  const [headcount, setHeadcount] = useState("");
  const [company, setCompany] = useState("");
  const [when, setWhen] = useState("");
  const [where, setWhere] = useState("");
  const [outcome, setOutcome] = useState("");
  const [budget, setBudget] = useState("");
  const [phone, setPhone] = useState("");
  const [based, setBased] = useState("");
  const [leading, setLeading] = useState("");
  const [anythingElse, setAnythingElse] = useState("");

  async function startEnquiry(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("we need your name and email so we can write back.");
      return;
    }
    setError("");
    setStage("details");
    posthog.capture("custom_retreat_started");

    // capture her now, so an abandoned enquiry is still a lead
    try {
      await fetch("/api/custom-retreat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stage: "start", name: name.trim(), email: email.trim() }),
      });
    } catch {
      /* she can still finish the form; the full send is what matters */
    }
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/custom-retreat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          who,
          headcount,
          company,
          when,
          where,
          outcome,
          budget,
          phone,
          based,
          leading,
          anythingElse,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "that didn't send. try again?");
        return;
      }

      posthog.capture("custom_retreat_submitted", { who, headcount });
      setStage("done");
    } catch {
      setError("that didn't send. try again?");
    } finally {
      setSending(false);
    }
  }

  return (
    <main>
      {/* HERO */}
      <section
        style={{
          position: "relative",
          minHeight: "68vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2D2521",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0 }}>
          <Image
            src="/images/ReturnToLove circle.jpg"
            alt="A circle of women on retreat"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            sizes="100vw"
            priority
          />
          <div style={{ position: "absolute", inset: 0, background: "rgba(45,37,33,0.5)" }} />
        </div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: "0 24px", maxWidth: 720, margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#C39E88", marginBottom: 18 }}>
            custom retreats
          </p>
          <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(30px,5vw,50px)", color: "#F1F0E5", fontWeight: 700, lineHeight: 1.15, marginBottom: 20 }}>
            your vision. our expertise.<br />an experience entirely your own.
          </h1>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16, lineHeight: 1.5, color: "#E8D5BC", maxWidth: 560, margin: "0 auto 32px", textWrap: "balance" }}>
            retreats built for women-led brands, for companies, and for women who need a week of their own. from one guest to 25.
          </p>
          <a
            href="#enquire"
            style={{
              display: "inline-block",
              padding: "14px 34px",
              border: "1px solid #C39E88",
              background: "rgba(195,158,136,0.25)",
              color: "#F1F0E5",
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              letterSpacing: "0.04em",
              textDecoration: "none",
              borderRadius: 2,
            }}
          >
            start the conversation →
          </a>
        </div>
      </section>

      {/* WHO WE BUILD FOR */}
      <section style={{ background: "var(--color-bg-page)", padding: "56px 32px 92px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(24px,3.2vw,32px)", color: "var(--color-text-headline)", fontWeight: 700, lineHeight: 1.2, textAlign: "center", marginBottom: 44 }}>
              who we build for
            </h2>
          </FadeIn>

          <div className="aud-grid">
            {AUDIENCES.map((a, i) => (
              <FadeIn key={a.eyebrow} delay={0.06 * i}>
                <div style={{ height: "100%", background: "var(--color-bg-surface)", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ position: "relative", aspectRatio: "16/10", background: "var(--color-bg-card)" }}>
                    <Image src={a.image} alt={a.alt} fill sizes="(max-width: 900px) 100vw, 340px" style={{ objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "26px 28px 30px" }}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 14 }}>
                    {a.eyebrow}
                  </p>
                  <h3 style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 500, fontSize: 26, color: "var(--color-text-headline)", lineHeight: 1.2, marginBottom: 14, textWrap: "balance" }}>
                    {a.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14.5, lineHeight: 1.7, color: "var(--color-text-body)", marginBottom: 18 }}>
                    {a.body}
                  </p>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "0.5px solid var(--color-border)" }}>
                    {a.examples.map((ex) => (
                      <li key={ex} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13.5, lineHeight: 1.5, color: "var(--color-text-body)", padding: "10px 0", borderBottom: "0.5px solid var(--color-border)" }}>
                        {ex}
                      </li>
                    ))}
                  </ul>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <style>{`
          .aud-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
          @media (max-width: 900px) { .aud-grid { grid-template-columns: 1fr; max-width: 560px; margin: 0 auto; } }
        `}</style>
      </section>

      {/* WHAT'S INCLUDED */}
      {/* Dark, so the page is not cream the whole way down, and an editorial
          list rather than a grid of bordered cards: identical boxes read as
          box soup, and a card stretching to match its row partner trails dead
          space whatever its padding. Rows here size to their own content. */}
      <section style={{ background: "#2D2521", padding: "56px 32px 104px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <h2
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "clamp(24px,3.2vw,32px)",
                color: "#F1F0E5",
                fontWeight: 700,
                lineHeight: 1.2,
                textAlign: "center",
                marginBottom: 56,
              }}
            >
              the ASHA experience
            </h2>
          </FadeIn>

          <div>
            {INCLUDED.map((item, i) => (
              <FadeIn key={item.title} delay={0.04}>
                <div
                  className="inc-row"
                  style={{
                    borderTop: "0.5px solid rgba(241,240,229,0.14)",
                    padding: "36px 0",
                  }}
                >
                  <div className="inc-head">
                    <span
                      aria-hidden="true"
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        color: "#C39E88",
                        display: "block",
                        marginBottom: 12,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontStyle: "italic",
                        fontWeight: 400,
                        fontSize: "clamp(23px,2.6vw,30px)",
                        color: "#F1F0E5",
                        lineHeight: 1.2,
                        textWrap: "balance",
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>

                  <div>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: 15.5,
                        lineHeight: 1.75,
                        color: "#E8D5BC",
                        marginBottom: 14,
                        textWrap: "balance",
                      }}
                    >
                      {item.lead}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: 13.5,
                        lineHeight: 1.9,
                        color: "#C5AA9B",
                        margin: 0,
                      }}
                    >
                      {item.points.map((point, n) => (
                        <span key={point}>
                          {n > 0 && (
                            <span aria-hidden="true" style={{ color: "#C39E88", padding: "0 9px" }}>
                              ·
                            </span>
                          )}
                          {point}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
            <div style={{ borderTop: "0.5px solid rgba(241,240,229,0.14)" }} />
          </div>
        </div>
        <style>{`
          .inc-row {
            display: grid;
            grid-template-columns: 300px 1fr;
            gap: 48px;
            align-items: start;
          }
          @media (max-width: 760px) {
            .inc-row { grid-template-columns: 1fr !important; gap: 14px !important; padding: 30px 0 !important; }
          }
        `}</style>
      </section>

      {/* PROOF — the page was 2,900px of text with one photo on it */}
      <section style={{ position: "relative", height: "clamp(320px,46vw,520px)", overflow: "hidden" }}>
        <Image
          src="/images/ReturnToLove girls group 2.jpg"
          alt="The Return to Love group celebrating together with arms raised"
          fill
          sizes="100vw"
          style={{ objectFit: "cover", objectPosition: "center 45%" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "rgba(45,37,33,0.32)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "0 32px 40px" }}>
          <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(20px,3vw,30px)", color: "#F1F0E5", maxWidth: 620, margin: "0 auto", textAlign: "center", lineHeight: 1.35, textWrap: "balance" }}>
            we have run this week for strangers who left as family. we can run it for your team, your
            community, or just for you.
          </p>
        </div>
      </section>

      {/* WHO LEADS IT */}
      <section style={{ background: "var(--color-bg-surface)", padding: "56px 32px 92px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 44 }}>
              <p className="eyebrow-accent" style={{ marginBottom: 14 }}>who leads it</p>
              <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(24px,3.2vw,32px)", color: "var(--color-text-headline)", fontWeight: 700, lineHeight: 1.2, marginBottom: 14, textWrap: "balance" }}>
                with you the whole way
              </h2>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15.5, lineHeight: 1.6, color: "var(--color-text-body)", maxWidth: 520, margin: "0 auto", textWrap: "balance" }}>
                both of us are there every day, and you have one point of contact from the first call to the last goodbye.
              </p>
            </div>
          </FadeIn>
          <div className="lead-grid">
            {LEADS.map((l, i) => (
              <FadeIn key={l.name} delay={0.06 * i}>
                <div className="lead-card" style={{ background: "var(--color-bg-page)", borderRadius: 4, overflow: "hidden", height: "100%" }}>
                  <div style={{ position: "relative", background: "var(--color-bg-card)" }} className="lead-photo">
                    <Image src={l.image} alt={`Portrait of ${l.name}`} fill sizes="(max-width: 760px) 100vw, 220px" style={{ objectFit: "cover", objectPosition: "center 25%" }} />
                  </div>
                  <div style={{ padding: "26px 26px 28px" }}>
                    <h3 style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 500, fontSize: 32, color: "var(--color-text-headline)", lineHeight: 1.1, marginBottom: 4 }}>{l.name}</h3>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, letterSpacing: "0.06em", color: "var(--color-accent)", marginBottom: 12 }}>{l.role}</p>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14.5, lineHeight: 1.65, color: "var(--color-text-body)", margin: 0 }}>{l.bio}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <style>{`
          .lead-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
          .lead-card { display: grid; grid-template-columns: 200px 1fr; }
          .lead-photo { min-height: 260px; }
          @media (max-width: 900px) { .lead-grid { grid-template-columns: 1fr; max-width: 560px; margin: 0 auto; } }
          @media (max-width: 520px) {
            .lead-card { grid-template-columns: 1fr; }
            .lead-photo { min-height: 0; aspect-ratio: 4/3; }
          }
        `}</style>
      </section>

      {/* THE PROCESS */}
      <section style={{ background: "var(--color-bg-page)", borderTop: "0.5px solid var(--color-border)", padding: "56px 32px 84px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <FadeIn>
            <p className="eyebrow-accent" style={{ marginBottom: 14, textAlign: "center" }}>how it works</p>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(24px,3.2vw,32px)", color: "var(--color-text-headline)", fontWeight: 700, textAlign: "center", marginBottom: 12, textWrap: "balance" }}>
              from vision to experience
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15.5, lineHeight: 1.6, color: "var(--color-text-body)", textAlign: "center", marginBottom: 44 }}>
              a collaborative process, designed around you.
            </p>
          </FadeIn>

          <ol style={{ listStyle: "none", padding: 0, margin: 0, borderTop: "0.5px solid var(--color-bg-card)" }}>
            {PROCESS.map((step, i) => (
              <FadeIn key={step.title} delay={0.04}>
                <li className="proc-row" style={{ display: "flex", gap: 22, alignItems: "flex-start", padding: "24px 0", borderBottom: "0.5px solid var(--color-bg-card)" }}>
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "0 0 auto",
                      width: 46,
                      height: 46,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "var(--color-bg-card)",
                      borderRadius: 4,
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 15,
                      color: "var(--color-text-headline)",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-fraunces)", fontWeight: 700, fontSize: 19, color: "var(--color-text-headline)", lineHeight: 1.3, marginBottom: 6 }}>
                      {step.title}
                    </h3>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.65, color: "var(--color-text-body)", margin: 0 }}>
                      {step.body}
                    </p>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>

          <FadeIn>
            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(20px,2.6vw,26px)", color: "var(--color-accent)", textAlign: "center", marginTop: 44, lineHeight: 1.35, textWrap: "balance" }}>
              your vision. our expertise. an experience entirely your own.
            </p>
          </FadeIn>
        </div>
        <style>{`
          @media (max-width: 520px) {
            .proc-row { gap: 16px !important; }
          }
        `}</style>
      </section>

      {/* THE FORM */}
      <section id="enquire" style={{ background: "var(--color-bg-surface)", padding: "84px 32px 92px", scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <FadeIn delay={0.05}>
            <div style={{ position: "relative", aspectRatio: "16/7", borderRadius: 2, overflow: "hidden", marginBottom: 36, background: "var(--color-bg-card)" }}>
              <Image
                src="/images/group arm raise.jpg"
                alt="Women with hands joined and raised on retreat"
                fill
                sizes="(max-width: 700px) 100vw, 640px"
                style={{ objectFit: "cover", objectPosition: "center 38%" }}
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ background: "var(--color-bg-page)", border: "0.5px solid var(--color-border)", borderRadius: 4, padding: "36px 32px" }}>
              {stage === "start" && (
                <form onSubmit={startEnquiry} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.8, color: "var(--color-text-body)" }}>
                    two things first, so we can reach you if the rest takes a minute.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <label htmlFor="cr-name" style={labelStyle}>your name</label>
                    <input id="cr-name" type="text" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <label htmlFor="cr-email" style={labelStyle}>your email</label>
                    <input id="cr-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
                  </div>
                  {error && <p role="alert" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "#9A4A3A" }}>{error}</p>}
                  <button
                    type="submit"
                    style={{
                      alignSelf: "flex-start",
                      padding: "13px 30px",
                      background: "var(--color-accent)",
                      border: "1px solid var(--color-accent)",
                      color: "#FFFCF5",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 13,
                      letterSpacing: "0.04em",
                      borderRadius: 2,
                      cursor: "pointer",
                      minHeight: 44,
                    }}
                  >
                    continue →
                  </button>
                </form>
              )}

              {stage === "details" && (
                <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, letterSpacing: "0.06em", color: "var(--color-accent)" }}>
                    step two of two
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: "1 1 260px", minWidth: 0 }}>
                      <label htmlFor="cr-who" style={labelStyle}>who&apos;s coming</label>
                      <select id="cr-who" value={who} onChange={(e) => setWho(e.target.value)} style={{ ...inputStyle, minHeight: 44 }}>
                        <option value="">choose one</option>
                        <option value="my brand's community">my brand&apos;s community</option>
                        <option value="my company">my company or team</option>
                        <option value="just me">just me</option>
                        <option value="a group of friends">a group of friends</option>
                        <option value="my women's circle">my women&apos;s circle</option>
                        <option value="not sure yet">not sure yet</option>
                      </select>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: "1 1 150px", minWidth: 0 }}>
                      <label htmlFor="cr-count" style={labelStyle}>how many</label>
                      <input id="cr-count" type="number" min={1} max={25} placeholder="1–25" value={headcount} onChange={(e) => setHeadcount(e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  {(who === "my company" || who === "my brand's community") && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 7, background: "var(--color-bg-surface)", border: "0.5px solid var(--color-border)", borderRadius: 2, padding: 18 }}>
                      <label htmlFor="cr-company" style={labelStyle}>{who === "my company" ? "company name" : "brand name"}</label>
                      <input id="cr-company" type="text" value={company} onChange={(e) => setCompany(e.target.value)} style={inputStyle} />
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, lineHeight: 1.7, color: "var(--color-text-body)", marginTop: 4 }}>
                        we can invoice the company and work to a procurement timeline — say the word on the call.
                      </p>
                    </div>
                  )}

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: "1 1 200px", minWidth: 0 }}>
                      <label htmlFor="cr-based" style={labelStyle}>where are you based</label>
                      <input id="cr-based" type="text" placeholder="city or country" value={based} onChange={(e) => setBased(e.target.value)} style={inputStyle} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: "1 1 200px", minWidth: 0 }}>
                      <label htmlFor="cr-phone" style={labelStyle}>
                        phone <span style={{ fontStyle: "italic" }}>(optional)</span>
                      </label>
                      <input id="cr-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: "1 1 200px", minWidth: 0 }}>
                      <label htmlFor="cr-when" style={labelStyle}>when, roughly</label>
                      <input id="cr-when" type="text" placeholder="spring 2027, or “open”" value={when} onChange={(e) => setWhen(e.target.value)} style={inputStyle} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: "1 1 200px", minWidth: 0 }}>
                      <label htmlFor="cr-where" style={labelStyle}>where you&apos;re drawn to</label>
                      <input id="cr-where" type="text" placeholder="Morocco, Bali, open to ideas…" value={where} onChange={(e) => setWhere(e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <label htmlFor="cr-leading" style={labelStyle}>who leads the week?</label>
                    <select id="cr-leading" value={leading} onChange={(e) => setLeading(e.target.value)} style={{ ...inputStyle, minHeight: 44 }}>
                      <option value="">choose one</option>
                      <option value="ASHA leads everything">we want you to lead all of it</option>
                      <option value="shared — ASHA plus our own sessions">some of it you, some of it us</option>
                      <option value="we bring our own programming">we bring our own programming, you handle the rest</option>
                      <option value="not sure yet">not sure yet</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <label htmlFor="cr-outcome" style={labelStyle}>what do you want them to leave with?</label>
                    <textarea
                      id="cr-outcome"
                      rows={4}
                      placeholder="the thing underneath the trip — what should be different when they fly home?"
                      value={outcome}
                      onChange={(e) => setOutcome(e.target.value)}
                      style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                    />
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <label htmlFor="cr-budget" style={labelStyle}>
                      budget per person <span style={{ fontStyle: "italic", color: "var(--color-text-body)" }}>(optional)</span>
                    </label>
                    <select id="cr-budget" value={budget} onChange={(e) => setBudget(e.target.value)} style={{ ...inputStyle, minHeight: 44 }}>
                      <option value="">rather not say</option>
                      <option value="under $2,500">under $2,500</option>
                      <option value="$2,500 – $4,000">$2,500 – $4,000</option>
                      <option value="$4,000 – $6,000">$4,000 – $6,000</option>
                      <option value="$6,000+">$6,000+</option>
                    </select>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                    <label htmlFor="cr-else" style={labelStyle}>
                      anything else we should know? <span style={{ fontStyle: "italic" }}>(optional)</span>
                    </label>
                    <textarea
                      id="cr-else"
                      rows={3}
                      value={anythingElse}
                      onChange={(e) => setAnythingElse(e.target.value)}
                      style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                    />
                  </div>

                  {error && <p role="alert" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "#9A4A3A" }}>{error}</p>}

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 14, alignItems: "center", marginTop: 4 }}>
                    <button
                      type="submit"
                      disabled={sending}
                      style={{
                        padding: "14px 32px",
                        background: "var(--color-accent)",
                        border: "1px solid var(--color-accent)",
                        color: "#FFFCF5",
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: 13,
                        letterSpacing: "0.04em",
                        borderRadius: 2,
                        cursor: sending ? "default" : "pointer",
                        opacity: sending ? 0.7 : 1,
                        minHeight: 44,
                      }}
                    >
                      {sending ? "sending…" : "send this to Ashley & Shannon →"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setStage("start")}
                      style={{
                        padding: "14px 10px",
                        background: "none",
                        border: "none",
                        color: "var(--color-text-body)",
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: 13,
                        textDecoration: "underline",
                        cursor: "pointer",
                        minHeight: 44,
                      }}
                    >
                      back
                    </button>
                  </div>
                </form>
              )}

              {stage === "done" && (
                <div style={{ textAlign: "center", padding: "12px 0" }}>
                  <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 28, color: "var(--color-text-headline)", marginBottom: 14 }}>
                    that&apos;s with us now.
                  </p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.85, color: "var(--color-text-body)", maxWidth: 420, margin: "0 auto 28px" }}>
                    one of us will read it and write back — there are two of us and no assistants, so give it a day or so.
                  </p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.8, color: "var(--color-text-body)", marginBottom: 18 }}>
                    this kind of trip comes together fastest on a call.
                  </p>
                  <a
                    href={CALENDAR_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      padding: "14px 32px",
                      background: "var(--color-accent)",
                      border: "1px solid var(--color-accent)",
                      color: "#FFFCF5",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 13,
                      letterSpacing: "0.04em",
                      borderRadius: 2,
                      textDecoration: "none",
                    }}
                  >
                    book a call with us →
                  </a>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

    </main>
  );
}
