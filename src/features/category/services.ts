import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../settings/constants";
import { RootState } from '../../app/store';
import { CategoriesResponse, CategoryResponse, PostCategory, Category } from "./types";

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
      }),
      providesTags: ['Category'],
    }),
    createCategory: builder.mutation<CategoryResponse, { blogAddress: string, category: PostCategory }>({
      query: ({ blogAddress, category }) => ({
        url: `/blogs/${blogAddress}/categories`,
        method: 'POST',
        body: { category },
      }),
      async onQueryStarted({ blogAddress, category }, { dispatch, queryFulfilled }) {
        let result;
        try {
          const { data: { category } } = await queryFulfilled;
          result = dispatch(api.util.updateQueryData('readCategories', blogAddress, (categoriesResponse) => {
            categoriesResponse.categories.unshift(category);
          }))
        } catch {
          result?.undo()
        }
      }
    }),
    updateCategory: builder.mutation<CategoryResponse, { blogAddress: string, category: Pick<Category, 'id'> & Partial<PostCategory> }>({
      query: ({ blogAddress, category: { id, ...patchedCategory } }) => ({
        url: `/blogs/${blogAddress}/categories/${id}`,
        method: 'PUT',
        body: { category: patchedCategory },
      }),
    }),
    deleteCategory: builder.mutation<CategoryResponse, { blogAddress: string, categoryId: string }>({
      query: ({ blogAddress, categoryId }) => ({
        url: `/blogs/${blogAddress}/categories/${categoryId}`,
        method: 'DELETE',
      }),
    }),
  })
});

export default api;

export const { useReadCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } = api;