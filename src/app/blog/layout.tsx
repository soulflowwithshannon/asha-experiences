import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal — Women's Retreats, Healing & Intentional Travel | ASHA Experiences",
  description: "Honest writing about women's retreats, healing practices, solo travel, and what it means to choose yourself. From the team behind ASHA Experiences.",
  keywords: [
    "women's retreat blog",
    "women's healing blog",
    "intentional travel for women",
    "women's wellness blog",
    "sound healing explained",
    "what to expect at a women's retreat",
    "is Mexico safe for solo women",
    "signs you need a retreat",
    "women's retreat vs vacation",
    "retreat for burnt out women",
    "ASHA Experiences journal",
  ],
  openGraph: {
    title: "Journal | ASHA Experiences",
    description: "Writing about retreats, healing, and what it actually feels like to choose yourself.",
    url: "https://ashaexperiences.com/blog",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
