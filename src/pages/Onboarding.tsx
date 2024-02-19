import { useNavigate } from "react-router";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Header from "../components/Header";
import NewBlogForm from "../components/forms/NewBlogForm";

function Onboarding() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Box id="app__main">
        <Toolbar />
        <Container maxWidth="sm">
          <Box
            sx={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ marginBottom: 4 }}>
              Create a blog
            </Typography>
            <NewBlogForm
              onSuccess={(blog) => {
                return navigate(`/blog/${blog.address}`, { replace: true });
              }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Onboarding;
