import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import useTable from "../components/Table";
import { useReadCategoriesQuery } from "../features/category/services";
import useUserBlog from "../features/blog/useUserBlog";

function Categories() {
  const { activeBlog } = useUserBlog();
  const { data, isSuccess, isError, isLoading } = useReadCategoriesQuery(
    activeBlog?.address || ""
  );

  const Table = useTable(
    [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "description",
        header: "Description",
      },
    ],
    data?.categories || []
  );

  return (
    <Container>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Categories Admin
      </Typography>
      <Divider />
      <br />
      <Table />
    </Container>
  );
}

export default Categories;
