"use client";

import { useEffect, useRef, useState } from "react";
import posthog from "posthog-js";

const EMAIL = "connect@ashaexperiences.com";
const INSTAGRAM = "https://instagram.com/asha_experiences";

/**
 * A way to reach us from any page. Deliberately not a chat widget: there are
 * two of us and no one sitting in an inbox waiting, so this hands her straight
 * to email or Instagram rather than implying someone is online.
 */
export default function ContactBubble() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const optionStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 12,
    padding: "13px 16px",
    fontFamily: "var(--font-dm-sans)",
    fontSize: 14,
    color: "var(--color-text-body)",
    textDecoration: "none",
    borderRadius: 2,
    minHeight: 44,
  };

  return (
    <div
      ref={wrapRef}
      style={{ position: "fixed", right: 20, bottom: 20, zIndex: 90, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}
    >
      {open && (
        <div
          role="dialog"
          aria-label="Get in touch"
          style={{
            background: "var(--color-bg-page)",
            border: "0.5px solid var(--color-border)",
            borderRadius: 6,
            boxShadow: "0 12px 40px rgba(45,37,33,0.16)",
            padding: 8,
            width: 252,
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 12,
              lineHeight: 1.6,
              color: "var(--color-text-muted)",
              padding: "8px 16px 10px",
            }}
          >
            you&apos;ll reach Ashley or Shannon — never an assistant.
          </p>

          <a
            href={`mailto:${EMAIL}`}
            style={optionStyle}
            onClick={() => {
              posthog.capture("contact_bubble_click", { channel: "email" });
              setOpen(false);
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" aria-hidden="true">
              <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
              <path d="M3 6l9 7 9-7" />
            </svg>
            email us
          </a>

          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            style={optionStyle}
            onClick={() => {
              posthog.capture("contact_bubble_click", { channel: "instagram" });
              setOpen(false);
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="var(--color-accent)" stroke="none" />
            </svg>
            message us on Instagram
          </a>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Get in touch"}
        style={{
          width: 54,
          height: 54,
          borderRadius: "50%",
          background: "var(--color-logo-brown)",
          border: "none",
          color: "#FFFCF5",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(45,37,33,0.22)",
          transition: "transform 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFCF5" strokeWidth="1.6" aria-hidden="true">
            <path d="M5 5l14 14M19 5L5 19" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FFFCF5" strokeWidth="1.5" aria-hidden="true">
            <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.5 9.5 0 0 1-3.1-.5L3 21l1.7-5a8.2 8.2 0 0 1-.7-3.4 8.4 8.4 0 0 1 8.5-8.1 8.4 8.4 0 0 1 8.5 8z" />
          </svg>
        )}
      </button>
    </div>
  );
}
