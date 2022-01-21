import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from 'firebase-admin/auth';

import { initFb } from './fb';

export default async function authMid(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { authorization } = req.headers;
  initFb();

  if (!authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  const auth = getAuth();
  const bearer = authorization.split(' ')[1];

  try {
    const user = await auth.verifyIdToken(bearer);

    return user.uid;
  } catch (e) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}
