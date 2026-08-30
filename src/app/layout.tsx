import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://am.subhm.in"),
  title: "Subhankar Mondal",
  description: "Hi I am Subhankar! Founder & CEO at Nodezed.",
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Subhankar Mondal",
    description: "Hi I am Subhankar! Founder & CEO at Nodezed.",
    url: "https://am.subhm.in",
    siteName: "Subhankar Mondal",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Subhankar Mondal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Subhankar Mondal",
    description: "Hi I am Subhankar! Founder & CEO at Nodezed.",
    creator: "@amsubhm",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background text-foreground antialiased relative`}>
        <ThemeProvider defaultTheme="system" storageKey="subhm-theme">
          
          {/* Framed Container: Desktop (1280px with side strips) | Tablet (90% width) | Mobile (100% width) */}
          <div className="relative min-h-screen w-full max-w-[1280px] mx-auto flex justify-center items-stretch">
            
            {/* 1. Left 160px Diagonal Lines Strip (Desktop Only) */}
            <div 
              className="hidden xl:block w-[160px] shrink-0 border-l border-r border-border bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,hsl(var(--border)/0.55)_6px,hsl(var(--border)/0.55)_7px)] select-none"
              aria-hidden="true"
            />

            {/* 2. Left 80px White Gutter (Desktop Only) */}
            <div className="hidden xl:block w-[80px] shrink-0 bg-background border-r border-border" />

            {/* 3. Center Main Content Column: Mobile (100% w-full), Tablet (90% w-[90%]), Desktop (800px) */}
            <div className="w-full sm:w-[90%] xl:w-[800px] shrink-0 max-w-[800px] bg-background min-h-screen border-x-0 sm:border-x xl:border-x-0 border-border">
              <Navbar />
              <main className="w-full">
                {children}
              </main>
            </div>

            {/* 4. Right 80px White Gutter (Desktop Only) */}
            <div className="hidden xl:block w-[80px] shrink-0 bg-background border-l border-border" />

            {/* 5. Right 160px Diagonal Lines Strip (Desktop Only) */}
            <div 
              className="hidden xl:block w-[160px] shrink-0 border-l border-r border-border bg-[repeating-linear-gradient(-45deg,transparent,transparent_6px,hsl(var(--border)/0.55)_6px,hsl(var(--border)/0.55)_7px)] select-none"
              aria-hidden="true"
            />

          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
