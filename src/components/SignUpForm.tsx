import { useCallback } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import Box from "@mui/material/Box";
import { LoadingButton } from "@mui/lab";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useSignupMutation } from "../features/user/services";
import { isValidEmail, isValidCharacters } from "../utils/validators";
import {
  EMAIL_REQUIRED,
  INVALID_EMAIL,
  PASSWORD_TOO_SHORT,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REQUIRED,
  USERNAME_REQUIRED,
  INVALID_USERNAME,
  USERNAME_MAX_LENGTH,
  USERNAME_TOO_LONG,
} from "../settings/constants";
import TextInput from "./TextInput";
import ErrorMessage from "./ErrorMessage";

type SignUpFormData = {
  email: string;
  username: string;
  password: string;
};

function SignUpForm() {
  const methods = useForm<SignUpFormData>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      username: "",
      password: "",
    },
  });
  const [signupMutation, { isError, isLoading, error }] = useSignupMutation();

  const onSubmit: SubmitHandler<SignUpFormData> = useCallback(signupMutation, [
    signupMutation,
  ]);

  return (
    <FormProvider {...(methods as any)}>
      {/* Bypass the TS warning: Type instantiation is excessively deep and
      possibly infinite. ts(2589) */}
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        <ErrorMessage open={isError} messages={error} />
        <TextInput
          name="email"
          id="signup-email-input"
          label="Email"
          placeholder="Your email"
          startIcon={<MailOutlineIcon />}
          rules={{
            required: EMAIL_REQUIRED,
            validate: (value) => (isValidEmail(value) ? true : INVALID_EMAIL),
          }}
        />
        <TextInput
          name="username"
          id="signup-username-input"
          label="Username"
          placeholder="Your username"
          startIcon={<AccountCircle />}
          rules={{
            required: USERNAME_REQUIRED,
            validate: (value) =>
              isValidCharacters(value) ? true : INVALID_USERNAME,
            maxLength: {
              value: USERNAME_MAX_LENGTH,
              message: USERNAME_TOO_LONG,
            },
          }}
        />
        <TextInput
          name="password"
          id="signup-password-input"
          type="password"
          label="Password"
          placeholder="Your password"
          startIcon={<PasswordIcon />}
          rules={{
            required: PASSWORD_REQUIRED,
            minLength: {
              value: PASSWORD_MIN_LENGTH,
              message: PASSWORD_TOO_SHORT,
            },
          }}
        />
        <LoadingButton
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 2 }}
          loadingPosition="start"
          startIcon={<PersonAddAlt1Icon />}
          loading={isLoading}
        >
          Sign up
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}

export default SignUpForm;
