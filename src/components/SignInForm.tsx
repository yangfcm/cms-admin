import { useState, useEffect, useCallback } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import LoginIcon from "@mui/icons-material/Login";
import {
  PASSWORD_REQUIRED,
  USERNAME_OR_EMAIL_REQUIRED,
} from "../settings/constants";
import TextInput from "./TextInput";

type SignInFormData = {
  usernameOrEmail: string;
  password: string;
};

function SignInForm() {
  const methods = useForm<SignInFormData>({
    mode: "onSubmit",
    defaultValues: {
      usernameOrEmail: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<SignInFormData> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...(methods as any)}>
      {/* Bypass the TS warning: Type instantiation is excessively deep and
      possibly infinite. ts(2589) */}
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
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
          variant="outlined"
          sx={{ mt: 2 }}
          loadingPosition="start"
          startIcon={<LoginIcon />}
          // loading={authStatus.isLoading}
        >
          Sign in
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}

export default SignInForm;
