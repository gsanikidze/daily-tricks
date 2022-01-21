import { validate } from 'class-validator';
import { NextApiRequest, NextApiResponse } from 'next';

import { Trick } from '../db';
import auth from './auth';
import dbConnection from './dbConnection';

type Data = {
  message: string;
  errors?: any[];
  data?: Record<string, any>;
};

type ThenType<T extends (...a: any) => any> = T extends (...a: any) => Promise<infer U> ? U
  : T extends (...a: any) => infer U ? U : any;

abstract class Route<T> {
  public matches: (req: NextApiRequest) => boolean;

  public middleware: ((req: NextApiRequest, res: NextApiResponse<Data>) => Promise<any>)[];

  public handler: (
    req: NextApiRequest,
    res: NextApiResponse<Data>,
    middleware: ThenType<() => T>,
  ) => Promise<void>;
}

export const getTricksRoute: Route<[
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
