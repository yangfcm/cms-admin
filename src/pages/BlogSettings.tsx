import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import useUserBlog from "../features/blog/useUserBlog";
import NewBlogForm from "../components/NewBlogForm";

function BlogSettings() {
  const { activeBlog } = useUserBlog();
  if (!activeBlog) return null;

  return (
    <>
      <Container maxWidth="sm" sx={{ marginLeft: "inherit" }}>
        <Typography variant="h6" sx={{ marginBottom: 1 }}>
          Basic Settings
        </Typography>
        <NewBlogForm
          blog={activeBlog}
          onSuccess={(blog) => {
            console.log(blog);
          }}
        />
      </Container>
    </>
  );
}

export default BlogSettings;
