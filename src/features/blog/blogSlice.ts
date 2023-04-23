import {
  createSlice,
  PayloadAction,
  isAnyOf,
} from '@reduxjs/toolkit';
import { Blog } from './types';
import userApi from '../user/services';

type BlogState = {
  blogs?: Blog[];
  activeBlogAddress?: string;
};

const initialState: BlogState = {};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs: (state, { payload: { blogs } }: PayloadAction<{ blogs: Blog[] }>) => {
      state.blogs = blogs;
      if (blogs.length > 0) {
        state.activeBlogAddress = blogs[0].address;
      } else {
        state.activeBlogAddress = undefined;
      }
    },
    setActiveBlog: (state, { payload }: PayloadAction<string>) => {
      if (!state.blogs || state.blogs.length === 0) {
        state.activeBlogAddress = undefined;
      } else if (state.blogs.findIndex((b) => b.address === payload) < 0) {
        state.activeBlogAddress = state.blogs[0].address;
      } else {
        state.activeBlogAddress = payload;
      }
    },
    resetBlog: (state) => {
      state.activeBlogAddress = undefined;
      state.blogs = undefined;
    },
    createBlogSuccess: (state, { payload: { blog } }: PayloadAction<{ blog: Blog }>) => {
      state.blogs = [...(state.blogs || []), blog];
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      isAnyOf(userApi.endpoints.signin.matchFulfilled, userApi.endpoints.signup.matchFulfilled),
      (state, { payload }) => {
        const { user } = payload;
        state.blogs = user.blogs;
        if (user.blogs.length > 0) {
          state.activeBlogAddress = user.blogs[0].address;
        }
      }
    )
  }
});

export const { setBlogs, setActiveBlog, resetBlog } = blogSlice.actions;
export default blogSlice.reducer;