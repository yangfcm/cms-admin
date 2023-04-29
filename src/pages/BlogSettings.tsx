import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import useUserBlog from "../features/blog/useUserBlog";
import NewBlogForm from "../components/NewBlogForm";
import { red } from "@mui/material/colors";

function BlogSettings() {
  const { activeBlog } = useUserBlog();
  if (!activeBlog) return null;

  return (
    <>
      <Container maxWidth="sm" sx={{ marginLeft: "inherit" }}>
        <Typography variant="h5" sx={{ marginBottom: 1 }}>
          Basic Settings
        </Typography>
        <Divider />
        <NewBlogForm blog={activeBlog} />
        <br />
        <Typography color={red[900]} variant="h5" sx={{ marginBottom: 1 }}>
          Danger Zone
        </Typography>
        <Divider />
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <div>
            <Typography variant="h6">Delete blog</Typography>
            <Typography variant="body2">
              You will lose everything in blog -{" "}
              <strong>{activeBlog.title}</strong> permanently
            </Typography>
          </div>
          <Button variant="contained" color="error">
            Delete Blog
          </Button>
        </Stack>
      </Container>
    </>
  );
}

export default BlogSettings;
