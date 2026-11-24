// /retreats — all retreats on one page. Doubles as the link-in-bio page for
// social, so it has to work as a fast, thumb-friendly list on a phone.
//
// Keep `retreats` in date order and current: when a retreat ends, drop its
// card (Morocco ends Dec 5 2026). Casa Amor links to a call until its page
// launches; swap `href` to "/retreats/spain" on launch day.
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CALENDAR_URL } from "@/components/MeetUs";

export const metadata: Metadata = {
  title: "Women's Retreats Abroad — Kenya, Morocco, Spain & Custom",
  description:
    "Small-group international retreats for women. Choose your journey: a safari retreat in Kenya, the desert in Morocco, Casa Amor in Andalusia, or a retreat designed just for you.",
  keywords: [
    "international retreats for women",
    "women's retreats abroad",
    "women's retreat 2027",
    "small group women's retreat",
    "women's safari retreat Kenya",
    "women's retreat Morocco",
    "women's retreat Spain",
    "custom women's retreat",
  ],
  alternates: { canonical: "/retreats" },
  openGraph: {
    title: "Choose your journey | ASHA Experiences",
    description: "Small-group international retreats for women in Kenya, Morocco and Spain, plus retreats designed just for you.",
    url: "https://ashaexperiences.com/retreats",
    images: [{ url: "/images/Into the Wild Hero.jpg", width: 1200, height: 800, alt: "ASHA Experiences retreats for women" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Choose your journey | ASHA Experiences",
    description: "Small-group international retreats for women in Kenya, Morocco and Spain.",
    images: ["/images/Into the Wild Hero.jpg"],
  },
};

type Retreat = {
  name: string;
  place: string;
  dates: string;
  line: string;
  status: string;
  href: string;
  external?: boolean;
  cta: string;
  image: string;
  alt: string;
  position?: string;
};

const retreats: Retreat[] = [
  {
    name: "Sacred Sands",
    place: "Morocco",
    dates: "Nov 29 – Dec 5, 2026",
    line: "seven days in the desert, the Atlas foothills and the medina.",
    status: "starting soon",
    href: "/retreats/morocco",
    cta: "see the retreat",
    image: "/images/morocco-hero-v2.png",
    alt: "the Moroccan desert at golden hour",
  },
  {
    name: "Into the Wild",
    place: "Kenya",
    dates: "Nov 28 – Dec 4, 2027",
    line: "a safari retreat on 90,000 acres of open savannah.",
    status: "now booking",
    href: "/retreats/kenya",
    cta: "see the retreat",
    image: "/images/Into the Wild Hero.jpg",
    alt: "the savannah at Ol Pejeta, Kenya",
  },
  {
    name: "Casa Amor",
    place: "Andalusia, Spain",
    dates: "June 2027",
    line: "five nights between the countryside of Vejer and the beaches of the Costa de la Luz.",
    status: "coming June 2027",
    href: CALENDAR_URL,
    external: true,
    cta: "get first dibs",
    image: "/images/Vejer de la Frontera.jpeg",
    alt: "the white town of Vejer de la Frontera above the countryside and the sea",
    position: "center 60%",
  },
  {
    name: "Your Own Retreat",
    place: "anywhere you dream",
    dates: "any dates",
    line: "for your friends, your team or your community. designed and hosted by us.",
    status: "custom",
    href: "/retreats/custom",
    cta: "design yours",
    image: "/images/ReturnToLove girls group.jpg",
    alt: "a group of women arm in arm, laughing under string lights",
    position: "center 35%",
  },
];

function Card({ r, i }: { r: Retreat; i: number }) {
  const inner = (
    <>
      <div className="rc-img">
        <Image src={r.image} alt={r.alt} fill sizes="(max-width: 760px) 100vw, (max-width: 1080px) 380px, 300px" style={{ objectFit: "cover", objectPosition: r.position ?? "center" }} priority={i < 2} />
      </div>
      <div className="rc-shade" aria-hidden="true" />
      <span className="rc-status">{r.status}</span>
      <div className="rc-body">
        <p className="rc-place">{r.place}</p>
        <h2 className="rc-name">{r.name}</h2>
        <p className="rc-dates">{r.dates}</p>
        <p className="rc-line">{r.line}</p>
        <span className="rc-cta">{r.cta} <span aria-hidden="true">→</span></span>
      </div>
    </>
  );
  return r.external ? (
    <a href={r.href} target="_blank" rel="noopener noreferrer" className="rc">{inner}</a>
  ) : (
    <Link href={r.href} className="rc">{inner}</Link>
  );
}

export default function RetreatsPage() {
  return (
    <main style={{ background: "var(--color-bg-page)" }}>
      <section style={{ padding: "140px 24px 48px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 11, letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 16 }}>
          international retreats for women
        </p>
        <h1 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(38px,6vw,64px)", color: "var(--color-text-headline)", fontWeight: 700, lineHeight: 1.05, marginBottom: 18 }}>
          choose your journey
        </h1>
        <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(20px,2.6vw,26px)", color: "var(--color-text-body)", maxWidth: 560, margin: "0 auto" }}>
          small groups, faraway places, and the version of you you&apos;ve been missing.
        </p>
      </section>

      <section style={{ padding: "0 24px 80px" }}>
        <div className="rc-grid">
          {retreats.map((r, i) => <Card key={r.name} r={r} i={i} />)}
        </div>
      </section>

      <section style={{ background: "var(--color-bg-surface)", padding: "72px 24px 88px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontSize: "clamp(24px,3vw,32px)", color: "var(--color-text-headline)", marginBottom: 10 }}>
          not sure which one is calling you?
        </p>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, color: "var(--color-text-body)", maxWidth: 460, margin: "0 auto 28px", lineHeight: 1.7 }}>
          take the two-minute quiz, or talk it through with us. no pressure, just an honest conversation.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/find-your-retreat" className="rc-btn rc-btn-fill">find your retreat</Link>
          <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer" className="rc-btn rc-btn-line">book a call with us</a>
        </div>
      </section>

      <style>{`
        .rc-grid { max-width: 1240px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
        .rc { position: relative; display: block; aspect-ratio: 3 / 4.6; border-radius: 10px; overflow: hidden; text-decoration: none; background: #2D2521; box-shadow: 0 10px 30px rgba(45,37,33,0.12); transition: transform 0.35s ease, box-shadow 0.35s ease; }
        .rc:hover { transform: translateY(-6px); box-shadow: 0 22px 48px rgba(45,37,33,0.22); }
        .rc:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 4px; }
        .rc-img { position: absolute; inset: 0; transition: transform 0.9s ease; }
        .rc:hover .rc-img { transform: scale(1.06); }
        .rc-shade { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(45,37,33,0.05) 35%, rgba(45,37,33,0.82) 100%); }
        .rc-status { position: absolute; top: 14px; left: 14px; font-family: var(--font-dm-sans); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #2D2521; background: rgba(255,252,245,0.92); padding: 6px 12px; border-radius: 999px; }
        .rc-body { position: absolute; left: 0; right: 0; bottom: 0; padding: 20px; color: #F1F0E5; }
        .rc-place { font-family: var(--font-dm-sans); font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase; color: #E8D5BC; margin-bottom: 6px; }
        .rc-name { font-family: var(--font-heading); font-size: clamp(24px, 2.2vw, 30px); line-height: 1.05; color: #F1F0E5; margin-bottom: 6px; }
        .rc-dates { font-family: var(--font-cormorant); font-style: italic; font-size: 18px; color: #E8D5BC; margin-bottom: 10px; }
        .rc-line { font-family: var(--font-dm-sans); font-size: 13px; line-height: 1.55; color: #EFE6D3; margin-bottom: 16px; }
        .rc-cta { display: inline-block; font-family: var(--font-dm-sans); font-size: 12px; letter-spacing: 0.04em; color: #2D2521; background: #C39E88; padding: 9px 16px; transition: background 0.3s ease; }
        .rc:hover .rc-cta { background: #E8D5BC; }
        .rc-btn { display: inline-block; padding: 13px 28px; font-family: var(--font-dm-sans); font-size: 13px; letter-spacing: 0.04em; text-decoration: none; }
        .rc-btn-fill { background: var(--color-accent); color: #FFFCF5; border: 1px solid var(--color-accent); }
        .rc-btn-line { border: 1px solid var(--color-accent); color: var(--color-accent); }
        @media (max-width: 1080px) {
          .rc-grid { grid-template-columns: 1fr 1fr; max-width: 760px; }
          .rc { aspect-ratio: 4 / 5; }
        }
        @media (max-width: 760px) {
          .rc-grid { grid-template-columns: 1fr; gap: 16px; }
          .rc { aspect-ratio: 4 / 3.6; }
          .rc-body { padding: 20px; }
          .rc-line { display: none; }
        }
        @media (prefers-reduced-motion: reduce) { .rc, .rc-img { transition: none; } }
      `}</style>
    </main>
  );
}
