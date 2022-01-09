import admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app';

const serviceAccount = require('../firebase-adminsdk.json');

const firebaseMiddleware = () => {
  const apps = getApps();

  if (apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }
};

export default firebaseMiddleware;
