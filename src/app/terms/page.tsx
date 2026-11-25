import type { Metadata } from "next";
import type { ReactNode } from "react";

/* Terms & Conditions. Wording supplied by Shannon (Nov 25, 2026): keep it
   word for word. When it changes, update LAST_UPDATED too. */
const LAST_UPDATED = "November 25, 2026";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "The terms that apply to every ASHA Experiences retreat booking: payments, refunds, transfers, changes, health, liability and more.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms and Conditions | ASHA Experiences",
    description: "The terms that apply to every ASHA Experiences retreat booking.",
    url: "https://ashaexperiences.com/terms",
  },
};

const EMAIL = "connect@ashaexperiences.com";
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "who-we-are",
    title: "1. Who we are",
    body: (
      <>
        <p>ASHA Experiences LLC (&ldquo;ASHA,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) is a Connecticut limited liability company that designs and hosts small-group retreats for women. These Terms &amp; Conditions apply to every retreat booking made through our website, Stripe checkout, or directly with us.</p>
        <p>By completing a booking or checking the terms box at checkout, you confirm that you have read, understood, and agree to these terms.</p>
      </>
    ),
  },
  {
    id: "your-booking",
    title: "2. Your booking",
    body: (
      <>
        <p>Your spot is reserved once we receive your payment (in full or your first payment). You&apos;ll receive a confirmation and welcome email from {mail}.</p>
        <p>Retreats are small and spaces are limited. Spots are offered first come, first served.</p>
        <p>You must be 18 or older to attend an ASHA retreat.</p>
      </>
    ),
  },
  {
    id: "payments",
    title: "3. Payments and payment plans",
    body: (
      <>
        <p>Prices are listed in US dollars. Payments are processed securely by Stripe.</p>
        <p>If you choose a payment plan, you agree to make your monthly payments, or to pay the full remaining balance, no later than 30 days before your retreat&apos;s start date. If a payment is missed and not made up within 7 days of our reminder, we may release your spot, and payments already made follow the refund policy below.</p>
      </>
    ),
  },
  {
    id: "refunds",
    title: "4. Refunds and cancellations",
    body: (
      <>
        <p>All payments are non-refundable once your booking is confirmed. We commit to venues, guides, and local partners on your behalf as soon as you book, and those costs can&apos;t be recovered.</p>
        <p>If you need to cancel, you may transfer the amount you&apos;ve paid to a future ASHA retreat (see <a href="#transfers">Transfers</a> below).</p>
      </>
    ),
  },
  {
    id: "transfers",
    title: "5. Transfers",
    body: (
      <>
        {/* Matches the Kenya page FAQ ("if your plans change"). Keep the two in sync. */}
        <p>If your plans change, you can transfer your spot:</p>
        <ul style={{ fontFamily: "var(--font-dm-sans)", fontSize: 15, lineHeight: 1.75, color: "var(--color-text-body)", paddingLeft: 20, margin: "0 0 14px" }}>
          <li>to another woman, or</li>
          <li>to a future ASHA retreat within 12 months</li>
        </ul>
        <p>up to 4 months before the retreat starts. Just email us at {mail}.</p>
        <p>Transfers to a future retreat depend on availability. If the new retreat costs more, you&apos;ll pay the difference. If it costs less, the difference is not refunded.</p>
      </>
    ),
  },
  {
    id: "changes-by-asha",
    title: "6. If ASHA changes or cancels a retreat",
    body: (
      <>
        <p>We may need to change parts of the itinerary, accommodation, or activities because of weather, safety, venue availability, or local conditions. When this happens we&apos;ll replace them with something of similar value wherever possible.</p>
        <p>If we cancel a retreat for reasons within our control, you may choose a full transfer to another ASHA retreat or a refund of the payments you&apos;ve made to us.</p>
        <p>If a retreat is cancelled or cut short by events outside our control (for example natural disasters, pandemics, government travel restrictions, political unrest, or venue closure), we&apos;ll offer a transfer to a future retreat. Refunds in these cases depend on what we can recover from our partners.</p>
      </>
    ),
  },
  {
    id: "included",
    title: "7. What’s included and what isn’t",
    body: (
      <p>What&apos;s included is listed on each retreat&apos;s page and booking page. Unless stated otherwise, the following are not included: international flights, travel insurance, visas, passports, vaccinations, personal purchases, optional activities, tips, and any travel before arrival or after departure.</p>
    ),
  },
  {
    id: "insurance",
    title: "8. Travel insurance and documents",
    body: (
      <>
        <p>We strongly recommend comprehensive travel insurance that covers trip cancellation, medical care, emergency evacuation, and lost luggage.</p>
        <p>You&apos;re responsible for having a valid passport and any visas, vaccinations, or entry documents required for your destination.</p>
      </>
    ),
  },
  {
    id: "health",
    title: "9. Health, wellbeing, and participation",
    body: (
      <>
        <p>Retreats include movement, yoga, somatic practices, and outdoor activities. Taking part in any activity is always your choice. Please listen to your body and tell us about any health conditions, injuries, pregnancy, allergies, or dietary needs before you arrive.</p>
        <p>Our practices support wellbeing. They are not medical or psychological treatment and don&apos;t replace care from a licensed professional.</p>
        <p>Before travel, every guest signs a liability waiver and completes an intake form.</p>
      </>
    ),
  },
  {
    id: "liability",
    title: "10. Assumption of risk and liability",
    body: (
      <>
        <p>International travel and physical activity carry risks. By attending, you accept these risks. ASHA works with local partners such as venues, guides, and transport providers, and is not responsible for their acts or omissions.</p>
        <p>To the fullest extent permitted by law, ASHA&apos;s total liability for any claim relating to a retreat is limited to the amount you paid us for that retreat.</p>
      </>
    ),
  },
  {
    id: "conduct",
    title: "11. Community and conduct",
    body: (
      <>
        <p>ASHA retreats are built on respect, care, and sisterhood. We may remove a guest whose behavior puts others at risk or disrupts the group, without a refund.</p>
        <p>Please respect the local cultures, communities, and environments we visit.</p>
      </>
    ),
  },
  {
    id: "photos",
    title: "12. Photos and content",
    body: (
      <p>We capture photos and video during retreats and may use them on our website and social media. If you&apos;d prefer not to appear, tell us before the retreat or at any time during it and we&apos;ll respect that.</p>
    ),
  },
  {
    id: "changes-to-terms",
    title: "13. Changes to these terms",
    body: <p>We may update these terms from time to time. The version in effect when you booked applies to your booking.</p>,
  },
  {
    id: "governing-law",
    title: "14. Governing law",
    body: <p>These terms are governed by the laws of the State of Connecticut, USA.</p>,
  },
];

