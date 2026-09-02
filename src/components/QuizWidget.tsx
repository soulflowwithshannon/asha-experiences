"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Archetype = "releaser" | "wild" | "dusk";

const QUESTIONS: { q: string; options: { label: string; type: Archetype }[] }[] = [
  {
    q: "what's pulling at you right now?",
    options: [
      { label: "something in my life just ended, and I don't fully know who I am without it yet.", type: "releaser" },
      { label: "I want to feel my own aliveness again — not managed, not scheduled, just alive.", type: "wild" },
      { label: "I just need everything to go quiet. all of it.", type: "dusk" },
    ],
  },
  {
    q: "what does your nervous system need most?",
    options: [
      { label: "release", type: "releaser" },
      { label: "aliveness", type: "wild" },
      { label: "stillness", type: "dusk" },
    ],
  },
  {
    q: "pick the moment that sounds like relief.",
    options: [
      { label: "burning something that no longer fits, and not looking back.", type: "releaser" },
      { label: "standing somewhere so wild it makes your problems feel small.", type: "wild" },
      { label: "sitting in silence long enough to hear your own voice again.", type: "dusk" },
    ],
  },
  {
    q: "what's been the loudest thing in your head lately?",
    options: [
      { label: "the version of me that existed before all this changed.", type: "releaser" },
      { label: "how long it's been since I felt anything at all.", type: "wild" },
      { label: "everyone else's needs, on a loop, with no off switch.", type: "dusk" },
    ],
  },
  {
    q: "if you could only bring one feeling home, what would it be?",
    options: [
      { label: "closure.", type: "releaser" },
      { label: "freedom.", type: "wild" },
      { label: "clarity.", type: "dusk" },
    ],
  },
];

/* Evergreen: archetypes never change. Only the retreat/dates/status fields
   below need updating as inventory changes. */
const RESULTS: Record<
  Archetype,
  { title: string; body: string; retreat: string; place: string; status: string; href: string; image: string }
