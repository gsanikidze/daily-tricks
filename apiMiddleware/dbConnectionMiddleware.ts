import 'reflect-metadata';
import { getConnection, createConnection } from 'typeorm';

import { mongoDbConfig } from '../constants';

const dbConnectionMiddleware = async () => {
  if (process.env.NODE_ENV === 'production') {
    try {
      return getConnection();
    } catch (error) {
      return await createConnection(mongoDbConfig);
    }
  } else {
    try {
      await getConnection().close();
      return await createConnection(mongoDbConfig);
    } catch (error) {
      return await createConnection(mongoDbConfig);
    }
  }
};

export default dbConnectionMiddleware;
