import { useCallback } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import TextInput from "./TextInput";
import {
  BLOG_ADDRESS_REQUIRED,
  BLOG_TITLE_MAX_LENGTH,
  BLOG_TITLE_REQUIRED,
  BLOG_TITLE_TOO_LONG,
} from "../settings/constants";

type NewBlogData = {
  title: string;
  address: string;
};

function NewBlogForm() {
  const methods = useForm<NewBlogData>({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      address: "",
    },
  });

  const onSubmit: SubmitHandler<NewBlogData> = useCallback((data) => {
    console.log(data);
  }, []);

  return (
    <FormProvider {...(methods as any)}>
      <Typography variant="h4" sx={{ marginBottom: 4 }}>
        Create a blog
      </Typography>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <TextInput
          name="title"
          id="onboarding-title-input"
          label="Blog Name (The title that will be displayed on top of your blog.)"
          rules={{
            required: BLOG_TITLE_REQUIRED,
            maxLength: {
              value: BLOG_TITLE_MAX_LENGTH,
              message: BLOG_TITLE_TOO_LONG,
            },
          }}
        />
        <TextInput
          name="address"
          id="onboarding-address-input"
          label="Blog Address (People can find your blog via the below URL.)"
          startIcon={<>https://domain.com/blog/</>}
          rules={{
            required: BLOG_ADDRESS_REQUIRED,
          }}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
        >
          Create
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}

export default NewBlogForm;
