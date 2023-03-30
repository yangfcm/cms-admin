import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { setActiveBlog as setActiveBlogAction } from './blogSlice';

function useUserBlog() {
  const { address } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (address) {
      dispatch(setActiveBlogAction(address));
    }
  }, [address]);

  const blogs = useSelector(({ blog }: RootState) => {
    return blog.blogs;
  });
  const activeBlog = useSelector(({ blog }: RootState) => {
    const activeBlogAddress = blog.activeBlogAddress;
    if (!activeBlogAddress || !blog.blogs) return null;
    return blog.blogs.find(b => b.address === activeBlogAddress);
  });

  const setActiveBlog = useCallback((blogAddress: string) => {
    dispatch(setActiveBlogAction(blogAddress));
  }, [dispatch, setActiveBlogAction]);

  return { blogs, activeBlog, setActiveBlog }
}

export default useUserBlog;