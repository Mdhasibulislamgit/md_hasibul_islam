import { BaseRepository } from '../base-repository';
import { ContactMessageModel } from '../models/contact.model';

export class ContactRepository extends BaseRepository<ContactMessageModel> {
  protected collectionName = 'contactMessages';

  async findByEmail(email: string): Promise<ContactMessageModel[]> {
    return this.findMany({ email });
  }

  async findRecent(limit: number = 10): Promise<ContactMessageModel[]> {
    return this.findMany({}, { 
      sort: { submittedAt: -1 }, 
      limit 
    });
  }

  async findByDateRange(startDate: string, endDate: string): Promise<ContactMessageModel[]> {
    return this.findMany({
      submittedAt: {
        $gte: startDate,
        $lte: endDate
      }
    });
  }
}

// Singleton instance
export const contactRepository = new ContactRepository();
