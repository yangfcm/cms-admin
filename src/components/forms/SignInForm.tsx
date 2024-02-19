import { useCallback } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import LoginIcon from "@mui/icons-material/Login";
import {
  PASSWORD_REQUIRED,
  USERNAME_OR_EMAIL_REQUIRED,
} from "../../settings/constants";
import TextInput from "../inputs/TextInput";
import { useSigninMutation } from "../../features/user/services";
import ErrorMessage from "../ErrorMessage";

type SignInFormData = {
  usernameOrEmail: string;
  password: string;
};

function SignInForm() {
  const [signin, { isError, isLoading, error }] = useSigninMutation();

  const methods = useForm<SignInFormData>({
    mode: "onSubmit",
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInFormData> = useCallback(signin, [signin]);

  return (
    <FormProvider {...(methods as any)}>
      {/* Bypass the TS warning: Type instantiation is excessively deep and
      possibly infinite. ts(2589) */}
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <ErrorMessage open={isError} messages={error} />
        <TextInput
          name="usernameOrEmail"
          id="signin-username-input"
          label="Email or Uername"
          placeholder="Use Email or username to login"
          startIcon={<AccountCircle />}
          rules={{
            required: USERNAME_OR_EMAIL_REQUIRED,
          }}
        />
        <TextInput
          name="password"
          id="signin-password-input"
          type="password"
          label="Password"
          placeholder="Password"
          startIcon={<PasswordIcon />}
          rules={{
            required: PASSWORD_REQUIRED,
          }}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          loadingPosition="start"
          startIcon={<LoginIcon />}
          loading={isLoading}
        >
          Sign in
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}

export default SignInForm;
