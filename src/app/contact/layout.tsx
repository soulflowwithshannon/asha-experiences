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
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
