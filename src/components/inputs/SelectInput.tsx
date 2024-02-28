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
  labelId?: string;
};

function SelectInput(props: SelectInputProps) {
  const { id, label = "Selection", name } = props;
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
            <MenuItem value="item1">item1</MenuItem>
            <MenuItem value="item2">item2</MenuItem>
            <MenuItem value="item3">item3</MenuItem>
          </Select>
        )}
      />
    </FormControl>
  );
}

export default SelectInput;
