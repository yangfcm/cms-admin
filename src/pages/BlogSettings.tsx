import useUserBlog from "../features/blog/useUserBlog";
import NewBlogForm from "../components/NewBlogForm";

function BlogSettings() {
  const { activeBlog } = useUserBlog();
  if (!activeBlog) return null;

  return (
    <>
      <NewBlogForm blog={activeBlog} />
    </>
  );
}

export default BlogSettings;
