// import { useEffect, useCallback } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
// import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
// import CreateIcon from "@mui/icons-material/Create";
// import LoadingButton from "@mui/lab/LoadingButton";
// import TextInput from "./TextInput";
// import ErrorMessage from "./ErrorMessage";
// import {
//   BLOG_ADDRESS_REQUIRED,
//   BLOG_ADDRESS_INVALID,
//   BLOG_TITLE_MAX_LENGTH,
//   BLOG_TITLE_REQUIRED,
//   BLOG_TITLE_TOO_LONG,
//   CREATE_BLOG_CACHE_KEY,
// } from "../settings/constants";
// import { useCreateBlogMutation } from "../features/blog/services";
// import { isValidCharacters } from "../utils/validators";
import { Blog, PostBlog } from "../features/blog/types";

type BlogSettingsFormProps = {
  blog: Blog;
};

function BlogSettingsForm(props: BlogSettingsFormProps) {
  const { blog } = props;

  const methods = useForm<PostBlog>({
    mode: "onSubmit",
    defaultValues: {},
  });

  return (
    <FormProvider {...(methods as any)}>
      <Typography variant="h5" sx={{ marginBottom: 4 }}>
        Other blog settings.
      </Typography>
    </FormProvider>
  );
}

export default BlogSettingsForm;
