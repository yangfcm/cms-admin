import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { setActiveBlog as setActiveBlogAction } from './blogSlice';

function useUserBlog() {
  const dispatch = useAppDispatch();

  const blogs = useSelector(({ blog }: RootState) => {
    return blog.blogs;
  });
  const activeBlog = useSelector(({ blog }: RootState) => {
    const { activeBlogAddress } = blog;
    if (!activeBlogAddress || !blog.blogs) return null;
    return blog.blogs.find(b => b.address === activeBlogAddress);
  });

  const setActiveBlog = useCallback((blogAddress: string) => {
    dispatch(setActiveBlogAction(blogAddress));
  }, [dispatch, setActiveBlogAction]);

  return { blogs, activeBlog, setActiveBlog }
}

export default useUserBlog;