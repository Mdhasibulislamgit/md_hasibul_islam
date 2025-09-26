import { BaseEntity } from '../base-repository';

export interface ExperienceModel extends BaseEntity {
  companyName: string;
  role: string;
  duration: string;
  description: string[];
}

export type CreateExperienceData = Omit<ExperienceModel, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateExperienceData = Partial<CreateExperienceData>;
