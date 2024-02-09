import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../settings/constants";
import { RootState } from "../../app/store";
import { TagsResponse } from "../../features/tag/types";

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
  }),
});

export default api;

export const { useReadTagsQuery } = api;
