"use client";

import { useSelectedLayoutSegment } from "next/navigation";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

export function SiteShell({ children }: { children: React.ReactNode }) {
  // Reads the matched route, so it stays correct behind the jp. host rewrite,
  // where usePathname() would report "/".
  const segment = useSelectedLayoutSegment();
  if (segment === "japanese") return <>{children}</>;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
