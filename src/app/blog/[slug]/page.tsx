import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPost, getAllSlugs } from "@/lib/blog";
import QuizCTA from "@/components/QuizCTA";

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
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://ashaexperiences.com/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      images: post.image
        ? [{ url: post.image, width: 1200, height: 630, alt: post.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : undefined,
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        url: `https://ashaexperiences.com/blog/${post.slug}`,
        mainEntityOfPage: `https://ashaexperiences.com/blog/${post.slug}`,
        articleSection: post.theme,
        ...(post.image
          ? { image: [`https://ashaexperiences.com${encodeURI(post.image)}`] }
          : {}),
        author: { "@type": "Organization", name: "ASHA Experiences", url: "https://ashaexperiences.com" },
        publisher: {
          "@type": "Organization",
          name: "ASHA Experiences",
          url: "https://ashaexperiences.com",
          logo: { "@type": "ImageObject", url: "https://ashaexperiences.com/images/asha-logo-white.webp" },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://ashaexperiences.com" },
          { "@type": "ListItem", position: 2, name: "Journal", item: "https://ashaexperiences.com/blog" },
          { "@type": "ListItem", position: 3, name: post.title },
        ],
      },
    ],
  };

  return (
    <main style={{ background: "var(--color-bg-page)", minHeight: "100vh" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
            {post.theme}
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

      {/* Body — split on inline tokens so real React blocks can sit mid-article */}
      {post.body.split(/(__TESTIMONIAL_VIDEO__|__QUIZ_CTA__)/).map((part, i) => {
        if (part === "__TESTIMONIAL_VIDEO__") {
          return (
            <div key={i} style={{ maxWidth: 720, margin: "48px auto", padding: "0 32px" }}>
              <video controls preload="metadata" style={{ width: "100%", display: "block", borderRadius: 4 }}>
                <source src="https://pub-2741403aca194491b445876d4a738ef8.r2.dev/videos/Testimonials.mp4" type="video/mp4" />
              </video>
            </div>
          );
        }
        if (part === "__QUIZ_CTA__") {
          return (
            <QuizCTA
              key={i}
              variant="inline"
              heading="or let us just tell you"
              body="five questions about how you're actually feeling — and we'll match you to one of the three."
            />
          );
        }
        if (!part.trim()) return null;
        return (
          <article
            key={i}
            className="blog-body"
            style={{ maxWidth: 720, margin: "0 auto", padding: "0 32px" }}
            dangerouslySetInnerHTML={{ __html: part }}
          />
        );
      })}

      {/* Closing CTA */}
      <QuizCTA />

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
