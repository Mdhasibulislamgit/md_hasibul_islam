import { contactRepository } from '../../database/repositories/contact.repository';
import { ContactMessageModel, CreateContactMessageData } from '../../database/models/contact.model';
import { CreateContactMessageSchema } from '../../validators/contact.validator';
import { z } from 'zod';

export class ContactService {
  static async getAllMessages(): Promise<ContactMessageModel[]> {
    return contactRepository.findAll();
  }

  static async getMessageById(id: string): Promise<ContactMessageModel | null> {
    return contactRepository.findById(id);
  }

  static async getRecentMessages(limit: number = 10): Promise<ContactMessageModel[]> {
    return contactRepository.findRecent(limit);
  }

  static async createMessage(data: CreateContactMessageData): Promise<{
    success: boolean;
    message?: string;
    contactMessage?: ContactMessageModel;
    error?: string;
    errors?: z.ZodIssue[]
  }> {
    const messageData = {
      name: data.name,
      email: data.email,
      message: data.message,
      submittedAt: data.submittedAt || new Date().toISOString()
    };

    const validationResult = CreateContactMessageSchema.safeParse(messageData);

    if (!validationResult.success) {
      return { 
        success: false, 
        error: 'Validation failed.', 
        errors: validationResult.error.issues 
      };
    }

    const contactMessage = await contactRepository.create(messageData);

    if (contactMessage) {
      return {
        success: true,
        message: 'Message sent successfully! Thank you for reaching out.',
        contactMessage
      };
    }

    return { success: false, error: 'Failed to create message.' };
  }

  static async deleteMessage(id: string): Promise<{ success: boolean; message?: string }> {
    const deleted = await contactRepository.delete(id);
    
    if (deleted) {
      return { success: true };
    }

    return { success: false, message: 'Failed to delete message or message not found.' };
  }

  static async getMessagesByEmail(email: string): Promise<ContactMessageModel[]> {
    return contactRepository.findByEmail(email);
  }

  static async getMessagesByDateRange(startDate: string, endDate: string): Promise<ContactMessageModel[]> {
    return contactRepository.findByDateRange(startDate, endDate);
  }
}
