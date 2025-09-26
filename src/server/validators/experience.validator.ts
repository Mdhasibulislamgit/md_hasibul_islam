import { z } from 'zod';

export const ExperienceSchema = z.object({
  companyName: z.string().min(1, 'Company name is required.'),
  role: z.string().min(1, 'Role is required.'),
  duration: z.string().min(1, 'Duration is required.'),
  description: z.array(z.string()).min(1, 'At least one description is required.'),
});

export const CreateExperienceSchema = ExperienceSchema;
export const UpdateExperienceSchema = ExperienceSchema.partial();

export type ExperienceInput = z.infer<typeof ExperienceSchema>;
export type CreateExperienceInput = z.infer<typeof CreateExperienceSchema>;
export type UpdateExperienceInput = z.infer<typeof UpdateExperienceSchema>;
