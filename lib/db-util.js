import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export async function connectDatabase() {
  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    retryWrites: true,
    writeConcern: { w: 'majority' },
  });

  return client;
}

export async function insertDocument(client, dbName, collName, document) {
  const db = client.db(dbName);
  const result = await db.collection(collName).insertOne(document);

  return result;
}

export async function getAllDocuments(
  client,
  dbName,
  collection,
  sort,
  filter = {}
) {
  const db = client.db(dbName);

  const documents = await db
    .collection(collection)
    .find(filter)
    .sort(sort)
    .toArray();

  return documents;
}
