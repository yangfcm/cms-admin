import { useEffect, useCallback } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import CreateIcon from "@mui/icons-material/Create";
import LoadingButton from "@mui/lab/LoadingButton";
import TextInput from "./TextInput";
import ErrorMessage from "./ErrorMessage";
import {
  BLOG_ADDRESS_REQUIRED,
  BLOG_ADDRESS_INVALID,
  BLOG_TITLE_MAX_LENGTH,
  BLOG_TITLE_REQUIRED,
  BLOG_TITLE_TOO_LONG,
  CREATE_BLOG_CACHE_KEY,
} from "../settings/constants";
import {
  useCreateBlogMutation,
  useUpdateBlogMutation,
} from "../features/blog/services";
import { isValidCharacters } from "../utils/validators";
import { Blog, PostBlog } from "../features/blog/types";

type NewBlogFormProps = {
  blog?: Blog;
  onSuccess?: (postBlogData: PostBlog) => void;
};

function NewBlogForm(props: NewBlogFormProps) {
  const { blog, onSuccess } = props;
  const methods = useForm<PostBlog>({
    mode: "onSubmit",
    defaultValues: {
      title: blog ? blog.title : "",
      address: blog ? blog.address : "",
    },
  });

  const [createBlog, { isError, isLoading, error, isSuccess }] =
    useCreateBlogMutation({
      fixedCacheKey: CREATE_BLOG_CACHE_KEY,
    });

  const [updateBlog, state] = useUpdateBlogMutation({
    fixedCacheKey: CREATE_BLOG_CACHE_KEY,
  });

  useEffect(() => {
    const values = methods.getValues();
    if (onSuccess && isSuccess) {
      onSuccess(values);
    }
  }, [isSuccess]);

  const onSubmit: SubmitHandler<PostBlog> = useCallback(
    (data) => {
      if (blog) {
        updateBlog({ id: blog.id, ...data });
      } else {
        createBlog(data);
      }
    },
    [createBlog]
  );

  return (
    <FormProvider {...(methods as any)}>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <ErrorMessage open={isError} messages={error} />
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
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          loadingPosition="start"
          startIcon={<CreateIcon />}
          loading={isLoading}
        >
          {blog ? "Save" : "Create Blog"}
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}

export default NewBlogForm;
