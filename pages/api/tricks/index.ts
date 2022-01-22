import 'reflect-metadata';
import { validate } from 'class-validator';

import { Trick } from '../../../db';
import {
  dbConnection, auth, getFbUser, router, Route, ThenType,
} from '../../../apiUtils';

const addTrick: Route<[
  ThenType<typeof dbConnection>,
  ThenType<typeof auth>,
]> = {
  matches: (req) => req.method === 'POST',
  middleware: [dbConnection, auth],
  handler: async (
    req,
    res,
    middleware,
  ) => {
    const [connection, userId] = middleware;
    const trick = new Trick();
    trick.value = req.body.value;
    trick.title = req.body.title;
    trick.language = req.body.language;
    trick.userId = userId as string;
    trick.createdAt = Date.now();

    const errors = await validate(trick);

    if (errors.length > 0) {
      res.status(422).json({ message: 'Invalid Trick', errors });
    } else {
      await connection.manager.save(trick);

      res.status(201).json({ message: 'Trick created' });
    }
  },
};

const getTricks: Route<[
  ThenType<typeof dbConnection>,
]> = {
  matches: (req) => req.method === 'GET',
  middleware: [dbConnection],
  handler: async (
    req,
    res,
    middleware,
  ) => {
    const [connection] = middleware;
    const where: Record<string, any> = {};
    const { q, skip, take } = req.query;

    if (q) {
      const $regex = new RegExp(q as string, 'i');

      where.$or = [
        { title: { $regex } },
        { language: { $regex } },
      ];
    }

    const [records, count] = await connection.manager.findAndCount(
      Trick,
      {
        skip: Number(skip) || 0,
        take: Number(take) || 10,
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
        users[record.userId] = await getFbUser(record.userId);
      }

      populatedRecords.push({
        ...record,
        user: users[record.userId],
      });
    }

    res.status(200).json({ message: 'Tricks found', data: { records: populatedRecords, count } });
  },
};

export default router([getTricks, addTrick]);
