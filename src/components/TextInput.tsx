import {
  useController,
  useFormContext,
  ControllerProps,
  UseControllerProps,
  Controller,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";

type TextInputProps = UseControllerProps & {
  id?: string;
  type?: string;
  label?: string;
  defaultValue?: string;
  variant?: "filled" | "outlined" | "standard";
  fullWidth?: boolean;
};

function TextInput(props: TextInputProps) {
  const {
    id,
    label,
    name,
    rules,
    defaultValue,
    type = "text",
    variant = "standard",
    fullWidth = true,
    ...inputProps
  } = props;
  // const { field } = useController({ name, rules, defaultValue });
  const formContext = useFormContext();
  const {
    control,
    formState: { errors },
  } = formContext;
  // console.log(errors);

  if (!name || !formContext) return null;

  return (
    <FormControl variant={variant} fullWidth={fullWidth}>
      {label && <InputLabel htmlFor={id}>{label}</InputLabel>}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <Input {...field} id={id} type={type} />
            <FormHelperText error>
              <>{errors && errors[name] ? errors[name]!.message : ""}</>
            </FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
}

export default TextInput;
