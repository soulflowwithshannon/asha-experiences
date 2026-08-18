"use client";

import Link from "next/link";
import { posts } from "@/lib/blog";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

const featured = posts[0];
const rest = posts.slice(1);

export default function BlogIndex() {
  return (
    <main style={{ background: "var(--color-bg-page)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <section
        style={{
          borderBottom: "0.5px solid var(--color-border)",
          paddingBottom: 0,
          overflow: "hidden",
        }}
      >
        {/* Top rule + label */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "100px 48px 0",
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div style={{ flex: 1, height: "0.5px", background: "var(--color-border)" }} />
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              whiteSpace: "nowrap",
            }}
          >
            From the journal
          </span>
          <div style={{ flex: 1, height: "0.5px", background: "var(--color-border)" }} />
        </div>

        {/* Main headline */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "40px 48px 0",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(56px, 10vw, 130px)",
              fontWeight: 300,
              color: "var(--color-text-headline)",
              lineHeight: 0.95,
              letterSpacing: "-0.01em",
            }}
          >
            words for women
          </h1>
          <p
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: "clamp(30px, 5vw, 68px)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "var(--color-accent)",
              lineHeight: 1.1,
              marginTop: 8,
            }}
          >
            on the way back to themselves
          </p>
        </div>

        {/* Subtext + bottom rule */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "32px 48px 48px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 32,
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 14,
              color: "var(--color-text-body)",
              lineHeight: 1.7,
              maxWidth: 380,
            }}
          >
            Honest writing about retreats, healing practices, and what it actually feels like to choose yourself.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            {["Retreat Life", "Healing Practices", "Travel", "Practical", "Community"].map((cat) => (
              <span
                key={cat}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  padding: "6px 12px",
                  border: "0.5px solid var(--color-border)",
                  borderRadius: 1,
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured post ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "64px 48px 0" }}>
        <Link href={`/blog/${featured.slug}`} style={{ textDecoration: "none", display: "block" }}>
          <article
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1px 1fr",
              gap: 0,
              border: "0.5px solid var(--color-border)",
              borderRadius: 2,
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--color-bg-surface)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
            }}
          >
            {/* Left — meta */}
            <div style={{ padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: 10,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--color-accent)",
                    }}
                  >
                    Featured
                  </span>
                  <span style={{ color: "var(--color-border)" }}>·</span>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "var(--color-text-muted)", letterSpacing: "0.08em" }}>
                    {featured.readTime}
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(28px, 3.5vw, 48px)",
                    fontWeight: 300,
                    color: "var(--color-text-headline)",
                    lineHeight: 1.1,
                    marginBottom: 20,
                  }}
                >
                  {featured.title}
                </h2>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 11,
                  color: "var(--color-text-muted)",
                  letterSpacing: "0.06em",
                }}
              >
                {formatDate(featured.date)}
              </span>
            </div>

            {/* Divider */}
            <div style={{ background: "var(--color-border)" }} />

            {/* Right — description + read */}
            <div style={{ padding: "52px 48px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 15,
                  color: "var(--color-text-body)",
                  lineHeight: 1.8,
                }}
              >
                {featured.description}
              </p>
              <span
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 12,
                  color: "var(--color-accent)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginTop: 32,
                }}
              >
                read the full piece →
              </span>
            </div>
          </article>
        </Link>
      </section>

      {/* ── Rest of posts ── */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "48px 48px 120px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 1,
          border: "0.5px solid var(--color-border)",
          borderRadius: 2,
          marginTop: 48,
          overflow: "hidden",
        }}
      >
        {rest.map((post, i) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <article
              style={{
                padding: "40px 36px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                borderRight: (i + 1) % 3 !== 0 ? "0.5px solid var(--color-border)" : "none",
                borderBottom: i < rest.length - 3 ? "0.5px solid var(--color-border)" : "none",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "var(--color-bg-surface)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 10,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                  }}
                >
                  {post.category}
                </span>
                <span style={{ color: "var(--color-border)", fontSize: 10 }}>·</span>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "var(--color-text-muted)" }}>
                  {post.readTime}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(20px, 2vw, 26px)",
                  fontWeight: 400,
                  color: "var(--color-text-headline)",
                  lineHeight: 1.2,
                  flex: 1,
                }}
              >
                {post.title}
              </h2>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingTop: 16,
                  borderTop: "0.5px solid var(--color-border)",
                }}
              >
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-muted)" }}>
                  {formatDate(post.date)}
                </span>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 12, color: "var(--color-accent)" }}>
                  read →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </section>

    </main>
  );
}
