
"use client";

import { AdminSidebarNavContent } from './AdminSidebarNavContent'; // Import the new component

interface AdminSidebarProps {
  onLinkClick?: () => void; // Propagated to AdminSidebarNavContent
}

export function AdminSidebar({ onLinkClick }: AdminSidebarProps) {
  return (
    // This <aside> is specifically for the fixed desktop sidebar
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border sm:translate-x-0 md:pt-16">
      <AdminSidebarNavContent onLinkClick={onLinkClick} />
    </aside>
  );
}
