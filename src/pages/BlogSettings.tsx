import { useState, useCallback, useEffect } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { red } from "@mui/material/colors";
import useUserBlog from "../features/blog/useUserBlog";
import NewBlogForm from "../components/NewBlogForm";
import ConfirmDialog from "../components/ConfirmDialog";
import ErrorMessage from "../components/ErrorMessage";
import { Blog } from "../features/blog/types";
import { useDeleteBlogMutation } from "../features/blog/services";
import { DELETE_BLOG_CACHE_KEY } from "../settings/constants";
import PageTitle from "../components/PageTitle";

type DeleteBlogButtonProps = {
  blog: Blog;
  onSuccess?: () => void;
};

function DeleteBlogButton({ blog, onSuccess }: DeleteBlogButtonProps) {
  const [open, setOpen] = useState(false);
  const [deleteBlog, { isError, isLoading, error, isSuccess }] =
    useDeleteBlogMutation({
      fixedCacheKey: DELETE_BLOG_CACHE_KEY,
    });

  const handleDeleteDialog = useCallback(() => {
    deleteBlog(blog.id);
  }, [blog]);

  useEffect(() => {
    if (isSuccess && onSuccess) {
      onSuccess();
    }
  }, [isSuccess]);

  return (
    <>
      <ErrorMessage open={isError} messages={error} />
      <Button variant="contained" color="error" onClick={() => setOpen(true)}>
        Delete Blog
      </Button>
      <ConfirmDialog
        open={open}
        title="Are you sure to delete the blog?"
        onCancel={() => setOpen(false)}
        onConfirm={handleDeleteDialog}
        isLoading={isLoading}
      />
    </>
  );
}

function BlogSettings() {
  const { activeBlog } = useUserBlog();
  if (!activeBlog) return null;

  return (
    <>
      <Container maxWidth="md" sx={{ marginLeft: "inherit" }}>
        <PageTitle title="Blog Settings" />
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
          <DeleteBlogButton blog={activeBlog} />
        </Stack>
      </Container>
    </>
  );
}

export default BlogSettings;
