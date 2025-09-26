import { BaseEntity } from '../base-repository';

export interface ContactMessageModel extends BaseEntity {
  name: string;
  email: string;
  message: string;
  submittedAt: string; // ISO string
}

export type CreateContactMessageData = Omit<ContactMessageModel, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateContactMessageData = Partial<CreateContactMessageData>;
