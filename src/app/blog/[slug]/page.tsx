import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllSlugs } from "@/lib/blog";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://ashaexperiences.com/blog/${post.slug}`,
      type: "article",
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <main style={{ background: "var(--color-bg-page)", minHeight: "100vh" }}>
      {/* Header */}
      <section
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "120px 32px 48px",
        }}
      >
        <Link
          href="/blog"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 12,
            color: "var(--color-accent)",
            letterSpacing: "0.1em",
            textDecoration: "none",
            display: "inline-block",
            marginBottom: 40,
          }}
        >
          ← back to journal
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--color-accent)",
            }}
          >
            {post.category}
          </span>
          <span style={{ color: "var(--color-border)" }}>·</span>
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 11,
              color: "var(--color-text-muted)",
            }}
          >
            {post.readTime}
          </span>
          <span style={{ color: "var(--color-border)" }}>·</span>
          <span
            style={{
              fontFamily: "var(--font-dm-sans)",
              fontSize: 11,
              color: "var(--color-text-muted)",
            }}
          >
            {formatDate(post.date)}
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 300,
            color: "var(--color-text-headline)",
            lineHeight: 1.1,
            marginBottom: 24,
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 16,
            color: "var(--color-text-body)",
            lineHeight: 1.7,
            borderLeft: "2px solid var(--color-accent)",
            paddingLeft: 20,
            fontStyle: "italic",
          }}
        >
          {post.description}
        </p>
      </section>

      {/* Divider */}
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto 48px",
          padding: "0 32px",
        }}
      >
        <hr style={{ border: "none", borderTop: "0.5px solid var(--color-border)" }} />
      </div>

      {/* Body */}
      <article
        className="blog-body"
        style={{ maxWidth: 720, margin: "0 auto", padding: "0 32px 80px" }}
        dangerouslySetInnerHTML={{ __html: post.body }}
      />

      {/* CTA */}
      <section
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
          className="blog-cta-grid"
        >
          {/* Left — label */}
          <p style={{
            fontFamily: "var(--font-cormorant)",
            fontSize: "clamp(18px, 2vw, 24px)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "var(--color-text-headline)",
          }}>
            ready to experience this for yourself?
          </p>

          {/* Center — retreat links */}
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              { href: "/retreats/mexico", label: "mexico — oct 2026" },
              { href: "/retreats/morocco", label: "morocco — nov 2026" },
              { href: "/retreats/kenya", label: "kenya — nov 2027" },
            ].map((r) => (
              <Link
                key={r.href}
                href={r.href}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: 13,
                  color: "var(--color-text-muted)",
                  textDecoration: "none",
                }}
              >
                {r.label}
              </Link>
            ))}
          </div>

          {/* Right — back to journal */}
          <div style={{ textAlign: "right" }}>
            <Link
              href="/blog"
              style={{
                fontFamily: "var(--font-dm-sans)",
                fontSize: 13,
                color: "var(--color-text-muted)",
                textDecoration: "none",
              }}
            >
              ← journal
            </Link>
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .blog-cta-grid {
              grid-template-columns: 1fr !important;
              text-align: center;
            }
            .blog-cta-grid > div:last-child {
              text-align: center !important;
            }
          }
        `}</style>
      </section>
    </main>
  );
}
