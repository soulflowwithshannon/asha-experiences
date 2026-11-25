"use client";

// The page a retreat becomes once bookings close (Morocco, Mexico, Nov 2026):
// dark split header, the week in four photos, a "be first to know" sign-up
// with interest checkboxes, and cards for what's open now. Each retreat's
// full sales page lives in its own `_archive` folder for the next run.
//
// The form posts to /api/destination-request, the same Resend route the Spain
// waitlist uses; the picked interests travel as the `destination` string,
// prefixed with `listName` so the email says which page she signed up on.
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

type Photo = { src: string; alt: string; position?: string };

export type ClosedRetreatProps = {
  header: {
    chip: string;
    title: string;
    placeAndDates: string;
    tagline: string;
    footnote: string;
    photo: Photo;
    pinned: Photo & { caption: string };
  };
  week: {
    eyebrow: string;
    heading: string;
    body: string;
    quote: string;
    /** four photos; the second and fourth sit lower */
    shots?: Photo[];
    /**
     * Instead of `shots`: a gap-free collage on a 4-column grid (2 on phones).
     * A tile is one column wide; `span: "wide"` makes it two (full width on
     * phones). Every tile is the same height. For no gaps, photos + wide
     * tiles must be a multiple of 4: 9 photos = 3 wide, 10 = 2 wide.
     */
    collage?: (Photo & { span?: "wide" })[];
  };
  signUp: {
    listName: string;
    heading: string;
    body: string;
    interests: { id: string; label: string }[];
    /** ids ticked when the page loads */
    defaultPicked: string[];
  };
  closing: string;
  /**
   * Tighter spacing and type (Mexico and Morocco, Nov 2026): smaller tagline
   * on phones, less space under the header and above the week and "ready
   * sooner?", smaller week copy.
   */
  compact?: boolean;
};

const NEXT = [
  {
    href: "/retreats/spain-waitlist",
    image: "/images/Vejer de la Frontera.jpeg",
    alt: "the white town of Vejer de la Frontera",
    eyebrow: "Andalusia, Spain · June 15 – 20, 2027",
    name: "Casa Amor",
    line: "five nights between the countryside of Vejer and the beaches of the Costa de la Luz.",
    cta: "join the Spain list →",
  },
  {
    href: "/retreats/kenya",
    image: "/images/kenya-elephant-plains.jpeg",
    alt: "elephants on the plains of Ol Pejeta",
    eyebrow: "Ol Pejeta, Kenya · Nov 28 – Dec 4, 2027",
    name: "Into the Wild",
    line: "a safari retreat for women. booking now, with monthly payments.",
    cta: "see the Kenya retreat →",
  },
  {
    href: "/retreats/custom",
    image: "/images/Morocco lounge.jpeg",
    alt: "a lounge set for a private group",
    eyebrow: "your dates · your people",
    name: "a custom retreat",
    line: "bring your circle. we'll design the week around her.",
    cta: "plan one with us →",
  },
];

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans)",
  fontSize: 11,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  color: "var(--color-accent)",
  fontWeight: 700,
  marginBottom: 12,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  boxSizing: "border-box",
  padding: "14px 16px",
  border: "1px solid var(--color-text-headline)",
  background: "var(--color-bg-page)",
  color: "var(--color-text-body)",
  fontFamily: "var(--font-dm-sans)",
  fontSize: 15,
  borderRadius: 4,
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-dm-sans)",
  fontSize: 12,
  letterSpacing: "0.06em",
  color: "var(--color-text-body)",
};

