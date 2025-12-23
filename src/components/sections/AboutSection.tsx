import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, User } from "lucide-react";
import { SectionTitle, GradientBackground } from "@/components/common";
import type { AboutData } from "@/types";

interface AboutSectionProps {
  aboutData: AboutData | null;
}

export function AboutSection({ aboutData }: AboutSectionProps) {
  if (!aboutData) {
    return null;
  }

  return (
    <GradientBackground variant="primary" intensity="light" className="py-8 sm:py-12 lg:py-16" id="about">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle title="About Me" icon={User} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Visual/Header Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
               <div className="relative p-8 bg-card border border-border/50 rounded-3xl shadow-xl overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-5">
                    <User className="w-32 h-32" />
                  </div>
                  
                  <div className="inline-flex p-3 mb-6 bg-primary/10 rounded-2xl text-primary">
                    <User className="h-8 w-8" />
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70 mb-4">
                    Developer,<br />Designer,<br />Dreamer.
                  </h3>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    Turning complex problems into elegant, user-friendly solutions.
                  </p>
               </div>
            </div>
            
            {/* Stats or quick pills could go here if we had data, currently keeping it clean */}
          </div>

          {/* Content Side */}
          <div className="lg:col-span-7">
            <Card className="bg-background/50 backdrop-blur-sm border-none shadow-none">
              <CardContent className="p-0 space-y-6">
                <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
                   <p>
                    <span className="text-foreground font-semibold">Hello! </span>
                    {aboutData.bioParagraphs?.[1] ||
                      "I'm a dedicated developer passionate about crafting impactful digital solutions and exploring new technologies. I thrive in collaborative environments, turning complex challenges into elegant, user-friendly experiences."}
                  </p>
                  <p>
                    {aboutData.bioParagraphs?.[2] ||
                      "My approach combines technical expertise with a keen eye for design, ensuring that every project is not only functional but also aesthetically pleasing and intuitive to use. I'm always eager to learn and grow, embracing new challenges as opportunities to expand my skillset."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full px-8 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
                  >
                    <Link href="/about">
                      Read Full Story
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full px-8 hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                  >
                     <Link href="/experience">
                      View Experience
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
}
