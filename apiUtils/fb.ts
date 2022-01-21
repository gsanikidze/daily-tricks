import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = require('../firebase-adminsdk.json');

export async function initFb() {
  const apps = getApps();

  if (apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
}

interface User {
  uid: string;
  email?: string;
  displayName?: string;
  photoURL?: string;
}

export async function getFbUser(userId: string): Promise<User> {
  initFb();
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
}