function Header({ h }: { h: ClosedRetreatProps["header"] }) {
  return (
    <section className="ss-split" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "100svh", background: "#2D2521" }}>
      <div className="ss-header-copy" style={{ padding: "140px 72px 64px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 48 }}>
        <div style={{ maxWidth: 470 }}>
          <p className="hero-rise-sm" style={{ display: "inline-block", padding: "6px 14px", border: "1px solid #C39E88", fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#E8D5BC", marginBottom: 20 }}>
            {h.chip}
          </p>
          <h1 className="hero-rise" style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(56px,7vw,84px)", color: "#F1F0E5", fontWeight: 400, lineHeight: 1, marginBottom: 8 }}>
            {h.title}
          </h1>
          <p className="hero-rise-sm" style={{ fontFamily: "var(--font-cormorant)", fontSize: 22, color: "#E8B88A", marginBottom: 28 }}>
            {h.placeAndDates}
          </p>
          <p className="hero-rise ss-tagline" style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(24px,2.4vw,28px)", lineHeight: 1.4, color: "#E8D5BC", marginBottom: 36 }}>
            {h.tagline}
          </p>
          <div className="hero-rise" style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <a
              href="#list"
              style={{ display: "inline-block", padding: "15px 34px", background: "#C39E88", color: "#2D2521", fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 700, letterSpacing: "0.04em", textDecoration: "none", transition: "background 0.3s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#b08d78")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#C39E88")}
            >
              be first to know ↓
            </a>
            <a href="#next" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 600, color: "#E8D5BC", textDecoration: "none" }}>
              see what&apos;s open
            </a>
          </div>
        </div>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "#C5AA9B" }}>{h.footnote}</p>
      </div>
      <div className="ss-header-photo" style={{ position: "relative", minHeight: 560, overflow: "hidden" }}>
        <Image src={h.photo.src} alt={h.photo.alt} fill priority sizes="(max-width: 860px) 100vw, 50vw" style={{ objectFit: "cover", objectPosition: h.photo.position ?? "center" }} />
        <div style={{ position: "absolute", right: 32, bottom: 32, background: "#FFFCF5", padding: 10, width: 200, transform: "rotate(3deg)", boxShadow: "0 12px 32px rgba(0,0,0,0.4)" }}>
          <div style={{ position: "relative", width: "100%", height: 220 }}>
            <Image src={h.pinned.src} alt={h.pinned.alt} fill sizes="200px" style={{ objectFit: "cover", objectPosition: h.pinned.position ?? "center" }} />
          </div>
          <p style={{ margin: "8px 0 2px", fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 17, color: "var(--color-text-headline)", textAlign: "center" }}>
            {h.pinned.caption}
          </p>
        </div>
      </div>
    </section>
  );
}

