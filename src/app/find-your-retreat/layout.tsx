import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Retreat — Which Women's Retreat Is Right for You?",
  description: "A short, feeling-based quiz to help you find the women's retreat that matches where you actually are right now — Mexico, Morocco, or Kenya.",
  keywords: [
    "which women's retreat is right for me",
    "women's retreat quiz",
    "find your retreat",
    "women's retreat Mexico Morocco Kenya",
    "how to choose a women's retreat",
  ],
  alternates: {
    canonical: "/find-your-retreat",
  },
  openGraph: {
    title: "Find Your Retreat | ASHA Experiences",
    description: "Five questions to find the retreat that matches where you actually are right now.",
    url: "https://ashaexperiences.com/find-your-retreat",
    images: [{ url: "/images/Return to Love group sunset.jpg", width: 1200, height: 630, alt: "Find your retreat — ASHA Experiences" }],
  },
};

export default function FindYourRetreatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
