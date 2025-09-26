import { BaseRepository } from '../base-repository';
import { AboutDataModel } from '../models/about.model';

export class AboutRepository extends BaseRepository<AboutDataModel> {
  protected collectionName = 'about';

  async getAboutData(): Promise<AboutDataModel | null> {
    const aboutData = await this.findAll();
    return aboutData.length > 0 ? aboutData[0] : null;
  }

  async updateAboutData(data: Partial<AboutDataModel>): Promise<AboutDataModel | null> {
    const existing = await this.getAboutData();
    
    if (existing) {
      return this.update(existing.id, data);
    } else {
      return this.create(data as any);
    }
  }
}

// Singleton instance
export const aboutRepository = new AboutRepository();
