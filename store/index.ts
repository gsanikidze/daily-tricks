import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import feed from './modules/feed';
import user from './modules/user';

const store = configureStore({
  reducer: {
    feed,
    user,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector = <T>(cb: (s: AppState) => T): T => useSelector<AppState>(cb) as T;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
