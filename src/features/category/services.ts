import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../settings/constants";
import { RootState } from "../../app/store";
import {
  CategoriesResponse,
  CategoryResponse,
  AddCategory,
  UpdateCategory,
  Category,
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
  tagTypes: ["Category"],
  reducerPath: "categoryApi",
  endpoints: (builder) => ({
    readCategories: builder.query<CategoriesResponse, string>({
      query: (blogAddress) => ({
        url: `/blogs/${blogAddress}/categories`,
      }),
      providesTags: ["Category"],
    }),
    createCategory: builder.mutation<
      CategoryResponse,
      { blogAddress: string; category: AddCategory }
    >({
      query: ({ blogAddress, category }) => ({
        url: `/blogs/${blogAddress}/categories`,
        method: "POST",
        body: { category },
      }),
      async onQueryStarted(
        { blogAddress, category },
        { dispatch, queryFulfilled }
      ) {
        let result;
        try {
          const {
            data: { category },
          } = await queryFulfilled;
          result = dispatch(
            api.util.updateQueryData("readCategories", blogAddress, (draft) => {
              draft.categories.unshift(category);
            })
          );
        } catch {
          result?.undo();
        }
      },
    }),
    updateCategory: builder.mutation<
      CategoryResponse,
      {
        blogAddress: string;
        category: UpdateCategory;
      }
    >({
      query: ({ blogAddress, category: { id, ...patchedCategory } }) => ({
        url: `/blogs/${blogAddress}/categories/${id}`,
        method: "PUT",
        body: { category: patchedCategory },
      }),
      async onQueryStarted(
        { blogAddress, category },
        { dispatch, queryFulfilled }
      ) {
        let result;
        try {
          const {
            data: { category },
          } = await queryFulfilled;
          result = dispatch(
            api.util.updateQueryData("readCategories", blogAddress, (draft) => {
              draft.categories = draft.categories.map((c) => {
                if (c.id === category.id) {
                  return {
                    ...c,
                    ...category,
                  };
                }
                return c;
              });
            })
          );
        } catch {
          result?.undo();
        }
      },
    }),
    deleteCategory: builder.mutation<
      CategoryResponse,
      { blogAddress: string; categoryId: string }
    >({
      query: ({ blogAddress, categoryId }) => ({
        url: `/blogs/${blogAddress}/categories/${categoryId}`,
        method: "DELETE",
      }),
      async onQueryStarted(
        { blogAddress, categoryId },
        { dispatch, queryFulfilled }
      ) {
        let result;
        try {
          await queryFulfilled;
          result = dispatch(
            api.util.updateQueryData("readCategories", blogAddress, (draft) => {
              draft.categories = draft.categories.filter(
                (c) => c.id !== categoryId
              );
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
  useReadCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = api;
