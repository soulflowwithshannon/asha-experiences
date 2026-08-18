"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const retreats = [
  { href: "/retreats/mexico", label: "Becoming HER — Mexico 2026" },
  { href: "/retreats/morocco", label: "Sacred Sands — Morocco 2026" },
  { href: "/retreats/kenya", label: "Into the Wild — Kenya 2027" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [retreatsOpen, setRetreatsOpen] = useState(false);
  const [mobileRetreatsOpen, setMobileRetreatsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setRetreatsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setRetreatsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isRetreatsActive = pathname.startsWith("/retreats");
  const linkColor = scrolled ? "var(--color-text-body)" : "#C5AA9B";
  const linkActiveColor = "var(--color-accent)";

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.4s ease, border-color 0.4s ease",
        background: scrolled ? "var(--color-bg-page)" : "transparent",
        borderBottom: scrolled ? "0.5px solid var(--color-border)" : "0.5px solid transparent",
      }}
    >
      <div
        style={{
          width: "100%",
          padding: "0 48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
          boxSizing: "border-box",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: 24,
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: scrolled ? "var(--color-text-headline)" : "#F1F0E5",
            textDecoration: "none",
          }}
        >
          ASHA
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: 36 }}>
          <Link
            href="/about"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              color: pathname === "/about" ? linkActiveColor : linkColor,
              textDecoration: "none",
              borderBottom: pathname === "/about" ? "1px solid var(--color-accent)" : "1px solid transparent",
              paddingBottom: 2,
              transition: "color 0.2s ease",
            }}
          >
            about us
          </Link>

          {/* Retreats dropdown */}
          <div ref={dropdownRef} style={{ position: "relative" }}>
            <button
              onClick={() => setRetreatsOpen(!retreatsOpen)}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 13,
                color: isRetreatsActive ? linkActiveColor : linkColor,
                background: "none",
                border: "none",
                borderBottom: isRetreatsActive ? "1px solid var(--color-accent)" : "1px solid transparent",
                paddingBottom: 2,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 5,
                transition: "color 0.2s ease",
              }}
            >
              retreats
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                style={{ transition: "transform 0.25s ease", transform: retreatsOpen ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {retreatsOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 16px)",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "var(--color-bg-page)",
                  border: "0.5px solid var(--color-border)",
                  minWidth: 280,
                  whiteSpace: "nowrap",
                  boxShadow: "0 16px 40px rgba(45,37,33,0.12)",
                  padding: "8px 0",
                }}
              >
                {retreats.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    style={{
                      display: "block",
                      padding: "12px 20px",
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 13,
                      color: pathname === r.href ? "var(--color-accent)" : "var(--color-text-headline)",
                      textDecoration: "none",
                      transition: "color 0.2s ease, background 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-bg-surface)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/blog"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              color: pathname.startsWith("/blog") ? linkActiveColor : linkColor,
              textDecoration: "none",
              borderBottom: pathname.startsWith("/blog") ? "1px solid var(--color-accent)" : "1px solid transparent",
              paddingBottom: 2,
              transition: "color 0.2s ease",
            }}
          >
            journal
          </Link>

          <Link
            href="/contact"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              color: pathname === "/contact" ? linkActiveColor : linkColor,
              textDecoration: "none",
              borderBottom: pathname === "/contact" ? "1px solid var(--color-accent)" : "1px solid transparent",
              paddingBottom: 2,
              transition: "color 0.2s ease",
            }}
          >
            contact us
          </Link>

          <a
            href="https://instagram.com/asha_experiences"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{ color: linkColor, display: "flex" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: scrolled ? "var(--color-text-headline)" : "#F1F0E5",
            padding: 4,
          }}
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            {menuOpen ? (
              <>
                <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="19" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="3" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="3" y1="17" x2="19" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div
          style={{
            background: "var(--color-bg-page)",
            borderTop: "0.5px solid var(--color-border)",
            padding: "24px 32px 32px",
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <Link href="/about" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: pathname === "/about" ? "var(--color-accent)" : "var(--color-text-body)", textDecoration: "none" }}>
            about us
          </Link>

          {/* Mobile retreats accordion */}
          <div>
            <button
              onClick={() => setMobileRetreatsOpen(!mobileRetreatsOpen)}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 15,
                color: isRetreatsActive ? "var(--color-accent)" : "var(--color-text-body)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              retreats
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" style={{ transition: "transform 0.25s ease", transform: mobileRetreatsOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {mobileRetreatsOpen && (
              <div style={{ paddingLeft: 16, marginTop: 12, display: "flex", flexDirection: "column", gap: 12 }}>
                {retreats.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 14,
                      color: pathname === r.href ? "var(--color-accent)" : "var(--color-text-headline)",
                      textDecoration: "none",
                    }}
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/blog" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: pathname.startsWith("/blog") ? "var(--color-accent)" : "var(--color-text-body)", textDecoration: "none" }}>
            journal
          </Link>
          <Link href="/contact" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: pathname === "/contact" ? "var(--color-accent)" : "var(--color-text-body)", textDecoration: "none" }}>
            contact us
          </Link>
          <a href="https://instagram.com/asha_experiences" target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", textDecoration: "none" }}>
            instagram
          </a>
        </div>
      )}
    </nav>
  );
}
