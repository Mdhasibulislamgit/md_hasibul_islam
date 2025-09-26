'use server';

import { revalidatePath } from 'next/cache';
import { SkillService } from '../services/features/skill.service';
import { CreateSkillData, UpdateSkillData } from '../database/models/skill.model';
import { isBuildContext } from '../utils/env';
import type { Skill } from '@/types';

export async function getSkills(): Promise<Skill[]> {
  if (isBuildContext()) {
    return [];
  }

  const data = await SkillService.getAllSkills();

  // Transform the data to match the expected Skill type
  return data.map(skill => ({
    id: skill.id,
    name: skill.name,
    proficiencyLevel: skill.proficiencyLevel,
    category: skill.category,
    iconName: skill.iconName as any, // Type assertion for Lucide icon names
    createdAt: skill.createdAt,
    updatedAt: skill.updatedAt,
  })) as Skill[];
}

export async function getSkillById(id: string) {
  if (isBuildContext()) {
    return null;
  }
  return SkillService.getSkillById(id);
}

export async function addSkill(formData: FormData) {
  if (isBuildContext()) {
    return { success: false, message: 'Cannot access database during build time' };
  }

  const rawFormData: CreateSkillData = {
    name: formData.get('name') as string,
    category: formData.get('category') as any,
    proficiencyLevel: formData.get('proficiencyLevel') as any || undefined,
    iconName: formData.get('iconName') 
      ? (formData.get('iconName') as string)
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join('')
      : undefined,
  };

  const result = await SkillService.createSkill(rawFormData);
  
  if (result.success) {
    revalidatePath('/admin/skills');
    revalidatePath('/skills');
    revalidatePath('/');
  }

  return result;
}

export async function updateSkill(id: string, formData: FormData) {
  if (isBuildContext()) {
    return { success: false, message: 'Cannot access database during build time' };
  }

  // Build update object with only provided fields
  const updateData: UpdateSkillData = {};

  const name = formData.get('name') as string;
  if (name && name.trim()) {
    updateData.name = name.trim();
  }

  const category = formData.get('category') as string;
  if (category && category.trim()) {
    updateData.category = category as any;
  }

  const proficiencyLevel = formData.get('proficiencyLevel') as string;
  if (proficiencyLevel && proficiencyLevel.trim()) {
    updateData.proficiencyLevel = proficiencyLevel as any;
  }

  const iconName = formData.get('iconName') as string;
  if (iconName && iconName.trim()) {
    updateData.iconName = iconName.trim()
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }

  // If no fields to update, return early
  if (Object.keys(updateData).length === 0) {
    return { success: false, message: 'No data provided to update' };
  }

  const result = await SkillService.updateSkill(id, updateData);
  
  if (result.success) {
    revalidatePath('/admin/skills');
    revalidatePath('/skills');
    revalidatePath('/');
  }

  return result;
}

export async function deleteSkill(id: string) {
  if (isBuildContext()) {
    return { success: false, message: 'Cannot access database during build time' };
  }

  const result = await SkillService.deleteSkill(id);
  
  if (result.success) {
    revalidatePath('/admin/skills');
    revalidatePath('/skills');
    revalidatePath('/');
  }

  return result;
}
