import { MongoClient, type Db, type ObjectId as MongoObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'portfolio_db';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI not configured');
  }

  if (cachedClient) {
    return cachedClient;
  }

  const client = new MongoClient(MONGODB_URI);
  cachedClient = await client.connect();
  return cachedClient;
}

export async function getMongoDb(): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await getMongoClient();
  cachedDb = client.db(MONGODB_DB_NAME);
  return cachedDb;
}

export type ObjectId = MongoObjectId;

export function fromMongoDocument<T extends { _id: MongoObjectId | any }>(
  doc: T
): Omit<T, '_id'> & { id: string } {
  const { _id, ...rest } = doc;
  return { ...rest, id: _id.toHexString() };
}

export function toMongoDocument<T extends { id: string }>(
  doc: T
): Omit<T, 'id'> & { _id?: MongoObjectId } {
  const { id, ...rest } = doc;
  return rest;
}
