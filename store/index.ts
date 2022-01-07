import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import authMiddleware from './middlewares/auth';

import feed from './modules/feed';
import user from './modules/user';

const store = configureStore({
  reducer: {
    feed,
    user,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authMiddleware),
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector = <T>(cb: (s: AppState) => T): T => useSelector<AppState>(cb) as T;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
