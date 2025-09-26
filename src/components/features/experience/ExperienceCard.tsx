import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";
import type { Experience } from "@/types";

interface ExperienceCardProps {
  experience: Experience;
  variant?: 'default' | 'featured';
}

export function ExperienceCard({ experience, variant = 'default' }: ExperienceCardProps) {
  if (variant === 'featured') {
    return (
      <Card className="group shadow-sm overflow-hidden bg-card/80 backdrop-blur-xl border border-border/50 hover:border-accent/30 transition-all duration-700 transform hover:-translate-y-4 rounded-3xl">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

        <CardHeader className="bg-gradient-to-r from-accent/10 to-primary/10 p-8 lg:p-12 relative z-10">
          <div className="flex items-center gap-6">
            <div className="p-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-primary/30 backdrop-blur-sm">
              <FileText className="h-8 w-8 lg:h-10 lg:w-10 text-primary flex-shrink-0" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl lg:text-4xl font-bold text-primary leading-tight mb-2">
                My Recent Role
              </CardTitle>
              <CardDescription className="text-lg lg:text-xl text-muted-foreground">
                At{" "}
                <span className="font-semibold text-accent">
                  {experience.companyName}
                </span>{" "}
                as a{" "}
                <span className="font-semibold">
                  {experience.role}
                </span>
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 lg:p-12 relative z-10">
          <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed first-letter:text-3xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
            {experience.description?.[0]
              ? `${
                  experience.description[0]
                    .charAt(0)
                    .toUpperCase() +
                  experience.description[0].slice(1)
                }`
              : "Engaged in challenging and rewarding projects, contributing to the company's success through innovative solutions and teamwork."}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Default variant for regular experience cards
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-foreground">
              {experience.role}
            </CardTitle>
            <CardDescription className="text-lg text-muted-foreground">
              {experience.companyName}
            </CardDescription>
          </div>
          <div className="text-sm text-muted-foreground">
            {experience.duration}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          {experience.description?.map((desc, index) => (
            <p key={index} className="text-muted-foreground leading-relaxed">
              {desc}
            </p>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
