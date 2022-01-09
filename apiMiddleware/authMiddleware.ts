import { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from 'firebase-admin/auth';

import firebaseMiddleware from './firebaseMiddleware';

const authMiddleware = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const { authorization } = req.headers;
  firebaseMiddleware();

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
};

export default authMiddleware;
