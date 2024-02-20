import {
  useFormContext,
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
  labelShrink?: boolean;
  defaultValue?: string;
  placeholder?: string;
  variant?: "filled" | "outlined" | "standard";
  fullWidth?: boolean;
  startIcon?: JSX.Element;
  autoFocus?: boolean;
};

function TextInput(props: TextInputProps) {
  const {
    id,
    label,
    labelShrink = true,
    name,
    rules,
    type = "text",
    variant = "standard",
    fullWidth = true,
    startIcon = null,
    placeholder,
    autoFocus,
    // ...inputProps
  } = props;
  // const { field } = useController({ name, rules, defaultValue });
  const formContext = useFormContext();
  const {
    control,
    formState: { errors = {} },
  } = formContext;

  if (!name || !formContext) return null;

  return (
    <FormControl variant={variant} fullWidth={fullWidth} margin="dense">
      {label && (
        <InputLabel htmlFor={id} shrink={labelShrink}>
          {label}
        </InputLabel>
      )}
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <Input
              {...field}
              id={id}
              type={type}
              error={!!errors[name]}
              placeholder={placeholder}
              startAdornment={
                startIcon && (
                  <InputAdornment position="start">{startIcon}</InputAdornment>
                )
              }
              autoFocus={autoFocus}
              key={name}
            />
            <FormHelperText error sx={{ height: "20px" }}>
              <>{errors && errors[name] ? errors[name]!.message : ""}</>
            </FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
}

export default TextInput;
