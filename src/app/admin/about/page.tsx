
"use client";

import { useState, useEffect, type FormEvent, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getAboutData, updateAboutData } from '@/actions/aboutActions';
import type { AboutData, SocialLink, EducationItem } from '@/types';
import { v4 as uuidv4 } from 'uuid';
import NextImage from 'next/image';

export default function AdminAboutPage() {
  const { toast } = useToast();
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [educationHistory, setEducationHistory] = useState<EducationItem[]>([]);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  useEffect(() => {
    async function fetchConfig() {
      setIsLoading(true);
      try {
        const data = await getAboutData();
        setAboutData(data);
        if (data) {
          setSocialLinks(data.socialLinks || []);
          setEducationHistory(data.educationHistory || []);
          if (data.profilePictureUrl && !data.profilePictureUrl.startsWith('data:')) {
            setProfilePicturePreview(data.profilePictureUrl);
          } else {
            setProfilePicturePreview(null);
          }
        } else {
          setSocialLinks([]);
          setEducationHistory([]);
          setProfilePicturePreview(null);
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Could not load About Me settings.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }
    fetchConfig();
  }, [toast]);

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setProfilePicturePreview(aboutData?.profilePictureUrl && !aboutData.profilePictureUrl.startsWith('data:') ? aboutData.profilePictureUrl : null);
    }
  };

  const handleSocialLinkChange = (index: number, field: keyof SocialLink, value: string) => {
    const updated = [...socialLinks];
    updated[index] = { ...updated[index], [field]: value };
    setSocialLinks(updated);
  };

  const addSocialLink = () => {
    setSocialLinks([...socialLinks, { id: uuidv4(), platform: '', url: '', iconName: 'Link' }]);
  };

  const removeSocialLink = (id: string) => {
    setSocialLinks(socialLinks.filter(link => link.id !== id));
  };

  const handleEducationChange = (index: number, field: keyof EducationItem, value: string) => {
    const updated = [...educationHistory];
    updated[index] = { ...updated[index], [field]: value };
    setEducationHistory(updated);
  };

  const addEducationItem = () => {
    setEducationHistory([...educationHistory, { id: uuidv4(), degree: '', institution: '', duration: '', iconName: 'GraduationCap' }]);
  };

  const removeEducationItem = (id: string) => {
    setEducationHistory(educationHistory.filter(edu => edu.id !== id));
  };


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!aboutData) return;
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);
    formData.append('socialLinksJson', JSON.stringify(socialLinks));
    formData.append('educationHistoryJson', JSON.stringify(educationHistory));
    
    const result = await updateAboutData(formData);

    if (result.success) {
      toast({
        title: "Success!",
        description: result.message,
      });
      if (result.data) {
        setAboutData(result.data); 
        setSocialLinks(result.data.socialLinks || []);
        setEducationHistory(result.data.educationHistory || []);
        if (result.data.profilePictureUrl && !result.data.profilePictureUrl.startsWith('data:')) {
          setProfilePicturePreview(result.data.profilePictureUrl);
        } else if (!result.data.profilePictureUrl) {
           setProfilePicturePreview(null); 
        }
        if (fileInputRef.current) {
          fileInputRef.current.value = ""; 
        }
      }
    } else {
      toast({
        title: "Error",
        description: result.message || "An unknown error occurred.",
        variant: "destructive",
      });
       if (result.errors && typeof result.errors !== 'string') {
        console.error("Validation/Server Errors:", result.errors);
        if ('profilePictureFile' in result.errors && typeof result.errors.profilePictureFile === 'string') {
           toast({ title: "Image Error", description: result.errors.profilePictureFile, variant: "destructive" });
        }
      }
    }
    setIsSubmitting(false);
  };

  if (isLoading) {
    return <p className="p-4">Loading About Me settings...</p>;
  }

  if (!aboutData) {
    return <p className="p-4">Could not load settings. Please try again.</p>;
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Manage About Me Section</CardTitle>
          <CardDescription>Edit the content for your About Me page.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-8">
            <div>
              <Label htmlFor="fullName" className="font-medium">Full Name</Label>
              <Input id="fullName" name="fullName" defaultValue={aboutData.fullName} className="mt-1 max-w-lg" disabled={isSubmitting} />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="profilePictureFile" className="font-medium">Profile Picture</Label>
              <Input 
                id="profilePictureFile" 
                name="profilePictureFile"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                className="mt-1 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 max-w-md"
                onChange={handleProfilePictureChange}
                disabled={isSubmitting}
                ref={fileInputRef}
              />
              {profilePicturePreview && (
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground mb-1">Image preview:</p>
                  <NextImage 
                    src={profilePicturePreview} 
                    alt="Profile preview" 
                    width={128}
                    height={128}
                    className="h-32 w-32 rounded-md object-cover border" 
                    unoptimized={profilePicturePreview.startsWith('data:')} 
                  />
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-1">Upload a new image to replace the current one. Max 5MB. (JPEG, PNG, WebP)</p>
            </div>

            <div>
              <Label htmlFor="contactEmail" className="font-medium">Contact Email</Label>
              <Input id="contactEmail" name="contactEmail" type="email" defaultValue={aboutData.contactEmail} className="mt-1 max-w-lg" disabled={isSubmitting} />
            </div>
             <div>
              <Label htmlFor="bioParagraphs" className="font-medium">Bio (one paragraph per line)</Label>
              <Textarea id="bioParagraphs" name="bioParagraphs" defaultValue={aboutData.bioParagraphs.join('\n')} className="min-h-[150px] mt-1" disabled={isSubmitting} />
            </div>
            <div>
              <Label htmlFor="personalValues" className="font-medium">Personal Values (comma-separated)</Label>
              <Input id="personalValues" name="personalValues" defaultValue={aboutData.personalValues.join(', ')} className="mt-1 max-w-lg" disabled={isSubmitting} />
            </div>
            <fieldset className="space-y-2 border p-4 rounded-md">
              <legend className="text-sm font-medium px-1">Origin</legend>
              <div>
                <Label htmlFor="originCity">City</Label>
                <Input id="originCity" name="originCity" defaultValue={aboutData.origin.city} className="mt-1 max-w-lg" disabled={isSubmitting}/>
              </div>
              <div>
                <Label htmlFor="originCountry">Country</Label>
                <Input id="originCountry" name="originCountry" defaultValue={aboutData.origin.country} className="mt-1 max-w-lg" disabled={isSubmitting}/>
              </div>
            </fieldset>

            <fieldset className="space-y-4 border p-4 rounded-md">
              <legend className="text-lg font-semibold px-1">Social Links</legend>
              {socialLinks.map((link, index) => (
                <div key={link.id || index} className="space-y-2 p-3 border rounded-md relative">
                  <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1 text-destructive hover:bg-destructive/10" onClick={() => removeSocialLink(link.id)} disabled={isSubmitting} aria-label="Remove social link">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div>
                    <Label htmlFor={`socialPlatform-${index}`}>Platform</Label>
                    <Input id={`socialPlatform-${index}`} value={link.platform} onChange={e => handleSocialLinkChange(index, 'platform', e.target.value)} placeholder="e.g., GitHub" disabled={isSubmitting} className="mt-1"/>
                  </div>
                  <div>
                    <Label htmlFor={`socialUrl-${index}`}>URL</Label>
                    <Input id={`socialUrl-${index}`} value={link.url} onChange={e => handleSocialLinkChange(index, 'url', e.target.value)} placeholder="https://..." disabled={isSubmitting} className="mt-1"/>
                  </div>
                  <div>
                    <Label htmlFor={`socialIcon-${index}`}>Icon Name (Lucide)</Label>
                    <Input id={`socialIcon-${index}`} value={link.iconName || ''} onChange={e => handleSocialLinkChange(index, 'iconName', e.target.value)} placeholder="e.g., Github, Linkedin" disabled={isSubmitting} className="mt-1"/>
                    <p className="text-xs text-muted-foreground mt-1">Find icon names on <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">lucide.dev</a>.</p>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addSocialLink} disabled={isSubmitting}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Social Link
              </Button>
            </fieldset>

            <fieldset className="space-y-4 border p-4 rounded-md">
              <legend className="text-lg font-semibold px-1">Education History</legend>
              {educationHistory.map((edu, index) => (
                <div key={edu.id || index} className="space-y-2 p-3 border rounded-md relative">
                   <Button type="button" variant="ghost" size="icon" className="absolute top-1 right-1 text-destructive hover:bg-destructive/10" onClick={() => removeEducationItem(edu.id)} disabled={isSubmitting} aria-label="Remove education item">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <div>
                    <Label htmlFor={`eduDegree-${index}`}>Degree</Label>
                    <Input id={`eduDegree-${index}`} value={edu.degree} onChange={e => handleEducationChange(index, 'degree', e.target.value)} disabled={isSubmitting} className="mt-1"/>
                  </div>
                  <div>
                    <Label htmlFor={`eduInstitution-${index}`}>Institution</Label>
                    <Input id={`eduInstitution-${index}`} value={edu.institution} onChange={e => handleEducationChange(index, 'institution', e.target.value)} disabled={isSubmitting} className="mt-1"/>
                  </div>
                  <div>
                    <Label htmlFor={`eduDuration-${index}`}>Duration</Label>
                    <Input id={`eduDuration-${index}`} value={edu.duration} onChange={e => handleEducationChange(index, 'duration', e.target.value)} disabled={isSubmitting} className="mt-1"/>
                  </div>
                   <div>
                    <Label htmlFor={`eduIcon-${index}`}>Icon Name (Lucide)</Label>
                    <Input id={`eduIcon-${index}`} value={edu.iconName || ''} onChange={e => handleEducationChange(index, 'iconName', e.target.value)} placeholder="e.g., GraduationCap" disabled={isSubmitting} className="mt-1"/>
                     <p className="text-xs text-muted-foreground mt-1">Find icon names on <a href="https://lucide.dev/icons/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">lucide.dev</a>.</p>
                  </div>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={addEducationItem} disabled={isSubmitting}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add Education Item
              </Button>
            </fieldset>
            
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading || isSubmitting}>
              <Save className="mr-2 h-4 w-4" /> 
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

