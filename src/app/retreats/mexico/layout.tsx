import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women's Jungle Retreat Mexico 2026 — Becoming HER | ASHA Experiences",
  description: "A 5-day women's retreat in the jungle of the Riviera Maya, Mexico. Oct 27–31, 2026. Yoga, sound healing, cenotes, ceremony, and sisterhood. Limited spots available.",
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
    "Becoming HER retreat",
    "women's ceremony retreat",
    "Mexico retreat 2026",
    "ASHA Experiences Mexico",
    "women's yoga retreat Riviera Maya",
    "jungle wellness retreat",
    "women's healing retreat Mexico",
    "somatic retreat Mexico",
    "women's group retreat Mexico 2026",
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

export default function MexicoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
