import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women's Safari Retreat Kenya 2027 — 7 Days in the Wild",
  description: "Imagine waking up to elephants outside your door. A 7-day women's retreat in Kenya's Ol Pejeta Conservancy — yoga, sound healing, wildlife, ceremony, and sisterhood. Limited spots.",
  keywords: [
    "women's safari retreat",
    "safari retreat for women",
    "women's retreat Africa",
    "Kenya safari retreat 2027",
    "safari yoga retreat Africa",
    "luxury safari retreat women",
    "wellness safari Kenya",
    "spiritual safari retreat",
    "women's wellness retreat Africa",
    "Ol Pejeta retreat",
    "yoga safari Africa",
    "transformational safari retreat",
    "women's group safari",
    "safari sound healing",
    "Kenya yoga retreat",
    "African safari retreat women",
    "healing retreat in nature",
    "women's retreat in the wild",
    "reconnect with nature retreat women",
    "wildlife retreat for women",
    "sound healing safari",
    "meditation in nature women",
    "women's yoga in Africa",
    "self-discovery retreat Africa",
    "sisterhood retreat Kenya",
    "women's community retreat Africa",
    "retreat to find yourself",
    "women's ceremony in Africa",
    "Into the Wild retreat Kenya",
    "ASHA Experiences Kenya",
  ],
  alternates: {
    canonical: "/retreats/kenya",
  },
  openGraph: {
    title: "Women's Safari Retreat Kenya 2027 — Into the Wild | ASHA Experiences",
    description: "A 7-day women's safari retreat in Kenya at Ol Pejeta Conservancy. Yoga, sound healing, wildlife, and sisterhood on the African savanna. Limited spots.",
    url: "https://ashaexperiences.com/retreats/kenya",
    images: [{ url: "/images/Kenya hero.jpeg", width: 1200, height: 800, alt: "Women's Safari Retreat Kenya — Into the Wild 2027" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Women's Safari Retreat Kenya 2027 | ASHA Experiences",
    description: "A 7-day women's safari retreat in Kenya. Yoga, sound healing, wildlife, and sisterhood on the African savanna.",
    images: ["/images/Kenya hero.jpeg"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Into the Wild — Women's Safari Retreat Kenya 2027",
  "description": "A 7-day women's transformational safari retreat in Ol Pejeta Conservancy, Kenya. Yoga, sound healing, wildlife encounters, ceremony, and sisterhood.",
  "startDate": "2027-11-28",
  "endDate": "2027-12-04",
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "location": {
    "@type": "Place",
    "name": "Ol Pejeta Safari Cottages",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Ol Pejeta Conservancy",
      "addressCountry": "KE"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "ASHA Experiences",
    "url": "https://ashaexperiences.com"
  },
  "image": "https://ashaexperiences.com/images/Into the Wild Hero.jpg",
  "url": "https://ashaexperiences.com/retreats/kenya",
  "offers": {
    "@type": "Offer",
    "price": "4500",
    "priceCurrency": "USD",
    "availability": "https://schema.org/LimitedAvailability",
    "url": "https://ashaexperiences.com/retreats/kenya"
  }
};

export default function KenyaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {children}
    </>
  );
}
