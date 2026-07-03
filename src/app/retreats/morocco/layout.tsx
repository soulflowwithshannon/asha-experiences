import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sacred Sands - Morocco 2026",
};

export default function MoroccoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
