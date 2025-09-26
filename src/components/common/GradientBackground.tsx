import { cn } from "@/lib/utils";
import { GradientBackgroundProps } from "@/types/components/common";

const gradientVariants = {
  primary: {
    light: "bg-gradient-to-b from-muted/30 to-background",
    medium: "bg-gradient-to-br from-primary/5 via-transparent to-accent/5",
    strong: "bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20"
  },
  secondary: {
    light: "bg-gradient-to-b from-background to-muted/30",
    medium: "bg-gradient-to-br from-accent/5 via-transparent to-primary/5",
    strong: "bg-gradient-to-r from-accent/20 via-primary/10 to-accent/20"
  },
  accent: {
    light: "bg-background",
    medium: "bg-gradient-to-br from-muted/20 via-transparent to-accent/10",
    strong: "bg-gradient-to-r from-muted/30 via-accent/20 to-muted/30"
  }
};

const backgroundPatterns = {
  primary: "bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.05),transparent_70%)]",
  secondary: "bg-[linear-gradient(45deg,transparent_25%,rgba(120,119,198,0.02)_50%,transparent_75%)]",
  accent: "bg-[radial-gradient(ellipse_at_bottom,rgba(120,219,255,0.05),transparent_70%)]"
};

export function GradientBackground({ 
  variant = 'primary', 
  intensity = 'medium', 
  className, 
  children 
}: GradientBackgroundProps) {
  return (
    <div className={cn(
      "relative",
      gradientVariants[variant][intensity],
      className
    )}>
      <div className={cn(
        "absolute inset-0",
        backgroundPatterns[variant]
      )}></div>
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