export default function TermsPage() {
  return (
    <main style={{ background: "var(--color-bg-page)", minHeight: "100vh" }}>
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "120px 32px 96px" }} className="terms">
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 20 }}>
          the fine print
        </p>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 300, color: "var(--color-text-headline)", lineHeight: 1.05, marginBottom: 16 }}>
          Terms &amp; Conditions
        </h1>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-muted)", marginBottom: 40 }}>
          Last updated: {LAST_UPDATED}
        </p>

        {/* jump links */}
        <nav aria-label="Sections" style={{ borderTop: "0.5px solid var(--color-border)", borderBottom: "0.5px solid var(--color-border)", padding: "20px 0", marginBottom: 48 }}>
          <ol style={{ listStyle: "none", padding: 0, margin: 0, columns: "2 220px", columnGap: 32 }}>
            {sections.map((s) => (
              <li key={s.id} style={{ breakInside: "avoid", marginBottom: 6 }}>
                <a href={`#${s.id}`} style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-accent)", textDecoration: "none" }}>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {sections.map((s) => (
          <section key={s.id} id={s.id} style={{ marginBottom: 40, scrollMarginTop: 100 }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(20px, 2.4vw, 24px)", color: "var(--color-text-headline)", lineHeight: 1.25, marginBottom: 14 }}>
              {s.title}
            </h2>
            {s.body}
          </section>
        ))}

        <section id="questions" style={{ borderTop: "0.5px solid var(--color-border)", paddingTop: 32, scrollMarginTop: 100 }}>
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "clamp(20px, 2.4vw, 24px)", color: "var(--color-text-headline)", lineHeight: 1.25, marginBottom: 14 }}>
            Questions
          </h2>
          <p>Reach us anytime at {mail}.</p>
        </section>
      </section>

      <style>{`
        .terms p { font-family: var(--font-dm-sans); font-size: 15px; line-height: 1.75; color: var(--color-text-body); margin: 0 0 14px; }
        .terms section a { color: var(--color-accent); }
        @media (max-width: 640px) {
          .terms { padding: 100px 20px 72px !important; }
        }
      `}</style>
    </main>
  );
}
