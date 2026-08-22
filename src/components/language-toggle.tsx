"use client";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/language-provider";
import { ui } from "@/lib/content";

export function LanguageToggle() {
  const { lang, toggleLang, t } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLang}
      aria-label={t(ui.toggleLanguage)}
      className="gap-1.5 px-2 font-mono text-[0.7rem] tracking-[0.12em] uppercase"
    >
      <span className={lang === "ja" ? "text-foreground" : "text-muted-foreground"}>
        JA
      </span>
      <span aria-hidden="true" className="text-border">
        /
      </span>
      <span className={lang === "en" ? "text-foreground" : "text-muted-foreground"}>
        EN
      </span>
    </Button>
  );
}
