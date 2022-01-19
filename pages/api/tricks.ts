import 'reflect-metadata';
import type { NextApiRequest, NextApiResponse } from 'next';
import { validate } from 'class-validator';

import dbConnectionMiddleware from '../../apiMiddleware/dbConnectionMiddleware';
import authMiddleware from '../../apiMiddleware/authMiddleware';
import { Trick } from '../../db';
import populateUserMiddleware from '../../apiMiddleware/populateUserMiddleware';

type Data = {
  message: string;
  errors?: any[];
  data?: Record<string, any>;
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
    trick.createdAt = Date.now();

    const errors = await validate(trick);

    if (errors.length > 0) {
      res.status(422).json({ message: 'Invalid Trick', errors });
    } else {
      await connection.manager.save(trick);

      res.status(201).json({ message: 'Trick created' });
    }
  } else if (req.method === 'GET') {
    const where: Record<string, any> = {};
    const { q } = req.query;

    if (q) {
      const $regex = new RegExp(req.query.q as string, 'i');

      where.$or = [
        { title: { $regex } },
        { language: { $regex } },
      ];
    }

    const [records, count] = await connection.manager.findAndCount(
      Trick,
      {
        skip: Number(req.query.skip) || 0,
        take: Number(req.query.take) || 10,
        order: {
          createdAt: 'DESC',
        },
        where,
      },
    );
    const populatedRecords = [];
    const users: Record<string, any> = {};

    for await (const record of records) {
      if (!users[record.userId]) {
        users[record.userId] = await populateUserMiddleware(record.userId);
      }

      populatedRecords.push({
        ...record,
        user: users[record.userId],
      });
    }

    res.status(200).json({ message: 'Tricks found', data: { records: populatedRecords, count } });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
