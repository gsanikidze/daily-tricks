import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { AppState } from '..';
import { User } from './user';

const BASE_URL = '/api';

export interface Trick {
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
interface UpdatePost {
  value: string;
  language: string;
  title: string;
}

const queryObjToSt = (obj: Record<string, string | number>) => Object.entries(obj)
  .filter((tuple) => !!tuple[1])
  .map(([key, value]) => `${key}=${value}`)
  .join('&');

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const { user: { profile: { tokenManager } } } = getState() as AppState;

      if (tokenManager && tokenManager.accessToken) {
        headers.set('authorization', `Bearer ${tokenManager.accessToken}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getTricks: build.query<{ records: Trick[], count: number }, {
      take?: number,
      skip?: number,
      q?: string
    }>({
      query: (q) => ({ url: `tricks?${queryObjToSt(q)}` }),
      transformResponse: (response: { data: { records: Trick[], count: number } }) => response.data,
      providesTags: ['Post'],
    }),
    addTrick: build.mutation<Trick, CreatePost>({
      query: (body) => ({
        url: 'tricks',
        method: 'POST',
        body,
      }),
      transformResponse: (response: { data: Trick }) => response.data,
      invalidatesTags: ['Post'],
    }),
    editTrick: build.mutation<Trick, { id: string, body: UpdatePost }>({
      query: ({ id, body }) => ({
        url: `tricks/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (response: { data: Trick }) => response.data,
    }),
    deleteTrick: build.mutation<Trick, string>({
      query: (id: string) => ({
        method: 'DELETE',
        url: `tricks/${id}`,
      }),
      invalidatesTags: ['Post'],
    }),
    bookmarkTrick: build.mutation<Trick, string>({
      query: (id: string) => ({
        url: `bookmark/${id}`,
        method: 'POST',
      }),
    }),
    deleteBookmarkTrick: build.mutation<Trick, string>({
      query: (id: string) => ({
        url: `bookmark/${id}`,
        method: 'DELETE',
      }),
    }),
    getBookmarkIds: build.query<string[], string>({
      query: (userId: string) => ({
        url: `bookmark/${userId}`,
      }),
      transformResponse: (response: { data: string[] }) => response.data,
    }),
  }),
});

export const {
  useGetTricksQuery,
  useAddTrickMutation,
  useEditTrickMutation,
  useDeleteTrickMutation,
  useBookmarkTrickMutation,
  useDeleteBookmarkTrickMutation,
  useGetBookmarkIdsQuery,
} = api;
export default api;
