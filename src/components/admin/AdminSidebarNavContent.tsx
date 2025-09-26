
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Briefcase,
  Lightbulb,
  FileText,
  Settings,
  Users,
  Mail,
  LogOut,
  FileUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeToggle } from '@/components/ThemeToggle';

const adminNavItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/skills', label: 'Skills', icon: Lightbulb },
  { href: '/admin/experience', label: 'Experience', icon: FileText },
  { href: '/admin/about', label: 'About Me', icon: Users },
  { href: '/admin/cv-management',label: 'CV Management', icon: FileUp },
  { href: '/admin/contact-settings', label: 'Contact & Socials', icon: Settings },
  { href: '/admin/messages', label: 'Messages', icon: Mail },
];

interface AdminSidebarNavContentProps {
  onLinkClick?: () => void;
}

export function AdminSidebarNavContent({ onLinkClick }: AdminSidebarNavContentProps) {
  const pathname = usePathname();

  const handleNavigation = () => {
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <ScrollArea className="h-full"> {/* Takes full height of its container */}
      <div className="flex flex-col h-full py-4"> {/* Inner div for flex layout and padding */}
        <nav className="space-y-2 px-3">
          {adminNavItems.map((item) => (
            <Button
              key={item.label}
              variant={pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin/dashboard' && item.href !== '/admin') ? 'secondary' : 'ghost'}
              className={cn(
                "w-full justify-start",
                (pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin/dashboard' && item.href !== '/admin'))
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )}
              asChild
              onClick={handleNavigation}
            >
              <Link href={item.href} className="flex items-center p-2 rounded-lg">
                <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="flex-1 whitespace-nowrap">{item.label}</span>
              </Link>
            </Button>
          ))}
        </nav>
        <div className="mt-auto px-3 pt-4"> {/* mt-auto pushes this to the bottom of the flex container */}
          <div className="flex flex-col space-y-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              className="w-full justify-start hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              asChild
              onClick={handleNavigation}
            >
              <Link href="/" className="flex items-center p-2 rounded-lg">
                <LogOut className="h-5 w-5 mr-3 flex-shrink-0" />
                <span className="flex-1 whitespace-nowrap">Back to Site</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
