import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "ASHA Experiences — International Retreats for Women",
  description: "International retreats for the women who've been waiting their whole life for this trip.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable} ${fraunces.variable}`}>
      <body className="min-h-full flex flex-col">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
