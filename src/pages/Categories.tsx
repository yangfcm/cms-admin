import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import useTable from "../components/Table";
import { useReadCategoriesQuery } from "../features/category/services";
import useUserBlog from "../features/blog/useUserBlog";
import { Category } from "../features/category/types";

function Categories() {
  const { activeBlog } = useUserBlog();
  const { data, isSuccess, isError, isLoading } = useReadCategoriesQuery(
    activeBlog?.address || ""
  );

  const Table = useTable<Category>(
    [
      {
        accessorKey: "name",
        header: "Name",
        // accessorFn: (row) => {},
      },
      {
        accessorKey: "description",
        header: "Description",
        // accessorFn: (row) => {},
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
      <Table
        state={{
          isLoading,
        }}
        enableAdding
        addingText="Add category"
        onSave={(data) => {
          console.log(data);
        }}
      />
    </Container>
  );
}

export default Categories;
