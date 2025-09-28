import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import { SectionTitle, GradientBackground } from "@/components/common";
import { ExperienceCard } from "@/components/features/experience";
import type { Experience } from "@/types";

interface ExperienceSectionProps {
  experience: Experience | null;
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  if (!experience) {
    return null;
  }

  return (
    <GradientBackground variant="accent" intensity="medium" className="py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle title="Professional Journey" icon={FileText} />

        <ExperienceCard experience={experience} variant="featured" />

        <div className="mt-6 sm:mt-8 text-center">
          <Button
            asChild
            variant="ghost"
            className="group text-primary hover:bg-primary/10 hover:text-primary font-semibold text-lg px-6 py-3 rounded-xl transition-all duration-300"
          >
            <Link href="/experience">
              See My Full Experience
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </GradientBackground>
  );
}
