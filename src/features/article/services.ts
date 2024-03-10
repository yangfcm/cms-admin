import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../settings/constants";
import { RootState } from "../../app/store";
import {
  ArticlesResponse,
  ArticleResponse,
  PostArticle,
  UpdateArticle,
} from "./types";

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
    readArticle: builder.query<
      ArticleResponse,
      { blogAddress: string; id: string }
    >({
      query: ({ blogAddress, id }) => ({
        url: `/blogs/${blogAddress}/articles/${id}`,
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
    updateArticle: builder.mutation<
      ArticleResponse,
      {
        blogAddress: string;
        article: UpdateArticle;
      }
    >({
      query: ({ blogAddress, article: { id, ...patchedArticle } }) => ({
        url: `/blogs/${blogAddress}/articles/${id}`,
        method: "PUT",
        body: { article: patchedArticle },
      }),
      async onQueryStarted({ blogAddress }, { dispatch, queryFulfilled }) {
        let result;
        try {
          const {
            data: { article },
          } = await queryFulfilled;
          result = dispatch(
            api.util.updateQueryData("readArticles", blogAddress, (draft) => {
              draft.articles = draft.articles.map((a) => {
                if (a.id === article.id) {
                  return {
                    ...a,
                    ...article,
                  };
                }
                return a;
              });
            })
          );
        } catch {
          result?.undo();
        }
      },
    }),
    deleteArticle: builder.mutation<
      ArticleResponse,
      {
        blogAddress: string;
        articleId: string;
      }
    >({
      query: ({ blogAddress, articleId }) => ({
        url: `/blogs/${blogAddress}/articles/${articleId}`,
        method: "DELETE",
      }),
      async onQueryStarted(
        { blogAddress, articleId },
        { dispatch, queryFulfilled }
      ) {
        let result;
        try {
          await queryFulfilled;
          result = dispatch(
            api.util.updateQueryData("readArticles", blogAddress, (draft) => {
              draft.articles = draft.articles.filter((a) => a.id !== articleId);
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

export const {
  useReadArticlesQuery,
  useReadArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = api;
