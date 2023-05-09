import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Table from "../components/Table";
import ErrorMessage from "../components/ErrorMessage";
import {
  useReadCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../features/category/services";
import useUserBlog from "../features/blog/useUserBlog";
import { Category } from "../features/category/types";
import { formatDateTime } from "../utils/dateTime";

function Categories() {
  const { activeBlog } = useUserBlog();
  const address = activeBlog?.address || "";
  const {
    data,
    isSuccess: isReadingCategoriesSuccess,
    isError: isReadingCategoriesError,
    isLoading: isReadingCategories,
  } = useReadCategoriesQuery(address);

  const [createCategory, createCategoryState] = useCreateCategoryMutation();
  const [updateCategory, updateCategoryState] = useUpdateCategoryMutation();
  const [deleteCategory, deleteCategoryState] = useDeleteCategoryMutation();

  const isLoading = isReadingCategories || createCategoryState.isLoading;

  const columns = [
    {
      field: "name",
      title: "Name",
      editable: true,
      input: {
        name: "name",
        placeholder: "Name",
      },
    },
    {
      field: "description",
      title: "Description",
      editable: true,
      input: {
        name: "description",
        placeholder: "Description",
      },
    },
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
      <ErrorMessage
        open={createCategoryState.isError}
        messages={createCategoryState.error}
      />
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
            createCategory({
              blogAddress: address,
              category: newData,
            });
          },
          onRowEdit: (editData) => {
            console.log("edit", editData);
          },
        }}
      />
    </Container>
  );
}

export default Categories;
