'use server';

import { revalidatePath } from 'next/cache';
import { ExperienceService } from '../services/features/experience.service';
import { CreateExperienceData, UpdateExperienceData } from '../database/models/experience.model';
import { isBuildContext } from '../utils/env';

export async function getExperience() {
  if (isBuildContext()) {
    return [];
  }
  return ExperienceService.getAllExperience();
}

export async function getExperienceById(id: string) {
  if (isBuildContext()) {
    return null;
  }
  return ExperienceService.getExperienceById(id);
}

export async function addExperience(formData: FormData) {
  if (isBuildContext()) {
    return { success: false, message: 'Cannot access database during build time' };
  }

  const description = formData.get('description') as string;
  const descriptionArray = description
    ? description.split('\n').filter(line => line.trim() !== '')
    : [];

  const rawFormData: CreateExperienceData = {
    companyName: formData.get('companyName') as string,
    role: formData.get('role') as string,
    duration: formData.get('duration') as string,
    description: descriptionArray,
  };

  const result = await ExperienceService.createExperience(rawFormData);
  
  if (result.success) {
    revalidatePath('/admin/experience');
    revalidatePath('/experience');
    revalidatePath('/');
  }

  return result;
}

export async function updateExperience(id: string, formData: FormData) {
  if (isBuildContext()) {
    return { success: false, message: 'Cannot access database during build time' };
  }

  // Build update object with only provided fields
  const updateData: UpdateExperienceData = {};

  const companyName = formData.get('companyName') as string;
  if (companyName && companyName.trim()) {
    updateData.companyName = companyName.trim();
  }

  const role = formData.get('role') as string;
  if (role && role.trim()) {
    updateData.role = role.trim();
  }

  const duration = formData.get('duration') as string;
  if (duration && duration.trim()) {
    updateData.duration = duration.trim();
  }

  const description = formData.get('description') as string;
  if (description && description.trim()) {
    updateData.description = description.split('\n').filter(line => line.trim() !== '').map(line => line.trim());
  }

  // If no fields to update, return early
  if (Object.keys(updateData).length === 0) {
    return { success: false, message: 'No data provided to update' };
  }

  const result = await ExperienceService.updateExperience(id, updateData);
  
  if (result.success) {
    revalidatePath('/admin/experience');
    revalidatePath('/experience');
    revalidatePath('/');
  }

  return result;
}

export async function deleteExperience(id: string) {
  if (isBuildContext()) {
    return { success: false, message: 'Cannot access database during build time' };
  }

  const result = await ExperienceService.deleteExperience(id);
  
  if (result.success) {
    revalidatePath('/admin/experience');
    revalidatePath('/experience');
    revalidatePath('/');
  }

  return result;
}
