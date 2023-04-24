import { useNavigate } from "react-router";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Header from "../components/Header";
import NewBlogForm from "../components/NewBlogForm";

function Onboarding() {
  const navigate = useNavigate();

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
