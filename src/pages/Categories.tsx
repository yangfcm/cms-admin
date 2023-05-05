import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Table from "../components/Table";
import { useReadCategoriesQuery } from "../features/category/services";
import useUserBlog from "../features/blog/useUserBlog";
import { Category } from "../features/category/types";
import { formatDateTime } from "../utils/dateTime";

function Categories() {
  const { activeBlog } = useUserBlog();
  const { data, isSuccess, isError, isLoading } = useReadCategoriesQuery(
    activeBlog?.address || ""
  );

  const columns = [
    { field: "name", title: "Name", editable: true },
    { field: "description", title: "Description", editable: true },
    {
      field: "createdAt",
      title: "Created",
      render: (value: string) => formatDateTime(value),
    },
    {
      field: "updatedAt",
      title: "Last updated",
      render: (value: string) => formatDateTime(value),
    },
  ];

  return (
    <Container>
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Categories Admin
      </Typography>
      <Divider />
      <br />
      <Table
        data={data?.categories || []}
        columns={columns}
        isLoading={isLoading}
        title="Categories List"
        editable={{
          add: {
            labelText: "Add Category",
          },
          onRowAdd: (newData) => {
            console.log(newData);
          },
        }}
      />
    </Container>
  );
}

export default Categories;
