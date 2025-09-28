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

        <Card className="group shadow-sm overflow-hidden bg-card/80 backdrop-blur-xl border border-border/50 hover:border-primary/30 transition-all duration-700 transform hover:-translate-y-4 rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

          <CardHeader className="p-8 lg:p-12 relative z-10">
            <div className="flex items-start space-x-4">
              <div className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl border border-primary/20">
                <User className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-tight mb-3">
                  A Little More About My Journey
                </CardTitle>
                <CardDescription className="text-base sm:text-lg text-muted-foreground">
                  Developer, Designer, Dreamer.
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8 lg:p-12 pt-0 relative z-10">
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
              <p className="first-letter:text-2xl sm:first-letter:text-3xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left first-letter:leading-none">
                {aboutData.bioParagraphs?.[1] ||
                  "I'm a dedicated developer passionate about crafting impactful digital solutions and exploring new technologies. I thrive in collaborative environments, turning complex challenges into elegant, user-friendly experiences."}
              </p>
              <p>
                {aboutData.bioParagraphs?.[2] ||
                  "My approach combines technical expertise with a keen eye for design, ensuring that every project is not only functional but also aesthetically pleasing and intuitive to use. I'm always eager to learn and grow, embracing new challenges as opportunities to expand my skillset."}
              </p>
            </div>

            <div className="pt-6 sm:pt-8">
              <Button
                asChild
                variant="ghost"
                className="group text-primary hover:bg-primary/10 hover:text-primary font-semibold text-lg px-6 py-3 rounded-xl transition-all duration-300"
              >
                <Link href="/about">
                  Discover Full Story
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </GradientBackground>
  );
}
