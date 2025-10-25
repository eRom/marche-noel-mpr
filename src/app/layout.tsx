import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
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
  title: "Marché de Noël du MPR - Nantes 2024",
  description: "Découvrez la magie de Noël au cœur de Nantes ! Marché traditionnel du MPR du 15 au 24 décembre 2024. Artisans locaux, produits authentiques, animations festives et ambiance chaleureuse vous attendent.",
  manifest: "/manifest.json",
  keywords: ["marché de noël", "nantes", "mpr", "artisans", "décembre 2024", "événement", "tradition", "cadeaux", "produits locaux"],
  authors: [{ name: "Romain Ecarnot" }],
  openGraph: {
    title: "Marché de Noël du MPR - Nantes 2024",
    description: "Découvrez la magie de Noël au cœur de Nantes ! Marché traditionnel du MPR du 15 au 24 décembre 2024. Artisans locaux, produits authentiques, animations festives et ambiance chaleureuse vous attendent.",
    type: "website",
    locale: "fr_FR",
    siteName: "Marché de Noël du MPR",
    images: [
      {
        url: "/og.webp",
        width: 1280,
        height: 800,
        alt: "Marché de Noël du MPR de Nantes - 15 au 24 décembre 2024",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marché de Noël du MPR - Nantes 2024",
    description: "Découvrez la magie de Noël au cœur de Nantes ! Marché traditionnel du MPR du 15 au 24 décembre 2024. Artisans locaux, produits authentiques, animations festives et ambiance chaleureuse vous attendent.",
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
  maximumScale: 5,
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
