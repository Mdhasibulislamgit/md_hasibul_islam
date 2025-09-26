
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      <Navbar />
      <main className="flex-grow bg-background">
        {children}
      </main>
      <Footer />
    </div>
  );
}
