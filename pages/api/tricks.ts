import 'reflect-metadata';
import type { NextApiRequest, NextApiResponse } from 'next';

import dbConnectionMiddleware from '../../apiMiddleware/dbConnectionMiddleware';
import { Trick } from '../../db';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const connection = await dbConnectionMiddleware();

  if (req.method === 'POST') {
    const trick = new Trick();
    trick.value = req.body.value;
    trick.title = req.body.title;
    trick.language = req.body.language;
    await connection.manager.save(trick);

    // value, language, title, accessToken
    console.log(req.body);
    res.status(201).json({ message: 'post created' });
  } else {
    res.status(200).json({ message: 'John Doe' });
  }
}
