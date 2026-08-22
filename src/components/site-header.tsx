"use client";

import { House } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/components/language-provider";
import { profile } from "@/lib/content";

export function SiteHeader() {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 flex h-14 shrink-0 items-center gap-2 border-b bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      <a href="#top" className="flex items-center gap-2 overflow-hidden">
        <House className="size-4 shrink-0 text-muted-foreground" />
        <span className="truncate text-sm font-semibold">{t(profile.name)}</span>
        <span className="hidden truncate text-sm text-muted-foreground sm:inline">
          {profile.kana}
        </span>
      </a>
      <div className="ml-auto flex items-center gap-1">
        <LanguageToggle />
        <Separator orientation="vertical" className="mx-1 h-4" />
        <ThemeToggle />
      </div>
    </header>
  );
}
