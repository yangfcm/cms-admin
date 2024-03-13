import {
  useFormContext,
  UseControllerProps,
  Controller,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";

type SelectInputProps = UseControllerProps & {
  options: { value: string | number; label: string }[];
  id?: string;
  label?: string;
  disabled?: boolean;
};

function SelectInput(props: SelectInputProps) {
  const {
    id,
    label = "Selection",
    name,
    options,
    disabled = false,
    rules,
  } = props;
  const formContext = useFormContext();
  const {
    control,
    formState: { errors = {} },
  } = formContext;

  return (
    <FormControl fullWidth error={!!errors[name]}>
      <InputLabel id={id}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => (
          <>
            <Select {...field} labelId={id} label={label} disabled={disabled}>
              {options.map((option) => (
                <MenuItem value={option.value} key={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText error sx={{ height: "20px", marginLeft: 0 }}>
              <>{errors[name]?.message || ""}</>
            </FormHelperText>
          </>
        )}
      />
    </FormControl>
  );
}

export default SelectInput;
