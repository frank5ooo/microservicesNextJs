// user-service/pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'POST') {
    // Simulate user registration logic here
    res.status(200).json({ message: 'User registered successfully' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}