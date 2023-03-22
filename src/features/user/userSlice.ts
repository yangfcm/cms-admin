import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { User } from './types';

type UserState = {
  authUser: User | null,
  token: string;
  expiresAt: number;
};

const initialState: UserState = {
  authUser: null,
  token: '',
  expiresAt: 0,
}

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
});

export const { signin, signout } = userSlice.actions;
export default userSlice.reducer;