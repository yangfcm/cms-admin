import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Table from "../components/Table";
import { useReadCategoriesQuery } from "../features/category/services";
import useUserBlog from "../features/blog/useUserBlog";

function Categories() {
  const { activeBlog } = useUserBlog();
  const { data, isSuccess, isError, isLoading } = useReadCategoriesQuery(
    activeBlog?.address || ""
  );

  return (
    <Container>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Categories Admin
      </Typography>
      <Divider />
      <br />
      <Table
        data={data?.categories || []}
        columns={[
          {
            accessorKey: "name",
            header: "Name",
          },
          {
            accessorKey: "description",
            header: "Description",
          },
        ]}
        state={{
          isLoading,
        }}
      />
    </Container>
  );
}

export default Categories;
