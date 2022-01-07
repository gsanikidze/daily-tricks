import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  uid: string;
  accessToken: string | undefined;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface State {
  isAuthorized: boolean;
  profile: User,
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    profile: {},
    isAuthorized: false,
  } as State,
  reducers: {
    logIn: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
      state.isAuthorized = true;
    },
  },
});

const { logIn } = userSlice.actions;

export { logIn };
export default userSlice.reducer;
