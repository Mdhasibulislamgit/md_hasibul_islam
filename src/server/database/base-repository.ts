import { Collection, ObjectId, Filter, UpdateFilter, FindOptions } from 'mongodb';
import { getMongoDb, fromMongoDocument, toMongoDocument } from './connection';

export interface BaseEntity {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface MongoEntity {
  _id?: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export abstract class BaseRepository<T extends BaseEntity> {
  protected abstract collectionName: string;
  private _collection: Collection<Omit<T, 'id'> & MongoEntity> | null = null;

  protected async getCollection(): Promise<Collection<Omit<T, 'id'> & MongoEntity>> {
    if (!this._collection) {
      const db = await getMongoDb();
      this._collection = db.collection<Omit<T, 'id'> & MongoEntity>(this.collectionName);
    }
    return this._collection;
  }

  async findById(id: string): Promise<T | null> {
    try {
      const collection = await this.getCollection();
      const doc = await collection.findOne({ _id: new ObjectId(id) } as any);
      return doc ? fromMongoDocument(doc) as unknown as T : null;
    } catch (error) {
      console.error(`Error finding document by id ${id}:`, error);
      return null;
    }
  }

  async findAll(options?: FindOptions): Promise<T[]> {
    try {
      const collection = await this.getCollection();
      const docs = await collection.find({}, options).toArray();
      return docs.map(doc => fromMongoDocument(doc) as unknown as T);
    } catch (error) {
      console.error('Error finding all documents:', error);
      return [];
    }
  }

  async findMany(filter: Filter<Omit<T, 'id'> & MongoEntity>, options?: FindOptions): Promise<T[]> {
    try {
      const collection = await this.getCollection();
      const docs = await collection.find(filter, options).toArray();
      return docs.map(doc => fromMongoDocument(doc) as unknown as T);
    } catch (error) {
      console.error('Error finding documents:', error);
      return [];
    }
  }

  async create(data: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T | null> {
    try {
      const collection = await this.getCollection();
      const now = new Date();
      const docToInsert = {
        ...toMongoDocument(data as unknown as T),
        createdAt: now,
        updatedAt: now,
      };

      const result = await collection.insertOne(docToInsert as any);
      if (result.insertedId) {
        return await this.findById(result.insertedId.toHexString());
      }
      return null;
    } catch (error) {
      console.error('Error creating document:', error);
      return null;
    }
  }

  async update(id: string, data: Partial<Omit<T, 'id' | 'createdAt'>>): Promise<T | null> {
    try {
      const collection = await this.getCollection();
      const updateDoc: UpdateFilter<Omit<T, 'id'> & MongoEntity> = {
        $set: {
          ...toMongoDocument(data as unknown as T),
          updatedAt: new Date(),
        } as any,
      };

      const result = await collection.updateOne(
        { _id: new ObjectId(id) } as any,
        updateDoc
      );

      if (result.modifiedCount > 0) {
        return await this.findById(id);
      }
      return null;
    } catch (error) {
      console.error(`Error updating document ${id}:`, error);
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const collection = await this.getCollection();
      const result = await collection.deleteOne({ _id: new ObjectId(id) } as any);
      return result.deletedCount > 0;
    } catch (error) {
      console.error(`Error deleting document ${id}:`, error);
      return false;
    }
  }

  async count(filter: Filter<Omit<T, 'id'> & MongoEntity> = {}): Promise<number> {
    try {
      const collection = await this.getCollection();
      return await collection.countDocuments(filter);
    } catch (error) {
      console.error('Error counting documents:', error);
      return 0;
    }
  }
}
