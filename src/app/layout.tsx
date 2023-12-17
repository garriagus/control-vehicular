import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { Toaster } from "react-hot-toast";
//import { ThemeProvider } from "@/app/components/theme-provider";
import { Space_Grotesk } from "next/font/google";
import siteMetadata from "@/data/siteMetadata";

import { Suspense } from "react";

import { NextAuthProvider } from "@/components/Providers";
const space_grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: "./",
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "./",
    types: {
      "application/rss+xml": `${siteMetadata.siteUrl}/feed.xml`,
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: "summary_large_image",
    images: [siteMetadata.socialBanner],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className={`bg-white text-black antialiased dark:bg-gray-950 dark:text-white ${inter.className}`}
      >
        <NextAuthProvider>
          <Toaster />
          <Suspense fallback="Loading...">
            <Navbar />
            <div className="mx-auto max-w-4xl px-4 sm:px-6 xl:max-w-5xl xl:px-0 ">
              <main>{children}</main>
              <Footer />
            </div>
          </Suspense>
        </NextAuthProvider>
      </body>
    </html>
  );
}
