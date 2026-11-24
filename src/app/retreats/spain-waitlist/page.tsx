"use client";

// Casa Amor waitlist. Posts to /api/destination-request (the same Resend
// mechanism the home page "where should we go next" form used), with the
// destination fixed to "Spain 2027".
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const DESTINATION = "Spain 2027";

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "14px 16px",
  border: "1px solid var(--color-text-headline)",
  background: "var(--color-bg-page)",
  color: "var(--color-text-body)",
  fontFamily: "var(--font-dm-sans)",
  fontSize: 15,
  borderRadius: 4,
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans)",
  fontSize: 12,
  letterSpacing: "0.06em",
  color: "var(--color-text-body)",
};

export default function SpainWaitlistPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("add your name and email, and you're on it.");
      return;
    }
    const destination = new FormData(e.currentTarget).get("destination") || DESTINATION;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/destination-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), destination }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "something went wrong. try again?");
        return;
      }
      setSent(true);
    } catch {
      setError("something went wrong. try again?");
    } finally {
      setSending(false);
    }
  }

  return (
    <main style={{ background: "var(--color-bg-page)" }}>
      {/* photo header: /retreats/* pages get the light nav, so this needs a dark top */}
      <section style={{ position: "relative", minHeight: "min(52vh, 460px)", display: "flex", alignItems: "flex-end", justifyContent: "center", overflow: "hidden", background: "#2D2521" }}>
        <Image src="/images/Vejer de la Frontera.jpeg" alt="the white town of Vejer de la Frontera above the countryside and the sea" fill priority sizes="100vw" style={{ objectFit: "cover", objectPosition: "center 60%" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(45,37,33,0.45), rgba(45,37,33,0.7))" }} />
        <div style={{ position: "relative", textAlign: "center", padding: "120px 24px 48px" }}>
          <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: "#E8D5BC", marginBottom: 14 }}>
            Andalusia, Spain · June 2027
          </p>
          <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(40px,7vw,64px)", color: "#F1F0E5", fontWeight: 700, lineHeight: 1.05 }}>
            Casa Amor
          </h1>
        </div>
      </section>

      <section style={{ padding: "64px 24px 96px" }}>
        <div style={{ maxWidth: 480, margin: "0 auto" }}>
          {sent ? (
            <div style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 30, color: "var(--color-text-headline)", marginBottom: 12 }}>
                you&apos;re on the list.
              </p>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.8, color: "var(--color-text-body)", marginBottom: 28 }}>
                we&apos;ll write to you when Casa Amor opens.
              </p>
              <Link href="/retreats" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-accent)", fontWeight: 600, textDecoration: "none" }}>
                ← back to all retreats
              </Link>
            </div>
          ) : (
            <>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(26px,4vw,34px)", color: "var(--color-text-headline)", fontWeight: 700, textAlign: "center", marginBottom: 12 }}>
                join the Spain list
              </h2>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.8, color: "var(--color-text-body)", textAlign: "center", marginBottom: 32 }}>
                five nights between the countryside of Vejer and the beaches of the Costa de la Luz. leave your name and email and you&apos;ll hear first when it opens.
              </p>
              <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <input type="hidden" name="destination" value={DESTINATION} />
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <label htmlFor="waitlist-name" style={labelStyle}>first name</label>
                  <input id="waitlist-name" name="name" type="text" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                  <label htmlFor="waitlist-email" style={labelStyle}>email</label>
                  <input id="waitlist-email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
                </div>
                {error && (
                  <p role="alert" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "#9A4A3A" }}>{error}</p>
                )}
                <button
                  type="submit"
                  disabled={sending}
                  style={{ marginTop: 4, padding: "14px 28px", minHeight: 44, background: "var(--color-accent)", border: "1px solid var(--color-accent)", color: "#FFFCF5", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", cursor: sending ? "default" : "pointer", opacity: sending ? 0.7 : 1 }}
                >
                  {sending ? "sending…" : "join the list →"}
                </button>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-body)", textAlign: "center" }}>
                  no spam. leave any time.
                </p>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
