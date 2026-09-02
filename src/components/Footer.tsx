import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-bg-page)",
        borderTop: "0.5px solid var(--color-border)",
        padding: "48px 32px",
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
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: "0.08em",
            color: "var(--color-text-headline)",
            textDecoration: "none",
          }}
        >
          ASHA
        </Link>

        {/* Center — links */}
        <div style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { href: "/about", label: "about us" },
            { href: "/retreats/mexico", label: "retreats" },
            { href: "/blog", label: "journal" },
            { href: "/contact", label: "contact us" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 13,
                color: "var(--color-text-muted)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://instagram.com/asha_experiences"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 13,
              color: "var(--color-text-muted)",
              textDecoration: "none",
            }}
          >
            instagram
          </a>
        </div>

        {/* Right — empty placeholder for email signup TBD */}
        <div />
      </div>

      {/* Copyright */}
      <p
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: 12,
          color: "var(--color-text-muted)",
          textAlign: "center",
          marginTop: 32,
        }}
      >
        two women. no team, no ads. just retreats we&apos;d want to go on ourselves.
      </p>

      <p
        style={{
          fontFamily: "var(--font-dm-sans)",
          fontSize: 12,
          color: "var(--color-text-muted)",
          textAlign: "center",
          marginTop: 10,
        }}
      >
        © 2026 ASHA Experiences LLC
      </p>

      <style>{`
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
