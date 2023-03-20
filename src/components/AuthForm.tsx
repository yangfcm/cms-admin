import { useState, useEffect } from "react";
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
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (formData: AuthFormData) => {
    console.log(formData);
  };

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
            required: "Email is required",
            validate: (value) =>
              isValidEmail(value) ? "" : "Email you input is invalid.",
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
            required: "Password is required",
            minLength:
              mode === "signup"
                ? {
                    value: 6,
                    message: "Password should be at least 6 characters.",
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
