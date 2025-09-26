
import { WifiOff, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function OfflinePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <div className="mx-auto mb-4 p-3 bg-destructive/10 rounded-full w-fit">
            <WifiOff className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-3xl font-bold text-destructive">You are Offline</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            It seems you've lost your internet connection. Please check your network settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="mt-4">
          <p className="text-muted-foreground mb-6">
            Some content may not be available until you're back online.
          </p>
          <Button asChild size="lg">
            <Link href="/">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go to Homepage
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
