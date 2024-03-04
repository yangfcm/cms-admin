import {
  useFormContext,
  UseControllerProps,
  Controller,
} from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type SelectInputProps = UseControllerProps & {
  id?: string;
  label?: string;
  options: { value: string | number; label: string }[];
};

function SelectInput(props: SelectInputProps) {
  const { id, label = "Selection", name, options } = props;
  const formContext = useFormContext();
  const { control } = formContext;
  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select labelId={id} label={label} {...field}>
            {options.map((option) => (
              <MenuItem value={option.value} key={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
      />
    </FormControl>
  );
}

export default SelectInput;
