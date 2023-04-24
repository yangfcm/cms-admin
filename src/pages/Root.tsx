import { useEffect } from "react";
import { Outlet, Navigate, useParams } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SuccessMessage from "../components/SuccessMessage";
import useUserBlog from "../features/blog/useUserBlog";
import { useCreateBlogMutation } from "../features/blog/services";
import { BLOG_CREATED } from "../settings/constants";

function BlogProvider({ children }: { children: JSX.Element }) {
  const { address } = useParams();
  // const [createBlog, { isSuccess: blogIsCreated }] = useCreateBlogMutation({
  //   fixedCacheKey: "createBlogMutationKey",
  // });
  const { setActiveBlog } = useUserBlog();
  // console.log(blogIsCreated);

  useEffect(() => {
    if (address) {
      setActiveBlog(address);
    }
  }, [address]);

  return (
    <>
      {/* <SuccessMessage message={BLOG_CREATED} open={blogIsCreated} /> */}
      {children}
    </>
  );
}

function Root() {
  const { blogs } = useUserBlog();

  if (!blogs || blogs.length === 0) {
    return <Navigate to="/onboarding" replace />;
  }

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
                <div>Rootpage</div>
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
