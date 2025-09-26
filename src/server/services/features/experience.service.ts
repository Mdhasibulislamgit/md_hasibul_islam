import { experienceRepository } from '../../database/repositories/experience.repository';
import { ExperienceModel, CreateExperienceData, UpdateExperienceData } from '../../database/models/experience.model';
import { CreateExperienceSchema, UpdateExperienceSchema } from '../../validators/experience.validator';
import { z } from 'zod';

export class ExperienceService {
  static async getAllExperience(): Promise<ExperienceModel[]> {
    return experienceRepository.findAll();
  }

  static async getExperienceById(id: string): Promise<ExperienceModel | null> {
    return experienceRepository.findById(id);
  }

  static async getRecentExperience(limit: number = 5): Promise<ExperienceModel[]> {
    return experienceRepository.findRecent(limit);
  }

  static async createExperience(data: CreateExperienceData): Promise<{ 
    success: boolean; 
    experience?: ExperienceModel; 
    message?: string; 
    errors?: z.ZodIssue[] 
  }> {
    const validationResult = CreateExperienceSchema.safeParse(data);

    if (!validationResult.success) {
      return { 
        success: false, 
        message: 'Validation failed.', 
        errors: validationResult.error.issues 
      };
    }

    const experience = await experienceRepository.create(validationResult.data);
    
    if (experience) {
      return { success: true, experience };
    }

    return { success: false, message: 'Failed to create experience.' };
  }

  static async updateExperience(id: string, data: UpdateExperienceData): Promise<{ 
    success: boolean; 
    experience?: ExperienceModel; 
    message?: string; 
    errors?: z.ZodIssue[] 
  }> {
    const validationResult = UpdateExperienceSchema.safeParse(data);

    if (!validationResult.success) {
      return { 
        success: false, 
        message: 'Validation failed.', 
        errors: validationResult.error.issues 
      };
    }

    const experience = await experienceRepository.update(id, validationResult.data);
    
    if (experience) {
      return { success: true, experience };
    }

    return { success: false, message: 'Failed to update experience or experience not found.' };
  }

  static async deleteExperience(id: string): Promise<{ success: boolean; message?: string }> {
    const deleted = await experienceRepository.delete(id);
    
    if (deleted) {
      return { success: true };
    }

    return { success: false, message: 'Failed to delete experience or experience not found.' };
  }

  static async searchByCompany(companyName: string): Promise<ExperienceModel[]> {
    return experienceRepository.findByCompany(companyName);
  }

  static async searchByRole(role: string): Promise<ExperienceModel[]> {
    return experienceRepository.findByRole(role);
  }
}
