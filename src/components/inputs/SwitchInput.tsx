import {
  Controller,
  useFormContext,
  UseControllerProps,
} from "react-hook-form";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";

type SwitchInputProps = UseControllerProps & {
  id?: string;
  label?: string;
  legend?: string;
  helperText?: string;
};

function SwitchInput(props: SwitchInputProps) {
  const { id, name, label = "Switch Label", legend, helperText } = props;
  const { control } = useFormContext();

  return (
    <FormControl id={id} component="fieldset" variant="standard">
      {legend && <FormLabel component="legend">{legend}</FormLabel>}
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Switch />}
            label={label}
            checked={field.value}
            onChange={field.onChange}
          />
        )}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export default SwitchInput;
