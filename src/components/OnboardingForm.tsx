import { useCallback } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import LoadingButton from "@mui/lab/LoadingButton";
import TextInput from "./TextInput";

type OnboardingFormData = {
  title: string;
  address: string;
};

function OnboardingForm() {
  const methods = useForm<OnboardingFormData>({
    mode: "onSubmit",
    defaultValues: {
      title: "",
      address: "",
    },
  });

  const onSubmit: SubmitHandler<OnboardingFormData> = useCallback((data) => {
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
        />
        <TextInput
          name="address"
          id="onboarding-address-input"
          label="Blog Address (People can find your blog via the below URL.)"
          startIcon={<>https://domain.com/blog/</>}
        />
        <LoadingButton type="submit" fullWidth variant="contained">
          Create
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}

export default OnboardingForm;
