import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState } from '..';

interface State {
  posts: {
    id: string;
    value: string;
    language: string;
    createdAt: number;
    title: string;
  }[],
}

interface AddPostPayload {
  value: string;
  language: string;
  title: string;
}

const feedSlice = createSlice({
  name: 'feed',
  initialState: {
    posts: [],
  } as State,
  reducers: {
    addPost: (state, action: PayloadAction<AddPostPayload>) => {
      state.posts.push({
        id: `${Date.now()}`,
        createdAt: Date.now(),
        value: action.payload.value,
        language: action.payload.language,
        title: action.payload.title,
      });
    },
  },
});

const { addPost } = feedSlice.actions;

export const selectPosts = (st: AppState) => [...st.feed.posts]
  .sort((p1, p2) => p2.createdAt - p1.createdAt);

export { addPost };
export default feedSlice.reducer;
