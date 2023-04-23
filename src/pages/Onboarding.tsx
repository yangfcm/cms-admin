import { Navigate } from "react-router";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import useUserBlog from "../features/blog/useUserBlog";
import Header from "../components/Header";
import NewBlogForm from "../components/NewBlogForm";

function Onboarding() {
  const { activeBlog } = useUserBlog();

  if (activeBlog) {
    return <Navigate to={`/blog/${activeBlog.address}`} replace />;
  }
  return (
    <>
      <Header />
      <Box id="app__main">
        <Toolbar />
        <Container maxWidth="xs">
          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <NewBlogForm />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Onboarding;
