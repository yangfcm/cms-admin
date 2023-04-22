import {
  createSlice,
  PayloadAction,
  isAnyOf,
} from '@reduxjs/toolkit';
import { User } from './types';
import api from './services';

type UserState = {
  authUser?: User | null,
  token?: string;
  expiresAt?: number;
};

const initialState: UserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin: (state, { payload: { user, token, expiresAt } }: PayloadAction<{ user: User, token: string, expiresAt: number }>) => {
      state.authUser = user;
      state.token = token;
      state.expiresAt = expiresAt;
    },
    signout: (state) => {
      state.authUser = null;
      state.token = '';
      state.expiresAt = 0;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      isAnyOf(api.endpoints.signin.matchFulfilled, api.endpoints.signup.matchFulfilled),
      (state, { payload }) => {
        const { user, token, expiresAt } = payload;
        localStorage.setItem("token", token);
        localStorage.setItem("expiresAt", expiresAt.toString());
        state.authUser = user;
        state.token = token;
        state.expiresAt = expiresAt;
      }
    )
  }
});

export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;