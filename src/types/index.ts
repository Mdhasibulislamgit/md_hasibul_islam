
import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import type { ObjectId } from "mongodb"; // Import ObjectId
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';



// Schemas for AboutData validation
export const SocialLinkSchema = z.object({
  id: z.string().default(() => uuidv4()),
  platform: z.string().min(1, "Platform name is required."),
  url: z.string().url("Must be a valid URL."),
  iconName: z.string().optional(),
});

export const EducationItemSchema = z.object({
  id: z.string().default(() => uuidv4()),
  degree: z.string().min(1, "Degree is required."),
  institution: z.string().min(1, "Institution is required."),
  duration: z.string().min(1, "Duration is required."),
  iconName: z.string().optional(),
});

export const AboutDataSchema = z.object({
  fullName: z.string().min(1, "Full name is required."),
  profilePictureUrl: z.string().min(1, "Profile picture URL/path is required."),
  contactEmail: z.string().email("Contact email must be a valid email."),
  bioParagraphs: z.array(z.string().min(1)).min(1, "At least one bio paragraph is required."),
  personalValues: z.array(z.string().min(1)).min(1, "At least one personal value is required."),
  origin: z.object({
    city: z.string().min(1, "City is required."),
    country: z.string().min(1, "Country is required."),
  }),
  educationHistory: z.array(EducationItemSchema),
  socialLinks: z.array(SocialLinkSchema),
});

// Create and Update schemas for About data
export const CreateAboutDataSchema = AboutDataSchema;
export const UpdateAboutDataSchema = AboutDataSchema.partial().extend({
  origin: z.object({
    city: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  bioParagraphs: z.array(z.string().min(1)).optional(),
  personalValues: z.array(z.string().min(1)).optional(),
  educationHistory: z.array(EducationItemSchema).optional(),
  socialLinks: z.array(SocialLinkSchema).optional(),
});

// Base type for MongoDB documents to ensure _id is handled if directly exposed, though we map it to 'id'
interface MongoBase {
  _id?: ObjectId; // MongoDB's native ID
}



export interface Skill extends MongoBase {
  id: string;
  name: string;
  category: 'Web Developer' | 'Engineer' | 'Creative Professional' | 'Business & Management' | 'Other Professional Skills';
  proficiencyLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  iconName?: keyof typeof import('lucide-react');
}

export interface Experience extends MongoBase {
  id: string;
  companyName: string;
  role: string;
  duration: string;
  description: string[];
}

export interface ContactMessage extends MongoBase {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string; // ISO string
}

export interface SocialLink { // This is embedded, so no top-level ID or MongoBase needed
  id: string; // Retain for client-side keying if needed, or can be an array index if order matters and is stable
  platform: string;
  url: string;
  iconName?: keyof typeof import('lucide-react');
}

export interface EducationItem { // This is embedded
  id: string; // Retain for client-side keying
  degree: string;
  institution: string;
  duration: string;
  iconName?: keyof typeof import('lucide-react');
}

export interface AboutData extends MongoBase {
  id: string; // Should be the string representation of a fixed ObjectId for the singleton document
  fullName: string;
  profilePictureUrl: string; // Path to the image in public folder, e.g., /uploads/about/profile.png or a placeholder URL
  bioParagraphs: string[];
  personalValues: string[];
  origin: {
    city: string;
    country: string;
  };
  educationHistory: EducationItem[];
  socialLinks: SocialLink[];
  contactEmail: string;
}

export interface CvInfo {
  fileName: string | null;
  lastModified: Date | null;
}

