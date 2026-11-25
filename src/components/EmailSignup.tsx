"use client";

import { useState } from "react";

/* Journal email signup: first name + email.
   band — on /blog, between the featured posts and the grid
   end  — closes every post, under the quiz CTA

   It posts to /api/subscribe, which adds her to the Resend audience. The
   provider lives in that route (one function, addSubscriber), so swapping it
   never touches this file.

   SIGNUP_LIVE = false hides the block in production (it still shows in local
   dev), if it ever needs switching off without removing it. */
export const SIGNUP_LIVE = true;

/* Three copy options. Option 1 is the default. To switch, change
   DEFAULT_COPY, or pass heading/body/button as props. */
export const SIGNUP_COPY = {
  one: {
    heading: "letters for women on the way back to themselves",
    body: "every so often, something honest from us. no fluff, no daily emails. just the words we wish someone had sent us sooner.",
    button: "send them to me",
  },
  two: {
    heading: "want this in your inbox?",
    body: "new writing from the journal, and first word when a retreat opens. we only write when we have something real to say.",
    button: "count me in",
  },
  three: {
    heading: "for the woman who's always last on her own list",
    body: "a note from Ashley and Shannon now and then: what we're writing, where we're going next, and a reminder that you count too.",
    button: "join us",
  },
} as const;

const DEFAULT_COPY = SIGNUP_COPY.one;

export default function EmailSignup({
  variant = "end",
  heading = DEFAULT_COPY.heading,
  body = DEFAULT_COPY.body,
  button = DEFAULT_COPY.button,
  source = "journal",
}: {
  variant?: "band" | "end";
  heading?: string;
  body?: string;
  button?: string;
  /** Where she signed up, passed to the provider as a tag. */
  source?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  if (!SIGNUP_LIVE && process.env.NODE_ENV === "production") return null;

  const band = variant === "band";
  const id = `signup-${variant}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setStatus("error");
      setMessage("we just need your email.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "something went wrong. try again?");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "something went wrong. try again?");
    }
  }

  const label: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-dm-sans)",
    fontSize: 11,
    letterSpacing: "0.08em",
    color: "var(--color-text-body)",
    marginBottom: 6,
    textAlign: "left",
  };
  const input: React.CSSProperties = {
    width: "100%",
    padding: "12px 14px",
    background: "var(--color-bg-page)",
    border: "0.5px solid var(--color-bg-card)",
    borderRadius: 2,
    fontFamily: "var(--font-dm-sans)",
    fontSize: 16, // 16px stops iOS zooming into the field
    color: "var(--color-text-headline)",
    outline: "none",
  };

  const card = (
    <div
      className="signup-card"
      style={{
        background: "var(--color-bg-surface)",
        border: "0.5px solid var(--color-bg-card)",
        borderRadius: 6,
        padding: band ? "36px 32px" : "28px 26px",
        textAlign: "center",
      }}
    >
      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 14 }}>
        the letter
      </p>
      <p
        style={{
          fontFamily: "var(--font-heading)",
          fontSize: band ? "clamp(22px,3.4vw,28px)" : "clamp(19px,2.6vw,23px)",
          lineHeight: 1.25,
          color: "var(--color-text-headline)",
          marginBottom: 12,
          textWrap: "balance",
        }}
      >
        {heading}
      </p>

      {status === "done" ? (
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.7, color: "var(--color-text-body)", maxWidth: 440, margin: "0 auto" }}>
          you&apos;re in{name.trim() ? `, ${name.trim()}` : ""}. <em>thank you for letting us write to you.</em>
        </p>
      ) : (
        <>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.7, color: "var(--color-text-body)", maxWidth: 440, margin: "0 auto 22px", textWrap: "balance" }}>
            {body}
          </p>
          <form onSubmit={submit} noValidate style={{ maxWidth: 520, margin: "0 auto" }}>
            <div className="signup-fields" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr auto", gap: 10, alignItems: "end" }}>
              <div>
                <label htmlFor={`${id}-name`} style={label}>first name</label>
                <input id={`${id}-name`} name="name" type="text" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} style={input} />
              </div>
              <div>
                <label htmlFor={`${id}-email`} style={label}>email</label>
                <input id={`${id}-email`} name="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={input} />
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  padding: "13px 22px",
                  background: "var(--color-accent)",
                  border: "1px solid var(--color-accent)",
                  color: "#FFFCF5",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 12,
                  letterSpacing: "0.04em",
                  cursor: status === "sending" ? "default" : "pointer",
                  opacity: status === "sending" ? 0.7 : 1,
                  whiteSpace: "nowrap",
                }}
              >
                {status === "sending" ? "sending…" : `${button} →`}
              </button>
            </div>
            {status === "error" && (
              <p role="alert" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-accent)", marginTop: 12 }}>
                {message}
              </p>
            )}
          </form>
        </>
      )}

      <style>{`
        @media (max-width: 640px) {
          .signup-fields { grid-template-columns: 1fr !important; }
          .signup-fields button { width: 100%; }
          .signup-band { padding: 0 20px !important; }
          .signup-card { padding: 28px 20px !important; }
        }
      `}</style>
    </div>
  );

  if (band) {
    return <section style={{ maxWidth: 1200, margin: "48px auto 0", padding: "0 48px" }} className="signup-band">{card}</section>;
  }
  return <div style={{ maxWidth: 720, margin: "0 auto 40px", padding: "0 32px" }}>{card}</div>;
}
