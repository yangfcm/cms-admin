import { useEffect } from "react";
import { Outlet, Navigate, useParams, useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import useUserBlog from "../features/blog/useUserBlog";

function BlogProvider({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const { address } = useParams();
  const { setActiveBlog, blogs, activeBlog } = useUserBlog();

  useEffect(() => {
    if (activeBlog) {
      // When blog is deleted, navigate to the home page of next active blog.
      navigate(`/blog/${activeBlog.address}`);
    } else {
      // If the blog deleted is the last blog, navigate to onboarding page.
      navigate("/new-blog");
    }
  }, [activeBlog]);

  useEffect(() => {
    if (address) {
      setActiveBlog(address);
    }
  }, [address]);

  if (!blogs || blogs.length === 0) {
    return <Navigate to="/new-blog" replace />;
  }

  return <>{children}</>;
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
