import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import { getAllDocuments } from '../../../helpers/api-util';

dotenv.config();

export default async function handler(req, res) {
  const id = req.query.id;

  const client = await MongoClient.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    retryWrites: true,
    writeConcern: { w: 'majority' },
  });

  if (req.method === 'POST') {
    const { email, name, text } = req.body;

    if (
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !text ||
      text.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId: id,
    };

    const db = client.db('events');

    const result = await db.collection('comments').insertOne(newComment);

    console.log(result);

    res.status(201).json({ message: 'Added comment.', comment: newComment });
  }

  if (req.method === 'GET') {
    const documents = await getAllDocuments(
      client,
      'events',
      'comments',
      { _id: -1 },
      { eventId: id }
    );

    res.status(200).json({ comments: documents });
  }

  client.close();
}
