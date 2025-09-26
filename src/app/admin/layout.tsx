"use client";

import * as React from 'react';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import { AdminSidebarNavContent } from '@/components/admin/AdminSidebarNavContent';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileSheetOpen, setIsMobileSheetOpen] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check if we're on login page
    if (pathname === '/admin/login') {
      // Don't do anything on login page
      return;
    }
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      await router.replace('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Special render for login page
  if (pathname === '/admin/login') {
    return (
      <div className="min-h-screen bg-background">
        {children}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="md:hidden mr-2">
              <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open admin menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col p-0 w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
                  <SheetHeader className="p-4 border-b border-sidebar-border">
                    <SheetTitle className="text-lg font-semibold text-sidebar-foreground">Admin Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto">
                    <AdminSidebarNavContent onLinkClick={() => setIsMobileSheetOpen(false)} />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            <h1 className="text-xl font-semibold text-primary">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1 pt-16">
        <div className="hidden md:block">
          <AdminSidebar />
        </div>
        <main className="flex-1 p-4 md:ml-64 bg-muted/40">
          <div className="container mx-auto py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
