import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_JP } from "next/font/google";
import clsx from "clsx";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Luqman Hadi ルクマン　ハディ",
  description: "Japanese Government (MEXT) Scholar, Kobe Institute of Computing - AI Systems Development, 1st Year",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={clsx(notoSansJP.variable, geistSans.variable, geistMono.variable, "font-sans")}> 
      <body className="antialiased" cz-shortcut-listen="true">
        {children}
      </body>
    </html>
  );
}