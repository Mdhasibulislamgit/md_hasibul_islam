import { z } from 'zod';

export const SkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required.'),
  category: z.enum(['Web Developer', 'Engineer', 'Creative Professional', 'Business & Management', 'Other Professional Skills']),
  proficiencyLevel: z.enum(['Beginner', 'Intermediate', 'Advanced', 'Expert']).optional(),
  iconName: z.string().optional(),
});

export const CreateSkillSchema = SkillSchema;
export const UpdateSkillSchema = SkillSchema.partial();

export type SkillInput = z.infer<typeof SkillSchema>;
export type CreateSkillInput = z.infer<typeof CreateSkillSchema>;
export type UpdateSkillInput = z.infer<typeof UpdateSkillSchema>;
