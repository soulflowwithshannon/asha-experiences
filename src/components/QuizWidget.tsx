"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

type Archetype = "releaser" | "wild" | "reconnector";

const QUESTIONS: { q: string; options: { label: string; type: Archetype }[] }[] = [
  {
    q: "when you picture yourself getting on the plane, what's underneath it?",
    options: [
      { label: "relief — like finally putting something down", type: "releaser" },
      { label: "restlessness — like something in me wants out", type: "wild" },
      { label: "longing — like I'm going to meet someone I used to be", type: "reconnector" },
    ],
  },
  {
    q: "what's been the hardest part of this year?",
    options: [
      { label: "carrying something I can't seem to set down", type: "releaser" },
      { label: "being the version of me everyone expects", type: "wild" },
      { label: "feeling far from myself, and not knowing when that started", type: "reconnector" },
    ],
  },
  {
    q: "what does your body want most right now?",
    options: [
      { label: "to finally exhale", type: "releaser" },
      { label: "to move, sweat, feel something real", type: "wild" },
      { label: "to be still, somewhere beautiful and quiet", type: "reconnector" },
    ],
  },
  {
    q: "which landscape pulls at you?",
    options: [
      { label: "deep jungle — heat, and water running underground", type: "releaser" },
      { label: "open plains — animals, and an enormous sky", type: "wild" },
      { label: "desert light — mountains and warm stone", type: "reconnector" },
    ],
  },
  {
    q: "a year from now, what would make this worth it?",
    options: [
      { label: "I let go of something I'd outgrown", type: "releaser" },
      { label: "I remembered I'm not as small as I've been acting", type: "wild" },
      { label: "I came home to myself", type: "reconnector" },
    ],
  },
];

/* Evergreen: archetypes never change. Only these retreat/status fields need
   updating as dates sell out or new retreats are added. */
const RESULTS: Record<
  Archetype,
  {
    title: string;
    subtitle: string;
    body: string;
    retreat: string;
    location: string;
    dates: string;
    status: string;
    href: string;
    image: string;
  }
