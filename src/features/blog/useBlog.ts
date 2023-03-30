import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../app/hooks';
import { RootState } from '../../app/store';
import { setActiveBlogId as setActiveBlogIdAction } from './blogSlice';

function useBlog() {
  const dispatch = useAppDispatch();
  const blogs = useSelector(({ blog }: RootState) => {
    return blog.blogs;
  });
  const activeBlog = useSelector(({ blog }: RootState) => {
    const activeBlogId = blog.activeBlogId;
    if (!activeBlogId || !blog.blogs) return null;
    return blog.blogs.find(b => b.id === activeBlogId);
  });

  const setActiveBlog = useCallback((blogId: string) => {
    dispatch(setActiveBlogIdAction({ activeBlogId: blogId }));
  }, [dispatch, setActiveBlogIdAction]);

  return { blogs, activeBlog, setActiveBlog }
}

export default useBlog;