
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAboutData, updateAboutData } from "@/actions/aboutActions";
import type { AboutData } from "@/types";
import { useEffect, useState, FormEvent } from "react";
import Link from 'next/link'; 

export default function AdminContactSettingsPage() {
  const { toast } = useToast();
  const [contactEmail, setContactEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await getAboutData();
        setContactEmail(data?.contactEmail || '');
      } catch (error) {
        toast({ title: "Error", description: "Could not load contact settings.", variant: "destructive" });
      }
      setIsLoading(false);
    }
    fetchData();
  }, [toast]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Only send the contact email - much simpler!
    const formData = new FormData();
    formData.set('contactEmail', contactEmail);

    const result = await updateAboutData(formData);

    if (result.success) {
      toast({ title: "Success!", description: "Contact email updated successfully." });
      if (result.data) {
        setContactEmail(result.data.contactEmail);
      }
    } else {
      toast({ title: "Error", description: result.message || "Failed to update contact email.", variant: "destructive" });
    }
    setIsSubmitting(false);
  };


  if (isLoading) {
    return <p>Loading contact settings...</p>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Contact Settings</CardTitle>
          <CardDescription>Manage your primary contact email. Social media links are managed under "About Me" settings.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input 
                id="contact-email" 
                type="email" 
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="your.email@example.com" 
                className="mt-1 max-w-lg" 
                disabled={isSubmitting}
              />
              <p className="text-xs text-muted-foreground mt-1">This email will be displayed on your contact page and potentially used for form submissions (if email sending is configured).</p>
            </div>
            
            <p className="text-sm text-muted-foreground">
                Social media links are now managed in the <Link href="/admin/about" className="text-primary hover:underline">About Me section</Link>.
            </p>

          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" /> 
              {isSubmitting ? 'Saving...' : 'Save Contact Email'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
