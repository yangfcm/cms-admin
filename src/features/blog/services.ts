import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../settings/constants";
import { PostBlog, BlogResponse } from "./types";
import { RootState } from '../../app/store';

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) headers.set('x-auth', token);
      return headers;
    }
  }),
  tagTypes: ['Blog'],
  reducerPath: 'blogApi',
  endpoints: (builder) => ({
    createBlog: builder.mutation<BlogResponse, PostBlog>({
      query: (postBlog) => ({
        url: 'blogs',
        method: 'POST',
        body: { blog: postBlog }
      }),
    }),
  }),
});

export default api;

export const { useCreateBlogMutation } = api;