import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/components/ThemeProvider';

export const viewport: Viewport = {
  themeColor: '#8e44ad',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Md Hasibul Islam',
  description: 'Engineer | Programmer |Web App Developer ',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/icons/touch-icon-iphone.png' },
      { url: 'https://placehold.co/152x152.png', sizes: '152x152' },
      { url: 'https://placehold.co/180x180.png', sizes: '180x180' },
      { url: 'https://placehold.co/167x167.png', sizes: '167x167' },
    ],
  },
  applicationName: 'Profolio',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Profolio',
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'msapplication-config': '/icons/browserconfig.xml',
    'msapplication-TileColor': '#8e44ad',
    'msapplication-tap-highlight': 'no',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
