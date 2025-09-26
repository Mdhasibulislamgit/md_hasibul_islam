import { BaseRepository } from '../base-repository';
import { ExperienceModel } from '../models/experience.model';

export class ExperienceRepository extends BaseRepository<ExperienceModel> {
  protected collectionName = 'experiences';

  async findByCompany(companyName: string): Promise<ExperienceModel[]> {
    return this.findMany({
      companyName: { $regex: companyName, $options: 'i' }
    });
  }

  async findByRole(role: string): Promise<ExperienceModel[]> {
    return this.findMany({
      role: { $regex: role, $options: 'i' }
    });
  }

  async findRecent(limit: number = 5): Promise<ExperienceModel[]> {
    return this.findMany({}, { 
      sort: { createdAt: -1 }, 
      limit 
    });
  }
}

// Singleton instance
export const experienceRepository = new ExperienceRepository();
