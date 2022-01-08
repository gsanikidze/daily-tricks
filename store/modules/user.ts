import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  uid?: string;
  accessToken?: string | undefined;
  displayName?: string | null;
  email?: string | null;
  photoURL?: string | null;
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
    logOut: (state) => {
      state.profile = {};
      state.isAuthorized = false;
    },
    getStoredUser: (state, action: PayloadAction<User>) => {
      state.profile = action.payload;
      state.isAuthorized = !!action.payload.accessToken;
    },
  },
});

const { logIn, logOut, getStoredUser } = userSlice.actions;

export { logIn, logOut, getStoredUser };
export default userSlice.reducer;
