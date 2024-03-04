import {
  useFormContext,
  UseControllerProps,
  Controller,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type MultiSelectInputProps = UseControllerProps & {
  id?: string;
  label?: string;
  options: { value: string | number; label: string }[];
};

function MultiSelectInput(props: MultiSelectInputProps) {
  const { id, label = "Multi-select", name, options } = props;
  const formContext = useFormContext();
  const { control } = formContext;

  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={[]} /** @TODO Fix defaultValue. */
        render={({ field }) => (
          <Select labelId={id} label={label} multiple {...field}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}

export default MultiSelectInput;
