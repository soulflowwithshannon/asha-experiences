import Link from "next/link";
import Image from "next/image";

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
        <Link href="/" aria-label="ASHA Experiences — home" style={{ display: "inline-block", lineHeight: 0 }}>
          {/* the white-background file, multiplied, so the square drops away
              onto any of our creams — the cream-background file leaves a patch */}
          <Image
            src="/images/asha-logo-white.webp"
            alt="ASHA Experiences"
            width={300}
            height={300}
            sizes="150px"
            style={{ width: 140, height: "auto", display: "block", mixBlendMode: "multiply" }}
          />
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
