
"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { getExperience, deleteExperience } from "@/actions/experienceActions";
import type { Experience } from "@/types";
import { useEffect, useState, useTransition } from "react";
import { useToast } from "@/hooks/use-toast";
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

export default function AdminExperiencePage() {
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const fetchExperience = async () => {
    setIsLoading(true);
    const fetchedExperience = await getExperience();
    setExperienceList(fetchedExperience);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchExperience();
  }, []);

  const handleDelete = async (id: string) => {
    startTransition(async () => {
      const result = await deleteExperience(id);
      if (result.success) {
        toast({ title: "Success", description: result.message });
        fetchExperience(); // Refresh
      } else {
        toast({ title: "Error", description: result.message, variant: "destructive" });
      }
    });
  };

  if (isLoading) {
    return <p>Loading experience...</p>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold">Manage Experience</CardTitle>
            <CardDescription>Add, edit, or remove work experience entries.</CardDescription>
          </div>
          <Button asChild>
            <Link href="/admin/experience/new">
             <PlusCircle className="mr-2 h-4 w-4" /> Add New Experience
            </Link>
          </Button>
        </CardHeader>
        <CardContent>
          {experienceList.length > 0 ? (
            <div className="space-y-4">
              {experienceList.map(exp => (
                <Card key={exp.id}>
                  <CardHeader>
                    <CardTitle>{exp.role} at {exp.companyName}</CardTitle>
                    <CardDescription>{exp.duration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                      {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                    </ul>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/admin/experience/edit/${exp.id}`}>
                        <Edit className="mr-2 h-3 w-3" /> Edit
                      </Link>
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" disabled={isPending}>
                          <Trash2 className="mr-2 h-3 w-3" /> Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete the experience entry for {exp.role} at {exp.companyName}.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDelete(exp.id)} disabled={isPending}>
                            {isPending ? 'Deleting...' : 'Delete'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">No experience entries added yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
