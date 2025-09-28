import { Card } from "@/components/ui/card";
import { Code, type LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { Skill } from "@/types";

interface SkillGridProps {
  skills: Skill[];
  columns?: 2 | 3 | 4 | 6;
  showAnimation?: boolean;
}

export function SkillGrid({ 
  skills, 
  columns = 6, 
  showAnimation = true 
}: SkillGridProps) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6"
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6 lg:gap-8`}>
      {skills.map((skill, index) => {
        const IconComponent =
          skill.iconName &&
          LucideIcons[skill.iconName as keyof typeof LucideIcons]
            ? (LucideIcons[
                skill.iconName as keyof typeof LucideIcons
              ] as LucideIcon)
            : Code;
        
        return (
          <Card
            key={skill.id}
            className="group p-4 sm:p-6 bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center justify-center text-center min-h-[120px] sm:min-h-[140px] rounded-xl relative overflow-hidden"
            style={showAnimation ? {
              animationDelay: `${index * 100}ms`,
            } : undefined}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-primary mb-2 sm:mb-3 transition-all duration-300 group-hover:scale-110 relative z-10" />
            <p className="font-semibold text-foreground text-xs sm:text-sm relative z-10 group-hover:text-primary transition-colors duration-300 mb-1 sm:mb-2">
              {skill.name}
            </p>
            {skill.proficiencyLevel && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full relative z-10">
                {skill.proficiencyLevel}
              </span>
            )}
          </Card>
        );
      })}
    </div>
  );
}
