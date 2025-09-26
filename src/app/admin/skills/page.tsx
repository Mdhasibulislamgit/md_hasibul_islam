
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Edit, Trash2, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { getSkills, deleteSkill } from "@/actions/skillActions";
import type { Skill } from "@/types";
import { useEffect, useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const fetchSkills = async () => {
    setIsLoading(true);
    const fetchedSkills = await getSkills();
    setSkills(fetchedSkills);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      const result = await deleteSkill(id);
      if (result.success) {
        toast({ title: "Success", description: result.message });
        fetchSkills(); // Refresh
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
      }
    });
  };

  if (isLoading) {
    return <p>Loading skills...</p>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Manage Professional Skills</CardTitle>
            <CardDescription>Add, edit, or remove professional skills across different categories.</CardDescription>
          </div>
           <Button asChild>
            <Link href="/admin/skills/new">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Professional Skill
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
           {skills.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map(skill => {
                const IconComponent = (skill.iconName && LucideIcons[skill.iconName as keyof typeof LucideIcons])
                  ? LucideIcons[skill.iconName as keyof typeof LucideIcons] as LucideIcon
                  : LucideIcons.Lightbulb;
                return (
                  <Card key={skill.id}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg font-medium">{skill.name}</CardTitle>
                      <IconComponent className="h-5 w-5 text-primary" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">Category: {skill.category}</p>
                      <div className="text-sm text-muted-foreground">
                        Proficiency: {skill.proficiencyLevel && <Badge variant="outline">{skill.proficiencyLevel}</Badge>}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/skills/edit/${skill.id}`}>
                          <Edit className="mr-2 h-3 w-3" /> Edit
                        </Link>
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm" disabled={isPending}><Trash2 className="mr-2 h-3 w-3" /> Delete</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete the skill "{skill.name}".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(skill.id)} disabled={isPending}>
                              {isPending ? 'Deleting...' : 'Delete'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
           ) : (
            <p className="text-muted-foreground text-center py-8">No professional skills added yet. Start by adding your first skill!</p>
           )}
        </CardContent>
      </Card>
    </div>
  );
}
