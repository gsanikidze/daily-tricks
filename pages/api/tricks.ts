import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  switch (req.method) {
    case 'POST':
      // TODO: create trick

      // value, language, title, accessToken
      console.log(req.body);
      res.status(201).json({ message: 'post created' });
      break;
    default:
      res.status(200).json({ message: 'John Doe' });
      break;
  }
}
