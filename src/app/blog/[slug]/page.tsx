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

        {post.description && (
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
        )}
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
      {post.body.includes("__TESTIMONIAL_VIDEO__") ? (
        <>
          <article
            className="blog-body"
            style={{ maxWidth: 720, margin: "0 auto", padding: "0 32px 0" }}
            dangerouslySetInnerHTML={{ __html: post.body.split("__TESTIMONIAL_VIDEO__")[0] }}
          />
          <div style={{ maxWidth: 720, margin: "48px auto", padding: "0 32px" }}>
            <video controls preload="metadata" style={{ width: "100%", display: "block", borderRadius: 4 }}>
              <source src="https://pub-2741403aca194491b445876d4a738ef8.r2.dev/videos/Testimonials.mp4" type="video/mp4" />
            </video>
          </div>
          <article
            className="blog-body"
            style={{ maxWidth: 720, margin: "0 auto", padding: "0 32px 32px" }}
            dangerouslySetInnerHTML={{ __html: post.body.split("__TESTIMONIAL_VIDEO__")[1] }}
          />
        </>
      ) : (
        <article
          className="blog-body"
          style={{ maxWidth: 720, margin: "0 auto", padding: "0 32px 32px" }}
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      )}

      {/* Back link */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 32px 64px" }}>
        <Link
          href="/blog"
          style={{
            fontFamily: "var(--font-dm-sans)",
            fontSize: 12,
            color: "var(--color-accent)",
            letterSpacing: "0.1em",
            textDecoration: "none",
          }}
        >
          ← more from the journal
        </Link>
      </div>
    </main>
  );
}
