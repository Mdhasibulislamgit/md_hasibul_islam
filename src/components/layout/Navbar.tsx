
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isMounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xl font-bold text-primary">
            <Brain className="h-7 w-7" />
            <span>MH Islam</span>
          </div>
          <div className="h-8 w-8 bg-muted rounded-md animate-pulse md:hidden"></div>
          <div className="h-8 w-8 bg-muted rounded-full animate-pulse hidden md:block"></div>
        </div>
      </header>
    );
  }

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300 border-b",
        scrolled 
          ? "bg-background/80 backdrop-blur-md shadow-md border-border/50" 
          : "bg-transparent border-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link 
          href="/" 
          className="group flex items-center gap-2 text-xl font-bold text-primary transition-all duration-300 hover:opacity-80"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <span className="tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">MH Islam</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                    isActive
                      ? "text-primary-foreground bg-primary shadow-sm shadow-primary/20"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          
          <div className="hidden md:block w-px h-6 bg-border mx-2"></div>
          
          <div className="flex items-center gap-2">
           <ThemeToggle />
           
            <div className="md:hidden">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:bg-primary/10">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[540px] border-l border-border/50 backdrop-blur-xl bg-background/95">
                  <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between py-4 border-b border-border/50 mb-6">
                      <Link href="/" className="flex items-center gap-2" onClick={closeSheet}>
                         <div className="p-2 bg-primary/10 rounded-lg">
                           <Brain className="h-6 w-6 text-primary" />
                         </div>
                        <span className="font-bold text-xl">Menu</span>
                      </Link>
                      <Button variant="ghost" size="icon" onClick={closeSheet} className="hover:text-destructive">
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                    <nav className="flex-grow space-y-2">
                      {navItems.map((item) => {
                         const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={closeSheet}
                            className={cn(
                              "flex items-center gap-4 px-4 py-3 rounded-xl text-base transition-all duration-200",
                              isActive
                                ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" 
                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            )}
                          >
                            <item.icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-muted-foreground")} />
                            <span className="font-medium">{item.label}</span>
                            {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                          </Link>
                        );
                      })}
                    </nav>
                    <div className="mt-auto pt-6 border-t border-border/50">
                      <Button className="w-full rounded-xl h-11 text-base font-semibold shadow-lg shadow-primary/20" asChild onClick={closeSheet}>
                        <Link href="/contact">Get in Touch</Link>
                      </Button>
                      <p className="text-center text-xs text-muted-foreground mt-4">
                        © {new Date().getFullYear()} MH Islam
                      </p>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
