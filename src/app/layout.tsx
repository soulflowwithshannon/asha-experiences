import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans, Fraunces } from "next/font/google";
import Script from "next/script";
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
    default: "ASHA Experiences — Transformational Retreats for Women in Morocco, Mexico & Kenya",
    template: "%s | ASHA Experiences",
  },
  description: "You've been holding it together for so long. ASHA Experiences creates transformational international retreats for women — yoga, sound healing, ceremony, and sisterhood in Morocco, Mexico, and Kenya.",
  keywords: [
    // core retreat searches
    "women's retreat",
    "international retreat for women",
    "transformational travel for women",
    "women's wellness retreat",
    "spiritual retreat for women",
    "luxury retreat for women",
    "women's group retreat",
    "women's travel retreat",
    "women's retreat 2026",
    "women's retreat 2027",
    // healing + inner work
    "women's healing retreat",
    "self-love retreat for women",
    "self-discovery retreat women",
    "women's inner healing retreat",
    "emotional healing retreat women",
    "retreat for women who need a reset",
    "retreat for burnt out women",
    "retreat for overwhelmed women",
    "women finding themselves again",
    "retreat to reconnect with yourself",
    "women's mental wellness retreat",
    // practices
    "women's yoga retreat",
    "sound healing retreat",
    "sound bath retreat women",
    "meditation retreat for women",
    "visualization retreat women",
    "somatic retreat women",
    "women's ceremony retreat",
    "reiki retreat women",
    "breathwork retreat women",
    "yoga and healing retreat",
    "yoga sound healing retreat",
    // community + sisterhood
    "women's sisterhood retreat",
    "women's community retreat",
    "women's connection retreat",
    "women's circle retreat",
    "retreat to find your community",
    "women supporting women retreat",
    "group retreat for women",
    "women's friendship retreat",
    // destinations
    "Morocco retreat for women",
    "Mexico retreat for women",
    "Kenya retreat for women",
    "safari retreat women",
    "jungle retreat women",
    "desert retreat women",
    // brand
    "ASHA Experiences",
    "transformational retreat 2026",
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

        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NJZM4JDKZP"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NJZM4JDKZP');
          `}
        </Script>
      </body>
    </html>
  );
}
