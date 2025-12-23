
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle, GraduationCap, MapPin, User, Link2, type LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { getAboutData } from '@/actions/aboutActions';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function AboutPage() {
  const aboutData = await getAboutData();

  if (!aboutData) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">About</h1>
          <p className="mt-4 text-gray-600">About data not available.</p>
        </div>
      </div>
    );
  }

  const { fullName, profilePictureUrl, bioParagraphs, personalValues, origin, educationHistory, socialLinks } = aboutData;

  // Determine if profilePictureUrl is a local path or external URL for NextImage
  const isLocalProfilePic = profilePictureUrl?.startsWith('/') || false;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center justify-center p-3 mb-6 bg-primary/10 rounded-full">
          <User className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-4">
          About <span className="text-primary">{fullName}</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Passionate about building digital experiences that matter.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Profile Picture & Quick Info */}
        <div className="lg:col-span-4 space-y-8 lg:sticky lg:top-24">
          <div className="relative group mx-auto max-w-sm">
             <div className="absolute -inset-1 bg-gradient-to-tr from-primary to-accent rounded-full blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
             <div className="relative aspect-square rounded-full border-4 border-background shadow-2xl overflow-hidden">
                {profilePictureUrl ? (
                  <Image
                    src={profilePictureUrl}
                    alt={`Profile picture of ${fullName}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    priority={true}
                    unoptimized={!isLocalProfilePic && profilePictureUrl.includes('placehold.co')}
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <User className="h-24 w-24 text-muted-foreground" />
                  </div>
                )}
             </div>
          </div>

          <Card className="shadow-md border-border/50 backdrop-blur-sm bg-card/50">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-primary" /> 
                Based in
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{origin.city}, {origin.country}</p>
            </CardContent>
          </Card>

          {socialLinks && socialLinks.length > 0 && (
            <Card className="shadow-md border-border/50 backdrop-blur-sm bg-card/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center">
                  <Link2 className="mr-2 h-5 w-5 text-primary" /> 
                  Connect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {socialLinks.map((link) => {
                    const IconComponent = (link.iconName && LucideIcons[link.iconName as keyof typeof LucideIcons])
                      ? LucideIcons[link.iconName as keyof typeof LucideIcons] as LucideIcon
                      : Link2;
                    return (
                        <Button key={link.id} variant="outline" size="sm" asChild className="rounded-full hover:border-primary hover:text-primary transition-colors">
                          <Link href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Connect on ${link.platform}`} className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4" />
                            <span>{link.platform}</span>
                          </Link>
                        </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Bio, Values, Education */}
        <div className="lg:col-span-8 space-y-10">
          <section className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent inline-block">My Story</h2>
            <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
              {bioParagraphs.map((paragraph, index) => (
                <p key={index} className="mb-4 text-lg">{paragraph}</p>
              ))}
            </div>
          </section>

          {personalValues && personalValues.length > 0 && (
             <section className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">Core Values</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {personalValues.map((value, index) => (
                    <div key={index} className="flex items-center p-4 rounded-xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-4 flex-shrink-0">
                         <CheckCircle className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
             </section>
          )}

          {educationHistory && educationHistory.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Education</h2>
              <div className="space-y-4">
                {educationHistory.map((edu) => {
                  const IconComponent = (edu.iconName && LucideIcons[edu.iconName as keyof typeof LucideIcons])
                    ? LucideIcons[edu.iconName as keyof typeof LucideIcons] as LucideIcon
                    : GraduationCap;
                  return (
                    <div key={edu.id} className="relative pl-8 before:absolute before:left-3 before:top-8 before:bottom-0 before:w-px before:bg-border last:before:hidden">
                       <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                          <IconComponent className="h-3 w-3 text-primary" />
                       </div>
                       <Card className="border-none shadow-none bg-transparent">
                         <CardContent className="p-0 pl-2">
                            <h4 className="text-xl font-semibold text-foreground">{edu.degree}</h4>
                            <p className="text-primary font-medium">{edu.institution}</p>
                            <p className="text-sm text-muted-foreground mt-1">{edu.duration}</p>
                         </CardContent>
                       </Card>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
