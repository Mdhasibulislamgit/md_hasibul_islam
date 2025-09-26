import { BaseEntity } from '../base-repository';

export interface EducationItemModel {
  id: string;
  institution: string;
  degree: string;
  year: string;
  duration: string;
  iconName?: string;
}

export interface SocialLinkModel {
  id: string;
  platform: string;
  url: string;
  iconName?: string;
}

export interface AboutDataModel extends BaseEntity {
  fullName: string;
  profilePictureUrl: string;
  contactEmail: string;
  bioParagraphs: string[];
  personalValues: string[];
  origin: {
    city: string;
    country: string;
  };
  educationHistory: EducationItemModel[];
  socialLinks: SocialLinkModel[];
}

export type CreateAboutData = Omit<AboutDataModel, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateAboutData = Partial<CreateAboutData>;
