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
            you bring the women.<br />we build the week.
          </h1>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16, lineHeight: 1.8, color: "#E8D5BC", maxWidth: 520, margin: "0 auto 32px" }}>
            from one, to groups of up to 25. your circle, your closest friends, or your team.
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

      {/* WHAT'S INCLUDED */}
      <section style={{ background: "var(--color-bg-surface)", padding: "88px 32px 96px" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <h2
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-fraunces)",
                  fontSize: "clamp(27px,3.6vw,36px)",
                  color: "var(--color-text-headline)",
                  fontWeight: 700,
                  paddingBottom: 14,
                  borderBottom: "1px solid var(--color-accent)",
                }}
              >
                What&apos;s Included
              </h2>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.8, color: "var(--color-text-body)", maxWidth: 520, margin: "20px auto 0" }}>
                every part of it, except deciding who to invite.
              </p>
            </div>
          </FadeIn>

          <div className="included-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 20 }}>
            {INCLUDED.map((item, i) => (
              <FadeIn key={item.title} delay={(i % 2) * 0.08}>
                <div
                  style={{
                    height: "100%",
                    boxSizing: "border-box",
                    background: "var(--color-bg-page)",
                    border: "0.5px solid var(--color-border)",
                    borderRadius: 4,
                    padding: "28px 28px 26px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
                    <span
                      style={{
                        fontFamily: "var(--font-cormorant)",
                        fontSize: 15,
                        letterSpacing: "0.06em",
                        color: "var(--color-accent)",
                        flexShrink: 0,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: 19, color: "var(--color-text-headline)", fontWeight: 700, lineHeight: 1.3 }}>
                      {item.title}
                    </h3>
                  </div>

                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.75, color: "var(--color-text-body)", marginBottom: 18 }}>
                    {item.lead}
                  </p>

                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 9, borderTop: "0.5px solid var(--color-border)", paddingTop: 16 }}>
                    {item.points.map((point) => (
                      <li key={point} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2.2" style={{ flexShrink: 0, marginTop: 4 }} aria-hidden="true">
                          <path d="M4 12.5l5.5 5.5L20 6.5" />
                        </svg>
                        <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13.5, lineHeight: 1.65, color: "var(--color-text-body)" }}>
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:760px){.included-grid{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* WHO IT'S FOR */}
      <section style={{ background: "var(--color-bg-page)", padding: "84px 32px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(24px,3.2vw,30px)", color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 18 }}>
              built around the experience you want
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15.5, lineHeight: 1.9, color: "var(--color-text-body)", maxWidth: 560, margin: "0 auto 40px" }}>
              from a personal customized retreat for one, to groups of up to 25.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {[
                "a solo reset, just you",
                "your women's circle",
                "a group of friends",
                "a company offsite",
                "a milestone — a birthday, a divorce, a beginning",
              ].map((who) => (
                <p
                  key={who}
                  style={{
                    padding: "10px 18px",
                    border: "0.5px solid var(--color-bg-card)",
                    borderRadius: 2,
                    background: "var(--color-bg-surface)",
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 13.5,
                    color: "var(--color-text-body)",
                  }}
                >
                  {who}
                </p>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* THE FORM */}
      <section id="enquire" style={{ background: "var(--color-bg-surface)", padding: "84px 32px 92px", scrollMarginTop: 80 }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <FadeIn>
            <p className="eyebrow-accent" style={{ marginBottom: 14, textAlign: "center" }}>tell us about it</p>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(26px,3.6vw,32px)", color: "var(--color-text-headline)", fontWeight: 700, textAlign: "center", marginBottom: 40 }}>
              let&apos;s start planning your retreat
            </h2>
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
                        <option value="just me">just me</option>
                        <option value="my women's circle">my women&apos;s circle</option>
                        <option value="a group of friends">a group of friends</option>
                        <option value="my company">my company</option>
                        <option value="not sure yet">not sure yet</option>
                      </select>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: "1 1 150px", minWidth: 0 }}>
                      <label htmlFor="cr-count" style={labelStyle}>how many</label>
                      <input id="cr-count" type="number" min={1} max={25} placeholder="1–25" value={headcount} onChange={(e) => setHeadcount(e.target.value)} style={inputStyle} />
                    </div>
                  </div>

                  {who === "my company" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 7, background: "var(--color-bg-surface)", border: "0.5px solid var(--color-border)", borderRadius: 2, padding: 18 }}>
                      <label htmlFor="cr-company" style={labelStyle}>company name</label>
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
