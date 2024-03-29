import { useMemo } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Table from "@yangfcm/react-mui-table";
import {
  useReadCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../features/category/services";
import useUserBlog from "../features/blog/useUserBlog";
// import { Category } from "../features/category/types";
import { formatDateTime } from "../utils/dateTime";
import {
  CATEGORY_CREATED,
  CATEGORY_UPDATED,
  CATEGORY_DELETED,
} from "../settings/constants";
import { Category, PostCategory } from "../features/category/types";
import SnackbarMessage from "../components/SnackbarMessage";
import parseError from "../utils/parseError";

function MuiCategories() {
  const { activeBlog } = useUserBlog();
  const address = activeBlog?.address || "";
  const {
    data,
    isError: isReadCategoriesError,
    isLoading: isReadingCategories,
    error: readCategoriesError,
  } = useReadCategoriesQuery(address);

  const [createCategory, createCategoryState] = useCreateCategoryMutation();
  const [updateCategory, updateCategoryState] = useUpdateCategoryMutation();
  const [deleteCategory, deleteCategoryState] = useDeleteCategoryMutation();

  const isLoading = useMemo(
    () =>
      isReadingCategories ||
      createCategoryState.isLoading ||
      updateCategoryState.isLoading ||
      deleteCategoryState.isLoading,
    [
      isReadingCategories,
      createCategoryState,
      updateCategoryState,
      deleteCategoryState,
    ]
  );
  const hasError = useMemo(
    () =>
      isReadCategoriesError ||
      createCategoryState.isError ||
      updateCategoryState.isError ||
      deleteCategoryState.isError,
    [
      isReadCategoriesError,
      createCategoryState,
      updateCategoryState,
      deleteCategoryState,
    ]
  );
  const errorMessages = useMemo(
    () =>
      readCategoriesError ||
      createCategoryState.error ||
      updateCategoryState.error ||
      deleteCategoryState.error,
    [
      readCategoriesError,
      createCategoryState,
      updateCategoryState,
      deleteCategoryState,
    ]
  );

  const columns = useMemo(() => {
    return [
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
  }, []);

  return (
    <Container>
      <SnackbarMessage open={hasError} message={parseError(errorMessages)} />
      <SnackbarMessage
        open={createCategoryState.isSuccess}
        message={CATEGORY_CREATED}
      />
      <SnackbarMessage
        open={updateCategoryState.isSuccess}
        message={CATEGORY_UPDATED}
      />
      <SnackbarMessage
        open={deleteCategoryState.isSuccess}
        message={CATEGORY_DELETED}
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
        options={{
          sorting: true,
        }}
        editable={{
          add: {
            labelText: "Add Category",
          },
          onRowAdd: (newData: PostCategory) => {
            return new Promise(async (resolve, reject) => {
              const response = await createCategory({
                blogAddress: address,
                category: newData,
              });
              if ("error" in response) {
                reject(response.error);
              } else {
                resolve(response.data);
              }
            });
          },
          onRowEdit: (
            editData: Pick<Category, "id"> & Partial<PostCategory>
          ) => {
            return new Promise(async (resolve, reject) => {
              const response = await updateCategory({
                blogAddress: address,
                category: editData,
              });
              if ("error" in response) {
                reject(response.error);
              } else {
                resolve(response.data);
              }
            });
          },
          onRowDelete: (deleteData: Pick<Category, "id">) => {
            return new Promise(async (resolve, reject) => {
              const response = await deleteCategory({
                blogAddress: address,
                categoryId: deleteData.id,
              });
              if ("error" in response) {
                reject(response.error);
              } else {
                resolve(response.data);
              }
            });
          },
        }}
      />
    </Container>
  );
}

export default MuiCategories;
