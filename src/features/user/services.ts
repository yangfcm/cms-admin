import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiBaseUrl } from '../../settings/constants';
import { UserResponse, SignInUser } from './types';

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  tagTypes: ['User'],
  reducerPath: 'user',
  endpoints: (builder) => ({
    signin: builder.mutation<UserResponse, SignInUser>({
      query: (signinUser) => ({
        url: 'auth/signin',
        method: 'POST',
        body: { identity: signinUser.usernameOrEmail, password: signinUser.password }
      }),
    })
  })
});

export default api;

export const { useSigninMutation } = api;