> = {
  releaser: {
    title: "the releaser",
    subtitle: "you came to put something down",
    body: "you're not looking for a holiday. you're carrying a version of yourself that doesn't fit anymore, and some part of you knows it has to be set down somewhere — deliberately, with witnesses. you need ceremony, not a spa.",
    retreat: "Becoming HER",
    location: "Riviera Maya, Mexico",
    dates: "October 27 – 31, 2026",
    status: "limited spots",
    href: "/retreats/mexico",
    image: "/images/Mexico hero.jpeg",
  },
  wild: {
    title: "the wild one",
    subtitle: "you came to stop being so manageable",
    body: "you've been well-behaved for a long time and it's starting to cost you. you don't need fixing — you need somewhere big enough, and wild enough, that the polite version of you can't survive the week.",
    retreat: "Into the Wild",
    location: "Ol Pejeta Conservancy, Kenya",
    dates: "November 28 – December 4, 2027",
    status: "10 places only",
    href: "/retreats/kenya",
    image: "/images/Into the Wild Hero.jpg",
  },
  reconnector: {
    title: "the reconnector",
    subtitle: "you came to find your way back",
    body: "nothing is wrong, exactly. you've just been away from yourself for long enough to notice. you don't need to be broken open — you need somewhere quiet and beautiful, and enough time to hear yourself again.",
    retreat: "Sacred Sands",
    location: "Agadir, Morocco",
    dates: "November 29 – December 5, 2026",
    status: "spots available",
    href: "/retreats/morocco",
    image: "/images/morocco-hero-v2.png",
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function QuizWidget() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Archetype[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  const done = answers.length === QUESTIONS.length;

  const result: Archetype = (() => {
    const tally: Record<string, number> = {};
    answers.forEach((a) => (tally[a] = (tally[a] || 0) + 1));
    // ties resolve to the earliest-chosen archetype, so the first answer carries weight
    return (Object.keys(tally).sort(
      (a, b) => tally[b] - tally[a] || answers.indexOf(a as Archetype) - answers.indexOf(b as Archetype)
    )[0] as Archetype) || "reconnector";
  })();

  const r = RESULTS[result];

  function choose(type: Archetype) {
    const next = [...answers.slice(0, step), type];
    setAnswers(next);
    setStep(step + 1);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) { setErr("please add your email"); return; }
    setState("sending"); setErr("");
    try {
      const res = await fetch("/api/quiz-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, archetype: result, retreat: r.retreat }),
      });
      if (!res.ok) throw new Error();
      setState("done");
    } catch {
      setState("error");
      setErr("something went wrong — try again, or email us at connect@ashaexperiences.com");
    }
  }

  const btn: React.CSSProperties = {
    display: "block", width: "100%", textAlign: "left",
    padding: "18px 20px", marginBottom: 12,
    background: "var(--color-bg-page)",
    border: "0.5px solid var(--color-border)",
    borderRadius: 4, cursor: "pointer",
    fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.5,
    color: "var(--color-text-body)",
    transition: "border-color .2s ease, background .2s ease, transform .2s ease",
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
      {/* progress */}
      {!done && (
        <div style={{ marginBottom: 36 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
            {QUESTIONS.map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 2, borderRadius: 2,
                background: i <= step ? "var(--color-accent)" : "var(--color-border)",
                transition: "background .4s ease",
              }} />
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--color-text-body)" }}>
            {step + 1} of {QUESTIONS.length}
          </p>
        </div>
      )}

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease }}
          >
            <h2 style={{
              fontFamily: "var(--font-cormorant)", fontStyle: "italic",
              fontSize: "clamp(24px,4.5vw,32px)", lineHeight: 1.25,
              color: "var(--color-text-headline)", marginBottom: 28,
            }}>
              {QUESTIONS[step].q}
            </h2>

            {QUESTIONS[step].options.map((o) => (
              <button
                key={o.label}
                onClick={() => choose(o.type)}
                style={btn}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                  e.currentTarget.style.background = "var(--color-bg-surface)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.background = "var(--color-bg-page)";
                }}
              >
                {o.label}
              </button>
            ))}

            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  marginTop: 12, background: "none", border: "none", cursor: "pointer",
                  fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--color-accent)", padding: 0,
                }}
              >
                ← back
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <p className="eyebrow-accent" style={{ marginBottom: 14 }}>you are</p>
            <h2 style={{
              fontFamily: "var(--font-fraunces)", fontWeight: 700,
              fontSize: "clamp(30px,6vw,44px)", color: "var(--color-text-headline)",
              marginBottom: 10, lineHeight: 1.1,
            }}>
              {r.title}
            </h2>
            <p style={{
              fontFamily: "var(--font-cormorant)", fontStyle: "italic",
              fontSize: "clamp(19px,3vw,23px)", color: "var(--color-accent)", marginBottom: 22,
            }}>
              {r.subtitle}
            </p>
            <p style={{
              fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.75,
              color: "var(--color-text-body)", marginBottom: 36,
            }}>
              {r.body}
            </p>

            {/* matched retreat */}
            <Link href={r.href} style={{ textDecoration: "none", display: "block" }}>
              <div style={{
                border: "0.5px solid var(--color-border)", borderRadius: 6,
                overflow: "hidden", marginBottom: 36, background: "var(--color-bg-surface)",
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
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-body)", marginBottom: 4 }}>{r.location}</p>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-body)", marginBottom: 16 }}>{r.dates}</p>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, letterSpacing: ".04em", color: "var(--color-accent)" }}>
                    see the full retreat →
                  </span>
                </div>
              </div>
            </Link>

            {/* email capture */}
            {state === "done" ? (
              <div style={{ borderTop: "0.5px solid var(--color-border)", paddingTop: 28 }}>
                <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 22, color: "var(--color-text-headline)", marginBottom: 8 }}>
                  it&apos;s on its way.
                </p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.7, color: "var(--color-text-body)" }}>
                  check your inbox — we&apos;ve sent your result and a bit more about what the week actually looks like.
                </p>
              </div>
            ) : (
              <form onSubmit={submit} style={{ borderTop: "0.5px solid var(--color-border)", paddingTop: 28 }}>
                <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 21, color: "var(--color-text-headline)", marginBottom: 8 }}>
                  want this in your inbox?
                </p>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, lineHeight: 1.6, color: "var(--color-text-body)", marginBottom: 20 }}>
                  we&apos;ll send your result plus what a day on retreat actually looks like. no spam, and you can leave any time.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <input style={input} type="text" placeholder="first name" value={name} onChange={(e) => setName(e.target.value)} aria-label="first name" />
                  <input style={input} type="email" required placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="email" />
                  {err && <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-accent)" }}>{err}</p>}
                  <button
                    type="submit"
                    disabled={state === "sending"}
                    style={{
                      padding: "14px 28px", background: "var(--color-accent)",
                      border: "1px solid var(--color-accent)", color: "#FFFCF5",
                      fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: ".04em",
                      cursor: state === "sending" ? "not-allowed" : "pointer",
                      opacity: state === "sending" ? 0.6 : 1, borderRadius: 0,
                    }}
                  >
                    {state === "sending" ? "sending..." : "send me my result →"}
                  </button>
                </div>
              </form>
            )}

            <button
              onClick={() => { setAnswers([]); setStep(0); setState("idle"); setErr(""); }}
              style={{
                marginTop: 28, background: "none", border: "none", cursor: "pointer",
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
