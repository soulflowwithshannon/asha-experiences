import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casa Amor, Spain 2027 — Join the List",
  description: "Casa Amor is a women's retreat in Andalusia, Spain, coming June 2027. Leave your name and email and you'll hear first when it opens.",
  alternates: { canonical: "/retreats/spain-waitlist" },
  // a form, not a page worth ranking: keep it out of search until the retreat page launches
  robots: { index: false, follow: true },
};

export default function SpainWaitlistLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
