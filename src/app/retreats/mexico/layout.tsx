import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Becoming HER - Mexico 2026",
};

export default function MexicoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
