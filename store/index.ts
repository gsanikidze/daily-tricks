import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import feed from './modules/feed';

const store = configureStore({
  reducer: {
    feed,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector = <T>(cb: (s: AppState) => T): T => useSelector<AppState>(cb) as T;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
