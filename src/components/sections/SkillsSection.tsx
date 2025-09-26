import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lightbulb } from "lucide-react";
import { SectionTitle, GradientBackground } from "@/components/common";
import { SkillGrid } from "@/components/features/skills";
import type { Skill } from "@/types";

interface SkillsSectionProps {
  skills: Skill[];
  maxSkills?: number;
}

export function SkillsSection({ skills, maxSkills = 6 }: SkillsSectionProps) {
  const displaySkills = skills.slice(0, maxSkills);

  if (displaySkills.length === 0) {
    return null;
  }

  return (
    <GradientBackground variant="primary" intensity="medium" className="py-20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle 
          title="My Tech Arsenal" 
          icon={Lightbulb}
          subtitle="I'm proficient in a range of modern web technologies, always eager to learn and adapt. Here are some of the tools and technologies I love working with:"
        />

        <div className="mb-16">
          <SkillGrid skills={displaySkills} columns={6} />
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-sm hover:shadow-2xl transition-all duration-300 transform hover:scale-105 px-8 py-4 text-lg font-semibold rounded-xl"
          >
            <Link href="/skills">
              Explore All My Skills
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </GradientBackground>
  );
}
