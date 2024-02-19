import { useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { LoadingButton } from "@mui/lab";
import TextInput from "../inputs/TextInput";
import { Category, PostCategory } from "../../features/category/types";
import {
  CATEGORY_CREATE_FIXED_CACHE_KEY,
  CATEGORY_NAME_REQUIRED,
  CATEGORY_UPDATE_FIXED_CACHE_KEY,
} from "../../settings/constants";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../features/category/services";
import useUserBlog from "../../features/blog/useUserBlog";

type CategoryFormProps = {
  category?: Category;
  onCancel?: () => void;
  onCreateCategorySuccess?: () => void;
  onUpdateCategorySuccess?: () => void;
};

function CategoryForm(props: CategoryFormProps) {
  const {
    category,
    onCancel,
    onCreateCategorySuccess,
    onUpdateCategorySuccess,
  } = props;
  const { activeBlogAddress } = useUserBlog();

  const methods = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: category ? category.name : "",
      description: category ? category.description : "",
    },
  });

  const [
    createCategory,
    { isLoading: isCreating, isSuccess: createCategorySuccess },
  ] = useCreateCategoryMutation({
    fixedCacheKey: CATEGORY_CREATE_FIXED_CACHE_KEY,
  });
  const [
    updateCategory,
    { isLoading: isUpdating, isSuccess: updateCategorySuccess },
  ] = useUpdateCategoryMutation({
    fixedCacheKey: CATEGORY_UPDATE_FIXED_CACHE_KEY,
  });

  const onSubmit = useCallback(
    (data: PostCategory) => {
      if (category) {
        updateCategory({
          blogAddress: activeBlogAddress,
          category: {
            ...data,
            id: category.id,
          },
        });
      } else {
        createCategory({
          blogAddress: activeBlogAddress,
          category: data,
        });
      }
    },
    [activeBlogAddress, updateCategory, createCategory]
  );

  useEffect(() => {
    if (createCategorySuccess && onCreateCategorySuccess) {
      onCreateCategorySuccess();
    }
    if (updateCategorySuccess && onUpdateCategorySuccess) {
      onUpdateCategorySuccess();
    }
  }, [createCategorySuccess, updateCategorySuccess]);

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput
          name="name"
          id="category-name-input"
          label="Name"
          placeholder="Name"
          rules={{
            required: CATEGORY_NAME_REQUIRED,
          }}
        />
        <TextInput
          name="description"
          id="category-description-input"
          label="Description"
          placeholder="Description"
        />
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={1}
        >
          <Button
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            disabled={isCreating || isUpdating}
          >
            Cancel
          </Button>
          <LoadingButton type="submit" loading={isCreating || isUpdating}>
            Submit
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}

export default CategoryForm;
