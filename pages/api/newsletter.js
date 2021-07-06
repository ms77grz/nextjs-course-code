import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address.' });
      return;
    }

    const client = await MongoClient.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      retryWrites: true,
      writeConcern: { w: 'majority' },
    });

    const db = client.db('events');

    await db.collection('newsletter').insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: 'Signed up!' });
  }
}
