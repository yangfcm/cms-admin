import { useCallback, useEffect, useMemo } from "react";
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
import CategoriesTable from "../components/categories/CategoriesTable";
import Loader from "../components/Loader";
import PageTitle from "../components/PageTitle";

function Categories() {
  const { activeBlog } = useUserBlog();
  const address = activeBlog?.address || "";
  const {
    data,
    isError: isReadCategoriesError,
    isLoading: isReadingCategories,
    error: readCategoriesError,
  } = useReadCategoriesQuery(address);

  const [, createCategoryState] = useCreateCategoryMutation({
    fixedCacheKey: CATEGORY_CREATE_FIXED_CACHE_KEY,
  });
  const [, updateCategoryState] = useUpdateCategoryMutation({
    fixedCacheKey: CATEGORY_UPDATE_FIXED_CACHE_KEY,
  });
  const [, deleteCategoryState] = useDeleteCategoryMutation({
    fixedCacheKey: CATEGORY_DELETE_FIXED_CACHE_KEY,
  });

  const hasError = useMemo(
    () =>
      isReadCategoriesError ||
      createCategoryState.isError ||
      updateCategoryState.isError ||
      deleteCategoryState.isError,
    [
      isReadCategoriesError,
      createCategoryState.isError,
      updateCategoryState.isError,
      deleteCategoryState.isError,
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
      createCategoryState.error,
      updateCategoryState.error,
      deleteCategoryState.error,
    ]
  );

  const reset = useCallback(() => {
    createCategoryState.reset();
    updateCategoryState.reset();
    deleteCategoryState.reset();
  }, [
    createCategoryState.reset,
    updateCategoryState.reset,
    deleteCategoryState.reset,
  ]);

  useEffect(() => {
    reset();
  }, []);

  return (
    <Container>
      <ErrorMessage open={hasError} messages={errorMessages} onClose={reset} />
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
      <PageTitle title="Categories Admin" />
      {isReadingCategories && <Loader />}
      {!isReadingCategories && (
        <CategoriesTable categories={data?.categories || []} />
      )}
    </Container>
  );
}

export default Categories;
