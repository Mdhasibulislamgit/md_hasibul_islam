import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Sparkles, ChevronDown } from "lucide-react";
import type { AboutData, CvInfo } from "@/types";

interface HeroSectionProps {
  aboutData: AboutData | null;
  cvInfo: CvInfo | null;
}

export function HeroSection({ aboutData, cvInfo }: HeroSectionProps) {
  if (!aboutData) {
    return (
      <section className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <h1 className="text-2xl font-semibold text-muted-foreground">Loading...</h1>
        </div>
      </section>
    );
  }

  const isLocalProfilePic = aboutData.profilePictureUrl?.startsWith("/");

  return (
    <section
      id="home"
      className="h-[calc(100vh-4rem)] flex items-center justify-center relative overflow-hidden"
    >
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/3 to-accent/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(139,69,19,0.08),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(75,0,130,0.06),transparent_60%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(30,144,255,0.04),transparent_70%)]"></div>
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary/20 rounded-full animate-float blur-sm"></div>
        <div className="absolute top-3/4 right-1/4 w-4 h-4 bg-accent/25 rounded-full animate-float-delayed blur-sm"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-primary/30 rounded-full animate-pulse blur-sm"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-accent/40 rounded-full animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-primary/15 rounded-full animate-float-delayed"></div>
      </div>

      <div className="container mx-auto max-w-7xl text-center z-10 px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center w-full">
          {/* Text Content */}
          <div className="lg:text-left space-y-4 order-2 lg:order-1 opacity-0 animate-fadeInLeft">
            {/* Greeting Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full backdrop-blur-sm shadow-sm opacity-0 animate-fadeInUp delay-100">
              <Sparkles className="w-5 h-5 text-primary mr-2" />
              <span className="text-base sm:text-lg font-medium text-primary">
                👋 Hi, I'm {aboutData.fullName || "Your Name"}
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-3 opacity-0 animate-fadeInUp delay-200">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black tracking-tight leading-tight">
                <span className="block mb-2">Professional</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-gradient mb-2">
                  Perfectionalist
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl text-muted-foreground font-light">
                  & Tech Enthusiast
                </span>
              </h1>
            </div>

            {/* Bio with 3-line limit */}
            <div className="max-w-xl lg:max-w-none opacity-0 animate-fadeInUp delay-300">
              <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed line-clamp-3 overflow-hidden">
                {aboutData.bioParagraphs?.[0] ||
                  "I craft beautiful, engaging, and accessible digital experiences. Passionate about clean code, intuitive design, and pushing creative boundaries to build solutions that matter."}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row lg:justify-start justify-center gap-4 pt-4 opacity-0 animate-fadeInUp delay-400">
              <Button
                size="lg"
                asChild
                className="group bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] px-8 py-3 text-lg font-semibold rounded-xl"
              >
                <Link href="/contact">
                  Contact Me
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="group border-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] px-8 py-3 text-lg font-semibold rounded-xl backdrop-blur-sm"
              >
                <Link href="/about">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </Button>

              {cvInfo?.fileName && (
                <Button
                  size="lg"
                  variant="ghost"
                  asChild
                  className="group text-primary hover:bg-primary/5 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] px-8 py-3 text-lg font-semibold rounded-xl border border-primary/20 hover:border-primary/30"
                >
                  <Link
                    href={cvInfo?.fileName ? `/uploads/cv/${cvInfo.fileName}` : '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    Download CV
                  </Link>
                </Button>
              )}
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end opacity-0 animate-fadeInRight delay-200">
            <div className="relative group">
              {/* Enhanced glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/15 via-accent/15 to-primary/15 rounded-full blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 animate-pulse"></div>

              {/* Profile image */}
              <Image
                src={
                  aboutData.profilePictureUrl ||
                  "https://placehold.co/600x600/333/fff.png?text=Me"
                }
                alt={`Profile of ${aboutData.fullName || "User"}`}
                width={300}
                height={300}
                className="rounded-full shadow-2xl object-cover aspect-square relative z-10 border-4 border-background/80 transform group-hover:scale-105 transition-all duration-500 w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] 2xl:w-[32rem] 2xl:h-[32rem]"
                priority
                unoptimized={
                  !isLocalProfilePic &&
                  aboutData.profilePictureUrl?.includes("placehold.co")
                }
              />

              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fadeInUp delay-500">
          <div className="flex flex-col items-center space-y-3">
            <span className="text-sm text-muted-foreground font-medium">
              Scroll to explore
            </span>
            <ChevronDown className="w-6 h-6 text-muted-foreground animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
