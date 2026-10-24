"use client";

import { useState } from "react";
import Image from "next/image";
import posthog from "posthog-js";
import FadeIn from "@/components/FadeIn";
import Divider from "@/components/Divider";
import MeetUs from "@/components/MeetUs";

const CALENDAR_URL = "https://calendar.app.google/Yt1VUQGEuhhEipt59";

/* What we actually do on our own retreats, offered bespoke. */
const INCLUDED = [
  {
    title: "we find the place",
    body: "you tell us the feeling you're after — desert, jungle, ocean, somewhere nobody has heard of — and we come back with places that match your group, your budget and the way you want the week to feel. we have done this three times for our own retreats and we know what a property looks like when it photographs well and still falls apart in practice.",
  },
  {
    title: "we handle the property",
    body: "once you choose, we deal with the venue: rates, contracts, deposits, who sleeps where, and every awkward question about dietary needs and accessibility that you would otherwise be chasing over email for a month.",
  },
  {
    title: "we design the week",
    body: "the arc matters more than the activities. we build a rhythm that opens slowly, goes deep in the middle and sends everyone home steady — rather than a packed schedule that leaves your people more tired than when they arrived.",
  },
  {
    title: "we lead the practices ourselves",
    body: "somatic work, breathwork, yoga, sound healing, reiki and women's circles — led by the two of us, not subcontracted to whoever is local. this is the part we are actually trained in, and it is the reason women come back different.",
  },
  {
    title: "meals, transfers, the day-to-day",
    body: "airport pickups, every meal, excursions, the boat or the hike or the market morning. the logistics that eat your evenings are simply handled.",
  },
  {
    title: "we are there the whole time",
    body: "no agency, no assistants, no handover to a local coordinator. it is Ashley and Shannon on the ground with your group from the first airport run to the last morning.",
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
            one woman to twenty. your circle, your closest friends, or your team.
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

      {/* THE PITCH */}
      <section style={{ background: "var(--color-bg-page)", padding: "88px 32px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(26px,3.6vw,34px)", color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 24 }}>
              the same week we run for strangers, built for your people instead
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16, lineHeight: 1.9, color: "var(--color-text-body)", textWrap: "balance" }}>
              our three retreats have set dates and set places. this is the other door. you tell us who is coming and
              what you want them to walk away with, and we build the whole thing around that — then we show up and
              hold it with you.
            </p>
          </FadeIn>
        </div>
      </section>

      <Divider background="var(--color-bg-page)" />

      {/* WHAT'S INCLUDED */}
      <section style={{ background: "var(--color-bg-surface)", marginTop: 56, padding: "84px 32px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <FadeIn>
            <p className="eyebrow-accent" style={{ marginBottom: 14, textAlign: "center" }}>what we take off your plate</p>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(26px,3.6vw,34px)", color: "var(--color-text-headline)", fontWeight: 700, textAlign: "center", marginBottom: 56 }}>
              everything except who to invite
            </h2>
          </FadeIn>

          <div className="included-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "44px 48px" }}>
            {INCLUDED.map((item, i) => (
              <FadeIn key={item.title} delay={(i % 2) * 0.08}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-fraunces)", fontSize: 20, color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 10 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14.5, lineHeight: 1.85, color: "var(--color-text-body)" }}>
                    {item.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:760px){.included-grid{grid-template-columns:1fr!important;gap:36px!important}}`}</style>
      </section>

      {/* WHO IT'S FOR */}
      <section style={{ background: "var(--color-bg-page)", padding: "84px 32px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(24px,3.2vw,30px)", color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 20 }}>
              from one woman to twenty
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.9, color: "var(--color-text-body)", maxWidth: 560, margin: "0 auto 40px" }}>
              we don&apos;t run retreats for hundreds. we never will. small is the whole point — it is the only way every
              woman in the room actually gets seen.
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
              what are you building?
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
                      <input id="cr-count" type="number" min={1} max={20} placeholder="1–20" value={headcount} onChange={(e) => setHeadcount(e.target.value)} style={inputStyle} />
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
                      <label htmlFor="cr-when" style={labelStyle}>when, roughly</label>
                      <input id="cr-when" type="text" placeholder="spring 2027, or “open”" value={when} onChange={(e) => setWhen(e.target.value)} style={inputStyle} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: "1 1 200px", minWidth: 0 }}>
                      <label htmlFor="cr-where" style={labelStyle}>where you&apos;re drawn to</label>
                      <input id="cr-where" type="text" placeholder="Morocco, Bali, open to ideas…" value={where} onChange={(e) => setWhere(e.target.value)} style={inputStyle} />
                    </div>
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

      <MeetUs
        headline="not sure what you're building yet?"
        body="that's usually how these start. a call is the fastest way to find out whether there's a retreat in it."
        spaceAbove={56}
      />
    </main>
  );
}
