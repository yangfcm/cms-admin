import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../settings/constants";
import { RootState } from '../../app/store';
import { CategoriesResponse } from "./types";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) headers.set('x-auth', token);
      return headers;
    }
  }),
  tagTypes: ['Category'],
  reducerPath: 'categoryApi',
  endpoints: (builder) => ({
    readCategories: builder.query<CategoriesResponse, string>({
      query: blogAddress => ({
        url: `/blogs/${blogAddress}/categories`,
      })
    })
  })
});

export default api;

export const { useReadCategoriesQuery } = api;