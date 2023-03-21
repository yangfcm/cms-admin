import {
  createSlice
} from '@reduxjs/toolkit';
import { User } from './types';

type UserState = {
  authUser: User | null,
  token: string;
};

const initialState: UserState = {
  authUser: null,
  token: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export default userSlice.reducer;