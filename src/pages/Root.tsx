import { useEffect } from "react";
import { Outlet, Navigate, useParams, useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { useAppDispatch } from "../app/hooks";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SuccessMessage from "../components/SuccessMessage";
import useUserBlog from "../features/blog/useUserBlog";
import blogApi, { useDeleteBlogMutation } from "../features/blog/services";
import { BLOG_DELETED, DELETE_BLOG_CACHE_KEY } from "../settings/constants";

function BlogProvider({ children }: { children: JSX.Element }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { address } = useParams();
  const [, { isSuccess: blogIsDeleted }] = useDeleteBlogMutation({
    fixedCacheKey: DELETE_BLOG_CACHE_KEY,
  });
  const { setActiveBlog, blogs, activeBlog } = useUserBlog();

  useEffect(() => {
    if (blogIsDeleted) {
      if (activeBlog) {
        // When blog is deleted, navigate to the home page of next active blog.
        navigate(`/blog/${activeBlog.address}`);
      } else {
        // If the blog deleted is the last blog, navigate to onboarding page.
        navigate("/new-blog");
      }
    }
  }, [activeBlog, blogIsDeleted]);

  useEffect(() => {
    if (address) {
      setActiveBlog(address);
    }
  }, [address]);

  if (!blogs || blogs.length === 0) {
    return <Navigate to="/new-blog" replace />;
  }

  return (
    <>
      <SuccessMessage
        message={BLOG_DELETED}
        open={blogIsDeleted}
        onClose={() => {
          dispatch(blogApi.util.resetApiState());
        }}
      />
      {children}
    </>
  );
}

function Root() {
  return (
    <BlogProvider>
      <>
        <Header />
        <Box
          id="app__main-container"
          sx={{ display: " flex", height: "100vh" }}
        >
          <Sidebar />
          <Box id="app__main" component="main" sx={{ flexGrow: 1 }}>
            <Toolbar />
            <Box id="app__position-anchor" sx={{ location: "relative" }}>
              <Box id="app__router-container" sx={{ p: 2 }}>
                <Outlet />
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    </BlogProvider>
  );
}

export default Root;
