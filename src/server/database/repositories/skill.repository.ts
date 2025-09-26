import { BaseRepository } from '../base-repository';
import { SkillModel } from '../models/skill.model';

export class SkillRepository extends BaseRepository<SkillModel> {
  protected collectionName = 'skills';

  async findByCategory(category: SkillModel['category']): Promise<SkillModel[]> {
    return this.findMany({ category });
  }

  async findByProficiencyLevel(level: SkillModel['proficiencyLevel']): Promise<SkillModel[]> {
    return this.findMany({ proficiencyLevel: level });
  }

  async searchByName(searchTerm: string): Promise<SkillModel[]> {
    return this.findMany({
      name: { $regex: searchTerm, $options: 'i' }
    });
  }
}

// Singleton instance
export const skillRepository = new SkillRepository();
