import 'reflect-metadata';

import { Trick, User } from '../../../db';
import {
  dbConnection, auth, router, Route, ThenType, getFbUser,
} from '../../../apiUtils';

const getBookmarks: Route<[
  ThenType<typeof dbConnection>,
  ThenType<typeof auth>,
]> = {
  matches: (req) => req.method === 'GET',
  middleware: [dbConnection, auth],
  handler: async (
    req,
    res,
    middleware,
  ) => {
    const [connection, userId] = middleware;
    const user = await connection.manager.findOne(User, { where: { fbId: userId as string } });
    const { skip, take } = req.query;

    if (!user) {
      return [404];
    }

    const records = await connection.manager.findByIds(
      Trick,
      user.bookmarkedTricks,
      {
        skip: Number(skip) || 0,
        take: Number(take) || 10,
        order: {
          createdAt: 'DESC',
        },
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

    return [200, { records: populatedRecords, count: user.bookmarkedTricks.length }];
  },
};

export default router([getBookmarks]);
