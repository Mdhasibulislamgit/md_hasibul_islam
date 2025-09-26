import { BaseEntity } from '../base-repository';

export interface SkillModel extends BaseEntity {
  name: string;
  category: 'Web Developer' | 'Engineer' | 'Creative Professional' | 'Business & Management' | 'Other Professional Skills';
  proficiencyLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  iconName?: string;
}

export type CreateSkillData = Omit<SkillModel, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateSkillData = Partial<CreateSkillData>;
