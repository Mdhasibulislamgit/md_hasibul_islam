'use server';

import { revalidatePath } from 'next/cache';
import { cvRepository } from '../database/repositories/cv.repository';
import { isBuildContext } from '../utils/env';
import type { CvInfo } from '@/types';

export async function getCurrentCvInfo(): Promise<CvInfo | null> {
  if (isBuildContext()) {
    return null;
  }

  const data = await cvRepository.getCurrentCv();
  if (!data) return null;

  // Transform the data to match the expected CvInfo type
  return {
    fileName: data.fileName,
    lastModified: data.lastModified,
  } as CvInfo;
}

export async function uploadCv(formData: FormData) {
  if (isBuildContext()) {
    return { success: false, message: 'Cannot access database during build time' };
  }

  const file = formData.get('cvFile') as File;
  if (!file) {
    return { success: false, message: 'No file provided' };
  }

  if (!file.name.toLowerCase().endsWith('.pdf')) {
    return { success: false, message: 'Only PDF files are allowed' };
  }

  try {
    // Create uploads directory if it doesn't exist
    const fs = require('fs');
    const path = require('path');
    const uploadDir = path.join(process.cwd(), 'public/uploads/cv');
    
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Convert File object to buffer for saving
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save file to uploads directory
    const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const cvData = {
      fileName: fileName,
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
      fileUrl: `/uploads/cv/${fileName}`,
    };

    const result = await cvRepository.create(cvData as any);
    
    if (result) {
      // Clean up old CVs
      const oldFiles = await cvRepository.getOldCvs(1);
      for (const oldFile of oldFiles) {
        const oldFilePath = path.join(uploadDir, oldFile.fileName);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      await cvRepository.deleteOldCvs(1);
      
      revalidatePath('/admin/cv');
      revalidatePath('/');
      return { success: true, message: 'CV uploaded successfully', data: result };
    }

    // If database operation failed, clean up uploaded file
    fs.unlinkSync(filePath);
    return { success: false, message: 'Failed to upload CV' };
  } catch (error) {
    console.error('Error uploading CV:', error);
    return { success: false, message: 'Failed to upload CV' };
  }
}

export async function deleteCv(id: string) {
  if (isBuildContext()) {
    return { success: false, message: 'Cannot access database during build time' };
  }

  try {
    const result = await cvRepository.delete(id);
    
    if (result) {
      revalidatePath('/admin/cv');
      revalidatePath('/');
      return { success: true, message: 'CV deleted successfully' };
    }

    return { success: false, message: 'Failed to delete CV or CV not found' };
  } catch (error) {
    console.error('Error deleting CV:', error);
    return { success: false, message: 'Failed to delete CV' };
  }
}
