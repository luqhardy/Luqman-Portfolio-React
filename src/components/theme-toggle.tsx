"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage } from "@/components/language-provider";
import { ui } from "@/lib/content";

const OPTIONS = [
  { value: "light", icon: Sun, label: { en: "Light", ja: "ライト" } },
  { value: "dark", icon: Moon, label: { en: "Dark", ja: "ダーク" } },
  { value: "system", icon: Monitor, label: { en: "System", ja: "システム" } },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon-sm" aria-label={t(ui.toggleTheme)}>
          {/* Both icons render until mounted so the server and client agree. */}
          <Sun className="size-4 dark:hidden" />
          <Moon className="hidden size-4 dark:block" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-36">
        {OPTIONS.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onSelect={() => setTheme(option.value)}
            className="text-xs"
            data-active={mounted && theme === option.value ? "" : undefined}
          >
            <option.icon className="size-3.5" />
            {t(option.label)}
            {mounted && theme === option.value ? (
              <span className="ml-auto text-primary">•</span>
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
