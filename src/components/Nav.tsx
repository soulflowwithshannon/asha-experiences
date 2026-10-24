"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const retreats = [
  { href: "/retreats/mexico", label: "Becoming HER — Mexico 2026" },
  { href: "/retreats/morocco", label: "Sacred Sands — Morocco 2026" },
  { href: "/retreats/kenya", label: "Into the Wild — Kenya 2027" },
  { href: "/retreats/custom", label: "Customize a Retreat" },
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
  // pages whose hero is a full-bleed photo/video need light nav text;
  // cream-backgrounded pages need dark. one colour cannot serve both.
  const darkHero = pathname === "/" || pathname.startsWith("/retreats/");
  const linkColor = scrolled
    ? "var(--color-text-body)"
    : darkHero ? "#F1F0E5" : "var(--color-text-body)";
  const linkActiveColor = scrolled || !darkHero ? "var(--color-accent)" : "#FFFFFF";
  // lifts light text off pale photos (the Kenya hero is very washed out at the top)
  const heroShadow = !scrolled && darkHero ? "0 1px 14px rgba(45,37,33,0.55)" : "none";
  const lightOnDark = !scrolled && darkHero;

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
        className="nav-bar"
        style={{
          width: "100%",
          padding: "0 48px 0 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 72,
          boxSizing: "border-box",
        }}
      >
<style>{`
          /* On a phone each element sits the same distance from its own side
             as from the top. They are different heights, so the offsets differ:
             the logo box is 44px tall in a 72px bar, the hamburger 30px. */
          @media (max-width: 768px) {
            .nav-bar { padding: 0 !important; }
            /* Pulled into the corner: aligning to the top of the bar rather
               than centring lets the gap above match the gap to the left. */
            .nav-logo { margin-left: 14px; align-self: flex-start; margin-top: 14px; }
            .nav-menu-btn { margin-right: 21px; }
          }
        `}</style>

                {/* Wordmark */}
        <Link href="/" aria-label="ASHA Experiences — home" className="nav-logo" style={{ display: "block", lineHeight: 0 }}>
          {/* The logo file is a square with a white ground and a wide margin,
              so it is zoomed inside a clipped box to crop to the lockup.
              On cream: multiply drops the white ground away and the letters
              stay brand brown. Over a photo hero: inverted to near-white and
              screened, which drops the (now black) ground away instead. */}
          {/* The file is transparent and the lockup sits inside it at x 15-85%,
              y 36-69%. The window below is sized to exactly those bounds, so
              the logo's edge is the box's edge and the margin alone decides how
              close it sits to the corner. Over a photo hero it is flipped to
              white; on cream the brown ink is used as-is. */}
          <span style={{ display: "block", width: 84, height: 41, overflow: "hidden", position: "relative" }}>
            <Image
              src="/images/asha-logo-white.webp"
              alt="ASHA Experiences"
              width={300}
              height={300}
              priority
              sizes="150px"
              style={{
                position: "absolute",
                width: 120,
                // Tailwind's preflight caps images at max-width 100%, which
                // would shrink this back to the box and undo the crop
                maxWidth: "none",
                height: "auto",
                left: -18,
                top: -43,
                filter: lightOnDark ? "brightness(0) invert(1)" : "none",
              }}
            />
          </span>
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
              textShadow: heroShadow,
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
                textShadow: heroShadow,
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
              textShadow: heroShadow,
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
              textShadow: heroShadow,
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
            style={{ color: linkColor, display: "flex", filter: !scrolled && darkHero ? "drop-shadow(0 1px 10px rgba(45,37,33,0.55))" : "none" }}
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
          className="flex md:hidden nav-menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: scrolled ? "var(--color-text-headline)" : darkHero ? "#F1F0E5" : "var(--color-text-headline)",
            filter: !scrolled && darkHero ? "drop-shadow(0 1px 10px rgba(45,37,33,0.55))" : "none",
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
        </div>
      )}
    </nav>
  );
}
