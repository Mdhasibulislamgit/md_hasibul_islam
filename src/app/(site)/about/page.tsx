
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
      <div className="text-center mb-6">
        <User className="h-16 w-16 mx-auto text-primary mb-5" />
        <h1 className="text-4xl font-extrabold tracking-tight text-primary sm:text-5xl md:text-6xl">
          About {fullName}
        </h1>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Profile Picture & Quick Info */}
        <div className="lg:col-span-1 space-y-5">
          <Card className="shadow-xl overflow-hidden">
            <CardContent className="p-0">
              <div className="relative w-full aspect-[3/3] rounded-full">
                {profilePictureUrl ? (
                  <Image
                    src={profilePictureUrl}
                    alt={`Profile picture of ${fullName}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="object-cover w-full h-full"
                    data-ai-hint="professional portrait person"
                    priority={true}
                    unoptimized={!isLocalProfilePic && profilePictureUrl.includes('placehold.co')}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="h-16 w-16 text-gray-400" />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl flex items-center"><MapPin className="mr-2 h-5 w-5 text-primary" /> Location</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{origin.city}, {origin.country}</p>
            </CardContent>
          </Card>

          {socialLinks && socialLinks.length > 0 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <Link2 className="mr-2 h-5 w-5 text-primary" /> Connect With Me
                </CardTitle>
              </CardHeader>
              <CardContent>
                <TooltipProvider>
                  <div className="flex space-x-3">
                    {socialLinks.map((link) => {
                      const IconComponent = (link.iconName && LucideIcons[link.iconName as keyof typeof LucideIcons])
                        ? LucideIcons[link.iconName as keyof typeof LucideIcons] as LucideIcon
                        : Link2;
                      return (
                        <Tooltip key={link.id}>
                          <TooltipTrigger asChild>
                            <Button variant="outline" size="icon" asChild>
                              <Link href={link.url} target="_blank" rel="noopener noreferrer" aria-label={`Connect on ${link.platform}`}>
                                <IconComponent className="h-5 w-5" />
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{link.platform}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </TooltipProvider>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right Column: Bio, Values, Education */}
        <div className="lg:col-span-2 space-y-8">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-primary">My Story</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground text-base leading-relaxed">
              {bioParagraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </CardContent>
          </Card>

          {personalValues && personalValues.length > 0 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">Core Values</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-muted-foreground">
                  {personalValues.map((value, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {educationHistory && educationHistory.length > 0 && (
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">Educational Background</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {educationHistory.map((edu) => {
                  const IconComponent = (edu.iconName && LucideIcons[edu.iconName as keyof typeof LucideIcons])
                    ? LucideIcons[edu.iconName as keyof typeof LucideIcons] as LucideIcon
                    : GraduationCap;
                  return (
                    <div key={edu.id} className="flex items-start gap-4 p-3 border rounded-md bg-muted/30">
                      <IconComponent className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-medium text-foreground">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground">{edu.institution}</p>
                        <p className="text-xs text-muted-foreground">{edu.duration}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
