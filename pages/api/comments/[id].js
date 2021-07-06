import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

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
    const dummyList = [
      { id: 'c1', name: 'Alex', text: 'A first comment!' },
      { id: 'c2', name: 'Blake', text: 'A second comment!' },
    ];

    res.status(200).json({ comments: dummyList });
  }

  client.close();
}
