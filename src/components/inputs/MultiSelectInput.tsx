import {
  useFormContext,
  UseControllerProps,
  Controller,
} from "react-hook-form";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type MultiSelectInputProps = UseControllerProps & {
  options: { value: string | number; label: string }[];
  id?: string;
  label?: string;
  disabled?: boolean;
};

function getStyles(option: string, selected: string[], theme: Theme) {
  return {
    fontWeight:
      selected.indexOf(option) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultiSelectInput(props: MultiSelectInputProps) {
  const theme = useTheme();
  const { id, label = "Multi-select", name, options, disabled = false } = props;
  const formContext = useFormContext();
  const { control } = formContext;
  const optionsObj = options.reduce((result, item) => {
    result[item.value as string] = item.label;
    return result;
  }, {} as Record<string, string>);

  return (
    <FormControl fullWidth>
      <InputLabel id={id}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        defaultValue={[]} /** @TODO Fix defaultValue. */
        render={({ field }) => (
          <Select
            {...field}
            labelId={id}
            label={label}
            multiple
            renderValue={(selected: string[]) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={optionsObj[value]}
                    size="small"
                  ></Chip>
                ))}
              </Box>
            )}
            disabled={disabled}
          >
            {options.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                style={getStyles(option.value as string, field.value, theme)}
              >
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
