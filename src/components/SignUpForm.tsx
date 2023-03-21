import { useState, useEffect, useCallback } from "react";
import {
  useForm,
  FormProvider,
  SubmitHandler,
  FormProviderProps,
} from "react-hook-form";
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
  PASSWORD_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_REQUIRED,
} from "../settings/constants";
import TextInput from "./TextInput";

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

  const onSubmit: SubmitHandler<SignUpFormData> = (data) => {
    console.log(data);
  };

  return (
    <FormProvider {...(methods as any)}>
      {/* Bypass the TS warning: Type instantiation is excessively deep and
      possibly infinite. ts(2589) */}
      <TextInput name="email" label="Email" rules={{ required: true }} />
      <TextInput name="username" label="Username" rules={{ required: true }} />
      <TextInput
        name="password"
        type="password"
        label="Password"
        rules={{ required: true }}
      />
      <button onClick={methods.handleSubmit(onSubmit)}>Sign Up</button>
    </FormProvider>
  );
}

export default SignUpForm;
