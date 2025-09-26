import { BaseRepository } from '../base-repository';
import { CvInfoModel } from '../models/cv.model';

export class CvRepository extends BaseRepository<CvInfoModel> {
  protected collectionName = 'cvInfo';

  async getCurrentCv(): Promise<CvInfoModel | null> {
    const cvs = await this.findAll({ sort: { uploadedAt: -1 }, limit: 1 });
    return cvs.length > 0 ? cvs[0] : null;
  }

  async findByFileName(fileName: string): Promise<CvInfoModel | null> {
    const cvs = await this.findMany({ fileName });
    return cvs.length > 0 ? cvs[0] : null;
  }

  async deleteOldCvs(keepLatest: number = 1): Promise<number> {
    const allCvs = await this.findAll({ sort: { uploadedAt: -1 } });
    
    if (allCvs.length <= keepLatest) {
      return 0;
    }

    const cvsToDelete = allCvs.slice(keepLatest);
    let deletedCount = 0;

    for (const cv of cvsToDelete) {
      const deleted = await this.delete(cv.id);
      if (deleted) deletedCount++;
    }

    return deletedCount;
  }

  async getOldCvs(keepLatest: number = 1): Promise<CvInfoModel[]> {
    const allCvs = await this.findAll({ sort: { uploadedAt: -1 } });
    
    if (allCvs.length <= keepLatest) {
      return [];
    }

    return allCvs.slice(keepLatest);
  }
}

// Singleton instance
export const cvRepository = new CvRepository();
