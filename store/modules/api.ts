import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
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

const queryObjToSt = (obj: Record<string, string | number>) => Object.entries(obj)
  .map(([key, value]) => `${key}=${value}`)
  .join('&');

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ['Post'],
  endpoints: (build) => ({
    getTricks: build.query<Post[], { take?: number, skip?: number }>({
      // note: an optional `queryFn` may be used in place of `query`
      query: (q) => ({ url: `tricks?${queryObjToSt(q)}` }),
      // Pick out data and prevent nested properties in a hook or selector
      transformResponse: (response: { data: Post[] }) => response.data,
      // providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
  }),
});

export const { useGetTricksQuery } = api;
export default api;
