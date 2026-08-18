"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeIn from "@/components/FadeIn";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormState("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        setFormState("success");
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    background: "var(--color-bg-page)",
    border: "0.5px solid var(--color-border)",
    borderRadius: 4,
    fontFamily: "var(--font-dm-sans)",
    fontSize: 15,
    color: "var(--color-text-body)",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "var(--font-dm-sans)",
    fontSize: 12,
    color: "var(--color-text-muted)",
    letterSpacing: "0.04em",
    textTransform: "uppercase" as const,
    display: "block",
    marginBottom: 8,
  };

  return (
    <main style={{ paddingTop: 72 }}>
      {/* SECTION 1 — INTRO + FORM */}
      <section style={{ background: "var(--color-bg-page)", padding: "80px 32px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="contact-split">

          {/* Left — intro */}
          <div style={{ paddingTop: 16 }}>
            <FadeIn>
              <p className="eyebrow-accent" style={{ marginBottom: 20 }}>get in touch</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(28px,4vw,36px)", color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 24 }}>
                let&apos;s talk
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16, color: "var(--color-text-body)", lineHeight: 1.9, maxWidth: 420, marginBottom: 32 }}>
                questions about a retreat, want to know if this is the right time for you, or just need to hear a real person on the other end —
                <br /><br />
                we&apos;re here for all of it.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <a
                href="https://calendar.app.google/Yt1VUQGEuhhEipt59"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", padding: "12px 32px", background: "var(--color-accent)", border: "1px solid var(--color-accent)", color: "#FFFCF5", fontFamily: "var(--font-dm-sans)", fontSize: 13, letterSpacing: "0.04em", textDecoration: "none", transition: "opacity 0.2s ease, transform 0.2s ease" }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.85"; e.currentTarget.style.transform = "scale(1.02)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
              >
                book a call with us →
              </a>
            </FadeIn>
          </div>

          {/* Right — image + form stacked */}
          <FadeIn delay={0.1}>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

              {/* Image */}
              <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: 4, overflow: "hidden" }}>
                <Image
                  src="/images/Ashley and Shannon contact.jpg"
                  alt="Shannon Tomascak and Ashley Scully"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Form */}
              <div>
                <h2 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(20px,2.5vw,26px)", color: "var(--color-text-headline)", fontWeight: 700, marginBottom: 28 }}>
                  send us a message
                </h2>

                {formState === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    style={{ padding: "40px 0" }}
                  >
                    <h3 style={{ fontFamily: "var(--font-cormorant)", fontSize: 24, color: "var(--color-text-headline)", fontWeight: 400, marginBottom: 12 }}>
                      thank you
                    </h3>
                    <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)" }}>
                      we&apos;ll be in touch soon.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    <div>
                      <label style={labelStyle} htmlFor="name">name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                      />
                    </div>
                    <div>
                      <label style={labelStyle} htmlFor="email">email</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                      />
                    </div>
                    <div>
                      <label style={labelStyle} htmlFor="message">message</label>
                      <textarea
                        id="message"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-accent)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
                      />
                    </div>

                    {formState === "error" && (
                      <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, color: "var(--color-accent)" }}>
                        something went wrong — please try again or reach us directly at imshannontomascak@gmail.com
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      style={{
                        width: "100%",
                        padding: "14px 32px",
                        border: "1px solid var(--color-accent)",
                        color: "var(--color-accent)",
                        background: "transparent",
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: 13,
                        letterSpacing: "0.04em",
                        cursor: formState === "submitting" ? "not-allowed" : "pointer",
                        transition: "background 0.3s ease, transform 0.3s ease",
                        opacity: formState === "submitting" ? 0.6 : 1,
                      }}
                      onMouseEnter={(e) => { if (formState !== "submitting") { e.currentTarget.style.background = "color-mix(in srgb, var(--color-accent) 10%, transparent)"; e.currentTarget.style.transform = "scale(1.02)"; }}}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}
                    >
                      {formState === "submitting" ? "sending..." : "send message →"}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
        <style>{`@media(max-width:768px){.contact-split{grid-template-columns:1fr!important}}`}</style>
      </section>

      {/* SECTION 3 — PORTRAIT STRIP */}
      <section style={{ background: "var(--color-bg-page)", borderTop: "0.5px solid var(--color-border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }} className="portrait-strip">

          {/* Ashley */}
          <a
            href="https://instagram.com/ashleyscully_"
            target="_blank"
            rel="noopener noreferrer"
            style={{ position: "relative", height: 420, display: "block", overflow: "hidden", textDecoration: "none" }}
            className="portrait-card"
          >
            <Image
              src="/images/Ashley (new).JPG"
              alt="Ashley Scully"
              fill
              style={{ objectFit: "cover", objectPosition: "center top", transition: "transform 0.5s ease" }}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="portrait-img"
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "48px 28px 28px",
              background: "linear-gradient(transparent, rgba(0,0,0,0.68))",
            }}>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: 6 }}>meet ashley</p>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 26, fontWeight: 300, color: "#fff", marginBottom: 4, lineHeight: 1.1 }}>Ashley</p>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: "0.04em", marginBottom: 12 }}>sound healer · retreat host</p>
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", border: "0.5px solid rgba(255,255,255,0.35)", padding: "4px 10px" }}>
                @ashleyscully_ →
              </span>
            </div>
          </a>

          {/* Shannon */}
          <a
            href="https://instagram.com/soulflowwithshannon"
            target="_blank"
            rel="noopener noreferrer"
            style={{ position: "relative", height: 420, display: "block", overflow: "hidden", textDecoration: "none", borderLeft: "0.5px solid rgba(255,255,255,0.1)", borderRight: "0.5px solid rgba(255,255,255,0.1)" }}
            className="portrait-card"
          >
            <Image
              src="/images/Shannon (new).JPG"
              alt="Shannon Tomascak"
              fill
              style={{ objectFit: "cover", objectPosition: "center top", transition: "transform 0.5s ease" }}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="portrait-img"
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "48px 28px 28px",
              background: "linear-gradient(transparent, rgba(0,0,0,0.68))",
            }}>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: 6 }}>meet shannon</p>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 26, fontWeight: 300, color: "#fff", marginBottom: 4, lineHeight: 1.1 }}>Shannon</p>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: "0.04em", marginBottom: 12 }}>somatic guide · circle facilitator</p>
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", border: "0.5px solid rgba(255,255,255,0.35)", padding: "4px 10px" }}>
                @soulflowwithshannon →
              </span>
            </div>
          </a>

          {/* ASHA */}
          <a
            href="https://instagram.com/asha_experiences"
            target="_blank"
            rel="noopener noreferrer"
            style={{ position: "relative", height: 420, display: "block", overflow: "hidden", textDecoration: "none" }}
            className="portrait-card"
          >
            <Image
              src="/images/ReturnToLove girls group 2.jpg"
              alt="ASHA Experiences"
              fill
              style={{ objectFit: "cover", objectPosition: "center", transition: "transform 0.5s ease" }}
              sizes="(max-width: 768px) 100vw, 33vw"
              className="portrait-img"
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "48px 28px 28px",
              background: "linear-gradient(transparent, rgba(0,0,0,0.68))",
            }}>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", marginBottom: 6 }}>follow along</p>
              <p style={{ fontFamily: "var(--font-cormorant)", fontSize: 26, fontWeight: 300, color: "#fff", marginBottom: 4, lineHeight: 1.1 }}>ASHA Experiences</p>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: "0.04em", marginBottom: 12 }}>Mexico · Morocco · Kenya</p>
              <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", border: "0.5px solid rgba(255,255,255,0.35)", padding: "4px 10px" }}>
                @asha_experiences →
              </span>
            </div>
          </a>
        </div>
        <style>{`
          .portrait-card:hover .portrait-img { transform: scale(1.04); }
          @media (max-width: 768px) { .portrait-strip { grid-template-columns: 1fr !important; } }
        `}</style>
      </section>

    </main>
  );
}
