import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women's Retreat Morocco 2026 — 7 Days in the Desert | ASHA Experiences",
  description: "Come home to yourself in the Moroccan desert. A 7-day women's retreat at Atlas Kasbah, Agadir — yoga, sound healing, ceremony, and deep sisterhood. Nov 29–Dec 5, 2026.",
  keywords: [
    "women's retreat Morocco",
    "Morocco retreat 2026",
    "Agadir women's retreat",
    "Morocco yoga retreat women",
    "women's wellness retreat Morocco",
    "Atlas Kasbah retreat",
    "women's spiritual retreat Morocco",
    "Morocco sound healing retreat",
    "transformational retreat Morocco",
    "women's retreat North Africa",
    "Morocco desert retreat women",
    "women's healing retreat Morocco",
    "ASHA Experiences Morocco",
    "women's group retreat Morocco",
    "Morocco wellness retreat 2026",
    "somatic retreat Morocco",
    "women's ceremony retreat Morocco",
    "luxury women's retreat Morocco",
    "self-love retreat Morocco",
    "sisterhood retreat Morocco",
    "women's connection retreat Morocco",
    "sound bath retreat Morocco",
    "meditation retreat Morocco women",
    "reiki retreat Morocco",
    "women's circle Morocco",
    "healing in the desert women",
    "women's retreat sand dunes",
    "women's empowerment retreat Morocco",
    "retreat for women 2026 Morocco",
    "women finding themselves retreat",
    "come back to yourself retreat",
  ],
  openGraph: {
    title: "Women's Retreat Morocco 2026 — Sacred Sands | ASHA Experiences",
    description: "A 7-day women's retreat at Atlas Kasbah, Agadir, Morocco. Nov 29–Dec 5, 2026. Yoga, sound healing, desert adventures, and deep sisterhood. Limited spots.",
    url: "https://ashaexperiences.com/retreats/morocco",
    images: [{ url: "/images/morocco-hero-v2.png", width: 1920, height: 1080, alt: "Sacred Sands — Women's Retreat Morocco 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Women's Retreat Morocco 2026 | ASHA Experiences",
    description: "A 7-day women's retreat at Atlas Kasbah, Agadir, Morocco. Yoga, sound healing, desert adventures, and deep sisterhood. Nov 29–Dec 5, 2026.",
    images: ["/images/morocco-hero-v2.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Sacred Sands — Women's Retreat Morocco 2026",
  "description": "A 7-day women's transformational retreat at Atlas Kasbah, Agadir, Morocco. Yoga, sound healing, desert adventures, Moroccan culture, and deep sisterhood.",
  "startDate": "2026-11-29",
  "endDate": "2026-12-05",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Atlas Kasbah",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Agadir",
      "addressCountry": "MA"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "ASHA Experiences",
    "url": "https://ashaexperiences.com"
  },
  "image": "https://ashaexperiences.com/images/morocco-hero-v2.png",
  "url": "https://ashaexperiences.com/retreats/morocco",
  "offers": {
    "@type": "Offer",
    "price": "3200",
    "priceCurrency": "USD",
    "availability": "https://schema.org/LimitedAvailability",
    "url": "https://ashaexperiences.com/retreats/morocco"
  }
};

export default function MoroccoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
