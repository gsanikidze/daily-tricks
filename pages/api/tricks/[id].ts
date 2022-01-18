import { validate } from 'class-validator';
import type { NextApiRequest, NextApiResponse } from 'next';

import authMiddleware from '../../../apiMiddleware/authMiddleware';
import dbConnectionMiddleware from '../../../apiMiddleware/dbConnectionMiddleware';
import { Trick } from '../../../db';

type Data = {
  message: string;
  errors?: any[];
  data?: Record<string, any>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { id } = req.query;
  const connection = await dbConnectionMiddleware();

  if (req.method === 'PUT') {
    const trick = await connection.manager.findOne(Trick, id as string);
    const userId = await authMiddleware(req, res) as string;

    if (!trick) {
      res.status(404).json({ message: 'Trick is undefined' });
    } else if (userId !== trick.userId) {
      res.status(403).json({ message: 'Forbidden' });
    } else {
      trick.value = req.body.value;
      trick.title = req.body.title;
      trick.language = req.body.language;

      const errors = await validate(trick);

      if (errors.length > 0) {
        res.status(422).json({ message: 'Invalid Trick', errors });
      } else {
        await connection.manager.save(trick);

        res.status(201).json({ message: 'Trick updated' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}