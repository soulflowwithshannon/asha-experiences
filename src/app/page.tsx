import type { Metadata } from "next";
import HomePage from "@/components/HomePage";

// The page itself is a client component (src/components/HomePage.tsx), so the
// home page's metadata lives here.
export const metadata: Metadata = {
  title: { absolute: "ASHA Experiences — Small-Group Retreats for Women in Kenya & Morocco" },
  description:
    "seven-day retreats for women in Kenya and Morocco. ten women, two hosts on the ground all week, most women come solo.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomePage />;
}
