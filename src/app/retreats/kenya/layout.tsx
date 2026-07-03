import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Into the Wild - Kenya 2027",
};

export default function KenyaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
