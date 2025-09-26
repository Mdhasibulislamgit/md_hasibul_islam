import { skillRepository } from '../../database/repositories/skill.repository';
import { SkillModel, CreateSkillData, UpdateSkillData } from '../../database/models/skill.model';
import { CreateSkillSchema, UpdateSkillSchema } from '../../validators/skill.validator';
import { z } from 'zod';

export class SkillService {
  static async getAllSkills(): Promise<SkillModel[]> {
    return skillRepository.findAll();
  }

  static async getSkillById(id: string): Promise<SkillModel | null> {
    return skillRepository.findById(id);
  }

  static async getSkillsByCategory(category: SkillModel['category']): Promise<SkillModel[]> {
    return skillRepository.findByCategory(category);
  }

  static async createSkill(data: CreateSkillData): Promise<{ 
    success: boolean; 
    skill?: SkillModel; 
    message?: string; 
    errors?: z.ZodIssue[] 
  }> {
    const validationResult = CreateSkillSchema.safeParse(data);

    if (!validationResult.success) {
      return { 
        success: false, 
        message: 'Validation failed.', 
        errors: validationResult.error.issues 
      };
    }

    const skill = await skillRepository.create(validationResult.data);
    
    if (skill) {
      return { success: true, skill };
    }

    return { success: false, message: 'Failed to create skill.' };
  }

  static async updateSkill(id: string, data: UpdateSkillData): Promise<{ 
    success: boolean; 
    skill?: SkillModel; 
    message?: string; 
    errors?: z.ZodIssue[] 
  }> {
    const validationResult = UpdateSkillSchema.safeParse(data);

    if (!validationResult.success) {
      return { 
        success: false, 
        message: 'Validation failed.', 
        errors: validationResult.error.issues 
      };
    }

    const skill = await skillRepository.update(id, validationResult.data);
    
    if (skill) {
      return { success: true, skill };
    }

    return { success: false, message: 'Failed to update skill or skill not found.' };
  }

  static async deleteSkill(id: string): Promise<{ success: boolean; message?: string }> {
    const deleted = await skillRepository.delete(id);
    
    if (deleted) {
      return { success: true };
    }

    return { success: false, message: 'Failed to delete skill or skill not found.' };
  }

  static async searchSkills(searchTerm: string): Promise<SkillModel[]> {
    return skillRepository.searchByName(searchTerm);
  }
}
