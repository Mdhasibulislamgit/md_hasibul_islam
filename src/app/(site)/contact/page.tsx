
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Mail, Send, type LucideIcon } from "lucide-react";
import * as LucideIcons from 'lucide-react';
import { submitContactForm } from "@/actions/contactActions";
import type { SocialLink, AboutData } from '@/types'; // Assuming AboutData contains socialLinks and contactEmail
import { useEffect, useState } from "react";
import { getAboutData } from "@/actions/aboutActions"; // To fetch social links and email

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(50, "Name must be at most 50 characters."),
  email: z.string().email("Invalid email address."),
  message: z.string().min(10, "Message must be at least 10 characters.").max(500, "Message must be at most 500 characters."),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAboutData();
        setAboutData(data);
      } catch (error) {
        console.error("Failed to fetch about data for contact page:", error);
        toast({ title: "Error", description: "Could not load contact information.", variant: "destructive" });
      }
      setIsLoading(false);
    }
    fetchData();
  }, [toast]);

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('message', values.message);

    const result = await submitContactForm(formData);

    if (result.success) {
      toast({
        title: "Message Sent!",
        description: result.message,
      });
      form.reset();
    } else {
      toast({
        title: "Error Sending Message",
        description: result.message || "An unknown error occurred.",
        variant: "destructive",
      });
      if (result.errors) {
        result.errors.forEach(err => {
          form.setError(err.path[0] as keyof FormValues, { message: err.message });
        });
      }
    }
  };

  const socialLinksToDisplay = aboutData?.socialLinks || [];
  const contactEmail = aboutData?.contactEmail || "contact@example.com";


  return (
    <div className="container mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
      <Card className="shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">Get In Touch</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            I'd love to hear from you! Whether you have a question or just want to say hi, feel free to reach out.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-3 text-muted-foreground">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  {isLoading ? <span className="animate-pulse">Loading email...</span> : <a href={`mailto:${contactEmail}`} className="hover:text-primary">{contactEmail}</a>}
                </div>
              </div>

              {socialLinksToDisplay.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold text-foreground mt-8 mb-4">Connect With Me</h3>
                  <div className="flex space-x-4">
                    {isLoading ? <span className="animate-pulse">Loading social links...</span> : socialLinksToDisplay.map((link) => {
                      const IconComponent = (link.iconName && LucideIcons[link.iconName as keyof typeof LucideIcons])
                        ? LucideIcons[link.iconName as keyof typeof LucideIcons] as LucideIcon
                        : Mail;
                      return (
                        <Button key={link.id} variant="outline" size="icon" asChild>
                          <Link href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.platform}>
                            <IconComponent className="h-5 w-5" />
                          </Link>
                        </Button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} disabled={form.formState.isSubmitting || isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} disabled={form.formState.isSubmitting || isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Your message..."
                          className="min-h-[120px]"
                          {...field}
                          disabled={form.formState.isSubmitting || isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full sm:w-auto" disabled={form.formState.isSubmitting || isLoading}>
                  {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                  {!form.formState.isSubmitting && <Send className="ml-2 h-4 w-4" />}
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
