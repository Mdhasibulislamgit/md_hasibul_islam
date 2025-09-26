import { cn } from "@/lib/utils";
import { SectionTitleProps } from "@/types/components/common";

export function SectionTitle({ 
  title, 
  icon: Icon, 
  subtitle, 
  className,
  children 
}: SectionTitleProps) {
  return (
    <div className={cn("flex items-center justify-center mb-16 relative group", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent h-px top-1/2 transform -translate-y-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
      
      {Icon && (
        <div className="relative mr-4 p-3 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20 backdrop-blur-sm group-hover:scale-110 transition-all duration-300">
          <Icon className="h-8 w-8 text-primary" />
        </div>
      )}
      
      <div className="text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black relative z-10">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-size-200 animate-gradient">
            {title}
          </span>
        </h2>
        
        {subtitle && (
          <p className="mt-4 text-lg lg:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      
      {children}
    </div>
  );
}
