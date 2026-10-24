import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-bg-page)",
        borderTop: "0.5px solid var(--color-border)",
        padding: "38px 32px 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: 24,
        }}
        className="footer-grid"
      >
        {/* Left — wordmark */}
        <Link href="/" aria-label="ASHA Experiences — home" className="footer-logo" style={{ display: "inline-block", lineHeight: 0 }}>
          {/* The file is transparent with the lockup at x 15-85%, y 35-69%,
              so the window is sized to those bounds and the image is offset
              into it. maxWidth none is needed or Tailwind's preflight caps it
              back to the box. */}
          <span style={{ display: "block", width: 150, height: 72, overflow: "hidden", position: "relative" }}>
            <Image
              src="/images/asha-logo-white.webp"
              alt="ASHA Experiences"
              width={300}
              height={300}
              sizes="220px"
              style={{
                position: "absolute",
                width: 215,
                maxWidth: "none",
                height: "auto",
                left: -32,
                top: -76,
              }}
            />
          </span>
        </Link>

        {/* Center — links */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { href: "/about", label: "about us" },
            { href: "/retreats/mexico", label: "retreats" },
            { href: "/blog", label: "journal" },
            { href: "/contact", label: "contact us" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="footer-pill">
              {link.label}
            </Link>
          ))}
          <a
            href="https://instagram.com/asha_experiences"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-pill"
          >
            instagram
          </a>
        </div>

        {/* Right — empty placeholder for email signup TBD */}
        <div />
      </div>


      <p
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: 12,
          color: "var(--color-text-muted)",
          textAlign: "center",
          marginTop: 32,
        }}
      >
        © 2026 ASHA Experiences LLC
      </p>

      <style>{`
        /* Stacked on a phone the column is centred, but the logo is a block
           and ignores that — it needs its own centring. */
        @media (max-width: 640px) {
          .footer-logo { margin-left: auto; margin-right: auto; }
        }
        .footer-pill {
          font-family: var(--font-dm-sans);
          font-size: 13px;
          line-height: 1;
          color: var(--color-logo-brown);
          text-decoration: none;
          padding: 10px 18px;
          border: 0.5px solid var(--color-bg-card);
          border-radius: 999px;
          background: var(--color-bg-page);
          transition: background 0.25s ease, border-color 0.25s ease;
          display: inline-flex;
          align-items: center;
          min-height: 38px;
        }
        .footer-pill:hover {
          background: var(--color-bg-surface);
          border-color: var(--color-accent);
        }
        @media (max-width: 640px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
