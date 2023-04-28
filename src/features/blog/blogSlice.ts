import {
  createSlice,
  PayloadAction,
  isAnyOf,
} from '@reduxjs/toolkit';
import { Blog } from './types';
import userApi from '../user/services';
import api from './services';

type BlogState = {
  blogs: Blog[];
  activeBlogAddress?: string;
};

const initialState: BlogState = {
  blogs: []
};

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
      state.blogs = [];
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
    ).addMatcher(
      api.endpoints.createBlog.matchFulfilled,
      (state, { payload }) => {
        const { blog: { id, title, address } } = payload;
        state.blogs.push({
          id, title, address
        });
      }
    ).addMatcher(
      api.endpoints.updateBlog.matchFulfilled,
      (state, { payload }) => {
        const { blog: { id, title, address } } = payload;
        const foundBlog = state.blogs.find(b => b.id === id);
        if (foundBlog) {
          foundBlog.title = title;
          if (foundBlog.address === state.activeBlogAddress) {
            state.activeBlogAddress = address;
          }
          foundBlog.address = address;
        }
      }
    )
  }
});

export const { setBlogs, setActiveBlog, resetBlog } = blogSlice.actions;
export default blogSlice.reducer;