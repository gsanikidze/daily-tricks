import { getAuth } from 'firebase-admin/auth';
import firebaseMiddleware from './firebaseMiddleware';

interface User {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
}

const populateUserMiddleware = async (userId: string): Promise<User> => {
  firebaseMiddleware();
  try {
    const user = await getAuth().getUser(userId);

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };
  } catch (e) {
    return {
      uid: userId,
    };
  }
};

export default populateUserMiddleware;
