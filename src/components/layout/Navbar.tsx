
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Briefcase, Code, Home, Mail, User, Lightbulb, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ThemeToggle } from '@/components/ThemeToggle'; // Updated import
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about', label: 'About', icon: User },
  { href: '/skills', label: 'Skills', icon: Lightbulb },
  { href: '/experience', label: 'Experience', icon: Briefcase },
  { href: '/contact', label: 'Contact', icon: Mail },
];


export function Navbar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Return a basic skeleton or null to prevent hydration mismatch issues with theme toggle and pathname
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xl font-bold text-primary">
            <Brain className="h-7 w-7" />
            <span>MH</span>
          </div>
          <div className="h-8 w-8 bg-muted rounded-md animate-pulse md:hidden"></div> {/* Placeholder for mobile menu trigger */}
          <div className="h-8 w-8 bg-muted rounded-full animate-pulse hidden md:block"></div> {/* Placeholder for theme toggle */}
        </div>
      </header>
    );
  }

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card shadow-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <Brain className="h-7 w-7" />
          <span>MH</span>
        </Link>
        
        <div className="flex items-center">
          <nav className="hidden md:flex gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm transition-colors",
                    isActive
                      ? "font-semibold text-primary"
                      : "font-medium text-card-foreground hover:text-primary"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <ThemeToggle />

          <div className="md:hidden ml-2">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full max-w-xs bg-background"> {/* Sheet uses bg-background */}
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between p-4 border-b">
                    <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary" onClick={closeSheet}>
                       <Brain className="h-7 w-7" />
                      <span>Profolio</span>
                    </Link>
                    <Button variant="ghost" size="icon" onClick={closeSheet}>
                      <X className="h-6 w-6" />
                      <span className="sr-only">Close menu</span>
                    </Button>
                  </div>
                  <nav className="flex-grow p-4 space-y-1"> {/* Reduced space-y for tighter mobile links */}
                    {navItems.map((item) => {
                       const isActive = pathname === item.href;
                      return (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={closeSheet}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2 rounded-md text-base transition-colors", // Adjusted padding
                            isActive
                              ? "font-semibold text-primary bg-primary/10" // Mobile active links get a subtle bg
                              : "font-medium text-foreground hover:text-primary hover:bg-accent/50"
                          )}
                        >
                          <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary")} />
                          {item.label}
                        </Link>
                      );
                    })}
                  </nav>
                  <div className="p-4 border-t">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild onClick={closeSheet}>
                      <Link href="/contact">Get in Touch</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
