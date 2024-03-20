import { useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { LoadingButton } from "@mui/lab";
import TextInput from "../inputs/TextInput";
import { Category, PostCategory } from "../../features/category/types";
import { CATEGORY_NAME_REQUIRED } from "../../settings/constants";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../features/category/services";
import useUserBlog from "../../features/blog/useUserBlog";
import parseError from "../../utils/parseError";

type CategoryFormProps = {
  category?: Category;
  onCancel?: () => void;
  onCreateCategorySuccess?: () => void;
  onUpdateCategorySuccess?: () => void;
  onCreateCategoryError?: (error: string | string[]) => void;
  onUpdateCategoryError?: (error: string | string[]) => void;
};

function CategoryForm(props: CategoryFormProps) {
  const {
    category,
    onCancel,
    onCreateCategorySuccess,
    onCreateCategoryError,
    onUpdateCategorySuccess,
    onUpdateCategoryError,
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
    {
      isLoading: isCreating,
      isSuccess: createCategorySuccess,
      isError: isCreateCategoryError,
      error: createCategoryError,
      reset: resetCreateCategoryState,
    },
  ] = useCreateCategoryMutation();
  const [
    updateCategory,
    {
      isLoading: isUpdating,
      isSuccess: updateCategorySuccess,
      isError: isUpdateCategoryError,
      error: updateCategoryError,
      reset: resetUpdateCategoryState,
    },
  ] = useUpdateCategoryMutation();

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

  useEffect(() => {
    if (isCreateCategoryError && onCreateCategoryError) {
      onCreateCategoryError(parseError(createCategoryError));
    }
    if (isUpdateCategoryError && onUpdateCategoryError) {
      onUpdateCategoryError(parseError(updateCategoryError));
    }
  }, [
    isCreateCategoryError,
    isUpdateCategoryError,
    createCategoryError,
    updateCategoryError,
  ]);

  useEffect(() => {
    return () => {
      // Reset state on unmounting the form.
      if (category) {
        resetUpdateCategoryState();
      } else {
        resetCreateCategoryState();
      }
    };
  }, []);

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
