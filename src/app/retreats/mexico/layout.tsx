import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women's Retreat Mexico 2026 — 5 Days in the Jungle | ASHA Experiences",
  description: "5 days in the jungle. Yoga, sound healing, cenotes, ceremony, and women who get it. A transformational women's retreat in the Riviera Maya, Mexico — Oct 27–31, 2026. Limited spots.",
  keywords: [
    // destination + year
    "women's retreat Mexico 2026",
    "women's retreat Mexico",
    "jungle retreat Mexico",
    "Riviera Maya women's retreat",
    "Riviera Maya retreat 2026",
    "Tulum women's retreat 2026",
    "Playa del Carmen women's retreat",
    "Puerto Morelos retreat women",
    "Quintana Roo retreat women",
    "Mexico retreat for women 2026",
    "Mexico wellness retreat 2026",
    "Mexico spiritual retreat 2026",
    "Lunita Jungle Retreat",
    "Lunita retreat Mexico",
    "ASHA Experiences Mexico",

    // retreat style
    "transformational retreat Mexico",
    "women's healing retreat Mexico",
    "women's wellness retreat Mexico",
    "women's spiritual retreat Mexico",
    "women's yoga retreat Mexico",
    "women's yoga retreat Riviera Maya",
    "yoga retreat Mexico 2026",
    "all-inclusive women's retreat Mexico",
    "small group women's retreat Mexico",
    "intimate retreat for women Mexico",
    "luxury women's retreat Mexico",
    "boutique women's retreat Mexico",

    // practices
    "sound healing retreat Mexico",
    "sound bath retreat Mexico",
    "sound bath retreat Riviera Maya",
    "meditation retreat Mexico women",
    "somatic retreat Mexico",
    "breathwork retreat Mexico",
    "breathwork retreat women",
    "reiki retreat Mexico",
    "visualization retreat Mexico",
    "women's ceremony retreat",
    "women's ceremony retreat Mexico",
    "cacao ceremony retreat Mexico",
    "jungle yoga retreat",
    "yoga and sound healing retreat Mexico",
    "movement and meditation retreat Mexico",
    "healing modalities retreat Mexico",

    // cenote + nature
    "cenote retreat Mexico",
    "cenote yoga retreat",
    "cenote tour retreat",
    "jungle retreat for women",
    "jungle wellness retreat",
    "nature retreat Mexico women",
    "eco retreat Mexico women",
    "swimming in cenotes retreat",
    "healing in nature Mexico",
    "immersive nature retreat women",

    // inner work / identity
    "women's self-discovery retreat Mexico",
    "self-love retreat Mexico",
    "self-love retreat Riviera Maya",
    "women's identity retreat",
    "women's empowerment retreat Mexico",
    "women's empowerment retreat 2026",
    "becoming yourself retreat",
    "women's personal growth retreat",
    "retreat for women who want to change their life",
    "retreat for women ready to grow",
    "women's transformation retreat 2026",
    "retreat for women at a crossroads",
    "retreat to find yourself again",
    "life-changing retreat for women",
    "women finding themselves retreat",
    "come back to yourself retreat",

    // emotional / burnout
    "retreat for burnt out women",
    "retreat for overwhelmed women",
    "retreat for anxious women",
    "retreat for women who do it all",
    "healing retreat for women who need a break",
    "women's reset retreat",
    "women's mental wellness retreat Mexico",
    "emotional healing retreat Mexico",
    "healing from people pleasing retreat",
    "retreat for women who give too much",
    "rest and restore retreat for women",
    "women's nervous system healing retreat",

    // sisterhood / community
    "women's sisterhood retreat Mexico",
    "women's community retreat Mexico",
    "women's circle retreat Mexico",
    "women's connection retreat Mexico",
    "women's friendship retreat Mexico",
    "women supporting women retreat",
    "group retreat for women Mexico",
    "solo travel women's retreat Mexico",
    "travel alone women's retreat",
    "safe retreat for solo women",
    "women's group travel Mexico 2026",

    // life transitions
    "retreat for women in their 30s",
    "retreat for women in their 40s",
    "divorce healing retreat women",
    "breakup healing retreat women",
    "career change retreat for women",
    "retreat after big life change women",
    "midlife reset retreat women",
    "postpartum healing retreat women",

    // long-tail intent
    "5-day women's retreat Mexico",
    "5 day retreat for women Riviera Maya",
    "October retreat for women Mexico",
    "fall retreat for women 2026",
    "women's retreat October 2026",
    "all inclusive healing retreat women",
    "what to expect at a women's retreat",
    "best women's retreats 2026",
    "top women's retreat destinations 2026",
    "meaningful travel for women",
    "intentional travel women",
    "transformational travel for women",
    "international retreat for women",
    "women's retreat abroad 2026",
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
