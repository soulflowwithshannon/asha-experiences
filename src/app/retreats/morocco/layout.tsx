import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sacred Sands — Morocco 2026",
  description: "A 7-day women's retreat at Atlas Kasbah, Agadir, Morocco. Nov 29–Dec 5, 2026. Desert air, warm sun, and the rhythm that reminds your nervous system what safety feels like.",
  keywords: ["Morocco women's retreat", "Agadir retreat", "Atlas Kasbah retreat", "Sacred Sands retreat 2026", "Morocco spiritual retreat", "women's retreat Morocco", "transformational travel Morocco"],
  openGraph: {
    title: "Sacred Sands — Morocco Retreat 2026 | ASHA Experiences",
    description: "A 7-day women's retreat at Atlas Kasbah, Agadir, Morocco. Nov 29–Dec 5, 2026. Desert air, warm sun, and the rhythm that reminds your nervous system what safety feels like.",
    url: "https://ashaexperiences.com/retreats/morocco",
    images: [{ url: "/images/morocco-hero-v2.png", width: 1920, height: 1080, alt: "Sacred Sands — Morocco Retreat 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sacred Sands — Morocco Retreat 2026 | ASHA Experiences",
    description: "A 7-day women's retreat at Atlas Kasbah, Agadir, Morocco. Nov 29–Dec 5, 2026.",
    images: ["/images/morocco-hero-v2.png"],
  },
};

export default function MoroccoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
