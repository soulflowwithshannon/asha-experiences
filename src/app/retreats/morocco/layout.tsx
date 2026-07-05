import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women's Retreat Morocco 2026 — Sacred Sands | ASHA Experiences",
  description: "A 7-day women's retreat at Atlas Kasbah, Agadir, Morocco. Nov 29–Dec 5, 2026. Yoga, sound healing, desert adventures, Moroccan culture, and deep sisterhood. Limited spots.",
  keywords: [
    "women's retreat Morocco",
    "Morocco retreat 2026",
    "Agadir women's retreat",
    "Morocco yoga retreat women",
    "women's wellness retreat Morocco",
    "Sacred Sands retreat Morocco",
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
    "Marrakech retreat women",
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

export default function MoroccoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
