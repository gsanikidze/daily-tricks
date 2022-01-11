import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AppState } from '..';
import { User } from './user';

const BASE_URL = '/api';

interface Post {
  id: string;
  value: string;
  language: string;
  createdAt: number;
  title: string;
  user: User;
}
interface CreatePost {
  value: string;
  language: string;
  title: string;
  userId: string;
}

const queryObjToSt = (obj: Record<string, string | number>) => Object.entries(obj)
  .map(([key, value]) => `${key}=${value}`)
  .join('&');

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { user: { profile: { accessToken } } } = getState() as AppState;

      if (accessToken) {
        headers.set('authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getTricks: build.query<Post[], { take?: number, skip?: number }>({
      query: (q) => ({ url: `tricks?${queryObjToSt(q)}` }),
      transformResponse: (response: { data: Post[] }) => response.data,
      providesTags: ['Post'],
    }),
    addTrick: build.mutation<Post, CreatePost>({
      query: (body) => ({
        url: 'tricks',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: Post }) => response.data,
      invalidatesTags: ['Post'],
    }),
  }),
});

export const { useGetTricksQuery, useAddTrickMutation } = api;
export default api;