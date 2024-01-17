import { useMemo } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
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
import CategoriesTable from "../components/CategoriesTable";

function Categories() {
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
      <ErrorMessage open={hasError} messages={errorMessages} />
      <SuccessMessage
        open={createCategoryState.isSuccess}
        message={CATEGORY_CREATED}
      />
      <SuccessMessage
        open={updateCategoryState.isSuccess}
        message={CATEGORY_UPDATED}
      />
      <SuccessMessage
        open={deleteCategoryState.isSuccess}
        message={CATEGORY_DELETED}
      />
      <Typography variant="h5" sx={{ marginBottom: 1 }}>
        Categories Admin
      </Typography>
      <Divider />
      <br />
      <CategoriesTable categories={data?.categories || []} />
    </Container>
  );
}

export default Categories;
