import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { Blog } from './types';

type BlogState = {
  blogs?: Blog[];
  activeBlogId?: string;
};

const initialState: BlogState = {};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs: (state, { payload: { blogs } }: PayloadAction<{ blogs: Blog[] }>) => {
      state.blogs = blogs;
      if (blogs.length > 0) {
        state.activeBlogId = blogs[0].id;
      } else {
        state.activeBlogId = undefined;
      }
    },
    setActiveBlogId: (state, { payload: { activeBlogId } }: PayloadAction<{ activeBlogId: string }>) => {
      state.activeBlogId = activeBlogId;
    },
    resetBlog: (state) => {
      state.activeBlogId = undefined;
      state.blogs = undefined;
    }
  },
});

export const { setBlogs, setActiveBlogId, resetBlog } = blogSlice.actions;
export default blogSlice.reducer;