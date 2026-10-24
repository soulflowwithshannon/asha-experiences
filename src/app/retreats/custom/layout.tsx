import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Retreats — Built Around Your People",
  description:
    "A retreat built around your group, for one, or a group of up to 25. Your circle, your friends, or your team — designed and hosted by Ashley and Shannon.",
  alternates: {
    canonical: "/retreats/custom",
  },
  openGraph: {
    title: "Custom Retreats — ASHA Experiences",
    description:
      "A retreat built around your group, for one, or a group of up to 25. Designed and hosted by Ashley and Shannon.",
    url: "https://ashaexperiences.com/retreats/custom",
  },
};

export default function CustomRetreatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
