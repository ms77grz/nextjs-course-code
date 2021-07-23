import { connectDatabase, insertDocument } from '../../lib/db-util';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    // Store it in a database
    const newMessage = { email, name, message };

    // Connect to MongoDB

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: 'Connecting to the database failed!' });
      return;
    }

    // Insert document to MongoDB

    try {
      await insertDocument(client, 'blog', 'messages', newMessage);
      res
        .status(201)
        .json({ message: 'Added message.', newMessage: newMessage });
      client.close();
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Inserting message failed!' });
      return;
    }
  } else {
    res.status(422).json({ message: 'It is not a POST request!' });
  }
}
