import type { Metadata } from "next";

import { JapaneseMuseum } from "@/components/japanese/museum";

const description =
  "マレーシア出身のルクマン・ハディが、五年間の日本語学習を公開する個人博物館。スピーチの変化、試験、Anki、年表。";

export const metadata: Metadata = {
  title: "日本語博物館",
  description,
  alternates: { canonical: "/japanese" },
  openGraph: {
    title: "日本語博物館 — Luqman Hadi",
    description,
    url: "/japanese",
  },
};

export default function JapanesePage() {
  return <JapaneseMuseum />;
}
