import 'reflect-metadata';
import type { NextApiRequest, NextApiResponse } from 'next';
import { validate } from 'class-validator';

import dbConnectionMiddleware from '../../apiMiddleware/dbConnectionMiddleware';
import authMiddleware from '../../apiMiddleware/authMiddleware';
import { Trick } from '../../db';

type Data = {
  message: string;
  errors?: any[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const connection = await dbConnectionMiddleware();

  if (req.method === 'POST') {
    const userId = await authMiddleware(req, res) as string;

    const trick = new Trick();
    trick.value = req.body.value;
    trick.title = req.body.title;
    trick.language = req.body.language;
    trick.userId = userId;

    const errors = await validate(trick);

    if (errors.length > 0) {
      res.status(422).json({ message: 'Invalid Trick', errors });
    } else {
      await connection.manager.save(trick);

      res.status(201).json({ message: 'Trick created' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}