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
import {
  CATEGORY_CREATED,
  CATEGORY_UPDATED,
  CATEGORY_DELETED,
  CATEGORY_DELETE_FIXED_CACHE_KEY,
  CATEGORY_CREATE_FIXED_CACHE_KEY,
  CATEGORY_UPDATE_FIXED_CACHE_KEY,
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

  const [, createCategoryState] = useCreateCategoryMutation({fixedCacheKey: CATEGORY_CREATE_FIXED_CACHE_KEY});
  const [, updateCategoryState] = useUpdateCategoryMutation({fixedCacheKey: CATEGORY_UPDATE_FIXED_CACHE_KEY});
  const [, deleteCategoryState] = useDeleteCategoryMutation({fixedCacheKey: CATEGORY_DELETE_FIXED_CACHE_KEY});

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

  return (
    <Container>
      <ErrorMessage open={hasError} messages={errorMessages} />
      <SuccessMessage
        open={createCategoryState.isSuccess}
        message={CATEGORY_CREATED}
        onClose={createCategoryState.reset}
      />
      <SuccessMessage
        open={updateCategoryState.isSuccess}
        message={CATEGORY_UPDATED}
        onClose={updateCategoryState.reset}
      />
      <SuccessMessage
        open={deleteCategoryState.isSuccess}
        message={CATEGORY_DELETED}
        onClose={deleteCategoryState.reset}
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
