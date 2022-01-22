import { validate } from 'class-validator';

import {
  auth, dbConnection, Route, router, ThenType,
} from '../../../apiUtils';
import { Trick } from '../../../db';

const editTrick: Route<[
  ThenType<typeof dbConnection>,
  ThenType<typeof auth>,
]> = {
  matches: (req) => req.method === 'PUT',
  middleware: [dbConnection, auth],
  handler: async (
    req,
    res,
    middleware,
  ) => {
    const { id } = req.query;
    const [connection, userId] = middleware;
    const trick = await connection.manager.findOne(Trick, id as string);

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
  },
};

const deleteTrick: Route<[
  ThenType<typeof dbConnection>,
  ThenType<typeof auth>,
]> = {
  matches: (req) => req.method === 'DELETE',
  middleware: [dbConnection, auth],
  handler: async (
    req,
    res,
    middleware,
  ) => {
    const { id } = req.query;
    const [connection, userId] = middleware;
    const trick = await connection.manager.findOne(Trick, id as string);
    if (!trick) {
      res.status(404).json({ message: 'Trick is undefined' });
    } else if (userId === trick?.userId) {
      await connection.manager.delete(Trick, trick);
      res.status(200).json({ message: 'Trick deleted' });
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  },
};

export default router([editTrick, deleteTrick]);
