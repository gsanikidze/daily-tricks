import 'reflect-metadata';
import { validate } from 'class-validator';

import { User } from '../../../db';
import {
  dbConnection, auth, router, Route, ThenType,
} from '../../../apiUtils';

const addBookmark: Route<[
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
    const { id } = req.query;
    let user = await connection.manager.findOne(User, { where: { fbId: userId as string } });

    if (!user) {
      user = new User();
      user.fbId = userId as string;
      user.bookmarkedTricks = [];
    }

    if (!id) {
      return [422];
    }

    const alreadyBookmarked = !!user.bookmarkedTricks.find((b) => b === id);

    if (!alreadyBookmarked) {
      user.bookmarkedTricks.push(id as string);
    }

    const errors = await validate(user);

    if (errors.length > 0) {
      return [422, errors];
    }

    await connection.manager.save(user);

    return [201];
  },
};

const deleteBookmark: Route<[
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
    const [connection, userId] = middleware;
    const { id } = req.query;
    const user = await connection.manager.findOne(User, { where: { fbId: userId as string } });

    if (!user) {
      return [404];
    }

    if (!id) {
      return [422];
    }

    user.bookmarkedTricks = user.bookmarkedTricks.filter((b) => b !== id);

    await connection.manager.save(user);

    return [200];
  },
};

export default router([addBookmark, deleteBookmark]);
