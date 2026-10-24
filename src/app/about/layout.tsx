import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — Meet Ashley & Shannon",
  description: "The women behind ASHA Experiences. Ashley and Shannon create transformational international retreats for women in Morocco, Mexico, and Kenya.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About ASHA Experiences — Meet Ashley & Shannon",
    description: "The women behind ASHA Experiences, creating transformational international retreats for women.",
    url: "https://ashaexperiences.com/about",
    images: [{ url: "/images/shannonandashley.jpg", width: 1200, height: 800, alt: "Ashley and Shannon, founders of ASHA Experiences" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About ASHA Experiences — Meet Ashley & Shannon",
    description: "The women behind ASHA Experiences, creating transformational international retreats for women.",
    images: ["/images/shannonandashley.jpg"],
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
