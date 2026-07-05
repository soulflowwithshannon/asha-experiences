import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Women's Safari Retreat Kenya 2027 — Into the Wild | ASHA Experiences",
  description: "A 7-day women's safari retreat in Kenya at Ol Pejeta Conservancy. Yoga, sound healing, wildlife, and sisterhood on the African savanna. 2027. Limited spots.",
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
    "Into the Wild retreat Kenya",
    "ASHA Experiences Kenya",
  ],
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

export default function KenyaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
