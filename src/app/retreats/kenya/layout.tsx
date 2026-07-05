import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Into the Wild — Kenya 2027",
  description: "A 7-day women's luxury safari retreat at Ol Pejeta Conservancy, Kenya. 2027. Golden savannas, wild land, and women who are done pretending.",
  keywords: ["Kenya women's retreat", "safari retreat for women", "Ol Pejeta retreat", "Into the Wild retreat 2027", "Kenya safari retreat", "women's luxury safari", "transformational travel Kenya"],
  openGraph: {
    title: "Into the Wild — Kenya Retreat 2027 | ASHA Experiences",
    description: "A 7-day women's luxury safari retreat at Ol Pejeta Conservancy, Kenya. 2027. Golden savannas, wild land, and women who are done pretending.",
    url: "https://ashaexperiences.com/retreats/kenya",
    images: [{ url: "/images/Kenya hero.jpeg", width: 1200, height: 800, alt: "Into the Wild — Kenya Retreat 2027" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Into the Wild — Kenya Retreat 2027 | ASHA Experiences",
    description: "A 7-day women's luxury safari retreat at Ol Pejeta Conservancy, Kenya. 2027.",
    images: ["/images/Kenya hero.jpeg"],
  },
};

export default function KenyaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
