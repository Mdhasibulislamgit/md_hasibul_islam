'use server';

import { revalidatePath } from 'next/cache';
import { aboutRepository } from '../database/repositories/about.repository';
import { isBuildContext } from '../utils/env';
import type { AboutData } from '@/types';

export async function getAboutData(): Promise<AboutData | null> {
  if (isBuildContext()) {
    return null;
  }

  const data = await aboutRepository.getAboutData();
  if (!data) return null;

  // Transform the data to match the expected AboutData type
  return {
    id: data.id,
    fullName: data.fullName,
    profilePictureUrl: data.profilePictureUrl,
    contactEmail: data.contactEmail,
    bioParagraphs: data.bioParagraphs,
    personalValues: data.personalValues,
    origin: data.origin,
    educationHistory: data.educationHistory.map(edu => ({
      id: edu.id,
      institution: edu.institution,
      degree: edu.degree,
      year: edu.year,
      duration: edu.duration,
      iconName: edu.iconName as any, // Type assertion for Lucide icon names
    })),
    socialLinks: data.socialLinks.map(link => ({
      id: link.id,
      platform: link.platform,
      url: link.url,
      iconName: link.iconName as any, // Type assertion for Lucide icon names
    })),
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  } as AboutData;
}

export async function updateAboutData(formData: FormData): Promise<{
  success: boolean;
  message: string;
  data?: AboutData;
  errors?: any;
}> {
  if (isBuildContext()) {
    return { success: false, message: 'Cannot access database during build time' };
  }

  // Build update object with only provided fields
  const updateData: any = {};

  // Handle basic fields - only include if they have values
  const fullName = formData.get('fullName') as string;
  if (fullName && fullName.trim()) {
    updateData.fullName = fullName.trim();
  }

  const contactEmail = formData.get('contactEmail') as string;
  if (contactEmail && contactEmail.trim()) {
    updateData.contactEmail = contactEmail.trim();
  }

  // Handle profile picture file upload or URL
  const profilePictureFile = formData.get('profilePictureFile') as File;
  const profilePictureUrl = formData.get('profilePictureUrl') as string;

  if (profilePictureFile && profilePictureFile.size > 0) {
    // Handle file upload - convert to base64 for now (you might want to use a proper file storage service)
    try {
      const buffer = await profilePictureFile.arrayBuffer();
      const base64 = Buffer.from(buffer).toString('base64');
      updateData.profilePictureUrl = `data:${profilePictureFile.type};base64,${base64}`;
    } catch (error) {
      console.error('Error processing profile picture:', error);
      return { success: false, message: 'Error processing profile picture' };
    }
  } else if (profilePictureUrl && profilePictureUrl.trim()) {
    updateData.profilePictureUrl = profilePictureUrl.trim();
  }

  // Handle bio paragraphs
  const bioParagraphs = formData.get('bioParagraphs') as string;
  if (bioParagraphs && bioParagraphs.trim()) {
    updateData.bioParagraphs = bioParagraphs.split('\n').filter(p => p.trim()).map(p => p.trim());
  }

  // Handle personal values
  const personalValues = formData.get('personalValues') as string;
  if (personalValues && personalValues.trim()) {
    updateData.personalValues = personalValues.split(',').filter(v => v.trim()).map(v => v.trim());
  }

  // Handle origin
  const originCity = formData.get('originCity') as string;
  const originCountry = formData.get('originCountry') as string;
  if (originCity || originCountry) {
    updateData.origin = {};
    if (originCity && originCity.trim()) {
      updateData.origin.city = originCity.trim();
    }
    if (originCountry && originCountry.trim()) {
      updateData.origin.country = originCountry.trim();
    }
  }

  // Handle social links
  const socialLinksJson = formData.get('socialLinksJson') as string;
  if (socialLinksJson) {
    try {
      const socialLinks = JSON.parse(socialLinksJson);
      if (Array.isArray(socialLinks)) {
        updateData.socialLinks = socialLinks.filter(link =>
          link.platform && link.platform.trim() && link.url && link.url.trim()
        );
      }
    } catch (error) {
      console.error('Error parsing social links:', error);
    }
  }

  // Handle education history
  const educationHistoryJson = formData.get('educationHistoryJson') as string;
  if (educationHistoryJson) {
    try {
      const educationHistory = JSON.parse(educationHistoryJson);
      if (Array.isArray(educationHistory)) {
        updateData.educationHistory = educationHistory.filter(edu =>
          edu.degree && edu.degree.trim() && edu.institution && edu.institution.trim()
        );
      }
    } catch (error) {
      console.error('Error parsing education history:', error);
    }
  }

  // If no fields to update, return early
  if (Object.keys(updateData).length === 0) {
    return { success: false, message: 'No data provided to update' };
  }

  try {
    const result = await aboutRepository.updateAboutData(updateData);
    
    if (result) {
      revalidatePath('/admin/about');
      revalidatePath('/about');
      revalidatePath('/');

      // Transform the data to match the expected AboutData type
      const transformedData = {
        id: result.id,
        fullName: result.fullName,
        profilePictureUrl: result.profilePictureUrl,
        contactEmail: result.contactEmail,
        bioParagraphs: result.bioParagraphs,
        personalValues: result.personalValues,
        origin: result.origin,
        educationHistory: result.educationHistory.map(edu => ({
          id: edu.id,
          institution: edu.institution,
          degree: edu.degree,
          year: edu.year,
          duration: edu.duration,
          iconName: edu.iconName as any, // Type assertion for Lucide icon names
        })),
        socialLinks: result.socialLinks.map(link => ({
          id: link.id,
          platform: link.platform,
          url: link.url,
          iconName: link.iconName as any, // Type assertion for Lucide icon names
        })),
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      } as AboutData;

      return { success: true, message: 'About data updated successfully', data: transformedData };
    }

    return { success: false, message: 'Failed to update about data' };
  } catch (error) {
    console.error('Error updating about data:', error);
    return {
      success: false,
      message: 'Failed to update about data',
      errors: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
