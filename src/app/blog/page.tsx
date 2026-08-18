"use client";

import Link from "next/link";
import Image from "next/image";
import { posts } from "@/lib/blog";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

const [hero, second, ...grid] = posts;

export default function BlogIndex() {
  return (
    <main style={{ background: "var(--color-bg-page)", minHeight: "100vh" }}>

      {/* ── Masthead ── */}
      <section style={{ paddingTop: 100, paddingBottom: 56, borderBottom: "0.5px solid var(--color-border)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 48px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 40 }}>
            <div style={{ flex: 1, height: "0.5px", background: "var(--color-border)" }} />
            <span style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
              whiteSpace: "nowrap",
            }}>
              From the journal
            </span>
            <div style={{ flex: 1, height: "0.5px", background: "var(--color-border)" }} />
          </div>

          <h1 style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(52px, 9vw, 120px)",
            fontWeight: 300,
            color: "var(--color-text-headline)",
            lineHeight: 0.95,
            textAlign: "center",
          }}>
            words for women
          </h1>
          <p style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(26px, 4.5vw, 60px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--color-accent)",
            lineHeight: 1.15,
            textAlign: "center",
            marginTop: 8,
          }}>
            on the way back to themselves
          </p>

          <p style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 14,
            color: "var(--color-text-body)",
            lineHeight: 1.7,
            textAlign: "center",
            maxWidth: 440,
            margin: "28px auto 0",
          }}>
            Honest writing about retreats, healing, and what it actually feels like to choose yourself.
          </p>
        </div>
      </section>

      {/* ── Hero post — full bleed image left, text right ── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 48px 0" }}>
        <Link href={`/blog/${hero.slug}`} style={{ textDecoration: "none", display: "block" }}>
          <article style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            minHeight: 480,
            border: "0.5px solid var(--color-border)",
            borderRadius: 2,
            overflow: "hidden",
          }}
            className="blog-hero-card"
          >
            {/* Image */}
            {hero.image && (
              <div style={{ position: "relative", minHeight: 400 }}>
                <Image
                  src={hero.image}
                  alt={hero.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            {/* Text */}
            <div style={{
              padding: "56px 52px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              background: "var(--color-bg-surface)",
            }}>
              <div>
                <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
                  <span style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-accent)",
                  }}>
                    {hero.category}
                  </span>
                  <span style={{ color: "var(--color-border)" }}>·</span>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "var(--color-text-muted)" }}>
                    {hero.readTime}
                  </span>
                </div>
                <h2 style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(28px, 3vw, 44px)",
                  fontWeight: 300,
                  color: "var(--color-text-headline)",
                  lineHeight: 1.1,
                  marginBottom: 20,
                }}>
                  {hero.title}
                </h2>
                <p style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 14,
                  color: "var(--color-text-body)",
                  lineHeight: 1.8,
                }}>
                  {hero.description}
                </p>
              </div>
              <div style={{ marginTop: 40, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-muted)" }}>
                  {formatDate(hero.date)}
                </span>
                <span style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--color-accent)",
                }}>
                  read →
                </span>
              </div>
            </div>
          </article>
        </Link>
      </section>

      {/* ── Divider with label ── */}
      <div style={{ maxWidth: 1200, margin: "72px auto 0", padding: "0 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ flex: 1, height: "0.5px", background: "var(--color-border)" }} />
          <span style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--color-text-muted)",
            whiteSpace: "nowrap",
          }}>
            More from the journal
          </span>
          <div style={{ flex: 1, height: "0.5px", background: "var(--color-border)" }} />
        </div>
      </div>

      {/* ── Second post — wide horizontal card ── */}
      <section style={{ maxWidth: 1200, margin: "48px auto 0", padding: "0 48px" }}>
        <Link href={`/blog/${second.slug}`} style={{ textDecoration: "none", display: "block" }}>
          <article style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            border: "0.5px solid var(--color-border)",
            borderRadius: 2,
            overflow: "hidden",
            minHeight: 320,
          }}
            className="blog-wide-card"
          >
            <div style={{
              padding: "48px 44px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}>
              <div>
                <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 20 }}>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-accent)" }}>
                    {second.category}
                  </span>
                  <span style={{ color: "var(--color-border)" }}>·</span>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "var(--color-text-muted)" }}>
                    {second.readTime}
                  </span>
                </div>
                <h2 style={{
                  fontFamily: "var(--font-cormorant)",
                  fontSize: "clamp(24px, 2.8vw, 38px)",
                  fontWeight: 300,
                  color: "var(--color-text-headline)",
                  lineHeight: 1.15,
                  marginBottom: 16,
                }}>
                  {second.title}
                </h2>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-body)", lineHeight: 1.75 }}>
                  {second.description}
                </p>
              </div>
              <div style={{ marginTop: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-muted)" }}>{formatDate(second.date)}</span>
                <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--color-accent)" }}>read →</span>
              </div>
            </div>
            {second.image && (
              <div style={{ position: "relative", minHeight: 280 }}>
                <Image src={second.image} alt={second.title} fill style={{ objectFit: "cover" }} />
              </div>
            )}
          </article>
        </Link>
      </section>

      {/* ── Grid — 3 columns with images ── */}
      <section style={{ maxWidth: 1200, margin: "48px auto 120px", padding: "0 48px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}
          className="blog-grid"
        >
          {grid.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
              <article style={{
                border: "0.5px solid var(--color-border)",
                borderRadius: 2,
                overflow: "hidden",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(74,63,53,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                {/* Image */}
                {post.image && (
                  <div style={{ position: "relative", height: 200, flexShrink: 0 }}>
                    <Image src={post.image} alt={post.title} fill style={{ objectFit: "cover" }} />
                  </div>
                )}
                {/* Text */}
                <div style={{
                  padding: "28px 28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                  gap: 12,
                }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--color-accent)" }}>
                      {post.category}
                    </span>
                    <span style={{ color: "var(--color-border)" }}>·</span>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, color: "var(--color-text-muted)" }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-cormorant)",
                    fontSize: "clamp(20px, 1.8vw, 24px)",
                    fontWeight: 400,
                    color: "var(--color-text-headline)",
                    lineHeight: 1.2,
                    flex: 1,
                  }}>
                    {post.title}
                  </h3>
                  <div style={{
                    paddingTop: 14,
                    borderTop: "0.5px solid var(--color-border)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-muted)" }}>
                      {formatDate(post.date)}
                    </span>
                    <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-accent)" }}>
                      read →
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .blog-hero-card { grid-template-columns: 1fr !important; }
          .blog-wide-card { grid-template-columns: 1fr !important; }
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
