import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../settings/constants";
import { RootState } from "../../app/store";
import { ArticlesResponse, ArticleResponse, PostArticle } from "./types";

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
    createArticle: builder.mutation<
      ArticleResponse,
      { blogAddress: string; article: PostArticle }
    >({
      query: ({ blogAddress, article }) => ({
        url: `/blogs/${blogAddress}/articles`,
        method: "POST",
        body: { article },
      }),
      async onQueryStarted({ blogAddress }, { dispatch, queryFulfilled }) {
        let result;
        try {
          const {
            data: { article },
          } = await queryFulfilled;
          result = dispatch(
            api.util.updateQueryData("readArticles", blogAddress, (draft) => {
              draft.articles.unshift(article);
            })
          );
        } catch {
          result?.undo();
        }
      },
    }),
  }),
});

export default api;

export const { useReadArticlesQuery, useCreateArticleMutation } = api;
