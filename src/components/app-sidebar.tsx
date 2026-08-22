"use client";

import * as React from "react";
import {
  ArrowUpRight,
  AtSign,
  BadgeCheck,
  Blocks,
  Briefcase,
  FolderGit2,
  GraduationCap,
  Info,
  Sparkles,
  Trophy,
  Terminal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { useLanguage } from "@/components/language-provider";
import { useActiveSection } from "@/hooks/use-active-section";
import { allProjects, profile, ui } from "@/lib/content";

const SECTIONS = [
  { id: "about", icon: Info, label: ui.about },
  { id: "highlights", icon: Trophy, label: ui.highlights },
  { id: "work", icon: Sparkles, label: ui.featured },
  { id: "projects", icon: FolderGit2, label: ui.allProjects },
  { id: "experience", icon: Briefcase, label: ui.experience },
  { id: "education", icon: GraduationCap, label: ui.education },
  { id: "certifications", icon: BadgeCheck, label: ui.certifications },
  { id: "stack", icon: Blocks, label: ui.stack },
  { id: "elsewhere", icon: AtSign, label: ui.elsewhere },
] as const;

export const SECTION_IDS = SECTIONS.map((s) => s.id);

export function AppSidebar() {
  const { t } = useLanguage();
  const { isMobile, setOpenMobile } = useSidebar();
  const ids = React.useMemo(() => [...SECTION_IDS], []);
  const active = useActiveSection(ids);

  const close = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar collapsible="offcanvas" className="border-r">
      <SidebarHeader className="h-14 justify-center border-b px-4">
        <a
          href="#top"
          onClick={close}
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <Terminal className="size-4 text-primary" />
          <span>luqmanhadi.com</span>
        </a>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="eyebrow h-auto py-2 text-muted-foreground">
            {t({ en: "Sections", ja: "セクション" })}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SECTIONS.map((section) => (
                <SidebarMenuItem key={section.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={active === section.id}
                    size="sm"
                  >
                    <a href={`#${section.id}`} onClick={close}>
                      <section.icon />
                      <span>{t(section.label)}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="eyebrow h-auto py-2 text-muted-foreground">
            {t(ui.allProjects)}
            <span className="ml-auto tabular-nums">{allProjects.length}</span>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allProjects.map((project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton asChild size="sm">
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                      title={t(project.description)}
                    >
                      <project.icon />
                      <span className="truncate">{t(project.title)}</span>
                      <ArrowUpRight className="ml-auto size-3 opacity-0 transition-opacity group-hover/menu-item:opacity-60" />
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <p className="px-2 py-1 text-[0.7rem] leading-relaxed text-muted-foreground">
          © {new Date().getFullYear()} {t(profile.name)}
          <br />
          {profile.kana}
        </p>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
