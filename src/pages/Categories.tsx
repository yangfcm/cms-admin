import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useReadCategoriesQuery } from "../features/category/services";
import useUserBlog from "../features/blog/useUserBlog";

function Categories() {
  const { activeBlog } = useUserBlog();
  const { data, isSuccess, isError } = useReadCategoriesQuery(
    activeBlog?.address || ""
  );
  return (
    <Container>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Categories Admin
      </Typography>
      <Divider />
    </Container>
  );
}

export default Categories;
