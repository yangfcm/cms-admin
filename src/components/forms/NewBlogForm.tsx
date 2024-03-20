import { useEffect, useCallback } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CreateIcon from "@mui/icons-material/Create";
import LoadingButton from "@mui/lab/LoadingButton";
import Button from "@mui/material/Button";
import TextInput from "../inputs/TextInput";
import {
  BLOG_ADDRESS_REQUIRED,
  BLOG_ADDRESS_INVALID,
  BLOG_TITLE_MAX_LENGTH,
  BLOG_TITLE_REQUIRED,
  BLOG_TITLE_TOO_LONG,
  CREATE_BLOG_CACHE_KEY,
  BLOG_CREATED,
  BLOG_UPDATED,
  BLOG_CREATED_ERROR,
  BLOG_UPDATED_ERROR,
} from "../../settings/constants";
import {
  useCreateBlogMutation,
  useUpdateBlogMutation,
} from "../../features/blog/services";
import { isValidCharacters } from "../../utils/validators";
import { Blog, PostBlog } from "../../features/blog/types";
import UndoIcon from "@mui/icons-material/Undo";
import { useSnackbar } from "../SnackbarProvider";
import parseError from "../../utils/parseError";

type NewBlogFormProps = {
  blog?: Blog;
  onSuccess?: (postBlogData: PostBlog) => void;
};

function NewBlogForm(props: NewBlogFormProps) {
  const { blog, onSuccess } = props;
  const { addSnackbar } = useSnackbar();

  const methods = useForm<PostBlog>({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      address: "",
    },
  });

  useEffect(() => {
    if (blog) {
      methods.reset({
        title: blog.title,
        address: blog.address,
      });
    }
  }, [blog]);

  const [
    createBlog,
    {
      isError: hasCreateError,
      isLoading: isCreating,
      error: createError,
      isSuccess: isCreateSuccess,
      reset: resetCreateState,
    },
  ] = useCreateBlogMutation({
    fixedCacheKey: CREATE_BLOG_CACHE_KEY,
  });

  const [
    updateBlog,
    {
      isError: hasUpdateError,
      isLoading: isUpdating,
      error: updateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateBlogMutation();
  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    const values = methods.getValues();
    if (onSuccess && (isCreateSuccess || isUpdateSuccess)) {
      addSnackbar({
        message: BLOG_CREATED,
        severity: "success",
        onClose: resetCreateState,
      });
      onSuccess(values);
    }
    if (isUpdateSuccess) {
      // Reset form with new values on updating success.
      addSnackbar({
        message: BLOG_UPDATED,
        severity: "success",
      });
      methods.reset({
        ...blog,
        ...methods.getValues(),
      });
    }
  }, [isCreateSuccess, isUpdateSuccess]);

  useEffect(() => {
    if (hasCreateError) {
      addSnackbar({
        title: BLOG_CREATED_ERROR,
        message: parseError(createError),
        severity: "error",
      });
    }
    if (hasUpdateError) {
      addSnackbar({
        title: BLOG_UPDATED_ERROR,
        message: parseError(updateError),
        severity: "error",
      });
    }
  }, [hasCreateError, hasUpdateError, createError, updateError]);

  const onSubmit: SubmitHandler<PostBlog> = useCallback(
    (data) => {
      if (blog) {
        const patchedBlog: Partial<PostBlog> = {};
        if (data.title.trim() !== blog.title) patchedBlog.title = data.title;
        if (data.address.trim().toLowerCase() !== blog.address)
          patchedBlog.address = data.address;
        if (Object.keys(patchedBlog).length === 0) return;
        updateBlog({ id: blog.id, ...patchedBlog });
      } else {
        createBlog(data);
      }
    },
    [createBlog, blog]
  );
  const { isDirty } = methods.formState;

  return (
    <FormProvider {...(methods as any)}>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput
          name="title"
          id="onboarding-title-input"
          label="Blog Name (The title that will be displayed on top of your blog.)"
          rules={{
            validate: (value) => (value.trim() ? true : BLOG_TITLE_REQUIRED),
            maxLength: {
              value: BLOG_TITLE_MAX_LENGTH,
              message: BLOG_TITLE_TOO_LONG,
            },
          }}
          autoFocus
        />
        <TextInput
          name="address"
          id="onboarding-address-input"
          label="Blog Address (People can find your blog via the below URL.)"
          startIcon={<>https://domain.com/blog/</>}
          rules={{
            validate: (value) =>
              !value.trim()
                ? BLOG_ADDRESS_REQUIRED
                : !isValidCharacters(value)
                ? BLOG_ADDRESS_INVALID
                : true,
          }}
        />
        <Stack direction="row" justifyContent="center" spacing={2}>
          {blog && (
            <Button
              variant="contained"
              color="inherit"
              disabled={!isDirty}
              startIcon={<UndoIcon />}
              onClick={() => methods.reset()}
            >
              Reset
            </Button>
          )}
          <LoadingButton
            type="submit"
            variant="contained"
            loadingPosition="start"
            startIcon={<CreateIcon />}
            loading={isLoading}
            disabled={!isDirty}
          >
            {blog ? "Save" : "Create Blog"}
          </LoadingButton>
        </Stack>
      </Box>
    </FormProvider>
  );
}

export default NewBlogForm;
