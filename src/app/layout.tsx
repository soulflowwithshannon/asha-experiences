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
  title: {
    default: "ASHA Experiences — International Retreats for Women",
    template: "%s | ASHA Experiences",
  },
  description: "ASHA Experiences creates transformational international retreats for women — in Morocco, Mexico, and Kenya. Yoga, sound healing, ceremony, and sisterhood. Come back to yourself.",
  keywords: [
    "women's retreat",
    "international retreat for women",
    "transformational travel for women",
    "women's wellness retreat",
    "spiritual retreat for women",
    "Morocco retreat for women",
    "Mexico retreat for women",
    "Kenya retreat for women",
    "safari retreat women",
    "jungle retreat women",
    "desert retreat women",
    "women's yoga retreat",
    "sound healing retreat",
    "women's ceremony retreat",
    "somatic retreat women",
    "women's healing retreat",
    "luxury retreat for women",
    "women's group retreat",
    "transformational retreat 2026",
    "ASHA Experiences",
    "women's retreat 2026",
    "women's retreat 2027",
    "retreat for burnt out women",
    "women's travel retreat",
  ],
  authors: [{ name: "ASHA Experiences" }],
  creator: "ASHA Experiences",
  metadataBase: new URL("https://ashaexperiences.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ashaexperiences.com",
    siteName: "ASHA Experiences",
    title: "ASHA Experiences — International Retreats for Women",
    description: "ASHA Experiences creates transformational international retreats for women — in Morocco, Mexico, and Kenya. Come back to yourself.",
    images: [{ url: "/images/Return to Love group sunset.jpg", width: 1200, height: 630, alt: "ASHA Experiences — Women's Retreat" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "ASHA Experiences — International Retreats for Women",
    description: "ASHA Experiences creates transformational international retreats for women — in Morocco, Mexico, and Kenya. Come back to yourself.",
    images: ["/images/Return to Love group sunset.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
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
