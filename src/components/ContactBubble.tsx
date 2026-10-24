"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import posthog from "posthog-js";

const EMAIL = "connect@ashaexperiences.com";
const INSTAGRAM = "https://instagram.com/asha_experiences";

/**
 * A chat window that reaches the two of us. It is not a live chat — nobody
 * sits in an inbox waiting — so the opening message says replies come by
 * email, rather than leaving her watching for a typing indicator.
 */
export default function ContactBubble() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const wrapRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const id = setTimeout(() => messageRef.current?.focus(), 80);
    return () => clearTimeout(id);
  }, [open]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || !email.trim()) {
      setError("we need your note and your email to write back.");
      return;
    }

    setSending(true);
    setError("");

    try {
      const res = await fetch("/api/chat-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: message.trim(),
          email: email.trim(),
          page: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "that didn't send. try again?");
        return;
      }

      posthog.capture("chat_message_sent");
      setSent(true);
      setMessage("");
    } catch {
      setError("that didn't send. try again?");
    } finally {
      setSending(false);
    }
  }

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    padding: "11px 13px",
    border: "0.5px solid var(--color-border)",
    background: "var(--color-bg-page)",
    color: "var(--color-text-headline)",
    fontFamily: "var(--font-dm-sans)",
    fontSize: 14,
    borderRadius: 3,
  };

  return (
    <div
      ref={wrapRef}
      style={{ position: "fixed", right: 20, bottom: 20, zIndex: 90, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}
    >
      {open && (
        <div
          role="dialog"
          aria-label="Message Ashley and Shannon"
          className="chat-window"
          style={{
            width: 340,
            maxWidth: "calc(100vw - 40px)",
            background: "var(--color-bg-surface)",
            border: "0.5px solid var(--color-border)",
            borderRadius: 8,
            boxShadow: "0 16px 48px rgba(45,37,33,0.2)",
            overflow: "hidden",
          }}
        >
          {/* header */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: "var(--color-logo-brown)" }}>
            <div style={{ display: "flex" }}>
              {[
                { src: "/images/Ashley (new).JPG", alt: "Ashley" },
                { src: "/images/Shannon (new).JPG", alt: "Shannon" },
              ].map((p, i) => (
                <div
                  key={p.alt}
                  style={{
                    position: "relative",
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "1.5px solid var(--color-logo-brown)",
                    marginLeft: i === 0 ? 0 : -10,
                  }}
                >
                  <Image src={p.src} alt={p.alt} fill sizes="30px" style={{ objectFit: "cover", objectPosition: "top" }} />
                </div>
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "#FFFCF5" }}>Ashley &amp; Shannon</p>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "#E8D5BC" }}>usually reply within a day</p>
            </div>
          </div>

          {/* conversation */}
          <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10, maxHeight: 220, overflowY: "auto" }}>
            <div
              style={{
                alignSelf: "flex-start",
                maxWidth: "88%",
                background: "var(--color-bg-page)",
                border: "0.5px solid var(--color-border)",
                borderRadius: "10px 10px 10px 2px",
                padding: "11px 14px",
                fontFamily: "var(--font-dm-sans)",
                fontSize: 13,
                lineHeight: 1.5,
                color: "var(--color-text-body)",
              }}
            >
              hi — it&apos;s Ashley and Shannon. ask us anything about the retreats. there are just the two of us, so we&apos;ll answer you by email when we come back online soon.
            </div>

            {sent && (
              <div
                style={{
                  alignSelf: "flex-start",
                  maxWidth: "88%",
                  background: "var(--color-bg-page)",
                  border: "0.5px solid var(--color-border)",
                  borderRadius: "10px 10px 10px 2px",
                  padding: "11px 14px",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 13,
                  lineHeight: 1.5,
                  color: "var(--color-text-body)",
                }}
              >
                that&apos;s with us. one of us will write back to you — give it a day or so.
              </div>
            )}
          </div>

          {/* composer */}
          {!sent && (
            <form onSubmit={send} style={{ padding: "0 16px 14px", display: "flex", flexDirection: "column", gap: 10 }}>
              <label htmlFor="chat-message" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                your message
              </label>
              <textarea
                id="chat-message"
                ref={messageRef}
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="ask us anything…"
                style={{ ...fieldStyle, resize: "vertical", lineHeight: 1.6 }}
              />
              <label htmlFor="chat-email" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                your email
              </label>
              <input
                id="chat-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your email, so we can reply"
                style={fieldStyle}
              />

              {error && (
                <p role="alert" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "#9A4A3A" }}>
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                style={{
                  padding: "12px 20px",
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
                {sending ? "sending…" : "send"}
              </button>
            </form>
          )}

          {/* the other two doors, as real options rather than fine print */}
          <div style={{ borderTop: "0.5px solid var(--color-border)", padding: "12px 16px 14px" }}>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-muted)", marginBottom: 10 }}>
              or reach us where you already are
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => posthog.capture("contact_bubble_click", { channel: "instagram" })}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  minHeight: 44,
                  padding: "10px 12px",
                  border: "0.5px solid var(--color-accent)",
                  borderRadius: 2,
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 12.5,
                  textDecoration: "none",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
                DM us
              </a>
              <a
                href={`mailto:${EMAIL}`}
                onClick={() => posthog.capture("contact_bubble_click", { channel: "email" })}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  minHeight: 44,
                  padding: "10px 12px",
                  border: "0.5px solid var(--color-accent)",
                  borderRadius: 2,
                  color: "var(--color-accent)",
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 12.5,
                  textDecoration: "none",
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
                  <path d="M3 6l9 7 9-7" />
                </svg>
                email
              </a>
            </div>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close the message window" : "Message Ashley and Shannon"}
        style={{
          width: 68,
          height: 68,
          borderRadius: "50%",
          background: "var(--color-logo-brown)",
          border: "none",
          color: "#FFFCF5",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 30px rgba(45,37,33,0.26)",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFCF5" strokeWidth="1.6" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        ) : (
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFCF5" strokeWidth="1.5" aria-hidden="true">
            <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.5 9.5 0 0 1-3.1-.5L3 21l1.7-5a8.2 8.2 0 0 1-.7-3.4 8.4 8.4 0 0 1 8.5-8.1 8.4 8.4 0 0 1 8.5 8z" />
          </svg>
        )}
      </button>
    </div>
  );
}
