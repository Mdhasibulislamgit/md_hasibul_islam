import { z } from 'zod';

export const ContactMessageSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  email: z.string().email('Valid email is required.'),
  message: z.string().min(10, 'Message must be at least 10 characters long.'),
});

export const CreateContactMessageSchema = ContactMessageSchema.extend({
  submittedAt: z.string().optional(),
});

export type ContactMessageInput = z.infer<typeof ContactMessageSchema>;
export type CreateContactMessageInput = z.infer<typeof CreateContactMessageSchema>;
