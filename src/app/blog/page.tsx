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

export default function BlogIndex() {
  return (
    <main style={{ background: "var(--color-bg-page)", minHeight: "100vh" }}>
      {/* Header */}
      <section
        style={{
          maxWidth: 860,
          margin: "0 auto",
          padding: "120px 32px 64px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-accent)",
            marginBottom: 20,
          }}
        >
          From the journal
        </p>
        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(40px, 6vw, 72px)",
            fontWeight: 300,
            color: "var(--color-text-headline)",
            lineHeight: 1.1,
            marginBottom: 20,
          }}
        >
          words for women
          <br />
          <em>on the way back to themselves</em>
        </h1>
        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 16,
            color: "var(--color-text-body)",
            maxWidth: 520,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Honest writing about retreats, healing, and what it means to choose yourself.
        </p>
      </section>

      {/* Posts grid */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 32px 120px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
          gap: 40,
        }}
      >
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <article
              style={{
                background: "var(--color-bg-surface)",
                border: "0.5px solid var(--color-border)",
                borderRadius: 2,
                padding: "36px 32px",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(74,63,53,0.08)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 10,
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.08em",
                  }}
                >
                  {post.readTime}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(22px, 2.5vw, 28px)",
                  fontWeight: 400,
                  color: "var(--color-text-headline)",
                  lineHeight: 1.2,
                }}
              >
                {post.title}
              </h2>

              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 14,
                  color: "var(--color-text-body)",
                  lineHeight: 1.7,
                  flex: 1,
                }}
              >
                {post.description}
              </p>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 8,
                  paddingTop: 16,
                  borderTop: "0.5px solid var(--color-border)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 11,
                    color: "var(--color-text-muted)",
                    letterSpacing: "0.06em",
                  }}
                >
                  {formatDate(post.date)}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 12,
                    color: "var(--color-accent)",
                    letterSpacing: "0.08em",
                  }}
                >
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
