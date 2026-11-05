import { Noto_Serif_JP } from "next/font/google";

import "./museum.css";

const notoSerifJP = Noto_Serif_JP({
  variable: "--font-museum",
  subsets: ["latin"],
  weight: ["500", "700"],
  display: "swap",
});

export default function JapaneseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`museum ${notoSerifJP.variable}`}>{children}</div>;
}
