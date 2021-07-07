import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export async function getAllEvents() {
  const response = await fetch(
    `https://next-sales-2d3fd-default-rtdb.europe-west1.firebasedatabase.app/events.json`
  );

  const data = await response.json();

  const events = [];

  for (const key in data) {
    events.push({ id: key, ...data[key] });
  }

  return events;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();

  return allEvents.filter(event => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();

  return allEvents.find(event => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter(event => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

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
  await db.collection(collName).insertOne(document);
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
