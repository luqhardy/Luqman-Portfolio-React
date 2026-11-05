import type { Metadata } from "next";

import { JapaneseMuseum } from "@/components/japanese/museum";

const description =
  "マレーシア出身のルクマン・ハディが、五年間の日本語学習を公開する個人博物館。スピーチの変化、試験、Anki、年表。";

export const metadata: Metadata = {
  title: "日本語博物館",
  description,
  alternates: { canonical: "https://jp.luqmanhadi.com" },
  openGraph: {
    title: "日本語博物館 — Luqman Hadi",
    description,
    url: "https://jp.luqmanhadi.com",
  },
};

export default function JapanesePage() {
  return <JapaneseMuseum />;
}
