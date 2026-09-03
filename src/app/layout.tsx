import type { Metadata, Viewport } from "next";
import { Geist_Mono, Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import { LanguageProvider } from "@/components/language-provider";
import { SiteShell } from "@/components/site-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { elsewhere, nameVariants, profile } from "@/lib/content";
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

const SITE_URL = "https://luqmanhadi.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Leads with the full name rather than "Luqman Hadi" on its own, which
  // collides with several unrelated people in search results.
  title: {
    default: "Luqman Hadi Suhairi ルクマン・ハディ — AI Systems & Cloud, Kōbe",
    template: "%s — Luqman Hadi Suhairi",
  },
  description:
    "Mohamed Luqman Hadi Bin Mohamed Suhairi (モハメド・ルクマン・ハディ・ビン・モハメド・スハイリ) — Japanese Government (MEXT) Scholar, Kobe Institute of Computing, AI Systems Development.",
  // The apex redirects to www, so name one of them as canonical rather than
  // letting search engines split ranking between the two.
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Luqman Hadi Suhairi ルクマン・ハディ",
    description:
      "Mohamed Luqman Hadi Bin Mohamed Suhairi — small, specific tools for the web, made in Kōbe, Japan.",
    type: "profile",
    url: SITE_URL,
    locale: "ja_JP",
    alternateLocale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Luqman Hadi Suhairi ルクマン・ハディ",
    description:
      "Mohamed Luqman Hadi Bin Mohamed Suhairi — AI Systems Development student in Kōbe, heading toward cloud and infrastructure engineering.",
  },
  authors: [{ name: profile.legalName, url: SITE_URL }],
  creator: profile.legalName,
  publisher: profile.legalName,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

/**
 * Person schema. The point of alternateName here is that this person is
 * referred to by several quite different strings across the web — an official
 * Malaysian full name, a shortened English one, and two katakana renderings —
 * and this is what tells a search engine they are one entity.
 */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: profile.legalName,
  alternateName: nameVariants,
  givenName: "Luqman Hadi",
  familyName: "Mohamed Suhairi",
  disambiguatingDescription:
    "Malaysian software engineer based in Kōbe, Japan. Japanese Government (MEXT) scholar studying AI Systems Development at Kobe Institute of Computing, AWS and Azure certified, trilingual in Japanese, English and Malay.",
  description:
    "AI Systems Development student in Kōbe, Japan, working toward cloud and infrastructure engineering.",
  birthPlace: { "@type": "Country", name: "Malaysia" },
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  nationality: { "@type": "Country", name: "Malaysia" },
  homeLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kobe",
      addressRegion: "Hyogo",
      addressCountry: "JP",
    },
  },
  knowsLanguage: [
    { "@type": "Language", name: "Japanese", alternateName: "ja" },
    { "@type": "Language", name: "English", alternateName: "en" },
    { "@type": "Language", name: "Malay", alternateName: "ms" },
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "神戸電子専門学校 / Kobe Institute of Computing" },
    { "@type": "CollegeOrUniversity", name: "関西大学 / Kansai University" },
    {
      "@type": "CollegeOrUniversity",
      name: "International Islamic University Malaysia (IIUM)",
    },
  ],
  jobTitle: "Student, AI Systems Development",
  hasCredential: [
    "AWS Certified Solutions Architect – Associate",
    "Microsoft Certified: Azure Developer Associate (AZ-204)",
    "基本情報技術者試験 (FE)",
    "日本語能力試験 N1 (JLPT N1)",
  ].map((name) => ({
    "@type": "EducationalOccupationalCredential",
    name,
  })),
  sameAs: elsewhere
    .filter((link) => !link.href.startsWith("mailto:"))
    .map((link) => link.href),
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: "Luqman Hadi ルクマン・ハディ",
  inLanguage: ["ja", "en"],
  mainEntity: { "@id": `${SITE_URL}/#person` },
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
        <script
          type="application/ld+json"
          // Static, self-authored JSON with no user input in it.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personSchema, profilePageSchema]),
          }}
        />
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
