import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Blog } from './types';

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
    }
  },
});

export const { setBlogs, setActiveBlog, resetBlog } = blogSlice.actions;
export default blogSlice.reducer;