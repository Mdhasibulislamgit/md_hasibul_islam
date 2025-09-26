'use server';

import { revalidatePath } from 'next/cache';
import { ContactService } from '../services/features/contact.service';
import { CreateContactMessageData } from '../database/models/contact.model';
import { isBuildContext } from '../utils/env';

export async function getContactMessages() {
  if (isBuildContext()) {
    return [];
  }
  return ContactService.getAllMessages();
}

export async function getContactMessageById(id: string) {
  if (isBuildContext()) {
    return null;
  }
  return ContactService.getMessageById(id);
}

export async function submitContactMessage(formData: FormData) {
  if (isBuildContext()) {
    return { success: false, error: 'Cannot access database during build time' };
  }

  const rawFormData: CreateContactMessageData = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    message: formData.get('message') as string,
    submittedAt: new Date().toISOString(),
  };

  const result = await ContactService.createMessage(rawFormData);

  if (result.success) {
    revalidatePath('/admin/messages');
  }

  return result;
}

// Alias for backward compatibility
export const submitContactForm = submitContactMessage;

export async function deleteContactMessage(id: string) {
  if (isBuildContext()) {
    return { success: false, message: 'Cannot access database during build time' };
  }

  const result = await ContactService.deleteMessage(id);
  
  if (result.success) {
    revalidatePath('/admin/messages');
  }

  return result;
}
