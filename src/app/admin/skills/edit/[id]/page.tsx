
"use client";
import { useState, useEffect, type FormEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { getSkills, updateSkill } from '@/actions/skillActions'; // getSkills might return all, need getSkillById if available
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import type { Skill } from '@/types';
import type { ZodIssue } from 'zod';

const skillCategories: Skill['category'][] = ['Web Developer', 'Engineer', 'Creative Professional', 'Business & Management', 'Other Professional Skills'];
const proficiencyLevels: Skill['proficiencyLevel'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

export default function EditSkillPage() {
  const router = useRouter();
  const params = useParams();
  const skillId = params.id as string;
  const { toast } = useToast();

  const [skill, setSkill] = useState<Skill | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    if (skillId) {
      const fetchSkill = async () => {
        setIsLoading(true);
        // Assuming getSkills fetches all, then filter. A getSkillById would be more efficient.
        const allSkills = await getSkills(); 
        const currentSkill = allSkills.find(s => s.id === skillId);
        if (currentSkill) {
          setSkill(currentSkill);
        } else {
          toast({ title: "Error", description: "Skill not found.", variant: "destructive" });
          router.push('/admin/skills');
        }
        setIsLoading(false);
      };
      fetchSkill();
    }
  }, [skillId, router, toast]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!skill) return;

    setIsSubmitting(true);
    setErrors({});
    const formData = new FormData(event.currentTarget);
    const result = await updateSkill(skill.id, formData);

    if (result.success) {
      toast({ title: "Skill Updated", description: result.message });
      router.push('/admin/skills');
    } else {
      toast({ title: "Error Updating Skill", description: result.message || "An unknown error occurred.", variant: "destructive" });
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

  if (isLoading) return <p>Loading skill data...</p>;
  if (!skill) return <p>Skill not found.</p>;

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild className="mb-4">
        <Link href="/admin/skills"><ArrowLeft className="mr-2 h-4 w-4" />Back to Skills</Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle>Edit Professional Skill: {skill.name}</CardTitle>
          <CardDescription>Update the professional skill details below.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Skill Name</Label>
              <Input id="name" name="name" defaultValue={skill.name} disabled={isSubmitting}/>
              {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor="category">Professional Category</Label>
              <Select name="category" defaultValue={skill.category} disabled={isSubmitting}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select professional category" />
                </SelectTrigger>
                <SelectContent>
                  {skillCategories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-destructive mt-1">{errors.category}</p>}
            </div>
            <div>
              <Label htmlFor="proficiencyLevel">Proficiency Level (Optional)</Label>
              <Select name="proficiencyLevel" defaultValue={skill.proficiencyLevel} disabled={isSubmitting}>
                <SelectTrigger id="proficiencyLevel">
                  <SelectValue placeholder="Select proficiency" />
                </SelectTrigger>
                <SelectContent>
                  {proficiencyLevels.map(level => <SelectItem key={level} value={level!}>{level}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.proficiencyLevel && <p className="text-sm text-destructive mt-1">{errors.proficiencyLevel}</p>}
            </div>
            <div>
              <Label htmlFor="iconName">Icon Name (Optional)</Label>
              <Input id="iconName" name="iconName" defaultValue={skill.iconName || ''} placeholder="Code" disabled={isSubmitting}/>
              <p className="text-xs text-muted-foreground mt-1">Enter a valid Lucide icon name (e.g., Code, Database, Lightbulb). The name is case-sensitive and should match exactly.</p>
              {errors.iconName && <p className="text-sm text-destructive mt-1">{errors.iconName}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isSubmitting || isLoading}>
              <Save className="mr-2 h-4 w-4"/>
              {isSubmitting ? 'Saving Changes...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
