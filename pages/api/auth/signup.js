import { connectDatabase, insertDocument } from '../../../lib/db-util';
import { hashPassword } from '../../../lib/auth-util';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    if (
      !email ||
      !email.includes('@') ||
      !password ||
      password.trim().length < 7
    ) {
      res.status(422).json({
        message:
          'Invalid input – password should also be at least 7 characters long.',
      });
      return;
    }

    // Store it in a database
    const hashedPassword = await hashPassword(password);
    const newUser = { email, password: hashedPassword };

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
      await insertDocument(client, 'next-auth', 'users', newUser);
      res.status(201).json({ message: 'Created user!', newUser: newUser });
      client.close();
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Creating user failed!' });
      return;
    }
  } else {
    res.status(422).json({ message: 'It is not a POST request!' });
  }
}
