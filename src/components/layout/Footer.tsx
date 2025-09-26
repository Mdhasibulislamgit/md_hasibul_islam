
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getAboutData } from '@/actions/aboutActions'; // Fetch social links from aboutData

export async function Footer() {
  const currentYear = new Date().getFullYear();
  const aboutData = await getAboutData();
  const socialLinks = aboutData?.socialLinks || [];

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {aboutData?.fullName || "Portfolio"}. All rights reserved.
          </p>
          {socialLinks.length > 0 && (
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => {
                const IconComponent = (link.iconName && LucideIcons[link.iconName as keyof typeof LucideIcons])
                  ? (LucideIcons[link.iconName as keyof typeof LucideIcons] as LucideIcon)
                  : LucideIcons.Link2;
                return (
                  <Link
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${aboutData?.fullName || 'Portfolio'} on ${link.platform}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <IconComponent className="h-5 w-5" />
                  </Link>
                );
              })}
               <Link
                  href={`mailto:${aboutData?.contactEmail || 'contact@example.com'}`}
                  aria-label={`Email ${aboutData?.fullName || 'Portfolio'}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <LucideIcons.Mail className="h-5 w-5" />
                </Link>
            </div>
          )}
        </div>

      </div>
    </footer>
  );
}
