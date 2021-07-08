import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from '../../../helpers/db-util';

export default async function handler(req, res) {
  const id = req.query.id;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: 'Connecting to the database failed!' });
    return;
  }

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
      client.close();
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId: id,
    };

    try {
      await insertDocument(client, 'events', 'comments', newComment);
      res.status(201).json({ message: 'Added comment.', comment: newComment });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Inserting comment failed!' });
      return;
    }
  }

  if (req.method === 'GET') {
    try {
      const documents = await getAllDocuments(
        client,
        'events',
        'comments',
        { _id: -1 },
        { eventId: id }
      );
      res.status(200).json({ comments: documents });
      client.close();
    } catch (error) {
      res.status(500).json({ message: 'Getting comments failed!' });
      return;
    }
  }
}
