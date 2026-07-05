import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Becoming HER — Mexico 2026",
  description: "A 5-day women's retreat deep in the jungle of the Riviera Maya. Oct 27–31, 2026. Release what no longer fits and become who you are.",
  keywords: ["Mexico women's retreat", "Riviera Maya retreat", "Lunita Jungle Retreat", "women's jungle retreat 2026", "Becoming HER retreat", "transformational retreat Mexico"],
  openGraph: {
    title: "Becoming HER — Mexico Retreat 2026 | ASHA Experiences",
    description: "A 5-day women's retreat deep in the jungle of the Riviera Maya. Oct 27–31, 2026. Release what no longer fits and become who you are.",
    url: "https://ashaexperiences.com/retreats/mexico",
    images: [{ url: "/images/Mexico hero.jpeg", width: 1200, height: 800, alt: "Becoming HER — Mexico Retreat 2026" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Becoming HER — Mexico Retreat 2026 | ASHA Experiences",
    description: "A 5-day women's retreat deep in the jungle of the Riviera Maya. Oct 27–31, 2026.",
    images: ["/images/Mexico hero.jpeg"],
  },
};

export default function MexicoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
