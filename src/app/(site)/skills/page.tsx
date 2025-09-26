
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SkillGrid } from '@/components/features/skills';
import type { Skill } from '@/types';
import { getSkills } from '@/actions/skillActions';
import { Lightbulb } from 'lucide-react';

// Define skill categories statically or fetch if they also become dynamic
const skillCategories: Skill['category'][] = ['Web Developer', 'Engineer', 'Creative Professional', 'Business & Management', 'Other Professional Skills'];

export default async function SkillsPage() {
  const skills = await getSkills();

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <Lightbulb className="h-16 w-16 mx-auto text-primary mb-5" />
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
          Professional Skills
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-xl text-muted-foreground">
          A comprehensive overview of my professional capabilities and expertise across various domains.
        </p>
      </div>

      {skills.length > 0 ? (
        <Tabs defaultValue={skillCategories[0]} className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-4 h-auto">
            {skillCategories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs sm:text-sm lg:text-base px-2 py-3 whitespace-nowrap">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          {skillCategories.map((category) => {
            const categorySkills = skills.filter((skill) => skill.category === category);
            return (
              <TabsContent key={category} value={category}>
                {categorySkills.length > 0 ? (
                  <SkillGrid skills={categorySkills} columns={4} showAnimation={true} />
                ) : (
                  <p className="text-center text-muted-foreground py-8">No skills listed in this category yet.</p>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-muted-foreground">No skills to display yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
