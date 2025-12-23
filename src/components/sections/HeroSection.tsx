"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github, Linkedin, Mail, Twitter } from "lucide-react";
import type { AboutData, CvInfo } from "@/types";

interface HeroSectionProps {
  aboutData: AboutData | null;
  cvInfo: CvInfo | null;
}

// Helper function to truncate text after 5 sentences
const truncateAfterSentences = (text: string, maxSentences: number = 5): string => {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  if (sentences.length <= maxSentences) {
    return text;
  }
  return sentences.slice(0, maxSentences).join(' ').trim() + '...';
};

export function HeroSection({ aboutData, cvInfo }: HeroSectionProps) {
  if (!aboutData) {
    return (
      <section className="h-[100dvh] w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
          <p className="text-muted-foreground animate-pulse font-medium">Preparing Experience...</p>
        </div>
      </section>
    );
  }

  const isLocalProfilePic = aboutData.profilePictureUrl?.startsWith("/");

  return (
    <section
      id="home"
      className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center bg-background"
    >
      {/* Premium Background Layer */}
      <div className="absolute inset-0 z-0">
        {/* Subtle noise texture or mesh */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-float-delayed"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] animate-float"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="container relative z-10 mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
        
        {/* Left Side: Content */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 animate-fadeInLeft">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-[1.1] text-foreground">
              Perfection <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Meaningfull</span> <br />
              Best 
            </h1>
            
            <p className="max-w-xl text-lg sm:text-xl text-muted-foreground font-medium leading-relaxed">
              {truncateAfterSentences(aboutData.bioParagraphs?.[0] || "I bridge the gap between complex engineering and human-centered design, building digital products that leave a lasting impression.")}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button 
              asChild 
              size="lg" 
              className="rounded-full h-14 px-10 text-lg font-bold shadow-2xl shadow-primary/20 hover:scale-105 transition-all duration-300 group"
            >
              <Link href="/contact" className="flex items-center gap-2">
                Start a Conversation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            {cvInfo?.fileName && (
              <Button 
                asChild 
                variant="ghost" 
                size="lg" 
                className="rounded-full h-14 px-8 text-lg font-semibold hover:bg-muted/50 border border-transparent hover:border-border transition-all"
              >
                <Link
                  href={`/uploads/cv/${cvInfo.fileName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Download className="w-5 h-5" /> Resume
                </Link>
              </Button>
            )}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 pt-4 text-muted-foreground/60">
            <Link href="#" className="hover:text-primary transition-colors"><Github className="w-6 h-6" /></Link>
            <Link href="#" className="hover:text-primary transition-colors"><Linkedin className="w-6 h-6" /></Link>
            <Link href="#" className="hover:text-primary transition-colors"><Twitter className="w-6 h-6" /></Link>
            <Link href="#" className="hover:text-primary transition-colors"><Mail className="w-6 h-6" /></Link>
          </div>
        </div>

        {/* Right Side: Circular Image with Premium Effects */}
        <div className="flex-1 flex justify-center lg:justify-end items-center animate-fadeInRight">
          <div className="relative group">
            {/* Pulsing Outer Rings */}
            <div className="absolute inset-0 -m-4 rounded-full border border-primary/20 animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-0 -m-8 rounded-full border border-accent/10 animate-[spin_15s_linear_infinite_reverse]"></div>
            
            {/* Glow Foundation */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            
            {/* The Circle Container */}
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[450px] lg:h-[450px] rounded-full p-2 bg-gradient-to-tr from-primary/30 to-accent/30 backdrop-blur-sm shadow-2xl">
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background/80 shadow-inner group-hover:scale-[0.98] transition-transform duration-700">
                <Image
                  src={aboutData.profilePictureUrl || "https://placehold.co/600x600/333/fff.png?text=Me"}
                  alt={aboutData.fullName}
                  fill
                  className="object-cover"
                  priority
                  unoptimized={!isLocalProfilePic && aboutData.profilePictureUrl?.includes("placehold.co")}
                />
                
                {/* Glassy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

             
            </div>
          </div>
        </div>

      </div>

      {/* Modern Scroll Down */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 group cursor-pointer animate-fadeInUp">
        <div className="relative w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center p-1.5 overflow-hidden transition-colors group-hover:border-primary">
          <div className="w-1 h-2 bg-primary rounded-full animate-bounce"></div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60 transition-colors group-hover:text-primary">Scroll Explore</span>
      </div>
    </section>
  );
}
