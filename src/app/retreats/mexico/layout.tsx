import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women's Retreat Mexico 2026 — 5 Days in the Jungle | ASHA Experiences",
  description: "Lose yourself in the jungle and find yourself again. A 5-day women's retreat in the Riviera Maya — yoga, sound healing, cenotes, ceremony, and sisterhood. Oct 27–31, 2026.",
  keywords: [
    "women's retreat Mexico",
    "jungle retreat Mexico",
    "Riviera Maya women's retreat",
    "Mexico yoga retreat women",
    "women's wellness retreat Mexico",
    "Riviera Maya retreat 2026",
    "women's spiritual retreat Mexico",
    "cenote retreat Mexico",
    "transformational retreat Mexico",
    "Lunita Jungle Retreat women",
    "sound healing retreat Mexico",
    "women's ceremony retreat",
    "Mexico retreat 2026",
    "ASHA Experiences Mexico",
    "women's yoga retreat Riviera Maya",
    "jungle wellness retreat",
    "women's healing retreat Mexico",
    "somatic retreat Mexico",
    "women's group retreat Mexico 2026",
    "self-love retreat Mexico",
    "sisterhood retreat Mexico",
    "women's connection retreat Mexico",
    "meditation retreat Mexico women",
    "sound bath retreat Mexico",
    "visualization retreat Mexico",
    "reiki retreat Mexico",
    "women's identity retreat",
    "become yourself retreat",
    "women's empowerment retreat Mexico",
    "retreat for women ready to change",
    "women's circle retreat Mexico",
    "healing in nature Mexico",
  ],
  openGraph: {
    title: "Women's Jungle Retreat Mexico 2026 — Becoming HER | ASHA Experiences",
    description: "A 5-day women's retreat in the jungle of the Riviera Maya, Mexico. Oct 27–31, 2026. Yoga, sound healing, cenotes, ceremony, and sisterhood. Limited spots.",
    url: "https://ashaexperiences.com/retreats/mexico",
    images: [{ url: "/images/Mexico hero.jpeg", width: 1200, height: 800, alt: "Becoming HER — Women's Jungle Retreat Mexico 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Women's Jungle Retreat Mexico 2026 | ASHA Experiences",
    description: "A 5-day women's retreat in the jungle of the Riviera Maya. Yoga, sound healing, cenotes, ceremony, and sisterhood. Oct 27–31, 2026.",
    images: ["/images/Mexico hero.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Becoming HER — Women's Jungle Retreat Mexico 2026",
  "description": "A 5-day women's transformational retreat in the jungle of the Riviera Maya, Mexico. Yoga, sound healing, cenotes, ceremony, and sisterhood.",
  "startDate": "2026-10-27",
  "endDate": "2026-10-31",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Lunita Jungle Retreat",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Riviera Maya",
      "addressCountry": "MX"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "ASHA Experiences",
    "url": "https://ashaexperiences.com"
  },
  "image": "https://ashaexperiences.com/images/Mexico hero.jpeg",
  "url": "https://ashaexperiences.com/retreats/mexico",
  "offers": {
    "@type": "Offer",
    "price": "3500",
    "priceCurrency": "USD",
    "availability": "https://schema.org/LimitedAvailability",
    "url": "https://ashaexperiences.com/retreats/mexico"
  }
};

export default function MexicoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
