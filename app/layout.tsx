import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Height Veda is a Body Growth Supplement - Height Veda",
  description:
    "Height Veda is an Ayurvedic Body Growth Supplement. Elevate naturally, boost confidence, drive your potential. 100% Ayurvedic, Ayush certified with pure herbs.",
  keywords: [
    "Height Veda",
    "Ayurvedic height supplement",
    "Body growth supplement",
    "Ashwagandha",
    "Natural height growth",
  ],
  authors: [{ name: "Height Veda" }],
  openGraph: {
    title: "Height Veda is a Body Growth Supplement - Height Veda",
    description:
      "Natural Height Growth & Wellness Suite. 100% Ayurvedic · Clinically Tested.",
    url: "https://heightveda.com",
    siteName: "Height Veda",
    images: [
      {
        url: "https://heightveda.com/wp-content/uploads/2026/09/logo.gif",
        width: 600,
        height: 200,
        alt: "Height Veda Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "https://heightveda.com/wp-content/uploads/2026/09/cropped-Powder-HV-1024x1024-1-1-32x32.webp",
    apple: "https://heightveda.com/wp-content/uploads/2026/09/cropped-Powder-HV-1024x1024-1-1-180x180.webp",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#fdfbf7] text-[#111827] antialiased">
        {children}
      </body>
    </html>
  );
}
