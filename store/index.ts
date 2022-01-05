import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import counter from './modules/counter';

const store = configureStore({
  reducer: {
    counter,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export const useAppSelector = <T>(selector: (s: AppState) => T): T => useSelector<AppState>(selector) as T;
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;
