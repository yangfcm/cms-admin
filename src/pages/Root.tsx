import { useEffect } from "react";
import {
  Outlet,
  Navigate,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import { useAppDispatch } from "../app/hooks";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SuccessMessage from "../components/SuccessMessage";
import useUserBlog from "../features/blog/useUserBlog";
import blogApi, {
  useCreateBlogMutation,
  useDeleteBlogMutation,
} from "../features/blog/services";
import {
  BLOG_CREATED,
  BLOG_DELETED,
  CREATE_BLOG_CACHE_KEY,
  DELETE_BLOG_CACHE_KEY,
} from "../settings/constants";

const pathPattern = /^\/blog\/([\w_-]+)(?:\/([\w_-]+))?\/?$/;

function BlogProvider({ children }: { children: JSX.Element }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { address } = useParams();
  const [, { isSuccess: blogIsCreated }] = useCreateBlogMutation({
    fixedCacheKey: CREATE_BLOG_CACHE_KEY,
  });
  const [, { isSuccess: blogIsDeleted }] = useDeleteBlogMutation({
    fixedCacheKey: DELETE_BLOG_CACHE_KEY,
  });
  const { setActiveBlog, blogs, activeBlog } = useUserBlog();

  useEffect(() => {
    if (blogIsDeleted && activeBlog) {
      // When blog is deleted, navigate to the home page of next active blog.
      return navigate(`/blog/${activeBlog.address}`);
    }
    const match = pathname.match(pathPattern);
    if (activeBlog && match) {
      navigate(`/blog/${activeBlog.address}/${match[2] || ""}`);
    } else {
      navigate("/new-blog");
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
        message={BLOG_CREATED}
        open={blogIsCreated}
        onClose={() => {
          dispatch(blogApi.util.resetApiState());
        }}
      />
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
