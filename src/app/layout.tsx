import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import SnowfallEffect from "@/components/SnowfallEffect";
import ChristmasLights from "@/components/ChristmasLights";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'optional',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false, // Only preload the primary font
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mpr-noel.romain-ecarnot.com'),
  title: "Marché de Noël du MPR - Nantes 2025",
  description: "Découvrez la magie de Noël au cœur de Nantes ! Marché traditionnel au sein du pôle de Médecine Physique et de Réadaptation du CHU de Nantes. Produits authentiques, animations festives et ambiance chaleureuse vous attendent.",
  manifest: "/manifest.json",
  keywords: ["marché de noël", "nantes", "mpr", "artisans", "décembre 2025", "événement", "tradition", "cadeaux", "produits locaux", "médecine physique", "réadaptation"],
  authors: [{ name: "Romain Ecarnot" }],
  openGraph: {
    title: "Marché de Noël du MPR - Nantes 2025",
    description: "Découvrez la magie de Noël au cœur de Nantes ! Marché traditionnel au sein du pôle de Médecine Physique et de Réadaptation du CHU de Nantes. Produits authentiques, animations festives et ambiance chaleureuse vous attendent.",
    type: "website",
    locale: "fr_FR",
    siteName: "Marché de Noël du MPR",
    images: [
      {
        url: "/og.webp",
        width: 1280,
        height: 800,
        alt: "Marché de Noël au sein du pôle de Médecine Physique et de Réadaptation du CHU de Nantes - 27 novembre au 11, 13 et 16 décembre 2025",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marché de Noël du MPR - Nantes 2025",
    description: "Découvrez la magie de Noël au cœur de Nantes ! Marché traditionnel au sein du pôle de Médecine Physique et de Réadaptation du CHU de Nantes. Produits authentiques, animations festives et ambiance chaleureuse vous attendent.",
    images: ["/og.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon.png", sizes: "64x64", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Marché de Noël du MPR",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  userScalable: true,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Preload hero images for better LCP */}
        <link
          rel="preload"
          as="image"
          href="/hero-placeholder-sm.webp"
          type="image/webp"
          media="(max-width: 640px)"
          // @ts-ignore - fetchPriority is valid but TypeScript doesn't recognize it yet
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/hero-placeholder-md.webp"
          type="image/webp"
          media="(min-width: 641px) and (max-width: 768px)"
          // @ts-ignore - fetchPriority is valid but TypeScript doesn't recognize it yet
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/hero-placeholder.webp"
          type="image/webp"
          media="(min-width: 769px)"
          // @ts-ignore - fetchPriority is valid but TypeScript doesn't recognize it yet
          fetchPriority="high"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ServiceWorkerRegistration />
        <SmoothScroll />
        <ChristmasLights />
        <SnowfallEffect />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
