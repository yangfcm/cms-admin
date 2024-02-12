import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../settings/constants";
import { RootState } from "../../app/store";
import { PostTag, TagResponse, TagsResponse } from "../../features/tag/types";

const api = createApi({
  reducerPath: "tagApi",
  tagTypes: ["Tag"],
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).user.token;
      if (token) headers.set("x-auth", token);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    readTags: builder.query<TagsResponse, string>({
      query: (blogAddress) => ({
        url: `/blogs/${blogAddress}/tags`,
      }),
      providesTags: ["Tag"],
    }),
    createTag: builder.mutation<
      TagResponse,
      {
        blogAddress: string;
        tag: PostTag;
      }
    >({
      query: ({ blogAddress, tag }) => ({
        url: `/blogs/${blogAddress}/tags`,
        method: "POST",
        body: { tag },
      }),
      async onQueryStarted({ blogAddress, tag }, { dispatch, queryFulfilled }) {
        let result;
        try {
          const {
            data: { tag },
          } = await queryFulfilled;
          result = dispatch(
            api.util.updateQueryData("readTags", blogAddress, (draft) => {
              draft.tags.unshift(tag);
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

export const { useReadTagsQuery } = api;
