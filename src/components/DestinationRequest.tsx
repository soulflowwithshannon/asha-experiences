"use client";

import { useState } from "react";
import posthog from "posthog-js";
import FadeIn from "@/components/FadeIn";

const inputStyle: React.CSSProperties = {
  padding: "13px 14px",
  border: "0.5px solid var(--color-bg-card)",
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

export default function DestinationRequest() {
  const [destination, setDestination] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const place = destination.trim();
    if (!place || !email.trim()) {
      setError("tell us where, and where to reach you.");
      return;
    }

    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/destination-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination: place, email: email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "something went wrong. try again?");
        return;
      }

      // so the most-asked-for places tally themselves, rather than living in an inbox
      posthog.capture("destination_requested", { destination: place.toLowerCase() });
      setSent(place);
    } catch {
      setError("something went wrong. try again?");
    } finally {
      setSending(false);
    }
  }

  return (
    <section style={{ background: "var(--color-bg-surface)", padding: "72px 32px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        {sent ? (
          <FadeIn>
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 28, color: "var(--color-text-headline)", marginBottom: 12 }}>
                {sent} it is.
              </p>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.85, color: "var(--color-text-body)", maxWidth: 440, margin: "0 auto" }}>
                noted, and added to the list we actually plan from. if enough women ask for it, you&apos;ll be the first to hear.
              </p>
            </div>
          </FadeIn>
        ) : (
          <>
            <FadeIn>
              <div style={{ textAlign: "center", marginBottom: 30 }}>
                <p className="eyebrow-accent" style={{ marginBottom: 14 }}>help us choose</p>
                <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(24px,3.4vw,30px)", color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 12 }}>
                  where should we go next?
                </h2>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.85, color: "var(--color-text-body)", maxWidth: 460, margin: "0 auto" }}>
                  tell us where you want to go.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <form onSubmit={submit} style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-end", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: "1 1 230px", minWidth: 0 }}>
                  <label htmlFor="destination" style={labelStyle}>destination</label>
                  <input
                    id="destination"
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Bali, Portugal, Costa Rica…"
                    style={inputStyle}
                  />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7, flex: "1 1 230px", minWidth: 0 }}>
                  <label htmlFor="destination-email" style={labelStyle}>your email</label>
                  <input
                    id="destination-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    style={inputStyle}
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  style={{
                    padding: "14px 30px",
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
                  {sending ? "sending…" : "send it"}
                </button>
              </form>
            </FadeIn>

            {error && (
              <p role="alert" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "#9A4A3A", textAlign: "center", marginTop: 16 }}>
                {error}
              </p>
            )}
          </>
        )}
      </div>
    </section>
  );
}
