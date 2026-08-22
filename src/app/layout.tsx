import type { Metadata, Viewport } from "next";
import { Geist_Mono, Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { LanguageProvider } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://luqmanhadi.com"),
  title: {
    default: "Luqman Hadi ルクマン・ハディ",
    template: "%s — Luqman Hadi",
  },
  description:
    "Japanese Government (MEXT) Scholar, Kobe Institute of Computing — AI Systems Development. Small, specific tools for the web.",
  openGraph: {
    title: "Luqman Hadi ルクマン・ハディ",
    description:
      "Small, specific tools for the web, made in Kōbe, Japan.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f7" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0b" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      suppressHydrationWarning
      className={`${geistMono.variable} ${notoSansJP.variable}`}
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider defaultLang="ja">
            <TooltipProvider delayDuration={200}>
              <SiteShell>{children}</SiteShell>
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
