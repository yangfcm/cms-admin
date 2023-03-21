import { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import { LoadingButton } from "@mui/lab";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PasswordIcon from "@mui/icons-material/Password";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import { isValidEmail } from "../utils/validators";
import {
  EMAIL_REQUIRED,
  INVALID_EMAIL,
  PASSWORD_TOO_SHORT,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REQUIRED,
} from "../settings/constants";

type AuthFormProps = {
  mode: "signin" | "signup";
};

type AuthFormData = {
  email: string;
  password: string;
};

function AuthForm({ mode }: AuthFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useCallback((formData: AuthFormData) => {
    console.log("submit!", formData);
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl variant="standard" fullWidth margin="normal">
        <InputLabel htmlFor="auth__email-input" shrink>
          Email
        </InputLabel>
        <Controller
          name="email"
          control={control}
          rules={{
            required: EMAIL_REQUIRED,
            validate: (value) => (isValidEmail(value) ? true : INVALID_EMAIL),
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                id="auth__email-input"
                error={!!errors.email?.message}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
              <FormHelperText error>{errors.email?.message}</FormHelperText>
            </>
          )}
        />
      </FormControl>
      <FormControl variant="standard" fullWidth margin="normal">
        <InputLabel htmlFor="auth__password-input" shrink>
          Password
        </InputLabel>
        <Controller
          name="password"
          control={control}
          rules={{
            required: PASSWORD_REQUIRED,
            minLength:
              mode === "signup"
                ? {
                    value: PASSWORD_MIN_LENGTH,
                    message: PASSWORD_TOO_SHORT,
                  }
                : 0,
          }}
          render={({ field }) => (
            <>
              <Input
                {...field}
                id="auth__password-input"
                type="password"
                error={!!errors.password?.message}
                startAdornment={
                  <InputAdornment position="start">
                    <PasswordIcon />
                  </InputAdornment>
                }
              />
              {errors.password && (
                <FormHelperText error>
                  {errors.password?.message}
                </FormHelperText>
              )}
              {/* {localAuthError && (
                <Stack sx={{ marginTop: 2 }}>
                  <Alert
                    severity="error"
                    onClose={() => {
                      setLocalAuthError(null);
                    }}
                  >
                    {localAuthError}
                  </Alert>
                </Stack>
              )} */}
            </>
          )}
        />
      </FormControl>
      <LoadingButton
        type="submit"
        fullWidth
        variant="outlined"
        sx={{ mt: 2 }}
        loadingPosition="start"
        startIcon={mode === "signup" ? <PersonAddAlt1Icon /> : <LoginIcon />}
        // loading={authStatus.isLoading}
      >
        {mode === "signup" ? "Sign Up" : "Sign In"}
      </LoadingButton>
    </Box>
  );
}

export default AuthForm;
