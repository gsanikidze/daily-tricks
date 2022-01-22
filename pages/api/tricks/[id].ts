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
      return [404];
    } if (userId !== trick.userId) {
      return [403];
    }
    trick.value = req.body.value;
    trick.title = req.body.title;
    trick.language = req.body.language;

    const errors = await validate(trick);

    if (errors.length > 0) {
      return [422, errors];
    }

    await connection.manager.save(trick);

    return [201];
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
      return [404];
    }

    if (userId !== trick.userId) {
      return [403];
    }

    await connection.manager.delete(Trick, trick);
    return [200];
  },
};

export default router([editTrick, deleteTrick]);
