import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Questions About a Retreat",
  description: "Questions about a retreat, or want to know if this is the right time for you? Get in touch with Ashley and Shannon at ASHA Experiences.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact ASHA Experiences",
    description: "Questions about a retreat, or want to know if this is the right time for you? Get in touch.",
    url: "https://ashaexperiences.com/contact",
    images: [{ url: "/images/Ashley and Shannon contact.jpg", width: 1200, height: 800, alt: "Ashley and Shannon of ASHA Experiences" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact ASHA Experiences",
    description: "Questions about a retreat, or want to know if this is the right time for you? Get in touch.",
    images: ["/images/Ashley and Shannon contact.jpg"],
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
