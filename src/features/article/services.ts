import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../settings/constants";
import { RootState } from "../../app/store";
import { ArticlesResponse, ArticleResponse } from "./types";

const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) headers.set("x-auth", token);
      return headers;
    },
  }),
  tagTypes: ["Article"],
  reducerPath: "articleApi",
  endpoints: (builder) => ({
    readArticles: builder.query<ArticlesResponse, string>({
      query: (blogAddress) => ({
        url: `/blogs/${blogAddress}/articles`,
      }),
      providesTags: ["Article"],
    }),
  }),
});

export default api;

export const { useReadArticlesQuery } = api;
