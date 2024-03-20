import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiBaseUrl } from '../../settings/constants';
import { UserResponse, SignInUser, SignUpUser } from './types';

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  tagTypes: ['User'],
  reducerPath: 'userApi',
  endpoints: (builder) => ({
    signin: builder.mutation<UserResponse, SignInUser>({
      query: (signinUser) => ({
        url: 'auth/signin',
        method: 'POST',
        body: { identity: signinUser.usernameOrEmail, password: signinUser.password }
      }),
    }),
    signup: builder.mutation<UserResponse, SignUpUser>({
      query: (signupUser) => ({
        url: 'auth/signup',
        method: 'POST',
        body: signupUser,
      })
    }),
    token: builder.query<Pick<UserResponse, 'user'>, string>({
      query: (token) => ({
        url: 'auth/token',
        headers: { 'x-auth': token }
      }),
    })
  })
});

export default api;

export const { useSigninMutation, useSignupMutation, useTokenQuery } = api;