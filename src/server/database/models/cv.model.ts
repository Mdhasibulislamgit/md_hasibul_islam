import { BaseEntity } from '../base-repository';

export interface CvInfoModel extends BaseEntity {
  fileName: string | null;
  lastModified: Date | null;
  originalName?: string;
  filePath?: string;
  fileSize?: number;
  mimeType?: string;
  uploadedAt?: string; // ISO string
}

export type CreateCvData = Omit<CvInfoModel, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateCvData = Partial<CreateCvData>;
