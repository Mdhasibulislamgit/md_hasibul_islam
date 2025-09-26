
"use client";
import { useState, useEffect, type FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getExperience, updateExperience } from '@/actions/experienceActions';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import type { Experience } from '@/types';
import type { ZodIssue } from 'zod';

export default function EditExperiencePage() {
  const router = useRouter();
  const params = useParams();
  const experienceId = params.id as string;
  const { toast } = useToast();

  const [experienceItem, setExperienceItem] = useState<Experience | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    if (experienceId) {
      const fetchExperienceItem = async () => {
        setIsLoading(true);
        const allExperience = await getExperience(); // Fetch all, then filter.
        const currentItem = allExperience.find(exp => exp.id === experienceId);
        if (currentItem) {
          setExperienceItem(currentItem);
        } else {
          toast({ title: "Error", description: "Experience item not found.", variant: "destructive" });
          router.push('/admin/experience');
        }
        setIsLoading(false);
      };
      fetchExperienceItem();
    }
  }, [experienceId, router, toast]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!experienceItem) return;

    setIsSubmitting(true);
    setErrors({});
    const formData = new FormData(event.currentTarget);
    const result = await updateExperience(experienceItem.id, formData);

    if (result.success) {
      toast({ title: "Experience Updated", description: result.message });
      router.push('/admin/experience');
    } else {
      toast({ title: "Error Updating Experience", description: result.message || "An unknown error occurred.", variant: "destructive" });
      if (result.errors) {
        const newErrors: Record<string, string> = {};
        result.errors.forEach((err: ZodIssue) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(newErrors);
      }
    }
    setIsSubmitting(false);
  };

  if (isLoading) return <p>Loading experience data...</p>;
  if (!experienceItem) return <p>Experience item not found.</p>;

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild className="mb-4">
        <Link href="/admin/experience"><ArrowLeft className="mr-2 h-4 w-4" />Back to Experience</Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Edit Experience: {experienceItem.role} at {experienceItem.companyName}</CardTitle>
          <CardDescription>Update the experience details below.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" name="companyName" defaultValue={experienceItem.companyName} disabled={isSubmitting}/>
              {errors.companyName && <p className="text-sm text-destructive mt-1">{errors.companyName}</p>}
            </div>
            <div>
              <Label htmlFor="role">Role / Position</Label>
              <Input id="role" name="role" defaultValue={experienceItem.role} disabled={isSubmitting}/>
              {errors.role && <p className="text-sm text-destructive mt-1">{errors.role}</p>}
            </div>
            <div>
              <Label htmlFor="duration">Duration</Label>
              <Input id="duration" name="duration" defaultValue={experienceItem.duration} disabled={isSubmitting}/>
              {errors.duration && <p className="text-sm text-destructive mt-1">{errors.duration}</p>}
            </div>
            <div>
              <Label htmlFor="description">Description (one point per line)</Label>
              <Textarea id="description" name="description" defaultValue={experienceItem.description.join('\n')} rows={5} disabled={isSubmitting}/>
              {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting || isLoading}>
              <Save className="mr-2 h-4 w-4" />
              {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