function TheWeek({ w }: { w: ClosedRetreatProps["week"] }) {
  return (
    <section className="ss-pad ss-week" style={{ background: "var(--color-bg-page)", padding: "96px 48px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <FadeIn>
          <div className="ss-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 32, marginBottom: 40 }}>
            <div style={{ maxWidth: 560 }}>
              <p style={eyebrow}>{w.eyebrow}</p>
              <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px,4vw,44px)", color: "var(--color-text-headline)", fontWeight: 400, marginBottom: 16 }}>
                {w.heading}
              </h2>
              <p className="ss-week-body" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16, lineHeight: 1.8, color: "var(--color-text-body)" }}>{w.body}</p>
            </div>
            <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 22, color: "var(--color-text-headline)", maxWidth: 300 }}>
              {w.quote}
            </p>
          </div>
        </FadeIn>
        {w.collage && (
          <div className="ss-collage" style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gridAutoRows: 190, gridAutoFlow: "row dense", gap: 12 }}>
            {w.collage.map((s, i) => (
              <div
                key={s.src}
                className={s.span ? `ss-tile-${s.span}` : undefined}
                style={{ position: "relative", borderRadius: 6, overflow: "hidden", gridColumn: s.span ? "span 2" : "span 1", gridRow: "span 2", background: "var(--color-bg-surface)" }}
              >
                <FadeIn delay={(i % 4) * 0.06}>
                  <div style={{ position: "absolute", inset: 0 }}>
                    <Image src={s.src} alt={s.alt} fill sizes={s.span ? "(max-width: 860px) 100vw, 590px" : "(max-width: 860px) 50vw, 290px"} style={{ objectFit: "cover", objectPosition: s.position ?? "center" }} />
                  </div>
                </FadeIn>
              </div>
            ))}
          </div>
        )}
        <div className="ss-mosaic" style={{ display: w.shots ? "grid" : "none", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12 }}>
          {(w.shots ?? []).map((s, i) => {
            const offset = i % 2 === 1;
            return (
              <FadeIn key={s.src} delay={i * 0.08}>
                <div className={offset ? "ss-offset" : undefined} style={{ position: "relative", height: 340, borderRadius: 6, overflow: "hidden", marginTop: offset ? 40 : 0 }}>
                  <Image src={s.src} alt={s.alt} fill sizes="(max-width: 860px) 50vw, 300px" style={{ objectFit: "cover", objectPosition: s.position ?? "center" }} />
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SignUp({ s }: { s: ClosedRetreatProps["signUp"] }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [picked, setPicked] = useState<string[]>(s.defaultPicked);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  function toggle(id: string) {
    setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("add your name and email, and you're on it.");
      return;
    }
    const labels = s.interests.filter((i) => picked.includes(i.id)).map((i) => i.label);
    const fallback = s.interests.find((i) => s.defaultPicked.includes(i.id))?.label ?? "anything new";
    const destination = `${s.listName}: ${labels.length ? labels.join(", ") : fallback}`;
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/destination-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), destination }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "something went wrong. try again?");
        return;
      }
      setSent(true);
    } catch {
      setError("something went wrong. try again?");
    } finally {
      setSending(false);
    }
  }

  return (
    <section id="list" className="ss-pad ss-signup" style={{ background: "var(--color-bg-surface)", padding: "96px 32px", scrollMarginTop: 72 }}>
      <div className="ss-split" style={{ maxWidth: 1080, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "center" }}>
        <FadeIn>
          <div>
            <p style={eyebrow}>missed this one?</p>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(32px,4vw,44px)", lineHeight: 1.1, color: "var(--color-text-headline)", fontWeight: 400, marginBottom: 20 }}>
              {s.heading}
            </h2>
            <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 16, lineHeight: 1.6, color: "var(--color-text-body)" }}>{s.body}</p>
          </div>
        </FadeIn>
        <div style={{ background: "var(--color-bg-page)", border: "1px solid var(--color-border)", borderRadius: 8, padding: 36 }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: 30, color: "var(--color-text-headline)", marginBottom: 12 }}>
                you&apos;re on the list.
              </p>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.8, color: "var(--color-text-body)" }}>
                we&apos;ll write to you first when dates open.
              </p>
            </div>
          ) : (
            <form onSubmit={submit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label htmlFor="ss-name" style={labelStyle}>first name</label>
                <input id="ss-name" name="name" type="text" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label htmlFor="ss-email" style={labelStyle}>email</label>
                <input id="ss-email" name="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <fieldset style={{ border: 0, padding: 0, margin: "4px 0 0", display: "flex", flexDirection: "column", gap: 12 }}>
                <legend style={{ ...labelStyle, marginBottom: 12 }}>i&apos;m interested in</legend>
                {s.interests.map((i) => (
                  <label key={i.id} style={{ display: "flex", gap: 10, alignItems: "center", fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", cursor: "pointer" }}>
                    <input type="checkbox" checked={picked.includes(i.id)} onChange={() => toggle(i.id)} style={{ accentColor: "var(--color-accent)", width: 18, height: 18, margin: 0 }} />
                    {i.label}
                  </label>
                ))}
              </fieldset>
              {error && (
                <p role="alert" style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "#9A4A3A" }}>{error}</p>
              )}
              <button
                type="submit"
                disabled={sending}
                style={{ marginTop: 6, minHeight: 48, background: "var(--color-accent)", border: "1px solid var(--color-accent)", color: "#FFFCF5", fontFamily: "var(--font-dm-sans)", fontSize: 14, fontWeight: 600, letterSpacing: "0.04em", cursor: sending ? "default" : "pointer", opacity: sending ? 0.7 : 1 }}
              >
                {sending ? "sending…" : "keep me posted →"}
              </button>
              <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, color: "var(--color-text-body)", textAlign: "center" }}>
                no spam. leave any time.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function WhatsNext() {
  return (
    <section id="next" className="ss-pad ss-next" style={{ background: "var(--color-bg-page)", padding: "96px 48px", scrollMarginTop: 72 }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(30px,4vw,40px)", color: "var(--color-text-headline)", fontWeight: 400, textAlign: "center", marginBottom: 48 }}>
            ready sooner?<span className="ss-br"> </span>where we&apos;re going next
          </h2>
        </FadeIn>
        <div className="ss-three" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 24 }}>
          {NEXT.map((r, i) => (
            <FadeIn key={r.href} delay={i * 0.1}>
              <Link href={r.href} style={{ textDecoration: "none", color: "inherit", background: "var(--color-bg-surface)", borderRadius: 8, overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}>
                <div style={{ position: "relative", height: 260 }}>
                  <Image src={r.image} alt={r.alt} fill sizes="(max-width: 860px) 100vw, 380px" style={{ objectFit: "cover" }} />
                </div>
                <div style={{ padding: "24px 28px 28px" }}>
                  <p style={{ ...eyebrow, letterSpacing: "0.14em", marginBottom: 6 }}>{r.eyebrow}</p>
                  <h3 style={{ fontFamily: "var(--font-heading)", fontSize: 28, color: "var(--color-text-headline)", fontWeight: 400, marginBottom: 10 }}>{r.name}</h3>
                  <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 14, lineHeight: 1.7, color: "var(--color-text-body)", marginBottom: 18 }}>{r.line}</p>
                  <span style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, fontWeight: 600, color: "var(--color-accent)" }}>{r.cta}</span>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ClosedRetreat({ header, week, signUp, closing, compact }: ClosedRetreatProps) {
  return (
    <main className={compact ? "ss-compact" : undefined}>
      <Header h={header} />
      <TheWeek w={week} />
      <SignUp s={signUp} />
      <WhatsNext />
      <section style={{ background: "#2D2521", padding: "72px 32px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(22px,3vw,30px)", color: "#F1F0E5", maxWidth: 760, margin: "0 auto" }}>
          {closing}
        </p>
      </section>
      <style>{`
        @media(max-width:860px){
          .ss-split{grid-template-columns:1fr!important;gap:40px!important}
          .ss-header-copy{padding:120px 20px 48px!important;min-height:auto}
          .ss-header-photo{min-height:440px!important}
          .ss-mosaic{grid-template-columns:repeat(2,minmax(0,1fr))!important}
          .ss-offset{margin-top:0!important}
          .ss-collage{grid-template-columns:repeat(2,minmax(0,1fr))!important;grid-auto-rows:125px!important;gap:8px!important}
          .ss-three{grid-template-columns:1fr!important}
          .ss-row{flex-direction:column!important;align-items:flex-start!important}
          .ss-pad{padding-left:20px!important;padding-right:20px!important}
          .ss-br{display:block}
        }
        .ss-compact .ss-header-copy{padding-bottom:40px!important}
        .ss-compact .ss-week{padding-top:64px!important;padding-bottom:64px!important}
        .ss-compact .ss-signup{padding-top:64px!important;padding-bottom:64px!important}
        .ss-compact .ss-next{padding-top:48px!important}
        .ss-compact .ss-week-body{font-size:15px!important;line-height:1.65!important}
        @media(max-width:860px){
          .ss-compact .ss-tagline{font-size:20px!important;margin-bottom:28px!important}
          .ss-compact .ss-header-copy{padding-bottom:24px!important;gap:28px!important}
          .ss-compact .ss-week{padding-top:48px!important;padding-bottom:48px!important}
          .ss-compact .ss-signup{padding-top:48px!important;padding-bottom:48px!important}
          .ss-compact .ss-next{padding-top:40px!important}
        }
      `}</style>
    </main>
  );
}
