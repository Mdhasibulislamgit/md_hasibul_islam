
"use client";
import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { addExperience } from '@/actions/experienceActions';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import type { ZodIssue } from 'zod';

export default function NewExperiencePage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const result = await addExperience(formData);

    if (result.success) {
      toast({ title: "Experience Added", description: result.message });
      router.push('/admin/experience');
    } else {
      toast({ title: "Error Adding Experience", description: result.message || "An unknown error occurred.", variant: "destructive" });
      if (result.errors) {
        const newErrors: Record<string, string> = {};
        result.errors.forEach((err: ZodIssue) => {
          if (err.path[0]) { // For arrays like 'description', path might be ['description', 0]
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild className="mb-4">
        <Link href="/admin/experience"><ArrowLeft className="mr-2 h-4 w-4" />Back to Experience</Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Add New Experience</CardTitle>
          <CardDescription>Enter the details for the new work experience.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" name="companyName" required disabled={isSubmitting}/>
              {errors.companyName && <p className="text-sm text-destructive mt-1">{errors.companyName}</p>}
            </div>
            <div>
              <Label htmlFor="role">Role / Position</Label>
              <Input id="role" name="role" required disabled={isSubmitting}/>
              {errors.role && <p className="text-sm text-destructive mt-1">{errors.role}</p>}
            </div>
            <div>
              <Label htmlFor="duration">Duration (e.g., Jan 2020 - Present)</Label>
              <Input id="duration" name="duration" required disabled={isSubmitting}/>
              {errors.duration && <p className="text-sm text-destructive mt-1">{errors.duration}</p>}
            </div>
            <div>
              <Label htmlFor="description">Description (one point per line)</Label>
              <Textarea id="description" name="description" rows={5} placeholder="Led development of feature X..." required disabled={isSubmitting}/>
              {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Adding Experience...' : 'Add Experience'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
