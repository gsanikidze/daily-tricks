import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { setupListeners } from '@reduxjs/toolkit/query';

import authMiddleware from './middlewares/auth';
import user from './modules/user';
import api from './modules/api';

const store = configureStore({
  reducer: {
    user,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authMiddleware)
    .concat(api.middleware),
});

setupListeners(store.dispatch);

export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector = <T>(cb: (s: AppState) => T): T => useSelector<AppState>(cb) as T;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