> = {
  releaser: {
    title: "you are the releaser.",
    body: "something in your life already ended, or is ending — and you're standing exactly where this retreat gets its name. becoming her was never about arriving somewhere finished. it's a ceremony for whoever you're turning into next.",
    retreat: "Becoming HER",
    place: "Riviera Maya, Mexico · Oct 27–31, 2026",
    status: "4 spots left",
    href: "/retreats/mexico",
    image: "/images/Mexico hero.jpeg",
  },
  wild: {
    title: "you are the wild one.",
    body: "you've been managing everything for so long, you forgot what your own aliveness feels like. you don't need rest. you need something big enough to remind your nervous system what it's like to feel small in the best way.",
    retreat: "Into the Wild",
    place: "Ol Pejeta Conservancy, Kenya · Nov 28 – Dec 4, 2027",
    status: "capped at 10 women",
    href: "/retreats/kenya",
    image: "/images/Into the Wild Hero.jpg",
  },
  dusk: {
    title: "you are the reconnector.",
    body: "the noise got too loud, and somewhere in all of it, you got quiet too. you don't need more input. you need enough silence to hear your own voice again.",
    retreat: "Sacred Sands",
    place: "Agadir, Morocco · Nov 29 – Dec 5, 2026",
    status: "spots available",
    href: "/retreats/morocco",
    image: "/images/morocco-hero-v2.png",
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function QuizWidget() {
  const [phase, setPhase] = useState<"gate" | "quiz" | "result">("gate");
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Archetype[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gateState, setGateState] = useState<"idle" | "sending">("idle");
  const [err, setErr] = useState("");

  const result: Archetype = (() => {
    const tally: Record<string, number> = {};
    answers.forEach((a) => (tally[a] = (tally[a] || 0) + 1));
    // ties resolve to the earliest-chosen archetype, so her first answer carries weight
    return (Object.keys(tally).sort(
      (a, b) => tally[b] - tally[a] || answers.indexOf(a as Archetype) - answers.indexOf(b as Archetype)
    )[0] as Archetype) || "dusk";
  })();

  const r = RESULTS[result];

  /* Gate: capture her before the questions. Adds her to the audience immediately,
     so an abandoned quiz is still a captured lead. */
  async function startQuiz(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) { setErr("please add your first name"); return; }
    if (!email.trim()) { setErr("please add your email"); return; }
    setGateState("sending"); setErr("");
    try {
      const res = await fetch("/api/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, stage: "start" }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setErr(d.error || "something went wrong — please try again");
        setGateState("idle");
        return;
      }
      setPhase("quiz");
      setGateState("idle");
    } catch {
      setErr("something went wrong — try again, or email us at connect@ashaexperiences.com");
      setGateState("idle");
    }
  }

  function choose(type: Archetype) {
    const next = [...answers.slice(0, step), type];
    setAnswers(next);
    if (next.length === QUESTIONS.length) {
      setPhase("result");
      // send her the result — she's already captured, so a failure here is not fatal
      const tally: Record<string, number> = {};
      next.forEach((a) => (tally[a] = (tally[a] || 0) + 1));
      const arch = Object.keys(tally).sort(
        (a, b) => tally[b] - tally[a] || next.indexOf(a as Archetype) - next.indexOf(b as Archetype)
      )[0];
      fetch("/api/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, archetype: arch, stage: "result" }),
      }).catch(() => {});
    } else {
      setStep(step + 1);
    }
  }

  const btn: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 14,
    width: "100%", textAlign: "left",
    padding: "16px 18px", marginBottom: 10,
    background: "var(--color-bg-surface)",
    border: "0.5px solid var(--color-bg-card)",
    borderRadius: 4, cursor: "pointer",
    fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.45,
    color: "var(--color-text-headline)",
    transition: "background .2s ease, border-color .2s ease, color .2s ease",
  };

  const key: React.CSSProperties = {
    flex: "none", width: 24, height: 24, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "var(--font-dm-sans)", fontSize: 11, fontWeight: 500,
    background: "var(--color-bg-card)", color: "var(--color-text-headline)",
    transition: "background .2s ease, color .2s ease",
  };

  const input: React.CSSProperties = {
    width: "100%", padding: "14px 16px",
    background: "var(--color-bg-page)",
    border: "1px solid var(--color-text-headline)",
    borderRadius: 4, fontFamily: "var(--font-dm-sans)", fontSize: 15,
    color: "var(--color-text-body)", outline: "none", boxSizing: "border-box",
  };

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", width: "100%" }}>
      {phase === "quiz" && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", gap: 5, marginBottom: 12 }}>
            {QUESTIONS.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 3, borderRadius: 2,
                background: i <= step ? "var(--color-accent)" : "var(--color-bg-card)",
                transition: "background .4s ease",
              }} />
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--color-accent)" }}>
            question {step + 1} of {QUESTIONS.length}
          </p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {phase === "gate" ? (
          <motion.div key="gate" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease }}>
            <form onSubmit={startQuiz} style={{
              background: "var(--color-bg-surface)",
              border: "0.5px solid var(--color-bg-card)",
              borderRadius: 6, padding: "28px 26px",
            }}>
              <h2 style={{
                fontFamily: "var(--font-fraunces)", fontWeight: 700,
                fontSize: "clamp(21px,3.6vw,25px)", lineHeight: 1.3,
                color: "var(--color-text-headline)", marginBottom: 18,
              }}>
                five questions.
              </h2>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.7, color: "var(--color-text-body)", marginBottom: 12 }}>
                don&apos;t overthink this. just choose whichever response pulls at you most, even if you relate to more than one.
              </p>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.7, color: "var(--color-text-body)", marginBottom: 22 }}>
                we&apos;ll send your result so you can keep it.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <input style={input} type="text" required placeholder="first name" value={name} onChange={(e) => setName(e.target.value)} aria-label="first name" />
                <input style={input} type="email" required placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="email" />
                {err && <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-accent)" }}>{err}</p>}
                <button type="submit" disabled={gateState === "sending"} style={{
                  padding: "14px 28px", background: "var(--color-accent)",
                  border: "1px solid var(--color-accent)", color: "#FFFCF5",
                  fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: ".04em",
                  cursor: gateState === "sending" ? "not-allowed" : "pointer",
                  opacity: gateState === "sending" ? 0.6 : 1, borderRadius: 0,
                }}>
                  {gateState === "sending" ? "one moment..." : "begin →"}
                </button>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-body)", textAlign: "center" }}>
                  no spam. leave any time.
                </p>
              </div>
            </form>
          </motion.div>
        ) : phase === "quiz" ? (
          <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.45, ease }}>
            <h2 style={{
              fontFamily: "var(--font-fraunces)", fontWeight: 700,
              fontSize: "clamp(22px,4vw,27px)", lineHeight: 1.25,
              color: "var(--color-text-headline)", marginBottom: 24,
            }}>
              {QUESTIONS[step].q}
            </h2>

            {QUESTIONS[step].options.map((o, i) => (
              <button
                key={o.label}
                onClick={() => choose(o.type)}
                style={btn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--color-accent)";
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                  e.currentTarget.style.color = "#FFFCF5";
                  const k = e.currentTarget.firstElementChild as HTMLElement;
                  if (k) { k.style.background = "rgba(255,252,245,0.25)"; k.style.color = "#FFFCF5"; }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--color-bg-surface)";
                  e.currentTarget.style.borderColor = "var(--color-bg-card)";
                  e.currentTarget.style.color = "var(--color-text-headline)";
                  const k = e.currentTarget.firstElementChild as HTMLElement;
                  if (k) { k.style.background = "var(--color-bg-card)"; k.style.color = "var(--color-text-headline)"; }
                }}
              >
                <span style={key} aria-hidden="true">{["A", "B", "C"][i]}</span>
                {o.label}
              </button>
            ))}

            {step > 0 && (
              <button onClick={() => setStep(step - 1)} style={{
                marginTop: 12, background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--color-accent)", padding: 0,
              }}>
                ← back
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }}>
            <p className="eyebrow-accent" style={{ marginBottom: 14 }}>
              your result
            </p>
            <h2 style={{
              fontFamily: "var(--font-fraunces)", fontWeight: 700,
              fontSize: "clamp(30px,6vw,44px)", color: "var(--color-text-headline)",
              marginBottom: 10, lineHeight: 1.1,
            }}>
              {r.title}
            </h2>
            <p style={{
              fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.75,
              color: "var(--color-text-body)", marginBottom: 36,
            }}>
              {r.body}
            </p>

            <Link href={r.href} style={{ textDecoration: "none", display: "block" }}>
              <div style={{
                border: "0.5px solid var(--color-border)", borderRadius: 6,
                overflow: "hidden", marginBottom: 28, background: "var(--color-bg-surface)",
              }}>
                <div style={{ position: "relative", width: "100%", aspectRatio: "16/9" }}>
                  <Image src={r.image} alt={r.retreat} fill style={{ objectFit: "cover" }} sizes="(max-width:768px) 100vw, 620px" />
                </div>
                <div style={{ padding: "22px 24px" }}>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 8 }}>
                    your retreat · {r.status}
                  </p>
                  <p style={{ fontFamily: "var(--font-fraunces)", fontWeight: 700, fontSize: 22, color: "var(--color-text-headline)", marginBottom: 6 }}>
                    {r.retreat}
                  </p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-body)", marginBottom: 16 }}>{r.place}</p>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, letterSpacing: ".04em", color: "var(--color-accent)" }}>
                    see the full retreat →
                  </span>
                </div>
              </div>
            </Link>

            <div style={{ borderTop: "0.5px solid var(--color-border)", paddingTop: 24 }}>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.7, color: "var(--color-text-body)" }}>
                we&apos;ve sent this to <strong style={{ color: "var(--color-text-headline)", fontWeight: 500 }}>{email}</strong> — along with a little more about what the week actually looks like.
              </p>
            </div>

            <button
              onClick={() => { setAnswers([]); setStep(0); setPhase("quiz"); }}
              style={{
                marginTop: 24, background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--color-text-body)", padding: 0,
              }}
            >
              ← take it again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
