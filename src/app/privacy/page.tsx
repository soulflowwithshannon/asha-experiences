import type { Metadata } from "next";
import type { ReactNode } from "react";

/* Privacy Policy. DRAFT written Nov 25, 2026 from what the site actually
   collects (forms → Resend, Stripe, Google Analytics, PostHog, Vercel Speed
   Insights). Fill the [PLACEHOLDER]s and have it reviewed before launch.
   If a new tool or form is added, add it to "what we collect" and "who we
   share it with". */
const LAST_UPDATED = "November 25, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How ASHA Experiences collects, uses and protects your personal information when you visit our website, contact us or book a retreat.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | ASHA Experiences",
    description: "How ASHA Experiences collects, uses and protects your personal information.",
    url: "https://ashaexperiences.com/privacy",
  },
};

const EMAIL = "connect@ashaexperiences.com";
const mail = <a href={`mailto:${EMAIL}`}>{EMAIL}</a>;
const ul = (items: ReactNode[]) => (
  <ul className="privacy-list">
    {items.map((it, i) => <li key={i}>{it}</li>)}
  </ul>
);

const sections: { id: string; title: string; body: ReactNode }[] = [
  {
    id: "who-we-are",
    title: "1. Who we are",
    body: (
      <>
        <p>ASHA Experiences LLC (&ldquo;ASHA,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;) is a Connecticut limited liability company that designs and hosts small-group retreats for women. This policy explains what personal information we collect through ashaexperiences.com and our bookings, how we use it, and the choices you have.</p>
        <p>We keep this simple: we only collect what we need to answer you, plan your retreat and look after you while you&apos;re with us. We never sell your personal information.</p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    title: "2. What we collect",
    body: (
      <>
        <p><strong>What you give us.</strong> When you fill in a form on our site, we collect what you type into it:</p>
        {ul([
          <>the contact form and chat: your name, email and message, and the page you sent it from</>,
          <>our quiz: your answers, your result, and your name and email if you ask us to send you the result</>,
          <>the journal signup and retreat waitlists: your first name and email</>,
          <>custom retreat enquiries: your name, email, phone number, where you&apos;re based, and the details you share about your group, dates, budget and plans</>,
        ])}
        <p><strong>When you book.</strong> Payments are handled by Stripe. We see your name, email, billing details and payment status, but we never see or store your full card number. Before you travel, we also ask you to complete an intake form and a liability waiver. These can include health information you choose to share with us, such as injuries, allergies, pregnancy or dietary needs, so we can keep you safe. [PLACEHOLDER: which tool the intake form and waiver are collected in, e.g. Google Forms, Jotform, DocuSign]</p>
        <p><strong>Automatically, when you visit.</strong> Like most websites, we collect information about how the site is used: pages visited, how you arrived, your browser and device type, and your approximate location based on your IP address. See <a href="#cookies">Cookies and analytics</a> below.</p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    title: "3. How we use it",
    body: ul([
      <>to reply to your messages and questions</>,
      <>to send you what you asked for, like your quiz result or news about a retreat you&apos;re waiting for</>,
      <>to process bookings and payments, and to plan and run your retreat</>,
      <>to keep you safe during the retreat, using the health and emergency details you share</>,
      <>to send occasional emails if you&apos;ve signed up, which you can stop at any time</>,
      <>to understand how our website is used, so we can make it better</>,
      <>to meet our legal, tax and accounting obligations</>,
    ]),
  },
  {
    id: "sharing",
    title: "4. Who we share it with",
    body: (
      <>
        <p>We don&apos;t sell or rent your personal information. We share it only with the people and services that help us run ASHA:</p>
        {ul([
          <><strong>Resend</strong>, which sends our emails and keeps our email list</>,
          <><strong>Stripe</strong>, which processes payments</>,
          <><strong>Google Analytics</strong> and <strong>PostHog</strong>, which tell us how the website is used</>,
          <><strong>Vercel</strong>, which hosts our website</>,
          <><strong>Google Calendar</strong>, if you book a call with us</>,
          <><strong>retreat partners</strong>, such as venues, guides and transport providers, who receive only what they need to host you (for example your name, arrival details, and dietary or health needs)</>,
        ])}
        <p>We may also share information if the law requires it, or to protect someone&apos;s safety.</p>
      </>
    ),
  },
  {
    id: "cookies",
    title: "5. Cookies and analytics",
    body: (
      <>
        <p>Our website uses cookies and similar technologies from Google Analytics and PostHog to count visits and see which pages are useful. Vercel Speed Insights measures how fast pages load and doesn&apos;t use cookies. [PLACEHOLDER: confirm whether session recording is turned on in PostHog. If it is, say so here.]</p>
        <p>You can block or delete cookies in your browser settings, and you can opt out of Google Analytics with Google&apos;s <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">opt-out browser add-on</a>. The site still works if you do.</p>
      </>
    ),
  },
  {
    id: "emails",
    title: "6. Emails from us",
    body: <p>If you join our list, we&apos;ll write to you now and then about our writing and our retreats. Every email has a way to unsubscribe, or you can email {mail} and we&apos;ll take you off. Messages about a retreat you&apos;ve booked aren&apos;t marketing, so you&apos;ll still receive those.</p>,
  },
  {
    id: "retention",
    title: "7. How long we keep it",
    body: <p>We keep your information only as long as we need it for the reasons above. [PLACEHOLDER: how long you keep enquiries, booking records and intake/waiver forms, e.g. &ldquo;booking and payment records for 7 years for tax purposes; intake forms for 12 months after your retreat&rdquo;]</p>,
  },
  {
    id: "security",
    title: "8. Keeping it safe",
    body: <p>We use reputable services with strong security, limit who can see your information, and never store card details ourselves. No system is perfectly secure, but we take care with what you share, especially health information.</p>,
  },
  {
    id: "your-rights",
    title: "9. Your choices and rights",
    body: (
      <>
        <p>You can ask us at any time to:</p>
        {ul([
          <>tell you what personal information we hold about you</>,
          <>correct anything that&apos;s wrong</>,
          <>delete your information, unless we need to keep it for legal or accounting reasons</>,
          <>stop sending you marketing emails</>,
        ])}
        <p>Just email {mail}. Depending on where you live, for example in California or the European Union, you may have additional rights under local law, and we&apos;ll honor them.</p>
      </>
    ),
  },
  {
    id: "children",
    title: "10. Children",
    body: <p>Our retreats are for women 18 and older, and our website isn&apos;t meant for children. We don&apos;t knowingly collect information from anyone under 18.</p>,
  },
  {
    id: "international",
    title: "11. Where your information is stored",
    body: <p>We&apos;re based in the United States, and the services we use store information in the US and other countries. If you&apos;re visiting from outside the US, your information will be transferred to and processed there.</p>,
  },
  {
    id: "changes",
    title: "12. Changes to this policy",
    body: <p>We may update this policy from time to time. When we do, we&apos;ll change the date at the top of this page.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <main style={{ background: "var(--color-bg-page)", minHeight: "100vh" }}>
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "120px 32px 96px" }} className="privacy">
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 10, letterSpacing: "0.22em", textTransform: "uppercase", color: "var(--color-accent)", marginBottom: 20 }}>
          the fine print
        </p>
        <h1 style={{ fontFamily: "var(--font-cormorant)", fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 300, color: "var(--color-text-headline)", lineHeight: 1.05, marginBottom: 16 }}>
          Privacy Policy
        </h1>
        <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: 13, color: "var(--color-text-muted)", marginBottom: 40 }}>
          Last updated: {LAST_UPDATED}
        </p>

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
          <p>Questions about your privacy, or want to make a request? Reach us anytime at {mail}.</p>
        </section>
      </section>

      <style>{`
        .privacy p, .privacy-list { font-family: var(--font-dm-sans); font-size: 15px; line-height: 1.75; color: var(--color-text-body); margin: 0 0 14px; }
        .privacy-list { padding-left: 20px; list-style: disc; }
        .privacy-list li { margin-bottom: 4px; }
        .privacy section a { color: var(--color-accent); }
        @media (max-width: 640px) {
          .privacy { padding: 100px 20px 72px !important; }
        }
      `}</style>
    </main>
  );
}
