import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Retreats — Built Around Your People",
  description:
    "A retreat built around your group, for one, or a group of up to 25. Your circle, your friends, or your team — designed and hosted by Ashley and Shannon.",
  keywords: [
    "custom women's retreat",
    "private retreat for women",
    "bespoke retreat planning",
    "corporate women's retreat",
    "company offsite retreat",
    "team retreat for women",
    "private group retreat abroad",
    "plan a retreat for my group",
    "retreat planner for small groups",
    "custom wellness retreat",
  ],
  alternates: {
    canonical: "/retreats/custom",
  },
  openGraph: {
    title: "Custom Retreats — ASHA Experiences",
    description:
      "A retreat built around your group, for one, or a group of up to 25. Designed and hosted by Ashley and Shannon.",
    url: "https://ashaexperiences.com/retreats/custom",
    images: [{ url: "/images/ReturnToLove circle.jpg", width: 1200, height: 800, alt: "A custom ASHA retreat circle" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Retreats — ASHA Experiences",
    description: "A retreat built around your group, for one, or a group of up to 25.",
    images: ["/images/ReturnToLove circle.jpg"],
  },
};

export default function CustomRetreatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
